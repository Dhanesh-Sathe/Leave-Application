import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCalendarAlt, FaHistory, FaClock, FaChartBar, FaDownload, FaSpinner } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DetailedLeaveReport = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [leaveData, setLeaveData] = useState({
    balance: 0,
    history: 0,
    pending: 0,
    monthlyBreakdown: [],
    recentLeaves: []
  });

  useEffect(() => {
    // Simulated API call
    const fetchLeaveData = async () => {
      try {
        setIsLoading(true);
        // Replace with actual API call
        const mockData = {
          balance: 12,
          history: 24,
          pending: 3,
          monthlyBreakdown: [
            { month: 'Jan', count: 2 },
            { month: 'Feb', count: 1 },
            { month: 'Mar', count: 3 },
            { month: 'Apr', count: 0 },
          ],
          recentLeaves: [
            { type: 'Sick Leave', date: '2024-01-15', status: 'Approved' },
            { type: 'Casual Leave', date: '2024-02-01', status: 'Pending' },
            { type: 'Emergency Leave', date: '2024-02-10', status: 'Rejected' },
          ]
        };
        
        setTimeout(() => {
          setLeaveData(mockData);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        toast.error("Failed to fetch leave data");
        setIsLoading(false);
      }
    };

    fetchLeaveData();
  }, []);

  const handleDownloadReport = () => {
    toast.info("Downloading report...");
    // Implement download functionality
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 text-white px-4 py-12 sm:px-6 lg:px-8">
      {/* Header Section */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-pink-300">
          Detailed Leave Report
        </h1>
        <p className="mt-2 text-lg md:text-xl text-gray-300">
          Comprehensive overview of your leave statistics
        </p>
      </motion.div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <FaSpinner className="animate-spin text-4xl text-white" />
        </div>
      ) : (
        <>
          {/* Stats Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          >
            {/* Leave Balance Card */}
            <motion.div
              variants={cardVariants}
              whileHover={{ scale: 1.02 }}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-200">Leave Balance</h3>
                <FaCalendarAlt className="text-2xl text-indigo-400" />
              </div>
              <p className="mt-4 text-4xl font-bold text-indigo-400">{leaveData.balance}</p>
              <p className="mt-2 text-sm text-gray-400">Available leave days</p>
            </motion.div>

            {/* Leave History Card */}
            <motion.div
              variants={cardVariants}
              whileHover={{ scale: 1.02 }}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-200">Leave History</h3>
                <FaHistory className="text-2xl text-purple-400" />
              </div>
              <p className="mt-4 text-4xl font-bold text-purple-400">{leaveData.history}</p>
              <p className="mt-2 text-sm text-gray-400">Total leaves taken</p>
            </motion.div>

            {/* Pending Requests Card */}
            <motion.div
              variants={cardVariants}
              whileHover={{ scale: 1.02 }}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-200">Pending Requests</h3>
                <FaClock className="text-2xl text-yellow-400" />
              </div>
              <p className="mt-4 text-4xl font-bold text-yellow-400">{leaveData.pending}</p>
              <p className="mt-2 text-sm text-gray-400">Awaiting approval</p>
            </motion.div>
          </motion.div>

          {/* Recent Leaves Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-6 mb-8 border border-white/20"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-200">Recent Leaves</h3>
              <FaChartBar className="text-2xl text-blue-400" />
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200/20">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200/20">
                  <AnimatePresence>
                    {leaveData.recentLeaves.map((leave, index) => (
                      <motion.tr
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="hover:bg-white/5"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{leave.type}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {new Date(leave.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            leave.status === 'Approved' ? 'bg-green-900/50 text-green-300' :
                            leave.status === 'Rejected' ? 'bg-red-900/50 text-red-300' :
                            'bg-yellow-900/50 text-yellow-300'
                          }`}>
                            {leave.status}
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row justify-center items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <button
              onClick={handleDownloadReport}
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <FaDownload /> Download Full Report
            </button>
          </motion.div>
        </>
      )}

      <ToastContainer position="bottom-right" theme="dark" />
    </div>
  );
};

export default DetailedLeaveReport;
