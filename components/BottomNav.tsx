import React from 'react';
import { NavLink } from 'react-router-dom';
import type { NavItem } from '../types';
import { HomeIcon } from './icons/HomeIcon';
import { AccountIcon } from './icons/AccountIcon';
import { LeafIcon } from './icons/LeafIcon';
import { UsersGroupIcon } from './icons/UsersGroupIcon';
import { ChatIcon } from './icons/ChatIcon';

const navItems: NavItem[] = [
  { path: '/', label: 'Início', Icon: HomeIcon },
  { path: '/academy', label: 'Explorar', Icon: LeafIcon },
  { path: '/chat', label: 'Chat IA', Icon: ChatIcon },
  { path: '/psychologists', label: 'Especialistas', Icon: UsersGroupIcon },
  { path: '/account', label: 'Conta', Icon: AccountIcon },
];

const BottomNav: React.FC = () => {
  
  const activeLink = 'text-indigo-600 dark:text-sky-400';
  const inactiveLink = 'text-slate-500 dark:text-slate-400';

  return (
    <nav className="flex-shrink-0 w-full h-16 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-t border-slate-200 dark:border-slate-700 md:hidden">
      <div className="flex justify-around items-center h-full">
        {navItems.map(({ path, label, Icon }) => {
          return (
            <NavLink
              key={path}
              to={path}
              end={path === '/'}
              aria-label={label}
              className={({ isActive }) => 
                `flex items-center justify-center transition-all duration-200 transform ${isActive ? activeLink : inactiveLink} hover:text-indigo-500 dark:hover:text-sky-400`
              }
            >
              <Icon className="h-7 w-7" />
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;