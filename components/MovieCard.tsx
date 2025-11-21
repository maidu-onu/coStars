import React, { useMemo } from 'react';
import { Movie } from '../types';

interface MovieCardProps {
  movie: Movie;
  actor1Name: string;
  actor2Name: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, actor1Name, actor2Name }) => {
  // Generate a stable random seed based on the title for the placeholder image
  const imageSeed = useMemo(() => {
    let hash = 0;
    for (let i = 0; i < movie.title.length; i++) {
      hash = movie.title.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash);
  }, [movie.title]);

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden shadow-lg hover:shadow-xl hover:border-indigo-500/50 transition-all duration-300 group">
      <div className="relative h-48 overflow-hidden">
         {/* Using picsum with grayscale and blur to make it look like a generic moody movie background since we don't have real posters */}
        <img 
          src={`https://picsum.photos/seed/${imageSeed}/600/300?grayscale`} 
          alt="Movie placeholder" 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-60 group-hover:opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex justify-between items-end">
            <h3 className="text-2xl font-bold text-white leading-tight shadow-black drop-shadow-md">{movie.title}</h3>
            <span className="bg-indigo-600 text-white text-xs px-2 py-1 rounded font-semibold shadow-sm shrink-0 ml-2">
              {movie.year}
            </span>
          </div>
          <p className="text-indigo-300 text-sm font-medium mt-1">{movie.genre}</p>
        </div>
      </div>
      
      <div className="p-5 space-y-4">
        <p className="text-slate-300 text-sm leading-relaxed italic">
          "{movie.description}"
        </p>
        
        <div className="pt-4 border-t border-slate-700/50 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-700/30">
            <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Role: {actor1Name}</p>
            <p className="text-slate-200 font-medium truncate" title={movie.roleActor1}>{movie.roleActor1}</p>
          </div>
          <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-700/30">
            <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Role: {actor2Name}</p>
            <p className="text-slate-200 font-medium truncate" title={movie.roleActor2}>{movie.roleActor2}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;