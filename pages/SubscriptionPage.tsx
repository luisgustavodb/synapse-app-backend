

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeftIcon } from '../components/icons/ArrowLeftIcon';
import { CheckCircleIcon } from '../components/icons/CheckCircleIcon';
import { useGoBack } from '../hooks/useGoBack';

const pageVariants = {
  initial: { opacity: 0, x: '100%' },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: '-100%' },
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5,
} as const;

const Feature: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <li className="flex items-center space-x-3">
        <CheckCircleIcon className="h-5 w-5 text-emerald-500 flex-shrink-0" />
        <span className="text-slate-600">{children}</span>
    </li>
);

const SubscriptionPage: React.FC = () => {
    const navigate = useNavigate();
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
            className="h-full flex flex-col bg-slate-50"
        >
            <header className="flex items-center p-4 border-b border-slate-200 flex-shrink-0 bg-white">
                <button onClick={goBack} className="p-2 rounded-full hover:bg-slate-200" aria-label="Voltar">
                    <ArrowLeftIcon className="h-6 w-6 text-slate-500" />
                </button>
                <h1 className="text-xl font-bold text-slate-800 mx-auto pr-8">Assinatura</h1>
            </header>
            <main className="flex-grow overflow-y-auto p-6 space-y-8">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-slate-800">Desbloqueie todo o potencial</h2>
                    <p className="text-slate-500 mt-1">Escolha o plano que melhor se adapta a você.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Free Plan Card */}
                    <div className="bg-white rounded-3xl p-6 shadow-md border-2 border-slate-200 flex flex-col">
                        <h3 className="text-lg font-bold text-slate-800">Plano Gratuito</h3>
                        <p className="text-slate-500 mb-4">O essencial para começar</p>
                        <p className="text-3xl font-bold text-slate-800 mb-6">R$0<span className="text-base font-normal text-slate-500">/mês</span></p>
                        <ul className="space-y-3 mb-6 text-sm flex-grow">
                            <Feature>Check-in de humor diário</Feature>
                            <Feature>Acesso a artigos selecionados</Feature>
                            <Feature>Chat com IA Synapse</Feature>
                        </ul>
                         <button disabled className="w-full bg-slate-200 text-slate-500 font-bold py-3 px-4 rounded-xl cursor-default">
                            Seu Plano Atual
                        </button>
                    </div>

                    {/* Premium Plan Card */}
                    <div className="bg-white rounded-3xl p-6 shadow-lg border-2 border-indigo-500 flex flex-col relative">
                        <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-full">MAIS POPULAR</div>
                        <h3 className="text-lg font-bold text-indigo-600">Plano Premium</h3>
                        <p className="text-slate-500 mb-4">Acesso total e ilimitado</p>
                        <p className="text-3xl font-bold text-slate-800 mb-6">R$29,90<span className="text-base font-normal text-slate-500">/mês</span></p>
                        <ul className="space-y-3 mb-6 text-sm flex-grow">
                            <Feature>Todos os benefícios do plano gratuito</Feature>
                            <Feature>Sessões de chat com psicólogos</Feature>
                            <Feature>Academia Integrada completa</Feature>
                            <Feature>Recursos e podcasts exclusivos</Feature>
                            <Feature>Relatórios de progresso avançados</Feature>
                        </ul>
                         <button onClick={() => navigate('/payment')} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl transition-colors">
                            Fazer Upgrade
                        </button>
                    </div>
                </div>
            </main>
        </motion.div>
    );
};

export default SubscriptionPage;