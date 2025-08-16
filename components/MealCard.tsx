import React from 'react';
import type { Meal } from '../types';
import { PlusCircleIcon } from './icons/PlusCircleIcon';

interface MealCardProps {
    meal: Meal;
}

const MealCard: React.FC<MealCardProps> = ({ meal }) => {
    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-3 flex items-center shadow-sm dark:border dark:border-slate-700">
            <div className="text-3xl w-12 h-12 flex items-center justify-center bg-slate-100 dark:bg-slate-700 rounded-full">
                {meal.icon}
            </div>
            <div className="flex-grow ml-4">
                <p className="font-bold text-slate-800 dark:text-slate-200">{meal.name}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">{`${meal.calories} / ${meal.goal} kcal`}</p>
            </div>
            <button className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors" aria-label={`Adicionar item em ${meal.name}`}>
                <PlusCircleIcon className="h-9 w-9" />
            </button>
        </div>
    );
};

export default MealCard;