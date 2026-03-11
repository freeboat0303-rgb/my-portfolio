"use client";

import React from 'react';
import { motion } from 'framer-motion';

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  as?: any;
  style?: React.CSSProperties;
};

export const Reveal: React.FC<RevealProps> = ({ children, className, as = 'div', style }) => {
  const MotionTag: any = motion(as);

  return (
    <MotionTag
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: false, amount: 0.2 }}
      className={className}
      style={style}
    >
      {children}
    </MotionTag>
  );
};

export default Reveal;
