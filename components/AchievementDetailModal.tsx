
import React, { ElementType } from 'react';
import { motion } from 'framer-motion';
import type { Achievement } from '../types';
import { XIcon } from './icons/XIcon';
import { TrophyIcon } from './icons/TrophyIcon';

interface AchievementDetailModalProps {
    achievement: Achievement;
    onClose: () => void;
}

const MotionDiv = motion.div as ElementType;

const AchievementDetailModal: React.FC<AchievementDetailModalProps> = ({ achievement, onClose }) => {
    
    const backdropVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };

    const modalVariants = {
        hidden: { opacity: 0, scale: 0.9, y: 50 },
        visible: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.9, y: 50 },
    };

    return (
        <MotionDiv
            className="fixed inset-0 bg-slate-900/70 z-50 flex items-center justify-center p-4"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
        >
            <MotionDiv
                className="bg-white rounded-3xl shadow-xl w-full max-w-xs p-6 space-y-4 relative text-center"
                variants={modalVariants}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                onClick={(e) => e.stopPropagation()}
            >
                <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600" aria-label="Fechar">
                    <XIcon className="w-5 h-5" />
                </button>

                <div className={`mx-auto w-24 h-24 rounded-full flex items-center justify-center transition-colors duration-300 ${
                    achievement.unlocked ? 'bg-amber-100' : 'bg-slate-100'
                }`}>
                    <TrophyIcon className={`w-14 h-14 ${
                        achievement.unlocked ? 'text-amber-500' : 'text-slate-400'
                    }`} />
                </div>

                <div>
                    <h2 className="text-xl font-bold text-slate-800">{achievement.title}</h2>
                    <p className="text-sm text-slate-500 mt-2">{achievement.description}</p>
                </div>
                
                <div className={`inline-block px-4 py-1.5 rounded-full text-sm font-semibold ${
                    achievement.unlocked 
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-slate-200 text-slate-600'
                }`}>
                    {achievement.unlocked ? 'Conquistado!' : 'Bloqueado'}
                </div>

                 <button
                    onClick={onClose}
                    className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-2.5 px-4 rounded-xl transition-colors mt-2"
                >
                    OK
                </button>
            </MotionDiv>
        </MotionDiv>
    );
};

export default AchievementDetailModal;