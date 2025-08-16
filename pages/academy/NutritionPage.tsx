
import React, { useState, ElementType } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NutritionTrackerView from './NutritionTrackerView';
import ExploreNutritionView from './ExploreNutritionView';

type NutritionSubTab = 'tracker' | 'explore';

const MotionDiv = motion.div as ElementType;

const NutritionPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<NutritionSubTab>('tracker');

    const renderContent = () => {
        switch(activeTab) {
            case 'tracker': return <NutritionTrackerView />;
            case 'explore': return <ExploreNutritionView />;
            default: return <NutritionTrackerView />;
        }
    };
    
    const SubTabButton: React.FC<{
        tabName: NutritionSubTab;
        label: string;
    }> = ({ tabName, label }) => {
        const isActive = activeTab === tabName;
        return (
            <button
                onClick={() => setActiveTab(tabName)}
                className={`w-full rounded-full py-2.5 text-sm font-bold transition-colors ${
                    isActive ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-slate-100 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-700/50'
                }`}
            >
                {label}
            </button>
        );
    }


    return (
        <div className="h-full">
            <div className="p-4 pt-6 bg-slate-50 dark:bg-slate-900">
                <div className="bg-slate-200 dark:bg-slate-800 p-1 rounded-full grid grid-cols-2 gap-1 max-w-sm mx-auto">
                    <SubTabButton tabName="tracker" label="Diário" />
                    <SubTabButton tabName="explore" label="Explorar" />
                </div>
            </div>
            <AnimatePresence mode="wait">
                <MotionDiv
                    key={activeTab}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {renderContent()}
                </MotionDiv>
            </AnimatePresence>
        </div>
    );
};

export default NutritionPage;