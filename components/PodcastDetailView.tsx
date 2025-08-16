
import React, { useState, useRef } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { motion } from 'framer-motion';
import { podcastComments } from '../constants';
import type { PodcastItem, Comment } from '../types';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { ThumbsUpIcon } from './icons/ThumbsUpIcon';
import { ThumbsDownIcon } from './icons/ThumbsDownIcon';
import { ShareIcon } from './icons/ShareIcon';
import { DownloadIcon } from './icons/DownloadIcon';
import { PlayIcon } from './icons/PlayIcon';
import { PauseIcon } from './icons/PauseIcon';
import { CommentIcon } from './icons/CommentIcon';
import { SendIcon } from './icons/SendIcon';
import { useUser } from '../context/UserContext';


interface PodcastDetailViewProps {
    podcast: PodcastItem;
    goBack: () => void;
}

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

export const PodcastDetailView: React.FC<PodcastDetailViewProps> = ({ podcast, goBack }) => {
    const { user } = useUser();
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [comments, setComments] = useState(podcastComments);
    const [newComment, setNewComment] = useState("");
    const audioRef = useRef<HTMLAudioElement>(null);

    const handlePlayPause = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleTimeUpdate = () => {
        if (audioRef.current && audioRef.current.duration) {
            const newProgress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
            setProgress(newProgress);
            setCurrentTime(audioRef.current.currentTime);
        }
    };
    
    const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
        if(audioRef.current && audioRef.current.duration) {
            const progressBar = e.currentTarget;
            const clickPosition = e.clientX - progressBar.getBoundingClientRect().left;
            const newTime = (clickPosition / progressBar.offsetWidth) * audioRef.current.duration;
            audioRef.current.currentTime = newTime;
        }
    }
    
    const handleAddComment = (e: React.FormEvent) => {
        e.preventDefault();
        if(!newComment.trim()) return;
        const newCommentObj: Comment = {
            id: crypto.randomUUID(),
            user: { name: user.name, avatarUrl: user.avatarUrl },
            text: newComment,
            timestamp: "agora"
        };
        setComments([newCommentObj, ...comments]);
        setNewComment("");
    }
    
    const motionProps = {
        initial: "initial",
        animate: "in",
        exit: "out",
        variants: pageVariants,
        transition: pageTransition,
    };
    
    const formatTime = (time: number) => new Date(time * 1000).toISOString().substr(14, 5);


    return (
        <motion.div
            {...motionProps}
            className="h-full flex flex-col bg-slate-50 dark:bg-slate-950"
        >
            <header className="flex items-center p-4 border-b border-slate-200 dark:border-slate-700 flex-shrink-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-10">
                <button onClick={goBack} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800" aria-label="Voltar">
                    <ArrowLeftIcon className="h-6 w-6 text-slate-500 dark:text-slate-400" />
                </button>
                <h1 className="text-lg font-bold text-slate-800 dark:text-slate-200 truncate mx-auto pr-8">{podcast.title}</h1>
            </header>
            <main className="flex-grow overflow-y-auto p-6 space-y-6">
                <section className="flex flex-col items-center text-center space-y-4">
                     <motion.div 
                        layoutId={`podcast-image-${podcast.id}`}
                        className="w-48 h-48 rounded-2xl object-cover shadow-2xl shadow-slate-400/50 dark:shadow-slate-950/50 overflow-hidden" 
                     >
                        <img
                            src={podcast.imageUrl}
                            alt={podcast.title}
                            className="w-full h-full object-cover"
                        />
                     </motion.div>
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">{podcast.title}</h2>
                        <ReactRouterDOM.Link to={`/podcasts/${podcast.podcastCategoryId}`} className="text-md text-indigo-500 dark:text-indigo-400 font-semibold hover:underline">
                            {podcast.creator}
                        </ReactRouterDOM.Link>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{podcast.description}</p>
                </section>
                
                <section className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-lg space-y-3">
                    <div className="flex items-center space-x-4">
                        <button onClick={handlePlayPause} className="bg-indigo-600 text-white rounded-full p-4 hover:bg-indigo-700 transition-transform active:scale-95">
                           {isPlaying ? <PauseIcon className="w-6 h-6" /> : <PlayIcon className="w-6 h-6" />}
                        </button>
                        <div className="flex-grow space-y-1">
                             <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5 cursor-pointer" onClick={handleSeek}>
                                <div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: `${progress}%` }}></div>
                             </div>
                             <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 font-mono">
                                 <span>{formatTime(currentTime)}</span>
                                 <span>{podcast.duration}</span>
                             </div>
                        </div>
                    </div>
                </section>
                
                <section className="flex items-center justify-around text-slate-500 dark:text-slate-400">
                    <button className="flex flex-col items-center space-y-1 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                        <ThumbsUpIcon className="w-6 h-6"/>
                        <span className="text-xs font-semibold">Gostei</span>
                    </button>
                     <button className="flex flex-col items-center space-y-1 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                        <ThumbsDownIcon className="w-6 h-6"/>
                        <span className="text-xs font-semibold">Não Gostei</span>
                    </button>
                    <button className="flex flex-col items-center space-y-1 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                        <ShareIcon className="w-6 h-6"/>
                        <span className="text-xs font-semibold">Compartilhar</span>
                    </button>
                     <button className="flex flex-col items-center space-y-1 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                        <DownloadIcon className="w-6 h-6"/>
                        <span className="text-xs font-semibold">Baixar</span>
                    </button>
                </section>
                
                <section>
                    <div className="flex items-center space-x-2 mb-4">
                        <CommentIcon className="w-5 h-5 text-slate-500 dark:text-slate-400"/>
                        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">Comentários ({comments.length})</h3>
                    </div>
                    <form onSubmit={handleAddComment} className="flex items-center space-x-2 mb-4">
                        <div className="w-9 h-9 rounded-full overflow-hidden">
                           <img src={user.avatarUrl} alt="Seu avatar" className="w-full h-full object-cover"/>
                        </div>
                        <input 
                            type="text" 
                            placeholder="Adicione um comentário..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            className="flex-grow bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-full py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-slate-800 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm"
                        />
                        <button type="submit" disabled={!newComment.trim()} className="bg-indigo-600 text-white rounded-full p-2.5 disabled:opacity-50 transition-colors">
                            <SendIcon className="w-5 h-5"/>
                        </button>
                    </form>
                    <div className="space-y-4">
                        {comments.map(comment => (
                            <div key={comment.id} className="flex items-start space-x-3">
                                <div className="w-9 h-9 rounded-full overflow-hidden">
                                  <img src={comment.user.avatarUrl} alt={comment.user.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-xl flex-grow">
                                    <p className="font-semibold text-sm text-slate-800 dark:text-slate-200">{comment.user.name} <span className="font-normal text-xs text-slate-500 dark:text-slate-400 ml-1">{comment.timestamp}</span></p>
                                    <p className="text-sm text-slate-600 dark:text-slate-300">{comment.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <audio
                    ref={audioRef}
                    src={podcast.audioUrl}
                    onTimeUpdate={handleTimeUpdate}
                    onEnded={() => setIsPlaying(false)}
                />
            </main>
        </motion.div>
    );
};
