
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { User } from '../types';
import { PencilIcon } from './icons/PencilIcon';
import { ShareIcon } from './icons/ShareIcon';

interface UserInfoCardProps {
    user: User;
    postCount: number;
    hasStories: boolean;
    onAvatarClick: () => void;
    onFollowersClick: () => void;
    onFollowingClick: () => void;
}

const Stat: React.FC<{ value: string | number; label: string }> = ({ value, label }) => (
    <div className="text-center">
        <p className="text-lg font-bold text-slate-800 dark:text-slate-200">{value}</p>
        <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
    </div>
);

const UserInfoCard: React.FC<UserInfoCardProps> = ({ user, postCount, hasStories, onAvatarClick, onFollowersClick, onFollowingClick }) => {
    const navigate = useNavigate();

    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-5">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                    <button 
                        onClick={onAvatarClick}
                        className={`relative flex-shrink-0 p-1 rounded-full bg-gradient-to-tr ${hasStories ? 'from-yellow-400 via-red-500 to-purple-500' : 'from-slate-200 to-slate-300'} disabled:cursor-default`}
                        disabled={!hasStories}
                        aria-label="Ver story"
                    >
                        <div className="p-0.5 bg-white dark:bg-slate-800 rounded-full">
                            <img 
                                src={user.avatarUrl} 
                                alt={user.name} 
                                className="w-16 h-16 rounded-full object-cover" 
                            />
                        </div>
                    </button>
                    <div>
                        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">{user.name}</h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{user.handle}</p>
                    </div>
                </div>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-300 whitespace-pre-line mb-4">{user.bio}</p>

            <div className="grid grid-cols-3 gap-2 border-t border-b border-slate-200 dark:border-slate-700 py-3">
                <div className="p-1"><Stat value={postCount} label="Publicações" /></div>
                <button 
                    onClick={onFollowersClick} 
                    className="rounded-lg p-1 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                >
                    <Stat value={user.followers.toLocaleString()} label="Seguidores" />
                </button>
                <button 
                    onClick={onFollowingClick}
                    className="rounded-lg p-1 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                >
                    <Stat value={user.following} label="Seguindo" />
                </button>
            </div>
            
            <div className="flex items-center space-x-2 mt-4">
                <button 
                    onClick={() => navigate('/account/personal-info')}
                    className="flex-1 bg-slate-800 dark:bg-slate-200 hover:bg-slate-700 dark:hover:bg-slate-300 text-white dark:text-slate-900 text-sm font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                    <PencilIcon className="h-4 w-4" />
                    <span>Editar Perfil</span>
                </button>
                <button className="flex-1 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 text-sm font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2">
                    <ShareIcon className="h-4 w-4" />
                    <span>Compartilhar</span>
                </button>
            </div>
        </div>
    );
};

export default UserInfoCard;
