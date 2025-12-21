import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn, UserPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getUserProgress } from '../api/user.api';
import { REGISTER_FORM_URL } from '../constants';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email, password);

    if (result.success) {
      // Try to redirect to last viewed page
      try {
        const progress = await getUserProgress();
        const lastViewedPage = progress.lastViewedPage || 1;
        const completedPages = progress.completedPages || [];
        
        // Determine the highest accessible page
        let targetPage = lastViewedPage;
        
        // Check if last viewed page is accessible
        if (lastViewedPage === 1) {
          targetPage = 1;
        } else if (completedPages.includes(lastViewedPage - 1)) {
          // Previous page is completed, so last viewed page is accessible
          targetPage = lastViewedPage;
        } else {
          // Find the highest unlocked page
          let highestUnlocked = 1;
          for (let i = 1; i <= lastViewedPage; i++) {
            if (i === 1 || completedPages.includes(i - 1)) {
              highestUnlocked = i;
            } else {
              break;
            }
          }
          targetPage = highestUnlocked;
        }
        
        navigate(`/page/${targetPage}`);
      } catch (error) {
        console.error('Error fetching last viewed page:', error);
        // Fallback to page 1
        navigate('/page/1');
      }
    } else {
      setError(result.message || 'Login failed');
    }

    setLoading(false);
  };

  const handleRegister = () => {
    window.open(REGISTER_FORM_URL, '_blank');
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">

      <div className="max-w-md w-full relative z-10 space-y-8">
        {/* Animated Branding Heading */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center"
        >
          <motion.h1
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
            animate={{
              textShadow: [
                '0 0 20px rgba(249, 115, 22, 0.5)',
                '0 0 30px rgba(249, 115, 22, 0.8)',
                '0 0 20px rgba(249, 115, 22, 0.5)',
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            Welcome to{' '}
            <motion.span
              className="bg-gradient-to-r from-orange-400 via-orange-300 to-orange-500 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ['0%', '100%', '0%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              OpenSource Camp
            </motion.span>
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-200/90 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            by ABVIIITM IEEE Student Branch
          </motion.p>
        </motion.div>

        {/* Dark frosted glass card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="bg-black/80 backdrop-blur-md border border-white rounded-2xl p-8 space-y-6">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <h2 className="text-3xl font-bold text-white mb-2">
                Welcome Back
              </h2>
              <p className="text-gray-200/90">Sign in to continue your learning journey</p>
            </motion.div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-red-500/20 backdrop-blur-sm border border-red-400/30 text-red-100 px-4 py-3 rounded-lg text-sm"
              >
                {error}
              </motion.div>
            )}

            {/* Login Form */}
            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* Email Input */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300/70 w-5 h-5 z-10" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="w-full pl-10 pr-4 py-3 bg-black/20 backdrop-blur-md border border-white rounded-lg text-white placeholder-gray-400/70 focus:outline-none focus:ring-2 focus:ring-orange-400/50 focus:border-orange-400/50 transition-all"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </motion.div>

              {/* Password Input */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label htmlFor="password" className="block text-sm font-medium text-gray-200 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300/70 w-5 h-5 z-10" />
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="w-full pl-10 pr-4 py-3 bg-black/20 backdrop-blur-md border border-white rounded-lg text-white placeholder-gray-400/70 focus:outline-none focus:ring-2 focus:ring-orange-400/50 focus:border-orange-400/50 transition-all"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </motion.div>

              {/* Login Button - Warm sunset orange */}
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-orange-500/90 to-orange-600/90 backdrop-blur-sm border border-orange-400/30 text-white font-medium rounded-lg hover:from-orange-600 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-400/50 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                <LogIn className="w-5 h-5" />
                {loading ? 'Signing in...' : 'Sign In'}
              </motion.button>
            </form>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-black/30 text-gray-300/80 backdrop-blur-sm">New User?</span>
              </div>
            </div>

            {/* Register Button - Cool mountain blue */}
            <motion.button
              onClick={handleRegister}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-black/20 backdrop-blur-md border border-white text-white font-medium rounded-lg hover:bg-black/30 focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition"
            >
              <UserPlus className="w-5 h-5" />
              Register
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
