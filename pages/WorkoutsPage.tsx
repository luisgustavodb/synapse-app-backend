
import React, { useState, useMemo, ElementType } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { activityItems } from '../constants';
import type { ActivityItem } from '../types';
import { ArrowLeftIcon } from '../components/icons/ArrowLeftIcon';
import { LeafIcon } from '../components/icons/LeafIcon';
import { TrendingUpIcon } from '../components/icons/TrendingUpIcon';
import { useGoBack } from '../hooks/useGoBack';

type Difficulty = 'Iniciante' | 'Médio' | 'Difícil';
type Goal = 'Condicionamento' | 'Emagrecimento' | 'Hipertrofia';

const difficultyOptions: Difficulty[] = ['Iniciante', 'Médio', 'Difícil'];
const goalOptions: Goal[] = ['Condicionamento', 'Emagrecimento', 'Hipertrofia'];

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

const FilterButton: React.FC<{
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 border-2 ${
      isActive
        ? 'bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-900 border-slate-800 dark:border-slate-200'
        : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500'
    }`}
  >
    {label}
  </button>
);

const ExerciseListItem: React.FC<{ item: ActivityItem }> = ({ item }) => (
    <ReactRouterDOM.Link to={`/detail/activity/${item.id}`} className="block transition-colors hover:bg-slate-100/70 dark:hover:bg-slate-800/70 active:bg-slate-200/60 dark:active:bg-slate-700/60">
        <div className="flex items-center space-x-4 p-3 sm:p-4">
            <img src={item.imageUrl} alt={item.title} className="w-16 h-16 rounded-full object-cover flex-shrink-0" />
            <div className="flex-1 min-w-0">
                <p className="font-bold text-slate-900 dark:text-slate-200 truncate">{item.title}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 truncate">{item.muscleGroup}</p>
            </div>
            <TrendingUpIcon className="w-6 h-6 text-slate-400 dark:text-slate-500 flex-shrink-0" />
        </div>
    </ReactRouterDOM.Link>
);

const MotionDiv = motion.div as ElementType;

const WorkoutsPage: React.FC = () => {
    const goBack = useGoBack('/academy');
    const [searchQuery, setSearchQuery] = useState('');
    const [difficultyFilter, setDifficultyFilter] = useState<Difficulty | null>(null);
    const [goalFilter, setGoalFilter] = useState<Goal | null>(null);

    const workouts = activityItems.filter(item => item.category === 'workout');

    const filteredWorkouts = useMemo(() => {
        return workouts.filter(workout => {
            const difficultyMatch = !difficultyFilter || workout.difficulty === difficultyFilter;
            const goalMatch = !goalFilter || workout.goal === goalFilter;
            const searchMatch = searchQuery === '' ||
                workout.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (workout.muscleGroup && workout.muscleGroup.toLowerCase().includes(searchQuery.toLowerCase()));
            return difficultyMatch && goalMatch && searchMatch;
        });
    }, [workouts, difficultyFilter, goalFilter, searchQuery]);
    
    const motionProps = {
        initial: "initial",
        animate: "in",
        exit: "out",
        variants: pageVariants,
        transition: pageTransition,
    };

    return (
        <MotionDiv {...motionProps} className="h-full flex flex-col bg-slate-50 dark:bg-slate-950">
            <header className="flex-shrink-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-20">
                <div className="flex items-center p-4 border-b border-slate-200 dark:border-slate-700">
                    <button onClick={goBack} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800" aria-label="Voltar">
                        <ArrowLeftIcon className="h-6 w-6 text-slate-500 dark:text-slate-400" />
                    </button>
                    <h1 className="text-xl font-bold text-slate-800 dark:text-slate-200 mx-auto pr-8">Explore os Treinos</h1>
                </div>
            </header>

            <div className="p-4 space-y-4 flex-shrink-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 sticky top-[65px] z-10">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <LeafIcon className="h-5 w-5 text-slate-400 dark:text-slate-500" />
                    </div>
                    <input
                        type="search"
                        placeholder="Pesquisar exercício..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg py-2.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-slate-800 dark:text-slate-200 text-sm"
                        aria-label="Pesquisar exercícios"
                    />
                </div>
                <section>
                    <div className="flex flex-wrap gap-2 pb-1">
                        <FilterButton label="Todos" isActive={!difficultyFilter} onClick={() => setDifficultyFilter(null)} />
                        {difficultyOptions.map(option => (
                            <FilterButton key={option} label={option} isActive={difficultyFilter === option} onClick={() => setDifficultyFilter(option)} />
                        ))}
                    </div>
                </section>
                <section>
                    <div className="flex flex-wrap gap-2 pb-1">
                        <FilterButton label="Todos" isActive={!goalFilter} onClick={() => setGoalFilter(null)} />
                        {goalOptions.map(option => (
                            <FilterButton key={option} label={option} isActive={goalFilter === option} onClick={() => setGoalFilter(option)} />
                        ))}
                    </div>
                </section>
            </div>

            <main className="flex-grow overflow-y-auto">
                 <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200 px-4 pt-4 pb-2">Treinos Populares</h2>
                <AnimatePresence>
                     {filteredWorkouts.length > 0 ? (
                        <MotionDiv 
                            layout
                            className="divide-y divide-slate-200 dark:divide-slate-800"
                        >
                            {filteredWorkouts.map((item, index) => (
                                <MotionDiv
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.2, delay: index * 0.05 }}
                                >
                                    <ExerciseListItem item={item} />
                                </MotionDiv>
                            ))}
                        </MotionDiv>
                     ) : (
                         <MotionDiv
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center pt-16 px-6"
                         >
                            <div className="inline-block p-4 bg-slate-200 dark:bg-slate-800 rounded-full">
                                <LeafIcon className="h-10 w-10 text-slate-400 dark:text-slate-500" />
                            </div>
                            <h3 className="mt-4 text-lg font-bold text-slate-700 dark:text-slate-300">Nenhum exercício encontrado</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Tente uma busca ou filtros diferentes para ver mais resultados.</p>
                         </MotionDiv>
                     )}
                </AnimatePresence>
            </main>
        </MotionDiv>
    );
};

export default WorkoutsPage;
