import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Details = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const API_BASE_URL = 'https://api.themoviedb.org/3';

  const API_OPTIONS = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    },
  };

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/movie/${id}`, API_OPTIONS);
        const data = await res.json();
        setMovie(data);
      } catch (err) {
        console.error('Failed to load movie', err);
      }
    };

    const fetchTrailer = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/movie/${id}/videos`, API_OPTIONS);
        const data = await res.json();
        const trailer = data.results.find(
          (video) => video.type === 'Trailer' && video.site === 'YouTube'
        );
        setTrailerKey(trailer ? trailer.key : null);
      } catch (err) {
        console.error('Failed to fetch trailer', err);
      }
    };

    fetchMovieDetails();
    fetchTrailer();
  }, [id]);

  if (!movie) return <p>Loading...</p>;

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h2 className="text-2xl font-bold mb-30 mt-8 text-white">{movie.title}</h2>

      <div className="flex flex-col md:flex-row items-start gap-6">
        {trailerKey ? (
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${trailerKey}`}
            title="Trailer"
            frameBorder="0"
            allowFullScreen
            className="rounded shadow-lg"
          ></iframe>
        ) : (
          <p>No trailer available.</p>
        )}

        <div className="max-w-xl text-gray-200">
          <h3 className="text-xl font-semibold mb-2">Overview</h3>
          <p className="mb-4">{movie.overview}</p>

          <p className="text-white mt-10">
            <strong>Rating:</strong> {movie.vote_average}
          </p>
          <p className="text-white mt-1">
            <strong>Year:</strong> {movie.release_date?.split('-')[0] || 'N/A'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Details;
