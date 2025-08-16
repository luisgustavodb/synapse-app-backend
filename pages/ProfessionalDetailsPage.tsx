
import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { motion } from 'framer-motion';
import { professionalsByCategory } from '../constants';
import { ArrowLeftIcon } from '../components/icons/ArrowLeftIcon';
import { StarIcon } from '../components/icons/StarIcon';
import { ClockIcon } from '../components/icons/ClockIcon';
import { useGoBack } from '../hooks/useGoBack';

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

const DetailItem: React.FC<{ icon: React.FC<any>, label: string, children: React.ReactNode }> = ({ icon: Icon, label, children }) => (
    <div className="flex items-start space-x-3">
        <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded-lg mt-1">
            <Icon className="h-5 w-5 text-slate-500 dark:text-slate-400" />
        </div>
        <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">{label}</p>
            <div className="text-sm text-slate-800 dark:text-slate-200 font-bold">{children}</div>
        </div>
    </div>
);


const ProfessionalDetailsPage: React.FC = () => {
    const { id } = ReactRouterDOM.useParams<{ id: string }>();
    const goBack = useGoBack('/psychologists');
    
    const professional = Object.values(professionalsByCategory).flat().find(p => p.id === id);

    const motionProps = {
        initial:"initial",
        animate:"in",
        exit:"out",
        variants:pageVariants,
        transition:pageTransition
    };

    if (!professional) {
        return (
            <motion.div {...motionProps} className="p-6 text-center h-full flex flex-col">
                 <header className="flex items-center p-4 border-b border-slate-200 dark:border-slate-700 flex-shrink-0">
                    <button onClick={goBack} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800" aria-label="Voltar">
                        <ArrowLeftIcon className="h-6 w-6 text-slate-500 dark:text-slate-400" />
                    </button>
                    <h1 className="text-xl font-bold text-slate-800 dark:text-slate-200 mx-auto pr-8">Erro</h1>
                </header>
                <main className="flex-grow flex items-center justify-center">
                    <p className="dark:text-slate-300">Profissional não encontrado.</p>
                </main>
            </motion.div>
        );
    }

    return (
        <motion.div {...motionProps} className="h-full flex flex-col bg-slate-50 dark:bg-black">
            <header className="flex items-center p-4 border-b border-slate-200 dark:border-slate-700 flex-shrink-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-10">
                <button onClick={goBack} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800" aria-label="Voltar">
                    <ArrowLeftIcon className="h-6 w-6 text-slate-500 dark:text-slate-400" />
                </button>
                <h1 className="text-xl font-bold text-slate-800 dark:text-slate-200 mx-auto pr-8">Perfil do Especialista</h1>
            </header>
            <main className="flex-grow overflow-y-auto p-6 space-y-6">
                <div className="flex flex-col items-center text-center space-y-3">
                    <img 
                        src={professional.avatarUrl}
                        alt={professional.name} 
                        className="w-24 h-24 rounded-full object-cover shadow-lg"
                    />
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">{professional.name}</h2>
                        <p className="text-md text-indigo-500 dark:text-indigo-400 font-semibold">{professional.specialty}</p>
                    </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                    <DetailItem icon={StarIcon} label="Avaliação">
                         <div className="flex items-center space-x-1">
                            <span>{professional.rating.toFixed(1)}</span>
                            <StarIcon className="w-4 h-4 text-amber-400 fill-amber-400" />
                        </div>
                    </DetailItem>
                     <DetailItem icon={ClockIcon} label="Disponibilidade">
                        <span>{professional.availability}</span>
                    </DetailItem>
                </div>
                
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm text-left">
                    <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">Sobre</h3>
                    <p className="text-slate-600 dark:text-slate-300 whitespace-pre-line leading-relaxed">{professional.bio}</p>
                </div>
                
            </main>
             <footer className="p-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-t border-slate-200 dark:border-slate-700">
                <button 
                    onClick={() => alert(`Iniciando chat com ${professional.name}`)}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl transition-colors"
                >
                    Iniciar Chat
                </button>
            </footer>
        </motion.div>
    );
};

export default ProfessionalDetailsPage;
