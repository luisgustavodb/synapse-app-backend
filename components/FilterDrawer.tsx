
import React, { useState, useMemo, ElementType } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XIcon } from './icons/XIcon';
import { LeafIcon } from './icons/LeafIcon';
import { brazilianStates } from '../constants';

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (state: string) => void;
  onClear: () => void;
}

const MotionDiv = motion.div as ElementType;

const FilterDrawer: React.FC<FilterDrawerProps> = ({ isOpen, onClose, onSelect, onClear }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStates = useMemo(() => {
    return brazilianStates.filter(state =>
      state.label.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const drawerVariants = {
    hidden: { y: '100%' },
    visible: { y: '0%' },
    exit: { y: '100%' },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <MotionDiv
          className="fixed inset-0 bg-slate-900/60 z-50 flex flex-col justify-end"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose}
          aria-modal="true"
        >
          <MotionDiv
            className="bg-slate-50 dark:bg-slate-800 rounded-t-2xl h-[85%] flex flex-col"
            variants={drawerVariants}
            transition={{ type: 'tween', ease: 'easeInOut', duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <header className="p-4 border-b border-slate-200 dark:border-slate-700 flex-shrink-0">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-lg text-slate-800 dark:text-slate-200">Selecionar Região</h2>
                <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700" aria-label="Fechar">
                  <XIcon className="h-6 w-6 text-slate-500 dark:text-slate-400" />
                </button>
              </div>
            </header>

            <div className="p-4 flex-shrink-0">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <LeafIcon className="h-5 w-5 text-slate-400 dark:text-slate-500" />
                </div>
                <input
                    type="search"
                    placeholder="Pesquisar estado..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg py-2.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-slate-800 dark:text-slate-200 text-sm"
                />
              </div>
            </div>

            <main className="flex-grow overflow-y-auto">
              <div className="divide-y divide-slate-200 dark:divide-slate-700">
                <button onClick={onClear} className="w-full text-left px-4 py-3 font-semibold text-indigo-600 dark:text-indigo-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                  Todas as Regiões
                </button>
                {filteredStates.map(state => (
                  <button
                    key={state.value}
                    onClick={() => onSelect(state.value)}
                    className="w-full text-left px-4 py-3 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  >
                    {state.label}
                  </button>
                ))}
              </div>
            </main>
          </MotionDiv>
        </MotionDiv>
      )}
    </AnimatePresence>
  );
};

export default FilterDrawer;