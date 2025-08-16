

import React from 'react';
import { Link } from 'react-router-dom';
import type { Article } from '../types';
import { HeartIcon } from './icons/HeartIcon';
import { CommentIcon } from './icons/CommentIcon';
import { ShareIcon } from './icons/ShareIcon';
import { BookmarkIcon } from './icons/BookmarkIcon';

const ArticleFeedCard: React.FC<{ article: Article }> = ({ article }) => {
    return (
        <div className="bg-white rounded-3xl shadow-md overflow-hidden flex flex-col">
            {/* Post Header */}
            <div className="flex items-center p-4 space-x-3">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-xl">
                    🧠
                </div>
                <div>
                    <p className="font-bold text-slate-800 text-sm">Synapse</p>
                    <p className="text-xs text-slate-500">Conteúdo para você</p>
                </div>
            </div>

            {/* Post Image */}
            <Link to={`/detail/article/${article.id}`} className="block">
                <img src={article.imageUrl} alt={article.title} className="w-full h-auto max-h-96 object-cover" />
            </Link>

            {/* Action Bar */}
            <div className="flex items-center justify-between p-3">
                <div className="flex items-center space-x-4">
                    <button className="text-slate-500 hover:text-pink-500 transition-colors" aria-label="Curtir">
                        <HeartIcon className="w-7 h-7" />
                    </button>
                    <button className="text-slate-500 hover:text-blue-500 transition-colors" aria-label="Comentar">
                        <CommentIcon className="w-7 h-7" />
                    </button>
                    <button className="text-slate-500 hover:text-emerald-500 transition-colors" aria-label="Compartilhar">
                        <ShareIcon className="w-7 h-7" />
                    </button>
                </div>
                <button className="text-slate-500 hover:text-indigo-500 transition-colors" aria-label="Salvar">
                    <BookmarkIcon className="w-7 h-7" />
                </button>
            </div>

            {/* Post Content */}
            <div className="px-4 pb-4">
                 