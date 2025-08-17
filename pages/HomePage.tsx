

import React, { useState, ElementType } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import FeedPostCard from '../components/FeedPostCard';
import AdFeedCard from '../components/AdFeedCard';
import { MessageIcon } from '../components/icons/MessageIcon';
import { BellIcon } from '../components/icons/BellIcon';
import { PlusIcon } from '../components/icons/PlusIcon';
import NotificationsPanel from '../components/NotificationsPanel';
import ChatPanel from '../components/ChatPanel';
import type { FeedPost } from '../types';
import { ExclamationTriangleIcon } from '../components/icons/ExclamationTriangleIcon';

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

const MotionDiv = motion.div as ElementType;
const MotionHeader = motion.header as ElementType;

const HomePage: React.FC = () => {
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const { feedPosts, feedError, isFeedLoading, refreshFeed, isRefreshing } = useUser();
    
    const [touchStartY, setTouchStartY] = useState(0);

    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        const scrollContainer = (e.currentTarget as HTMLElement).closest('.no-scrollbar');
        if (scrollContainer && scrollContainer.scrollTop === 0) {
            setTouchStartY(e.targetTouches[0].clientY);
        } else {
            setTouchStartY(0);
        }
    };

    const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
        if (touchStartY === 0) return;
        const finalY = e.changedTouches[0].clientY;
        if (finalY - touchStartY > 100) { // Pull threshold
            refreshFeed();
        }
        setTouchStartY(0);
    };


    const motionProps = {
        initial: "initial",
        animate: "in",
        exit: "out",
        variants: pageVariants,
        transition: pageTransition,
    };

    return (
        <MotionDiv
            {...motionProps}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            <div className="sticky top-0 w-full z-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700 h-[68px]">
                <MotionHeader
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center justify-between p-4 w-full h-full"
                >
                    <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200 tracking-tighter md:hidden">Synapse</h1>
                    <div className="flex-grow md:hidden" />
                    <div className="flex items-center space-x-2 sm:space-x-4">
                        <button 
                            onClick={() => setIsNotificationsOpen(prev => !prev)}
                            className="p-1 relative text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400" 
                            aria-label="Notificações"
                        >
                            <BellIcon className="h-6 w-6" />
                            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-blue-500 ring-2 ring-white dark:ring-slate-900"></span>
                        </button>
                        <button 
                            onClick={() => setIsChatOpen(true)}
                            className="p-1 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400" 
                            aria-label="Mensagens"
                        >
                            <MessageIcon className="h-7 w-7" />
                        </button>
                    </div>
                </MotionHeader>
            </div>

            <NotificationsPanel isOpen={isNotificationsOpen} onClose={() => setIsNotificationsOpen(false)} />
            <ChatPanel isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

            <div className="pb-24">
                 {isRefreshing && (
                    <div className="flex justify-center items-center py-4">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
                    </div>
                )}
                {feedError && (
                    <div className="p-4 m-4 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-600/50 text-red-800 dark:text-red-200 rounded-lg text-left flex items-start space-x-3">
                        <ExclamationTriangleIcon className="h-6 w-6 text-red-500 dark:text-red-400 flex-shrink-0 mt-1" />
                        <div>
                            <p className="font-bold">Erro ao Carregar o Feed</p>
                            <p className="text-sm mt-1 whitespace-pre-line">{feedError}</p>
                        </div>
                    </div>
                )}
                
                {isFeedLoading && feedPosts.length === 0 && !feedError && (
                     <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-500"></div>
                    </div>
                )}

                {feedPosts.length > 0 ? (
                    <div className="space-y-4">
                        {feedPosts.map(post => (
                            post.type === 'ad'
                                ? <AdFeedCard key={post.id} post={post} />
                                : <FeedPostCard key={post.id} post={post} />
                        ))}
                        <div className="text-center py-8 text-slate-500 dark:text-slate-400 text-sm font-medium">
                            <p>Você chegou ao final do feed.</p>
                        </div>
                    </div>
                ) : (
                    !feedError && !isFeedLoading && (
                         <div className="text-center py-20 px-6 text-slate-500 dark:text-slate-400">
                            <p className="font-semibold text-lg text-slate-600 dark:text-slate-300">Seu feed está vazio</p>
                            <p className="text-sm mt-2">Comece a seguir pessoas ou explore para ver novas publicações aqui.</p>
                            <Link to="/create" className="mt-6 inline-flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-5 rounded-full transition-colors">
                                <PlusIcon className="w-5 h-5" />
                                <span>Criar Publicação</span>
                            </Link>
                        </div>
                    )
                )}
            </div>
        </MotionDiv>
    );
};

export default HomePage;
