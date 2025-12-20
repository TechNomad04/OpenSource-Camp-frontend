import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Rocket, CheckCircle2, Code, BookOpen, Users, Star } from 'lucide-react';
import { getUserProgress } from '../api/user.api';
import ProgressIndicator from '../components/ProgressIndicator';
import LearnPlanButton from '../components/LearnPlanButton';
import CompletionButton from '../components/CompletionButton';

const Page7 = () => {
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

  const projectSteps = [
    {
      number: 1,
      title: 'Choose Your Project Idea',
      description: 'Start with something you\'re passionate about. It could be a tool you need, a problem you want to solve, or something that interests you.',
      icon: <Rocket className="w-6 h-6" />
    },
    {
      number: 2,
      title: 'Plan Your Project',
      description: 'Define the scope, features, and goals. Create a roadmap and break down the project into manageable tasks.',
      icon: <BookOpen className="w-6 h-6" />
    },
    {
      number: 3,
      title: 'Set Up Your Repository',
      description: 'Create a new repository on GitHub. Initialize it with a README, license, and .gitignore file. Make it public to share with the world.',
      icon: <Code className="w-6 h-6" />
    },
    {
      number: 4,
      title: 'Write Clear Documentation',
      description: 'Create a comprehensive README with installation instructions, usage examples, and contribution guidelines. Good documentation attracts contributors.',
      icon: <BookOpen className="w-6 h-6" />
    },
    {
      number: 5,
      title: 'Make Your First Commit',
      description: 'Start coding! Make your initial commit with the basic structure. Remember to write clean, readable code and meaningful commit messages.',
      icon: <Code className="w-6 h-6" />
    },
    {
      number: 6,
      title: 'Welcome Contributors',
      description: 'Add contribution guidelines, code of conduct, and issue templates. Be open to feedback and contributions from the community.',
      icon: <Users className="w-6 h-6" />
    },
    {
      number: 7,
      title: 'Promote Your Project',
      description: 'Share your project on social media, developer communities, and relevant forums. The more visibility, the more potential contributors.',
      icon: <Star className="w-6 h-6" />
    }
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
              <Rocket className="w-16 h-16 text-orange-400" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
              Step 7: Starting Your Own Open Source Project
            </h1>
            {userName && (
              <p className="text-xl text-gray-200/90">
                You're ready to create something amazing, {userName}! 🚀
              </p>
            )}
          </div>

          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-semibold text-white mb-4">
              Why Start an Open Source Project?
            </h2>
            <div className="space-y-3 text-gray-200/90">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                <p>
                  <strong className="text-white">Build Your Portfolio:</strong> Showcase your skills and creativity to potential employers and collaborators.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                <p>
                  <strong className="text-white">Learn by Doing:</strong> Starting a project teaches you project management, documentation, and community building.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                <p>
                  <strong className="text-white">Give Back:</strong> Contribute to the open source ecosystem and help others solve problems.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                <p>
                  <strong className="text-white">Build a Community:</strong> Connect with developers worldwide who share your interests and vision.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Step-by-Step Guide */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-semibold text-white mb-6">
              How to Start Your Open Source Project
            </h2>
            <div className="space-y-4">
              {projectSteps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="p-5 bg-black/20 rounded-lg border border-white/5 hover:border-white/10 transition"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-500/30 border border-orange-400/50 flex items-center justify-center text-orange-300">
                      {step.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-orange-400 font-bold">Step {step.number}</span>
                        <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                      </div>
                      <p className="text-gray-200/90">{step.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Video Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-semibold text-white mb-4">
              Watch: How to Start an Open Source Project
            </h2>
            <p className="text-gray-200/90 mb-4">
              Learn from experts about the best practices for starting and maintaining an open source project.
            </p>
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-lg"
                src="https://www.youtube.com/embed/eNDuqcrLTLs"
                title="How to Start an Open Source Project"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </motion.div>

          {/* Tips Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-semibold text-white mb-4">
              Pro Tips for Success
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-black/20 rounded-lg border border-white/5">
                <h3 className="text-white font-semibold mb-2">Start Small</h3>
                <p className="text-gray-200/90 text-sm">
                  Begin with a focused, achievable goal. You can always expand later.
                </p>
              </div>
              <div className="p-4 bg-black/20 rounded-lg border border-white/5">
                <h3 className="text-white font-semibold mb-2">Be Consistent</h3>
                <p className="text-gray-200/90 text-sm">
                  Regular updates and communication keep your project active and engaging.
                </p>
              </div>
              <div className="p-4 bg-black/20 rounded-lg border border-white/5">
                <h3 className="text-white font-semibold mb-2">Welcome Feedback</h3>
                <p className="text-gray-200/90 text-sm">
                  Listen to your users and contributors. Their input makes your project better.
                </p>
              </div>
              <div className="p-4 bg-black/20 rounded-lg border border-white/5">
                <h3 className="text-white font-semibold mb-2">Stay Organized</h3>
                <p className="text-gray-200/90 text-sm">
                  Use issues, milestones, and project boards to track progress and tasks.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Completion Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-8"
          >
            <CompletionButton pageNumber={7} onComplete={handleComplete} />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Page7;

