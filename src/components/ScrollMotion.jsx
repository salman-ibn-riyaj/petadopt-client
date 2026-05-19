"use client";
import { motion } from "framer-motion";

export default function ScrollMotion({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }} 
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ 
        once: false,
        amount: 0.2
      }}
      transition={{ 
        duration: 0.7, 
        ease: [0.25, 0.1, 0.25, 1]
      }}
    >
      {children}
    </motion.div>
  );
}