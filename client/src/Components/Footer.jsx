import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaHeart } from "react-icons/fa";
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import { MdLocationOn } from "react-icons/md";

function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState(null);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setIsSubscribing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSubscriptionStatus('success');
    setEmail("");
    setIsSubscribing(false);
    setTimeout(() => setSubscriptionStatus(null), 3000);
  };

  const footerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={footerVariants}
      className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300"
    >
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <motion.div variants={childVariants} className="space-y-4">
            <Link to="/" className="block">
              <motion.h2 
                whileHover={{ scale: 1.05 }}
                className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
              >
                FlexiLeave
              </motion.h2>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Streamline your leave management process with our modern and efficient system. Making leave management easier for everyone.
            </p>
            <div className="flex space-x-4 mt-6">
              {[
                { icon: <FaFacebookF />, color: "hover:text-blue-500", link: "https://facebook.com" },
                { icon: <FaTwitter />, color: "hover:text-blue-400", link: "https://twitter.com" },
                { icon: <FaInstagram />, color: "hover:text-pink-500", link: "https://instagram.com" },
                { icon: <FaLinkedinIn />, color: "hover:text-blue-700", link: "https://linkedin.com" }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className={`${social.color} transition-colors duration-300 text-xl`}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={childVariants} className="space-y-4">
            <h4 className="text-lg font-bold text-white mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { text: "Home", path: "/" },
                { text: "About Us", path: "/about" },
                { text: "Services", path: "/services" },
                { text: "Contact", path: "/contact" },
                { text: "Privacy Policy", path: "/privacy-policy" }
              ].map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  className="transform transition-all duration-300"
                >
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-purple-400 transition-colors duration-300 flex items-center"
                  >
                    <span className="mr-2">→</span>
                    {link.text}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={childVariants} className="space-y-4">
            <h4 className="text-lg font-bold text-white mb-6">Contact Us</h4>
            <div className="space-y-4">
              {[
                { icon: <AiOutlineMail />, content: "support@flexileave.com", link: "mailto:support@flexileave.com" },
                { icon: <AiOutlinePhone />, content: "+1 (555) 123-4567", link: "tel:+15551234567" },
                { icon: <MdLocationOn />, content: "123 Business Avenue, Suite 100, New York, NY 10001" }
              ].map((contact, index) => (
                <motion.div
                  key={index}
                  whileHover={{ x: 5 }}
                  className="flex items-center space-x-3 text-gray-400"
                >
                  <span className="text-purple-400 text-xl">{contact.icon}</span>
                  {contact.link ? (
                    <a
                      href={contact.link}
                      className="hover:text-purple-400 transition-colors duration-300"
                    >
                      {contact.content}
                    </a>
                  ) : (
                    <span>{contact.content}</span>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Newsletter */}
          <motion.div variants={childVariants} className="space-y-4">
            <h4 className="text-lg font-bold text-white mb-6">Newsletter</h4>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for updates and insights.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-300 placeholder-gray-500"
                  required
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold 
                  hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center justify-center
                  ${isSubscribing ? 'opacity-75 cursor-not-allowed' : ''}`}
                disabled={isSubscribing}
              >
                {isSubscribing ? (
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                ) : (
                  'Subscribe'
                )}
              </motion.button>
              {subscriptionStatus === 'success' && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-green-400 text-sm"
                >
                  Thank you for subscribing!
                </motion.p>
              )}
            </form>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <motion.div 
        variants={childVariants}
        className="border-t border-gray-800 py-6"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              © {new Date().getFullYear()} FlexiLeave. All rights reserved.
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <span>Made with</span>
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <FaHeart className="text-red-500" />
              </motion.span>
              <span>by FlexiLeave Team</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.footer>
  );
}

export default Footer;
