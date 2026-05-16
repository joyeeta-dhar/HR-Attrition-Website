import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { makePrediction } from '../services/api';
import { BrainCircuit, Loader2, Sparkles, User, BadgeDollarSign, Briefcase, Heart, Clock, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function Predict() {
  const [formData, setFormData] = useState({
    Age: 35,
    Department: 'Research & Development',
    JobRole: 'Research Scientist',
    MonthlyIncome: 5000,
    OverTime: 'No',
    JobSatisfaction: 3,
    YearsAtCompany: 5,
    WorkLifeBalance: 3
  });

  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    { id: 1, title: 'Identity', icon: <User className="w-4 h-4" /> },
    { id: 2, title: 'Financial', icon: <BadgeDollarSign className="w-4 h-4" /> },
    { id: 3, title: 'Engagement', icon: <Heart className="w-4 h-4" /> }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: e.target.type === 'number' ? parseInt(value) : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await makePrediction(formData);
      setPrediction(response);
    } catch (error) {
      console.error('Prediction failed:', error);
      alert('Failed to get prediction. Check if backend is running.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-400 uppercase tracking-widest pl-1">Age</label>
                <input
                  type="number"
                  name="Age"
                  value={formData.Age}
                  onChange={handleInputChange}
                  className="input-premium"
                  min="18" max="70"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-400 uppercase tracking-widest pl-1">Department</label>
                <select
                  name="Department"
                  value={formData.Department}
                  onChange={handleInputChange}
                  className="input-premium"
                >
                  <option value="Sales">Sales</option>
                  <option value="Research & Development">Research & Development</option>
                  <option value="Human Resources">Human Resources</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-400 uppercase tracking-widest pl-1">Job Role</label>
              <select
                name="JobRole"
                value={formData.JobRole}
                onChange={handleInputChange}
                className="input-premium"
              >
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
          </motion.div>
        );
      case 2:
        return (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-400 uppercase tracking-widest pl-1">Monthly Income ($)</label>
              <input
                type="number"
                name="MonthlyIncome"
                value={formData.MonthlyIncome}
                onChange={handleInputChange}
                className="input-premium"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-400 uppercase tracking-widest pl-1">Overtime</label>
                <select
                  name="OverTime"
                  value={formData.OverTime}
                  onChange={handleInputChange}
                  className="input-premium"
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-400 uppercase tracking-widest pl-1">Tenure (Years)</label>
                <input
                  type="number"
                  name="YearsAtCompany"
                  value={formData.YearsAtCompany}
                  onChange={handleInputChange}
                  className="input-premium"
                />
              </div>
            </div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-400 uppercase tracking-widest pl-1">Job Satisfaction (1-4)</label>
                <input
                  type="range" min="1" max="4"
                  name="JobSatisfaction"
                  value={formData.JobSatisfaction}
                  onChange={handleInputChange}
                  className="w-full accent-primary"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-bold uppercase tracking-tighter">
                  <span>Low</span>
                  <span>Moderate</span>
                  <span>High</span>
                  <span>Very High</span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-400 uppercase tracking-widest pl-1">Work Life Balance (1-4)</label>
                <input
                  type="range" min="1" max="4"
                  name="WorkLifeBalance"
                  value={formData.WorkLifeBalance}
                  onChange={handleInputChange}
                  className="w-full accent-secondary"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-bold uppercase tracking-tighter">
                  <span>Bad</span>
                  <span>Average</span>
                  <span>Good</span>
                  <span>Great</span>
                </div>
              </div>
            </div>
            <div className="bg-white/5 p-6 rounded-2xl border border-white/5 space-y-4">
               <h4 className="text-xs font-black text-white uppercase tracking-widest flex items-center gap-2">
                 <Sparkles className="w-3 h-3 text-primary" /> Strategy Review
               </h4>
               <p className="text-xs text-slate-400 leading-relaxed font-medium">By clicking Analyze, our neural engine will classify this employee profile against 1,400+ historical benchmarks.</p>
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-20 flex flex-col md:flex-row gap-12 items-start">
      <div className="md:w-1/3 sticky top-24">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div className="inline-flex p-3 bg-primary/20 rounded-2xl border border-primary/30">
            <BrainCircuit className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-5xl font-black text-white leading-tight">Predict Attrition <span className="text-gradient">Likelihood.</span></h1>
          <p className="text-slate-400 font-medium">Provide employee details to generate a high-precision risk score and retention strategy.</p>
          
          <div className="pt-8 space-y-4">
            {steps.map((s) => (
              <div key={s.id} className="flex items-center gap-4 group">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 ${
                  currentStep === s.id 
                    ? 'bg-primary border-primary text-white shadow-[0_0_15px_rgba(6,182,212,0.4)] shadow-primary/40' 
                    : currentStep > s.id 
                      ? 'bg-primary/20 border-primary/40 text-primary' 
                      : 'bg-white/5 border-white/10 text-slate-500'
                }`}>
                  {currentStep > s.id ? <CheckCircle2 className="w-4 h-4" /> : s.icon}
                </div>
                <span className={`text-sm font-bold tracking-widest uppercase transition-colors duration-300 ${currentStep === s.id ? 'text-white' : 'text-slate-500'}`}>
                   {s.title}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="md:w-2/3 w-full">
        {!prediction ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card-neon p-10"
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              <AnimatePresence mode="wait">
                {renderStep()}
              </AnimatePresence>

              <div className="pt-4 flex justify-between gap-4 border-t border-white/5">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(prev => prev - 1)}
                    className="btn-premium-outline flex items-center gap-2 group py-3"
                  >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Previous
                  </button>
                )}
                {currentStep < 3 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(prev => prev + 1)}
                    className="btn-premium ml-auto flex items-center gap-2 py-3 px-10"
                  >
                    Continue
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn-premium ml-auto flex items-center gap-2 py-4 px-12 group"
                  >
                    {isLoading ? (
                      <Loader2 className="animate-spin h-5 w-5" />
                    ) : (
                      <>
                        Analyze Profile
                        <Sparkles className="h-5 w-5 group-hover:rotate-12 transition-transform" />
                      </>
                    )}
                  </button>
                )}
              </div>
            </form>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card-neon p-12 text-center relative overflow-hidden"
          >
            <div className={`absolute top-0 left-0 w-full h-2 ${prediction.prediction === 1 ? 'bg-accent' : 'bg-primary'}`} />
            
            <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 border-2 ${
              prediction.prediction === 1 ? 'border-accent bg-accent/10' : 'border-primary bg-primary/10'
            }`}>
              <BrainCircuit className={`h-12 w-12 ${prediction.prediction === 1 ? 'text-accent' : 'text-primary'}`} />
            </div>

            <h2 className="text-5xl font-black text-white mb-2">Verdict: <span className={prediction.prediction === 1 ? 'text-accent' : 'text-primary'}>
              {prediction.risk_level}
            </span></h2>
            
            <div className="text-slate-400 font-medium text-lg mb-8 max-w-lg mx-auto leading-relaxed">
              {prediction.message} Confidence Level: <span className="text-white font-bold">{Math.round(prediction.probability * 100)}%</span>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => setPrediction(null)}
                className="btn-premium px-10 py-4"
              >
                Analyze Another
              </button>
              <button
                onClick={() => window.location.href='/dashboard'}
                className="btn-premium-outline px-10 py-4"
              >
                View Dashboard
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
