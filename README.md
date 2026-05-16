# HR Attrition Predictor

> A full-stack machine learning web application that predicts employee attrition risk, helping HR teams identify at-risk employees before they resign.

![Tech Stack](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white)

### 🌐 Live Demo

| Service | URL |
|---|---|
| **Frontend (Vercel)** | [https://hr-attrition-website.vercel.app](https://hr-attrition-website.vercel.app) |
| **Backend API (Render)** | [https://hr-attrition-api-k6by.onrender.com](https://hr-attrition-api-k6by.onrender.com) |
| **API Docs (Swagger)** | [https://hr-attrition-api-k6by.onrender.com/docs](https://hr-attrition-api-k6by.onrender.com/docs) |

> ⚠️ The backend is hosted on Render's free tier and may take **~30 seconds to wake up** after a period of inactivity. Please be patient on the first request.

---

## Table of Contents

- [Overview](#overview)
- [Live Demo](#live-demo)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Machine Learning Model](#machine-learning-model)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Environment Variables](#environment-variables)
- [API Reference](#api-reference)
- [Screenshots](#screenshots)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

The **HR Attrition Predictor** is a production-ready full-stack web application that uses a trained **Random Forest classifier** to predict the likelihood of an employee leaving an organization. Built on the IBM HR Analytics Employee Attrition dataset, the model analyses 30+ features — including job satisfaction, overtime hours, salary band, department, and years at company — to output a clear **Low Risk / High Risk** verdict.

The platform is designed for HR managers and People Operations teams who want to act on data rather than gut feel. Instead of reacting to resignations, teams can now proactively identify flight risks and intervene early.

---

## Features

- **🔐 Secure Authentication** — User registration and login with JWT tokens and bcrypt password hashing
- **🧠 AI-Powered Predictions** — Real-time attrition risk scoring using a trained scikit-learn Random Forest model
- **📊 Analytics Dashboard** — Interactive charts (Pie & Bar) visualising attrition risk distribution and prediction history by department
- **📜 Prediction History** — Full log of every prediction made, stored per user account
- **🎨 Premium UI** — Clean, modern SaaS-style interface built with React + TailwindCSS
- **📱 Responsive Design** — Fully functional on desktop and tablet screens
- **⚡ Fast API** — Python FastAPI backend with async support and auto-generated Swagger docs
- **🔒 Protected Routes** — Dashboard and prediction pages are gated behind authentication

---

## Tech Stack

### Backend
| Technology | Purpose |
|---|---|
| **Python 3.10+** | Core language |
| **FastAPI** | REST API framework |
| **SQLAlchemy** | ORM for database operations |
| **SQLite** | Lightweight relational database |
| **scikit-learn** | Machine learning model training & inference |
| **bcrypt** | Password hashing |
| **PyJWT** | JWT token generation & validation |
| **pandas / numpy** | Data preprocessing pipeline |

### Frontend
| Technology | Purpose |
|---|---|
| **React 18** | UI framework |
| **Vite** | Build tool & dev server |
| **TailwindCSS** | Utility-first styling |
| **React Router v6** | Client-side routing |
| **Recharts** | Interactive data visualisation |
| **Framer Motion** | Scroll animations |
| **Lucide React** | Icon library |
| **Axios** | HTTP client for API calls |

---

## Project Structure

```
ml-web-app/
├── backend/
│   ├── app/
│   │   ├── main.py              # FastAPI app entry point
│   │   ├── config.py            # App configuration & settings
│   │   ├── database.py          # SQLAlchemy database connection
│   │   ├── models/
│   │   │   ├── user.py          # User database model
│   │   │   └── prediction.py    # Prediction history model
│   │   ├── routers/
│   │   │   ├── auth.py          # /register and /login endpoints
│   │   │   ├── predict.py       # /predict endpoint
│   │   │   └── user.py          # /me and analytics endpoints
│   │   ├── ml/
│   │   │   ├── preprocess.py    # Feature engineering pipeline
│   │   │   ├── feature_columns.json  # Expected model input columns
│   │   │   └── *.pkl            # Trained model & scaler (not in git)
│   │   └── utils/
│   │       └── auth.py          # JWT & bcrypt helpers
│   ├── requirements.txt
│   └── check_pred.py            # Quick model sanity-check script
│
└── frontend/
    ├── src/
    │   ├── App.jsx              # Root component & routing
    │   ├── main.jsx             # React DOM entry point
    │   ├── index.css            # Global styles & Tailwind directives
    │   ├── pages/
    │   │   ├── Home.jsx         # Landing page (multi-section)
    │   │   ├── Login.jsx        # Login form
    │   │   ├── Register.jsx     # Registration form
    │   │   ├── Predict.jsx      # Attrition prediction form
    │   │   └── Dashboard.jsx    # Analytics & history dashboard
    │   ├── components/
    │   │   ├── Navbar.jsx       # Top navigation bar
    │   │   ├── ProtectedRoute.jsx  # Auth guard component
    │   │   └── ThreeBackground.jsx # Hero background element
    │   └── services/
    │       └── api.js           # Axios API service layer
    ├── package.json
    ├── vite.config.js
    └── tailwind.config.js
```

---

## Machine Learning Model

### Dataset
- **Source:** IBM HR Analytics Employee Attrition & Performance dataset
- **Size:** ~1,470 employee records
- **Target:** `Attrition` (binary: Yes / No)

### Pipeline
1. **Feature Engineering** — One-hot encoding of categorical fields (Department, JobRole, EducationField, etc.), standard scaling of numerical features
2. **Class Imbalance** — The dataset is imbalanced (~16% attrition rate). A custom **30% probability threshold** is applied instead of the default 50% to improve high-risk recall
3. **Model:** Random Forest Classifier (trained offline, loaded from `.pkl`)
4. **Artifacts:** `hr_attrition_final_model.pkl` + `hr_attrition_scaler.pkl`

### Key Input Features
| Feature | Type | Example |
|---|---|---|
| Age | Numeric | 35 |
| Department | Categorical | Sales |
| JobRole | Categorical | Sales Executive |
| MonthlyIncome | Numeric | 5000 |
| OverTime | Binary | Yes |
| JobSatisfaction | Numeric (1–4) | 2 |
| YearsAtCompany | Numeric | 3 |
| WorkLifeBalance | Numeric (1–4) | 1 |

---

## Getting Started

### Prerequisites
- Python 3.10 or higher
- Node.js 18 or higher
- npm 9 or higher
- The trained ML model files (`.pkl`) — see note below

> **⚠️ Model Files:** The `.pkl` files are excluded from this repository due to their size. You will need to either:
> - Train the model yourself using the [IBM HR dataset](https://www.kaggle.com/datasets/pavansubhasht/ibm-hr-analytics-attrition-dataset) and a Random Forest classifier
> - Or contact the repository owner to obtain the pre-trained artifacts

---

### Backend Setup

```bash
# 1. Navigate to the backend directory
cd backend

# 2. Create a Python virtual environment
python -m venv venv

# 3. Activate the virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# 4. Install dependencies
pip install -r requirements.txt

# 5. Create the .env file (see Environment Variables section)
# Copy the example and fill in your values:
cp .env.example .env

# 6. Place your trained model files inside:
#    backend/app/ml/hr_attrition_final_model.pkl
#    backend/app/ml/hr_attrition_scaler.pkl

# 7. Start the FastAPI server
uvicorn app.main:app --reload --port 8000
```

The API will be available at: `http://localhost:8000`
Swagger docs: `http://localhost:8000/docs`

---

### Frontend Setup

```bash
# 1. Navigate to the frontend directory
cd frontend

# 2. Install npm dependencies
npm install

# 3. Start the Vite development server
npm run dev
```

The app will be available at: `http://localhost:3000`

---

## Environment Variables

Create a `.env` file inside the `backend/` directory with the following variables:

```env
# Database connection string
DATABASE_URL=sqlite:///./mlapp.db

# JWT secret key — change this to a long random string in production!
JWT_SECRET=your_super_secret_key_here_change_me

# Frontend URL for CORS whitelist
FRONTEND_URL=http://localhost:3000
```

> **🔒 Security Note:** Never commit your `.env` file to version control. It is already included in `.gitignore`.

---

## API Reference

### Authentication

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/auth/register` | Register a new user account | No |
| `POST` | `/auth/login` | Login and receive a JWT token | No |

### Predictions

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/predict/` | Submit employee data and get attrition prediction | Yes |
| `GET` | `/user/predictions` | Get full prediction history for current user | Yes |
| `GET` | `/user/analytics` | Get aggregate stats for the dashboard | Yes |
| `GET` | `/user/me` | Get current authenticated user's profile | Yes |

### Example Request — Predict

```bash
curl -X POST http://localhost:8000/predict/ \
  -H "Authorization: Bearer <your_jwt_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "Age": 34,
    "Department": "Sales",
    "JobRole": "Sales Executive",
    "MonthlyIncome": 4500,
    "OverTime": "Yes",
    "JobSatisfaction": 2,
    "YearsAtCompany": 2,
    "WorkLifeBalance": 1
  }'
```

### Example Response

```json
{
  "prediction": 1,
  "probability": 0.73,
  "risk_level": "High Risk",
  "message": "This employee shows a HIGH risk of attrition."
}
```

---

## Deployment

### Backend (Render)

1. Create a new **Web Service** on [Render](https://render.com)
2. Connect your GitHub repository
3. Set the build command: `pip install -r requirements.txt`
4. Set the start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
5. Add your environment variables in the Render dashboard
6. Upload your `.pkl` model files (use a persistent disk or object storage like S3)

### Frontend (Vercel / Netlify)

```bash
# Build the production bundle
cd frontend
npm run build
```

Then deploy the `frontend/dist/` folder to [Vercel](https://vercel.com) or [Netlify](https://netlify.com).

> **Important:** Update the API base URL in `frontend/src/services/api.js` to point to your deployed backend URL before building.

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <p>Built with ❤️ using FastAPI, React, and scikit-learn</p>
  <p>Dataset courtesy of <a href="https://www.kaggle.com/datasets/pavansubhasht/ibm-hr-analytics-attrition-dataset">IBM HR Analytics on Kaggle</a></p>
</div>