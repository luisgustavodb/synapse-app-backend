
import React from 'react';
import type { FeedPost } from '../types';
import { ChevronRightIcon } from './icons/ChevronRightIcon';

const AdFeedCard: React.FC<{ post: FeedPost }> = ({ post }) => {
    const isAvatarUrl = post.author.avatar.startsWith('http');

    return (
        <div className="flex flex-col border-b border-slate-200 dark:border-slate-800 pb-4 bg-slate-50/50 dark:bg-slate-800/20">
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
                    <p className="font-bold text-slate-800 dark:text-slate-200 text-sm">{post.author.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Patrocinado</p>
                </div>
            </div>

            {/* Post Image */}
            <div>
                <img src={post.imageUrl} alt={post.caption.substring(0, 50)} className="w-full h-auto max-h-[500px] object-cover" />
            </div>

            {/* Post Content */}
            <div className="p-4">
                 <p className="text-sm text-slate-600 dark:text-slate-300 break-words">
                    {post.caption}
                </p>
            </div>
            
             {/* Action Bar */}
            <div className="px-4 pb-2">
                 <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2.5 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors">
                    <span>Saiba Mais</span>
                    <ChevronRightIcon className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

export default AdFeedCard;
