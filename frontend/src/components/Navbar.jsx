import { Link, useNavigate } from 'react-router-dom';
import { Activity, LogOut, LayoutDashboard, BrainCircuit } from 'lucide-react';

export default function Navbar({ isAuthenticated, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <nav className="fixed top-0 w-full z-[80] p-4 pointer-events-none">
      <div className="max-w-7xl mx-auto flex justify-between items-center bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl px-6 h-16 pointer-events-auto transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05] shadow-2xl">
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="p-2 bg-gradient-to-br from-primary to-secondary rounded-lg shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform duration-300">
            <Activity className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight text-white group-hover:text-primary transition-colors">
            HR <span className="text-primary font-extrabold text-gradient">Predictor</span>
          </span>
        </Link>

        <div className="flex items-center space-x-6">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="text-slate-300 hover:text-white flex items-center gap-2 text-sm font-medium transition-colors">
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </Link>
              <Link to="/predict" className="text-slate-300 hover:text-white flex items-center gap-2 text-sm font-medium transition-colors">
                <BrainCircuit className="w-4 h-4" />
                Analyze
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1.5 text-slate-400 hover:text-red-400 text-sm font-medium transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </button>
            </>
          ) : (
            <>
              <a href="/#features" className="text-slate-400 hover:text-white text-sm font-medium transition-colors hidden md:block">
                Features
              </a>
              <Link to="/login" className="text-slate-300 hover:text-white text-sm font-medium transition-colors">
                Login
              </Link>
              <Link
                to="/register"
                className="btn-premium px-6 py-2 text-sm"
              >
                Start Analyzing
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
