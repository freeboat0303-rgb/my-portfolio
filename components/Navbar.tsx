
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { SectionId } from '../types';
import { Menu, X } from 'lucide-react';

const NAV_ITEMS: { id: SectionId; label: string }[] = [
  { id: 'home', label: 'HOME' },
  { id: 'profile', label: 'PROFILE' },
  { id: 'works', label: 'WORKS' },
  { id: 'contact', label: 'CONTACT' },
];

export const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SectionId>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (isScrollingRef.current) return;

      const sections: SectionId[] = ['home', 'profile', 'works', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: SectionId) => {
    setActiveSection(id);
    setIsMenuOpen(false);
    
    isScrollingRef.current = true;
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

    if (id === 'contact') {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth'
      });
    } else {
      const element = document.getElementById(id);
      if (element) {
        const offset = 78;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }

    scrollTimeoutRef.current = setTimeout(() => {
      isScrollingRef.current = false;
    }, 800);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 h-[78px] px-5 md:px-[5%] flex items-center justify-between bg-black/30 backdrop-blur-md border-b border-white/20 transition-all duration-300 font-machina select-none">
        {/* Left: Brand */}
        <div 
          className="text-[18px] font-black tracking-tightest text-white cursor-pointer hover:opacity-70 transition-opacity" 
          onClick={() => scrollToSection('home')}
        >
          @LIXIUQI
        </div>

        {/* Center: Desktop Navigation */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center border border-white/20 bg-black/40 p-2 gap-2">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`relative flex items-center justify-center h-[30px] min-w-[73px] px-4 text-[11px] font-bold tracking-widest transition-colors duration-300 uppercase whitespace-nowrap outline-none ${
                activeSection === item.id 
                  ? 'text-black' 
                  : 'text-white hover:bg-white/5'
              }`}
            >
              {activeSection === item.id && (
                <motion.div
                  layoutId="active-nav-bg"
                  className="absolute inset-0 bg-white z-0"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Right: Desktop REC / Mobile Menu Toggle */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-3 text-white">
            <span className="text-[11px] font-black tracking-widest">REC</span>
            <div className="w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.4)] animate-pulse" />
          </div>
          
          <button 
            className="md:hidden p-2 text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-[49] bg-black transition-transform duration-500 ease-expo ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'} md:hidden flex flex-col items-center justify-center pt-[78px]`}>
        <div className="flex flex-col gap-8 items-center">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`text-4xl font-black tracking-tighter transition-colors ${
                activeSection === item.id ? 'text-white' : 'text-white/30'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="absolute bottom-12 flex flex-col items-center gap-2">
          <div className="flex items-center gap-3 text-white">
            <span className="text-[10px] font-black tracking-widest">REC MODE ON</span>
            <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
          </div>
          <p className="text-[10px] font-mono text-white/30">SHANGHAI, CN</p>
        </div>
      </div>
    </>
  );
};
