
import React from 'react';
import type { StoryHighlight } from '../types';
import { PlusIcon } from './icons/PlusIcon';

interface HighlightCardProps {
    highlight?: StoryHighlight;
    isAddNew?: boolean;
    onClick: () => void;
}

const HighlightCard: React.FC<HighlightCardProps> = ({ highlight, isAddNew = false, onClick }) => {
    if (isAddNew) {
        return (
             <button
                onClick={onClick}
                className="w-24 h-36 flex-shrink-0 flex flex-col items-center justify-center space-y-2 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-600 bg-slate-100/70 dark:bg-slate-800/70 hover:bg-slate-200/70 dark:hover:bg-slate-700/70 transition-colors text-slate-500 dark:text-slate-400"
            >
                <PlusIcon className="w-8 h-8"/>
                <p className="text-xs font-semibold">Novo</p>
            </button>
        );
    }
    
    if (!highlight) return null;

    return (
        <button onClick={onClick} className="w-24 h-36 flex-shrink-0 relative rounded-xl overflow-hidden group shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <img 
                src={highlight.coverUrl}
                alt={highlight.label} 
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent"></div>
            <p className="absolute bottom-2 left-2 right-2 text-white text-xs font-bold truncate [text-shadow:0_1px_2px_rgba(0,0,0,0.5)]">{highlight.label}</p>
        </button>
    );
};

export default HighlightCard;
