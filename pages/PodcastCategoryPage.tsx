
import React, { useMemo } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { motion } from 'framer-motion';
import { podcastCategories, podcastItems } from '../constants';
import { ArrowLeftIcon } from '../components/icons/ArrowLeftIcon';
import { useGoBack } from '../hooks/useGoBack';
import PodcastEpisodeCard from '../components/PodcastEpisodeCard';

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

const PodcastCategoryPage: React.FC = () => {
    const { categoryId } = ReactRouterDOM.useParams<{ categoryId: string }>();
    const goBack = useGoBack('/academy');

    const category = useMemo(() => podcastCategories.find(c => c.id === categoryId), [categoryId]);
    const episodes = useMemo(() => podcastItems.filter(p => p.podcastCategoryId === categoryId), [categoryId]);
    
    // For demonstration, splitting episodes into two sections
    const popularEpisodes = episodes.slice(0, Math.ceil(episodes.length / 2));
    const recentEpisodes = episodes.slice(Math.ceil(episodes.length / 2));

    const motionProps = {
        initial: "initial",
        animate: "in",
        exit: "out",
        variants: pageVariants,
        transition: pageTransition,
    };

    if (!category) {
        return (
            <motion.div {...motionProps} className="h-full flex flex-col items-center justify-center dark:bg-slate-900">
                <p className="dark:text-slate-300">Categoria de podcast não encontrada.</p>
                <button onClick={goBack} className="mt-4 text-indigo-600 dark:text-indigo-400 font-semibold">Voltar</button>
            </motion.div>
        );
    }

    return (
        <motion.div {...motionProps} className="h-full flex flex-col bg-slate-50 dark:bg-slate-950">
             <header className="flex-shrink-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-20">
                <div className="flex items-center p-4 border-b border-slate-200 dark:border-slate-700">
                    <button onClick={goBack} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800" aria-label="Voltar">
                        <ArrowLeftIcon className="h-6 w-6 text-slate-500 dark:text-slate-400" />
                    </button>
                    <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mx-auto pr-8">{category.title}</h1>
                </div>
            </header>
            <main className="flex-grow overflow-y-auto space-y-8 py-6">
                {popularEpisodes.length > 0 && (
                    <section>
                        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 px-4 sm:px-6 mb-3">Populares em {category.title}</h2>
                        <div className="overflow-x-auto no-scrollbar">
                            <div className="flex space-x-4 px-4 sm:px-6">
                                {popularEpisodes.map(episode => (
                                    <div key={episode.id} className="w-40 flex-shrink-0">
                                        <PodcastEpisodeCard episode={episode} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}
                {recentEpisodes.length > 0 && (
                     <section>
                        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 px-4 sm:px-6 mb-3">Lançamentos Recentes</h2>
                         <div className="overflow-x-auto no-scrollbar">
                            <div className="flex space-x-4 px-4 sm:px-6">
                                {recentEpisodes.map(episode => (
                                    <div key={episode.id} className="w-40 flex-shrink-0">
                                        <PodcastEpisodeCard episode={episode} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}
            </main>
        </motion.div>
    );
};

export default PodcastCategoryPage;