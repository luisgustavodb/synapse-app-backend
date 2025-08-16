import React from 'react';
import type { Macro } from '../types';

interface MacroProgressBarProps {
    macro: Macro;
}

const MacroProgressBar: React.FC<MacroProgressBarProps> = ({ macro }) => {
    const percentage = macro.goal > 0 ? Math.min(100, (macro.consumed / macro.goal) * 100) : 0;
    const remaining = Math.max(0, macro.goal - macro.consumed);

    return (
        <div className="bg-slate-50 dark:bg-slate-900/50 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-2">{macro.name}</h3>
            
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                <div
                    className={`${macro.color} h-2 rounded-full`}
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>

            <div className="mt-2 grid grid-cols-3 gap-2 text-center text-xs">
                <div>
                    <p className="text-slate-500 dark:text-slate-400">Consumido</p>
                    <p className="font-bold text-sm text-slate-700 dark:text-slate-300">{macro.consumed.toLocaleString()}g</p>
                </div>
                 <div>
                    <p className="text-slate-500 dark:text-slate-400">Meta</p>
                    <p className="font-bold text-sm text-slate-700 dark:text-slate-300">{macro.goal.toLocaleString()}g</p>
                </div>
                <div>
                    <p className="text-slate-500 dark:text-slate-400">Restante</p>
                    <p className="font-bold text-sm text-green-600 dark:text-green-500">{remaining.toLocaleString()}g</p>
                </div>
            </div>
        </div>
    );
};

export default MacroProgressBar;