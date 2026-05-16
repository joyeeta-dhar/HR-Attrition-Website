from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import engine, Base
from app.routers import auth, predict, user
from app.config import settings

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="HR Attrition Prediction API",
    description="Backend API for predicting employee attrition using ML",
    version="1.0.0"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:61323", "http://127.0.0.1:5173", "http://127.0.0.1:61323", "http://localhost:3000", "http://localhost:8000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router)
app.include_router(predict.router)
app.include_router(user.router)

@app.get("/")
def root():
    return {"message": "Welcome to the HR Attrition API. Go to /docs for the API documentation."}
