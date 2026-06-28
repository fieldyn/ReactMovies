import type { Movie } from "../types";
import MovieCard from "./MovieCard";
import Spinner from "./Spinner";

type Props = {
  movies: Movie[];
  isLoading: boolean;
  errorMessage: string;
};

// Render reusable de una grilla de peliculas con sus estados.
export default function MovieGrid({ movies, isLoading, errorMessage }: Props) {
  if (isLoading) return <Spinner />;
  if (errorMessage) return <p className="text-red-500">{errorMessage}</p>;

  return (
    <ul>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </ul>
  );
}
