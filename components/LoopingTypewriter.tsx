"use client";

import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

type Props = {
  text: string;
  charDelay?: number; // ms per character
  holdTime?: number; // ms to hold full text
  fadeDuration?: number; // ms fade out
  className?: string;
  style?: React.CSSProperties;
};

export const LoopingTypewriter: React.FC<Props> = ({
  text,
  charDelay = 90,
  holdTime = 2400,
  fadeDuration = 400,
  className,
  style,
}) => {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(true);
  const timeoutsRef = useRef<number[]>([]);

  useEffect(() => {
    let mounted = true;

    const clearAll = () => {
      timeoutsRef.current.forEach((id) => window.clearTimeout(id));
      timeoutsRef.current.length = 0;
    };

    const startTyping = () => {
      clearAll();
      setVisible(true);
      setCount(0);

      // type characters
      for (let i = 1; i <= text.length; i++) {
        const t = window.setTimeout(() => {
          if (!mounted) return;
          setCount(i);
        }, i * charDelay);
        timeoutsRef.current.push(t);
      }

      // after typing finished + holdTime, fade out and restart
      const totalTyping = text.length * charDelay;
      const afterFull = window.setTimeout(() => {
        if (!mounted) return;
        const fadeTimeout = window.setTimeout(() => {
          if (!mounted) return;
          setVisible(false);
          const restart = window.setTimeout(() => {
            if (!mounted) return;
            startTyping();
          }, fadeDuration + 120);
          timeoutsRef.current.push(restart);
        }, holdTime);
        timeoutsRef.current.push(fadeTimeout);
      }, totalTyping);
      timeoutsRef.current.push(afterFull);
    };

    startTyping();

    return () => {
      mounted = false;
      clearAll();
    };
  }, [text, charDelay, holdTime, fadeDuration]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: fadeDuration / 1000 }}
      className={className}
      style={style}
    >
      <span style={{ whiteSpace: 'pre-wrap' }}>{text.slice(0, count)}</span>
    </motion.div>
  );
};

export default LoopingTypewriter;
