from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.database import get_db
from app.models.user import User
from app.models.prediction import Prediction
from app.routers.auth import get_current_user

router = APIRouter(prefix="/admin", tags=["admin"])

@router.get("/analytics")
def get_analytics(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    # Simple analytics endpoint, accessible to any authenticated user for this portfolio
    total_users = db.query(User).count()
    total_predictions = db.query(Prediction).count()
    
    return {
        "total_users": total_users,
        "total_predictions": total_predictions
    }
