import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getUserProgress } from '../api/user.api';
import { useAuth } from '../context/AuthContext';

const PageGuard = ({ pageNumber, children }) => {
  const [loading, setLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);
  const [userProgress, setUserProgress] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    checkAccess();
  }, [pageNumber]);

  const checkAccess = async () => {
    try {
      const progress = await getUserProgress();
      setUserProgress(progress);

      // Page 1 is always accessible
      if (pageNumber === 1) {
        setHasAccess(true);
        setLoading(false);
        return;
      }

      // For other pages, check if previous page is completed
      const previousPage = pageNumber - 1;
      if (progress.completedPages && progress.completedPages.includes(previousPage)) {
        setHasAccess(true);
      } else {
        // Find the highest unlocked page
        const completedPages = progress.completedPages || [];
        let highestUnlocked = 1;
        
        for (let i = 1; i <= pageNumber; i++) {
          if (i === 1 || completedPages.includes(i - 1)) {
            highestUnlocked = i;
          } else {
            break;
          }
        }

        // Redirect to highest unlocked page
        navigate(`/page/${highestUnlocked}`, { 
          replace: true,
          state: { message: 'Complete previous step to continue' }
        });
      }
    } catch (error) {
      console.error('Error checking page access:', error);
      // On error, allow access to page 1, otherwise redirect to page 1
      if (pageNumber === 1) {
        setHasAccess(true);
      } else {
        navigate('/page/1', { replace: true });
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen relative">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-orange-400/50 border-t-transparent rounded-full relative z-10"
        />
      </div>
    );
  }

  if (!hasAccess) {
    return null; // Navigation will handle redirect
  }

  return children;
};

export default PageGuard;

