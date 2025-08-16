

import React, { useState, ElementType, useEffect } from 'react';
import { motion } from 'framer-motion';
import { feedPosts } from '../constants';
import FeedPostCard from '../components/FeedPostCard';
import AdFeedCard from '../components/AdFeedCard';
import { MessageIcon } from '../components/icons/MessageIcon';
import { BellIcon } from '../components/icons/BellIcon';
import NotificationsPanel from '../components/NotificationsPanel';
import ChatPanel from '../components/ChatPanel';
import type { FeedPost } from '../types';

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

// Fisher-Yates (aka Knuth) Shuffle
const shuffleArray = (array: any[]) => {
  let currentIndex = array.length,  randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
};

const HomePage: React.FC = () => {
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [posts, setPosts] = useState<FeedPost[]>(() => shuffleArray([...feedPosts]));

    useEffect(() => {
        const fetchNewPosts = async () => {
            try {
                const response = await fetch("https://pleased-sharply-cheetah.ngrok-free.app/webhook/3334fa36-6eea-4046-98fe-f36f9ebef092", {
                    headers: {
                        'ngrok-skip-browser-warning': 'true'
                    }
                });
                if (!response.ok) {
                    console.error("Failed to fetch new posts, status:", response.status);
                    return;
                }
                
                const contentType = response.headers.get("content-type");
                if (!contentType || !contentType.includes("application/json")) {
                    const text = await response.text();
                    console.error("Received non-JSON response from posts webhook:", text);
                    return;
                }
                const newPostsData: any[] = await response.json();

                if (Array.isArray(newPostsData) && newPostsData.length > 0) {
                    const existingPostIds = new Set(posts.map(p => p.id));
                    
                    const newlyFetchedPosts: FeedPost[] = newPostsData
                        .filter(p => p && p.id && !existingPostIds.has(p.id.toString()))
                        .map((p) => {
                            let imageUrl = p.imagem;
                            // Sanitize the image URL which might be a double-stringified JSON from the backend
                            if (typeof imageUrl === 'string' && imageUrl.length > 1 && imageUrl.startsWith('"') && imageUrl.endsWith('"')) {
                                imageUrl = imageUrl.substring(1, imageUrl.length - 1);
                            }
                            
                            let avatarUrl = p['imagem de perfil'] || 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png';
                            // Sanitize the avatar URL
                            if (typeof avatarUrl === 'string' && avatarUrl.length > 1 && avatarUrl.startsWith('"') && avatarUrl.endsWith('"')) {
                                avatarUrl = avatarUrl.substring(1, avatarUrl.length - 1);
                            }

                            return {
                                id: p.id.toString(),
                                author: {
                                    name: p.nome_usuario || 'Usuário Synapse',
                                    handle: p.usuario ? `@${p.usuario}` : '@synapse',
                                    avatar: avatarUrl,
                                },
                                imageUrl: imageUrl,
                                caption: `${p.titulo}\n${p.descrição}`,
                                likes: Math.floor(Math.random() * 500),
                                comments: Math.floor(Math.random() * 50),
                                type: 'post' as const,
                            };
                        });

                    if (newlyFetchedPosts.length > 0) {
                        setPosts(currentPosts => {
                            const combinedPosts = [...newlyFetchedPosts, ...currentPosts];
                            feedPosts.length = 0;
                            feedPosts.push(...combinedPosts);
                            return shuffleArray(combinedPosts);
                        });
                    }
                }
            } catch (error) {
                if (error instanceof SyntaxError) {
                    console.error("Error parsing JSON from webhook:", error);
                } else {
                    console.error("Error polling for new posts:", error);
                }
            }
        };

        const intervalId = setInterval(fetchNewPosts, 15000); // Poll every 15 seconds

        return () => clearInterval(intervalId); // Cleanup on component unmount
    }, [posts]);


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
                <div className="space-y-4">
                    {posts.map(post => (
                        post.type === 'ad'
                            ? <AdFeedCard key={post.id} post={post} />
                            : <FeedPostCard key={post.id} post={post} />
                    ))}
                    <div className="text-center py-8 text-slate-500 dark:text-slate-400 text-sm font-medium">
                        <p>Você chegou ao final dos feeds.</p>
                    </div>
                </div>
            </div>
        </MotionDiv>
    );
};

export default HomePage;
