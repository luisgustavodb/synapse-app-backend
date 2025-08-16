
import React from 'react';
import type { Achievement } from '../types';
import { achievementCategoryStyles } from '../constants';

interface AchievementCardProps {
    achievement: Achievement;
}

const AchievementCard: React.FC<AchievementCardProps> = ({ achievement }) => {
    const { title, description, unlocked, Icon, category } = achievement;
    const categoryStyle = achievementCategoryStyles[category];

    const unlockedBg = {
        'Engajamento': 'bg-blue-100 dark:bg-blue-900/50',
        'Saúde Física': 'bg-orange-100 dark:bg-orange-900/50',
        'Saúde Mental': 'bg-purple-100 dark:bg-purple-900/50',
        'Exploração': 'bg-emerald-100 dark:bg-emerald-900/50',
    };
    
    const unlockedColor = {
        'Engajamento': 'text-blue-600 dark:text-blue-300',
        'Saúde Física': 'text-orange-600 dark:text-orange-300',
        'Saúde Mental': 'text-purple-600 dark:text-purple-300',
        'Exploração': 'text-emerald-600 dark:text-emerald-300',
    };


    return (
        <div 
            className={`flex items-center space-x-4 p-4 bg-white dark:bg-slate-800 rounded-xl shadow-sm border-l-4 transition-opacity ${
                unlocked ? categoryStyle.borderColor : 'border-slate-200 dark:border-slate-700'
            } ${!unlocked && 'opacity-70'}`}
        >
            <div 
                className={`flex-shrink-0 p-3 rounded-full transition-colors ${
                    unlocked ? unlockedBg[category] : 'bg-slate-200 dark:bg-slate-700'
                }`}
            >
                <Icon 
                    className={`w-6 h-6 transition-colors ${
                        unlocked ? unlockedColor[category] : 'text-slate-500 dark:text-slate-400'
                    }`} 
                />
            </div>
            <div className="flex-1">
                <h4 className="font-bold text-slate-800 dark:text-slate-200">{title}</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400">{description}</p>
            </div>
        </div>
    );
};

export default AchievementCard;