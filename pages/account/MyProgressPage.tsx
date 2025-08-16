
import React, { useState, useMemo } from 'react';
import { achievements, achievementCategoryStyles } from '../../constants';
import type { AchievementCategory } from '../../types';
import AchievementCard from '../../components/AchievementCard';

const FilterButton: React.FC<{ label: string; isActive: boolean; onClick: () => void; }> = ({ label, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-colors whitespace-nowrap ${
            isActive ? 'bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-900' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'
        }`}
    >
        {label}
    </button>
);

const MyProgressPage: React.FC = () => {
    const [activeCategoryFilter, setActiveCategoryFilter] = useState<AchievementCategory | null>(null);

    const filteredAchievements = useMemo(() => {
        if (!activeCategoryFilter) {
            return achievements;
        }
        return achievements.filter(a => a.category === activeCategoryFilter);
    }, [activeCategoryFilter]);

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">Conquistas</h2>
            
            <div className="flex space-x-2 overflow-x-auto no-scrollbar pb-2">
                <FilterButton 
                    label="Todas" 
                    isActive={!activeCategoryFilter} 
                    onClick={() => setActiveCategoryFilter(null)} 
                />
                {Object.keys(achievementCategoryStyles).map(cat => (
                    <FilterButton 
                        key={cat} 
                        label={achievementCategoryStyles[cat as AchievementCategory].label} 
                        isActive={activeCategoryFilter === cat} 
                        onClick={() => setActiveCategoryFilter(cat as AchievementCategory)} 
                    />
                ))}
            </div>

            <div className="space-y-3">
                {filteredAchievements.map(achievement => (
                    <AchievementCard key={achievement.id} achievement={achievement} />
                ))}
            </div>
        </div>
    );
};

export default MyProgressPage;