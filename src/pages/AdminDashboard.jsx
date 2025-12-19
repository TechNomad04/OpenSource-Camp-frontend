import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit, Trash2, X, Save } from 'lucide-react';
import {
  getAllResources,
  createResource,
  updateResource,
  deleteResource,
  getAnalytics
} from '../api/resource.api';

const AdminDashboard = () => {
  const [resources, setResources] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingResource, setEditingResource] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'other',
    url: ''
  });

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
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (resource = null) => {
    if (resource) {
      setEditingResource(resource);
      setFormData({
        title: resource.title,
        description: resource.description,
        type: resource.type,
        url: resource.url
      });
    } else {
      setEditingResource(null);
      setFormData({
        title: '',
        description: '',
        type: 'other',
        url: ''
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingResource(null);
    setFormData({
      title: '',
      description: '',
      type: 'other',
      url: ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingResource) {
        await updateResource(editingResource._id, formData);
      } else {
        await createResource(formData);
      }
      handleCloseModal();
      fetchData();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save resource');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this resource?')) {
      return;
    }

    try {
      await deleteResource(id);
      fetchData();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete resource');
    }
  };

  const getTypeBadgeColor = (type) => {
    const colors = {
      video: 'bg-red-500/20 text-red-400 border-red-500/50',
      article: 'bg-blue-500/20 text-blue-400 border-blue-500/50',
      pdf: 'bg-green-500/20 text-green-400 border-green-500/50',
      course: 'bg-purple-500/20 text-purple-400 border-purple-500/50',
      other: 'bg-gray-500/20 text-gray-400 border-gray-500/50'
    };
    return colors[type] || colors.other;
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
            <p className="text-gray-400">Manage educational resources</p>
          </div>
          <motion.button
            onClick={() => handleOpenModal()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 transition shadow-lg"
          >
            <Plus className="w-5 h-5" />
            Add Resource
          </motion.button>
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg mb-6"
          >
            {error}
          </motion.div>
        )}

        {/* Analytics Section */}
        {analytics && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800/80 backdrop-blur-xl border border-gray-700/50 rounded-xl p-6 mb-8"
          >
            <h2 className="text-2xl font-semibold text-white mb-4">Analytics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700/50">
                <div className="text-sm text-gray-400 mb-1">Total Resources</div>
                <div className="text-2xl font-bold text-white">{analytics.totalResources}</div>
              </div>
              <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700/50">
                <div className="text-sm text-gray-400 mb-1">Total Users</div>
                <div className="text-2xl font-bold text-white">{analytics.totalUsers}</div>
              </div>
              <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700/50">
                <div className="text-sm text-gray-400 mb-1">Total Completions</div>
                <div className="text-2xl font-bold text-white">
                  {analytics.completionStats.totalCompletions}
                </div>
              </div>
              <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700/50">
                <div className="text-sm text-gray-400 mb-1">Avg Completions</div>
                <div className="text-2xl font-bold text-white">
                  {Math.round(analytics.completionStats.avgCompletions * 10) / 10}
                </div>
              </div>
            </div>

            {analytics.resourcesByType && analytics.resourcesByType.length > 0 && (
              <div className="mt-6">
                <h3 className="font-semibold text-white mb-3">Resources by Type</h3>
                <div className="flex flex-wrap gap-2">
                  {analytics.resourcesByType.map((item) => (
                    <span
                      key={item._id}
                      className={`px-3 py-1 rounded-full text-sm border ${getTypeBadgeColor(item._id)}`}
                    >
                      {item._id}: {item.count}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Resources Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800/80 backdrop-blur-xl border border-gray-700/50 rounded-xl p-6"
        >
          <h2 className="text-2xl font-semibold text-white mb-4">Resources</h2>
          {resources.length === 0 ? (
            <p className="text-gray-400 text-center py-8">No resources available.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-900/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      URL
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-900/30 divide-y divide-gray-700">
                  {resources.map((resource) => (
                    <motion.tr
                      key={resource._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-gray-800/50 transition"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-white">{resource.title}</div>
                        <div className="text-sm text-gray-400 line-clamp-1">
                          {resource.description}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium border ${getTypeBadgeColor(resource.type)}`}
                        >
                          {resource.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <a
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 text-sm"
                        >
                          Open
                        </a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-2">
                          <motion.button
                            onClick={() => handleOpenModal(resource)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="text-blue-400 hover:text-blue-300"
                          >
                            <Edit className="w-5 h-5" />
                          </motion.button>
                          <motion.button
                            onClick={() => handleDelete(resource._id)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="text-red-400 hover:text-red-300"
                          >
                            <Trash2 className="w-5 h-5" />
                          </motion.button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>

        {/* Modal */}
        <AnimatePresence>
          {showModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={handleCloseModal}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-gray-800 border border-gray-700 rounded-xl p-6 w-full max-w-md"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-medium text-white">
                    {editingResource ? 'Edit Resource' : 'Add New Resource'}
                  </h3>
                  <button
                    onClick={handleCloseModal}
                    className="text-gray-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Description
                    </label>
                    <textarea
                      required
                      rows="3"
                      className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({ ...formData, description: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Type
                    </label>
                    <select
                      required
                      className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.type}
                      onChange={(e) =>
                        setFormData({ ...formData, type: e.target.value })
                      }
                    >
                      <option value="video">Video</option>
                      <option value="article">Article</option>
                      <option value="pdf">PDF</option>
                      <option value="course">Course</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      URL
                    </label>
                    <input
                      type="url"
                      required
                      className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.url}
                      onChange={(e) =>
                        setFormData({ ...formData, url: e.target.value })
                      }
                    />
                  </div>
                  <div className="flex justify-end gap-3 pt-4">
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
                    >
                      Cancel
                    </button>
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                      <Save className="w-4 h-4" />
                      {editingResource ? 'Update' : 'Create'}
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminDashboard;
