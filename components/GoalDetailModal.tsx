
import React, { ElementType } from 'react';
import { motion } from 'framer-motion';
import { ResponsiveContainer, RadialBarChart, RadialBar, PolarAngleAxis } from 'recharts';
import type { Goal } from '../types';
import { XIcon } from './icons/XIcon';
import { TrophyIcon } from './icons/TrophyIcon';

interface GoalDetailModalProps {
    goal: Goal;
    onClose: () => void;
}

const MotionDiv = motion.div as ElementType;

const GoalDetailModal: React.FC<GoalDetailModalProps> = ({ goal, onClose }) => {
    
    const backdropVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };

    const modalVariants = {
        hidden: { opacity: 0, scale: 0.9, y: 50 },
        visible: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.9, y: 50 },
    };

    const progressPercentage = Math.round((goal.currentProgress / goal.target) * 100);
    const data = [{ name: 'progress', value: progressPercentage, fill: '#10b981' }]; // emerald-500
    const remaining = goal.target - goal.currentProgress;

    return (
        <MotionDiv
            className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
        >
            <MotionDiv
                className="bg-white rounded-3xl shadow-xl w-full max-w-xs p-5 space-y-3 relative text-center"
                variants={modalVariants}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on the modal
            >
                <button onClick={onClose} className="absolute top-3 right-3 text-slate-400 hover:text-slate-600" aria-label="Fechar">
                    <XIcon className="w-5 h-5" />
                </button>

                <div className="w-40 h-40 mx-auto relative">
                    <ResponsiveContainer width="100%" height="100%">
                        <RadialBarChart
                            innerRadius="80%"
                            outerRadius="100%"
                            data={data}
                            startAngle={90}
                            endAngle={-270}
                            barSize={10}
                        >
                            <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                            <RadialBar background={{ fill: '#f1f5f9' }} dataKey="value" cornerRadius={5} />
                        </RadialBarChart>
                    </ResponsiveContainer>
                     <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <TrophyIcon className="w-7 h-7 text-amber-400 mb-0.5" />
                        <span className="text-3xl font-bold text-slate-800">
                            {progressPercentage}%
                        </span>
                        <span className="text-xs font-medium text-slate-500">Completo</span>
                    </div>
                </div>

                <div>
                    <h2 className="text-lg font-bold text-slate-800">{goal.title}</h2>
                    <p className="text-sm text-slate-500 mt-1">{goal.description}</p>
                </div>

                <div className="bg-slate-100 rounded-xl p-3">
                    <p className="text-md font-bold text-slate-700">
                        {goal.currentProgress.toLocaleString()}{' '}
                        <span className="text-sm text-slate-500 font-normal">/ {goal.target.toLocaleString()} {goal.unit}</span>
                    </p>
                    {remaining > 0 ? (
                         <p className="text-xs text-emerald-600 font-semibold mt-1">Faltam {remaining.toLocaleString()} {goal.unit} para atingir a meta!</p>
                    ) : (
                         <p className="text-xs text-emerald-600 font-semibold mt-1">Parabéns! Meta concluída!</p>
                    )}
                </div>

                 <button
                    onClick={onClose}
                    className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-2.5 px-4 rounded-xl transition-colors"
                >
                    Continuar
                </button>
                
            </MotionDiv>
        </MotionDiv>
    );
};

export default GoalDetailModal;