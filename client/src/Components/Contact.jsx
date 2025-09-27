import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';

function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setFormData({ name: '', email: '', subject: '', message: '' });
    // Add your form submission logic here
  };

  const contactInfo = [
    {
      icon: <FaPhone className="text-purple-500" />,
      title: "Phone",
      content: "+1 (555) 123-4567",
      link: "tel:+15551234567"
    },
    {
      icon: <FaEnvelope className="text-purple-500" />,
      title: "Email",
      content: "support@example.com",
      link: "mailto:support@example.com"
    },
    {
      icon: <FaClock className="text-purple-500" />,
      title: "Business Hours",
      content: "Mon - Fri: 9AM to 5PM"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-purple-100 py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div 
          variants={itemVariants}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
            We'd Love to Hear from You!
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions? We're here to help. Send us a message and we'll respond as soon as possible.
          </p>
        </motion.div>

        {/* Contact Info Cards */}
        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          {contactInfo.map((info, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-xl shadow-lg p-6 text-center transform transition-all duration-300 hover:shadow-xl"
            >
              <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center bg-purple-100 rounded-full">
                {info.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{info.title}</h3>
              {info.link ? (
                <a href={info.link} className="text-purple-600 hover:text-purple-700 transition-colors">
                  {info.content}
                </a>
              ) : (
                <p className="text-gray-600">{info.content}</p>
              )}
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Form */}
          <motion.div 
            variants={itemVariants}
            className="bg-white shadow-xl rounded-2xl p-8 border-l-8 border-purple-500"
          >
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Send Us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <motion.div whileTap={{ scale: 0.99 }}>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-300"
                    placeholder="Your Name"
                    required
                  />
                </motion.div>
                <motion.div whileTap={{ scale: 0.99 }}>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-300"
                    placeholder="Your Email"
                    required
                  />
                </motion.div>
              </div>
              <motion.div whileTap={{ scale: 0.99 }}>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <input
                  type="text"
                  id="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-300"
                  placeholder="Subject"
                  required
                />
              </motion.div>
              <motion.div whileTap={{ scale: 0.99 }}>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  id="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-300"
                  placeholder="Your Message"
                  required
                ></textarea>
              </motion.div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 px-6 rounded-lg font-semibold 
                  hover:from-purple-600 hover:to-pink-600 transition duration-300 flex items-center justify-center
                  ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                ) : null}
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </motion.button>
            </form>
          </motion.div>

          {/* Location Map */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col justify-start bg-white shadow-xl rounded-2xl p-8 border-l-8 border-purple-500"
          >
            <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              <FaMapMarkerAlt className="mr-2 text-purple-500" /> Our Location
            </h3>
            <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
              <iframe
                title="Google Map"
                className="absolute inset-0 w-full h-full border-0 rounded-lg shadow-lg"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.529120499905!2d-122.40641748468193!3d37.78521427975844!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858064f0bf6b97%3A0x2a8af6a930e8a937!2sFlexiStreet!5e0!3m2!1sen!2sus!4v1618440198561!5m2!1sen!2sus"
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
            <div className="mt-6 p-4 bg-purple-50 rounded-lg">
              <p className="text-gray-700">
                <strong>Address:</strong><br />
                1234 FlexiStreet, Suite 100<br />
                San Francisco, CA 94105<br />
                United States
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default ContactSection;
