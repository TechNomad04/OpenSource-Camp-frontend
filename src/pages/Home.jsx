import { useState, useEffect } from 'react';
import { getAllResources, markAsCompleted } from '../api/resource.api';

const Home = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      setLoading(true);
      const data = await getAllResources();
      setResources(data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch resources');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkCompleted = async (id) => {
    try {
      await markAsCompleted(id);
      setResources(resources.map(resource =>
        resource._id === id ? { ...resource, completed: true } : resource
      ));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to mark as completed');
    }
  };

  const getTypeBadgeColor = (type) => {
    const colors = {
      video: 'bg-red-100 text-red-800',
      article: 'bg-blue-100 text-blue-800',
      pdf: 'bg-green-100 text-green-800',
      course: 'bg-purple-100 text-purple-800',
      other: 'bg-gray-100 text-gray-800'
    };
    return colors[type] || colors.other;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading resources...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Educational Resources</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {resources.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No resources available yet.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {resources.map((resource) => (
            <div
              key={resource._id}
              className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-semibold text-gray-900 flex-1">
                  {resource.title}
                </h3>
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${getTypeBadgeColor(resource.type)}`}
                >
                  {resource.type}
                </span>
              </div>

              <p className="text-gray-600 mb-4 line-clamp-3">
                {resource.description}
              </p>

              <div className="flex items-center justify-between mb-4">
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                >
                  Open Resource →
                </a>
                {resource.completed && (
                  <span className="text-green-600 text-sm font-medium">
                    ✓ Completed
                  </span>
                )}
              </div>

              {!resource.completed && (
                <button
                  onClick={() => handleMarkCompleted(resource._id)}
                  className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  Mark as Completed
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;

