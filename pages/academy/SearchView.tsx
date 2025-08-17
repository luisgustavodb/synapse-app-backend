import React from 'react';
import GridItemCard from '../../components/GridItemCard';
import { LeafIcon } from '../../components/icons/LeafIcon';
import { useUser } from '../../context/UserContext';
import type { FeedPost } from '../../types';

const SearchView: React.FC = () => {
    const { feedPosts } = useUser();
    const [searchQuery, setSearchQuery] = React.useState('');

    const filteredItems = React.useMemo(() => {
        const allPosts = feedPosts.map(item => ({ ...item, contentType: 'post' as const }));

        if (!searchQuery.trim()) {
            return allPosts;
        }

        const lowercasedQuery = searchQuery.toLowerCase();
        
        return allPosts.filter(item => {
            const post = item as FeedPost;
            // A legenda contém o título e a descrição do webhook.
            return post.caption.toLowerCase().includes(lowercasedQuery);
        });
    }, [feedPosts, searchQuery]);

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // A busca é em tempo real, então o envio não precisa fazer nada extra.
    };

    return (
        <div className="p-4 bg-slate-50 dark:bg-slate-950 min-h-full pb-24">
            <form onSubmit={handleSearchSubmit} className="relative mb-4">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <LeafIcon className="h-5 w-5 text-slate-400 dark:text-slate-500" />
                </div>
                <input
                    type="search"
                    placeholder="Pesquisar e descobrir..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-full py-2.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-slate-800 dark:text-slate-200 text-sm"
                    aria-label="Pesquisar"
                />
            </form>

            {filteredItems.length > 0 ? (
                <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
                    {filteredItems.map((item) => {
                        const itemQuery = item.caption || 'lifestyle';
                        return (
                            <div key={`${item.contentType}-${item.id}`} className="mb-4 break-inside-avoid">
                                <GridItemCard item={item} searchQuery={itemQuery} />
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="text-center pt-16 px-6">
                    <div className="inline-block p-4 bg-slate-200 dark:bg-slate-800 rounded-full">
                        <LeafIcon className="h-10 w-10 text-slate-400 dark:text-slate-500" />
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-slate-700 dark:text-slate-300">Nenhum resultado encontrado</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Tente pesquisar por outros termos.</p>
                </div>
            )}
        </div>
    );
};

export default SearchView;