

import React, { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { articles, activityItems, podcastItems, resourceItems } from '../constants';
import { useUser } from '../context/UserContext';
import type { Article, ActivityItem, PodcastItem, ResourceItem, FeedPost } from '../types';
import { DumbbellIcon } from '../components/icons/DumbbellIcon';
import { ClockIcon } from '../components/icons/ClockIcon';
import { useGoBack } from '../hooks/useGoBack';
import { PodcastDetailView } from '../components/PodcastDetailView';
import PostDetailView from '../components/PostDetailView';
import { ArrowLeftIcon } from '../components/icons/ArrowLeftIcon';


type ContentItem = Article | ActivityItem | PodcastItem | ResourceItem | FeedPost;

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5,
} as const;

const DetailPage: React.FC = () => {
    const { type, id } = useParams<{ type: string; id: string }>();
    const { feedPosts } = useUser();
    const [item, setItem] = useState<ContentItem | null>(null);
    const [allUserPosts, setAllUserPosts] = useState<FeedPost[]>([]);
    const [fallbackPath, setFallbackPath] = useState('/academy');
    const goBack = useGoBack(fallbackPath);

    useEffect(() => {
        let foundItem: ContentItem | undefined;
        let newFallback = '/academy';

        switch (type) {
            case 'article':
                foundItem = articles.find(a => a.id === id);
                if (foundItem) {
                    const article = foundItem as Article;
                    if (article.type === 'CURIOSITY') {
                        newFallback = '/curiosities';
                    } else {
                        newFallback = '/articles';
                    }
                }
                break;
            case 'activity':
                foundItem = activityItems.find(a => a.id === id);
                 if (foundItem) {
                    const activity = foundItem as ActivityItem;
                    if (activity.category === 'nutrition') {
                        newFallback = '/recipes';
                    } else if (activity.category === 'workout') {
                        newFallback = '/workouts';
                    }
                }
                break;
            case 'podcast':
                 foundItem = podcastItems.find(p => p.id === id);
                 if (foundItem) {
                    newFallback = `/podcasts/${(foundItem as PodcastItem).podcastCategoryId}`;
                 } else {
                    newFallback = '/academy';
                 }
                break;
            case 'resource':
                 foundItem = resourceItems.find(r => r.id === id);
                 newFallback = '/academy';
                break;
            case 'post':
                foundItem = feedPosts.find(p => p.id === id);
                if (foundItem) {
                    const post = foundItem as FeedPost;
                    const userPosts = feedPosts.filter(p => p.author.handle === post.author.handle && p.type === 'post');
                    setAllUserPosts(userPosts);
                    newFallback = '/account';
                }
                break;
        }
        setItem(foundItem || null);
        setFallbackPath(newFallback);
    }, [type, id, feedPosts]);
    
    const motionProps = {
        initial:"initial",
        animate:"in",
        exit:"out",
        variants:pageVariants,
        transition:pageTransition
    };

    if (!item) {
        return <div className="p-6 text-center dark:text-slate-300">Conteúdo não encontrado.</div>;
    }
    
    if (type === 'podcast') {
        return <PodcastDetailView podcast={item as PodcastItem} goBack={goBack} />;
    }
    
    if (type === 'post') {
        return <PostDetailView initialPost={item as FeedPost} allPosts={allUserPosts} goBack={goBack} />;
    }
    
    if (!('title' in item) || !('content' in item)) {
        return (
            <motion.div {...motionProps} className="p-6 text-center h-full flex flex-col justify-center items-center">
                <h2 className="text-xl font-bold dark:text-slate-200">Conteúdo Inválido</h2>
                <p className="text-slate-500 dark:text-slate-400 mt-2">O item que você está tentando ver não pode ser exibido aqui.</p>
                <button onClick={goBack} className="mt-6 bg-indigo-600 text-white font-bold py-2 px-6 rounded-lg">
                    Voltar
                </button>
            </motion.div>
        );
    }
    
    const isWorkoutWithSteps = item && 'category' in item && item.category === 'workout' && item.steps && item.steps.length > 0;
    const isRecipe = item && 'category' in item && item.category === 'nutrition';

    const renderRecipeContent = (content: string) => {
        return content.split('\n').map((line, i) => {
            if (line.startsWith('**') && line.endsWith('**')) {
                return <h2 key={i} className="text-xl font-bold text-slate-800 dark:text-slate-200 mt-6 mb-2">{line.replace(/\*\*/g, '')}</h2>
            }
            if (line.trim() === '') return null; // Não renderiza parágrafos vazios de linhas em branco
            return <p key={i} className="text-slate-600 dark:text-slate-300 my-2 leading-relaxed">{line}</p>
        });
    };

    return (
        <motion.div
            {...motionProps}
            className="h-full flex flex-col"
        >
            <header className="flex items-center p-4 border-b border-slate-200 dark:border-slate-700 flex-shrink-0">
                <button onClick={goBack} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800" aria-label="Voltar">
                    <ArrowLeftIcon className="h-6 w-6 text-slate-500 dark:text-slate-400" />
                </button>
                <h1 className="text-lg font-bold text-slate-800 dark:text-slate-200 truncate mx-auto px-4">{item.title}</h1>
            </header>
            <main className="flex-grow overflow-y-auto pb-6">
                 {isWorkoutWithSteps ? (
                    <div className="p-6 space-y-6">
                        {'videoUrl' in item && item.videoUrl && (
                            <div className="h-56 rounded-2xl overflow-hidden shadow-lg -mx-6 -mt-6">
                                <iframe 
                                    src={item.videoUrl}
                                    title={item.title}
                                    frameBorder="0" 
                                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                    allowFullScreen
                                    className="w-full h-full"
                                ></iframe>
                            </div>
                        )}
                        <div>
                            <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-1">{item.title}</h1>
                            {'description' in item && <p className="text-slate-500 dark:text-slate-400 mb-6">{item.description}</p>}
                            {'steps' in item && item.steps && (
                                <div className="space-y-3">
                                    {item.steps.map((step, index) => {
                                        const Icon = step.type === 'exercise' ? DumbbellIcon : ClockIcon;
                                        return (
                                            <div key={index} className="flex items-center space-x-4 p-4 bg-slate-100 dark:bg-slate-800 rounded-2xl">
                                                <div className="bg-white dark:bg-slate-700 p-3 rounded-full shadow-sm">
                                                    <Icon className="h-6 w-6 text-indigo-500" />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="font-bold text-slate-800 dark:text-slate-200">{step.name}</p>
                                                    <p className="text-sm text-slate-500 dark:text-slate-400">{step.details}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <>
                        {'videoUrl' in item && item.videoUrl && !isRecipe && (
                            <div className="aspect-w-16 aspect-h-9">
                                <iframe 
                                    src={item.videoUrl}
                                    title={item.title}
                                    frameBorder="0" 
                                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                    allowFullScreen
                                    className="w-full h-full"
                                ></iframe>
                            </div>
                        )}
                        {'imageUrl' in item && item.imageUrl && !('videoUrl' in item && item.videoUrl) && (
                            <img src={item.imageUrl} alt={item.title} className="w-full h-48 object-cover" />
                        )}
                        <div className="p-6 space-y-4">
                             {isRecipe && 'videoUrl' in item && item.videoUrl && (
                                <div className="h-48 rounded-2xl overflow-hidden shadow-lg">
                                    <iframe 
                                        src={item.videoUrl}
                                        title={item.title}
                                        frameBorder="0" 
                                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                        allowFullScreen
                                        className="w-full h-full"
                                    ></iframe>
                                </div>
                            )}
                             <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-200 flex items-center gap-3">
                                {isRecipe && 'Icon' in item && <item.Icon className="h-8 w-8 text-slate-700 dark:text-slate-300" />}
                                <span>{item.title}</span>
                            </h1>
                            {isRecipe ? (
                                <div>{renderRecipeContent(item.content)}</div>
                            ) : (
                                <p className="text-base whitespace-pre-line text-slate-600 dark:text-slate-300 leading-relaxed">
                                    {item.content}
                                </p>
                            )}
                        </div>
                    </>
                )}
            </main>
        </motion.div>
    );
};

export default DetailPage;
