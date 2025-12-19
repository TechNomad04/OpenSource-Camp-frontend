import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink, CheckCircle2, Circle } from 'lucide-react';
import { getAllResources, toggleCompletion } from '../api/resource.api';

const Home = () => {
  const [resources, setResources] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
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

  const handleToggleCompletion = async (id, currentStatus) => {
    try {
      const result = await toggleCompletion(id);
      setResources(resources.map(resource =>
        resource._id === id ? { ...resource, completed: result.completed } : resource
      ));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to toggle completion');
    }
  };

  const nextResource = () => {
    setCurrentIndex((prev) => (prev + 1) % resources.length);
  };

  const prevResource = () => {
    setCurrentIndex((prev) => (prev - 1 + resources.length) % resources.length);
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

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
        <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-6 py-4 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  if (resources.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-gray-400 text-lg">No resources available yet.</p>
        </div>
      </div>
    );
  }

  const currentResource = resources[currentIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">Educational Resources</h1>
          <p className="text-gray-400">
            {currentIndex + 1} of {resources.length}
          </p>
        </motion.div>

        {/* Slideshow Container */}
        <div className="relative">
          {/* Navigation Arrows */}
          {resources.length > 1 && (
            <>
              <button
                onClick={prevResource}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-full flex items-center justify-center text-white hover:bg-gray-700 transition shadow-lg"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextResource}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-full flex items-center justify-center text-white hover:bg-gray-700 transition shadow-lg"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Resource Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentResource._id}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-800/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl p-8 md:p-12"
            >
              {/* Type Badge */}
              <div className="flex justify-between items-start mb-6">
                <span
                  className={`px-4 py-2 rounded-full text-sm font-medium border ${getTypeBadgeColor(currentResource.type)}`}
                >
                  {currentResource.type}
                </span>
                {currentResource.completed && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex items-center gap-2 text-green-400"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    <span className="text-sm font-medium">Completed</span>
                  </motion.div>
                )}
              </div>

              {/* Title */}
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {currentResource.title}
              </h2>

              {/* Description */}
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                {currentResource.description}
              </p>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.a
                  href={currentResource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 flex items-center justify-center gap-2 py-4 px-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 transition shadow-lg"
                >
                  <ExternalLink className="w-5 h-5" />
                  Open Resource
                </motion.a>

                <motion.button
                  onClick={() => handleToggleCompletion(currentResource._id, currentResource.completed)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex-1 flex items-center justify-center gap-2 py-4 px-6 font-medium rounded-lg transition shadow-lg ${
                    currentResource.completed
                      ? 'bg-gray-700 text-white hover:bg-gray-600 border border-gray-600'
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  {currentResource.completed ? (
                    <>
                      <Circle className="w-5 h-5" />
                      Mark as Incomplete
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      Mark as Completed
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots Indicator */}
        {resources.length > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            {resources.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition ${
                  index === currentIndex
                    ? 'bg-blue-500 w-8'
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
