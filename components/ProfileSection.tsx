
'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Reveal from './Reveal';
import { PROFILE_DATA } from '../data/mockData';

type Particle = {
  x: number;
  y: number;
  radius: number;
  baseAlpha: number;
  twinkleSpeed: number;
  offset: number;
};

const ProfileSkillTree: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollProgressRef = useRef(0);
  const particlesRef = useRef<Particle[]>([]);

  const skills = [
    'VS Code',
    'Web Dev',
    'UI Design',
    'Figma',
    'Adobe',
    'Motion',
    '3D Modeling',
    'AIGC',
  ];

  const config = {
    maxDepth: 4,
    initialBranchAngle: 0.75,
    subBranchAngle: 0.6,
    baseLength: 150,
    reduction: 0.75,
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const particles = particlesRef.current;

    const createParticles = () => {
      particles.length = 0;
      const count = width < 768 ? 45 : 80;
      for (let i = 0; i < count; i++) {
        const centerX = width / 2;
        const centerY = height * 0.32;
        const radiusX = width * 0.24;
        const radiusY = height * 0.16;
        const angle = Math.random() * Math.PI * 2;
        const radiusScale = Math.sqrt(Math.random());
        const px = centerX + Math.cos(angle) * radiusX * radiusScale;
        const py = centerY + Math.sin(angle) * radiusY * radiusScale;

        particles.push({
          x: px,
          y: py,
          radius: Math.random() * 1.2 + 0.3,
          baseAlpha: 0.18 + Math.random() * 0.25,
          twinkleSpeed: 0.0012 + Math.random() * 0.002,
          offset: Math.random() * Math.PI * 2,
        });
      }
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      createParticles();
    };

    const handleScroll = () => {
      if (!containerRef.current) return;
      const container = containerRef.current;
      const containerTop = container.offsetTop;
      const containerHeight = container.offsetHeight;
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;

      // 提前在视口进入前 30% 就开始生长
      const triggerOffset = windowHeight * 0.3;
      const scrollStart = containerTop - triggerOffset;
      // 在容器高度的前 80% 内长满，后 20% 保持完整状态
      const scrollEnd = containerTop + containerHeight * 0.8;

      let progress = 0;
      if (scrollTop + windowHeight >= scrollStart) {
        progress = (scrollTop + windowHeight - scrollStart) / (scrollEnd - scrollStart);
        progress = Math.max(0, Math.min(1, progress));
      }

      scrollProgressRef.current = progress;
    };

    const drawBranch = (
      x: number,
      y: number,
      length: number,
      angle: number,
      depth: number,
      progress: number,
      index: number = 0
    ): void => {
      const levelThreshold = (config.maxDepth - depth) / config.maxDepth;
      if (progress < levelThreshold) return;

      const localProgress = Math.min(
        Math.max((progress - levelThreshold) * config.maxDepth, 0),
        1
      );
      const currentLength = length * localProgress;
      const endX = x + Math.cos(angle) * currentLength;
      const endY = y + Math.sin(angle) * currentLength;

      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(endX, endY);
      const alpha = 0.3 + ((config.maxDepth - depth) / config.maxDepth) * 0.7;
      ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.lineWidth = depth * 1.2;
      ctx.lineCap = 'round';
      ctx.stroke();

      if (depth > 1 && localProgress === 1) {
        const wobble = Math.sin(Date.now() * 0.0008 + depth) * 0.03;
        const angleStep =
          depth === config.maxDepth ? config.initialBranchAngle : config.subBranchAngle;

        drawBranch(
          endX,
          endY,
          length * config.reduction,
          angle - angleStep + wobble,
          depth - 1,
          progress,
          index * 2
        );
        drawBranch(
          endX,
          endY,
          length * config.reduction,
          angle + angleStep + wobble,
          depth - 1,
          progress,
          index * 2 + 1
        );
      } else if (depth === 1) {
        // 让文字在叶子生长到 60% 后开始渐显，并在 100% 时完全清晰
        const labelVisibility = Math.max(0, Math.min(1, (localProgress - 0.6) / 0.4));
        if (labelVisibility > 0) {
          drawSkillLabel(endX, endY, index, angle, labelVisibility);
        }
      }
    };

    const drawSkillLabel = (
      x: number,
      y: number,
      index: number,
      angle: number,
      visibility: number = 1
    ): void => {
      const text = skills[index % skills.length];
      const isRightSide = x > width / 2;

      ctx.save();
      const floatY = Math.sin(Date.now() * 0.0015 + index) * 3;

      let angleAvoidance =
        Math.cos(angle) * 12 * (index % 2 === 0 ? 1 : -1);

      if (text === '3D Modeling' || text === 'Web Dev') {
        angleAvoidance -= 10;
      }

      const finalX = x;
      const finalY = y + floatY + angleAvoidance;

      ctx.font = '300 12px "Neue Machina", "Space Grotesk", sans-serif';
      ctx.textAlign = isRightSide ? 'left' : 'right';
      ctx.textBaseline = 'middle';

      // visibility 越低越模糊，越高越清晰
      ctx.shadowBlur = 8 * (1 - visibility) + 2;
      ctx.shadowColor = 'rgba(0,0,0,1)';
      ctx.fillStyle = `rgba(255, 255, 255, ${0.9 * visibility})`;

      const margin = 8;
      const words = text.toUpperCase().split(' ');

      if (words.length > 1) {
        const lineHeight = 14;
        words.forEach((word, i) => {
          const lineY = finalY + (i - (words.length - 1) / 2) * lineHeight;
          ctx.fillText(
            word,
            finalX + (isRightSide ? margin : -margin),
            lineY
          );
        });
      } else {
        ctx.fillText(
          text.toUpperCase(),
          finalX + (isRightSide ? margin : -margin),
          finalY
        );
      }

      ctx.restore();
    };

    const drawParticles = (time: number) => {
      if (!particles.length) return;
      ctx.save();
      ctx.fillStyle = '#FFFFFF';
      for (const p of particles) {
        const alpha =
          p.baseAlpha +
          Math.sin(time * p.twinkleSpeed + p.offset) * 0.45;
        const finalAlpha = Math.max(0, Math.min(0.9, alpha));
        if (finalAlpha <= 0.01) continue;
        const floatY = Math.sin(time * p.twinkleSpeed * 1.2 + p.offset) * 4;
        ctx.globalAlpha = finalAlpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y + floatY, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
      ctx.globalAlpha = 1;
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      const now = Date.now();
      drawParticles(now);
      const rootX = width / 2;
      const rootY = height * 0.6;
      const currentProgress = scrollProgressRef.current;
      drawBranch(
        rootX,
        rootY,
        config.baseLength,
        -Math.PI / 2,
        config.maxDepth,
        currentProgress
      );
      requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('scroll', handleScroll);
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-black overflow-hidden mt-12"
      style={{ height: '100vh' }}
    >
      <canvas
        ref={canvasRef}
        className="sticky top-0 left-0 w-full h-screen"
        style={{ zIndex: 1 }}
      />
      <div className="sticky bottom-[30vh] w-full flex justify-center z-10 pointer-events-none">
        <h1
          className="text-2xl font-extralight tracking-[0.4em] text-center"
          style={{ opacity: 0.4 }}
        >
          SKILL TREE
        </h1>
      </div>
    </div>
  );
};

export const ProfileSection: React.FC = () => {
  const experiences = [
    {
      company: "快手 | 电商事业部",
      role: "体验设计",
      date: "2025.11 - 2026.2"
    },
    {
      company: "字节跳动 | 剪映-即梦",
      role: "体验设计",
      date: "2025.6 - 2025.10"
    },
    {
      company: "海康威视",
      role: "体验设计",
      date: "2024.7 - 2024.11"
    },
    {
      company: "网易雷火",
      role: "游戏体验设计师",
      date: "2023.8 - 2023.12"
    }
  ];

  const sectionHeaderClass = "text-[13px] font-bold font-mono tracking-[0.15em] text-white/40 mb-6 uppercase border-l-2 border-white/20 pl-3";

  return (
    <>
      <section id="profile" className="relative w-full px-10 md:px-[180px] pt-32 pb-32 bg-black overflow-visible">
        <div className="max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start relative">
          
          <div className="order-2 md:order-1 relative md:sticky md:top-[206px] self-start">
            <motion.div 
              initial={{ opacity: 0, x: -20, filter: 'blur(20px)' }}
              whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              whileHover={{ 
                rotate: -4, 
                scale: 1.05,
                transition: { duration: 0.4, ease: "easeOut" }
              }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              viewport={{ once: false, amount: 0.3 }}
              className="w-[78%] md:w-[72%] aspect-[3/4] bg-white/5 relative overflow-hidden group cursor-pointer mx-auto md:mx-0"
            >
               <img 
                 src="/aboutme.jpg" 
                 alt="Profile Portrait"
                 className="w-full h-full object-cover grayscale brightness-[0.8] contrast-[1.1] transition-all duration-700 group-hover:grayscale-0 group-hover:brightness-100"
               />

               <div className="absolute inset-0 opacity-20 pointer-events-none">
                  <div className="grid-line-v left-1/4" />
                  <div className="grid-line-v left-2/4" />
                  <div className="grid-line-v left-3/4" />
                  <div className="grid-line-h top-1/4" />
                  <div className="grid-line-h top-2/4" />
                  <div className="grid-line-h top-3/4" />
               </div>
            </motion.div>
          </div>

          <div className="order-1 md:order-2 flex flex-col pt-0">
            <div className="mb-12">
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="text-[10px] font-mono tracking-[0.3em] text-white/30 uppercase mb-2"
              >
                About Me | Profile
              </motion.div>
              <Reveal as="h2" className="text-6xl font-black tracking-tighter leading-none uppercase">
                About Me
              </Reveal>
            </div>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="space-y-16 text-base font-light text-white/80 leading-relaxed max-w-xl"
            >
              <p className="font-machina tracking-tight text-lg md:text-xl text-white">
                {PROFILE_DATA.bio}
              </p>
              
              <div className="pt-12 border-t border-white/10">
                <h3 className={sectionHeaderClass}>Education / 教育背景</h3>
                <div className="space-y-6 text-xs md:text-sm font-normal tracking-tight text-white">
                  <div className="flex justify-between items-center group">
                    <span className="group-hover:text-white transition-colors">浙江大学 · 设计学</span>
                    <span className="text-white/40 text-[10px] font-mono uppercase tracking-widest">硕士 / MASTER</span>
                  </div>
                  <div className="flex justify-between items-center group">
                    <span className="group-hover:text-white transition-colors">浙江大学 · 工业设计</span>
                    <span className="text-white/40 text-[10px] font-mono uppercase tracking-widest">本科 / BACHELOR</span>
                  </div>
                </div>
              </div>

              <div className="pt-12 border-t border-white/10">
                <h3 className={sectionHeaderClass}>Experience / 实习经历</h3>
                <div className="space-y-6">
                  {experiences.map((exp, idx) => (
                    <div key={idx} className="flex flex-col gap-1 group">
                      <div className="flex justify-between items-baseline">
                        <span className="text-xs md:text-sm font-normal text-white group-hover:text-white transition-colors">
                          {exp.company}
                        </span>
                        <span className="text-white/40 text-[10px] font-mono uppercase tracking-widest whitespace-nowrap ml-4">
                          {exp.date}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-12 border-t border-white/10">
                <h3 className={sectionHeaderClass}>Capabilities</h3>
                <div className="flex flex-wrap gap-3">
                  {PROFILE_DATA.skills.map(skill => (
                    <span 
                      key={skill} 
                      className="px-3 py-1 bg-transparent border border-white/20 text-xs font-mono tracking-wider hover:bg-white hover:text-black transition-all duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <ProfileSkillTree />
    </>
  );
};
