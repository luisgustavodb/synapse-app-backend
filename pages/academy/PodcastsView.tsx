
import React, { ElementType } from 'react';
import { motion } from 'framer-motion';
import { podcastCategories } from '../../constants';
import PodcastCategoryCard from '../../components/PodcastCategoryCard';

const MotionDiv = motion.div as ElementType;

const PodcastsView: React.FC = () => {
    return (
        <div className="p-4 sm:p-6 pb-24 bg-slate-50 dark:bg-slate-900 min-h-full">
            <header className="mb-6">
                <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-200">Podcasts</h1>
                <p className="text-slate-500 dark:text-slate-400">Explore categorias e descubra novos episódios.</p>
            </header>
            <MotionDiv 
                layout
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
            >
                {podcastCategories.map((category, index) => (
                    <MotionDiv
                        key={category.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                        <PodcastCategoryCard category={category} />
                    </MotionDiv>
                ))}
            </MotionDiv>
        </div>
    );
};

export default PodcastsView;
