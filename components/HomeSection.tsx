
'use client';

import React, { useState, useEffect } from 'react';
import { motion, Variants, useMotionValue, useSpring, useScroll, useTransform } from 'framer-motion';
import LoopingTypewriter from './LoopingTypewriter';

const TypewriterText = ({ text }: { text: string }) => {
  const characters = text.split("");
  
  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.5 * i },
    }),
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      x: 5,
    },
  };

  return (
    <motion.div
      style={{ display: "flex", flexWrap: "wrap" }}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {characters.map((char, index) => (
        <motion.span
          key={index}
          variants={child}
          className="inline-block"
          whileHover={{
            y: -14,
            transition: {
              type: "spring",
              stiffness: 400,
              damping: 18,
              mass: 0.4,
            },
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.div>
  );
};

export const HomeSection: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Detect mobile for cursor disabling
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 35, stiffness: 450, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const { scrollY } = useScroll();
  const yImage = useTransform(scrollY, [0, 1000], [0, 250]);
  const opacityImage = useTransform(scrollY, [0, 600], [1, 0]);
  const yText = useTransform(scrollY, [0, 1000], [0, -80]);
  const yLines = useTransform(scrollY, [0, 1000], [0, -50]);

  useEffect(() => {
    if (isMobile) return;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY, isMobile]);

  return (
    <section 
      id="home" 
      className={`relative min-h-[calc(100vh-78px)] w-full flex flex-col justify-end overflow-hidden bg-black ${isMobile ? 'cursor-auto' : 'cursor-none'}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Custom Cursor Circle - Hidden on Mobile */}
      {!isMobile && (
        <motion.div
          className="fixed top-0 left-0 w-[90px] h-[90px] bg-white rounded-full pointer-events-none z-[100] mix-blend-difference -ml-[45px] -mt-[45px]"
          style={{
            x: cursorX,
            y: cursorY,
            opacity: isHovering ? 1 : 0,
            scale: isHovering ? 1 : 0,
          }}
          transition={{ opacity: { duration: 0.15 }, scale: { duration: 0.15 } }}
        />
      )}

      {/* 1. Background Grid */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="grid-line-v left-[20%] opacity-10 md:opacity-20" />
        <div className="grid-line-h bottom-[15%] opacity-10 md:opacity-20" />
      </div>

      {/* 2. Hero Image */}
      <motion.div 
        style={{ y: yImage, opacity: opacityImage }}
        className="absolute top-0 left-5 md:left-[28.5%] right-5 md:right-[75px] bottom-[25%] md:bottom-[20%] z-0"
      >
        <motion.div 
          initial={{ filter: 'blur(40px)', scale: 1.4, opacity: 0 }}
          animate={{ filter: 'blur(0px)', scale: 1, opacity: 1 }}
          transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="w-full h-full relative overflow-hidden"
        >
          <img 
            src="/myphoto.jpg" 
            alt="Portrait"
            className="w-full h-full object-cover grayscale brightness-[0.7] contrast-[1.1]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 md:opacity-60" />
        </motion.div>
      </motion.div>

      {/* 3. Vertical Auxiliary Line */}
      <motion.div 
        style={{ y: yLines }}
        className="absolute top-0 bottom-[6%] left-5 md:left-[255px] w-[1px] bg-white/20 z-30 pointer-events-none" 
      />

      {/* 4. Left Copy */}
      <motion.div 
        style={{ y: yText }}
        className="absolute bottom-[35%] md:bottom-[33%] left-8 md:left-[75px] z-30 pointer-events-none"
      >
        <div className="flex flex-col items-start font-machina">
          <LoopingTypewriter
            text={`A UI/UX *\n${' '.repeat(6)}DESIGNER`}
            charDelay={90}
            holdTime={2500}
            fadeDuration={400}
            className="text-[16px] md:text-[20px] font-normal text-white leading-tight uppercase tracking-tighter"
          />
        </div>
      </motion.div>

      {/* 5. Main Title */}
      <motion.div 
        style={{ y: yText }}
        className="absolute bottom-[8%] md:bottom-[6%] left-8 md:left-[75px] right-8 md:right-0 z-40"
      >
        <h1 className="font-display text-[clamp(2.5rem,12vw,158px)] font-black leading-[0.85] tracking-tightest text-white font-machina">
          <TypewriterText text="PORTFOLIO" />
        </h1>
      </motion.div>

      {/* Horizontal Line */}
      <motion.div 
        style={{ y: yLines }}
        className="absolute bottom-[6%] left-5 md:left-[75px] right-5 md:right-[75px] h-[1px] bg-white/20 z-30 pointer-events-none" 
      />

      {/* 6. Right Description Info */}
      <motion.div 
        style={{ y: yLines }}
        className="absolute bottom-[14%] right-8 md:right-[5%] z-30 text-right max-w-[200px] md:max-w-[320px]"
      >
        <div>
          <LoopingTypewriter
            text={`Crafting meaningful experiences where design meets intelligence.`}
            charDelay={80}
            holdTime={2600}
            fadeDuration={400}
            className="text-[10px] md:text-[14px] font-medium leading-relaxed text-white uppercase tracking-tighter"
          />
        </div>
      </motion.div>
    </section>
  );
};
