
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useUser } from '../context/UserContext';
import { ArrowLeftIcon } from '../components/icons/ArrowLeftIcon';
import { CameraIcon } from '../components/icons/CameraIcon';
import { useGoBack } from '../hooks/useGoBack';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};
const pageTransition = { type: 'tween', ease: 'anticipate', duration: 0.5 } as const;

const CreatePage: React.FC = () => {
    const navigate = useNavigate();
    const goBack = useGoBack('/');
    const { user, updateFeed } = useUser();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [mediaPreview, setMediaPreview] = useState<string | null>(null);
    const [mediaType, setMediaType] = useState<'image' | 'video' | null>(null);
    const [title, setTitle] = useState('');
    const [caption, setCaption] = useState('');
    const [isPublishing, setIsPublishing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setError(null); // Limpa erros anteriores
            const fileType = file.type;
            const fileName = file.name.toLowerCase();
            let determinedType: 'image' | 'video' | null = null;

            if (fileType.startsWith('video/')) {
                determinedType = 'video';
            } else if (fileType.startsWith('image/')) {
                determinedType = 'image';
            } else {
                // Fallback para navegadores que podem não fornecer um tipo MIME
                if (/\.(mp4|mov|webm|ogg)$/i.test(fileName)) {
                    determinedType = 'video';
                } else if (/\.(jpg|jpeg|png|gif|webp)$/i.test(fileName)) {
                    determinedType = 'image';
                }
            }

            if (determinedType) {
                setMediaType(determinedType);
                const reader = new FileReader();
                reader.onloadend = () => {
                    setMediaPreview(reader.result as string);
                };
                reader.readAsDataURL(file);
            } else {
                setError("Tipo de arquivo não suportado. Por favor, selecione uma imagem ou um vídeo.");
                setMediaPreview(null);
                setMediaType(null);
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) {
            setError("Usuário não autenticado. Por favor, faça login novamente.");
            return;
        }
        if (!mediaPreview || !title.trim() || !caption.trim() || isPublishing) return;

        setIsPublishing(true);
        setError(null);
        
        const webhookUrl = "http://localhost:5678/webhook-test/cb960ada-ca9d-4358-811b-084743f9c46e";
        const payload: {
            username: string;
            title: string;
            caption: string;
            imagem?: string;
            video?: string;
        } = {
            username: user.handle.startsWith('@') ? user.handle.substring(1) : user.handle,
            title: title.trim(),
            caption: caption.trim(),
        };

        if (mediaType === 'image') {
            payload.imagem = mediaPreview;
        } else if (mediaType === 'video') {
            payload.video = mediaPreview;
        }

        try {
            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'ngrok-skip-browser-warning': 'true',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error(`O webhook falhou com o status: ${response.status}`);
            }

            const newPost = {
                id: crypto.randomUUID(),
                type: 'post' as const,
                author: { name: user.name, handle: user.handle, avatar: user.avatarUrl },
                imageUrl: mediaType === 'image' ? mediaPreview : undefined,
                videoUrl: mediaType === 'video' ? mediaPreview : undefined,
                caption: `${title.trim()}\n${caption.trim()}`,
                likes: 0,
                comments: 0,
            };
            updateFeed({ type: 'add', post: newPost });
            
            navigate('/');

        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Ocorreu um erro ao publicar.";
            setError(errorMessage);
        } finally {
            setIsPublishing(false);
        }
    };

    const canPublish = !!mediaPreview && !!title.trim() && !!caption.trim() && !isPublishing;

    return (
        <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            className="h-full flex flex-col bg-slate-50 dark:bg-slate-950"
        >
            <header className="flex items-center p-4 border-b border-slate-200 dark:border-slate-700 flex-shrink-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-10">
                <button onClick={goBack} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800" aria-label="Voltar">
                    <ArrowLeftIcon className="h-6 w-6 text-slate-500 dark:text-slate-400" />
                </button>
                <h1 className="text-xl font-bold text-slate-800 dark:text-slate-200 mx-auto pr-8">Nova Publicação</h1>
            </header>
             <form onSubmit={handleSubmit} className="flex-grow flex flex-col overflow-y-auto">
                <main className="flex-grow overflow-y-auto p-4 md:p-6 space-y-6">
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*,video/*" className="hidden" />
                    
                    <div className={`w-full max-w-sm mx-auto rounded-lg overflow-hidden transition-all duration-300 aspect-square ${mediaPreview ? '' : 'border-2 border-dashed border-slate-300 dark:border-slate-600'}`}>
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="w-full h-full flex flex-col items-center justify-center text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/50 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                        >
                            {mediaPreview ? (
                                mediaType === 'video' ? (
                                    <video src={mediaPreview} controls className="w-full h-full object-cover" />
                                ) : (
                                    <img src={mediaPreview} alt="Preview" className="w-full h-full object-cover" />
                                )
                            ) : (
                                <>
                                    <CameraIcon className="w-10 h-10 mb-2" />
                                    <span className="font-semibold">Enviar foto ou vídeo</span>
                                    <span className="text-xs">Quadrado (1:1) recomendado</span>
                                </>
                            )}
                        </button>
                    </div>

                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Título</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-slate-800 dark:text-slate-200 text-sm"
                            placeholder="Título da publicação..."
                            required
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="caption" className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Legenda</label>
                        <textarea
                            id="caption"
                            rows={4}
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                            className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-slate-800 dark:text-slate-200 text-sm"
                            placeholder="Escreva algo interessante..."
                            required
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm text-center bg-red-500/10 p-3 rounded-lg">{error}</p>}
                </main>
                <footer className="p-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-t border-slate-200 dark:border-slate-700 flex-shrink-0">
                    <button
                        type="submit"
                        disabled={!canPublish}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                        {isPublishing ? 'Publicando...' : 'Publicar'}
                    </button>
                </footer>
            </form>
        </motion.div>
    );
};

export default CreatePage;
