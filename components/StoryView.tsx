
import React, { useState, useEffect, useCallback, ElementType } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { StoryHighlight } from '../types';
import { XIcon } from './icons/XIcon';

const ProgressBar: React.FC<{ progress: number }> = ({ progress }) => (
    <div className="w-full bg-white/40 rounded-full h-1 overflow-hidden">
        <motion.div
            className="bg-white h-1 rounded-full"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.05, ease: "linear" }}
        />
    </div>
);

const MotionDiv = motion.div as ElementType;

const StoryView: React.FC<{ highlight: StoryHighlight, onClose: () => void }> = ({ highlight, onClose }) => {
    
    if (!highlight?.stories?.length) {
        useEffect(() => {
            const timer = setTimeout(() => onClose(), 2000); // Auto-close after 2 seconds
            return () => clearTimeout(timer);
        }, [onClose]);

        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                onClick={onClose}
            >
                <div className="bg-slate-800 text-white p-6 rounded-lg text-center shadow-lg" onClick={e => e.stopPropagation()}>
                    <h3 className="font-bold text-lg">Coleção Vazia</h3>
                    <p className="text-sm text-slate-300 mt-2">Esta coleção ainda não possui stories.</p>
                </div>
            </motion.div>
        );
    }

    const [currentIndex, setCurrentIndex] = useState(0);
    const [progress, setProgress] = useState(0);

    const storyDuration = 5000; // 5 seconds per story

    const handleNext = useCallback(() => {
        if (currentIndex < highlight.stories.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } else {
            onClose();
        }
    }, [currentIndex, highlight.stories.length, onClose]);

    const handlePrev = () => {
        setCurrentIndex(prev => (prev > 0 ? prev - 1 : 0));
    };

    useEffect(() => {
        setProgress(0);
        const interval = setInterval(() => {
            setProgress(p => {
                if (p >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return p + (100 / (storyDuration / 100));
            });
        }, 100);

    const storyTimer = setTimeout(() => {
        handleNext();
    }, storyDuration);

        return () => {
            clearInterval(interval);
            clearTimeout(storyTimer);
        };
    }, [currentIndex, handleNext]);


    const currentStory = highlight.stories[currentIndex];
    
    const imageVariants = {
        initial: { scale: 1.05, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        exit: { scale: 0.95, opacity: 0 },
    };

    return (
        <MotionDiv
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed inset-0 bg-slate-950 z-50 flex flex-col p-2 md:p-4 select-none"
            aria-modal="true"
            role="dialog"
        >
            {/* Progress Bars & Header */}
            <div className="absolute top-0 left-0 right-0 p-4 pt-5 space-y-3 z-20">
                 <div className="flex items-center gap-1">
                    {highlight.stories.map((_, index) => (
                         <div key={index} className="w-full bg-white/40 rounded-full h-0.5 overflow-hidden">
                            <MotionDiv
                                className="bg-white h-0.5"
                                initial={{ width: "0%" }}
                                animate={{ width: index < currentIndex ? "100%" : (index === currentIndex ? `${progress}%` : "0%") }}
                                transition={{ duration: index === currentIndex ? 0.05 : 0, ease: "linear" }}
                            />
                        </div>
                    ))}
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <img src={currentStory.user.avatarUrl} alt={currentStory.user.name} className="w-9 h-9 rounded-full object-cover"/>
                        <span className="text-white font-semibold text-sm">{currentStory.user.name}</span>
                        <span className="text-white/70 text-sm">{currentStory.timestamp}</span>
                    </div>
                     <button onClick={onClose} className="text-white/80 hover:text-white" aria-label="Fechar story">
                        <XIcon className="w-7 h-7" />
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex items-center justify-center relative overflow-hidden mt-12 mb-4">
                 <AnimatePresence>
                    <motion.div
                        key={currentStory.id}
                        variants={imageVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="w-full h-full"
                    >
                        <img 
                            src={currentStory.imageUrl}
                            alt="Conteúdo do story"
                            className="max-h-full max-w-full object-contain rounded-lg mx-auto my-auto"
                         />
                    </motion.div>
                 </AnimatePresence>
            </div>

            {/* Navigation Overlays */}
            <div className="absolute inset-0 top-16 flex z-10">
                <button className="w-1/3 h-full cursor-pointer" onClick={handlePrev} aria-label="Story anterior"></button>
                <button className="w-2/3 h-full cursor-pointer" onClick={handleNext} aria-label="Próximo story"></button>
            </div>
        </MotionDiv>
    );
};

export default StoryView;
