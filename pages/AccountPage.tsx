
import React, { useState, useMemo, ElementType, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion';
import { useUser } from '../context/UserContext';
import { storyHighlights, userStories } from '../constants';
import StoryView from '../components/StoryView';
import type { StoryHighlight } from '../types';
import FollowList from '../components/FollowList';
import UserInfoCard from '../components/UserInfoCard';
import HighlightCard from '../components/HighlightCard';
import MyProgressPage from './account/MyProgressPage';
import { PlusIcon } from '../components/icons/PlusIcon';
import { SettingsIcon } from '../components/icons/SettingsIcon';
import VideoThumbnail from '../components/VideoThumbnail';
import { ArrowDownIcon } from '../components/icons/ArrowDownIcon';


const PULL_THRESHOLD = 80;

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

const AccountPage: React.FC = () => {
    const { user, feedPosts, refreshFeed, isRefreshing } = useUser();
    const [activeTab, setActiveTab] = useState<'posts' | 'progress'>('posts');
    const [viewingHighlight, setViewingHighlight] = useState<StoryHighlight | null>(null);
    const [isFollowListOpen, setIsFollowListOpen] = useState(false);
    const [initialFollowTab, setInitialFollowTab] = useState<'followers' | 'following'>('followers');

    const containerRef = useRef<HTMLDivElement>(null);
    const pullY = useMotionValue(0);
    const [isDragging, setIsDragging] = useState(false);
    const startY = useRef(0);

    const iconScale = useTransform(pullY, [0, PULL_THRESHOLD], [0.5, 1.2]);
    const iconRotate = useTransform(pullY, [0, PULL_THRESHOLD], [0, 180]);
    const contentY = useTransform(pullY, [0, PULL_THRESHOLD * 1.5], [0, PULL_THRESHOLD]);


    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        const scrollContainer = containerRef.current;
        if (scrollContainer && scrollContainer.scrollTop === 0) {
            setIsDragging(true);
            startY.current = e.touches[0].clientY;
        }
    };
    
    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        if (!isDragging) return;
        const deltaY = e.touches[0].clientY - startY.current;
        const dampedDelta = deltaY > 0 ? deltaY * 0.4 : 0;
        pullY.set(dampedDelta);
    };

    const handleTouchEnd = () => {
        if (!isDragging) return;
        setIsDragging(false);

        const currentPullY = pullY.get();
        if (currentPullY >= PULL_THRESHOLD) {
            refreshFeed();
        }
        
        animate(pullY, 0, { type: "spring", stiffness: 300, damping: 30 });
    };

    const userPosts = useMemo(() => {
        if (!user) return [];
        return feedPosts.filter(post => post.author.handle === user.handle && post.type === 'post');
    }, [user, feedPosts]);

    if (!user) {
        // Should not be reached due to ProtectedLayout, but it's a good safeguard.
        return null;
    }

    const userMainStory: StoryHighlight = {
        id: 'user-main-story',
        label: user.name,
        coverUrl: user.avatarUrl,
        stories: userStories,
    };
    
    const motionProps = {
        initial:"initial",
        animate:"in",
        exit:"out",
        variants:pageVariants,
        transition:pageTransition
    };
    
    const openFollowers = () => {
        setInitialFollowTab('followers');
        setIsFollowListOpen(true);
    };

    const openFollowing = () => {
        setInitialFollowTab('following');
        setIsFollowListOpen(true);
    };

    const openAvatarStory = () => {
        if (userStories.length > 0) {
            setViewingHighlight(userMainStory);
        }
    };

    return (
        <MotionDiv
            {...motionProps}
            className="flex flex-col h-full bg-slate-100 dark:bg-slate-950"
        >
            <header className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-20">
                <div className="flex-1 flex justify-start">
                    <Link to="/settings" className="p-2 -ml-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800">
                        <SettingsIcon className="h-6 w-6 text-slate-600 dark:text-slate-300" />
                    </Link>
                </div>
                <h1 className="text-lg font-bold text-slate-800 dark:text-slate-200 flex-1 text-center">{user.handle}</h1>
                <div className="flex-1 flex justify-end">
                    <Link to="/create" className="p-2 -mr-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800">
                        <PlusIcon className="h-6 w-6 text-slate-600 dark:text-slate-300" />
                    </Link>
                </div>
            </header>
            <main 
                ref={containerRef} 
                className="flex-grow overflow-y-auto relative"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                 <motion.div
                    className="absolute top-0 left-0 right-0 flex justify-center items-center pointer-events-none z-10"
                    style={{ y: pullY, translateY: '-100%' }}
                >
                    <AnimatePresence>
                        {isRefreshing ? (
                            <motion.div
                                key="spinner"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                className="my-4 p-2 bg-white dark:bg-slate-800 rounded-full shadow-lg"
                            >
                                <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-indigo-500"></div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="arrow"
                                className="my-4 p-2 bg-white dark:bg-slate-800 rounded-full shadow-lg"
                                style={{ scale: iconScale }}
                            >
                                <motion.div style={{ rotate: iconRotate }}>
                                    <ArrowDownIcon className="h-6 w-6 text-slate-500 dark:text-slate-400" />
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
                
                <motion.div style={{ y: contentY }}>
                    <div className="p-4 space-y-4">
                        <UserInfoCard 
                            user={user} 
                            postCount={userPosts.length}
                            hasStories={userStories.length > 0}
                            onAvatarClick={openAvatarStory}
                            onFollowersClick={openFollowers}
                            onFollowingClick={openFollowing}
                        />

                        <section>
                            <h2 className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-2 px-1">Coleções</h2>
                            <div className="flex items-center space-x-3 overflow-x-auto no-scrollbar pb-2">
                                 <HighlightCard isAddNew onClick={() => alert('Add new highlight!')} />
                                 {storyHighlights.map(highlight => (
                                    <HighlightCard 
                                        key={highlight.id} 
                                        highlight={highlight} 
                                        onClick={() => setViewingHighlight(highlight)}
                                    />
                                ))}
                            </div>
                        </section>
                    </div>
                    
                    {/* View Tabs */}
                    <div className="bg-white dark:bg-slate-900 sticky top-0 z-10 border-y border-slate-200 dark:border-slate-700">
                        <div className="grid grid-cols-2">
                            <TabButton label="Publicações" isActive={activeTab === 'posts'} onClick={() => setActiveTab('posts')} />
                            <TabButton label="Jornada" isActive={activeTab === 'progress'} onClick={() => setActiveTab('progress')} />
                        </div>
                    </div>

                    {/* Content based on active tab */}
                    <div className="p-1 md:p-4">
                        {activeTab === 'posts' && (
                            <div className="grid grid-cols-3 gap-1 md:gap-3">
                                {userPosts.map(post => (
                                    <Link to={`/detail/post/${post.id}`} key={post.id} className="aspect-square bg-slate-200 dark:bg-slate-800 rounded-lg overflow-hidden transition-transform duration-200 active:scale-95">
                                        {post.videoUrl ? (
                                            <VideoThumbnail videoUrl={post.videoUrl} alt={post.caption} className="w-full h-full object-cover" />
                                        ) : post.imageUrl ? (
                                            <img src={post.imageUrl} alt={post.caption} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-slate-100 dark:bg-slate-700">
                                                <span className="text-slate-400 text-xs">Sem mídia</span>
                                            </div>
                                        )}
                                    </Link>
                                ))}
                            </div>
                        )}
                        
                        {activeTab === 'progress' && (
                           <div className="p-3 md:p-0">
                              <MyProgressPage />
                            </div>
                        )}
                    </div>
                </motion.div>
            </main>
             <AnimatePresence>
                {viewingHighlight && (
                    <StoryView 
                        highlight={viewingHighlight} 
                        onClose={() => setViewingHighlight(null)} 
                    />
                )}
            </AnimatePresence>
            <AnimatePresence>
                {isFollowListOpen && (
                    <FollowList
                        initialTab={initialFollowTab}
                        onClose={() => setIsFollowListOpen(false)}
                    />
                )}
            </AnimatePresence>
        </MotionDiv>
    );
};


const TabButton: React.FC<{label: string, isActive: boolean, onClick: () => void}> = ({label, isActive, onClick}) => {
    return (
        <button 
            onClick={onClick} 
            className={`flex justify-center items-center py-3 transition-colors relative focus:outline-none focus-visible:bg-slate-100 dark:focus-visible:bg-slate-800 ${isActive ? 'text-slate-800 dark:text-slate-100' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'}`}
            aria-selected={isActive}
        >
            <span className="font-semibold text-sm">{label}</span>
            {isActive && <div className="absolute bottom-0 h-0.5 w-full bg-slate-800 dark:bg-slate-100" />}
        </button>
    )
}


export default AccountPage;
