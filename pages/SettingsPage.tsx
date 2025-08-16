

import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { motion } from 'framer-motion';
import SettingsListItem from '../components/SettingsListItem';
import { UserCircleIcon } from '../components/icons/UserCircleIcon';
import { BellIcon } from '../components/icons/BellIcon';
import { ShieldCheckIcon } from '../components/icons/ShieldCheckIcon';
import { QuestionMarkCircleIcon } from '../components/icons/QuestionMarkCircleIcon';
import { ArrowRightOnRectangleIcon } from '../components/icons/ArrowRightOnRectangleIcon';
import { PuzzlePieceIcon } from '../components/icons/PuzzlePieceIcon';
import { GiftIcon } from '../components/icons/GiftIcon';
import { InformationCircleIcon } from '../components/icons/InformationCircleIcon';
import { ArrowLeftIcon } from '../components/icons/ArrowLeftIcon';
import { useGoBack } from '../hooks/useGoBack';
import { useTheme } from '../context/ThemeContext';
import { useUser } from '../context/UserContext';
import { SunIcon } from '../components/icons/SunIcon';
import { MoonIcon } from '../components/icons/MoonIcon';
import { ComputerDesktopIcon } from '../components/icons/ComputerDesktopIcon';

const pageVariants = {
  initial: { opacity: 0, x: '100%' },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: '100%' },
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5,
} as const;

const SettingsPage: React.FC = () => {
  const navigate = ReactRouterDOM.useNavigate();
  const goBack = useGoBack('/account');
  const { theme, changeTheme } = useTheme();
  const { updateUser } = useUser();

  const handleLogout = () => {
    updateUser(null);
    navigate('/login', { replace: true });
  };

  const motionProps = {
      initial:"initial",
      animate:"in",
      exit:"out",
      variants:pageVariants,
      transition:pageTransition
  };
  
    const ThemeButton: React.FC<{
        label: string;
        icon: React.FC<any>;
        current: boolean;
        onClick: () => void;
    }> = ({ label, icon: Icon, current, onClick }) => (
        <button
            onClick={onClick}
            className={`w-full flex flex-col items-center justify-center space-y-2 py-4 rounded-xl transition-colors duration-200 border-2 ${
                current
                    ? 'bg-indigo-100 dark:bg-indigo-900/50 border-indigo-400'
                    : 'bg-slate-100 dark:bg-slate-700/50 border-transparent hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
        >
            <Icon className={`w-6 h-6 ${current ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500 dark:text-slate-400'}`} />
            <span className={`text-sm font-semibold ${current ? 'text-indigo-700 dark:text-indigo-300' : 'text-slate-600 dark:text-slate-300'}`}>{label}</span>
        </button>
    );

  return (
    <motion.div
      {...motionProps}
      className="h-full flex flex-col bg-slate-50 dark:bg-slate-800"
    >
        <header className="flex items-center p-4 border-b border-slate-200 dark:border-slate-700 flex-shrink-0 bg-white dark:bg-slate-900">
            <button onClick={goBack} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700" aria-label="Voltar">
                <ArrowLeftIcon className="h-6 w-6 text-slate-500 dark:text-slate-400" />
            </button>
            <h1 className="text-xl font-bold text-slate-800 dark:text-slate-200 mx-auto pr-8">Configurações</h1>
        </header>

        <main className="overflow-y-auto py-6">
            <div className="px-4 mb-6">
                <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-2 px-2">APARÊNCIA</h3>
                <div className="grid grid-cols-3 gap-3">
                    <ThemeButton label="Claro" icon={SunIcon} current={theme === 'light'} onClick={() => changeTheme('light')} />
                    <ThemeButton label="Escuro" icon={MoonIcon} current={theme === 'dark'} onClick={() => changeTheme('dark')} />
                    <ThemeButton label="Sistema" icon={ComputerDesktopIcon} current={theme === 'system'} onClick={() => changeTheme('system')} />
                </div>
            </div>
            
            <div className="divide-y divide-slate-100 dark:divide-slate-700/50 mb-6 bg-white dark:bg-slate-900/50 rounded-xl mx-4 overflow-hidden">
                <SettingsListItem to="/account/personal-info" Icon={UserCircleIcon} label="Informações Pessoais" />
                <SettingsListItem to="/account/notifications" Icon={BellIcon} label="Notificações" />
                <SettingsListItem to="/account/integrations" Icon={PuzzlePieceIcon} label="Integrações" />
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-700/50 bg-white dark:bg-slate-900/50 rounded-xl mx-4 overflow-hidden">
                <SettingsListItem to="/account/privacy" Icon={ShieldCheckIcon} label="Privacidade e Dados" />
                <SettingsListItem to="/account/support" Icon={QuestionMarkCircleIcon} label="Ajuda e Suporte" />
                <SettingsListItem to="/account/invite" Icon={GiftIcon} label="Convidar Amigos" />
                <SettingsListItem to="/account/about" Icon={InformationCircleIcon} label="Sobre o Synapse" />
            </div>

            <div className="pt-6 px-6">
                <button 
                onClick={handleLogout}
                className="w-full bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-bold py-3 px-4 rounded-xl flex items-center justify-center space-x-2 transition-colors">
                    <ArrowRightOnRectangleIcon className="h-5 w-5" />
                    <span>Sair</span>
                </button>
            </div>
        </main>
    </motion.div>
  );
};

export default SettingsPage;
