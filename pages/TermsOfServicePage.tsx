
import React from 'react';
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


const TermsOfServicePage: React.FC = () => {
    const goBack = useGoBack();
    
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
                <h1 className="text-xl font-bold text-slate-800 dark:text-slate-200 mx-auto pr-8">Termos de Serviço</h1>
            </header>
            <main className="flex-grow overflow-y-auto p-6 prose prose-sm dark:prose-invert max-w-none">
                <h2 className="text-slate-800 dark:text-slate-200">1. Aceitação dos Termos</h2>
                <p className="text-slate-600 dark:text-slate-400">Ao acessar ou usar o aplicativo Synapse, você concorda em cumprir e ser regido por estes Termos de Serviço.</p>
                
                <h2 className="text-slate-800 dark:text-slate-200">2. Descrição do Serviço</h2>
                <p className="text-slate-600 dark:text-slate-400">O Synapse fornece ferramentas e recursos de bem-estar, incluindo rastreamento de humor, artigos e acesso a profissionais. O serviço é oferecido em um modelo "freemium", com funcionalidades básicas gratuitas e recursos premium disponíveis mediante assinatura.</p>
                
                <h2 className="text-slate-800 dark:text-slate-200">3. Isenção de Responsabilidade Médica</h2>
                <p className="text-slate-600 dark:text-slate-400">O Synapse não fornece aconselhamento médico. O conteúdo e os serviços oferecidos são apenas para fins informativos e de apoio ao bem-estar. Eles não substituem o aconselhamento, diagnóstico ou tratamento médico profissional. Sempre procure o conselho de seu médico ou outro profissional de saúde qualificado com qualquer dúvida que possa ter sobre uma condição médica.</p>

                <h2 className="text-slate-800 dark:text-slate-200">4. Conduta do Usuário</h2>
                <p className="text-slate-600 dark:text-slate-400">Você concorda em usar o Synapse apenas para fins legais. Você é responsável por todas as suas atividades em conexão com o Serviço.</p>

                <h2 className="text-slate-800 dark:text-slate-200">5. Modificações nos Termos</h2>
                <p className="text-slate-600 dark:text-slate-400">Reservamo-nos o direito de modificar estes termos a qualquer momento. Notificaremos você sobre quaisquer alterações, publicando os novos Termos de Serviço nesta página.</p>
            </main>
        </motion.div>
    );
};

export default TermsOfServicePage;