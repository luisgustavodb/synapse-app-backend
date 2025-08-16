
import React, { useMemo, ElementType } from 'react';
import { motion } from 'framer-motion';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import type { ProgressChartData } from '../types';
import { XIcon } from './icons/XIcon';
import { ChartBarIcon } from './icons/ChartBarIcon';

interface WorkoutFrequencyModalProps {
    data: ProgressChartData[];
    onClose: () => void;
}

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 p-3 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700">
                <p className="font-bold text-slate-800 dark:text-slate-200">{`Semana: ${label}`}</p>
                <p className="text-sm text-slate-600 dark:text-slate-300">{`Treinos: ${payload[0].value}`}</p>
            </div>
        );
    }
    return null;
};

const MotionDiv = motion.div as ElementType;

const WorkoutFrequencyModal: React.FC<WorkoutFrequencyModalProps> = ({ data, onClose }) => {
    
    const backdropVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };

    const modalVariants = {
        hidden: { opacity: 0, scale: 0.9, y: 50 },
        visible: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.9, y: 50 },
    };

    const stats = useMemo(() => {
        if (!data || data.length === 0) {
            return { total: 0, average: 0, peak: null, low: null };
        }
        const total = data.reduce((sum, item) => sum + item.workouts, 0);
        const average = (total / data.length).toFixed(1);
        const peak = data.reduce((max, item) => item.workouts > max.workouts ? item : max, data[0]);
        const low = data.reduce((min, item) => item.workouts < min.workouts ? item : min, data[0]);
        return { total, average, peak, low };
    }, [data]);

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
                className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl w-full max-w-md p-5 space-y-4 relative"
                variants={modalVariants}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                onClick={(e) => e.stopPropagation()}
            >
                <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 z-10" aria-label="Fechar">
                    <XIcon className="w-6 h-6" />
                </button>
                
                <header className="flex items-center space-x-3">
                    <div className="bg-indigo-100 dark:bg-indigo-900/50 p-2 rounded-lg">
                        <ChartBarIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200">Frequência de Treinos</h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Uma análise do seu desempenho.</p>
                    </div>
                </header>
                
                <div className="h-52">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data} margin={{ top: 20, right: 10, left: -20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(203, 213, 225, 0.7)" className="dark:stroke-slate-700" />
                            <XAxis dataKey="week" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} dy={10} className="fill-slate-500 dark:fill-slate-400" />
                            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} allowDecimals={false} className="fill-slate-500 dark:fill-slate-400" />
                            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(239, 246, 255, 0.7)', className: 'dark:fill-slate-700/50' }} />
                            <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '15px' }} />
                            <Bar dataKey="workouts" name="Treinos" fill="#6366f1" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="bg-slate-100 dark:bg-slate-700/50 p-2 rounded-lg">
                        <p className="font-semibold text-slate-500 dark:text-slate-400 text-xs">Total de treinos</p>
                        <p className="text-xl font-bold text-slate-800 dark:text-slate-200">{stats.total}</p>
                    </div>
                    <div className="bg-slate-100 dark:bg-slate-700/50 p-2 rounded-lg">
                        <p className="font-semibold text-slate-500 dark:text-slate-400 text-xs">Média semanal</p>
                        <p className="text-xl font-bold text-slate-800 dark:text-slate-200">{stats.average}</p>
                    </div>
                     <div className="bg-slate-100 dark:bg-slate-700/50 p-2 rounded-lg">
                        <p className="font-semibold text-slate-500 dark:text-slate-400 text-xs">Pico de treinos</p>
                        <p className="text-base font-bold text-slate-800 dark:text-slate-200">{stats.peak?.workouts} <span className="text-xs font-normal text-slate-600 dark:text-slate-300">({stats.peak?.week})</span></p>
                    </div>
                     <div className="bg-slate-100 dark:bg-slate-700/50 p-2 rounded-lg">
                        <p className="font-semibold text-slate-500 dark:text-slate-400 text-xs">Menor frequência</p>
                         <p className="text-base font-bold text-slate-800 dark:text-slate-200">{stats.low?.workouts} <span className="text-xs font-normal text-slate-600 dark:text-slate-300">({stats.low?.week})</span></p>
                    </div>
                </div>
            </MotionDiv>
        </MotionDiv>
    );
};

export default WorkoutFrequencyModal;
