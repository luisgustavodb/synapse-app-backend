
import React, { useState, useRef, ElementType } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { professionalsByCategory } from '../constants';
import ProfessionalCard from '../components/PsychologistCard';
import ProfessionalChatView from '../components/PsychologistChatView';
import type { Professional } from '../types';

const pageVariants = {
  initial: { opacity: 0 },
  in: { opacity: 1 },
  out: { opacity: 0 },
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5,
} as const;

const professionalCategories = {
    psychologists: 'Psicólogos',
    nutritionists: 'Nutricionistas',
    personalTrainers: 'Personal Trainers',
    lifeCoaches: 'Coaches de Vida',
    meditationInstructors: 'Instrutores de Meditação',
};

type ProfessionalCategory = keyof typeof professionalCategories;

const contentVariants = {
  initial: { opacity: 0, y: 10 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -10 },
};

const MotionDiv = motion.div as ElementType;

const PsychologistsPage: React.FC = () => {
  const [activeChat, setActiveChat] = useState<Professional | null>(null);
  const [activeTab, setActiveTab] = useState<ProfessionalCategory>('psychologists');
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
    scrollContainerRef.current.classList.add('cursor-grabbing');
    scrollContainerRef.current.classList.remove('cursor-grab');
  };

  const onMouseLeave = () => {
    if (!scrollContainerRef.current || !isDragging) return;
    setIsDragging(false);
    scrollContainerRef.current.classList.remove('cursor-grabbing');
    scrollContainerRef.current.classList.add('cursor-grab');
  };

  const onMouseUp = () => {
    if (!scrollContainerRef.current) return;
    setIsDragging(false);
    scrollContainerRef.current.classList.remove('cursor-grabbing');
    scrollContainerRef.current.classList.add('cursor-grab');
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // multiplier for a smoother drag
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  if (activeChat) {
    return (
        <ProfessionalChatView 
            professional={activeChat} 
            onClose={() => setActiveChat(null)} 
        />
    );
  }
  
  const motionProps = {
      initial:"initial",
      animate:"in",
      exit:"out",
      variants:pageVariants,
      transition:pageTransition
  };

  return (
    <MotionDiv
      {...motionProps}
      className="h-full flex flex-col bg-slate-50 dark:bg-slate-950"
    >
      <header className="p-6 pb-2 text-center sticky top-0 bg-white dark:bg-slate-900 z-10 flex-shrink-0">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-200">Todos os Especialistas</h1>
      </header>

      <nav className="px-2 sm:px-4 py-2 sticky top-[72px] bg-white dark:bg-slate-900 z-10 flex-shrink-0">
          <div 
            ref={scrollContainerRef}
            className="overflow-x-auto no-scrollbar cursor-grab"
            onMouseDown={onMouseDown}
            onMouseLeave={onMouseLeave}
            onMouseUp={onMouseUp}
            onMouseMove={onMouseMove}
          >
              <div className="inline-flex space-x-2 border-b border-slate-200 dark:border-slate-700 select-none">
                  {Object.keys(professionalCategories).map((key) => (
                      <button
                          key={key}
                          onClick={() => setActiveTab(key as ProfessionalCategory)}
                          className={`px-3 py-2.5 text-sm font-semibold whitespace-nowrap transition-all duration-200 border-b-2 focus:outline-none rounded-t-md ${
                              activeTab === key
                                  ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                                  : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                          }`}
                      >
                          {professionalCategories[key as ProfessionalCategory]}
                      </button>
                  ))}
              </div>
          </div>
      </nav>
      
      <main className="flex-grow overflow-y-auto p-4 pt-4">
          <AnimatePresence mode="wait">
              <MotionDiv
                  key={activeTab}
                  variants={contentVariants}
                  initial="initial"
                  animate="in"
                  exit="out"
                  transition={{ duration: 0.2 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                  {professionalsByCategory[activeTab].map((professional) => (
                      <ProfessionalCard 
                          key={professional.id} 
                          professional={professional} 
                          onStartChat={() => setActiveChat(professional)}
                      />
                  ))}
              </MotionDiv>
          </AnimatePresence>
      </main>
    </MotionDiv>
  );
};

export default PsychologistsPage;
