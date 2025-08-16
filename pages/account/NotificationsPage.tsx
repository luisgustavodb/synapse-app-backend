
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BellIcon } from '../../components/icons/BellIcon';
import { ArrowLeftIcon } from '../../components/icons/ArrowLeftIcon';
import { useGoBack } from '../../hooks/useGoBack';

interface ToggleProps {
    label: string;
    description: string;
    initialChecked?: boolean;
}

const Toggle: React.FC<ToggleProps> = ({ label, description, initialChecked = false }) => {
    const [isChecked, setIsChecked] = useState(initialChecked);
    const toggleId = `toggle-${label.replace(/\s+/g, '-')}`;

    return (
        <div className="flex items-center justify-between">
            <div className="flex-grow">
                <label htmlFor={toggleId} className="font-semibold text-slate-800 dark:text-slate-200 block cursor-pointer">{label}</label>
                <p className="text-sm text-slate-500 dark:text-slate-400">{description}</p>
            </div>
            <div className="relative inline-block w-11 mr-2 align-middle select-none transition duration-200 ease-in">
                <input 
                    type="checkbox" 
                    name={toggleId} 
                    id={toggleId} 
                    checked={isChecked}
                    onChange={() => setIsChecked(!isChecked)}
                    className={`absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer transition-all duration-200 ${isChecked ? 'right-0 border-slate-800 dark:border-slate-200' : 'border-slate-300 dark:border-slate-500'}`}
                    style={{
                        transform: isChecked ? 'translateX(0)' : 'translateX(-100%)',
                        left: isChecked ? 'auto' : '0'
                    }}
                />
                <label 
                    htmlFor={toggleId} 
                    className={`block overflow-hidden h-6 rounded-full cursor-pointer transition-colors duration-200 ${isChecked ? 'bg-slate-800 dark:bg-slate-200' : 'bg-slate-300 dark:bg-slate-600'}`}
                ></label>
            </div>
        </div>
    );
};


const NotificationItem: React.FC<{ title: string; time: string; }> = ({ title, time }) => {
    return (
        <div className="flex items-start space-x-4">
            <div className="bg-slate-200 dark:bg-slate-700 p-2 rounded-full mt-1">
                <BellIcon className="h-5 w-5 text-slate-500 dark:text-slate-400"/>
            </div>
            <div>
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{title}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{time}</p>
            </div>
        </div>
    );
};

const pageVariants = {
  initial: { opacity: 0 },
  in: { opacity: 1 },
  out: { opacity: 0 },
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5,
} as const;


const NotificationsPage: React.FC = () => {
    const goBack = useGoBack('/settings');

    const motionProps = {
        initial:"initial",
        animate:"in",
        exit:"out",
        variants:pageVariants,
        transition:pageTransition
    };

    return (
        <motion.div
            {...motionProps}
            className="h-full flex flex-col bg-white dark:bg-slate-900"
        >
            <header className="flex items-center p-4 border-b border-slate-200 dark:border-slate-700 flex-shrink-0">
                <button onClick={goBack} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800" aria-label="Voltar">
                     <ArrowLeftIcon className="h-6 w-6 text-slate-500 dark:text-slate-400" />
                </button>
                <h1 className="text-xl font-bold text-slate-800 dark:text-slate-200 mx-auto pr-8">Notificações</h1>
            </header>
            <main className="flex-grow overflow-y-auto p-6 space-y-8">
                <div>
                    <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-4">Configurações de Push</h2>
                    <div className="space-y-4 divide-y divide-slate-100 dark:divide-slate-800 -mt-2">
                        <div className="pt-4">
                            <Toggle label="Lembretes Diários" description="Check-in de humor e bem-estar." initialChecked={true} />
                        </div>
                        <div className="pt-4">
                            <Toggle label="Meu Progresso" description="Relatórios semanais e insights." initialChecked={true} />
                        </div>
                         <div className="pt-4">
                            <Toggle label="Dicas da Academia" description="Novos treinos e artigos." />
                        </div>
                    </div>
                </div>

                <div >
                    <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-4">Recentes</h2>
                     <div className="p-5 space-y-5 divide-y divide-slate-100 dark:divide-slate-800">
                        <NotificationItem title="Seu relatório de humor semanal está pronto!" time="há 2 horas"/>
                        <NotificationItem title="Nova dica na Academia: 'Snacks Saudáveis'." time="há 1 dia"/>
                        <NotificationItem title="Lembrete: Como você está se sentindo hoje?" time="há 2 dias"/>
                     </div>
                </div>
            </main>
        </motion.div>
    );
};

export default NotificationsPage;