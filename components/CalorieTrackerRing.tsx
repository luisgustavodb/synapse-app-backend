import React from 'react';
import type { DailyNutrition } from '../types';

interface CalorieTrackerRingProps {
    nutrition: DailyNutrition;
}

const CalorieTrackerRing: React.FC<CalorieTrackerRingProps> = ({ nutrition }) => {
    const { goal, consumed, burned } = nutrition;
    const budgetRemaining = goal - consumed + burned;

    return (
        <div className="w-full space-y-4">
            <div className="text-center p-4 rounded-2xl bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700">
                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">SALDO DE CALORIAS</p>
                <p className="text-5xl font-bold text-slate-800 dark:text-slate-200 tracking-tighter">{budgetRemaining.toLocaleString()}</p>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">kcal restantes</p>
            </div>
            
            <div className="w-full space-y-2 text-sm text-slate-700 dark:text-slate-300 px-1">
                <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold mb-2 text-center">Cálculo: <span className="font-normal">Meta - Comida + Exercício</span></p>
                <div className="flex justify-between items-center bg-white dark:bg-slate-900/50 p-2.5 rounded-lg border border-slate-200 dark:border-slate-700">
                    <span className="font-semibold">Meta de Calorias</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{goal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center bg-white dark:bg-slate-900/50 p-2.5 rounded-lg border border-slate-200 dark:border-slate-700">
                    <span className="font-semibold">- Comida (Consumido)</span>
                    <span className="font-bold text-red-500">{consumed.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center bg-white dark:bg-slate-900/50 p-2.5 rounded-lg border border-slate-200 dark:border-slate-700">
                    <span className="font-semibold">+ Exercício (Gasto)</span>
                    <span className="font-bold text-green-500">{burned.toLocaleString()}</span>
                </div>
            </div>
        </div>
    );
};

export default CalorieTrackerRing;