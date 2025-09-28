import React, { useState } from "react";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaFileUpload } from "react-icons/fa";
const API_URL = process.env.REACT_APP_API_URL;

const LeaveApplicationForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: "",
    phoneDuringLeave: "",
    backupName: "",
    backupContact: "",
    attachments: null,
    policyAcknowledged: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 5 * 1024 * 1024) { // 5MB limit
      toast.warning("File size should not exceed 5MB");
      return;
    }
    setFormData({ ...formData, attachments: file });
  };

  const validateDates = () => {
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    if (end < start) {
      toast.error("End date cannot be before start date");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateDates()) return;
    
    setIsLoading(true);
    const formDataToSend = new FormData();
    Object.keys(formData).forEach(key => {
      if (key === 'attachments' && formData[key]) {
        formDataToSend.append(key, formData[key]);
      } else {
        formDataToSend.append(key, formData[key].toString());
      }
    });

    try {
      const response = await fetch(`${API_URL}/api/leave/`, {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) throw new Error('Server response was not ok');

      toast.success("✅ Leave application submitted successfully!", {
        position: "top-right",
        theme: "colored",
      });

      // Reset form
      setFormData({
        leaveType: "",
        startDate: "",
        endDate: "",
        reason: "",
        phoneDuringLeave: "",
        backupName: "",
        backupContact: "",
        attachments: null,
        policyAcknowledged: false,
      });
      
    } catch (error) {
      toast.error("Failed to submit leave application. Please try again.", {
        position: "top-right",
        theme: "colored",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const inputVariants = {
    focus: { scale: 1.02, transition: { duration: 0.2 } }
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={formVariants}
        className="max-w-4xl mx-auto"
      >
        <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl p-6 sm:p-8">
          <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Leave Application
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Leave Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                whileFocus="focus"
                variants={inputVariants}
                className="space-y-2"
              >
                <label className="block text-sm font-medium text-gray-700">
                  Leave Type <span className="text-red-500">*</span>
                </label>
                <select
                  name="leaveType"
                  value={formData.leaveType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  required
                >
                  <option value="">Select Leave Type</option>
                  <option value="Sick Leave">Sick Leave</option>
                  <option value="Casual Leave">Casual Leave</option>
                  <option value="Paid Leave">Paid Leave</option>
                  <option value="Emergency Leave">Emergency Leave</option>
                </select>
              </motion.div>

              <motion.div
                whileFocus="focus"
                variants={inputVariants}
                className="space-y-2"
              >
                <label className="block text-sm font-medium text-gray-700">
                  Phone During Leave <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phoneDuringLeave"
                  value={formData.phoneDuringLeave}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  required
                  pattern="[0-9]{10}"
                  title="Please enter a valid 10-digit phone number"
                />
              </motion.div>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                whileFocus="focus"
                variants={inputVariants}
                className="space-y-2"
              >
                <label className="block text-sm font-medium text-gray-700">
                  Start Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  required
                />
              </motion.div>

              <motion.div
                whileFocus="focus"
                variants={inputVariants}
                className="space-y-2"
              >
                <label className="block text-sm font-medium text-gray-700">
                  End Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  min={formData.startDate || new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  required
                />
              </motion.div>
            </div>

            {/* Reason */}
            <motion.div
              whileFocus="focus"
              variants={inputVariants}
              className="space-y-2"
            >
              <label className="block text-sm font-medium text-gray-700">
                Reason for Leave <span className="text-red-500">*</span>
              </label>
              <textarea
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                rows="4"
                required
                placeholder="Please provide detailed reason for your leave..."
              ></textarea>
            </motion.div>

            {/* Backup Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                whileFocus="focus"
                variants={inputVariants}
                className="space-y-2"
              >
                <label className="block text-sm font-medium text-gray-700">
                  Backup Person Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="backupName"
                  value={formData.backupName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  required
                />
              </motion.div>

              <motion.div
                whileFocus="focus"
                variants={inputVariants}
                className="space-y-2"
              >
                <label className="block text-sm font-medium text-gray-700">
                  Backup Contact <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="backupContact"
                  value={formData.backupContact}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  required
                  pattern="[0-9]{10}"
                  title="Please enter a valid 10-digit phone number"
                />
              </motion.div>
            </div>

            {/* File Upload */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="space-y-2"
            >
              <label className="block text-sm font-medium text-gray-700">
                Attachments (Optional)
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="w-full flex flex-col items-center px-4 py-6 bg-white rounded-lg border-2 border-dashed border-gray-300 cursor-pointer hover:border-blue-500 transition-colors duration-300">
                  <FaFileUpload className="w-8 h-8 text-gray-400" />
                  <span className="mt-2 text-sm text-gray-500">
                    Click to upload or drag and drop
                  </span>
                  <span className="text-xs text-gray-500">
                    Max file size: 5MB
                  </span>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  />
                </label>
              </div>
            </motion.div>

            {/* Policy Acknowledgment */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="flex items-start space-x-2"
            >
              <input
                type="checkbox"
                name="policyAcknowledged"
                checked={formData.policyAcknowledged}
                onChange={handleChange}
                className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                required
              />
              <div className="text-sm text-gray-700">
                <p>I acknowledge that:</p>
                <ul className="list-disc ml-5 mt-1">
                  <li>All information provided is accurate</li>
                  <li>I have arranged work handover with my backup</li>
                  <li>I will be reachable on the provided contact number</li>
                </ul>
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white 
                bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 
                transition-all duration-300 ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </>
              ) : (
                'Submit Application'
              )}
            </motion.button>
          </form>
        </div>
      </motion.div>

      <ToastContainer />
    </div>
  );
};

export default LeaveApplicationForm;
