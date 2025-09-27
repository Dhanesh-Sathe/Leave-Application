import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { FaSpinner, FaDownload, FaEye, FaCalendarAlt } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LeaveStatusLanding = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState(null);

  useEffect(() => {
    const fetchLeaveStatus = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("http://localhost:8000/api/leave/");
        const data = await response.json();
        setLeaveRequests(data.data);
      } catch (error) {
        toast.error("Failed to fetch leave requests. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeaveStatus();
  }, []);

  const handleDownloadReport = () => {
    // Implement download functionality
    toast.info("Downloading report...");
  };

  const statusColors = {
    Approved: "bg-green-100 text-green-800 border-green-200",
    Rejected: "bg-red-100 text-red-800 border-red-200",
    Pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 text-white px-4 py-20 sm:px-6 lg:px-8">
      {/* Header Section */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-100">
          Leave Status Dashboard
        </h1>
        <p className="mt-2 text-lg md:text-xl text-gray-200">
          Track and manage your leave applications efficiently
        </p>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {[
          { label: "Total Leaves", value: leaveRequests.length, color: "from-blue-500 to-blue-600" },
          { label: "Approved", value: leaveRequests.filter(r => r.status === "Approved").length, color: "from-green-500 to-green-600" },
          { label: "Pending", value: leaveRequests.filter(r => r.status === "Pending").length, color: "from-yellow-500 to-yellow-600" },
        ].map((stat, index) => (
          <motion.div
            key={index}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-6"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h3 className="text-lg font-medium text-gray-200">{stat.label}</h3>
            <p className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
              {stat.value}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Leave Status Table */}
      <motion.div
        className="w-full max-w-6xl mx-auto mb-8 overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl overflow-x-auto">
          {isLoading ? (
            <div className="flex items-center justify-center p-8">
              <FaSpinner className="animate-spin text-4xl text-white" />
            </div>
          ) : (
            <table className="w-full min-w-full divide-y divide-gray-200/20">
              <thead className="bg-black/20">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Dates</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200/20">
                <AnimatePresence>
                  {leaveRequests.map((request, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="hover:bg-white/5 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <FaCalendarAlt className="mr-2 text-indigo-300" />
                          <span className="text-gray-200">{request.leaveType}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-200">
                        {new Date(request.startDate).toLocaleDateString()} - {new Date(request.endDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-sm border ${statusColors[request.status]}`}>
                          {request.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => setSelectedRequest(request)}
                          className="text-indigo-300 hover:text-indigo-100 transition-colors flex items-center"
                        >
                          <FaEye className="mr-1" /> View
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          )}
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Link
          to="/leave-application"
          className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-xl shadow-lg hover:from-indigo-700 hover:to-indigo-800 transition-all duration-300 flex items-center justify-center gap-2 font-medium"
        >
          Apply for Leave
        </Link>
        <button
          onClick={handleDownloadReport}
          className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl shadow-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-300 flex items-center justify-center gap-2 font-medium"
        >
          <FaDownload /> Download Report
        </button>
      </motion.div>

      {/* Details Modal */}
      <AnimatePresence>
        {selectedRequest && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedRequest(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl p-6 max-w-lg w-full shadow-xl"
              onClick={e => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">Leave Request Details</h3>
              <div className="space-y-3 text-gray-700">
                <p><strong>Type:</strong> {selectedRequest.leaveType}</p>
                <p><strong>Start Date:</strong> {new Date(selectedRequest.startDate).toLocaleDateString()}</p>
                <p><strong>End Date:</strong> {new Date(selectedRequest.endDate).toLocaleDateString()}</p>
                <p><strong>Status:</strong> {selectedRequest.status}</p>
                {/* Add more details as needed */}
              </div>
              <button
                onClick={() => setSelectedRequest(null)}
                className="mt-6 w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ToastContainer position="bottom-right" theme="dark" />
    </div>
  );
};

export default LeaveStatusLanding;
