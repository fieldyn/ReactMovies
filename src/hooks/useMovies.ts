import { useEffect, useState } from "react";
import type { Movie } from "../types";
import { fetchMoviesFrom } from "../lib/tmdb";

// Hook reusable para las paginas de categoria (Popular, Top Rated, etc.).
// Le pasas un path de TMDB y te devuelve la lista + estados de carga/error.
export function useMovies(path: string) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // "active" evita setear estado si el componente se desmonto
    // o si el path cambio antes de que termine el fetch.
    let active = true;

    const load = async () => {
      setIsLoading(true);
      setErrorMessage("");
      try {
        const results = await fetchMoviesFrom(path);
        if (active) setMovies(results);
      } catch (error) {
        console.error(error);
        if (active) {
          setErrorMessage("Error fetching movies, please try again later.");
        }
      } finally {
        if (active) setIsLoading(false);
      }
    };

    load();
    return () => {
      active = false;
    };
  }, [path]);

  return { movies, isLoading, errorMessage };
}
