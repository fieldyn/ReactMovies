import type { Models } from "appwrite";

// Una fila de la table de Appwrite con nuestros campos propios.
export type TrendingMovie = Models.Row & {
  searchTerm: string;
  count: number;
  movie_id: number;
  poster_url: string;
};
