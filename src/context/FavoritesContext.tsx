import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { Movie } from "../types";

type FavoritesContextValue = {
  favorites: Movie[];
  toggleFavorite: (movie: Movie) => void;
  isFavorite: (id: number) => boolean;
};

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

const STORAGE_KEY = "favorites";

export function FavoritesProvider({ children }: { children: ReactNode }) {
  // Lazy initializer: leemos localStorage una sola vez al montar.
  const [favorites, setFavorites] = useState<Movie[]>(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Movie[]) : [];
  });

  // Cada vez que cambia la lista, la persistimos.
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (movie: Movie) => {
    setFavorites((prev) =>
      prev.some((m) => m.id === movie.id)
        ? prev.filter((m) => m.id !== movie.id)
        : [...prev, movie]
    );
  };

  const isFavorite = (id: number) => favorites.some((m) => m.id === id);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

// Hook de consumo: lanza error si se usa fuera del provider.
export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) {
    throw new Error("useFavorites debe usarse dentro de <FavoritesProvider>");
  }
  return ctx;
}
