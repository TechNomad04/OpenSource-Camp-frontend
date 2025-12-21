import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogOut, BookOpen } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-black/50 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50 shadow-xl"
    >
      <div className="w-full px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            {user && (
              <div className="flex items-center space-x-4">
                <Link
                  to="/page/1"
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition backdrop-blur-sm ${
                    isActive('/page/1')
                      ? 'bg-orange-500/30 text-orange-200 border border-orange-400/30'
                      : 'text-gray-200 hover:bg-black/20 border border-transparent hover:border-white/10'
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Learning</span>
                </Link>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-4">
            {user && (
              <>
                <div className="flex items-center gap-3">
                  <span className="text-gray-200 text-sm">{user.email}</span>
                </div>
                <motion.button
                  onClick={handleLogout}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500/20 text-red-300 border border-red-400/30 rounded-lg hover:bg-red-500/30 transition backdrop-blur-sm"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </motion.button>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
