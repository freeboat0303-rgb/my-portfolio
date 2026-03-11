
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Reveal from './Reveal';
import { Mail, Phone, MessageCircle } from 'lucide-react';
import { PROFILE_DATA } from '../data/mockData';

const CopyableText = ({ text, label }: { text: string; label: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="group cursor-pointer" onClick={handleCopy}>
      <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-1 transition-colors group-hover:text-white/60">
        {label}
      </p>
      <div className="flex items-center justify-end gap-2">
        {copied && (
          <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest">
            Copied
          </span>
        )}
        <p className="text-xl md:text-2xl font-medium tracking-tight text-white transition-colors group-hover:text-white/60">
          {text}
        </p>
      </div>
    </div>
  );
};

export const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="relative min-h-screen w-full bg-[#050505] flex flex-col pt-48 md:pt-64 px-10 md:px-[180px]">
      <div className="max-w-5xl mx-auto w-full flex-grow flex flex-col justify-between pb-20">
        {/* Top Row: Title and Contact Info */}
        <div className="flex flex-col md:flex-row justify-between items-start w-full gap-12">
          <Reveal as="h2" className="md:w-1/2 text-6xl md:text-8xl font-black tracking-tighter whitespace-nowrap">
            LET'S TALK
          </Reveal>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col gap-5 text-right md:pt-4"
          >
            <CopyableText label="PHONE" text="(+86)19357571812" />
            <CopyableText label="EMAIL" text="3474905767@qq.com" />
            <CopyableText label="WECHAT" text="Freeboat0303" />
            <div>
              <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-1">LOCATION</p>
              <p className="text-xl md:text-2xl font-medium tracking-tight text-white">Hangzhou, CN</p>
            </div>
          </motion.div>
        </div>

        {/* Bottom Row: Icons and Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-end w-full gap-8 mt-32">
          {/* Bottom Left: Icons (White background, non-interactive) */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex gap-0"
          >
            {[
              { icon: <Mail size={20} /> },
              { icon: <Phone size={20} /> },
              { icon: <MessageCircle size={20} /> }
            ].map((item, i) => (
              <div 
                key={i}
                className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center"
              >
                {item.icon}
              </div>
            ))}
          </motion.div>

          {/* Bottom Right: Copyright */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-[10px] font-mono text-white/40 tracking-widest uppercase text-right"
          >
            @2026 LIXIUQI. ALL RIGHTS RESERVED.
          </motion.div>
        </div>
      </div>
    </section>
  );
};
