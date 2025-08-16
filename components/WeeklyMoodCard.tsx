
import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { weeklyMoodData } from '../constants';
import { TrendingUpIcon } from './icons/TrendingUpIcon';

const WeeklyMoodCard: React.FC = () => {
  return (
    <div className="rounded-2xl p-4 border border-slate-200 dark:border-slate-700">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-sm font-medium text-slate-500 dark:text-slate-400">Humor Semanal</h2>
          <p className="text-4xl font-bold text-slate-800 dark:text-slate-200">75%</p>
        </div>
        <div className="flex items-center space-x-1 text-green-500 bg-green-100 dark:bg-green-500/10 dark:text-green-400 rounded-full px-3 py-1 text-sm font-semibold">
          <TrendingUpIcon className="h-4 w-4" />
          <span>10%</span>
        </div>
      </div>
      <div className="h-32">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={weeklyMoodData} margin={{ top: 5, right: 20, left: -20, bottom: -10 }}>
            <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#818cf8" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
                </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(203, 213, 225, 0.5)" className="dark:stroke-slate-700"/>
            <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: 'rgb(100, 115, 139)' }} className="dark:fill-slate-400" dy={5} />
            <YAxis hide={true} domain={[0, 100]} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                border: "1px solid #e2e8f0",
                borderRadius: '0.75rem',
              }}
              labelStyle={{ fontWeight: 'bold', color: '#1e293b' }}
            />
            <Area type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorUv)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WeeklyMoodCard;