
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { workoutFrequencyData, goals, achievements } from '../../constants';
import type { Goal, Achievement } from '../../types';
import GoalDetailModal from '../../components/GoalDetailModal';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import WorkoutFrequencyModal from '../../components/WorkoutFrequencyModal';
import AchievementTrail from '../../components/AchievementTrail';
import AchievementDetailModal from '../../components/AchievementDetailModal';

const GoalCard: React.FC<{ goal: Goal; onClick: () => void; }> = ({ goal, onClick }) => {
    const progressPercentage = (goal.currentProgress / goal.target) * 100;
    return (
        <button
            onClick={onClick}
            className="w-full text-left p-4 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100/50 dark:hover:bg-slate-700/50 transition-colors rounded-xl"
        >
            <h4 className="font-bold text-slate-800 dark:text-slate-200">{goal.title}</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">{goal.description}</p>
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
                <div 
                    className="bg-green-500 h-2.5 rounded-full" 
                    style={{ width: `${progressPercentage}%` }}
                ></div>
            </div>
            <p className="text-right text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">{goal.currentProgress.toLocaleString()} / {goal.target.toLocaleString()} {goal.unit}</p>
        </button>
    );
};

const ProgressView: React.FC = () => {
    const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
    const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
    const [isFrequencyModalOpen, setIsFrequencyModalOpen] = useState(false);

    return (
        <div className="p-6 space-y-8 pb-24">
            <header>
                <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-200">Meu Progresso</h1>
                <p className="text-slate-500 dark:text-slate-400">Sua jornada de evolução contínua.</p>
            </header>
            
            <section>
                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4">Saúde Física</h2>
                <button
                    onClick={() => setIsFrequencyModalOpen(true)}
                    className="w-full text-left p-4 h-64 border rounded-2xl border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/50 active:scale-[0.98] transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    aria-label="Ver detalhes da frequência de treinos"
                >
                    <h3 className="font-semibold text-slate-600 dark:text-slate-300 mb-2">Frequência de Treinos</h3>
                     <ResponsiveContainer width="100%" height="90%">
                        <BarChart data={workoutFrequencyData} margin={{ top: 10, right: 0, left: -25, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(203, 213, 225, 0.5)" className="dark:stroke-slate-700"/>
                            <XAxis dataKey="week" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: 'rgb(100, 115, 139)' }} className="dark:fill-slate-400" dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'rgb(100, 115, 139)' }} className="dark:fill-slate-400" allowDecimals={false}/>
                            <Tooltip
                                cursor={{fill: 'rgba(239, 246, 255, 0.7)'}}
                                contentStyle={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                    border: "1px solid #e2e8f0",
                                    borderRadius: '0.75rem',
                                    backdropFilter: 'blur(4px)',
                                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
                                }}
                                labelStyle={{ fontWeight: 'bold', color: '#1e293b' }}
                                itemStyle={{ color: '#4f46e5', fontWeight: 'bold' }}
                            />
                            <Bar dataKey="workouts" name="Treinos" fill="#818cf8" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </button>
            </section>
            
            <section>
                 <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4">Metas e Objetivos</h2>
                 <div className="space-y-3">
                     {goals.map(goal => <GoalCard key={goal.id} goal={goal} onClick={() => setSelectedGoal(goal)} />)}
                 </div>
            </section>

             <section>
                 <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4">Trilha de Conquistas</h2>
                 <AchievementTrail achievements={achievements} onAchievementClick={setSelectedAchievement} />
            </section>
            
            <AnimatePresence>
                {selectedGoal && (
                    <GoalDetailModal 
                        goal={selectedGoal} 
                        onClose={() => setSelectedGoal(null)} 
                    />
                )}
            </AnimatePresence>
            <AnimatePresence>
                {isFrequencyModalOpen && (
                    <WorkoutFrequencyModal
                        data={workoutFrequencyData}
                        onClose={() => setIsFrequencyModalOpen(false)}
                    />
                )}
            </AnimatePresence>
            <AnimatePresence>
                {selectedAchievement && (
                    <AchievementDetailModal 
                        achievement={selectedAchievement}
                        onClose={() => setSelectedAchievement(null)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProgressView;