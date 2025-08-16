import React, { useState, useEffect, useRef, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { createChat } from '../services/gemini';
import type { ChatMessage, Professional } from '../types';
import { SendIcon } from './icons/SendIcon';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import type { Chat } from '@google/genai';

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

interface ProfessionalChatViewProps {
    professional: Professional;
    onClose: () => void;
}

const ProfessionalChatView: React.FC<ProfessionalChatViewProps> = ({ professional, onClose }) => {
    const navigate = useNavigate();
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [chat, setChat] = useState<Chat | null>(null);
    
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        try {
            const initialMessageText = `Olá, eu sou ${professional.name}. Como especialista em ${professional.specialty}, estou aqui para ajudar. Sobre o que você gostaria de conversar?`;
            
            const chatInstance = createChat(true, professional.name, professional.specialty, professional.bio);
            setChat(chatInstance);
            
            setMessages([
                {
                    id: crypto.randomUUID(),
                    text: initialMessageText,
                    sender: 'ai',
                },
            ]);
            setError(null);
        } catch (e: unknown) {
            const errorMessage = e instanceof Error ? e.message : "Ocorreu um erro desconhecido.";
            console.error("A inicialização do chat falhou:", errorMessage);
            setError("O serviço de chat de IA está indisponível. Isso pode ser devido a uma configuração de chave de API ausente.");
        }
    }, [professional]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    const handleSend = async (e: FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        if (!chat) {
             const errorResponse: ChatMessage = {
                id: crypto.randomUUID(),
                text: "Não foi possível conectar ao serviço de chat. Por favor, verifique a sua configuração.",
                sender: 'ai',
            };
            setMessages((prev) => [...prev, errorResponse]);
            return;
        }

        const userInput: ChatMessage = {
            id: crypto.randomUUID(),
            text: input.trim(),
            sender: 'user',
        };

        setMessages((prev) => [...prev, userInput]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await chat.sendMessage({ message: userInput.text });
            const aiResponse: ChatMessage = {
                id: crypto.randomUUID(),
                text: response.text,
                sender: 'ai',
            };
            setMessages((prev) => [...prev, aiResponse]);
        } catch (err) {
            console.error("Erro ao enviar mensagem para o Gemini:", err);
            const errorResponse: ChatMessage = {
                id: crypto.randomUUID(),
                text: "Estou com um pouco de dificuldade para me conectar agora. Por favor, tente novamente em um momento.",
                sender: 'ai',
            };
            setMessages((prev) => [...prev, errorResponse]);
        } finally {
            setIsLoading(false);
        }
    };
    
    const motionProps = {
        initial:"initial",
        animate:"in",
        exit:"out",
        variants:pageVariants,
        transition:pageTransition
    };

    return (
        <motion.div
            {...motionProps}
            className="h-full flex flex-col absolute top-0 left-0 right-0 bottom-0 bg-white dark:bg-slate-900"
        >
            <header className="flex items-center p-4 border-b border-slate-200 dark:border-slate-700 flex-shrink-0">
                <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800" aria-label="Voltar">
                    <ArrowLeftIcon className="h-6 w-6 text-slate-500 dark:text-slate-400" />
                </button>
                <button 
                    onClick={() => navigate(`/professional-details/${professional.id}`)} 
                    className="flex flex-col items-center flex-grow -ml-4 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg p-1 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-300 dark:focus:ring-slate-600"
                    aria-label={`Ver detalhes de ${professional.name}`}
                >
                    <h1 className="text-xl font-bold text-slate-800 dark:text-slate-200">{professional.name}</h1>
                    <p className="text-sm text-blue-500 dark:text-blue-400">{professional.specialty}</p>
                </button>
            </header>
            
            <div className="flex-grow p-4 space-y-4 overflow-y-auto">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-xs md:max-w-md lg:max-w-lg rounded-2xl px-4 py-3 ${
                                msg.sender === 'user'
                                    ? "bg-blue-500 text-white rounded-br-none"
                                    : "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-none"
                            }`}
                        >
                            <p className="text-sm break-words">{msg.text}</p>
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-slate-100 dark:bg-slate-800 text-slate-800 rounded-2xl px-4 py-3 rounded-bl-none">
                           <div className="flex items-center space-x-2">
                                <span className="h-2 w-2 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                <span className="h-2 w-2 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                <span className="h-2 w-2 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce"></span>
                           </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <footer className="p-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-t border-slate-200 dark:border-slate-700 flex-shrink-0">
                <form onSubmit={handleSend} className="flex items-center space-x-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={error ? error : "Digite sua mensagem..."}
                        className="flex-grow bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-full py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 text-slate-800 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm"
                        disabled={isLoading || !!error}
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !input.trim() || !!error}
                        className="bg-blue-500 text-white rounded-full p-3 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        aria-label="Enviar mensagem"
                    >
                        <SendIcon className="h-5 w-5" />
                    </button>
                </form>
            </footer>
        </motion.div>
    );
};

export default ProfessionalChatView;