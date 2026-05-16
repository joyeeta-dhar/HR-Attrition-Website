import json
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional

from app.database import get_db
from app.models.prediction import Prediction
from app.routers.auth import get_current_user
from app.models.user import User
from app.ml.preprocess import predict_attrition

router = APIRouter(tags=["predict"])

class PredictionInput(BaseModel):
    # ── Core fields (always required from the frontend form) ──────────────
    Age: int
    Department: str
    JobRole: str
    MonthlyIncome: int
    OverTime: str
    JobSatisfaction: int
    YearsAtCompany: int
    WorkLifeBalance: int

    # ── Optional fields with sensible defaults ────────────────────────────
    DailyRate: Optional[int] = 800
    DistanceFromHome: Optional[int] = 9
    Education: Optional[int] = 3
    EnvironmentSatisfaction: Optional[int] = 3
    HourlyRate: Optional[int] = 65
    JobInvolvement: Optional[int] = 3
    JobLevel: Optional[int] = 2
    MonthlyRate: Optional[int] = 14000
    NumCompaniesWorked: Optional[int] = 2
    PercentSalaryHike: Optional[int] = 14
    PerformanceRating: Optional[int] = 3
    RelationshipSatisfaction: Optional[int] = 3
    StandardHours: Optional[int] = 80
    StockOptionLevel: Optional[int] = 1
    TotalWorkingYears: Optional[int] = 10
    TrainingTimesLastYear: Optional[int] = 3
    YearsInCurrentRole: Optional[int] = 4
    YearsSinceLastPromotion: Optional[int] = 2
    YearsWithCurrManager: Optional[int] = 4
    BusinessTravel: Optional[str] = "Travel_Rarely"
    EducationField: Optional[str] = "Life Sciences"
    Gender: Optional[str] = "Male"
    MaritalStatus: Optional[str] = "Married"


def _enrich_result(result: dict) -> dict:
    """Add human-readable risk_level and message to the prediction result."""
    prob_attrition = result.get("probability", [0, 0])[1] if result.get("probability") else 0
    prediction = result.get("prediction", 0)

    if prediction == 1:
        if prob_attrition >= 0.65:
            risk_level = "High Risk"
            message = "This employee shows strong attrition signals. Immediate retention action is recommended."
        else:
            risk_level = "Moderate Risk"
            message = "This employee may be considering leaving. A check-in conversation is advised."
    else:
        if prob_attrition < 0.15:
            risk_level = "Very Stable"
            message = "This employee is highly engaged and unlikely to leave."
        else:
            risk_level = "Low Risk"
            message = "This employee appears stable with no immediate attrition concern."

    result["risk_level"] = risk_level
    result["message"] = message
    # Flatten probability to a single float for frontend display
    result["probability"] = round(prob_attrition, 4)
    return result


@router.post("/predict")
def make_prediction(
    data: PredictionInput, 
    db: Session = Depends(get_db), 
    current_user: User = Depends(get_current_user)
):
    try:
        input_dict = data.dict()
        result = predict_attrition(input_dict)
        result = _enrich_result(result)
        
        # Save to database
        db_prediction = Prediction(
            user_id=current_user.id,
            input_data=json.dumps(input_dict),
            output_data=json.dumps(result)
        )
        db.add(db_prediction)
        db.commit()
        db.refresh(db_prediction)
        
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/history")
def get_prediction_history(
    skip: int = 0, 
    limit: int = 100, 
    db: Session = Depends(get_db), 
    current_user: User = Depends(get_current_user)
):
    predictions = db.query(Prediction).filter(Prediction.user_id == current_user.id).order_by(Prediction.timestamp.desc()).offset(skip).limit(limit).all()
    
    result = []
    for p in predictions:
        result.append({
            "id": p.id,
            "timestamp": p.timestamp,
            "input_data": json.loads(p.input_data) if p.input_data else {},
            "output_data": json.loads(p.output_data) if p.output_data else {}
        })
    return result
