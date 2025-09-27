import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './total.css';

function Main() {
    const fadeInUp = {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.7, ease: "easeOut" }
    };

    const staggerContainer = {
        animate: {
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const cardVariants = {
        initial: { opacity: 0, scale: 0.9 },
        animate: { 
            opacity: 1, 
            scale: 1,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pt-[80px]">
            {/* Hero Section */}
            <motion.div 
                className="container mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-8 pb-8 sm:pb-12 lg:pb-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
                    {/* Hero Text */}
                    <motion.div 
                        className="flex flex-col justify-center text-center lg:text-left lg:w-1/2 space-y-6"
                        {...fadeInUp}
                    >
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                            Welcome to
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500 mt-2">
                                FlexiLeave
                            </span>
                        </h1>
                        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0">
                            Streamline your leave management process with our modern and efficient system
                        </p>
                        <motion.div 
                            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                            variants={staggerContainer}
                            initial="initial"
                            animate="animate"
                        >
                            <motion.div variants={cardVariants}>
                                <Link 
                                    to="/leave-application"
                                    className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-500 rounded-xl hover:from-blue-700 hover:to-indigo-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                                >
                                    Apply Now
                                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </Link>
                            </motion.div>
                            <motion.div variants={cardVariants}>
                                <Link 
                                    to="/leave-status"
                                    className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-medium text-blue-600 bg-white border-2 border-blue-600 rounded-xl hover:bg-blue-50 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                                >
                                    Check Status
                                </Link>
                            </motion.div>
                        </motion.div>
                    </motion.div>

                    {/* Hero Image */}
                    <motion.div 
                        className="lg:w-1/2"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl">
                            <img
                                src="/images/bg2.avif"
                                alt="Professional Workspace"
                                className="h-full w-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Features Section */}
            <motion.div 
                className="container mx-auto px-4 sm:px-6 lg:px-8 py-16"
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, amount: 0.3 }}
            >
                <motion.div 
                    className="text-center mb-16"
                    variants={fadeInUp}
                >
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                        Our Services
                    </h2>
                    <div className="h-1 w-24 bg-gradient-to-r from-blue-600 to-indigo-500 mx-auto rounded-full"></div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        {
                            title: "Leave Application",
                            description: "Submit leave requests easily with our intuitive interface. Get real-time updates on approval status.",
                            icon: "📝",
                            color: "from-blue-500 to-blue-600",
                            path: "leave-application"
                        },
                        {
                            title: "Leave Status",
                            description: "Track all your leave applications in one place. Never miss an update with instant notifications.",
                            icon: "📊",
                            color: "from-indigo-500 to-indigo-600",
                            path: "leave-status"
                        },
                        {
                            title: "Leave Report",
                            description: "Comprehensive reports of your leave history and remaining balance at your fingertips.",
                            icon: "📈",
                            color: "from-purple-500 to-purple-600",
                            path: "leave-report"
                        }
                    ].map((feature, index) => (
                        <motion.div
                            key={index}
                            variants={cardVariants}
                            className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                        >
                            <div className={`p-1 bg-gradient-to-r ${feature.color}`}>
                                <div className="bg-white rounded-xl p-6 sm:p-8">
                                    <div className="text-4xl mb-4">{feature.icon}</div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-600 mb-6">
                                        {feature.description}
                                    </p>
                                    <Link
                                        to={`/${feature.path}`}
                                        className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                                    >
                                        Learn More
                                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Quick Access Section */}
            <motion.div 
                className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 mb-8"
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, amount: 0.3 }}
            >
                <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 backdrop-blur-lg bg-white/90">
                    <motion.h3 
                        className="text-2xl font-bold text-center mb-8 text-gray-900"
                        variants={fadeInUp}
                    >
                        Quick Access
                    </motion.h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
                        {[
                            { title: "Apply Leave", link: "/leave-application", icon: "🗓️", color: "blue" },
                            { title: "Leave Balance", link: "/leave-balance", icon: "⚖️", color: "indigo" },
                            { title: "Calendar", link: "/calendar", icon: "📅", color: "purple" },
                            { title: "Help", link: "/help", icon: "❓", color: "pink" }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                variants={cardVariants}
                            >
                                <Link
                                    to={item.link}
                                    className={`flex flex-col items-center p-4 rounded-xl hover:bg-${item.color}-50 transition-all duration-300 group`}
                                >
                                    <span className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                                        {item.icon}
                                    </span>
                                    <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                                        {item.title}
                                    </span>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default Main;
