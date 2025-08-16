import React, { useRef, useState } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { articles } from '../../constants';
import { ForkKnifeIcon } from '../../components/icons/ForkKnifeIcon';
import ArticleCard from '../../components/ArticleCard';
import PixabayImage from '../../components/PixabayImage';

const ExploreNutritionView: React.FC = () => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!scrollContainerRef.current) return;
        setIsDragging(true);
        setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
        setScrollLeft(scrollContainerRef.current.scrollLeft);
        scrollContainerRef.current.classList.add('cursor-grabbing');
    };

    const onMouseLeave = () => {
        if (!scrollContainerRef.current || !isDragging) return;
        setIsDragging(false);
        scrollContainerRef.current.classList.remove('cursor-grabbing');
    };

    const onMouseUp = () => {
        if (!scrollContainerRef.current) return;
        setIsDragging(false);
        scrollContainerRef.current.classList.remove('cursor-grabbing');
    };

    const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isDragging || !scrollContainerRef.current) return;
        e.preventDefault();
        const x = e.pageX - scrollContainerRef.current.offsetLeft;
        const walk = (x - startX) * 2;
        scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    };

    const typeLabel = (type: 'ARTICLE' | 'TIP' | 'CURIOSITY') => {
        switch (type) {
            case 'ARTICLE': return 'Artigo';
            case 'TIP': return 'Dica';
            case 'CURIOSITY': return 'Curiosidade';
        }
    };

    const articlesAndTips = articles.filter(a => a.type === 'ARTICLE' || a.type === 'TIP');
    const curiosities = articles.filter(a => a.type === 'CURIOSITY');

    return (
        <div className="bg-white dark:bg-slate-900 min-h-full pb-24">
            <div className="pt-6 space-y-8">
                <div className="px-6">
                    <section>
                        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-3">Receitas</h2>
                        <ReactRouterDOM.Link to="/recipes" className="block relative rounded-xl overflow-hidden h-44 group">
                             <PixabayImage
                                searchQuery="healthy food ingredients"
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                                alt="Mesa com ingredientes saudáveis"
                                minW={400}
                                minH={176}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent flex flex-col justify-end p-4">
                                <div className="absolute top-4 left-4 bg-green-400 p-2 rounded-full">
                                    <ForkKnifeIcon className="w-4 h-4 text-black" />
                                </div>
                                <div>
                                    <p className="font-bold text-sm uppercase text-white tracking-wider">NUTRIÇÃO CONSCIENTE</p>
                                    <p className="font-bold text-2xl uppercase text-white">EXPLORE AS RECEITAS</p>
                                </div>
                            </div>
                        </ReactRouterDOM.Link>
                    </section>
                </div>
                
                <section className="space-y-3 w-full">
                    <div className="flex justify-between items-center mb-1 px-6">
                        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200">Para Ler</h2>
                        <ReactRouterDOM.Link to="/articles" className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500">Ver todas</ReactRouterDOM.Link>
                    </div>
                     <div
                        ref={scrollContainerRef}
                        className="overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing"
                        onMouseDown={onMouseDown}
                        onMouseLeave={onMouseLeave}
                        onMouseUp={onMouseUp}
                        onMouseMove={onMouseMove}
                    >
                        <div className="flex space-x-4 px-6 pb-2 snap-x snap-mandatory select-none">
                            {articlesAndTips.slice(0, 5).map(article => (
                                <ReactRouterDOM.Link to={`/detail/article/${article.id}`} key={article.id} draggable="false" className="flex-shrink-0 w-56 bg-slate-100/70 dark:bg-slate-800 rounded-xl overflow-hidden group snap-start transition-shadow hover:shadow-md">
                                    <div className="h-32">
                                        <PixabayImage searchQuery={article.title} alt={article.title} className="w-full h-full object-cover" minW={224} minH={128} />
                                    </div>
                                    <div className="p-3">
                                        <p className="text-xs font-bold text-indigo-600 dark:text-indigo-400">{typeLabel(article.type)}</p>
                                        <p className="font-semibold text-sm leading-tight text-slate-800 dark:text-slate-200 mt-1 line-clamp-2">{article.title}</p>
                                    </div>
                                </ReactRouterDOM.Link>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="space-y-3 w-full">
                    <div className="flex justify-between items-center mb-1 px-6">
                        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200">Curiosidades</h2>
                        <ReactRouterDOM.Link to="/curiosities" className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500">Ver todas</ReactRouterDOM.Link>
                    </div>
                    <div className="px-6 space-y-0.5 border-y border-slate-200 dark:border-slate-800">
                        {curiosities.slice(0, 5).map(curiosity => (
                            <ArticleCard key={curiosity.id} article={curiosity} />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ExploreNutritionView;