import json
import pickle
import pandas as pd
import numpy as np
from pathlib import Path

# Paths
BASE_DIR = Path(__file__).resolve().parent
MODEL_PATH = BASE_DIR / "hr_attrition_final_model.pkl"
SCALER_PATH = BASE_DIR / "hr_attrition_scaler.pkl"
FEATURE_COLS_PATH = BASE_DIR / "feature_columns.json"

# Load artifacts once at startup
try:
    with open(MODEL_PATH, "rb") as f:
        model = pickle.load(f)
    with open(SCALER_PATH, "rb") as f:
        scaler = pickle.load(f)
    with open(FEATURE_COLS_PATH, "r") as f:
        feature_columns = json.load(f)
    print("[SUCCESS] ML artifacts loaded successfully")
except Exception as e:
    print(f"[ERROR] Error loading ML artifacts: {e}")
    model, scaler, feature_columns = None, None, []


def preprocess_input(input_dict: dict) -> pd.DataFrame:
    """
    Reproduces the exact feature engineering done during training.
    """
    df = pd.DataFrame([input_dict])

    # ── 1. Engineered features (must match training notebook) ──────────────────
    df["IncomePerLevel"] = df["MonthlyIncome"] / (df["JobLevel"] + 1)
    df["TenureRatio"] = df["YearsAtCompany"] / (df["TotalWorkingYears"] + 1)
    df["SatisfactionScore"] = (
        df["JobSatisfaction"]
        + df["EnvironmentSatisfaction"]
        + df["RelationshipSatisfaction"]
    ) / 3

    # Binary flags
    df["IsOverTime"] = (df["OverTime"] == "Yes").astype(int)
    df["LowIncome"] = (df["MonthlyIncome"] < 3000).astype(int)
    df["YoungEmployee"] = (df["Age"] < 30).astype(int)

    # ── 2. Drop raw columns that were not kept after engineering ───────────────
    # Drop columns that won't appear in feature_columns
    raw_numeric_to_drop = [
        "DailyRate", "HourlyRate", "MonthlyRate",
        "StandardHours",    # constant in IBM dataset
        "OverTime",         # replaced by IsOverTime (numeric)
    ]
    df.drop(columns=[c for c in raw_numeric_to_drop if c in df.columns], inplace=True)

    # ── 3. One-hot encode categorical columns ──────────────────────────────────
    cat_cols = ["BusinessTravel", "Department", "EducationField",
                "Gender", "JobRole", "MaritalStatus"]
    df = pd.get_dummies(df, columns=[c for c in cat_cols if c in df.columns])

    # ── 4. Align to training feature columns ──────────────────────────────────
    for col in feature_columns:
        if col not in df.columns:
            df[col] = 0

    df = df[feature_columns]

    # Cast all to numeric; fill any NaN with 0
    df = df.apply(pd.to_numeric, errors="coerce").fillna(0)

    return df


def predict_attrition(input_dict: dict) -> dict:
    if model is None or scaler is None:
        raise ValueError("ML artifacts not loaded. Check that model files exist in backend/app/ml/")

    df = preprocess_input(input_dict)

    X_scaled = scaler.transform(df)

    probability = (
        model.predict_proba(X_scaled)[0].tolist()
        if hasattr(model, "predict_proba")
        else None
    )

    # Use a customized threshold (30%) instead of default 50% for imbalanced dataset
    if probability is not None:
        prediction = 1 if probability[1] >= 0.30 else 0
    else:
        prediction = int(model.predict(X_scaled)[0])

    return {
        "prediction": prediction,          # 0 = stay, 1 = attrition
        "probability": probability,         # [prob_stay, prob_attrition]
        "attrition_risk_pct": round(probability[1] * 100, 1) if probability else None,
    }
