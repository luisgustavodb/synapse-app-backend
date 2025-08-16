
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { chatConversations } from '../constants';
import type { ChatConversation } from '../types';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';

const ChatConversationItem: React.FC<{ conversation: ChatConversation }> = ({ conversation }) => {
    const isAvatarUrl = conversation.user.avatar.startsWith('http');

    return (
        <div className="flex items-center p-3 space-x-4 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer mx-2">
            <div className="relative flex-shrink-0">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl overflow-hidden ${!isAvatarUrl ? 'bg-slate-200 dark:bg-slate-700' : ''}`}>
                    {isAvatarUrl ? (
                        <img src={conversation.user.avatar} alt={conversation.user.name} className="w-full h-full object-cover" />
                    ) : (
                        conversation.user.avatar
                    )}
                </div>
            </div>
            <div className="flex-grow overflow-hidden">
                <p className="font-semibold text-slate-800 dark:text-slate-200 truncate">{conversation.user.name}</p>
                <div className="flex items-center text-sm">
                    <p className={`flex-grow truncate ${conversation.isRead ? 'text-slate-500 dark:text-slate-400' : 'text-slate-800 dark:text-slate-200 font-medium'}`}>{conversation.lastMessage}</p>
                    <span className="text-slate-500 dark:text-slate-400 flex-shrink-0 ml-2">· {conversation.timestamp}</span>
                </div>
            </div>
            {!conversation.isRead && (
                 <div className="w-2.5 h-2.5 bg-blue-500 rounded-full flex-shrink-0 self-center"></div>
            )}
        </div>
    );
};


const ChatPanel: React.FC<{ isOpen: boolean; onClose: () => void; }> = ({ isOpen, onClose }) => {
    const motionProps = {
        initial: { x: '100%' },
        animate: { x: 0 },
        exit: { x: '100%' },
        transition: { type: 'tween', ease: 'easeInOut', duration: 0.3 } as const,
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    {...motionProps}
                    className="fixed inset-0 bg-white dark:bg-slate-900 z-50 flex flex-col"
                >
                    <header className="flex items-center p-4 border-b border-slate-200 dark:border-slate-700 flex-shrink-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0">
                        <div className="flex-1 flex justify-start">
                           <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800" aria-label="Voltar">
                                <ArrowLeftIcon className="h-6 w-6 text-slate-600 dark:text-slate-300" />
                            </button>
                        </div>
                        <h1 className="text-lg font-bold text-slate-800 dark:text-slate-200 flex-1 text-center">Mensagens</h1>
                        <div className="flex-1"></div>
                    </header>
                    <div className="p-4 flex-shrink-0">
                        <div className="relative">
                            <input type="search" placeholder="Pesquisar" className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg py-2.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-slate-800 dark:text-slate-200 text-sm" />
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-slate-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            </div>
                        </div>
                    </div>
                    <main className="flex-grow overflow-y-auto">
                        <div className="divide-y divide-slate-200 dark:divide-slate-700">
                            {chatConversations.map(c => <ChatConversationItem key={c.id} conversation={c} />)}
                        </div>
                    </main>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ChatPanel;
