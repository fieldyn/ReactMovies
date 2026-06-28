import type { Movie } from "../types";

export const API_BASE_URL = "https://api.themoviedb.org/3";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const API_OPTIONS: RequestInit = {
  method: "GET",
  headers: {
    accept: "application/json",
    authorization: `Bearer ${API_KEY}`,
  },
};

// Helper generico: pega a un path de TMDB y devuelve la lista de resultados.
export async function fetchMoviesFrom(path: string): Promise<Movie[]> {
  const response = await fetch(`${API_BASE_URL}${path}`, API_OPTIONS);
  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }
  const data = await response.json();
  return data.results ?? [];
}
