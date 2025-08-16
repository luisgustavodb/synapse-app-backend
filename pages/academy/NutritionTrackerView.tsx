
import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { dailyWater, weeklyWaterData, weeklyCaloriesBurnedData, dailyNutrition, macros, meals } from '../../constants';
import CalorieTrackerRing from '../../components/CalorieTrackerRing';
import MacroProgressBar from '../../components/MacroProgressBar';
import MealCard from '../../components/MealCard';
import { WaterDropIcon } from '../../components/icons/WaterDropIcon';
import { FireIcon } from '../../components/icons/FireIcon';

const ChartCard: React.FC<{
    title: string,
    Icon: React.FC<any>,
    iconBgColor: string,
    value: string,
    label: string,
    children: React.ReactNode
}> = ({ title, Icon, iconBgColor, value, label, children }) => (
    <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm">
        <div className="flex items-center space-x-3 mb-3">
            <div className={`p-2 rounded-lg ${iconBgColor}`}>
                <Icon className="w-5 h-5 text-white" />
            </div>
            <div>
                <p className="font-semibold text-slate-500 dark:text-slate-400 text-sm">{title}</p>
                <p className="font-bold text-slate-800 dark:text-slate-200 text-lg">{value} <span className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</span></p>
            </div>
        </div>
        <div className="h-28">
            {children}
        </div>
    </div>
);


const NutritionTrackerView: React.FC = () => {
    return (
        <div className="bg-slate-50 dark:bg-slate-950 p-6 pt-2 space-y-6 pb-24">
            
            <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ChartCard 
                    title="Hidratação"
                    Icon={WaterDropIcon}
                    iconBgColor="bg-sky-500"
                    value={`${dailyWater.consumed.toFixed(1)}L`}
                    label={`/ ${dailyWater.goal.toFixed(1)}L`}
                >
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={weeklyWaterData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                            <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: 'rgb(100, 115, 139)' }} className="dark:fill-slate-400" dy={5} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'rgb(100, 115, 139)' }} className="dark:fill-slate-400" />
                            <Tooltip cursor={{fill: 'rgba(239, 246, 255, 0.7)'}} contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', border: "1px solid #e2e8f0", borderRadius: '0.75rem' }} />
                            <Bar dataKey="liters" name="Litros" fill="#38bdf8" radius={[4, 4, 0, 0]} barSize={12} />
                        </BarChart>
                    </ResponsiveContainer>
                </ChartCard>

                 <ChartCard 
                    title="Calorias Gastas"
                    Icon={FireIcon}
                    iconBgColor="bg-orange-500"
                    value={dailyNutrition.burned.toLocaleString()}
                    label="kcal"
                >
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={weeklyCaloriesBurnedData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                            <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: 'rgb(100, 115, 139)' }} className="dark:fill-slate-400" dy={5} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'rgb(100, 115, 139)' }} className="dark:fill-slate-400" />
                            <Tooltip cursor={{fill: 'rgba(239, 246, 255, 0.7)'}} contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', border: "1px solid #e2e8f0", borderRadius: '0.75rem' }} />
                            <Bar dataKey="calories" name="Kcal" fill="#f97316" radius={[4, 4, 0, 0]} barSize={12} />
                        </BarChart>
                    </ResponsiveContainer>
                </ChartCard>
            </section>
            
            <section className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm">
                 <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-4 text-center">Calorias e Macros</h2>
                <CalorieTrackerRing nutrition={dailyNutrition} />
                <div className="space-y-3 mt-4">
                    {macros.map(macro => (
                        <MacroProgressBar key={macro.name} macro={macro} />
                    ))}
                </div>
            </section>

             <section>
                <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-3">Refeições</h2>
                <div className="space-y-3">
                    {meals.map(meal => (
                        <MealCard key={meal.id} meal={meal} />
                    ))}
                </div>
            </section>

        </div>
    );
};

export default NutritionTrackerView;
