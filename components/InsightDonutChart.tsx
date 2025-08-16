
import React from 'react';
import { ResponsiveContainer, RadialBarChart, RadialBar, PolarAngleAxis } from 'recharts';
import type { Insight } from '../types';

interface InsightDonutChartProps {
    insight: Insight;
}

const InsightDonutChart: React.FC<InsightDonutChartProps> = ({ insight }) => {
    const data = [{ name: insight.title, value: insight.value, fill: insight.color }];

    return (
        <div className="rounded-2xl p-3 border border-slate-200 dark:border-slate-700 flex flex-col items-center text-center h-full">
            <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">{insight.title}</h3>
            <div className="w-full h-24 relative">
                <ResponsiveContainer width="100%" height="100%">
                    <RadialBarChart 
                        innerRadius="70%" 
                        outerRadius="85%" 
                        data={data} 
                        startAngle={90} 
                        endAngle={-270}
                        barSize={10}
                    >
                        <PolarAngleAxis
                          type="number"
                          domain={[0, 100]}
                          angleAxisId={0}
                          tick={false}
                        />
                        <RadialBar
                          background={{ fill: '#f1f5f9' }}
                          dataKey="value"
                          cornerRadius={5}
                          className="dark:fill-slate-700"
                        />
                    </RadialBarChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center">
                     <span className="text-2xl font-bold" style={{color: insight.color}}>
                        {insight.value}%
                    </span>
                </div>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{insight.label}</p>
        </div>
    );
};

export default InsightDonutChart;