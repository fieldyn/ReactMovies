import type { Movie } from "../types"
import { useFavorites } from "../context/FavoritesContext";

type Props = {
    movie: Movie
}

export default function MovieCard({ movie }: Props) {
    const { title, vote_average, poster_path, release_date, original_language } = movie;
    const { isFavorite, toggleFavorite } = useFavorites();
    const favorite = isFavorite(movie.id);
    const imgPath = 'https://image.tmdb.org/t/p/w500';

    return (
        <div className="movie-card relative">
            <button
                type="button"
                onClick={() => toggleFavorite(movie)}
                aria-label={favorite ? "Quitar de favoritos" : "Agregar a favoritos"}
                className="absolute top-3 right-3 z-10 text-2xl leading-none transition-transform hover:scale-125"
            >
                {favorite ? "❤️" : "🤍"}
            </button>
            <img src={poster_path ? `${imgPath}${poster_path}` : '/no-movie.png'} alt={title} />
            <div className="mt-4">
                <h3>{title}</h3>
                <div className="content">
                    <div className="rating">
                        <img src="star.svg" alt="Star Icon"/>
                        <p>{vote_average ? vote_average.toFixed(1): 'N/A'}</p>
                    </div>
                    <span>•</span>
                    <p className="lang">{original_language}</p>
                    <span>•</span>
                    <p className="year">
                        {release_date ? release_date.split('-')[0]:'N/A'}
                    </p>
                </div>
            </div>
        </div>
    )
}
