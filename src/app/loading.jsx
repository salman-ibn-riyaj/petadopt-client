"use client";
import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-[9999]">
      {/* Pet Icon ba Circle Animation */}
      <div className="relative flex items-center justify-center">
        {/* Outer Pulsing Circle */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute w-24 h-24 bg-sky-200 rounded-full"
        />
        
        {/* Inner Spinning Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
          }}
          className="w-16 h-16 border-4 border-sky-100 border-t-sky-500 rounded-full z-10"
        />
      </div>

      {/* Text Animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mt-6 text-center"
      >
        <h2 className="text-xl font-semibold text-sky-600 animate-pulse">
          Finding your new best friend...
        </h2>
        <p className="text-gray-400 text-sm">Please wait a moment</p>
      </motion.div>
    </div>
  );
}