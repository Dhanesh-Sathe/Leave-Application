import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './total.css';

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Prevent body scroll when mobile menu is open
    document.body.style.overflow = !isMobileMenuOpen ? 'hidden' : 'unset';
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = 'unset';
  };

  const handleNavigation = (path) => {
    closeMobileMenu(); // Close the menu
    navigate(path); // Navigate to the specified path
  };

  // Animation variants
  const navItemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 }
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.2,
        staggerChildren: 0.1
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.95,
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className={`fixed w-full ${
        scrolled 
          ? 'h-[70px] bg-gradient-to-r from-blue-600/95 via-purple-600/95 to-indigo-600/95 backdrop-blur-md'
          : 'h-[80px] bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500'
      } shadow-lg z-[100] transition-all duration-300`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8 h-full">
        {/* Logo Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/" className="group flex items-center">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-wide group-hover:scale-105 transition-transform duration-300">
              FlexiLeave
            </h1>
          </Link>
        </motion.div>

        {/* Desktop Navbar */}
        <nav className="hidden sm:block">
          <motion.ul 
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            className="flex items-center space-x-6 lg:space-x-8"
          >
            {[
              { to: "/", text: "Home" },
              { to: "/about", text: "About Us" },
              { to: "/contact", text: "Contact" },
              { to: "/help", text: "Help" }
            ].map((item) => (
              <motion.li key={item.text} variants={navItemVariants}>
                <Link
                  to={item.to}
                  className="text-lg font-semibold text-white hover:text-yellow-300 transition duration-300 relative group"
                >
                  {item.text}
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"/>
                </Link>
              </motion.li>
            ))}
            <motion.li variants={navItemVariants}>
              <Link
                to="/login"
                className="px-6 py-2.5 text-lg font-semibold bg-yellow-400 text-gray-800 rounded-full hover:bg-yellow-300 hover:scale-105 transform transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Login
              </Link>
            </motion.li>
          </motion.ul>
        </nav>

        {/* Mobile Navbar - Hamburger Menu */}
        <div className="sm:hidden">
          <button 
            onClick={toggleMobileMenu} 
            className="relative w-10 h-10 focus:outline-none"
            aria-label="Toggle menu"
          >
            <div className="absolute inset-0 flex flex-col justify-center items-center">
              <div
                className={`w-6 h-0.5 bg-white mb-1.5 transition-all duration-300 ${
                  isMobileMenuOpen ? 'transform rotate-45 translate-y-2' : ''
                }`}
              />
              <div
                className={`w-6 h-0.5 bg-white transition-all duration-300 ${
                  isMobileMenuOpen ? 'opacity-0' : ''
                }`}
              />
              <div
                className={`w-6 h-0.5 bg-white mt-1.5 transition-all duration-300 ${
                  isMobileMenuOpen ? 'transform -rotate-45 -translate-y-2' : ''
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu - Animated Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={mobileMenuVariants}
            className="fixed inset-0 w-full h-screen bg-gradient-to-b from-blue-600 via-purple-600 to-indigo-600"
            style={{ top: '0', left: '0', zIndex: 90 }}
          >
            <div className="flex flex-col h-full pt-[80px]">
              {/* Close button */}
              <div className="absolute top-4 right-4">
                <button
                  onClick={closeMobileMenu}
                  className="p-2 text-white hover:text-yellow-300 transition-colors duration-300"
                  aria-label="Close menu"
                >
                  <svg 
                    className="w-8 h-8" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Navigation links centered in the middle */}
              <nav className="flex-1 flex flex-col items-center justify-center">
                <div className="space-y-8">
                  {[
                    { to: "/", text: "Home" },
                    { to: "/about", text: "About Us" },
                    { to: "/contact", text: "Contact" },
                    { to: "/help", text: "Help" }
                  ].map((item) => (
                    <motion.div
                      key={item.text}
                      variants={navItemVariants}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="block"
                    >
                      <button
                        onClick={() => handleNavigation(item.to)}
                        className="text-3xl font-bold text-white hover:text-yellow-300 transition duration-300 block text-center w-full"
                      >
                        {item.text}
                      </button>
                    </motion.div>
                  ))}
                  
                  {/* Login button */}
                  <motion.div
                    variants={navItemVariants}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-12 flex justify-center"
                  >
                    <button
                      onClick={() => handleNavigation('/login')}
                      className="px-8 py-3 text-xl font-bold bg-yellow-400 text-gray-800 rounded-full hover:bg-yellow-300 transition-all duration-300 shadow-lg"
                    >
                      Login
                    </button>
                  </motion.div>
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default Header;
