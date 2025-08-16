import React, { useState, useMemo, ElementType } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { groupClasses, brazilianStates } from '../constants';
import { ArrowLeftIcon } from '../components/icons/ArrowLeftIcon';
import GroupClassCard from '../components/GroupClassCard';
import FilterDrawer from '../components/FilterDrawer';
import { ChevronRightIcon } from '../components/icons/ChevronRightIcon';
import { UsersIcon } from '../components/icons/UsersIcon';
import { useGoBack } from '../hooks/useGoBack';

type Period = 'Manhã' | 'Tarde' | 'Noite';
type AgeRange = '18-25' | '26-40' | 'Outros';

const periodOptions: Period[] = ['Manhã', 'Tarde', 'Noite'];
const ageRangeOptions: AgeRange[] = ['18-25', '26-40', 'Outros'];

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
        className={`px-4 py-1.5 text-sm font-semibold rounded-full transition-all duration-200 border ${
      isActive
        ? 'bg-indigo-600 text-white border-indigo-600'
        : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500'
    }`}
    >
        {label}
    </button>
);

const MotionDiv = motion.div as ElementType;

const GroupClassesPage: React.FC = () => {
    const goBack = useGoBack('/academy');
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [regionFilter, setRegionFilter] = useState<string | null>(null);
    const [periodFilter, setPeriodFilter] = useState<Period | null>(null);
    const [ageRangeFilter, setAgeRangeFilter] = useState<AgeRange | null>(null);

    const filteredClasses = useMemo(() => {
        return groupClasses.filter(c => {
            const regionMatch = !regionFilter || c.region === regionFilter;
            const periodMatch = !periodFilter || c.period === periodFilter;
            const ageRangeMatch = !ageRangeFilter || c.ageRange === ageRangeFilter;
            return regionMatch && periodMatch && ageRangeMatch;
        });
    }, [regionFilter, periodFilter, ageRangeFilter]);
    
    const motionProps = {
        initial: "initial",
        animate: "in",
        exit: "out",
        variants: pageVariants,
        transition: pageTransition,
    };

    const selectedStateLabel = brazilianStates.find(s => s.value === regionFilter)?.label || 'Qualquer Região';

    return (
        <MotionDiv {...motionProps} className="h-full flex flex-col bg-slate-50 dark:bg-slate-950">
            <header className="flex-shrink-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-20">
                <div className="flex items-center p-4 border-b border-slate-200 dark:border-slate-700">
                    <button onClick={goBack} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800" aria-label="Voltar">
                        <ArrowLeftIcon className="h-6 w-6 text-slate-500 dark:text-slate-400" />
                    </button>
                    <h1 className="text-xl font-bold text-slate-800 dark:text-slate-200 mx-auto pr-8">Aulas Coletivas</h1>
                </div>
            </header>

            <div className="p-4 space-y-4 flex-shrink-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 sticky top-[65px] z-10">
                <button
                    onClick={() => setIsDrawerOpen(true)}
                    className="w-full flex justify-between items-center bg-slate-100 dark:bg-slate-800 p-3 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                    <div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">REGIÃO</p>
                        <p className="text-slate-800 dark:text-slate-200 font-bold">{selectedStateLabel}</p>
                    </div>
                    <ChevronRightIcon className="h-5 w-5 text-slate-400 dark:text-slate-500" />
                </button>
                <div className="space-y-3">
                    <div>
                        <h2 className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 px-1">PERÍODO</h2>
                        <div className="flex items-center space-x-2">
                            <FilterButton label="Todos" isActive={!periodFilter} onClick={() => setPeriodFilter(null)} />
                            {periodOptions.map(o => <FilterButton key={o} label={o} isActive={periodFilter === o} onClick={() => setPeriodFilter(o)} />)}
                        </div>
                    </div>
                    <div>
                        <h2 className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 px-1">FAIXA ETÁRIA</h2>
                        <div className="flex items-center space-x-2">
                            <FilterButton label="Todos" isActive={!ageRangeFilter} onClick={() => setAgeRangeFilter(null)} />
                            {ageRangeOptions.map(o => <FilterButton key={o} label={o} isActive={ageRangeFilter === o} onClick={() => setAgeRangeFilter(o)} />)}
                        </div>
                    </div>
                </div>
            </div>

            <main className="flex-grow overflow-y-auto p-4">
                 <AnimatePresence>
                     {filteredClasses.length > 0 ? (
                        <MotionDiv layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {filteredClasses.map((item, index) => (
                                <MotionDiv
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.2, delay: index * 0.05 }}
                                >
                                    <GroupClassCard groupClass={item} />
                                </MotionDiv>
                            ))}
                        </MotionDiv>
                     ) : (
                         <MotionDiv initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center pt-16">
                            <div className="inline-block p-4 bg-slate-200 dark:bg-slate-800 rounded-full">
                                <UsersIcon className="h-10 w-10 text-slate-400 dark:text-slate-500" />
                            </div>
                            <h3 className="mt-4 text-lg font-bold text-slate-700 dark:text-slate-300">Nenhuma aula encontrada</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Tente ajustar os filtros para ver mais resultados.</p>
                         </MotionDiv>
                     )}
                </AnimatePresence>
            </main>

            <FilterDrawer 
                isOpen={isDrawerOpen} 
                onClose={() => setIsDrawerOpen(false)}
                onSelect={(state) => {
                    setRegionFilter(state);
                    setIsDrawerOpen(false);
                }}
                onClear={() => {
                    setRegionFilter(null);
                    setIsDrawerOpen(false);
                }}
            />
        </MotionDiv>
    );
};

export default GroupClassesPage;
