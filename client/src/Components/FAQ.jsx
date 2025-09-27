import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const faqs = [
    {
      question: "What is FlexiLeave?",
      answer: "FlexiLeave is a leave management system designed to streamline leave requests and approvals for employees and managers.",
      icon: "🎯"
    },
    {
      question: "How do I reset my password?",
      answer: "You can reset your password by clicking on the 'Forgot Password' link on the login page and following the instructions.",
      icon: "🔑"
    },
    {
      question: "Can I cancel a leave request?",
      answer: "Yes, you can cancel a leave request before it is approved by navigating to your leave history and selecting the cancel option.",
      icon: "❌"
    },
    {
      question: "What happens if my leave is rejected?",
      answer: "If your leave is rejected, you will be notified via email with the reason for the rejection. You can submit a new request if needed.",
      icon: "📧"
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const contentVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { 
      opacity: 1, 
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 45, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -45, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-indigo-500/10 to-transparent rounded-full blur-3xl"
        />
      </div>

      <div className="relative px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="max-w-4xl mx-auto">
          {/* Header section with enhanced animation */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-200 via-indigo-300 to-purple-200">
              Frequently Asked Questions
            </h1>
            <motion.div 
              className="w-24 h-1 mx-auto rounded-full bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-500"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </motion.div>

          {/* FAQ items */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4 sm:space-y-6"
          >
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="rounded-xl overflow-hidden backdrop-blur-sm"
              >
                <motion.div
                  className={`border border-white/10 rounded-xl transition-all duration-300 ${
                    activeIndex === index
                      ? "bg-white/10"
                      : "bg-white/5 hover:bg-white/8"
                  }`}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <button
                    className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none"
                    onClick={() => toggleFAQ(index)}
                  >
                    <div className="flex items-center space-x-4">
                      <span className="text-2xl">{faq.icon}</span>
                      <span className="text-base sm:text-lg font-semibold text-white">
                        {faq.question}
                      </span>
                    </div>
                    <motion.span
                      animate={{
                        rotate: activeIndex === index ? 180 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className="text-purple-300 text-xl"
                    >
                      ▼
                    </motion.span>
                  </button>

                  <AnimatePresence>
                    {activeIndex === index && (
                      <motion.div
                        variants={contentVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="px-6 pb-5"
                      >
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="prose prose-invert max-w-none"
                        >
                          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                            {faq.answer}
                          </p>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default FAQ;
