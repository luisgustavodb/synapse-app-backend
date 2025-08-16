

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { FeedPost } from '../types';
import { XIcon } from './icons/XIcon';
import { HeartIcon } from './icons/HeartIcon';
import { FilledHeartIcon } from './icons/FilledHeartIcon';
import { CommentIcon } from './icons/CommentIcon';
import { ShareIcon } from './icons/ShareIcon';
import { BookmarkIcon } from './icons/BookmarkIcon';
import { FilledBookmarkIcon } from './icons/FilledBookmarkIcon';
import { ChevronLeftIcon } from './icons/ChevronLeftIcon';
import { ChevronRightIcon } from './icons/ChevronRightIcon';
import { useUser } from '../context/UserContext';
import { TrashIcon } from './icons/TrashIcon';

interface PostDetailViewProps {
    initialPost: FeedPost;
    allPosts: FeedPost[];
    goBack: () => void;
}

const PostDetailView: React.FC<PostDetailViewProps> = ({ initialPost, allPosts, goBack }) => {
    const [currentIndex, setCurrentIndex] = useState(() => allPosts.findIndex(p => p.id === initialPost.id));
    const [direction, setDirection] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    
    const { user, updateFeed } = useUser();
    const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    
    const currentPost = allPosts[currentIndex];

    const isOwner = user && currentPost && user.handle === currentPost.author.handle;
    
    const paginate = (newDirection: number) => {
        setDirection(newDirection);
        setCurrentIndex(prevIndex => {
            const nextIndex = prevIndex + newDirection;
            if (nextIndex < 0) return allPosts.length - 1;
            if (nextIndex >= allPosts.length) return 0;
            return nextIndex;
        });
    };

    const handleConfirmDelete = async () => {
        if (!currentPost || isDeleting) return;
        setIsDeleting(true);
        try {
            const response = await fetch("https://pleased-sharply-cheetah.ngrok-free.app/webhook/0cd20b6f-cfd4-49be-a092-4a2a0f5405dd", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'ngrok-skip-browser-warning': 'true',
                },
                body: JSON.stringify({ id: currentPost.id }),
            });

            if (!response.ok) {
                throw new Error('Falha ao excluir a publicação.');
            }

            updateFeed({ type: 'remove', postId: currentPost.id });
            
            goBack();

        } catch (error) {
            console.error('Erro ao excluir:', error);
            // Optionally show an error toast to the user
            setIsDeleteConfirmOpen(false);
        } finally {
            setIsDeleting(false);
        }
    };
    
    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 100 : -100,
            opacity: 0,
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 100 : -100,
            opacity: 0,
        }),
    };
    
    if (!currentPost) {
        return (
            <div className="h-full flex flex-col bg-slate-950 text-white">
                <header className="flex items-center p-4">
                     <button onClick={goBack} className="p-2 -ml-2 rounded-full hover:bg-white/20" aria-label="Voltar">
                        <XIcon className="h-6 w-6" />
                    </button>
                </header>
                <div className="flex-grow flex items-center justify-center">Post não encontrado.</div>
            </div>
        )
    }

    const { author, imageUrl, videoUrl, caption, likes, comments } = currentPost;
    const isAvatarUrl = author.avatar.startsWith('http') || author.avatar.startsWith('data:');

    return (
        <div className="h-full flex flex-col bg-slate-950 text-white">
            <header className="flex items-center p-4 justify-between flex-shrink-0">
                 <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-full bg-slate-700 flex items-center justify-center text-xl overflow-hidden">
                       {isAvatarUrl ? (
                            <img src={author.avatar} alt={author.name} className="w-full h-full object-cover"/>
                        ) : (
                            author.avatar
                        )}
                    </div>
                    <div>
                        <p className="font-bold text-sm">{author.name}</p>
                        <p className="text-xs text-slate-400">{author.handle}</p>
                    </div>
                </div>
                 <div className="flex items-center space-x-2">
                    {isOwner && (
                        <button onClick={() => setIsDeleteConfirmOpen(true)} className="p-2 rounded-full hover:bg-white/20" aria-label="Excluir">
                            <TrashIcon className="h-5 w-5 text-red-400 hover:text-red-500 transition-colors" />
                        </button>
                    )}
                    <button onClick={goBack} className="p-2 rounded-full hover:bg-white/20" aria-label="Fechar">
                        <XIcon className="h-6 w-6" />
                    </button>
                </div>
            </header>

            <main className="flex-grow flex items-center justify-center relative min-h-0">
                <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                        key={currentIndex}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 }
                        }}
                        className="absolute w-full h-full flex items-center justify-center"
                    >
                        {videoUrl ? (
                             <video
                                src={videoUrl}
                                controls
                                className="max-h-full max-w-full object-contain"
                            />
                        ) : imageUrl ? (
                            <img
                                src={imageUrl}
                                alt={caption}
                                className="max-h-full max-w-full object-contain"
                            />
                        ) : null}
                    </motion.div>
                </AnimatePresence>
                
                {currentIndex > 0 && (
                     <button 
                        onClick={() => paginate(-1)}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-slate-900/40 p-1.5 rounded-full text-white hover:bg-slate-900/70 transition-colors z-10"
                        aria-label="Post anterior"
                    >
                        <ChevronLeftIcon className="h-6 w-6" />
                    </button>
                )}
                {currentIndex < allPosts.length - 1 && (
                    <button 
                        onClick={() => paginate(1)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-slate-900/40 p-1.5 rounded-full text-white hover:bg-slate-900/70 transition-colors z-10"
                        aria-label="Próximo post"
                    >
                        <ChevronRightIcon className="h-6 w-6" />
                    </button>
                )}
            </main>
            
            <footer className="flex-shrink-0 p-4 space-y-3">
                <p className="text-sm text-slate-300 break-words">
                    <span className="font-bold text-white mr-1.5">{author.handle}</span>
                    {caption}
                </p>
                
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-5">
                         <button onClick={() => setIsLiked(!isLiked)} aria-label="Curtir">
                            {isLiked ? <FilledHeartIcon className="w-7 h-7 text-pink-500" /> : <HeartIcon className="w-7 h-7 hover:text-pink-500" />}
                        </button>
                         <button aria-label="Comentar">
                            <CommentIcon className="w-7 h-7 hover:text-blue-400" />
                        </button>
                         <button aria-label="Compartilhar">
                            <ShareIcon className="w-7 h-7 hover:text-emerald-400" />
                        </button>
                    </div>
                     <button onClick={() => setIsSaved(!isSaved)} aria-label="Salvar">
                        {isSaved ? <FilledBookmarkIcon className="w-7 h-7 text-indigo-400" /> : <BookmarkIcon className="w-7 h-7 hover:text-indigo-400" />}
                    </button>
                </div>
                 <p className="text-xs text-slate-400">
                    {likes.toLocaleString('pt-BR')} curtidas
                 </p>
            </footer>

            <AnimatePresence>
                {isDeleteConfirmOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-slate-900/70 z-50 flex items-center justify-center p-4"
                        onClick={() => setIsDeleteConfirmOpen(false)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white dark:bg-slate-800 rounded-2xl p-6 w-full max-w-sm text-center shadow-lg"
                        >
                            <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200">Excluir Publicação?</h2>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 mb-6">
                                Tem certeza de que deseja excluir esta publicação? Esta ação não pode ser desfeita.
                            </p>
                            <div className="flex space-x-3">
                                <button
                                    onClick={() => setIsDeleteConfirmOpen(false)}
                                    className="flex-1 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 font-bold py-2.5 px-4 rounded-lg transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={handleConfirmDelete}
                                    disabled={isDeleting}
                                    className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-2.5 px-4 rounded-lg transition-colors disabled:opacity-50"
                                >
                                    {isDeleting ? 'Excluindo...' : 'Sim, Excluir'}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default PostDetailView;
