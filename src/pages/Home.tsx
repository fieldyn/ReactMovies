import { useEffect, useState } from "react";
import { useDebounce } from "react-use";
import Search from "../components/Search";
import MovieGrid from "../components/MovieGrid";
import type { Movie, TrendingMovie } from "../types";
import { getTrendingMovies, updateSearchCount } from "../appwrite";
import { API_BASE_URL, API_OPTIONS } from "../lib/tmdb";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [movieList, setMovieList] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [trendingMovies, setTrendingMovies] = useState<TrendingMovie[]>([]);

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 800, [searchTerm]);

  const fetchMovies = async (query = "") => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);
      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }
      const data = await response.json();
      if (data.Response === "False") {
        setErrorMessage(data.Error || "Failed to fetch movies");
        setMovieList([]);
        return;
      }

      setMovieList(data.results || []);

      if (query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0]);
      }
    } catch (error) {
      setErrorMessage("Error fetching movies, please try again later.");
      console.error(`Error fetching movies: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const loadTrendingMovies = async () => {
    const movies = await getTrendingMovies();
    setTrendingMovies(movies);
  };

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    loadTrendingMovies();
  }, []);

  return (
    <>
      <header>
        <img src="./hero.png" alt="Hero Banner" />
        <h1>
          Find <span className="text-gradient">Movies</span> You'll Enjoy
          Without the Hassle
        </h1>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </header>

      {trendingMovies.length > 0 && (
        <section className="trending">
          <h2>Trending Movies</h2>
          <ul>
            {trendingMovies.map((movie, index) => (
              <li key={movie.$id}>
                <p>{index + 1}</p>
                <img src={movie.poster_url} alt={movie.searchTerm} />
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="all-movies">
        <h2 className="mt-[40px]">All Movies</h2>
        <MovieGrid movies={movieList} isLoading={isLoading} errorMessage={errorMessage} />
      </section>
    </>
  );
}
