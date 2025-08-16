
import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import type { Article } from '../types';
import { LightBulbIcon } from './icons/LightBulbIcon';

const cardColors = [
    'from-yellow-400 to-orange-500',
    'from-emerald-400 to-teal-500',
    'from-sky-400 to-blue-500',
    'from-indigo-400 to-purple-500',
    'from-pink-400 to-rose-500',
];

const CuriosityCard: React.FC<{ curiosity: Article; index: number }> = ({ curiosity, index }) => {
    const colorClass = cardColors[index % cardColors.length];
    
    return (
        <ReactRouterDOM.Link 
            to={`/detail/article/${curiosity.id}`}
            className="block group rounded-2xl overflow-hidden transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl aspect-[4/5] relative text-white p-5 flex flex-col justify-between"
        >
            <div className={`absolute inset-0 bg-gradient-to-br ${colorClass} transition-transform duration-500 group-hover:scale-105`}></div>
            
            <img
                src={curiosity.imageUrl}
                alt={curiosity.title}
                className="absolute inset-0 w-full h-full object-cover opacity-10 group-hover:opacity-20 transition-opacity"
            />

            <div className="relative z-10">
                <div className="bg-white/20 p-2 rounded-lg inline-block backdrop-blur-sm">
                    <LightBulbIcon className="w-6 h-6" />
                </div>
            </div>
            
            <div className="relative z-10">
                <h3 className="font-bold text-xl leading-tight [text-shadow:0_1px_3px_rgba(0,0,0,0.4)]">{curiosity.title}</h3>
            </div>
        </ReactRouterDOM.Link>
    );
};

export default CuriosityCard;
