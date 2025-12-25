import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Award, CheckCircle2, ExternalLink, FileText } from 'lucide-react';
import { getUserProgress } from '../api/user.api';
import ProgressIndicator from '../components/ProgressIndicator';
import LearnPlanButton from '../components/LearnPlanButton';
import CompletionButton from '../components/CompletionButton';

const Page8 = () => {
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const progress = await getUserProgress();
      if (progress.name) {
        setUserName(progress.name);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleComplete = () => {
    // Show completion message
    setTimeout(() => {
      // Could navigate to a completion page or show a final message
    }, 1500);
  };

  const handleOpenForm = () => {
    window.open('https://forms.gle/zvs2QsvFHVkmK2Gy7', '_blank');
  };

  return (
    <div className="min-h-screen py-8 px-4 relative">
      {/* Microsoft Learn Plan Button - Top Right */}
      <LearnPlanButton />

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
              <Award className="w-16 h-16 text-orange-400" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Step 8: Program Completion
            </h1>
            {userName && (
              <p className="text-xl text-gray-200/90">
                Congratulations, {userName}! 🎉
              </p>
            )}
          </div>

          {/* Main Instructions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-semibold text-white mb-4">
              Complete Your Microsoft Learn Journey
            </h2>
            <div className="space-y-4 text-gray-200/90 leading-relaxed">
              <p>
                You're almost at the finish line! To complete the program, please ensure you have:
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                  <p>
                    <strong className="text-white">Completed all modules</strong> of the Microsoft Learn platform
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                  <p>
                    <strong className="text-white">Filled out the completion form</strong> once you've finished all modules
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8 bg-blue-500/10 border border-blue-400/30 rounded-xl p-6"
          >
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-400" />
              Next Steps
            </h3>
            <div className="space-y-3 text-gray-200/90">
              <p>
                Once you have completed all the modules of the Microsoft Learn platform, please fill out the following Google form:
              </p>
              <motion.button
                onClick={handleOpenForm}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-gradient-to-r from-blue-500/90 to-blue-600/90 backdrop-blur-sm border border-blue-400/30 text-white font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 transition"
              >
                <ExternalLink className="w-5 h-5" />
                Open Completion Form
              </motion.button>
              <p className="text-sm text-gray-300/80 mt-3">
                Form link: <a href="https://forms.gle/zvs2QsvFHVkmK2Gy7" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">https://forms.gle/zvs2QsvFHVkmK2Gy7</a>
              </p>
            </div>
          </motion.div>

          {/* Verification Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-semibold text-white mb-4">
              What Happens Next?
            </h2>
            <div className="space-y-3 text-gray-200/90">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                <p>
                  We will <strong className="text-white">verify your Microsoft Learn completion</strong> after you submit the form
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                <p>
                  You will be <strong className="text-white">informed about your program completion</strong> soon after verification
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                <p>
                  Thank you for your dedication and hard work throughout this program!
                </p>
              </div>
            </div>
          </motion.div>

          {/* Completion Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-8"
          >
            <CompletionButton pageNumber={8} onComplete={handleComplete} />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Page8;

