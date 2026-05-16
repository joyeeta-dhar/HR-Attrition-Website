import { useState, useEffect, useMemo } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts';
import { getPredictions, getAnalytics } from '../services/api';
import { Clock, CheckCircle2, XCircle, Users, Activity } from 'lucide-react';

export default function Dashboard() {
  const [predictions, setPredictions] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const COLORS = ['#22c55e', '#dc2626']; // Green for Retained, Red for High Risk

  const { attritionData, departmentData } = useMemo(() => {
    if (!predictions.length) return { attritionData: [], departmentData: [] };

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

    return {
      attritionData: [
        { name: 'Retained', value: retained },
        { name: 'High Risk', value: attrition }
      ],
      departmentData: Object.entries(deptCount)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
    };
  }, [predictions]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [predsRes, analyticsRes] = await Promise.all([
          getPredictions(),
          getAnalytics()
        ]);
        setPredictions(predsRes);
        setAnalytics(analyticsRes);
      } catch (err) {
        console.error('Failed to fetch dashboard data', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <div>
          <h1 className="text-3xl font-bold text-secondary">Dashboard</h1>
          <p className="text-gray-500 mt-2">Overview of your activity and system statistics.</p>
        </div>

        {/* Analytics Cards */}
        {analytics && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card flex items-center p-6 border-l-4 border-l-primary">
              <div className="rounded-full bg-primary/10 p-3 mr-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Users</p>
                <p className="text-2xl font-semibold text-secondary">{analytics.total_users}</p>
              </div>
            </div>
            
            <div className="card flex items-center p-6 border-l-4 border-l-green-500">
              <div className="rounded-full bg-green-50 p-3 mr-4">
                <Activity className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Predictions</p>
                <p className="text-2xl font-semibold text-secondary">{analytics.total_predictions}</p>
              </div>
            </div>

            <div className="card flex items-center p-6 border-l-4 border-l-purple-500">
              <div className="rounded-full bg-purple-50 p-3 mr-4">
                <Clock className="h-6 w-6 text-purple-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Active Since</p>
                <p className="text-sm font-semibold text-secondary">Today</p>
              </div>
            </div>
          </div>
        )}

        {/* Charts Section */}
        {predictions.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-secondary mb-4">Attrition Risk Distribution</h3>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={attritionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {attritionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="card p-6">
              <h3 className="text-lg font-semibold text-secondary mb-4">Predictions Volume By Department</h3>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={departmentData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                    <RechartsTooltip cursor={{fill: '#f8fafc'}} />
                    <Bar dataKey="count" fill="#0f172a" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* Prediction History */}
        <div className="card overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-secondary">Your Recent Predictions</h3>
          </div>
          
          <div className="overflow-x-auto">
            {predictions.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <Clock className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                <p>No predictions yet. Head to the Predict tab to get started.</p>
              </div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Result</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {predictions.map((pred) => {
                    const input = typeof pred.input_data === 'string' ? JSON.parse(pred.input_data) : pred.input_data;
                    const output = typeof pred.output_data === 'string' ? JSON.parse(pred.output_data) : pred.output_data;
                    
                    return (
                      <tr key={pred.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(pred.timestamp).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {input.Department || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {input.JobRole || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {output.prediction === 1 ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-alert text-white shadow-sm">
                              <XCircle className="w-4 h-4 mr-1" /> Attrition
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              <CheckCircle2 className="w-4 h-4 mr-1" /> Retained
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
