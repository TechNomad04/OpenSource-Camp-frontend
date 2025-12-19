import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, BookOpen, CheckCircle2, Clock, Mail, Users } from 'lucide-react';
import { getAllResources, getAnalytics } from '../api/resource.api';
import { useAuth } from '../context/AuthContext';

const Analytics = () => {
  const { user, isAdmin } = useAuth();
  const [resources, setResources] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [resourcesData, analyticsData] = await Promise.all([
        getAllResources(),
        getAnalytics()
      ]);
      setResources(resourcesData);
      setAnalytics(analyticsData);
    } catch (err) {
      console.error('Failed to fetch analytics:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!analytics || !resources.length) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-gray-400 text-lg">No analytics data available.</p>
        </div>
      </div>
    );
  }

  // Calculate user-specific stats
  const completedCount = resources.filter(r => r.completed).length;
  const totalCount = resources.length;
  const completionPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  const pendingCount = totalCount - completedCount;

  // Chart data
  const completionData = [
    { name: 'Completed', value: completedCount, color: '#10b981' },
    { name: 'Pending', value: pendingCount, color: '#6b7280' }
  ];

  const typeData = analytics.resourcesByType?.map(item => ({
    name: item._id.charAt(0).toUpperCase() + item._id.slice(1),
    count: item.count
  })) || [];

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">Analytics Dashboard</h1>
          <p className="text-gray-400">Track your learning progress and insights</p>
        </motion.div>

        {/* User Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
            className="bg-gray-800/80 backdrop-blur-xl border border-gray-700/50 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <Mail className="w-8 h-8 text-blue-400" />
              <span className="text-2xl font-bold text-white">{user?.email || 'N/A'}</span>
            </div>
            <p className="text-gray-400 text-sm">Your Email</p>
          </motion.div>

          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            className="bg-gray-800/80 backdrop-blur-xl border border-gray-700/50 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <BookOpen className="w-8 h-8 text-purple-400" />
              <span className="text-2xl font-bold text-white">{totalCount}</span>
            </div>
            <p className="text-gray-400 text-sm">Total Resources</p>
          </motion.div>

          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
            className="bg-gray-800/80 backdrop-blur-xl border border-gray-700/50 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <CheckCircle2 className="w-8 h-8 text-green-400" />
              <span className="text-2xl font-bold text-white">{completedCount}</span>
            </div>
            <p className="text-gray-400 text-sm">Completed</p>
          </motion.div>

          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
            className="bg-gray-800/80 backdrop-blur-xl border border-gray-700/50 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-8 h-8 text-yellow-400" />
              <span className="text-2xl font-bold text-white">{completionPercentage}%</span>
            </div>
            <p className="text-gray-400 text-sm">Completion Rate</p>
          </motion.div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Completion Bar Chart */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.5 }}
            className="bg-gray-800/80 backdrop-blur-xl border border-gray-700/50 rounded-xl p-6"
          >
            <h3 className="text-xl font-semibold text-white mb-4">Completion Status</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={[{ name: 'Completed', value: completedCount }, { name: 'Pending', value: pendingCount }]}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#e5e7eb'
                  }}
                />
                <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Completion Pie Chart */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.6 }}
            className="bg-gray-800/80 backdrop-blur-xl border border-gray-700/50 rounded-xl p-6"
          >
            <h3 className="text-xl font-semibold text-white mb-4">Completion Ratio</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={completionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {completionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#e5e7eb'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Resources by Type */}
        {typeData.length > 0 && (
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.7 }}
            className="bg-gray-800/80 backdrop-blur-xl border border-gray-700/50 rounded-xl p-6 mb-8"
          >
            <h3 className="text-xl font-semibold text-white mb-4">Resources by Type</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={typeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#e5e7eb'
                  }}
                />
                <Bar dataKey="count" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        )}

        {/* Resource Breakdown */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.8 }}
          className="bg-gray-800/80 backdrop-blur-xl border border-gray-700/50 rounded-xl p-6"
        >
          <h3 className="text-xl font-semibold text-white mb-4">Resource Breakdown</h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {resources.map((resource) => (
              <motion.div
                key={resource._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg border border-gray-700/50"
              >
                <div className="flex-1">
                  <h4 className="text-white font-medium">{resource.title}</h4>
                  <p className="text-gray-400 text-sm mt-1">{resource.type}</p>
                </div>
                <div className="flex items-center gap-2">
                  {resource.completed ? (
                    <span className="flex items-center gap-2 text-green-400">
                      <CheckCircle2 className="w-5 h-5" />
                      <span className="text-sm">Completed</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-2 text-gray-400">
                      <Clock className="w-5 h-5" />
                      <span className="text-sm">Pending</span>
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Analytics;

