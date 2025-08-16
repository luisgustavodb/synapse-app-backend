

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import type { User, FeedPost } from '../types';
import { feedPosts } from '../constants';

interface UserContextType {
    user: User | null;
    updateUser: (newUserData: User | null) => void;
    isLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

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
        const fetchUserPosts = async (currentUser: User) => {
            if (!currentUser.handle) return;
            
            const username = currentUser.handle.startsWith('@') ? currentUser.handle.substring(1) : currentUser.handle;
            const postsWebhookUrl = "https://pleased-sharply-cheetah.ngrok-free.app/webhook/a2c9af17-2ce8-4a52-a3aa-075d64d9ab50";
            
            try {
                const postsResponse = await fetch(postsWebhookUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'ngrok-skip-browser-warning': 'true',
                    },
                    body: JSON.stringify({ username }),
                });

                if (postsResponse.ok) {
                    const contentType = postsResponse.headers.get("content-type");
                    if (contentType && contentType.includes("application/json")) {
                        const userPostsData: any[] = await postsResponse.json();
                        if(Array.isArray(userPostsData)) {
                            userPostsData.sort((a, b) => b.id - a.id);

                            const mappedPosts: FeedPost[] = userPostsData.map(p => {
                                let imageUrl = p.imagem;
                                // Sanitize the image URL which might be a double-stringified JSON from the backend
                                if (typeof imageUrl === 'string' && imageUrl.length > 1 && imageUrl.startsWith('"') && imageUrl.endsWith('"')) {
                                    imageUrl = imageUrl.substring(1, imageUrl.length - 1);
                                }
                                return {
                                    id: p.id.toString(),
                                    author: {
                                        name: currentUser.name,
                                        handle: currentUser.handle,
                                        avatar: currentUser.avatarUrl,
                                    },
                                    imageUrl: imageUrl,
                                    caption: `${p.titulo}\n${p.descrição}`,
                                    likes: Math.floor(Math.random() * 1000),
                                    comments: Math.floor(Math.random() * 100),
                                    type: 'post',
                                };
                            });

                            feedPosts.length = 0; // Clear existing posts
                            feedPosts.push(...mappedPosts);
                        }
                    } else {
                        const text = await postsResponse.text();
                        console.error("Received non-JSON response from posts webhook:", text);
                    }
                } else {
                     console.error("User posts webhook returned an error:", postsResponse.statusText);
                }
            } catch (postsError) {
                 console.error("Could not fetch user posts from webhook.", postsError);
            }
        };

        if (user) {
            fetchUserPosts(user);
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

    return (
        <UserContext.Provider value={{ user, updateUser, isLoading }}>
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