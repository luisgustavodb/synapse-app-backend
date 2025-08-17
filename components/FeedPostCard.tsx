

import React, { useState, useEffect, useRef } from 'react';
import type { FeedPost } from '../types';
import { HeartIcon } from './icons/HeartIcon';
import { CommentIcon } from './icons/CommentIcon';
import { ShareIcon } from './icons/ShareIcon';
import { BookmarkIcon } from './icons/BookmarkIcon';
import { FilledHeartIcon } from './icons/FilledHeartIcon';
import { FilledBookmarkIcon } from './icons/FilledBookmarkIcon';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '../context/UserContext';
import { VolumeUpIcon } from './icons/VolumeUpIcon';
import { VolumeOffIcon } from './icons/VolumeOffIcon';
import { PlayIcon } from './icons/PlayIcon';
import { PauseIcon } from './icons/PauseIcon';


const LIKE_WEBHOOK_URL = "https://pleased-sharply-cheetah.ngrok-free.app/webhook/e696ff80-9a41-478f-81ee-9bcb4ad83896";

const FeedPostCard: React.FC<{ post: FeedPost }> = ({ post }) => {
    const { user, togglePostLike } = useUser();
    const videoRef = useRef<HTMLVideoElement>(null);
    const controlsTimeout = useRef<number | null>(null);

    const [isSaved, setIsSaved] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [showHeartAnimation, setShowHeartAnimation] = useState(false);
    
    // Video Controls State
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const [progress, setProgress] = useState(0);
    const [showControls, setShowControls] = useState(false);
    const [centerIcon, setCenterIcon] = useState<{ key: number; type: 'play' | 'pause' } | null>(null);

    useEffect(() => {
        const videoElement = videoRef.current;
        if (!videoElement) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    document.querySelectorAll('video').forEach(vid => {
                        if (vid !== videoElement) vid.pause();
                    });
                    videoElement.play().catch(error => console.error("Video play failed:", error));
                } else {
                    videoElement.pause();
                }
            },
            { threshold: 0.7 }
        );

        observer.observe(videoElement);
        return () => {
            if (videoElement) observer.unobserve(videoElement);
        };
    }, [post.videoUrl]);

    const captionLimit = 100;
    const isLongCaption = post.caption.length > captionLimit;

    const sendLikeWebhook = async (likeAction: number) => {
        if (!user) {
            console.error("Usuário não logado, não é possível enviar o like.");
            return;
        }

        const payload = {
            'id do post': post.id,
            'username': user.handle.startsWith('@') ? user.handle.substring(1) : user.handle,
            'curtidas': likeAction,
        };

        try {
            const response = await fetch(LIKE_WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'ngrok-skip-browser-warning': 'true' },
                body: JSON.stringify(payload),
            });
            if (!response.ok) throw new Error(`O webhook falhou com o status: ${response.status}`);
        } catch (error) {
            console.error("Erro ao enviar o like para o webhook:", error);
        }
    };

    const handleLikeClick = () => {
        // If it's currently liked, the action is to unlike (-1).
        // If it's not liked, the action is to like (1).
        const likeAction = post.isLikedByCurrentUser ? -1 : 1; 

        // Update global state first for immediate UI feedback.
        togglePostLike(post.id);

        // Then send the update to the backend.
        sendLikeWebhook(likeAction);
    };

    const handleDoubleClickLike = () => {
        if (!post.isLikedByCurrentUser) {
            handleLikeClick();
        }
        setShowHeartAnimation(true);
        setTimeout(() => setShowHeartAnimation(false), 800);
    };

    // Video Controls Handlers
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleTimeUpdate = () => {
        if (!videoRef.current || !videoRef.current.duration) return;
        const newProgress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
        setProgress(newProgress);
    };

    const handleVideoClick = () => {
        const video = videoRef.current;
        if (!video) return;
        if (video.paused) {
            video.play();
            setCenterIcon({ key: Date.now(), type: 'play' });
        } else {
            video.pause();
            setCenterIcon({ key: Date.now(), type: 'pause' });
        }
    };

    useEffect(() => {
        if (centerIcon) {
            const timer = setTimeout(() => setCenterIcon(null), 600);
            return () => clearTimeout(timer);
        }
    }, [centerIcon]);

    const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
        const video = videoRef.current;
        if (!video || !video.duration) return;
        const progressBar = e.currentTarget;
        const rect = progressBar.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percent = x / rect.width;
        video.currentTime = percent * video.duration;
    };

    const handlePointerMove = () => {
        setShowControls(true);
        if (controlsTimeout.current) clearTimeout(controlsTimeout.current);
        controlsTimeout.current = window.setTimeout(() => {
            if (videoRef.current && !videoRef.current.paused) setShowControls(false);
        }, 2500);
    };

    const handlePointerLeave = () => {
        if (controlsTimeout.current) clearTimeout(controlsTimeout.current);
        if (isPlaying) setShowControls(false);
    };

    const isAvatarUrl = post.author.avatar.startsWith('http') || post.author.avatar.startsWith('data:');

    return (
        <div className="flex flex-col border-b border-slate-200 dark:border-slate-800 pb-4">
            <div className="flex items-center p-4 space-x-3">
                <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xl overflow-hidden">
                   {isAvatarUrl ? <img src={post.author.avatar} alt={post.author.name} className="w-full h-full object-cover" /> : post.author.avatar}
                </div>
                <div>
                    <p className="font-bold text-slate-800 dark:text-slate-200 text-sm">{post.author.handle}</p>
                </div>
            </div>

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

                {post.videoUrl ? (
                    <div className="relative" onPointerMove={handlePointerMove} onPointerLeave={handlePointerLeave}>
                        <video
                            ref={videoRef}
                            onClick={handleVideoClick}
                            onPlay={handlePlay}
                            onPause={handlePause}
                            onTimeUpdate={handleTimeUpdate}
                            src={post.videoUrl}
                            loop
                            muted={isMuted}
                            playsInline
                            className="w-full h-auto max-h-[600px] object-cover"
                        />
                        <AnimatePresence>
                            {centerIcon && (
                                <motion.div
                                    key={centerIcon.key}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 1.2 }}
                                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                                >
                                    <div className="bg-black/50 p-4 rounded-full">
                                        {centerIcon.type === 'play' ? <PlayIcon className="w-8 h-8 text-white" fill="white" /> : <PauseIcon className="w-8 h-8 text-white" />}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <AnimatePresence>
                            {(showControls || !isPlaying) && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent"
                                >
                                    <div className="flex items-center space-x-3">
                                        <div onClick={handleSeek} className="w-full h-2 bg-white/30 rounded-full cursor-pointer group flex items-center">
                                            <div style={{ width: `${progress}%` }} className="h-full bg-indigo-500 rounded-full relative">
                                                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-200" style={{ transform: 'translateX(50%)' }} />
                                            </div>
                                        </div>
                                        <button onClick={(e) => { e.stopPropagation(); setIsMuted(!isMuted); }} className="text-white" aria-label={isMuted ? "Ativar som" : "Desativar som"}>
                                            {isMuted ? <VolumeOffIcon className="w-5 h-5" /> : <VolumeUpIcon className="w-5 h-5" />}
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ) : post.imageUrl ? (
                    <img src={post.imageUrl} alt={post.caption.substring(0, 50)} className="w-full h-auto max-h-[600px] object-cover" />
                ) : null}
            </div>

            <div className="flex items-center justify-between p-3">
                <div className="flex items-center space-x-4">
                    <button onClick={handleLikeClick} className="transition-transform duration-200 ease-in-out transform active:scale-90" aria-label="Curtir">
                        {post.isLikedByCurrentUser ? <FilledHeartIcon className="w-7 h-7 text-pink-500" /> : <HeartIcon className="w-7 h-7 text-slate-500 dark:text-slate-400 hover:text-pink-500" />}
                    </button>
                    <button className="text-slate-500 dark:text-slate-400 hover:text-blue-500 transition-colors" aria-label="Comentar">
                        <CommentIcon className="w-7 h-7" />
                    </button>
                    <button className="text-slate-500 dark:text-slate-400 hover:text-emerald-500 transition-colors" aria-label="Compartilhar">
                        <ShareIcon className="w-7 h-7" />
                    </button>
                </div>
                <button onClick={() => setIsSaved(!isSaved)} className="transition-transform duration-200 ease-in-out transform active:scale-90" aria-label={isSaved ? "Remover dos salvos" : "Salvar"}>
                    {isSaved ? <FilledBookmarkIcon className="w-7 h-7 text-indigo-500 dark:text-indigo-400" /> : <BookmarkIcon className="w-7 h-7 text-slate-500 dark:text-slate-400 hover:text-indigo-500" />}
                </button>
            </div>

            <div className="px-4 pb-4">
                <p className="font-bold text-sm text-slate-800 dark:text-slate-200">{post.likes.toLocaleString('pt-BR')} curtidas</p>
                <motion.div
                    layout
                    transition={{ layout: { duration: 0.3, ease: [0.4, 0, 0.2, 1] } }}
                >
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
                            <>
                                {post.caption}
                                {isLongCaption && isExpanded && (
                                    <>
                                        {' '}
                                        <button onClick={() => setIsExpanded(false)} className="text-slate-500 dark:text-slate-400 font-semibold hover:text-slate-700 dark:hover:text-slate-300">
                                            ver menos
                                        </button>
                                    </>
                                )}
                            </>
                        )}
                    </p>
                </motion.div>
                 <p className="text-xs text-slate-400 mt-2 hover:underline cursor-pointer">
                    Ver todos os {post.comments.toLocaleString('pt-BR')} comentários
                 </p>
            </div>
        </div>
    );
};

export default FeedPostCard;