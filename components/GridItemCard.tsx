
import React from 'react';
import { Link } from 'react-router-dom';
import type { FeedPost, Article, ActivityItem, GroupClass } from '../types';

type GridItem = (FeedPost | Article | ActivityItem | GroupClass) & { contentType: string };

interface GridItemCardProps {
    item: GridItem;
    searchQuery: string;
}

const getContentTypeLabel = (item: GridItem): string => {
    switch (item.contentType) {
        case 'post':
            return (item as FeedPost).type === 'ad' ? 'Anúncio' : 'Publicação';
        case 'article':
            const articleType = (item as Article).type;
            if (articleType === 'TIP') return 'Dica';
            if (articleType === 'CURIOSITY') return 'Curiosidade';
            return 'Artigo';
        case 'activity':
            switch ((item as ActivityItem).category) {
                case 'workout': return 'Treino';
                case 'nutrition': return 'Receita';
                case 'meditation': return 'Meditação';
                default: return 'Atividade';
            }
        case 'class':
            return 'Aula Coletiva';
        default:
            return 'Conteúdo';
    }
};


const GridItemCard: React.FC<GridItemCardProps> = ({ item, searchQuery }) => {
    const { title, caption, id, contentType, imageUrl } = item as any;
    
    let linkPath = '#';
    switch (contentType) {
        case 'post':
            linkPath = `/detail/post/${id}`;
            break;
        case 'article':
            linkPath = `/detail/article/${id}`;
            break;
        case 'activity':
            linkPath = `/detail/activity/${id}`;
            break;
        case 'class':
            linkPath = `/group-class/${id}`;
            break;
    }

    const displayTitle = title || caption || 'Untitled';
    const typeLabel = getContentTypeLabel(item);

    return (
        <Link 
            to={linkPath} 
            className="block group w-full h-auto rounded-xl overflow-hidden shadow-sm transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg active:scale-95 relative"
        >
             <img
                src={imageUrl}
                alt={displayTitle.substring(0, 50)} 
                className="w-full h-full object-cover bg-slate-200 dark:bg-slate-700 transition-transform duration-500 group-hover:brightness-90"
            />
            <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent">
                <span className="text-white text-xs font-bold [text-shadow:0_1px_2px_rgba(0,0,0,0.5)]">
                    {typeLabel}
                </span>
            </div>
        </Link>
    );
};

export default GridItemCard;
