import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import type { Article } from '../types';
import PixabayImage from './PixabayImage';

interface ArticleListCardProps {
    article: Article;
}

const ArticleListCard: React.FC<ArticleListCardProps> = ({ article }) => {
    const { id, type, title, description, imageUrl } = article;

    const typeStyles: Record<Article['type'], string> = {
        ARTICLE: 'bg-orange-100 text-orange-600 dark:bg-orange-900/50 dark:text-orange-400',
        TIP: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400',
        CURIOSITY: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/50 dark:text-yellow-400',
    };
    
    const typeLabels: Record<Article['type'], string> = {
        ARTICLE: 'Artigo',
        TIP: 'Dica',
        CURIOSITY: 'Curiosidade',
    };

    return (
        <ReactRouterDOM.Link 
            to={`/detail/article/${id}`} 
            className="block bg-white dark:bg-slate-800 rounded-2xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group"
        >
            <div className="h-40 relative">
                <PixabayImage 
                    searchQuery={title}
                    alt={title}
                    className="w-full h-full object-cover"
                    minW={300}
                    minH={160}
                />
                <div 
                    className={`absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full ${typeStyles[type]}`}
                >
                    {typeLabels[type]}
                </div>
            </div>
            <div className="p-4">
                <h3 className="font-bold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate">{title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">{description}</p>
            </div>
        </ReactRouterDOM.Link>
    );
};

export default ArticleListCard;
