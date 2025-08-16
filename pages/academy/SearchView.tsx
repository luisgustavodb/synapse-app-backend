
import React from 'react';
import { articles, activityItems, groupClasses } from '../../constants';
import GridItemCard from '../../components/GridItemCard';
import { LeafIcon } from '../../components/icons/LeafIcon';
import { useUser } from '../../context/UserContext';

// Fisher-Yates shuffle algorithm
const shuffleArray = (array: any[]) => {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
};

const SearchView: React.FC = () => {
    const { feedPosts } = useUser();
    
    const allContent = React.useMemo(() => [
        ...feedPosts.map(item => ({ ...item, contentType: 'post' })),
        ...articles.map(item => ({ ...item, contentType: 'article' })),
        ...activityItems.map(item => ({ ...item, contentType: 'activity' })),
        ...groupClasses.map(item => ({ ...item, contentType: 'class' })),
    ], [feedPosts]);
    
    const [items, setItems] = React.useState(() => shuffleArray([...allContent]));
    const [searchQuery, setSearchQuery] = React.useState('');

    React.useEffect(() => {
        setItems(shuffleArray([...allContent]));
    }, [allContent]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        // As requested, shuffles the content randomly on search.
        setItems(shuffleArray([...items]));
    };

    return (
        <div className="p-4 bg-slate-50 dark:bg-slate-950 min-h-full pb-24">
            <form onSubmit={handleSearch} className="relative mb-4">
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

            <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
                {items.map((item) => {
                    const itemQuery = item.title || item.caption || item.description || 'lifestyle';
                    return (
                        <div key={`${item.contentType}-${item.id}`} className="mb-4 break-inside-avoid">
                            <GridItemCard item={item} searchQuery={itemQuery} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default SearchView;