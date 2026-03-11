
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Reveal from './Reveal';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { WORK_ITEMS } from '../data/mockData';
import { WorkItem } from '../types';

const sheetTransition = {
  type: 'tween' as const,
  duration: 0.55,
  ease: [0.32, 0.72, 0, 1],
};
const overlayTransition = { duration: 0.4, ease: [0.32, 0.72, 0, 1] };

const ProjectDetail: React.FC<{ work: WorkItem; onBack: () => void }> = ({ work, onBack }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Lock scroll when detail is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    const container = containerRef.current;
    let timeout: ReturnType<typeof setTimeout>;

    const handleScroll = () => {
      document.body.classList.add('is-scrolling');
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        document.body.classList.remove('is-scrolling');
      }, 1000);
    };

    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true });
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.body.classList.remove('is-scrolling');
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
      clearTimeout(timeout);
    };
  }, []);

  const detailNodes = React.useMemo(() => {
    if (work.id === '1') {
      return Array.from({ length: 21 }, (_, i) => {
        const num = String(i + 1).padStart(2, '0');
        return (
          <motion.div
            key={num}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '200px' }}
            transition={{ duration: 0.8 }}
            className="relative w-full overflow-hidden bg-white/5 min-h-[120px]"
          >
            <img
              src={`/works/qugou/qugou-${num}.webp`}
              alt={`${work.title} ${i + 1}`}
              className="w-full h-auto object-cover opacity-90 transition-opacity duration-500 hover:opacity-100"
              loading="lazy"
            />
          </motion.div>
        );
      });
    }

    if (work.id === '2') {
      return Array.from({ length: 19 }, (_, i) => {
        const num = String(i + 1).padStart(2, '0');
        return (
          <motion.div
            key={num}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '200px' }}
            transition={{ duration: 0.8 }}
            className="relative w-full overflow-hidden bg-white/5 min-h-[120px]"
          >
            <img
              src={`/works/xinguang/xinguang-${num}.webp`}
              alt={`${work.title} ${i + 1}`}
              className="w-full h-auto object-cover opacity-90 transition-opacity duration-500 hover:opacity-100"
              loading="lazy"
            />
          </motion.div>
        );
      });
    }

    if (work.id === '3') {
      const imgs = Array.from({ length: 5 }, (_, i) => {
        const num = String(i + 1).padStart(2, '0');
        return (
          <motion.div
            key={num}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '200px' }}
            transition={{ duration: 0.8 }}
            className="relative w-full overflow-hidden bg-white/5 min-h-[120px]"
          >
            <img
              src={`/works/jimeng/jimeng-${num}.webp`}
              alt={`${work.title} ${i + 1}`}
              className="w-full h-auto object-cover opacity-90 transition-opacity duration-500 hover:opacity-100"
              loading="lazy"
            />
          </motion.div>
        );
      });

      return imgs.concat([
        <motion.div
          key="jimeng-video"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '200px' }}
          transition={{ duration: 0.8 }}
          className="relative w-full overflow-hidden bg-white/5"
        >
          <video
            src={`/works/jimeng/jimeng-06.mp4`}
            controls
            className="w-full h-auto max-h-[720px] bg-black"
            preload="metadata"
          />
        </motion.div>,
        <motion.div
          key="jimeng-07"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '200px' }}
          transition={{ duration: 0.8 }}
          className="relative w-full overflow-hidden bg-white/5 min-h-[120px]"
        >
          <img
            src={`/works/jimeng/jimeng-07.webp`}
            alt={`${work.title} extra`}
            className="w-full h-auto object-cover opacity-90 transition-opacity duration-500 hover:opacity-100"
            loading="lazy"
          />
        </motion.div>
      ]);
    }

    if (work.id === '4') {
      return Array.from({ length: 6 }, (_, i) => {
        const num = String(i + 1).padStart(2, '0');
        if (i === 4) {
          return (
            <motion.div
              key={`langbridge-video-${num}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '200px' }}
              transition={{ duration: 0.8 }}
              className="relative w-full overflow-hidden bg-white/5"
            >
              <video
                src={`/works/langbridge/langbridge-${num}.mp4`}
                controls
                className="w-full h-auto max-h-[720px] bg-black"
                preload="metadata"
              />
            </motion.div>
          );
        }

        return (
          <motion.div
            key={`langbridge-${num}`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '200px' }}
            transition={{ duration: 0.8 }}
            className="relative w-full overflow-hidden bg-white/5 min-h-[120px]"
          >
            <img
              src={`/works/langbridge/langbridge-${num}.webp`}
              alt={`${work.title} ${i + 1}`}
              className="w-full h-auto object-cover opacity-90 transition-opacity duration-500 hover:opacity-100"
              loading="lazy"
            />
          </motion.div>
        );
      });
    }

    if (work.id === '5') {
      const imgs = Array.from({ length: 13 }, (_, i) => {
        const num = String(i + 1).padStart(2, '0');
        return (
          <motion.div
            key={`img-${num}`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '200px' }}
            transition={{ duration: 0.8 }}
            className="relative w-full overflow-hidden bg-white/5 min-h-[120px]"
          >
            <img
              src={`/works/mozhen/mozhen-${num}.webp`}
              alt={`${work.title} ${i + 1}`}
              className="w-full h-auto object-cover opacity-90 transition-opacity duration-500 hover:opacity-100"
              loading="lazy"
            />
          </motion.div>
        );
      });

      const videoNode = (
        <motion.div
          key="mozhen-video"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '200px' }}
          transition={{ duration: 0.8 }}
          className="relative w-full overflow-hidden bg-white/5"
        >
          <video
            src={`/works/mozhen/mozhen-0.mp4`}
            controls
            className="w-full h-auto max-h-[720px] bg-black"
            preload="metadata"
          />
        </motion.div>
      );

      return [videoNode].concat(imgs);
    }

    return Array.from({ length: 15 }).map((_, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '200px' }}
        transition={{ duration: 0.8 }}
        className="relative aspect-[16/9] bg-white/5 overflow-hidden"
      >
        <Image
          src={`https://images.unsplash.com/photo-${1500000000000 + (parseInt(work.id) * 100000) + (i * 123456)}?auto=format&fit=crop&w=1920&q=80&fm=webp`}
          alt={`${work.title} detail ${i + 1}`}
          fill
          className="object-cover opacity-80 transition-opacity duration-500 hover:opacity-100"
          sizes="(max-width: 768px) 100vw, 1152px"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        <div className="absolute bottom-4 right-4 text-[8px] font-mono text-white/20 uppercase tracking-widest">
          Detail View {String(i + 1).padStart(2, '0')}
        </div>
      </motion.div>
    ));
  }, [work.id]);

  return (
    <>
      {/* 底部遮罩：点击关闭 */}
      <motion.div
        key="detail-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={overlayTransition}
        onClick={onBack}
        className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
      />
      {/* 从底部滑出的详情面板 */}
      <motion.div
        key="detail-sheet"
        ref={containerRef}
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={sheetTransition}
        className="fixed inset-0 z-[101] bg-black overflow-y-auto rounded-t-2xl shadow-2xl"
        style={{ boxShadow: '0 -20px 60px rgba(0,0,0,0.5)' }}
      >
      {/* Back Button */}
      <div className="sticky top-0 left-0 w-full p-8 md:p-12 z-[110] pointer-events-none">
        <button 
          onClick={onBack}
          className="pointer-events-auto flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-mono tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300"
        >
          <ArrowLeft size={14} />
          Back to Works
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-10 pt-32 pb-64">
        {/* 标题与图片同一 900px 区域：居中、文字与图片左对齐 */}
        <div className="max-w-[900px] mx-auto">
          <div className="mb-20">
            <p className="text-[10px] font-machina text-white/40 uppercase tracking-widest mb-2">{work.category}</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase mb-8">{work.title}</h2>

            {/* 项目信息行：Type / Tools / Year，与图片同宽并用辅助线分隔 */}
            <div className="w-full border-b border-white/15 divide-y divide-white/15 text-[10px] md:text-xs font-machina tracking-[0.18em] uppercase text-white/60">
              <div className="flex items-center justify-between pt-5 pb-2">
                <span className="text-white/40">Type</span>
                <span className="text-white/80">
                  {work.type || 'Personal Practice'}
                </span>
              </div>
              <div className="flex items-center justify-between pt-5 pb-2">
                <span className="text-white/40">Tools</span>
                <span className="text-white/80">
                  {work.tools || 'Figma / Photoshop'}
                </span>
              </div>
              <div className="flex items-center justify-between pt-5 pb-2">
                <span className="text-white/40">Year</span>
                <span className="text-white/80">
                  {work.year || '2024'}
                </span>
              </div>
            </div>
          </div>

          {/* Vertical Image Stack：统一宽度、与标题左对齐 */}
          <div className="space-y-2 w-full">{detailNodes}</div>
        </div>
      </div>
      </motion.div>
    </>
  );
};

const WorkCard: React.FC<{ work: WorkItem; index: number; onClick: () => void }> = ({ work, index, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ delay: index * 0.1, duration: 0.8 }}
      className="group cursor-pointer"
      onClick={onClick}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-white/5 mb-6">
        <img 
          src={work.image} 
          alt={work.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="px-6 py-2 bg-white text-black text-xs font-bold tracking-widest uppercase">View Project</span>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-[10px] font-mono text-white/40">{work.category}</p>
        <p className="text-[12px] font-mono text-white/40">{work.type || 'Personal Practice'}<span className="text-white/40 mx-2">|</span>{work.year || '2024'}</p>
      </div>

      <div className="flex items-center gap-4 mt-2">
        <h3 className="text-lg font-bold tracking-tight truncate">{work.title}</h3>
        <div className="flex-1 border-b border-white/20" />
        <span className="text-sm font-mono text-white/80">{String(index + 1).padStart(2, '0')}</span>
      </div>
    </motion.div>
  );
};

export const WorksSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<WorkItem | null>(null);

  return (
    <section id="works" className="relative min-h-screen w-full bg-black py-32 px-10 md:px-[180px]">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-end mb-24">
          <Reveal as="h2" className="text-6xl md:text-8xl font-black tracking-tighter">
            SELECTED<br/>WORKS
          </Reveal>
          <div className="hidden md:block text-right max-w-[200px]">
            <p className="text-[10px] font-mono text-white/40 leading-relaxed uppercase tracking-wider">
              A curated selection of digital solutions focusing on aesthetic minimalism and functional clarity.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
          {WORK_ITEMS.map((work, idx) => (
            <WorkCard 
              key={work.id} 
              work={work} 
              index={idx} 
              onClick={() => setSelectedProject(work)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectDetail 
            work={selectedProject} 
            onBack={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
};
