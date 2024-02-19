
"use client"
// utilisation de framer motion pour lancer une animation au changement de page
import { motion, AnimatePresence } from "framer-motion";

export default function Template({ children }) {
  return (
    <AnimatePresence wait>
      <motion.div
        key={children.key} //on donne une key unique 
        initial={{ opacity: 0  }} // va venir s'afficher en apparaissant
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ ease: "easeIn", duration: 1.5 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
