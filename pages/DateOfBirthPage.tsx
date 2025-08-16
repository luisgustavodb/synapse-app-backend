

import React, { useState, useMemo } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const DateOfBirthPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const userData = location.state;

    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [bgImage] = useState('https://images.unsplash.com/photo-1594122230689-45899d9e6f69?w=800&q=80');

    const days = useMemo(() => Array.from({ length: 31 }, (_, i) => i + 1), []);
    const months = useMemo(() => [
        { value: '01', label: 'Janeiro' }, { value: '02', label: 'Fevereiro' },
        { value: '03', label: 'Março' }, { value: '04', label: 'Abril' },
        { value: '05', label: 'Maio' }, { value: '06', label: 'Junho' },
        { value: '07', label: 'Julho' }, { value: '08', label: 'Agosto' },
        { value: '09', label: 'Setembro' }, { value: '10', label: 'Outubro' },
        { value: '11', label: 'Novembro' }, { value: '12', label: 'Dezembro' },
    ], []);
    const years = useMemo(() => {
        const currentYear = new Date().getFullYear();
        const maxYear = currentYear - 10; // Os usuários devem ter pelo menos 10 anos
        return Array.from({ length: 100 }, (_, i) => maxYear - i);
    }, []);

    const isFormValid = day && month && year;

    const handleContinue = (e: React.FormEvent) => {
        e.preventDefault();
        if (!isFormValid) return;
        
        const formattedDay = day.padStart(2, '0');
        const dob = `${formattedDay}/${month}/${year}`;
        
        navigate('/profile-picture', {
            state: { ...userData, dob }
        });
    };
    
    // If user lands here directly without coming from create-account page
    if (!userData || !userData.email) {
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
                        <h1 className="text-3xl font-bold">Qual sua data de nascimento?</h1>
                        <p className="text-slate-300 mt-2">Isso não será exibido publicamente.</p>
                    </header>
                    <form className="space-y-4" onSubmit={handleContinue}>
                        <div className="flex justify-between space-x-3">
                            <div className="flex-1">
                                <label htmlFor="day" className="block text-sm font-medium text-slate-300 mb-1 text-left">Dia</label>
                                <select id="day" value={day} onChange={e => setDay(e.target.value)} className="w-full bg-white/20 border border-white/30 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-white text-white text-sm [color-scheme:dark]">
                                    <option value="" disabled className="text-slate-800">Dia</option>
                                    {days.map(d => <option key={d} value={d} className="text-slate-800">{d}</option>)}
                                </select>
                            </div>
                            <div className="flex-1">
                                <label htmlFor="month" className="block text-sm font-medium text-slate-300 mb-1 text-left">Mês</label>
                                <select id="month" value={month} onChange={e => setMonth(e.target.value)} className="w-full bg-white/20 border border-white/30 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-white text-white text-sm [color-scheme:dark]">
                                    <option value="" disabled className="text-slate-800">Mês</option>
                                    {months.map(m => <option key={m.value} value={m.value} className="text-slate-800">{m.label}</option>)}
                                </select>
                            </div>
                            <div className="flex-1">
                                <label htmlFor="year" className="block text-sm font-medium text-slate-300 mb-1 text-left">Ano</label>
                                <select id="year" value={year} onChange={e => setYear(e.target.value)} className="w-full bg-white/20 border border-white/30 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-white text-white text-sm [color-scheme:dark]">
                                    <option value="" disabled className="text-slate-800">Ano</option>
                                    {years.map(y => <option key={y} value={y} className="text-slate-800">{y}</option>)}
                                </select>
                            </div>
                        </div>
                        <div className="pt-4">
                            <button type="submit" disabled={!isFormValid} className="w-full bg-white hover:bg-slate-200 text-slate-800 font-bold py-3 px-4 rounded-xl flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                                Continuar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </motion.div>
    );
};

export default DateOfBirthPage;