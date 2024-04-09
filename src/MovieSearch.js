import React, { useState, useEffect } from 'react';
import './MovieSearch.css';
import Loader from './Loader'; // Import the loader component

const MovieSearch = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(10); // Change this value to adjust movies per page

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const url = 'https://imdb-top-100-movies.p.rapidapi.com/';
        const options = {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': '996e01d1a7msha695021f84ed094p1a2cf1jsn1564fbae06ac',
            'X-RapidAPI-Host': 'imdb-top-100-movies.p.rapidapi.com'
          }
        };
        const response = await fetch(url, options);
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      setLoading(false);
    };

    fetchMovies();
  }, []);

  const handleSearchChange = (event) => {
    setQuery(event.target.value);
    setCurrentPage(1); // Reset to the first page when searching
  };

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(query.toLowerCase())
  );
  const currentMovies = filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="movie-search">
      <input
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={handleSearchChange}
      />
      {loading ? (
        <Loader /> // Display the loader while loading is true
      ) : (
        <div>
          {currentMovies.length === 0 ? (
            <p>No results found</p>
          ) : (
            <div>
              <div className={`movie-list ${currentMovies.length === 1 ? 'single-movie' : ''}`}>
                {currentMovies.map((movie, index) => (
                  <div key={index} className="movie">
                    <h3>{movie.title}</h3>
                    <p>{movie.year}</p>
                    <img src={movie.image} alt={movie.title} />
                    <p>{movie.description}</p>
                  </div>
                ))}
              </div>
              <div className="pagination">
                {Array.from({ length: Math.ceil(filteredMovies.length / moviesPerPage) }, (_, index) => index + 1).map(pageNumber => (
                  <button
                    key={pageNumber}
                    onClick={() => paginate(pageNumber)}
                    className={currentPage === pageNumber ? 'active' : ''}
                  >
                    {pageNumber}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MovieSearch;
