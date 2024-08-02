import React from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LandingPage = ({ isDarkMode }) => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/login");
  };
  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-4 transition-colors duration-300 ${
        isDarkMode
          ? "bg-gradient-to-b from-gray-900 to-gray-800 text-white"
          : "bg-gradient-to-b from-blue-500 to-purple-600 text-white"
      }`}
    >
      <motion.h1
        className="mb-4 text-5xl font-bold text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Welcome to Drone Fleet Management
      </motion.h1>

      <motion.p
        className="max-w-2xl mb-8 text-xl text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        Efficiently manage and monitor your drone fleet with our cutting-edge
        platform.
      </motion.p>

      <motion.div
        className="flex space-x-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <motion.button
          onClick={handleGetStarted}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ${
            isDarkMode
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-white text-blue-600 hover:bg-blue-100"
          }`}
        >
          Get Started
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ${
            isDarkMode
              ? "bg-transparent border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-gray-900"
              : "bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600"
          }`}
        >
          Learn More
        </motion.button>
      </motion.div>

      <motion.div
        className="absolute bottom-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 2, duration: 1.5, repeat: Infinity }}
      >
        <ChevronDown size={32} className="text-white" />
      </motion.div>
    </div>
  );
};

export default LandingPage;
