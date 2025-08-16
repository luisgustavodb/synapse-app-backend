
import React, { useRef, useState } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { groupClasses } from '../../constants';
import { FireIcon } from '../../components/icons/FireIcon';
import { CalendarPlusIcon } from '../../components/icons/CalendarPlusIcon';
import { createIcsFile } from '../../utils/calendar';
import type { GroupClass } from '../../types';

const PLACEHOLDER_IMAGE_URL = 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&q=80';

const parseClassTime = (timeStr: string): Date => {
    const now = new Date();
    const [dayPart, timePart] = timeStr.split(', ');
    const hour = parseInt(timePart.replace('H', ''), 10);

    const date = new Date();
    date.setHours(hour, 0, 0, 0);

    if (dayPart === 'AMANHÃ') {
        date.setDate(now.getDate() + 1);
    } else if (dayPart !== 'HOJE') {
        const daysOfWeek = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'];
        const targetDayIndex = daysOfWeek.indexOf(dayPart.substring(0, 3).toUpperCase());
        const currentDayIndex = now.getDay();
        if (targetDayIndex !== -1) {
            let dayDiff = targetDayIndex - currentDayIndex;
            if (dayDiff <= 0) { // If it's today or a past day of the week, assume next week
                dayDiff += 7;
            }
            date.setDate(now.getDate() + dayDiff);
        }
    }
    
    return date;
};

const AcademyView: React.FC = () => {
    const newVideos = [
        { id: 'total-workout', title: 'Queima total - Treino completo', description: 'Intensivo - 30 min', imageUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&q=80' },
        { id: 'strong-training', title: 'Strong - Treino de força', description: 'Iniciante - 15 min', imageUrl: 'https://images.unsplash.com/photo-1584735935682-2f2b62d0a520?w=400&q=80' },
    ];
  
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!scrollContainerRef.current) return;
        setIsDragging(true);
        setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
        setScrollLeft(scrollContainerRef.current.scrollLeft);
        scrollContainerRef.current.classList.add('cursor-grabbing');
    };

    const onMouseLeave = () => {
        if (!scrollContainerRef.current || !isDragging) return;
        setIsDragging(false);
        scrollContainerRef.current.classList.remove('cursor-grabbing');
    };

    const onMouseUp = () => {
        if (!scrollContainerRef.current) return;
        setIsDragging(false);
        scrollContainerRef.current.classList.remove('cursor-grabbing');
    };

    const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isDragging || !scrollContainerRef.current) return;
        e.preventDefault();
        const x = e.pageX - scrollContainerRef.current.offsetLeft;
        const walk = (x - startX) * 2;
        scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleAddToCalendar = (e: React.MouseEvent, groupClass: GroupClass) => {
        e.preventDefault();
        e.stopPropagation();
        const startTime = parseClassTime(groupClass.time);
        const durationMinutes = parseInt(groupClass.duration, 10);
        if (isNaN(durationMinutes)) {
            console.error("Invalid duration format:", groupClass.duration);
            return;
        }
        const endTime = new Date(startTime.getTime() + durationMinutes * 60000);
        createIcsFile(groupClass.title, groupClass.description, startTime, endTime);
    };

    return (
        <div className="bg-white dark:bg-slate-900 min-h-full pb-24">
            <div className="pt-6 space-y-8">
                <div className="px-6">
                    <section>
                        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-3">Novos Vídeos</h2>
                        <div className="space-y-3">
                            {newVideos.map(video => (
                                <ReactRouterDOM.Link to={`/detail/activity/${video.id}`} key={video.id} className="flex items-center space-x-4 p-3 bg-slate-100/70 dark:bg-slate-800/70 rounded-xl hover:bg-slate-200/70 dark:hover:bg-slate-700/70 transition-colors">
                                    <img src={video.imageUrl} alt={video.title} className="w-20 h-20 rounded-lg object-cover" />
                                    <div className="flex-1">
                                        <p className="font-bold text-slate-800 dark:text-slate-200">{video.title}</p>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">{video.description}</p>
                                    </div>
                                </ReactRouterDOM.Link>
                            ))}
                        </div>
                    </section>
                </div>

                <div className="px-6">
                    <section>
                         <ReactRouterDOM.Link to="/workouts" className="block relative rounded-xl overflow-hidden h-44 group">
                            <img src={PLACEHOLDER_IMAGE_URL} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" alt="Mulher se alongando"/>
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent flex flex-col justify-end p-4">
                                <div className="absolute top-4 left-4 bg-orange-400 p-2 rounded-full">
                                    <FireIcon className="w-4 h-4 text-black"/>
                                </div>
                                <div>
                                    <p className="font-bold text-sm uppercase text-white tracking-wider">Academia Synapse</p>
                                    <p className="font-bold text-2xl uppercase text-white">EXPLORE OS TREINOS</p>
                                </div>
                            </div>
                        </ReactRouterDOM.Link>
                    </section>
                </div>
                
                <section className="space-y-3 w-full">
                     <div className="flex justify-between items-center mb-1 px-6">
                         <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200">Aulas Coletivas</h2>
                         <ReactRouterDOM.Link to="/group-classes" className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500">Ver todas</ReactRouterDOM.Link>
                    </div>
                    <div
                        ref={scrollContainerRef}
                        className="overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing"
                        onMouseDown={onMouseDown}
                        onMouseLeave={onMouseLeave}
                        onMouseUp={onMouseUp}
                        onMouseMove={onMouseMove}
                    >
                        <div className="flex space-x-4 px-6 pb-2 snap-x snap-mandatory select-none">
                            {groupClasses.slice(0, 5).map(item => (
                                <ReactRouterDOM.Link to={`/group-class/${item.id}`} key={item.id} draggable="false" className="flex-shrink-0 w-64 bg-slate-100/70 dark:bg-slate-800 rounded-xl overflow-hidden group snap-start transition-shadow hover:shadow-md">
                                    <div className="h-36 relative">
                                        <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                                        <button 
                                            onClick={(e) => handleAddToCalendar(e, item)}
                                            className="absolute top-2 right-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-900 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all"
                                            aria-label="Adicionar ao calendário"
                                        >
                                            <CalendarPlusIcon className="w-5 h-5" />
                                        </button>
                                    </div>
                                    <div className="p-3">
                                        <p className="font-semibold text-slate-800 dark:text-slate-200 mt-1 line-clamp-1">{item.title}</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">{item.time}</p>
                                    </div>
                                </ReactRouterDOM.Link>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default AcademyView;
