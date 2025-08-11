import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

const MovieCard = ({ movie }) => {
  const {
    id,
    title,
    poster_path,
    original_language,
    release_date,
    vote_average,
    overview,
  } = movie;

  const navigate = useNavigate(); 
  const [showFullDescription, setShowFullDescription] = useState(false);

  const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';
  const posterUrl = poster_path ? `${imageBaseUrl}${poster_path}` : '/placeholder.png';

  const description = showFullDescription
    ? overview
    : `${overview?.substring(0, 70)}...`;

  
  const handleClick = () => {
    navigate(`/movie/${id}`);
  };

  return (
    <div className="movie-card cursor-pointer" onClick={handleClick}>
      <img src={posterUrl} alt={title} />
      <div className="mt-4">
        <h3>{title}</h3>
        <div className="content">
          <div className="rating">
            <img src="Rating.svg" alt="Star Icon" />
            <p>{vote_average}</p>
          </div>
          <span>*</span>
          <p className="text-gray-500">{original_language}</p>
          <span>*</span>
          <p className="text-gray-500">
            {release_date ? release_date.split('-')[0] : 'N/A'}
          </p>
        </div>

        <p className="mt-3 text-sm text-white">
          {description}
          {overview?.length > 70 && (
            <button
              onClick={(e) => {
                e.stopPropagation(); 
                setShowFullDescription(!showFullDescription);
              }}
              className="text-blue-400 mt-2 block"
            >
              {showFullDescription ? 'Show less' : 'Read more'}
            </button>
          )}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;



