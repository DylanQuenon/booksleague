
"use client"

import { motion, AnimatePresence } from "framer-motion";

export default function Template({ children }) {
  return (
    <AnimatePresence wait>
      <motion.div
        key={children.key}
        initial={{ opacity: 0  }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ ease: "easeIn", duration: 1.5 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
