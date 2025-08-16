

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { EyeIcon } from '../components/icons/EyeIcon';
import { EyeOffIcon } from '../components/icons/EyeOffIcon';

const CreateAccountPage: React.FC = () => {
    const navigate = useNavigate();
    const [bgImage, setBgImage] = useState('https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80');

    // State for form fields
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleCreateAccount = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const webhookUrl = "https://pleased-sharply-cheetah.ngrok-free.app/webhook/7a1f7a71-4812-4531-89af-8cf2a863e89d";
        
        try {
            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'ngrok-skip-browser-warning': 'true',
                },
                body: JSON.stringify({ name, username, email, password }),
            });

            if (!response.ok) {
                if (response.status === 400) {
                    throw new Error("uma conta com esse email ja existe");
                }
                // Se o status não for 2xx, bloqueia o acesso e mostra o erro
                throw new Error(`Erro ao criar conta. Status: ${response.status}`);
            }

            // Navigate to the next step of the sign-up process
            navigate('/date-of-birth', {
                state: { name, username, email }
            });

        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Ocorreu um erro desconhecido.";
            console.error("Falha ao enviar para o webhook:", errorMessage);
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
                    <h1 className="text-4xl font-bold">Junte-se ao Synapse</h1>
                    <p className="text-slate-300">Comece hoje sua jornada de autocuidado.</p>
                </header>
                <form className="space-y-4" onSubmit={handleCreateAccount}>
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1">Nome</label>
                        <input 
                            type="text" 
                            id="name" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Seu nome completo" 
                            className="w-full bg-white/20 border border-white/30 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-white text-white placeholder-slate-300 text-sm" 
                            required 
                        />
                    </div>
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-slate-300 mb-1">Nome de usuário</label>
                        <input 
                            type="text" 
                            id="username" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Escolha um nome de usuário" 
                            className="w-full bg-white/20 border border-white/30 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-white text-white placeholder-slate-300 text-sm" 
                            required 
                        />
                    </div>
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
                                placeholder="Crie uma senha forte" 
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
                    {error && <p className="text-red-400 text-sm text-center">{error}</p>}
                    <div className="pt-4">
                         <button 
                            type="submit" 
                            disabled={isLoading}
                            className="w-full bg-white hover:bg-slate-200 text-slate-800 font-bold py-3 px-4 rounded-xl flex items-center justify-center transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                         >
                            {isLoading ? 'Criando...' : 'Criar Conta'}
                        </button>
                    </div>
                </form>
                 <p className="text-center text-sm mt-6 text-slate-300">
                    Já tem uma conta?{' '}
                    <Link to="/login" className="font-bold text-white hover:underline">
                        Faça login
                    </Link>
                </p>
            </div>
        </motion.div>
    );
};

export default CreateAccountPage;
