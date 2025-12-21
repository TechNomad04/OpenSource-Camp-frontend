import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Code, GitBranch, Zap, Database, Globe, Trophy } from 'lucide-react';
import { getUserProgress } from '../api/user.api';

const TOTAL_PAGES = 7; // Update this as more pages are added

const stepIcons = [BookOpen, Code, GitBranch, Zap, Database, Globe, Trophy]; // Icons for each step

const ProgressIndicator = () => {
  const [completedPages, setCompletedPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const currentPage = parseInt(location.pathname.split('/page/')[1]) || 1;

  useEffect(() => {
    // Only fetch if we don't have data yet, or if it's been a while
    if (completedPages.length === 0) {
      fetchProgress();
    }
  }, [location.pathname]);

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

  const handlePageClick = (e, pageNum) => {
    e.preventDefault();
    if (isPageUnlocked(pageNum) && pageNum !== currentPage) {
      navigate(`/page/${pageNum}`, { replace: false });
    }
  };

  if (loading) {
    return null;
  }

  return (
    <div className="w-full max-w-3xl mx-auto mt-12 mb-20 px-4">
      {/* Black background container for progress bar */}
      <div className="bg-black/90 backdrop-blur-sm rounded-lg pt-12 pb-6 px-6 border border-black">
        <div className="relative">
          {/* Background track */}
          <div className="h-1 bg-gray-300 rounded-full"></div>
          
          {/* Progress fill */}
          <motion.div
            className="absolute top-0 left-0 h-1 bg-green-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentPage - 1) / (TOTAL_PAGES - 1)) * 100}%` }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          ></motion.div>
          
          {/* Step indicators - only logo icons */}
          <div className="absolute -top-8 left-0 right-0 flex justify-between">
          {Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1).map((pageNum) => {
            const completed = isPageCompleted(pageNum);
            const unlocked = isPageUnlocked(pageNum);
            const IconComponent = stepIcons[pageNum - 1];

            return (
              <motion.button
                key={pageNum}
                onClick={(e) => handlePageClick(e, pageNum)}
                disabled={!unlocked || pageNum === currentPage}
                className={`transition-all duration-300 ${
                  !unlocked 
                    ? 'cursor-not-allowed opacity-50' 
                    : pageNum === currentPage
                    ? 'cursor-default opacity-100'
                    : 'cursor-pointer hover:scale-110'
                }`}
                whileHover={unlocked && pageNum !== currentPage ? { scale: 1.1 } : {}}
                whileTap={unlocked && pageNum !== currentPage ? { scale: 0.95 } : {}}
                title={
                  !unlocked
                    ? 'Complete previous step first'
                    : pageNum === currentPage
                    ? `Current step`
                    : completed
                    ? `Step ${pageNum} completed`
                    : `Step ${pageNum}`
                }
              >
                <IconComponent 
                  className={`w-6 h-6 transition-colors duration-300 ${
                    completed 
                      ? 'text-green-600' 
                      : unlocked 
                      ? 'text-gray-800' 
                      : 'text-gray-400'
                  }`} 
                />
              </motion.button>
            );
          })}
        </div>
      </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;

