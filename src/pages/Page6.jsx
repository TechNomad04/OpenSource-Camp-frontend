import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GitPullRequest, CheckCircle2, Play, ArrowRight } from 'lucide-react';
import { getUserProgress } from '../api/user.api';
import ProgressIndicator from '../components/ProgressIndicator';
import LearnPlanButton from '../components/LearnPlanButton';
import CompletionButton from '../components/CompletionButton';

const Page6 = () => {
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
      navigate('/page/7');
    }, 1500);
  };

  const videos = [
    {
      id: 'issues-pr1',
      title: 'GitHub Issues & Pull Requests',
      url: 'https://www.youtube.com/embed/o6xikISiz2w',
      description: 'Understanding Issues and PR workflow'
    },
    {
      id: 'issues-pr2',
      title: 'Open Source Contribution Guide',
      url: 'https://www.youtube.com/embed/mqJIGIxRkEs',
      description: 'Complete guide to contributing to open source'
    }
  ];

  const workflowSteps = [
    { number: 1, text: 'Find an issue you want to work on' },
    { number: 2, text: 'Fork the repository to your GitHub account' },
    { number: 3, text: 'Clone the forked repository to your local machine' },
    { number: 4, text: 'Create a new branch for your changes' },
    { number: 5, text: 'Make your changes and improvements' },
    { number: 6, text: 'Commit your changes with a clear message' },
    { number: 7, text: 'Push your branch to your fork on GitHub' },
    { number: 8, text: 'Open a Pull Request (PR) to the original repository' },
    { number: 9, text: 'Address any review feedback and make updates' }
  ];

  return (
    <div className="min-h-screen py-8 px-4 relative">
      {/* Microsoft Learn Plan Button - Top Right */}
      <LearnPlanButton />

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
              <GitPullRequest className="w-16 h-16 text-orange-400" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
              Step 6: GitHub Issues & Pull Requests
            </h1>
            {userName && (
              <p className="text-xl text-gray-200/90">
                Almost there, {userName}! 🎯
              </p>
            )}
          </div>

          {/* What are Issues & PRs? */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-semibold text-white mb-4">
              Understanding Issues & Pull Requests
            </h2>
            <div className="space-y-4 text-gray-200/90 leading-relaxed">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">GitHub Issues</h3>
                <p>
                  <strong className="text-white">Issues</strong> are a way to track bugs, feature requests, and 
                  tasks in a repository. They help maintainers and contributors communicate about what needs to be done.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Pull Requests (PRs)</h3>
                <p>
                  A <strong className="text-white">Pull Request</strong> is a way to propose changes to a repository. 
                  When you open a PR, you're asking the maintainers to review and merge your code into the main project.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">How Open Source Contributions Work</h3>
                <p>
                  Open source contributions typically follow a workflow where contributors:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                  <li>Find issues they want to work on</li>
                  <li>Make changes in their own fork</li>
                  <li>Submit a Pull Request for review</li>
                  <li>Collaborate with maintainers to improve the code</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Contribution Workflow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-semibold text-white mb-4">
              Contribution Workflow
            </h2>
            <div className="space-y-3">
              {workflowSteps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-start gap-4 p-4 bg-black/20 rounded-lg border border-white/5 hover:bg-black/30 transition"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-500/30 border border-orange-400/50 flex items-center justify-center text-orange-300 font-bold">
                    {step.number}
                  </div>
                  <div className="flex-1 flex items-center">
                    <p className="text-white">{step.text}</p>
                    {index < workflowSteps.length - 1 && (
                      <ArrowRight className="w-5 h-5 text-gray-400 ml-auto hidden md:block" />
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Video Instructions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-8 bg-blue-500/10 border border-blue-400/30 rounded-xl p-6"
          >
            <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
              <Play className="w-5 h-5 text-blue-400" />
              Video Instructions
            </h3>
            <p className="text-gray-200/90 mb-4">
              You should watch <strong className="text-white">both videos</strong> below. Each covers different 
              perspectives of Issues, PR workflow, and open source contribution:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-200/90 ml-4">
              <li>First video: Understanding Issues and Pull Requests</li>
              <li>Second video: Complete guide to open source contribution</li>
              <li>Both videos complement each other for a complete understanding</li>
            </ul>
          </motion.div>

          {/* Embedded Videos */}
          <div className="grid grid-cols-1 gap-6 mb-8">
            {videos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="space-y-3"
              >
                <h3 className="text-lg font-semibold text-white">{video.title}</h3>
                <div className="relative w-full pb-[56.25%] rounded-lg overflow-hidden bg-black/20 border border-white/10">
                  <iframe
                    src={video.url}
                    title={video.title}
                    className="absolute top-0 left-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
                <p className="text-sm text-gray-300/80">{video.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Completion Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="mt-8"
          >
            <CompletionButton pageNumber={6} onComplete={handleComplete} />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Page6;

