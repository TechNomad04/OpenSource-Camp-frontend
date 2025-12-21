import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, CheckCircle2, ExternalLink, Target } from 'lucide-react';
import { getUserProgress } from '../api/user.api';
import ProgressIndicator from '../components/ProgressIndicator';
import LearnPlanButton from '../components/LearnPlanButton';
import CompletionButton from '../components/CompletionButton';

const Page3 = () => {
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
    // Navigate to next page after a short delay
    setTimeout(() => {
      navigate('/page/4');
    }, 1500);
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
              <BookOpen className="w-16 h-16 text-blue-400" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Step 3: Microsoft Learn GitHub & Open Source Plan
            </h1>
            {userName && (
              <p className="text-xl text-gray-200/90">
                Let's continue, {userName}! 🚀
              </p>
            )}
          </div>

          {/* What is this Microsoft Learn Plan? */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
              <Target className="w-6 h-6 text-orange-400" />
              What is this Microsoft Learn Plan?
            </h2>
            <div className="space-y-4 text-gray-200/90 leading-relaxed">
              <p>
                The <strong className="text-white">Microsoft Learn Plan</strong> button in the top-right corner 
                leads to a <strong className="text-orange-300">curated learning path</strong> specifically designed 
                to teach you everything you need to know about GitHub and open source contribution.
              </p>
              <p>
                This comprehensive plan covers:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong className="text-white">GitHub Fundamentals:</strong> Understanding repositories, branches, commits, and more</li>
                <li><strong className="text-white">Open Source Contribution:</strong> How to contribute to open source projects effectively</li>
                <li><strong className="text-white">GitHub Workflows:</strong> Best practices for collaboration and version control</li>
              </ul>
            </div>
          </motion.div>

          {/* What the User Needs to Do */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-green-400" />
              What You Need to Do
            </h2>
            <div className="space-y-3 text-gray-200/90">
              <div className="flex items-start gap-3 p-4 bg-black/20 rounded-lg border border-white">
                <span className="text-orange-400 font-bold text-xl">1.</span>
                <p>Click the <strong className="text-white">"Microsoft Learn Plan"</strong> button in the top-right corner</p>
              </div>
              <div className="flex items-start gap-3 p-4 bg-black/20 rounded-lg border border-white">
                <span className="text-orange-400 font-bold text-xl">2.</span>
                <p>Click <strong className="text-white">"Start Plan"</strong> on the Microsoft Learn page</p>
              </div>
              <div className="flex items-start gap-3 p-4 bg-black/20 rounded-lg border border-white">
                <span className="text-orange-400 font-bold text-xl">3.</span>
                <p>Register or sign in if you haven't already (use your GitHub account if prompted)</p>
              </div>
              <div className="flex items-start gap-3 p-4 bg-black/20 rounded-lg border border-white">
                <span className="text-orange-400 font-bold text-xl">4.</span>
                <p>Complete <strong className="text-white">all modules</strong> in the plan</p>
              </div>
            </div>
          </motion.div>

          {/* Important Clarification */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-8 bg-blue-500/10 border border-blue-400/30 rounded-xl p-6"
          >
            <h2 className="text-2xl font-semibold text-white mb-4">
              ⚠️ Important Clarification
            </h2>
            <div className="space-y-3 text-gray-200/90">
              <p>
                <strong className="text-white">Good news!</strong> You don't need to deeply read or follow every single module in detail.
              </p>
              <p>
                Here's what you actually need to do:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong className="text-white">Visit all units</strong> in each module</li>
                <li><strong className="text-white">Complete module assessments</strong> - these are the key requirements</li>
                <li><strong className="text-white">Score 100% in assessments</strong> for all modules</li>
                <li><strong className="text-white">Earn your Microsoft Learn badge</strong> - this proves your completion</li>
              </ul>
              <p className="mt-4 text-orange-300 font-medium">
                💡 Tip: Focus on understanding the concepts enough to pass the assessments. 
                You can always revisit the content later for deeper learning!
              </p>
            </div>
          </motion.div>

          {/* Learning Style Explanation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-semibold text-white mb-4">
              📚 Learning Style
            </h2>
            <div className="space-y-3 text-gray-200/90">
              <p>
                This program is <strong className="text-white">completely self-paced</strong>. You can complete the modules:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Anytime that works for you</li>
                <li>At your own convenience</li>
                <li>In your preferred learning style</li>
              </ul>
              <p className="mt-4">
                The <strong className="text-white">Microsoft Learn Plan button</strong> will remain available on 
                <strong className="text-orange-300"> all upcoming pages</strong>, so you can access it whenever you need it.
              </p>
            </div>
          </motion.div>

          {/* Completion Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-8"
          >
            <CompletionButton pageNumber={3} onComplete={handleComplete} />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Page3;

