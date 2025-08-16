

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import type { User, FeedPost } from '../types';

interface UserContextType {
    user: User | null;
    updateUser: (newUserData: User | null) => void;
    isLoading: boolean;
    isFeedLoading: boolean;
    feedPosts: FeedPost[];
    updateFeed: (action: { type: 'add' | 'remove'; post?: FeedPost; postId?: string }) => void;
    feedError: string | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Fisher-Yates (aka Knuth) Shuffle
const shuffleArray = (array: any[]) => {
  let currentIndex = array.length,  randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
};


export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isFeedLoading, setIsFeedLoading] = useState(true);
    const [feedPosts, setFeedPosts] = useState<FeedPost[]>([]);
    const [feedError, setFeedError] = useState<string | null>(null);

    useEffect(() => {
        try {
            const storedUser = localStorage.getItem('synapseUser');
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        } catch (error) {
            console.error('Failed to parse user from localStorage', error);
            localStorage.removeItem('synapseUser');
        } finally {
            setIsLoading(false);
        }
    }, []);
    
     useEffect(() => {
        const fetchAllPosts = async (currentUser: User) => {
            setIsFeedLoading(true);
            setFeedError(null);
            setFeedPosts([]);

            const generalFeedUrl = "https://pleased-sharply-cheetah.ngrok-free.app/webhook/3334fa36-6eea-4046-98fe-f36f9ebef092";
            const userFeedUrl = "https://pleased-sharply-cheetah.ngrok-free.app/webhook/a2c9af17-2ce8-4a52-a3aa-075d64d9ab50";
            const likesFeedUrl = "https://pleased-sharply-cheetah.ngrok-free.app/webhook/353a4cbe-db5e-4caa-9588-678def48897e";
            const username = currentUser.handle.startsWith('@') ? currentUser.handle.substring(1) : currentUser.handle;

            try {
                const [generalRes, userRes, likesRes] = await Promise.all([
                    fetch(generalFeedUrl, { headers: { 'ngrok-skip-browser-warning': 'true' } }).catch(e => e as Error),
                    fetch(userFeedUrl, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json', 'ngrok-skip-browser-warning': 'true' },
                        body: JSON.stringify({ username }),
                    }).catch(e => e as Error),
                    fetch(likesFeedUrl, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json', 'ngrok-skip-browser-warning': 'true' },
                        body: JSON.stringify({ username }),
                    }).catch(e => e as Error)
                ]);
                
                const errorMessages: string[] = [];
                let allPosts: FeedPost[] = [];
                let likedPostIds = new Set<string>();
                
                // --- Processa o Feed de Curtidas ---
                if (likesRes instanceof Error) {
                    errorMessages.push(`Feed de Curtidas: Falha de rede - ${likesRes.message}`);
                } else if (!likesRes.ok) {
                    errorMessages.push(`Feed de Curtidas: Erro do Servidor (Status: ${likesRes.status})`);
                } else {
                    const responseText = await likesRes.text();
                     if (responseText) {
                        try {
                            let data = JSON.parse(responseText);
                            if (typeof data === 'string') {
                                data = JSON.parse(data);
                            }

                            let likesArray: any[] | undefined;
                            // A resposta pode ser um array direto de objetos de curtida, como no seu exemplo.
                            if (Array.isArray(data)) {
                                likesArray = data;
                            } else if (data && typeof data === 'object') {
                                // Ou pode ser um objeto que contém um array.
                                likesArray = Object.values(data).find(Array.isArray);
                            }

                            if (likesArray) {
                                // Esta lógica processa corretamente TODOS os "corações" (curtidas) que vêm da API.
                                // 1. Percorre cada objeto de curtida no array.
                                likedPostIds = new Set(
                                    likesArray
                                        // 2. Extrai o valor da chave "id do post" de cada um.
                                        .map(like => like && like['id do post'])
                                        // 3. Filtra quaisquer valores nulos ou indefinidos.
                                        .filter(postId => postId != null)
                                        // 4. Converte o ID para string para garantir uma comparação consistente.
                                        .map(postId => String(postId).trim())
                                );
                                // 5. O resultado é um `Set` com todos os IDs dos posts que o usuário curtiu, para uma verificação rápida.
                            } else {
                                console.warn("Could not find an array of likes in the response", data);
                            }
                        } catch(e) {
                             console.error("Failed to parse likes feed:", e, "\nResponse text:", responseText);
                             errorMessages.push(`Feed de Curtidas: Resposta inválida. Detalhe: ${(e as Error).message}`);
                        }
                     }
                }
                
                // --- Processa o Feed Geral ---
                if (generalRes instanceof Error) {
                    errorMessages.push(`Feed Geral: Falha de rede - ${generalRes.message}`);
                } else if (!generalRes.ok) {
                    errorMessages.push(`Feed Geral: Erro do Servidor (Status: ${generalRes.status})`);
                } else {
                    const responseText = await generalRes.text();
                    if (responseText) {
                        try {
                            let sanitizedText = responseText.trim().replace(/\]\s*\[/g, '],[');
                            if (sanitizedText.startsWith('[') && !sanitizedText.startsWith('[[')) {
                                sanitizedText = `[${sanitizedText}]`;
                            }
                            const responseDataArrays: any[][] = JSON.parse(sanitizedText);
                            const responseData: any[] = responseDataArrays.flat();
                            
                            if (Array.isArray(responseData)) {
                                const rawPosts: any[] = [], rawUsers: any[] = [];
                                responseData.forEach(item => {
                                    if (item && typeof item === 'object') {
                                        if ('titulo' in item && 'descrição' in item) rawPosts.push(item);
                                        else if ('email' in item && 'senha' in item) {
                                            const { senha, ...userWithoutPassword } = item;
                                            rawUsers.push(userWithoutPassword);
                                        }
                                    }
                                });
                                
                                const userMap = new Map<string, any>();
                                rawUsers.forEach(u => {
                                    if (u.email) {
                                        const cleanHandle = (u.usuario || u.email).trim().replace(/ /g, '_');
                                        userMap.set(u.email, {
                                            name: u.nome?.trim() || u.usuario?.trim() || 'Usuário Anônimo',
                                            handle: `@${cleanHandle}`,
                                            avatarUrl: u.imagem
                                        });
                                    }
                                });
                                
                                const generalPosts = rawPosts
                                .filter(p => p && p.id != null)
                                .map(p => {
                                    const authorFromMap = userMap.get(p.user);
                                    const authorName = authorFromMap?.name || (p.user ? p.user.split('@')[0] : 'Usuário Synapse');
                                    const authorHandle = authorFromMap?.handle || (p.user ? `@${p.user.split('@')[0]}` : '@synapse');
                                    let avatarUrl = authorFromMap?.avatarUrl ?? p['imagem de perfil'] ?? 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png';
                                    
                                    let imageUrl = p.imagem;
                                    let videoUrl = p.video;
                                    if (typeof imageUrl === 'string' && imageUrl.startsWith('"') && imageUrl.endsWith('"')) imageUrl = imageUrl.slice(1, -1);
                                    if (typeof avatarUrl === 'string' && avatarUrl.startsWith('"') && avatarUrl.endsWith('"')) avatarUrl = avatarUrl.slice(1, -1);
                                    if (typeof videoUrl === 'string' && videoUrl.startsWith('"') && videoUrl.endsWith('"')) videoUrl = videoUrl.slice(1, -1);
                                    
                                    if (imageUrl && !videoUrl) {
                                        const isVideoDataUri = typeof imageUrl === 'string' && imageUrl.startsWith('data:video/');
                                        const isVideoFile = typeof imageUrl === 'string' && /\.(mp4|mov|webm|ogg)$/i.test(imageUrl);
                                        if (isVideoDataUri || isVideoFile) {
                                            videoUrl = imageUrl;
                                            imageUrl = undefined;
                                        }
                                    }

                                    const postIdStr = String(p.id).trim();
                                    const isLiked = likedPostIds.has(postIdStr);
                                    
                                    return {
                                        id: postIdStr, 
                                        author: { name: authorName, handle: authorHandle, avatar: avatarUrl },
                                        imageUrl: imageUrl,
                                        videoUrl: videoUrl,
                                        caption: `${p.titulo}\n${p.descrição}`,
                                        likes: parseInt(String(p.likes), 10) || 0, comments: p.comments || 0,
                                        type: 'post' as const, 
                                        isLikedByCurrentUser: isLiked
                                    };
                                });
                                allPosts.push(...generalPosts);
                            }
                        } catch (e) {
                            console.error("Erro ao analisar JSON do feed geral:", e, "\nResposta:", responseText);
                            errorMessages.push(`Feed Geral: Resposta inválida. Detalhe: ${(e as Error).message}`);
                        }
                    }
                }
                
                // --- Processa o Feed do Usuário ---
                if (userRes instanceof Error) {
                    errorMessages.push(`Feed do Usuário: Falha de rede - ${userRes.message}`);
                } else if (!userRes.ok) {
                     errorMessages.push(`Feed do Usuário: Erro do Servidor (Status: ${userRes.status})`);
                } else {
                     const responseText = await userRes.text();
                     if (responseText) {
                        try {
                            const userData: any[] = JSON.parse(responseText);
                            if (Array.isArray(userData)) {
                                const userPosts = userData
                                .filter(p => p && p.id != null)
                                .map(p => {
                                    let imageUrl = p.imagem;
                                    let videoUrl = p.video;
                                    if (typeof imageUrl === 'string' && imageUrl.startsWith('"') && imageUrl.endsWith('"')) imageUrl = imageUrl.slice(1, -1);
                                    if (typeof videoUrl === 'string' && videoUrl.startsWith('"') && videoUrl.endsWith('"')) videoUrl = videoUrl.slice(1, -1);
                                    
                                    if (imageUrl && !videoUrl) {
                                        const isVideoDataUri = typeof imageUrl === 'string' && imageUrl.startsWith('data:video/');
                                        const isVideoFile = typeof imageUrl === 'string' && /\.(mp4|mov|webm|ogg)$/i.test(imageUrl);
                                        if (isVideoDataUri || isVideoFile) {
                                            videoUrl = imageUrl;
                                            imageUrl = undefined;
                                        }
                                    }
                                    
                                    const postIdStr = String(p.id).trim();
                                    const isLiked = likedPostIds.has(postIdStr);
                                    
                                    return {
                                        id: postIdStr, author: { name: currentUser.name, handle: currentUser.handle, avatar: currentUser.avatarUrl },
                                        imageUrl: imageUrl,
                                        videoUrl: videoUrl,
                                        caption: `${p.titulo}\n${p.descrição}`,
                                        likes: parseInt(String(p.likes), 10) || 0, comments: p.comments || 0,
                                        type: 'post' as const, isLikedByCurrentUser: isLiked
                                    };
                                });
                                 allPosts.push(...userPosts);
                            }
                        } catch(e) {
                             console.error("Erro ao analisar JSON do feed do usuário:", e, "\nResposta:", responseText);
                             errorMessages.push(`Feed do Usuário: Resposta inválida. Detalhe: ${(e as Error).message}`);
                        }
                     }
                }

                if (errorMessages.length > 0) {
                    setFeedError(errorMessages.join('\n'));
                }

                const uniquePosts = Array.from(new Map(allPosts.map(p => [p.id, p])).values());
                setFeedPosts(shuffleArray(uniquePosts));

            } catch (error) {
                console.error("Falha inesperada ao buscar posts:", error);
                setFeedError(error instanceof Error ? error.message : "Um erro desconhecido ocorreu.");
            } finally {
                setIsFeedLoading(false);
            }
        };

        if (user) {
            fetchAllPosts(user);
        } else {
            setIsFeedLoading(false);
            setFeedPosts([]);
        }
    }, [user]);

    const updateUser = (newUserData: User | null) => {
        if (newUserData) {
            setUser(newUserData);
            localStorage.setItem('synapseUser', JSON.stringify(newUserData));
        } else {
            setUser(null);
            localStorage.removeItem('synapseUser');
        }
    };
    
    const updateFeed = (action: { type: 'add' | 'remove'; post?: FeedPost; postId?: string }) => {
        if (action.type === 'add' && action.post) {
            setFeedPosts(prevPosts => [action.post!, ...prevPosts]);
        } else if (action.type === 'remove' && action.postId) {
            setFeedPosts(prevPosts => prevPosts.filter(p => p.id !== action.postId));
        }
    };

    return (
        <UserContext.Provider value={{ user, updateUser, isLoading, isFeedLoading, feedPosts, updateFeed, feedError }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
