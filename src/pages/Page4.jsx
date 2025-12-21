import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GitBranch, CheckCircle2, Play } from 'lucide-react';
import { getUserProgress } from '../api/user.api';
import ProgressIndicator from '../components/ProgressIndicator';
import LearnPlanButton from '../components/LearnPlanButton';
import CompletionButton from '../components/CompletionButton';

const Page4 = () => {
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
    setTimeout(() => {
      navigate('/page/5');
    }, 1500);
  };

  const videos = [
    {
      id: 'hindi',
      title: 'Git & GitHub Tutorial (Hindi)',
      url: 'https://www.youtube.com/embed/Ez8F0nW6S-w',
      description: 'More beginner-friendly, includes Git setup instructions'
    },
    {
      id: 'english',
      title: 'Git & GitHub Tutorial (English)',
      url: 'https://www.youtube.com/embed/S7XpTAnSDL4',
      description: 'Concise explanation of Git and GitHub concepts'
    }
  ];

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
              <GitBranch className="w-16 h-16 text-green-400" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Step 4: Introduction to Git & GitHub
            </h1>
            {userName && (
              <p className="text-xl text-gray-200/90">
                Keep going, {userName}! 💪
              </p>
            )}
          </div>

          {/* Why Git & GitHub Matter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-semibold text-white mb-4">
              Why Git & GitHub Matter
            </h2>
            <div className="space-y-4 text-gray-200/90 leading-relaxed">
              <p>
                <strong className="text-white">Git</strong> is a version control system that helps you track changes 
                in your code. Think of it as a time machine for your projects - you can go back to any previous 
                version whenever you need to.
              </p>
              <p>
                <strong className="text-white">GitHub</strong> is a platform that hosts Git repositories in the cloud. 
                It's where developers collaborate, share code, and contribute to open source projects.
              </p>
              <div className="mt-4 space-y-2">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                  <p>
                    <strong className="text-white">Version Control:</strong> Never lose your work. Track every change 
                    and revert when needed.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                  <p>
                    <strong className="text-white">Collaboration:</strong> Work with teams seamlessly. Multiple people 
                    can work on the same project without conflicts.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                  <p>
                    <strong className="text-white">Open Source:</strong> Contribute to projects you love and learn from 
                    the best developers in the world.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Video Instructions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8 bg-blue-500/10 border border-blue-400/30 rounded-xl p-6"
          >
            <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
              <Play className="w-5 h-5 text-blue-400" />
              Video Instructions
            </h3>
            <p className="text-gray-200/90 mb-4">
              You may watch <strong className="text-white">any one</strong> of the two videos below. Choose based on 
              your language preference and learning style:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-200/90 ml-4">
              <li><strong className="text-white">Hindi Version:</strong> More beginner-friendly, includes Git setup instructions</li>
              <li><strong className="text-white">English Version:</strong> Concise explanation of Git and GitHub concepts</li>
            </ul>
          </motion.div>

          {/* Embedded Videos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {videos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="space-y-3"
              >
                <h3 className="text-lg font-semibold text-white">{video.title}</h3>
                <div className="relative w-full pb-[56.25%] rounded-lg overflow-hidden bg-black/20 border border-white">
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
            transition={{ delay: 0.7 }}
            className="mt-8"
          >
            <CompletionButton pageNumber={4} onComplete={handleComplete} />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Page4;

