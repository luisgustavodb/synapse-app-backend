import React from 'react';
import { Link } from 'react-router-dom';
import type { Article } from '../types';

interface ArticleCardProps {
    article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
    const { id, type, title, description, Icon } = article;

    let bgColor = 'bg-gray-100 dark:bg-gray-800';
    let textColor = 'text-gray-600 dark:text-gray-300';
    let typeLabel: string = type;

    switch (type) {
        case 'ARTICLE':
            bgColor = 'bg-orange-100 dark:bg-orange-900/50';
            textColor = 'text-orange-600 dark:text-orange-400';
            typeLabel = 'Artigo';
            break;
        case 'TIP':
            bgColor = 'bg-emerald-100 dark:bg-emerald-900/50';
            textColor = 'text-emerald-600 dark:text-emerald-400';
            typeLabel = 'Dica';
            break;
        case 'CURIOSITY':
            bgColor = 'bg-yellow-100 dark:bg-yellow-900/50';
            textColor = 'text-yellow-600 dark:text-yellow-400';
            typeLabel = 'Curiosidade';
            break;
    }

    return (
        <Link to={`/detail/article/${id}`} className="p-4 flex items-center space-x-4 transition-colors hover:bg-slate-100/50 dark:hover:bg-slate-800/50 cursor-pointer border-b border-slate-200 dark:border-slate-700">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${bgColor}`}>
                <Icon className={`w-8 h-8 ${textColor}`} />
            </div>
            <div className="flex-1">
                <p className={`text-xs font-bold uppercase ${textColor}`}>{typeLabel}</p>
                <h4 className="text-md font-bold text-slate-800 dark:text-slate-200">{title}</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400">{description}</p>
            </div>
        </Link>
    );
};

export default ArticleCard;