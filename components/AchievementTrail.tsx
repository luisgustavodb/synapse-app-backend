import React from 'react';
import type { Achievement } from '../types';
import { TrophyIcon } from './icons/TrophyIcon';

interface AchievementTrailProps {
    achievements: Achievement[];
    onAchievementClick: (achievement: Achievement) => void;
}

const AchievementTrail: React.FC<AchievementTrailProps> = ({ achievements, onAchievementClick }) => {
    return (
        <div className="flow-root">
            <ul className="-mb-8">
                {achievements.map((achievement, index) => {
                    const isLast = index === achievements.length - 1;
                    const nextAchievement = isLast ? null : achievements[index + 1];
                    const isPathActive = achievement.unlocked && (nextAchievement?.unlocked ?? false);

                    return (
                        <li key={achievement.id}>
                            <div className="relative pb-10">
                                {!isLast && (
                                    <span
                                        className={`absolute left-5 top-5 -ml-px h-full w-1 ${
                                            isPathActive ? 'bg-amber-400' : 'bg-slate-200'
                                        } transition-colors duration-500`}
                                        aria-hidden="true"
                                    />
                                )}
                                <div className="relative flex items-start space-x-4">
                                    <button
                                        onClick={() => onAchievementClick(achievement)}
                                        className={`relative z-10 h-10 w-10 rounded-full flex items-center justify-center ring-4 ${
                                            achievement.unlocked ? 'bg-amber-400 ring-white' : 'bg-slate-200 ring-white'
                                        } hover:ring-slate-100 transition-all duration-200`}
                                        aria-label={`Ver detalhes da conquista: ${achievement.title}`}
                                    >
                                        <TrophyIcon
                                            className={`h-6 w-6 ${
                                                achievement.unlocked ? 'text-white' : 'text-slate-500'
                                            }`}
                                        />
                                    </button>
                                    <div className="min-w-0 flex-1 pt-1.5">
                                        <p className={`text-sm font-semibold ${achievement.unlocked ? 'text-slate-800' : 'text-slate-500'}`}>{achievement.title}</p>
                                    </div>
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default AchievementTrail;
