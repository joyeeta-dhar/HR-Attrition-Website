import json
from app.ml.preprocess import predict_attrition

extreme_case = {
    "Age": 22,
    "DailyRate": 100,
    "DistanceFromHome": 30,
    "Education": 1,
    "EnvironmentSatisfaction": 1,
    "HourlyRate": 30,
    "JobInvolvement": 1,
    "JobLevel": 1,
    "JobSatisfaction": 1,
    "MonthlyIncome": 1000,
    "MonthlyRate": 1000,
    "NumCompaniesWorked": 5,
    "PercentSalaryHike": 11,
    "PerformanceRating": 3,
    "RelationshipSatisfaction": 1,
    "StandardHours": 80,
    "StockOptionLevel": 0,
    "TotalWorkingYears": 1,
    "TrainingTimesLastYear": 0,
    "WorkLifeBalance": 1,
    "YearsAtCompany": 1,
    "YearsInCurrentRole": 1,
    "YearsSinceLastPromotion": 1,
    "YearsWithCurrManager": 1,
    "BusinessTravel": "Travel_Frequently",
    "Department": "Sales",
    "EducationField": "Marketing",
    "Gender": "Male",
    "JobRole": "Sales Representative",
    "MaritalStatus": "Single",
    "OverTime": "Yes"
}

good_case = {
    "Age": 45,
    "DailyRate": 1000,
    "DistanceFromHome": 2,
    "Education": 4,
    "EnvironmentSatisfaction": 4,
    "HourlyRate": 90,
    "JobInvolvement": 4,
    "JobLevel": 4,
    "JobSatisfaction": 4,
    "MonthlyIncome": 15000,
    "MonthlyRate": 20000,
    "NumCompaniesWorked": 1,
    "PercentSalaryHike": 20,
    "PerformanceRating": 4,
    "RelationshipSatisfaction": 4,
    "StandardHours": 80,
    "StockOptionLevel": 3,
    "TotalWorkingYears": 20,
    "TrainingTimesLastYear": 5,
    "WorkLifeBalance": 4,
    "YearsAtCompany": 20,
    "YearsInCurrentRole": 15,
    "YearsSinceLastPromotion": 2,
    "YearsWithCurrManager": 15,
    "BusinessTravel": "Non-Travel",
    "Department": "Research & Development",
    "EducationField": "Life Sciences",
    "Gender": "Female",
    "JobRole": "Research Director",
    "MaritalStatus": "Married",
    "OverTime": "No"
}

print("Extreme Case Attrition:")
print(json.dumps(predict_attrition(extreme_case), indent=2))

print("Good Case Attrition:")
print(json.dumps(predict_attrition(good_case), indent=2))
