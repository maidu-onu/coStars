import React, { useCallback } from 'react';

interface SearchBarProps {
  actor1: string;
  actor2: string;
  isSearching: boolean;
  onActor1Change: (val: string) => void;
  onActor2Change: (val: string) => void;
  onSearch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  actor1, 
  actor2, 
  isSearching, 
  onActor1Change, 
  onActor2Change, 
  onSearch 
}) => {
  
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && actor1 && actor2 && !isSearching) {
      onSearch();
    }
  }, [actor1, actor2, isSearching, onSearch]);

  return (
    <div className="w-full max-w-3xl mx-auto bg-slate-800 p-6 rounded-2xl shadow-2xl border border-slate-700 mb-10">
      <div className="flex flex-col md:flex-row gap-4 items-end md:items-center">
        
        <div className="flex-1 w-full">
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 ml-1">
            First Actor
          </label>
          <input
            type="text"
            value={actor1}
            onChange={(e) => onActor1Change(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="e.g. Robert De Niro"
            className="w-full bg-slate-900 border border-slate-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder-slate-600"
          />
        </div>

        <div className="hidden md:flex items-center justify-center pb-2 text-slate-500 font-bold text-xl">
          &
        </div>
        <div className="md:hidden w-full text-center text-slate-600 text-sm font-bold">
          AND
        </div>

        <div className="flex-1 w-full">
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 ml-1">
            Second Actor
          </label>
          <input
            type="text"
            value={actor2}
            onChange={(e) => onActor2Change(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="e.g. Al Pacino"
            className="w-full bg-slate-900 border border-slate-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all placeholder-slate-600"
          />
        </div>

        <button
          onClick={onSearch}
          disabled={!actor1 || !actor2 || isSearching}
          className={`
            w-full md:w-auto md:self-end px-8 py-3 rounded-lg font-bold text-white shadow-lg transition-all transform
            ${(!actor1 || !actor2 || isSearching) 
              ? 'bg-slate-700 cursor-not-allowed text-slate-500' 
              : 'bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 hover:scale-105 active:scale-95 hover:shadow-indigo-500/25'}
          `}
        >
          {isSearching ? 'Scanning...' : 'Find'}
        </button>
      </div>
    </div>
  );
};

export default SearchBar;