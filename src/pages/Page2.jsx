import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, CheckCircle2, ExternalLink, ArrowRight, Mail, Edit2 } from 'lucide-react';
import { saveMicrosoftLearnEmail, getUserProgress } from '../api/user.api';
import ProgressIndicator from '../components/ProgressIndicator';

const Page2 = () => {
  const [email, setEmail] = useState('');
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
      if (progress.microsoftLearnEmail) {
        setEmail(progress.microsoftLearnEmail);
        setSuccess(true);
      }
      if (progress.name) {
        setUserName(progress.name);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleOpenMicrosoftLearn = () => {
    window.open('https://learn.microsoft.com?wt.mc_id=studentamb_480361', '_blank');
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

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    try {
      // If there was a previous success, clear it first
      const clearPrevious = success;
      await saveMicrosoftLearnEmail(email.trim(), clearPrevious);
      setSuccess(true);
      
      // Show success message, then navigate
      setTimeout(() => {
        navigate('/page/3');
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save email');
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    {
      number: 1,
      text: 'Go to Microsoft Learn',
      link: 'https://learn.microsoft.com/',
      linkText: 'learn.microsoft.com'
    },
    { number: 2, text: 'Click Sign in (top right)' },
    { number: 3, text: 'Click Sign-in options' },
    { number: 4, text: 'Select Sign in with GitHub' },
    { number: 5, text: 'Complete the login process' }
  ];

  return (
    <div className="min-h-screen py-8 px-4 relative">
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Progress Indicator */}
        <ProgressIndicator />

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black/80 backdrop-blur-md border border-white rounded-2xl p-8 md:p-12"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-block mb-4"
            >
              <BookOpen className="w-16 h-16 text-blue-400" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Step 2: Microsoft Learn & GitHub Integration
            </h1>
            {userName && (
              <p className="text-xl text-gray-200/90">
                Great progress, {userName}! 🎉
              </p>
            )}
          </div>

          {/* Learning Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-semibold text-white mb-4">
              What is Microsoft Learn?
            </h2>
            <p className="text-gray-200/90 mb-4 leading-relaxed">
              Microsoft Learn is a free, interactive platform that helps you build skills 
              through hands-on learning paths and modules. It's perfect for mastering 
              technologies like Azure, GitHub, and more.
            </p>

            <h3 className="text-xl font-semibold text-white mt-6 mb-4">
              Why Sign In with GitHub?
            </h3>
            <div className="space-y-3 text-gray-200/90">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                <p>
                  <strong className="text-white">Unified Identity:</strong> Use your GitHub account 
                  across Microsoft's learning platform for a seamless experience.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                <p>
                  <strong className="text-white">Progress Tracking:</strong> Your learning progress 
                  is saved and synced across devices.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                <p>
                  <strong className="text-white">GitHub Mastery:</strong> Microsoft Learn offers 
                  excellent courses on GitHub that will help you become a better developer.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Step-by-Step Instructions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-semibold text-white mb-4">
              Step-by-Step Instructions
            </h2>
            <div className="space-y-4">
              {steps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-start gap-4 p-4 bg-black/20 rounded-lg border border-white"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-500/30 border border-orange-400/50 flex items-center justify-center text-orange-300 font-bold">
                    {step.number}
                  </div>
                  <div className="flex-1">
                    <p className="text-white">
                      {step.text}
                      {step.link && (
                        <a
                          href={step.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-2 text-orange-400 hover:text-orange-300 inline-flex items-center gap-1"
                        >
                          {step.linkText}
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </p>
                  </div>
                </motion.div>
              ))}
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
                    <p className="font-semibold">Excellent work{userName ? `, ${userName}` : ''}! 🎊</p>
                    <p>Your Microsoft Learn email ({email}) has been saved.</p>
                  </div>
                </div>
                <motion.button
                  onClick={handleClear}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 bg-black/30 backdrop-blur-sm border border-white text-white rounded-lg hover:bg-black/40 transition"
                  title="Edit Microsoft Learn email"
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
              transition={{ delay: 0.6 }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {/* Microsoft Learn Link */}
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Need to visit Microsoft Learn?
                </label>
                <motion.button
                  type="button"
                  onClick={handleOpenMicrosoftLearn}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-black/20 backdrop-blur-md border border-white text-white font-medium rounded-lg hover:bg-black/30 transition"
                >
                  <ExternalLink className="w-5 h-5" />
                  Open Microsoft Learn
                </motion.button>
              </div>

              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-2">
                  Email ID linked with Microsoft Learn
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300/70 w-5 h-5 z-10" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    className="w-full pl-10 pr-4 py-3 bg-black/20 backdrop-blur-md border border-white rounded-lg text-white placeholder-gray-400/70 focus:outline-none focus:ring-2 focus:ring-orange-400/50 focus:border-orange-400/50 transition-all"
                    required
                  />
                </div>
                <p className="mt-2 text-sm text-gray-400">
                  This is the email address associated with your Microsoft Learn account
                </p>
              </div>

              {/* Continue Button */}
              <motion.button
                type="submit"
                disabled={loading || !email.trim()}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-2 py-4 px-6 bg-gradient-to-r from-orange-500/90 to-orange-600/90 backdrop-blur-sm border border-orange-400/30 text-white font-medium rounded-lg hover:from-orange-600 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-400/50 disabled:opacity-50 disabled:cursor-not-allowed transition"
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

export default Page2;

