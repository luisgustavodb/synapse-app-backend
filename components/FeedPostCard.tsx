

import React, { useState } from 'react';
import type { FeedPost } from '../types';
import { HeartIcon } from './icons/HeartIcon';
import { CommentIcon } from './icons/CommentIcon';
import { ShareIcon } from './icons/ShareIcon';
import { BookmarkIcon } from './icons/BookmarkIcon';
import { FilledHeartIcon } from './icons/FilledHeartIcon';
import { FilledBookmarkIcon } from './icons/FilledBookmarkIcon';
import { motion, AnimatePresence } from 'framer-motion';

const FeedPostCard: React.FC<{ post: FeedPost }> = ({ post }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(post.likes);
    const [isSaved, setIsSaved] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [showHeartAnimation, setShowHeartAnimation] = useState(false);

    const captionLimit = 100;
    const isLongCaption = post.caption.length > captionLimit;

    const handleLikeClick = () => {
        if (isLiked) {
            setLikeCount(likeCount - 1);
        } else {
            setLikeCount(likeCount + 1);
        }
        setIsLiked(!isLiked);
    };

    const handleDoubleClickLike = () => {
        if (!isLiked) {
            setIsLiked(true);
            setLikeCount(likeCount + 1);
        }
        setShowHeartAnimation(true);
        setTimeout(() => setShowHeartAnimation(false), 800);
    };

    const handleSaveClick = () => {
        setIsSaved(!isSaved);
    };

    const isAvatarUrl = post.author.avatar.startsWith('http') || post.author.avatar.startsWith('data:');

    return (
        <div className="flex flex-col border-b border-slate-200 dark:border-slate-800 pb-4">
            {/* Post Header */}
            <div className="flex items-center p-4 space-x-3">
                <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xl overflow-hidden">
                   {isAvatarUrl ? (
                        <img src={post.author.avatar} alt={post.author.name} className="w-full h-full object-cover" />
                    ) : (
                        post.author.avatar
                    )}
                </div>
                <div>
                    <p className="font-bold text-slate-800 dark:text-slate-200 text-sm">{post.author.handle}</p>
                </div>
            </div>

            {/* Post Image */}
            <div onDoubleClick={handleDoubleClickLike} className="cursor-pointer bg-slate-200 dark:bg-slate-800 relative">
                 <AnimatePresence>
                    {showHeartAnimation && (
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 200, damping: 10 } }}
                            exit={{ scale: 1.2, opacity: 0, transition: { duration: 0.3, ease: 'easeOut' } }}
                            className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
                        >
                            <FilledHeartIcon className="w-24 h-24 text-white/90 drop-shadow-lg" />
                        </motion.div>
                    )}
                </AnimatePresence>
                <img src={post.imageUrl} alt={post.caption.substring(0, 50)} className="w-full h-auto max-h-[500px] object-cover" />
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-between p-3">
                <div className="flex items-center space-x-4">
                    <button 
                        onClick={handleLikeClick} 
                        className="transition-transform duration-200 ease-in-out transform active:scale-90" 
                        aria-label="Curtir"
                    >
                        {isLiked ? (
                            <FilledHeartIcon className="w-7 h-7 text-pink-500" />
                        ) : (
                            <HeartIcon className="w-7 h-7 text-slate-500 dark:text-slate-400 hover:text-pink-500" />
                        )}
                    </button>
                    <button className="text-slate-500 dark:text-slate-400 hover:text-blue-500 transition-colors" aria-label="Comentar">
                        <CommentIcon className="w-7 h-7" />
                    </button>
                    <button className="text-slate-500 dark:text-slate-400 hover:text-emerald-500 transition-colors" aria-label="Compartilhar">
                        <ShareIcon className="w-7 h-7" />
                    </button>
                </div>
                <button 
                    onClick={handleSaveClick}
                    className="transition-transform duration-200 ease-in-out transform active:scale-90" 
                    aria-label={isSaved ? "Remover dos salvos" : "Salvar"}
                >
                    {isSaved ? (
                        <FilledBookmarkIcon className="w-7 h-7 text-indigo-500 dark:text-indigo-400" />
                    ) : (
                        <BookmarkIcon className="w-7 h-7 text-slate-500 dark:text-slate-400 hover:text-indigo-500" />
                    )}
                </button>
            </div>

            {/* Post Content */}
            <div className="px-4 pb-4">
                <p className="font-bold text-sm text-slate-800 dark:text-slate-200">{likeCount.toLocaleString('pt-BR')} curtidas</p>
                 <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 break-words whitespace-pre-line">
                    <span className="font-bold text-slate-800 dark:text-slate-200 mr-1">{post.author.handle}</span>
                    {isLongCaption && !isExpanded ? (
                        <>
                            {`${post.caption.substring(0, captionLimit)}... `}
                            <button onClick={() => setIsExpanded(true)} className="text-slate-500 dark:text-slate-400 font-semibold hover:text-slate-700 dark:hover:text-slate-300">
                                ver mais
                            </button>
                        </>
                    ) : (
                        post.caption
                    )}
                </p>
                 <p className="text-xs text-slate-400 mt-2 hover:underline cursor-pointer">
                    Ver todos os {post.comments.toLocaleString('pt-BR')} comentários
                 </p>
            </div>
        </div>
    );
};

export default FeedPostCard;
