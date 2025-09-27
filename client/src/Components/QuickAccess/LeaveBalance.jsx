import React from 'react';
import { motion } from 'framer-motion';
import { FaCalendarCheck, FaHistory, FaClock } from 'react-icons/fa';

const LeaveBalance = () => {
  // Mock data - replace with actual API call
  const balanceData = {
    annual: 12,
    sick: 7,
    casual: 5,
    pending: 2
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-3xl font-bold text-white mb-8">Leave Balance Overview</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Available Leaves */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-6"
          >
            <div className="flex items-center gap-4">
              <FaCalendarCheck className="text-2xl text-green-400" />
              <div>
                <h3 className="text-lg font-semibold text-white">Available Leaves</h3>
                <p className="text-3xl font-bold text-green-400 mt-2">{balanceData.annual}</p>
                <p className="text-sm text-gray-300 mt-1">Annual Leave Balance</p>
              </div>
            </div>
          </motion.div>

          {/* Sick Leaves */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-6"
          >
            <div className="flex items-center gap-4">
              <FaHistory className="text-2xl text-blue-400" />
              <div>
                <h3 className="text-lg font-semibold text-white">Sick Leaves</h3>
                <p className="text-3xl font-bold text-blue-400 mt-2">{balanceData.sick}</p>
                <p className="text-sm text-gray-300 mt-1">Remaining</p>
              </div>
            </div>
          </motion.div>

          {/* Pending Requests */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-6"
          >
            <div className="flex items-center gap-4">
              <FaClock className="text-2xl text-yellow-400" />
              <div>
                <h3 className="text-lg font-semibold text-white">Pending Requests</h3>
                <p className="text-3xl font-bold text-yellow-400 mt-2">{balanceData.pending}</p>
                <p className="text-sm text-gray-300 mt-1">Awaiting Approval</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Leave History Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 bg-white/10 backdrop-blur-lg rounded-xl p-6"
        >
          <h2 className="text-xl font-semibold text-white mb-6">Recent Leave History</h2>
          <div className="space-y-4">
            {[
              { type: 'Annual Leave', date: '2024-01-15', status: 'Approved' },
              { type: 'Sick Leave', date: '2024-02-01', status: 'Completed' },
              { type: 'Casual Leave', date: '2024-02-10', status: 'Pending' }
            ].map((leave, index) => (
              <div key={index} className="flex items-center gap-4 p-4 bg-white/5 rounded-lg">
                <div className={`w-3 h-3 rounded-full ${
                  leave.status === 'Approved' ? 'bg-green-400' :
                  leave.status === 'Pending' ? 'bg-yellow-400' : 'bg-blue-400'
                }`} />
                <div>
                  <p className="text-white font-medium">{leave.type}</p>
                  <p className="text-sm text-gray-300">{new Date(leave.date).toLocaleDateString()}</p>
                </div>
                <span className={`ml-auto text-sm ${
                  leave.status === 'Approved' ? 'text-green-400' :
                  leave.status === 'Pending' ? 'text-yellow-400' : 'text-blue-400'
                }`}>
                  {leave.status}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LeaveBalance;