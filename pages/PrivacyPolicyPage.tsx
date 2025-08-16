
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


const PrivacyPolicyPage: React.FC = () => {
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
                <h1 className="text-xl font-bold text-slate-800 dark:text-slate-200 mx-auto pr-8">Política de Privacidade</h1>
            </header>
            <main className="flex-grow overflow-y-auto p-6 prose prose-sm dark:prose-invert max-w-none">
                <h2 className="text-slate-800 dark:text-slate-200">1. Coleta de Informações</h2>
                <p className="text-slate-600 dark:text-slate-400">Coletamos informações que você nos fornece diretamente, como quando você cria uma conta, e informações que coletamos automaticamente, como seus dados de uso e humor. Isso nos ajuda a personalizar sua experiência e melhorar nossos serviços.</p>
                
                <h2 className="text-slate-800 dark:text-slate-200">2. Uso de Informações</h2>
                <p className="text-slate-600 dark:text-slate-400">Usamos suas informações para operar e manter o Serviço, para se comunicar com você, para fins de pesquisa e desenvolvimento e para personalizar sua experiência. Não compartilhamos suas informações pessoais com terceiros, exceto conforme descrito nesta política.</p>
                
                <h2 className="text-slate-800 dark:text-slate-200">3. Segurança dos Dados</h2>
                <p className="text-slate-600 dark:text-slate-400">A segurança de seus dados é importante para nós. Usamos medidas de segurança comercialmente razoáveis, como criptografia, para proteger suas informações contra acesso, uso ou divulgação não autorizados.</p>

                <h2 className="text-slate-800 dark:text-slate-200">4. Seus Direitos</h2>
                <p className="text-slate-600 dark:text-slate-400">Você tem o direito de acessar, corrigir ou excluir suas informações pessoais. Você pode fazer isso nas configurações da sua conta ou entrando em contato conosco diretamente.</p>

                 <h2 className="text-slate-800 dark:text-slate-200">5. Alterações nesta Política</h2>
                <p className="text-slate-600 dark:text-slate-400">Podemos atualizar nossa Política de Privacidade de tempos em tempos. Iremos notificá-lo de quaisquer alterações, publicando a nova Política de Privacidade nesta página.</p>
            </main>
        </motion.div>
    );
};

export default PrivacyPolicyPage;