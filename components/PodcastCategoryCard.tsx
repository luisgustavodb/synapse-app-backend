
import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { PodcastCategory } from '../types';

interface PodcastCategoryCardProps {
    category: PodcastCategory;
}

const PodcastCategoryCard: React.FC<PodcastCategoryCardProps> = ({ category }) => {
    return (
        <ReactRouterDOM.Link 
            to={`/podcasts/${category.id}`} 
            className={`block aspect-[1/1] rounded-lg relative overflow-hidden group shadow-md transition-shadow duration-300 hover:shadow-xl`}
            style={{ background: category.gradient }}
        >
            <h2 className="text-white text-lg font-bold p-3 absolute top-0 left-0 z-10 [text-shadow:0_1px_2px_rgba(0,0,0,0.4)]">
                {category.title}
            </h2>
            <img
                src={category.imageUrl}
                alt={category.title} 
                className="absolute w-2/3 h-2/3 bottom-0 right-0 object-cover transform rotate-[25deg] translate-x-[10%] translate-y-[5%] transition-transform duration-300 group-hover:scale-110"
            />
        </ReactRouterDOM.Link>
    );
};

export default PodcastCategoryCard;
