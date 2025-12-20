import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { updateLastViewedPage } from '../api/user.api';
import { useAuth } from '../context/AuthContext';

/**
 * Hook to track the current page and update last viewed page in backend
 */
export const usePageTracking = () => {
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    // Extract page number from path like /page/1, /page/2, etc.
    const pageMatch = location.pathname.match(/^\/page\/(\d+)$/);
    
    if (pageMatch && user) {
      const pageNumber = parseInt(pageMatch[1], 10);
      
      // Update last viewed page in backend
      updateLastViewedPage(pageNumber).catch(error => {
        console.error('Error updating last viewed page:', error);
        // Don't show error to user, just log it
      });
    }
  }, [location.pathname, user]);
};

