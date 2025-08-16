import React, { useState, useMemo, ElementType } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { articles } from '../constants';
import { ArrowLeftIcon } from '../components/icons/ArrowLeftIcon';
import { LeafIcon } from '../components/icons/LeafIcon';
import ArticleListCard from '../components/ArticleListCard';
import { BookOpenIcon } from '../components/icons/BookOpenIcon';
import { useGoBack } from '../hooks/useGoBack';

type ArticleType = 'ARTICLE' | 'TIP';
const articleTypeOptions: ArticleType[] = ['ARTICLE', 'TIP'];

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

const FilterButton: React.FC<{
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 border-2 ${
      isActive
        ? 'bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-900 border-slate-800 dark:border-slate-200'
        : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500'
    }`}
  >
    {label}
  </button>
);

const MotionDiv = motion.div as ElementType;

const ArticlesPage: React.FC = () => {
    const goBack = useGoBack('/academy');
    const [searchQuery, setSearchQuery] = useState('');
    const [typeFilter, setTypeFilter] = useState<ArticleType | null>(null);

    const filteredArticles = useMemo(() => {
        return articles.filter(article => {
            const isArticleOrTip = article.type === 'ARTICLE' || article.type === 'TIP';
            const typeMatch = !typeFilter || article.type === typeFilter;
            const searchMatch = searchQuery === '' ||
                article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                article.description.toLowerCase().includes(searchQuery.toLowerCase());
            return isArticleOrTip && typeMatch && searchMatch;
        });
    }, [typeFilter, searchQuery]);
    
    const motionProps = {
        initial: "initial",
        animate: "in",
        exit: "out",
        variants: pageVariants,
        transition: pageTransition,
    };
    
    const typeLabels: Record<ArticleType, string> = {
      'ARTICLE': 'Artigos',
      'TIP': 'Dicas'
    };

    return (
        <MotionDiv {...motionProps} className="h-full flex flex-col bg-slate-50 dark:bg-slate-950">
            <header className="flex-shrink-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-20">
                <div className="flex items-center p-4 border-b border-slate-200 dark:border-slate-700">
                    <button onClick={goBack} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800" aria-label="Voltar">
                        <ArrowLeftIcon className="h-6 w-6 text-slate-500 dark:text-slate-400" />
                    </button>
                    <h1 className="text-xl font-bold text-slate-800 dark:text-slate-200 mx-auto pr-8">Artigos e Dicas</h1>
                </div>
            </header>

            <div className="p-4 space-y-4 flex-shrink-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 sticky top-[65px] z-10">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <LeafIcon className="h-5 w-5 text-slate-400 dark:text-slate-500" />
                    </div>
                    <input
                        type="search"
                        placeholder="Pesquisar..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg py-2.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-slate-800 dark:text-slate-200 text-sm"
                        aria-label="Pesquisar artigos"
                    />
                </div>
                <section>
                    <div className="flex flex-wrap gap-2 pb-1">
                        <FilterButton label="Todos" isActive={!typeFilter} onClick={() => setTypeFilter(null)} />
                        {articleTypeOptions.map(option => (
                            <FilterButton key={option} label={typeLabels[option]} isActive={typeFilter === option} onClick={() => setTypeFilter(option)} />
                        ))}
                    </div>
                </section>
            </div>

            <main className="flex-grow overflow-y-auto p-4">
                <AnimatePresence>
                     {filteredArticles.length > 0 ? (
                        <MotionDiv 
                            layout
                            className="grid grid-cols-1 md:grid-cols-2 gap-4"
                        >
                            {filteredArticles.map((item, index) => (
                                <MotionDiv
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.2, delay: index * 0.05 }}
                                >
                                    <ArticleListCard article={item} />
                                </MotionDiv>
                            ))}
                        </MotionDiv>
                     ) : (
                         <MotionDiv
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center pt-16 px-6"
                         >
                            <div className="inline-block p-4 bg-slate-200 dark:bg-slate-800 rounded-full">
                                <BookOpenIcon className="h-10 w-10 text-slate-400 dark:text-slate-500" />
                            </div>
                            <h3 className="mt-4 text-lg font-bold text-slate-700 dark:text-slate-300">Nenhum item encontrado</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Tente uma busca ou filtros diferentes para ver mais resultados.</p>
                         </MotionDiv>
                     )}
                </AnimatePresence>
            </main>
        </MotionDiv>
    );
};

export default ArticlesPage;
