

import React, { useState, useRef } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useUser } from '../context/UserContext';
import { CameraIcon } from '../components/icons/CameraIcon';

const ProfilePicturePage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { updateUser } = useUser();
    const userData = location.state;

    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [bgImage] = useState('https://images.unsplash.com/photo-1506126613408-4e63a5f4bd40?w=800&q=80');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };
    
    const handleFinish = async () => {
        if (isLoading) return;
        setIsLoading(true);
        setError(null);

        const webhookUrl = "https://pleased-sharply-cheetah.ngrok-free.app/webhook/f9469aa1-0c31-4a13-a568-cdf2edf81081";
        const avatarUrl = imagePreview || 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png';

        const payload = {
            email: userData.email,
            dateOfBirth: userData.dob,
            photo: avatarUrl, // sending the full base64 data URI
        };

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
                throw new Error(`Webhook failed with status: ${response.status}`);
            }

            // All steps complete, update user context and log in
            updateUser({
                name: userData.name,
                handle: `@${userData.username}`,
                email: userData.email,
                avatarUrl: avatarUrl,
                dob: userData.dob,
                bio: 'Novo membro da comunidade Synapse!',
                followers: 0,
                following: 0,
            });
            
            navigate('/');

        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Ocorreu um erro ao finalizar.";
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    if (!userData || !userData.email || !userData.dob) {
        return <Navigate to="/create-account" replace />;
    }

    const motionProps = {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.5 },
    };

    return (
        <motion.div {...motionProps} className="h-full w-full flex flex-col">
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${bgImage}')` }} />
                <div className="absolute inset-0 bg-slate-900/70"></div>
            </div>
            <div className="relative z-10 flex flex-col flex-grow justify-center items-center p-8 text-white text-center">
                <div className="bg-slate-900/50 backdrop-blur-md p-8 rounded-2xl max-w-sm w-full">
                    <header className="mb-8">
                        <h1 className="text-3xl font-bold">Adicione uma foto de perfil</h1>
                        <p className="text-slate-300 mt-2">Isso ajuda as pessoas a reconhecerem você.</p>
                    </header>
                    <div className="space-y-6">
                         <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" className="hidden" />
                         <button 
                            type="button" 
                            onClick={() => fileInputRef.current?.click()}
                            className="w-40 h-40 mx-auto rounded-full overflow-hidden bg-white/20 border-2 border-dashed border-white/50 flex items-center justify-center hover:bg-white/30 transition-colors"
                            aria-label="Escolher foto de perfil"
                        >
                            {imagePreview ? (
                                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                                <CameraIcon className="w-16 h-16 text-white/50" />
                            )}
                        </button>
                        <button type="button" onClick={() => fileInputRef.current?.click()} className="w-full bg-white/20 hover:bg-white/30 text-white font-bold py-3 px-4 rounded-xl transition-colors">
                            {imagePreview ? 'Trocar Foto' : 'Enviar Foto'}
                        </button>
                        {error && <p className="text-red-400 text-sm">{error}</p>}
                        <div className="pt-2 space-y-3">
                             <button type="button" onClick={handleFinish} disabled={isLoading} className="w-full bg-white hover:bg-slate-200 text-slate-800 font-bold py-3 px-4 rounded-xl flex items-center justify-center transition-colors disabled:opacity-50">
                                {isLoading ? 'Finalizando...' : 'Finalizar'}
                            </button>
                             <button type="button" onClick={handleFinish} disabled={isLoading} className="text-sm text-slate-300 hover:text-white">
                                Pular por enquanto
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ProfilePicturePage;
