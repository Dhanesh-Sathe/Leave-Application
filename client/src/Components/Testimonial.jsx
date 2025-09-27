import React from "react";
import { motion } from "framer-motion";

function Testimonials() {
  const testimonials = [
    {
      name: "Aditi Sharma",
      role: "HR Manager",
      feedback:
        "This system has completely transformed how we handle leave requests. It's efficient and user-friendly!",
      image: "./images/bg2.avif",
      gradient: "from-cyan-400 to-blue-500",
      hoverGradient: "from-cyan-500 to-blue-600",
    },
    {
      name: "Rohan Kapoor",
      role: "Software Engineer",
      feedback:
        "The streamlined process has saved us so much time. Highly recommend it to all companies!",
      image: "./images/bg2.avif",
      gradient: "from-violet-400 to-purple-500",
      hoverGradient: "from-violet-500 to-purple-600",
    },
    {
      name: "Neha Gupta",
      role: "Team Lead",
      feedback: "Easy to use and very reliable. It makes leave tracking a breeze!",
      image: "./images/bg2.avif",
      gradient: "from-rose-400 to-pink-500",
      hoverGradient: "from-rose-500 to-pink-600",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: { 
      y: 50, 
      opacity: 0,
      scale: 0.9
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
        duration: 0.8,
      },
    },
  };

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-purple-500/20 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-blue-500/20 to-transparent rounded-full blur-3xl"
        />
      </div>

      <div className="relative container mx-auto max-w-7xl">
        {/* Section Header with enhanced animation */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: "spring" }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 mb-6">
            What Our Users Say
          </h2>
          <motion.div 
            className="w-32 h-1.5 mx-auto rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
            whileInView={{
              scaleX: [0, 1],
              opacity: [0, 1],
            }}
            transition={{ duration: 0.8 }}
          />
        </motion.div>

        {/* Testimonials Grid with enhanced animations */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ 
                scale: 1.03,
                transition: { duration: 0.3 }
              }}
              className="relative group"
            >
              {/* Card background with enhanced hover effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-gray-800/80 to-gray-900/80 rounded-2xl transition-all duration-300 group-hover:from-gray-800/90 group-hover:to-gray-900/90" />
              
              {/* Glowing border effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${testimonial.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-all duration-300 rounded-2xl`} />
              
              {/* Card content */}
              <div className="relative backdrop-blur-sm rounded-2xl p-8 border border-white/10 group-hover:border-white/20 transition-all duration-300">
                {/* Profile section */}
                <div className="flex items-center mb-6">
                  <div className="relative">
                    <div className={`absolute inset-0 bg-gradient-to-r ${testimonial.gradient} blur-md opacity-70 rounded-full`} />
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="relative w-16 h-16 rounded-full object-cover border-2 border-white/50 group-hover:border-white/70 transition-all duration-300"
                    />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-blue-200 transition-all duration-300">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-all duration-300">
                      {testimonial.role}
                    </p>
                  </div>
                </div>

                {/* Testimonial text */}
                <blockquote className="relative">
                  <span className="absolute -top-2 -left-2 text-4xl text-white/20 group-hover:text-white/30 transition-all duration-300">
                    "
                  </span>
                  <p className="text-gray-300 text-lg leading-relaxed pl-4 group-hover:text-white transition-all duration-300">
                    {testimonial.feedback}
                  </p>
                  <span className="absolute -bottom-4 -right-2 text-4xl text-white/20 group-hover:text-white/30 transition-all duration-300">
                    "
                  </span>
                </blockquote>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Testimonials;
