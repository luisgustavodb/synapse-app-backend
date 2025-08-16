
import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import type { PodcastItem } from '../types';

interface PodcastEpisodeCardProps {
    episode: PodcastItem;
}

const PodcastEpisodeCard: React.FC<PodcastEpisodeCardProps> = ({ episode }) => {
    return (
        <ReactRouterDOM.Link to={`/detail/podcast/${episode.id}`} className="block group">
            <div className="aspect-square w-full bg-slate-200 dark:bg-slate-800 rounded-lg overflow-hidden shadow-md transition-shadow duration-300 hover:shadow-lg">
                <img 
                    src={episode.imageUrl}
                    alt={episode.title}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="mt-2">
                <h3 className="font-semibold text-slate-800 dark:text-slate-200 leading-tight text-sm group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">{episode.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">{episode.creator}</p>
            </div>
        </ReactRouterDOM.Link>
    );
};

export default PodcastEpisodeCard;
