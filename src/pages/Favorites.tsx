import { useFavorites } from "../context/FavoritesContext";
import MovieCard from "../components/MovieCard";

export default function Favorites() {
  const { favorites } = useFavorites();

  return (
    <section className="all-movies">
      <h2 className="mt-[40px]">My Favorites</h2>

      {favorites.length === 0 ? (
        <p className="text-light-200 mt-4">
          Todavía no agregaste favoritos. Tocá el corazón 🤍 en cualquier película.
        </p>
      ) : (
        <ul>
          {favorites.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </ul>
      )}
    </section>
  );
}
