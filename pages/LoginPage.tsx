

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useUser } from '../context/UserContext';
import { initialUser, feedPosts } from '../constants';
import type { FeedPost } from '../types';
import { EyeIcon } from '../components/icons/EyeIcon';
import { EyeOffIcon } from '../components/icons/EyeOffIcon';

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const { updateUser } = useUser();
    const [bgImage, setBgImage] = useState('https://images.unsplash.com/photo-1506126613408-4e63a5f4bd40?w=800&q=80');
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const webhookUrl = "https://pleased-sharply-cheetah.ngrok-free.app/webhook/7a7fc02b-6f6f-4e06-955e-67665c826269";
        const payload = { email, password };
        
        try {
            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'ngrok-skip-browser-warning': 'true',
                },
                body: JSON.stringify(payload),
            });
            
            if (response.status === 404) {
                throw new Error("A conta não existe.");
            }

            if (!response.ok) {
                throw new Error(`O servidor respondeu com um erro: ${response.statusText} (${response.status})`);
            }
            
            const userDataArray = await response.json();
            
            if (Array.isArray(userDataArray) && userDataArray.length > 0) {
                const userData = userDataArray[0];
                if (userData && userData.nome && userData.usuario && userData.email) {
                    
                    let avatarUrl = userData['imagem de perfil'] || initialUser.avatarUrl;
                    if (typeof avatarUrl === 'string' && avatarUrl.length > 1 && avatarUrl.startsWith('"') && avatarUrl.endsWith('"')) {
                        avatarUrl = avatarUrl.substring(1, avatarUrl.length - 1);
                    }

                    updateUser({
                        name: userData.nome,
                        handle: `@${userData.usuario}`,
                        email: userData.email,
                        avatarUrl: avatarUrl,
                        dob: userData['data de nascimento'],
                        bio: userData.bio || 'Explorando o equilíbrio entre mente e corpo.',
                        followers: userData.followers || 0,
                        following: userData.following || 0,
                    });
                    navigate('/');
                } else {
                     throw new Error("Dados de usuário inválidos recebidos do servidor.");
                }
            } else {
                throw new Error("Resposta inesperada do servidor.");
            }

        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Ocorreu um erro ao tentar entrar.";
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const motionProps = {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.5 },
    };

    return (
        <motion.div 
            {...motionProps}
            className="h-full w-full flex flex-col"
        >
            <div className={`absolute inset-0 z-0 transition-opacity duration-500 ${bgImage ? 'opacity-100' : 'opacity-0'}`} >
                {bgImage && (
                    <>
                        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${bgImage}')` }} />
                        <div className="absolute inset-0 bg-slate-900/70"></div>
                    </>
                )}
            </div>
             <div className={`absolute inset-0 bg-slate-900 z-[-1] transition-opacity duration-500 ${!bgImage ? 'opacity-100' : 'opacity-0'}`} />

            <div className="relative z-10 flex flex-col flex-grow justify-end p-8 text-white">
                <header className="mb-8">
                    <h1 className="text-4xl font-bold">Bem-vindo de Volta</h1>
                    <p className="text-slate-300">Continue sua jornada de bem-estar.</p>
                </header>
                <form className="space-y-4" onSubmit={handleLogin}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="seu.email@exemplo.com" 
                            className="w-full bg-white/20 border border-white/30 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-white text-white placeholder-slate-300 text-sm" 
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-1">Senha</label>
                         <div className="relative">
                            <input 
                                type={showPassword ? 'text' : 'password'}
                                id="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="********" 
                                className="w-full bg-white/20 border border-white/30 rounded-xl py-3 pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-white text-white placeholder-slate-300 text-sm" 
                                required
                            />
                             <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-300 hover:text-white"
                                aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
                            >
                                {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                            </button>
                        </div>
                    </div>
                    {error && <p className="text-red-400 text-sm text-center bg-red-900/50 p-3 rounded-lg">{error}</p>}
                    <div className="text-right">
                        <button type="button" className="text-sm font-medium text-slate-300 hover:text-white">Esqueci minha senha</button>
                    </div>
                    <div className="pt-4">
                         <button 
                            type="submit" 
                            disabled={isLoading}
                            className="w-full bg-white hover:bg-slate-200 text-slate-800 font-bold py-3 px-4 rounded-xl flex items-center justify-center transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                         >
                            {isLoading ? 'Entrando...' : 'Entrar'}
                        </button>
                    </div>
                </form>
                 <p className="text-center text-sm mt-6 text-slate-300">
                    Não tem uma conta?{' '}
                    <Link to="/create-account" className="font-bold text-white hover:underline">
                        Crie uma agora
                    </Link>
                </p>
            </div>
        </motion.div>
    );
};

export default LoginPage;