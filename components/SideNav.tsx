import React from 'react';
import { NavLink } from 'react-router-dom';
import type { NavItem } from '../types';
import { HomeIcon } from './icons/HomeIcon';
import { ChatIcon } from './icons/ChatIcon';
import { AccountIcon } from './icons/AccountIcon';
import { LeafIcon } from './icons/LeafIcon';
import { UsersGroupIcon } from './icons/UsersGroupIcon';

const navItems: NavItem[] = [
  { path: '/', label: 'Início', Icon: HomeIcon },
  { path: '/academy', label: 'Explorar', Icon: LeafIcon },
  { path: '/chat', label: 'Chat IA', Icon: ChatIcon },
  { path: '/psychologists', label: 'Especialistas', Icon: UsersGroupIcon },
  { path: '/account', label: 'Conta', Icon: AccountIcon },
];

const SideNav: React.FC = () => {
  const activeLink = 'bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-sky-400';
  const inactiveLink = 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-slate-200';

  return (
    <nav className="hidden md:flex flex-col w-64 flex-shrink-0 p-4 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
      <div className="text-2xl font-bold text-slate-800 dark:text-slate-200 tracking-tighter mb-6 p-2">
        Synapse
      </div>
      <div className="flex flex-col space-y-2">
        {navItems.map(({ path, label, Icon }) => (
          <NavLink
            key={path}
            to={path}
            end={path === '/'}
            className={({ isActive }) => 
              `flex items-center space-x-3 rounded-lg p-3 transition-colors duration-200 ${isActive ? activeLink : inactiveLink}`
            }
          >
            <Icon className="h-6 w-6" />
            <span className="font-semibold">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default SideNav;