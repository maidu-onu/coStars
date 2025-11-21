import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import MovieCard from './components/MovieCard';
import LoadingSpinner from './components/LoadingSpinner';
import { findCommonMovies } from './services/geminiService';
import { Movie } from './types';

const App: React.FC = () => {
  const [actor1, setActor1] = useState('');
  const [actor2, setActor2] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  // Keep track of the searched names to display consistently even if input changes
  const [searchedActors, setSearchedActors] = useState({ a1: '', a2: '' });

  const handleSearch = useCallback(async () => {
    if (!actor1.trim() || !actor2.trim()) return;

    setIsLoading(true);
    setError(null);
    setMovies([]);
    setHasSearched(true);
    setSearchedActors({ a1: actor1, a2: actor2 });

    try {
      const results = await findCommonMovies(actor1, actor2);
      setMovies(results);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  }, [actor1, actor2]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-20">
      {/* Background Pattern */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20" 
           style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #1e1b4b 0%, #0f172a 100%)' }}>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 max-w-5xl">
        <Header />
        
        <div className="sticky top-4 z-50">
            <SearchBar 
            actor1={actor1}
            actor2={actor2}
            isSearching={isLoading}
            onActor1Change={setActor1}
            onActor2Change={setActor2}
            onSearch={handleSearch}
            />
        </div>

        {error && (
          <div className="bg-red-900/30 border border-red-500/50 text-red-200 px-6 py-4 rounded-xl text-center max-w-2xl mx-auto mb-8 animate-bounce-in">
            <p className="font-semibold">Error</p>
            <p className="text-sm opacity-90">{error}</p>
          </div>
        )}

        {isLoading && <LoadingSpinner />}

        {!isLoading && hasSearched && movies.length === 0 && !error && (
          <div className="text-center py-20 bg-slate-900/50 rounded-2xl border border-dashed border-slate-700 mx-auto max-w-2xl">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-slate-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
            </svg>
            <h2 className="text-xl font-semibold text-slate-300 mb-2">No collaborations found</h2>
            <p className="text-slate-500">
              It seems <span className="text-indigo-400 font-medium">{searchedActors.a1}</span> and <span className="text-cyan-400 font-medium">{searchedActors.a2}</span> haven't starred in a feature film together yet.
            </p>
          </div>
        )}

        {!isLoading && movies.length > 0 && (
          <div className="animate-fade-in">
             <div className="mb-6 flex items-center justify-between">
               <h2 className="text-xl font-semibold text-slate-300">
                 Found <span className="text-white font-bold">{movies.length}</span> movie{movies.length !== 1 && 's'}
               </h2>
               <div className="h-px bg-slate-800 flex-1 ml-6"></div>
             </div>
             
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {movies.map((movie, index) => (
                <MovieCard 
                  key={`${movie.title}-${movie.year}-${index}`} 
                  movie={movie}
                  actor1Name={searchedActors.a1}
                  actor2Name={searchedActors.a2}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;