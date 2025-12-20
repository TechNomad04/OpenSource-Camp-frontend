import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Loader2, XCircle } from 'lucide-react';
import { getUserProgress, markPageComplete, markPageIncomplete } from '../api/user.api';

const CompletionButton = ({ pageNumber, onComplete }) => {
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState('');

  // Check if already completed on mount
  useEffect(() => {
    const checkCompletion = async () => {
      try {
        const progress = await getUserProgress();
        if (progress.completedPages && progress.completedPages.includes(pageNumber)) {
          setCompleted(true);
        }
      } catch (err) {
        console.error('Error checking completion:', err);
      }
    };
    checkCompletion();
  }, [pageNumber]);

  const handleMarkComplete = async () => {
    if (completed) return;

    setLoading(true);
    setError('');

    try {
      await markPageComplete(pageNumber);
      setCompleted(true);
      // Call optional onComplete callback if provided
      if (onComplete) {
        onComplete();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to mark as complete');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkIncomplete = async () => {
    if (!completed) return;

    setLoading(true);
    setError('');

    try {
      await markPageIncomplete(pageNumber);
      setCompleted(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to mark as incomplete');
    } finally {
      setLoading(false);
    }
  };

  if (completed) {
    return (
      <div className="space-y-2">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="flex items-center justify-center gap-2 px-6 py-4 bg-green-500/20 backdrop-blur-sm border border-green-400/30 text-green-200 rounded-lg mb-2"
        >
          <CheckCircle2 className="w-6 h-6" />
          <span className="font-medium">Page Completed!</span>
        </motion.div>
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-300 text-sm text-center"
          >
            {error}
          </motion.div>
        )}
        <motion.button
          onClick={handleMarkIncomplete}
          disabled={loading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center justify-center gap-2 py-4 px-6 bg-gradient-to-r from-red-500/90 to-red-600/90 backdrop-blur-sm border border-red-400/30 text-white font-medium rounded-lg hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-red-400/50 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-xl shadow-red-500/20"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Updating...</span>
            </>
          ) : (
            <>
              <XCircle className="w-5 h-5" />
              <span>Mark as Incomplete</span>
            </>
          )}
        </motion.button>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-red-300 text-sm text-center"
        >
          {error}
        </motion.div>
      )}
      <motion.button
        onClick={handleMarkComplete}
        disabled={loading}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full flex items-center justify-center gap-2 py-4 px-6 bg-gradient-to-r from-orange-500/90 to-orange-600/90 backdrop-blur-sm border border-orange-400/30 text-white font-medium rounded-lg hover:from-orange-600 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-400/50 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-xl shadow-orange-500/20"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Marking as Complete...</span>
          </>
        ) : (
          <>
            <CheckCircle2 className="w-5 h-5" />
            <span>Mark as Complete</span>
          </>
        )}
      </motion.button>
    </div>
  );
};

export default CompletionButton;

