import React from 'react';
import { motion } from 'framer-motion';
import { FaQuestionCircle, FaBook, FaHeadset, FaVideo } from 'react-icons/fa';

const Help = () => {
  const helpCategories = [
    {
      title: 'Quick Start Guide',
      icon: <FaBook className="text-2xl sm:text-3xl text-blue-400" />,
      description: 'Learn the basics of using the leave management system',
      links: [
        { title: 'How to Apply for Leave', url: '#' },
        { title: 'Checking Leave Balance', url: '#' },
        { title: 'Understanding Leave Types', url: '#' }
      ]
    },
    {
      title: 'Video Tutorials',
      icon: <FaVideo className="text-2xl sm:text-3xl text-purple-400" />,
      description: 'Watch step-by-step video guides',
      links: [
        { title: 'Leave Application Process', url: '#' },
        { title: 'Using the Calendar', url: '#' },
        { title: 'Managing Your Profile', url: '#' }
      ]
    },
    {
      title: 'FAQs',
      icon: <FaQuestionCircle className="text-2xl sm:text-3xl text-green-400" />,
      description: 'Find answers to common questions',
      links: [
        { title: 'Leave Policy Questions', url: '#' },
        { title: 'Technical Support', url: '#' },
        { title: 'Account Management', url: '#' }
      ]
    },
    {
      title: 'Contact Support',
      icon: <FaHeadset className="text-2xl sm:text-3xl text-yellow-400" />,
      description: 'Get help from our support team',
      links: [
        { title: 'Submit a Ticket', url: '#' },
        { title: 'Live Chat', url: '#' },
        { title: 'Email Support', url: '#' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 px-4 sm:px-6 py-6 sm:py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        <div className="flex flex-col items-start mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Help Center</h1>
          <p className="text-gray-300 mt-2 text-sm sm:text-base">
            Find answers and get support for FlexiLeave
          </p>
        </div>

        {/* Search Section - Moved to top for better mobile access */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 bg-white/10 backdrop-blur-lg rounded-xl p-4 sm:p-6"
        >
          <h2 className="text-lg sm:text-xl font-bold text-white mb-4">Search Help Articles</h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Search for help..."
              className="flex-grow px-4 py-2 rounded-lg bg-white/5 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:border-blue-400 text-sm sm:text-base"
            />
            <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm sm:text-base whitespace-nowrap">
              Search
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {helpCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-4 sm:p-6"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="mt-1">{category.icon}</div>
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-white">{category.title}</h2>
                  <p className="text-gray-300 text-sm mt-1">{category.description}</p>
                </div>
              </div>

              <div className="space-y-2">
                {category.links.map((link, linkIndex) => (
                  <motion.a
                    key={linkIndex}
                    href={link.url}
                    whileHover={{ x: 10 }}
                    className="block p-3 rounded-lg bg-white/5 text-white hover:bg-white/10 transition-colors text-sm sm:text-base"
                  >
                    {link.title}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Popular Articles Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 bg-white/10 backdrop-blur-lg rounded-xl p-4 sm:p-6"
        >
          <h2 className="text-lg sm:text-xl font-bold text-white mb-4">Popular Articles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              'How to request emergency leave',
              'Understanding leave approval process',
              'Setting up notifications',
              'Managing your leave calendar'
            ].map((article, index) => (
              <motion.a
                key={index}
                href="#"
                whileHover={{ x: 10 }}
                className="block p-3 rounded-lg bg-white/5 text-white hover:bg-white/10 transition-colors text-sm sm:text-base"
              >
                {article}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Help;
