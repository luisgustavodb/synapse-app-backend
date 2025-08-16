
import React, { useState, ElementType } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// New separated view components
import ProgressView from './academy/ProgressView';
import AcademyView from './academy/AcademyView';
import NutritionPage from './academy/NutritionPage';
import PodcastsView from './academy/PodcastsView';
import SearchView from './academy/SearchView';

// Icons
import { ChefHatIcon } from '../components/icons/ChefHatIcon';
import { ChartBarIcon } from '../components/icons/ChartBarIcon';
import { FireIcon } from '../components/icons/FireIcon';
import { MicrophoneIcon } from '../components/icons/MicrophoneIcon';
import { LeafIcon } from '../components/icons/LeafIcon';


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

type AcademyTab = 'search' | 'progress' | 'academy' | 'nutrition' | 'podcasts';

const MotionDiv = motion.div as ElementType;

const AcademyPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<AcademyTab>('search');
    
    const motionProps = {
        initial: "initial",
        animate: "in",
        exit: "out",
        variants: pageVariants,
        transition: pageTransition,
    };

    const renderContent = () => {
        switch(activeTab) {
            case 'search': return <SearchView />;
            case 'academy': return <AcademyView />;
            case 'nutrition': return <NutritionPage />;
            case 'podcasts': return <PodcastsView />;
            case 'progress': return <ProgressView />;
            default: return <SearchView />;
        }
    };
    
    const TabButton: React.FC<{
        tabName: AcademyTab;
        label: string;
        Icon: React.FC<React.SVGProps<SVGSVGElement>>;
    }> = ({ tabName, label, Icon }) => (
        <button
            onClick={() => setActiveTab(tabName)}
            aria-label={label}
            className={`flex-1 py-3 flex justify-center items-center transition-colors focus:outline-none ${
                activeTab === tabName 
                    ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400' 
                    : 'text-slate-500 dark:text-slate-400 border-b-2 border-transparent hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
        >
            <Icon className="h-6 w-6" />
        </button>
    );

    return (
        <MotionDiv {...motionProps} className="h-full flex flex-col bg-slate-50 dark:bg-slate-950">
            <header className="flex-shrink-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-10">
                <nav className="flex justify-around">
                    <TabButton tabName="search" label="Pesquisa" Icon={LeafIcon} />
                    <TabButton tabName="progress" label="Meu Progresso" Icon={ChartBarIcon} />
                    <TabButton tabName="academy" label="Academia" Icon={FireIcon} />
                    <TabButton tabName="nutrition" label="Nutrição" Icon={ChefHatIcon} />
                    <TabButton tabName="podcasts" label="Podcasts" Icon={MicrophoneIcon} />
                </nav>
            </header>
            <main className="flex-grow overflow-y-auto">
                <AnimatePresence mode="wait">
                    <MotionDiv
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="h-full"
                    >
                        {renderContent()}
                    </MotionDiv>
                </AnimatePresence>
            </main>
        </MotionDiv>
    );
};

export default AcademyPage;