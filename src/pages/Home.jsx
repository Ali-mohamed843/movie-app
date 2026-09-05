import { useState, useEffect } from 'react';
import { useDebounce } from 'react-use';
import Search from '../components/Search.jsx';
import Spinner from '../components/Spinner.jsx';
import MovieCard from '../components/MovieCard.jsx';
import Filter from '../components/Filter.jsx';
import { getTrendingMovies, updateSearchCount } from '../appwrite.js';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [trendingMovies, setTendingMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [year, setYear] = useState('');
  const [rating, setRating] = useState('');
  const [genre, setGenre] = useState('');

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

  const API_BASE_URL = 'https://api.themoviedb.org/3';
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  const API_OPTIONS = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    },
  };

  const fetchMovies = async (query = '') => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const params = new URLSearchParams();

      if (query) {
        params.append('query', query);
      } else {
        params.append('sort_by', 'popularity.desc');
        if (year) params.append('primary_release_year', year);
        if (rating) params.append('vote_average.gte', rating);
        if (genre) params.append('with_genres', genre);
      }

      const endpoint = `${API_BASE_URL}/${query ? 'search/movie' : 'discover/movie'}?${params.toString()}`;
      const res = await fetch(endpoint, API_OPTIONS);
      const data = await res.json();

      if (data.results) {
        setMovieList(data.results);
      } else {
        throw new Error('Invalid response');
      }

      if (query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0]);
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
      setErrorMessage('Error fetching movies. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies();
      setTendingMovies(movies || []);
    } catch (error) {
      console.error(`Error Fetching Trending Movies: ${error}`);
    }
  };

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    loadTrendingMovies();
  }, []);

  useEffect(() => {
    if (!searchTerm) {
      fetchMovies();
    }
  }, [year, rating, genre]);

  return (
    <main className="bg-[url('/BG.png')] bg-cover bg-center h-72 w-full">
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img src="./hero-img.png" alt="hero banner" />
          <h1>
            Find <span className="text-gradient">Movies</span> you'll Enjoy Without the Hassle
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        {trendingMovies.length > 0 && (
          <section className="trending">
            <h2>Trending Movies</h2>
            <ul>
              {trendingMovies.map((movie, index) => (
                <li key={movie.$id}>
                  <p className="text-gray-400">{index + 1}</p>
                  <img src={movie.poster_url} alt={movie.title} />
                  <p className="text-white">{movie.title}</p>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="all-movies">
          <div className="cont flex justify-between items-center">
            <h2>All Movies</h2>
            <Filter
              year={year}
              setYear={setYear}
              rating={rating}
              setRating={setRating}
              genre={genre}
              setGenre={setGenre}
            />
          </div>
          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
};

export default Home;