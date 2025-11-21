import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="w-full py-8 text-center space-y-2 px-4">
      <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400 drop-shadow-sm">
        Co-Star Finder
      </h1>
      <p className="text-slate-400 text-sm md:text-base max-w-md mx-auto">
        Enter two actors to discover the cinematic universe they share. Powered by Gemini AI.
      </p>
    </header>
  );
};

export default Header;