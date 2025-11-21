export interface Movie {
  title: string;
  year: number;
  roleActor1: string;
  roleActor2: string;
  description: string;
  genre: string;
}

export interface SearchState {
  actor1: string;
  actor2: string;
  movies: Movie[];
  isLoading: boolean;
  error: string | null;
  hasSearched: boolean;
}