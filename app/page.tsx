
'use client';

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import { HomeSection } from '../components/HomeSection';
import { ProfileSection } from '../components/ProfileSection';
import { WorksSection } from '../components/WorksSection';
import { ContactSection } from '../components/ContactSection';

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      exit={{ y: '-100%' }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center"
    >
      <div className="w-[200px] flex flex-col gap-4">
        <div className="flex justify-between items-end">
          <span className="text-[10px] font-machina font-black tracking-widest text-white">LOADING...</span>
          <span className="text-[10px] font-mono text-white/40">{progress}%</span>
        </div>
        <div className="h-[1px] w-full bg-white/10 relative overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-white"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const handleScroll = () => {
      document.body.classList.add('is-scrolling');
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        document.body.classList.remove('is-scrolling');
      }, 1000);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <main className="relative bg-black w-full min-h-screen pt-[78px]">
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <Navbar />

      {/* Global Design Grid System - Responsive margins */}
      <div className="fixed inset-0 pointer-events-none z-[5]">
        <div className="absolute top-0 bottom-0 left-5 md:left-[75px] w-[1px] bg-white/20" />
        <div className="absolute top-0 bottom-0 right-5 md:right-[75px] w-[1px] bg-white/20" />
        <div className="grid-line-v left-[5%] opacity-5 md:opacity-10" />
        <div className="grid-line-v right-[5%] opacity-5 md:opacity-10" />
      </div>

      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <HomeSection />
          <ProfileSection />
          <div className="relative w-full h-px">
            <div className="absolute left-5 md:left-[75px] right-5 md:right-[75px] h-px bg-white/20" />
          </div>
          <WorksSection />
          <ContactSection />
        </motion.div>
      )}
    </main>
  );
}
