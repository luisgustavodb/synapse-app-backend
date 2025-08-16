



import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useUser } from '../../context/UserContext';
import { ArrowLeftIcon } from '../../components/icons/ArrowLeftIcon';
import { useGoBack } from '../../hooks/useGoBack';

const pageVariants = {
  initial: { opacity: 0 },
  in: { opacity: 1 },
  out: { opacity: 0 },
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5,
} as const;

const formatDateOfBirth = (dob: string | undefined): string => {
    if (!dob) return 'Não informado';
    const parts = dob.split('/');
    if (parts.length !== 3) return dob;
    
    const [day, month, year] = parts;
    const date = new Date(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10));
    
    if (isNaN(date.getTime())) return dob;

    return new Intl.DateTimeFormat('pt-BR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(date);
};


const PersonalInfoPage: React.FC = () => {
  const navigate = useNavigate();
  const goBack = useGoBack('/account');
  const { user, updateUser } = useUser();

  const [name, setName] = useState(user?.name || '');
  // Store username without the '@' prefix
  const [username, setUsername] = useState(user?.handle ? user.handle.substring(1) : '');
  const [avatar, setAvatar] = useState(user?.avatarUrl || '');
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (user) {
        setName(user.name);
        setUsername(user.handle.startsWith('@') ? user.handle.substring(1) : user.handle);
        setAvatar(user.avatarUrl);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      const currentFullHandle = `@${username.trim()}`;
      const originalHandle = user.handle || '';
      const changed = name.trim() !== user.name || currentFullHandle !== originalHandle || avatar !== user.avatarUrl;
      setHasChanges(changed);
    }
  }, [name, username, avatar, user]);
  
  if (!user) {
    return null; // Or a loading spinner, or redirect
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
              setAvatar(reader.result as string);
          };
          reader.readAsDataURL(file);
      }
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Allow only letters, numbers, underscores, and periods
    const sanitizedValue = e.target.value.replace(/[^a-zA-Z0-9_.]/g, '');
    setUsername(sanitizedValue);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasChanges || isSaving) return;
    setIsSaving(true);

    const trimmedName = name.trim();
    const trimmedUsername = username.trim();
    const fullHandle = `@${trimmedUsername}`;

    const webhookUrl = "https://pleased-sharply-cheetah.ngrok-free.app/webhook/63cd349c-be5e-42f0-9a93-c134829bc567";
    const payload = {
      name: trimmedName,
      username: trimmedUsername, // without the '@'
      email: user.email,
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

      // Update local context after successful webhook call
      updateUser({ ...user, name: trimmedName, handle: fullHandle, avatarUrl: avatar });
      
      // Navigate away
      navigate('/account');

    } catch (error) {
        console.error("Failed to send update to webhook:", error);
        // Optionally, show an error message to the user here
    } finally {
        setIsSaving(false);
    }
  };
  
  const motionProps = {
      initial:"initial",
      animate:"in",
      exit:"out",
      variants:pageVariants,
      transition:pageTransition
  };

  const renderAvatar = () => {
    return <img src={avatar} alt="Avatar" className="w-24 h-24 rounded-full object-cover shadow-md" />;
  }

  return (
    <motion.div
      {...motionProps}
      className="h-full flex flex-col bg-white dark:bg-slate-900"
    >
      <header className="flex items-center p-4 border-b border-slate-200 dark:border-slate-700 flex-shrink-0">
        <button onClick={goBack} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800" aria-label="Voltar">
          <ArrowLeftIcon className="h-6 w-6 text-slate-500 dark:text-slate-400" />
        </button>
        <h1 className="text-xl font-bold text-slate-800 dark:text-slate-200 mx-auto pr-8">Informações Pessoais</h1>
      </header>
      <main className="flex-grow overflow-y-auto p-6 space-y-6">
        <div className="flex flex-col items-center space-y-4">
            <div className="relative">
                {renderAvatar()}
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleAvatarChange}
                    accept="image/*"
                    hidden
                />
                <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute -bottom-1 -right-1 bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-900 rounded-full h-7 w-7 flex items-center justify-center hover:opacity-80 transition-opacity" 
                    aria-label="Alterar foto do perfil"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L14.732 3.732z" />
                    </svg>
                </button>
            </div>
        </div>
        
        <form className="space-y-4" onSubmit={handleSave}>
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Nome</label>
                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-slate-500 text-slate-800 dark:text-slate-200 text-sm" />
            </div>
            <div>
                <label htmlFor="username" className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Nome de usuário</label>
                <div className="flex items-center w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl focus-within:ring-2 focus-within:ring-slate-400 dark:focus-within:ring-slate-500 transition-all duration-200">
                    <span className="pl-4 text-slate-500 dark:text-slate-400 text-sm">@</span>
                    <input 
                        type="text" 
                        id="username" 
                        value={username} 
                        onChange={handleUsernameChange} 
                        className="w-full bg-transparent py-3 px-1 focus:outline-none text-slate-800 dark:text-slate-200 text-sm" 
                    />
                </div>
            </div>
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Email</label>
                <input type="email" id="email" value={user.email || ''} readOnly className="w-full bg-slate-200 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-xl py-3 px-4 text-slate-800 dark:text-slate-300 text-sm cursor-not-allowed" />
            </div>
             <div>
                <label htmlFor="dob" className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Data de Nascimento</label>
                <input type="text" id="dob" value={formatDateOfBirth(user.dob)} readOnly className="w-full bg-slate-200 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-xl py-3 px-4 text-slate-800 dark:text-slate-300 text-sm cursor-not-allowed" />
            </div>
            <div className="pt-4">
                 <button 
                    type="submit" 
                    className="w-full bg-slate-800 dark:bg-slate-200 hover:bg-slate-700 dark:hover:bg-slate-300 text-white dark:text-slate-900 font-bold py-3 px-4 rounded-xl flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!hasChanges || isSaving}
                 >
                    {isSaving ? 'Salvando...' : 'Salvar Alterações'}
                </button>
            </div>
        </form>
      </main>
    </motion.div>
  );
};

export default PersonalInfoPage;
