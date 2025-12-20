import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, Lock, Circle } from 'lucide-react';
import { getUserProgress } from '../api/user.api';

const TOTAL_PAGES = 7; // Update this as more pages are added

const ProgressIndicator = () => {
  const [completedPages, setCompletedPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const currentPage = parseInt(location.pathname.split('/page/')[1]) || 1;

  useEffect(() => {
    fetchProgress();
  }, []);

  const fetchProgress = async () => {
    try {
      const progress = await getUserProgress();
      setCompletedPages(progress.completedPages || []);
    } catch (error) {
      console.error('Error fetching progress:', error);
    } finally {
      setLoading(false);
    }
  };

  const isPageCompleted = (pageNum) => {
    return completedPages.includes(pageNum);
  };

  const isPageUnlocked = (pageNum) => {
    if (pageNum === 1) return true;
    return completedPages.includes(pageNum - 1);
  };

  const handlePageClick = (pageNum) => {
    if (isPageUnlocked(pageNum)) {
      navigate(`/page/${pageNum}`);
    }
  };

  if (loading) {
    return null;
  }

  return (
    <div className="flex items-center justify-center gap-4 mb-8">
      {Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1).map((pageNum) => {
        const completed = isPageCompleted(pageNum);
        const unlocked = isPageUnlocked(pageNum);
        const isCurrent = pageNum === currentPage;

        return (
          <div key={pageNum} className="flex items-center">
            <motion.button
              onClick={() => handlePageClick(pageNum)}
              disabled={!unlocked}
              whileHover={unlocked ? { scale: 1.1 } : {}}
              whileTap={unlocked ? { scale: 0.95 } : {}}
              className={`relative flex items-center justify-center w-12 h-12 rounded-full transition ${
                completed
                  ? 'bg-green-500/30 border-2 border-green-400 text-green-300'
                  : unlocked
                  ? isCurrent
                    ? 'bg-orange-500/30 border-2 border-orange-400 text-orange-300'
                    : 'bg-black/30 border-2 border-white/20 text-gray-300 hover:border-white/40'
                  : 'bg-black/20 border-2 border-gray-700 text-gray-600 cursor-not-allowed'
              } backdrop-blur-sm`}
              title={
                !unlocked
                  ? 'Complete previous step first'
                  : completed
                  ? `Step ${pageNum} completed`
                  : `Step ${pageNum}`
              }
            >
              {completed ? (
                <CheckCircle2 className="w-6 h-6" />
              ) : !unlocked ? (
                <Lock className="w-5 h-5" />
              ) : (
                <span className="text-lg font-bold">{pageNum}</span>
              )}
            </motion.button>

            {/* Connector line */}
            {pageNum < TOTAL_PAGES && (
              <div
                className={`w-16 h-0.5 mx-2 ${
                  completed ? 'bg-green-400/50' : 'bg-gray-700'
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ProgressIndicator;

