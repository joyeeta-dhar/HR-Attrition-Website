import json
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel

from app.database import get_db
from app.models.prediction import Prediction
from app.routers.auth import get_current_user
from app.models.user import User
from app.ml.preprocess import predict_attrition

router = APIRouter(tags=["predict"])

class PredictionInput(BaseModel):
    Age: int
    DailyRate: int
    DistanceFromHome: int
    Education: int
    EnvironmentSatisfaction: int
    HourlyRate: int
    JobInvolvement: int
    JobLevel: int
    JobSatisfaction: int
    MonthlyIncome: int
    MonthlyRate: int
    NumCompaniesWorked: int
    PercentSalaryHike: int
    PerformanceRating: int
    RelationshipSatisfaction: int
    StandardHours: int
    StockOptionLevel: int
    TotalWorkingYears: int
    TrainingTimesLastYear: int
    WorkLifeBalance: int
    YearsAtCompany: int
    YearsInCurrentRole: int
    YearsSinceLastPromotion: int
    YearsWithCurrManager: int
    BusinessTravel: str
    Department: str
    EducationField: str
    Gender: str
    JobRole: str
    MaritalStatus: str
    OverTime: str

@router.post("/predict")
def make_prediction(
    data: PredictionInput, 
    db: Session = Depends(get_db), 
    current_user: User = Depends(get_current_user)
):
    try:
        input_dict = data.dict()
        result = predict_attrition(input_dict)
        
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
    
    # Parse json strings back to dict for response
    result = []
    for p in predictions:
        result.append({
            "id": p.id,
            "timestamp": p.timestamp,
            "input_data": json.loads(p.input_data) if p.input_data else {},
            "output_data": json.loads(p.output_data) if p.output_data else {}
        })
    return result
