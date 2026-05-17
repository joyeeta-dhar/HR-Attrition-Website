import { useState, useEffect, useMemo } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { getPredictions, getAnalytics } from '../services/api';
import { Clock, CheckCircle2, XCircle, Users, Activity, TrendingUp, AlertTriangle, Layers } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const [predictions, setPredictions] = useState([]);
  const [globalStats, setGlobalStats] = useState({ total_users: 0, total_predictions: 0 });
  const [isLoading, setIsLoading] = useState(true);

  const NEON_COLORS = ['#06b6d4', '#d946ef', '#3b82f6', '#10b981'];

  const { attritionData, departmentData, stats } = useMemo(() => {
    if (!predictions.length) return { attritionData: [], departmentData: [], stats: { total: 0, risky: 0, rate: 0 } };

    let retained = 0;
    let attrition = 0;
    const deptCount = {};

    predictions.forEach(pred => {
      const output = typeof pred.output_data === 'string' ? JSON.parse(pred.output_data) : pred.output_data;
      const input = typeof pred.input_data === 'string' ? JSON.parse(pred.input_data) : pred.input_data;
      
      if (output.prediction === 1) attrition++;
      else retained++;

      const dept = input.Department || 'Unknown';
      deptCount[dept] = (deptCount[dept] || 0) + 1;
    });

    const total = predictions.length;
    return {
      attritionData: [
        { name: 'Stable', value: retained },
        { name: 'At Risk', value: attrition }
      ],
      departmentData: Object.entries(deptCount)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count),
      stats: {
        total,
        risky: attrition,
        rate: total > 0 ? ((attrition / total) * 100).toFixed(1) : 0
      }
    };
  }, [predictions]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [predsResponse, statsResponse] = await Promise.all([
          getPredictions(),
          getAnalytics()
        ]);
        setPredictions(predsResponse);
        setGlobalStats(statsResponse);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 border-4 border-primary/20 rounded-full" />
          <div className="absolute inset-0 border-4 border-primary rounded-full border-t-transparent animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center space-x-4"
        >
          <div className="p-3 bg-primary/20 rounded-2xl border border-primary/30">
            <Activity className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-4xl font-black text-white">Advanced <span className="text-gradient">Intelligence</span></h1>
            <p className="text-slate-400 font-medium">Monitoring organizational attrition health real-time.</p>
          </div>
        </motion.div>

        {/* Global Platform Activity badge */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card-neon px-6 py-3 flex items-center space-x-4 border border-primary/20 bg-primary/5 rounded-2xl"
        >
          <Users className="w-5 h-5 text-primary animate-pulse" />
          <div>
            <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Global Platform Activity</div>
            <div className="text-sm font-bold text-white">
              <span className="text-primary">{globalStats.total_users}</span> Active Admins | <span className="text-accent">{globalStats.total_predictions}</span> Total Runs
            </div>
          </div>
        </motion.div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {[
          { icon: <Layers className="text-primary" />, label: "Total Analysis", value: stats.total, color: "from-primary/20" },
          { icon: <AlertTriangle className="text-accent" />, label: "High Risk Cases", value: stats.risky, color: "from-accent/20" },
          { icon: <TrendingUp className="text-secondary" />, label: "Attrition Rate", value: `${stats.rate}%`, color: "from-secondary/20" }
        ].map((card, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`glass-card-neon p-6 bg-gradient-to-br ${card.color} via-transparent to-transparent`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-white/5 rounded-xl border border-white/5">{card.icon}</div>
              <div className="text-xs font-black text-slate-500 uppercase tracking-widest">{card.label}</div>
            </div>
            <div className="text-4xl font-black text-white mb-2">{card.value}</div>
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '70%' }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-full bg-gradient-to-r from-primary to-secondary" 
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="glass-card-neon p-8"
        >
          <h3 className="text-xl font-bold text-white mb-8 border-b border-white/5 pb-4">Internal Risk Distribution</h3>
          <div className="w-full" style={{ height: '350px' }}>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={attritionData.length > 0 ? attritionData : [{name: 'No Data', value: 1}]}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={8}
                  dataKey="value"
                  stroke="none"
                >
                  {attritionData.length > 0 ? (
                    attritionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={NEON_COLORS[index % NEON_COLORS.length]} />
                    ))
                  ) : (
                    <Cell fill="#1e293b" />
                  )}
                </Pie>
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Legend iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="glass-card-neon p-8"
        >
          <h3 className="text-xl font-bold text-white mb-8 border-b border-white/5 pb-4">Departmental Workload</h3>
          <div className="w-full" style={{ height: '350px' }}>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={departmentData.length > 0 ? departmentData : [{name: 'N/A', count: 0}]}>
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity={1} />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.4} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <RechartsTooltip 
                  cursor={{fill: 'rgba(255,255,255,0.05)'}}
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                />
                <Bar dataKey="count" fill="url(#barGradient)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Prediction History Table */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-card-neon overflow-hidden"
      >
        <div className="px-8 py-6 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
          <h3 className="text-xl font-bold text-white">Analysis History</h3>
          <button className="text-xs font-bold text-primary hover:text-white transition-colors uppercase tracking-widest">Download Report</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/[0.01]">
                {["Employee Info", "Risk Level", "Date", "Probability", "Status"].map((h) => (
                  <th key={h} className="px-8 py-4 text-xs font-black text-slate-500 uppercase tracking-widest">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {predictions.map((pred, i) => {
                const output = typeof pred.output_data === 'string' ? JSON.parse(pred.output_data) : pred.output_data;
                const input = typeof pred.input_data === 'string' ? JSON.parse(pred.input_data) : pred.input_data;
                const isHighRisk = output.prediction === 1;

                return (
                  <tr key={pred.id} className="border-t border-white/5 hover:bg-white/[0.03] transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center space-x-3 text-white">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${isHighRisk ? 'from-accent/30' : 'from-primary/30'} to-transparent flex items-center justify-center border border-white/10`}>
                          <Users className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-bold group-hover:text-primary transition-colors">{input.Department || 'N/A'}</div>
                          <div className="text-xs text-slate-400 font-medium">{input.JobRole || 'Consultant'}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-sm">
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                        isHighRisk 
                          ? 'text-accent border-accent/40 bg-accent/10 shadow-[0_0_15px_rgba(217,70,239,0.2)]' 
                          : 'text-cyan-400 border-cyan-400/40 bg-cyan-400/5'
                      }`}>
                        {isHighRisk ? 'High Risk' : 'Low Risk'}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-sm text-slate-300 font-medium">
                      {pred.timestamp ? new Date(pred.timestamp).toLocaleDateString() : 'Recent'}
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2">
                        <div className="text-sm font-black text-white">{Math.round((output.probability || 0) * 100)}%</div>
                        <div className="h-1.5 w-16 bg-white/10 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${isHighRisk ? 'bg-accent' : 'bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.4)]'}`} 
                            style={{width: `${(output.probability || 0) * 100}%`}} 
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      {isHighRisk ? (
                        <div className="flex items-center gap-1.5 text-accent font-bold text-[10px] uppercase tracking-wider">
                          <AlertTriangle className="w-3.5 h-3.5" /> Action Needed
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-[10px] uppercase tracking-wider">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Optimal
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
