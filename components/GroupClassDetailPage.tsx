
import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { motion } from 'framer-motion';
import { groupClasses } from '../constants';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { ClockIcon } from './icons/ClockIcon';
import { MapPinIcon } from './icons/MapPinIcon';
import { UsersIcon } from './icons/UsersIcon';
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

const DetailItem: React.FC<{ icon: React.FC<any>, label: string, value: string }> = ({ icon: Icon, label, value }) => (
    <div className="flex items-center space-x-3">
        <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded-lg">
            <Icon className="h-5 w-5 text-slate-500 dark:text-slate-400" />
        </div>
        <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">{label}</p>
            <p className="text-sm text-slate-800 dark:text-slate-200 font-bold">{value}</p>
        </div>
    </div>
);

const GroupClassDetailPage: React.FC = () => {
    const { id } = ReactRouterDOM.useParams<{ id: string }>();
    const goBack = useGoBack('/group-classes');
    const groupClass = groupClasses.find(c => c.id === id);

    const motionProps = {
        initial: "initial",
        animate: "in",
        exit: "out",
        variants: pageVariants,
        transition: pageTransition
    };

    if (!groupClass) {
        return (
            <motion.div {...motionProps} className="p-6 text-center h-full flex flex-col bg-white dark:bg-slate-900">
                <header className="flex items-center p-4 border-b border-slate-200 dark:border-slate-700 flex-shrink-0">
                    <button onClick={goBack} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800" aria-label="Voltar">
                        <ArrowLeftIcon className="h-6 w-6 text-slate-500 dark:text-slate-400" />
                    </button>
                    <h1 className="text-xl font-bold text-slate-800 dark:text-slate-200 mx-auto pr-8">Erro</h1>
                </header>
                <main className="flex-grow flex items-center justify-center">
                    <p className="dark:text-slate-300">Aula não encontrada.</p>
                </main>
            </motion.div>
        );
    }

    return (
        <motion.div {...motionProps} className="h-full flex flex-col bg-slate-50 dark:bg-slate-950">
            <header className="flex items-center p-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-10">
                <button onClick={goBack} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800" aria-label="Voltar">
                    <ArrowLeftIcon className="h-6 w-6 text-slate-500 dark:text-slate-400" />
                </button>
                <h1 className="text-lg font-bold text-slate-800 dark:text-slate-200 truncate mx-auto pr-8">{groupClass.title}</h1>
            </header>
            <main className="flex-grow overflow-y-auto">
                {groupClass.videoUrl ? (
                    <div className="h-56">
                        <iframe
                            src={groupClass.videoUrl}
                            title={groupClass.title}
                            frameBorder="0"
                            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full"
                        ></iframe>
                    </div>
                ) : (
                    <div className="h-56 bg-slate-200 dark:bg-slate-800">
                        <img src={groupClass.imageUrl} alt={groupClass.title} className="w-full h-full object-cover" />
                    </div>
                )}
                
                <div className="p-6 space-y-6 bg-slate-50 dark:bg-slate-950">
                    <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200 -mt-2">{groupClass.title}</h2>

                    <section>
                        <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-3">Sobre a Aula</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{groupClass.description}</p>
                    </section>

                    <section className="grid grid-cols-2 gap-4">
                        <DetailItem icon={ClockIcon} label="Horário" value={`${groupClass.time}, ${groupClass.duration}`} />
                        <DetailItem icon={MapPinIcon} label="Local" value={groupClass.location.name} />
                    </section>
                    
                    <section>
                        <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-3">Localização</h3>
                        <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700">
                            <iframe
                                src={groupClass.location.mapUrl}
                                width="100%"
                                height="200"
                                style={{ border: 0 }}
                                allowFullScreen={false}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 text-center">{groupClass.location.address}</p>
                    </section>

                    <section>
                        <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-3">Participantes</h3>
                        <div className="space-y-3">
                            {groupClass.participants.map(p => (
                                <div key={p.id} className="flex items-center space-x-3 bg-white dark:bg-slate-800 p-2 rounded-lg shadow-sm">
                                    <img src={p.avatarUrl} alt={p.name} className="w-10 h-10 rounded-full object-cover" />
                                    <p className="font-semibold text-sm text-slate-700 dark:text-slate-300">{p.name}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </main>
        </motion.div>
    );
};

export default GroupClassDetailPage;
