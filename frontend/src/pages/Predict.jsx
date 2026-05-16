import { useState } from 'react';
import { makePrediction } from '../services/api';
import { AlertTriangle, CheckCircle } from 'lucide-react';

export default function Predict() {
  const [formData, setFormData] = useState({
    Age: 30,
    DailyRate: 800,
    DistanceFromHome: 10,
    Education: 3,
    EnvironmentSatisfaction: 3,
    HourlyRate: 60,
    JobInvolvement: 3,
    JobLevel: 2,
    JobSatisfaction: 3,
    MonthlyIncome: 5000,
    MonthlyRate: 15000,
    NumCompaniesWorked: 2,
    PercentSalaryHike: 15,
    PerformanceRating: 3,
    RelationshipSatisfaction: 3,
    StandardHours: 80,
    StockOptionLevel: 1,
    TotalWorkingYears: 10,
    TrainingTimesLastYear: 2,
    WorkLifeBalance: 3,
    YearsAtCompany: 5,
    YearsInCurrentRole: 4,
    YearsSinceLastPromotion: 1,
    YearsWithCurrManager: 4,
    BusinessTravel: 'Travel_Rarely',
    Department: 'Research & Development',
    EducationField: 'Life Sciences',
    Gender: 'Male',
    JobRole: 'Laboratory Technician',
    MaritalStatus: 'Single',
    OverTime: 'No'
  });

  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setResult(null);

    try {
      const res = await makePrediction(formData);
      setResult(res);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to make prediction');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-secondary">Employee Attrition Prediction</h1>
          <p className="mt-2 text-gray-500">Enter employee parameters to predict likelihood of leaving.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3">
            
            {/* Form Section */}
            <div className="p-8 md:col-span-2 border-r border-gray-100">
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                    <input type="number" name="Age" value={formData.Age} onChange={handleChange} className="input-field" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Income</label>
                    <input type="number" name="MonthlyIncome" value={formData.MonthlyIncome} onChange={handleChange} className="input-field" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                    <select name="Department" value={formData.Department} onChange={handleChange} className="input-field">
                      <option value="Research & Development">Research & Development</option>
                      <option value="Sales">Sales</option>
                      <option value="Human Resources">Human Resources</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Job Role</label>
                    <select name="JobRole" value={formData.JobRole} onChange={handleChange} className="input-field">
                      <option value="Sales Executive">Sales Executive</option>
                      <option value="Research Scientist">Research Scientist</option>
                      <option value="Laboratory Technician">Laboratory Technician</option>
                      <option value="Manufacturing Director">Manufacturing Director</option>
                      <option value="Healthcare Representative">Healthcare Representative</option>
                      <option value="Manager">Manager</option>
                      <option value="Sales Representative">Sales Representative</option>
                      <option value="Research Director">Research Director</option>
                      <option value="Human Resources">Human Resources</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">OverTime</label>
                    <select name="OverTime" value={formData.OverTime} onChange={handleChange} className="input-field">
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Total Working Years</label>
                    <input type="number" name="TotalWorkingYears" value={formData.TotalWorkingYears} onChange={handleChange} className="input-field" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Years At Company</label>
                    <input type="number" name="YearsAtCompany" value={formData.YearsAtCompany} onChange={handleChange} className="input-field" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Job Satisfaction (1-4)</label>
                    <input type="number" min="1" max="4" name="JobSatisfaction" value={formData.JobSatisfaction} onChange={handleChange} className="input-field" required />
                  </div>
                </div>

                {error && <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">{error}</div>}

                <div className="pt-4">
                  <button type="submit" disabled={isLoading} className="btn-primary w-full py-3 text-lg">
                    {isLoading ? 'Running Model...' : 'Predict Attrition'}
                  </button>
                </div>
              </form>
            </div>

            {/* Results Section */}
            <div className="p-8 bg-gray-50 flex flex-col items-center justify-center min-h-[300px]">
              {result ? (
                <div className="text-center animate-in fade-in zoom-in duration-300">
                  <h3 className="text-xl font-semibold text-secondary mb-4">Prediction Result</h3>
                  
                  {result.prediction === 1 ? (
                    <div className="bg-alert text-white p-6 rounded-2xl flex flex-col items-center shadow-lg">
                      <AlertTriangle className="h-12 w-12 mb-3 text-white" />
                      <span className="text-2xl font-bold">High Risk</span>
                      <p className="mt-2 text-sm max-w-[200px] text-white/90">This employee has a high probability of leaving the company.</p>
                      
                      {result.probability && (
                        <div className="mt-4 pt-4 border-t border-white/20 w-full text-center">
                          <span className="text-sm font-medium">Confidence: {(result.probability[1] * 100).toFixed(1)}%</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="bg-green-100 text-green-800 p-6 rounded-2xl flex flex-col items-center">
                      <CheckCircle className="h-12 w-12 mb-3" />
                      <span className="text-2xl font-bold">Low Risk</span>
                      <p className="mt-2 text-sm max-w-[200px]">This employee is likely to stay with the company.</p>
                      
                      {result.probability && (
                        <div className="mt-4 pt-4 border-t border-green-200 w-full">
                          <span className="text-sm font-medium">Confidence: {(result.probability[0] * 100).toFixed(1)}%</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center text-gray-400">
                  <p>Fill out the required parameters and click predict to see results here.</p>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
