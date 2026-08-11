"use client";

import { motion } from "framer-motion";

const SectionWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ y: 24, scale: 0.99 }}
      whileInView={{ y: 0, scale: 1 }}
      viewport={{ once: true, amount: "some" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

export default SectionWrapper;
