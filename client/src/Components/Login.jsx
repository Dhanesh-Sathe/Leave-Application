import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";

import {
  faGoogle,
  faFacebook,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const API_URL = process.env.REACT_APP_API_URL;

const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLoginSuccess = (data) => {
    // Store token without 'Bearer ' prefix
    const token = data.token.startsWith('Bearer ') ? data.token : `Bearer ${data.token}`;
    
    // Store user data in localStorage
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify({
      ...data.user,
      role: data.user.role || 'employee' // ensure role is always set
    }));
    
    // Show success message
    toast.success(data.message || "Welcome back! Login successful", {
      position: "top-right",
      theme: "colored",
    });

    // Redirect based on role and profile completion status
    if (!data.user.isProfileComplete) {
      navigate('/complete-profile');
    } else {
      switch (data.user.role) {
        case 'admin':
          navigate('/admin/dashboard');
          break;
        case 'manager':
          navigate('/manager/dashboard');
          break;
        default:
          navigate('/dashboard');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch(`${API_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
      });

      const data = await response.json();

      if (response.ok) {
        handleLoginSuccess(data);
      } else {
        toast.error(data.message || "Invalid credentials. Please try again.", {
          position: "top-right",
          theme: "colored",
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error("An error occurred. Please try again later.", {
        position: "top-right",
        theme: "colored",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (platform) => {
    toast.info(`${platform} login coming soon!`, {
      position: "top-center",
      theme: "colored",
    });
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const socialButtonVariants = {
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.2,
        type: "spring",
        stiffness: 300,
      },
    },
    tap: { scale: 0.95 },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 p-4 sm:p-6 lg:p-8">
      {/* Logo */}
      {/* <motion.a
        href="/"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-4 left-4 flex items-center space-x-2 text-white hover:text-blue-200 transition-colors duration-300"
      >
        <span className="text-2xl md:text-3xl font-bold">FlexiLeave</span>
      </motion.a> */}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md"
      >
        <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6">
          <div className="text-center">
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            >
              Welcome Back
            </motion.h2>
            <p className="mt-2 text-gray-600">Sign in to your account</p>
          </div>

          {/* Social Login */}
          <div className="space-y-4">
            <p className="text-sm text-gray-500 text-center">Sign in with</p>
            <div className="flex justify-center space-x-4">
              {[
                { icon: faGoogle, color: "text-red-500", platform: "Google" },
                { icon: faFacebook, color: "text-blue-600", platform: "Facebook" },
                { icon: faInstagram, color: "text-pink-500", platform: "Instagram" },
                { icon: faLinkedin, color: "text-blue-700", platform: "LinkedIn" },
              ].map((social) => (
                <motion.button
                  key={social.platform}
                  variants={socialButtonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={() => handleSocialLogin(social.platform)}
                  className={`p-3 rounded-full bg-gray-50 hover:bg-gray-100 shadow-md transition-all duration-300 ${social.color}`}
                >
                  <FontAwesomeIcon icon={social.icon} size="lg" />
                </motion.button>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or sign in with email</span>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                name="username"
                value={loginData.username}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder="Enter your username"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={loginData.password}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-700">Remember me</label>
              </div>
              <a href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800">
                Forgot password?
              </a>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white 
                bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 
                transition-all duration-300 ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                'Sign in'
              )}
            </motion.button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <motion.a
              whileHover={{ scale: 1.05 }}
              href="/register"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Create an account
            </motion.a>
          </p>
        </div>
      </motion.div>

      <ToastContainer />
    </div>
  );
};

export default LoginPage;
