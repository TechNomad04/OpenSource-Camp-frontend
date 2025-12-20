import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Github, CheckCircle2, ExternalLink, ArrowRight, Edit2, X } from 'lucide-react';
import { saveGitHubUsername, getUserProgress } from '../api/user.api';
import ProgressIndicator from '../components/ProgressIndicator';

const Page1 = () => {
  const [githubUsername, setGithubUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const progress = await getUserProgress();
      if (progress.githubUsername) {
        setGithubUsername(progress.githubUsername);
        setSuccess(true);
      }
      if (progress.name) {
        setUserName(progress.name);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleOpenGitHub = () => {
    window.open('https://github.com/signup?wt.mc_id=studentamb_480361', '_blank');
  };

  const handleClear = () => {
    // Keep the current value so user can edit it
    setSuccess(false);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validation
    if (!githubUsername.trim()) {
      setError('GitHub username cannot be empty');
      setLoading(false);
      return;
    }

    if (githubUsername.includes(' ')) {
      setError('GitHub username cannot contain spaces');
      setLoading(false);
      return;
    }

    try {
      // If there was a previous success, clear it first
      const clearPrevious = success;
      await saveGitHubUsername(githubUsername.trim(), clearPrevious);
      setSuccess(true);
      
      // Show success message, then navigate
      setTimeout(() => {
        navigate('/page/2');
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save GitHub username');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 relative">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"></div>
      
      {/* Subtle gradient overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-orange-900/10 via-transparent to-blue-900/10"
        animate={{
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Progress Indicator */}
        <ProgressIndicator />

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black/30 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8 md:p-12 backdrop-saturate-150"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-block mb-4"
            >
              <Github className="w-16 h-16 text-orange-400" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
              Step 1: Set Up Your GitHub Account
            </h1>
            {userName && (
              <p className="text-xl text-gray-200/90">
                Welcome, {userName}! 👋
              </p>
            )}
          </div>

          {/* Why GitHub Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-semibold text-white mb-4">
              Why GitHub Matters
            </h2>
            <div className="space-y-3 text-gray-200/90">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                <p>
                  <strong className="text-white">Open Source:</strong> GitHub is the heart of open source development. 
                  You'll collaborate on real projects and contribute to the community.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                <p>
                  <strong className="text-white">Collaboration:</strong> Work with developers worldwide, 
                  review code, and learn from the best practices in the industry.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                <p>
                  <strong className="text-white">Version Control:</strong> Master Git and GitHub to track changes, 
                  manage your codebase, and never lose your work.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                <p>
                  <strong className="text-white">Developer Identity:</strong> Your GitHub profile is your professional 
                  portfolio. Showcase your projects and contributions to potential employers.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Success Message */}
          {success && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6 bg-green-500/20 backdrop-blur-sm border border-green-400/30 text-green-100 px-6 py-4 rounded-lg"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6" />
                  <div>
                    <p className="font-semibold">Great job{userName ? `, ${userName}` : ''}! 🚀</p>
                    <p>Your GitHub username ({githubUsername}) has been saved.</p>
                  </div>
                </div>
                <motion.button
                  onClick={handleClear}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 bg-black/30 backdrop-blur-sm border border-white/20 text-white rounded-lg hover:bg-black/40 transition"
                  title="Edit GitHub username"
                >
                  <Edit2 className="w-4 h-4" />
                  <span className="text-sm">Edit</span>
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-6 bg-red-500/20 backdrop-blur-sm border border-red-400/30 text-red-100 px-6 py-4 rounded-lg"
            >
              {error}
            </motion.div>
          )}

          {/* Form Section */}
          {!success && (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {/* Create GitHub Account Button */}
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Don't have a GitHub account?
                </label>
                <motion.button
                  type="button"
                  onClick={handleOpenGitHub}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-black/20 backdrop-blur-md border border-white/20 text-white font-medium rounded-lg hover:bg-black/30 hover:border-white/30 transition shadow-lg"
                >
                  <ExternalLink className="w-5 h-5" />
                  Create GitHub Account
                </motion.button>
              </div>

              {/* GitHub Username Input */}
              <div>
                <label htmlFor="githubUsername" className="block text-sm font-medium text-gray-200 mb-2">
                  Enter Your GitHub Username
                </label>
                <input
                  id="githubUsername"
                  type="text"
                  value={githubUsername}
                  onChange={(e) => setGithubUsername(e.target.value)}
                  placeholder="e.g., octocat"
                  className="w-full px-4 py-3 bg-black/20 backdrop-blur-md border border-white/20 rounded-lg text-white placeholder-gray-400/70 focus:outline-none focus:ring-2 focus:ring-orange-400/50 focus:border-orange-400/50 transition-all shadow-lg"
                  required
                />
                <p className="mt-2 text-sm text-gray-400">
                  This is the username you use to sign in to GitHub
                </p>
              </div>

              {/* Continue Button */}
              <motion.button
                type="submit"
                disabled={loading || !githubUsername.trim()}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-2 py-4 px-6 bg-gradient-to-r from-orange-500/90 to-orange-600/90 backdrop-blur-sm border border-orange-400/30 text-white font-medium rounded-lg hover:from-orange-600 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-400/50 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-xl shadow-orange-500/20"
              >
                {loading ? (
                  'Saving...'
                ) : (
                  <>
                    Continue to Next Step
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </motion.form>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Page1;

