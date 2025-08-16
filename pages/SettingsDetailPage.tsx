import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeftIcon } from '../components/icons/ArrowLeftIcon';
import { useGoBack } from '../hooks/useGoBack';

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

interface SettingsDetailPageProps {
  title: string;
}

const FAQItem = ({ q, a }: { q: string, a: string }) => (
  <details className="py-2">
    <summary className="font-semibold cursor-pointer text-slate-700 dark:text-slate-300">{q}</summary>
    <p className="mt-2 text-slate-500 dark:text-slate-400">{a}</p>
  </details>
);

const renderContent = (title: string) => {
    switch (title) {
        case 'Integrações':
            return (
                <div className="w-full space-y-4">
                    <p className="text-center text-slate-500 dark:text-slate-400 mb-6">Conecte o Synapse com seus outros aplicativos de saúde.</p>
                    <div className="p-4 flex justify-between items-center border-b border-slate-200 dark:border-slate-700">
                        <span className="font-semibold text-slate-800 dark:text-slate-200">Apple Health</span>
                        <button className="text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500">Conectar</button>
                    </div>
                     <div className="p-4 flex justify-between items-center border-b border-slate-200 dark:border-slate-700">
                        <span className="font-semibold text-slate-800 dark:text-slate-200">Google Fit</span>
                        <button className="text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500">Conectar</button>
                    </div>
                </div>
            );
        case 'Privacidade e Dados':
            return (
                <div className="w-full text-left space-y-6">
                    <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200">Sua Privacidade é Nossa Prioridade</h3>
                    <p className="text-slate-600 dark:text-slate-300">Nós nunca vendemos seus dados. Você está no controle das suas informações e pode gerenciá-las ou excluí-las a qualquer momento. Para mais detalhes, consulte nossa Política de Privacidade completa.</p>
                    <button className="w-full bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-bold py-3 px-4 rounded-xl transition-colors">
                        Baixar meus dados
                    </button>
                </div>
            );
        case 'Ajuda e Suporte':
            return (
                <div className="w-full text-left">
                    <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-4">Perguntas Frequentes</h3>
                    <div className="divide-y divide-slate-200 dark:divide-slate-700">
                        <FAQItem q="O Synapse substitui a terapia?" a="Não. O Synapse é uma ferramenta de apoio ao bem-estar, mas não substitui o aconselhamento profissional de um terapeuta licenciado." />
                        <FAQItem q="Meus dados estão seguros?" a="Sim, levamos a segurança dos dados muito a sério. Utilizamos criptografia e seguimos as melhores práticas para proteger suas informações."/>
                    </div>
                    <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
                        <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-4">Entre em Contato</h3>
                        <form className="space-y-4">
                            <div>
                                <label htmlFor="support-email" className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Seu email</label>
                                <input type="email" id="support-email" placeholder="seu.email@exemplo.com" className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-slate-500 text-slate-800 dark:text-slate-200 text-sm" />
                            </div>
                            <div>
                                <label htmlFor="support-message" className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Sua dúvida</label>
                                <textarea id="support-message" rows={4} placeholder="Descreva seu problema ou dúvida aqui..." className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-slate-500 text-slate-800 dark:text-slate-200 text-sm"></textarea>
                            </div>
                            <button type="submit" className="w-full bg-slate-800 dark:bg-slate-200 hover:bg-slate-700 dark:hover:bg-slate-300 text-white dark:text-slate-900 font-bold py-3 px-4 rounded-xl flex items-center justify-center transition-colors">
                                Enviar Mensagem
                            </button>
                        </form>
                    </div>
                </div>
            );
        case 'Convidar Amigos':
            return (
                <div className="w-full text-center space-y-4">
                     <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200">Compartilhe o Bem-Estar!</h3>
                     <p className="text-slate-500 dark:text-slate-400">Convide um amigo para se juntar à comunidade Synapse e iniciar sua jornada de autocuidado.</p>
                     <div className="bg-slate-200 dark:bg-slate-700 border-2 border-dashed border-slate-300 dark:border-slate-500 rounded-xl p-4 font-mono text-slate-700 dark:text-slate-300">
                        SYNAPSE-A4B2
                     </div>
                     <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-4 rounded-xl transition-colors">
                        Compartilhar Convite
                    </button>
                </div>
            );
         case 'Sobre o Synapse':
            return (
                 <div className="w-full text-center space-y-4">
                    <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200">Synapse</h3>
                    <p className="text-slate-500 dark:text-slate-400">Versão 1.0.0 (Build 2025)</p>
                     <div className="text-indigo-600 dark:text-indigo-400 text-sm font-semibold space-x-4">
                        <Link to="/terms-of-service" className="hover:underline">Termos de Serviço</Link>
                        <Link to="/privacy-policy" className="hover:underline">Política de Privacidade</Link>
                     </div>
                </div>
            );
        default:
            return (
                 <div className="text-center p-8">
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">{title}</h2>
                    <p className="text-slate-500 dark:text-slate-400 mt-2">Esta página está em construção. Volte em breve!</p>
                </div>
            );
    }
}

const SettingsDetailPage: React.FC<SettingsDetailPageProps> = ({ title }) => {
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
      className="h-full flex flex-col bg-slate-50 dark:bg-slate-950"
    >
      <header className="flex items-center p-4 border-b border-slate-200 dark:border-slate-700 flex-shrink-0 bg-white dark:bg-slate-900">
        <button onClick={goBack} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800" aria-label="Voltar">
          <ArrowLeftIcon className="h-6 w-6 text-slate-500 dark:text-slate-400" />
        </button>
        <h1 className="text-xl font-bold text-slate-800 dark:text-slate-200 mx-auto pr-8">{title}</h1>
      </header>
      <main className="flex-grow overflow-y-auto p-6 flex items-center justify-center">
        {renderContent(title)}
      </main>
    </motion.div>
  );
};

export default SettingsDetailPage;