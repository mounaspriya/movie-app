// Movie.js
import React from 'react';

const Movie = ({ movie }) => {
  return (
    <div className="movie">
      <img
        src={movie.Poster}
        alt={movie.Title}
        style={{ width: '100%', borderRadius: '5px' }}
      />
      <div className="movie-info" style={{ textAlign: 'center' }}>
        <h3>{movie.Title}</h3>
        <p>{movie.Year}</p>
      </div>
    </div>
  );
};

export default Movie;
