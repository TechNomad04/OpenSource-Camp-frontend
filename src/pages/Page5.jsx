import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, CheckCircle2, Play } from 'lucide-react';
import { getUserProgress } from '../api/user.api';
import ProgressIndicator from '../components/ProgressIndicator';
import LearnPlanButton from '../components/LearnPlanButton';
import CompletionButton from '../components/CompletionButton';

const Page5 = () => {
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
      navigate('/page/6');
    }, 1500);
  };

  const videos = [
    {
      id: 'markdown1',
      title: 'Markdown Tutorial',
      url: 'https://www.youtube.com/embed/_PPWWRV6gbA',
      description: 'Comprehensive guide to Markdown syntax'
    },
    {
      id: 'markdown2',
      title: 'Markdown for GitHub',
      url: 'https://www.youtube.com/embed/bpdvNwvEeSE',
      description: 'Markdown specifically for GitHub repositories'
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
              <FileText className="w-16 h-16 text-purple-400" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Step 5: GitHub Markdown & README
            </h1>
            {userName && (
              <p className="text-xl text-gray-200/90">
                You're doing great, {userName}! 🌟
              </p>
            )}
          </div>

          {/* What is Markdown? */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-semibold text-white mb-4">
              What is Markdown?
            </h2>
            <div className="space-y-4 text-gray-200/90 leading-relaxed">
              <p>
                <strong className="text-white">Markdown</strong> is a lightweight markup language that allows you to 
                format text using simple syntax. It's easy to read and write, making it perfect for documentation.
              </p>
              <p>
                On GitHub, Markdown is the standard format for:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>README files (project documentation)</li>
                <li>Issue descriptions</li>
                <li>Pull request descriptions</li>
                <li>Wiki pages</li>
                <li>Comments and discussions</li>
              </ul>
            </div>
          </motion.div>

          {/* What is a README? */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-semibold text-white mb-4">
              What is a README.md File?
            </h2>
            <div className="space-y-4 text-gray-200/90 leading-relaxed">
              <p>
                A <strong className="text-white">README.md</strong> file is the first thing people see when they visit 
                your repository. It's your project's front door - a place to explain what your project does, how to use it, 
                and how others can contribute.
              </p>
              <div className="mt-4 space-y-2">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                  <p>
                    <strong className="text-white">Project Explanation:</strong> Clearly describe what your project is 
                    and what problem it solves.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                  <p>
                    <strong className="text-white">Contribution Guidance:</strong> Help others understand how they can 
                    contribute to your project.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                  <p>
                    <strong className="text-white">First Impression:</strong> A well-written README makes your project 
                    look professional and welcoming to contributors.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Video Instructions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-8 bg-blue-500/10 border border-blue-400/30 rounded-xl p-6"
          >
            <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
              <Play className="w-5 h-5 text-blue-400" />
              Video Instructions
            </h3>
            <p className="text-gray-200/90 mb-4">
              You can choose <strong className="text-white">any one</strong> of the two videos below. Both explain 
              Markdown sufficiently, so pick based on your language preference or teaching style:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-200/90 ml-4">
              <li>Both videos cover Markdown syntax and usage</li>
              <li>Choose based on your preferred learning style</li>
              <li>Either video will give you the knowledge you need</li>
            </ul>
          </motion.div>

          {/* Embedded Videos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {videos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
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
            transition={{ delay: 0.8 }}
            className="mt-8"
          >
            <CompletionButton pageNumber={5} onComplete={handleComplete} />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Page5;

