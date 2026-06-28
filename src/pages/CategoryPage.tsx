import { useMovies } from "../hooks/useMovies";
import MovieGrid from "../components/MovieGrid";

type Props = {
  title: string;
  path: string;
};

// Pagina generica reutilizada por Popular / Top Rated / Upcoming.
// Solo cambia el titulo y el endpoint de TMDB.
export default function CategoryPage({ title, path }: Props) {
  const { movies, isLoading, errorMessage } = useMovies(path);

  return (
    <section className="all-movies">
      <h2 className="mt-[40px]">{title}</h2>
      <MovieGrid movies={movies} isLoading={isLoading} errorMessage={errorMessage} />
    </section>
  );
}
