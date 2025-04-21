import React, { useState, useEffect } from 'react';

const GhibliMovies = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('https://ghibliapi.vercel.app/films')
      .then((res) => res.json())
      .then((data) => setMovies(data))
      .catch((err) => console.log(err));
  }, []);

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
    <nav ><h1>GHIBLI STUDIOS </h1></nav>
    <div className="container">
      <h2>Studio Ghibli Movie List</h2>

      <input
        type="text"
        placeholder="Search movie by title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      <ul className="movie-list">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <li key={movie.id} className="movie-card">

              <img src={movie.image} alt={movie.title} className="movie-image" />
                <div className='movie-desc'>
                
              <h3>{movie.title}</h3>
              <p><strong>Original Title:</strong> {movie.original_title} ({movie.original_title_romanised})</p>
              <p><strong>Director:</strong> {movie.director}</p>
              <p><strong>Producer:</strong> {movie.producer}</p>
              <p><strong>Release Year:</strong> {movie.release_date}</p>
              <p><strong>Running Time:</strong> {movie.running_time} mins</p>
              <p><strong>Rating:</strong> {movie.rt_score}</p>
              <p>{movie.description}</p>
                </div>
            </li>
          ))
        ) : (
          <p>No movies found 🎥</p>
        )}
      </ul>
    </div>
    </>   
  );
};

export default GhibliMovies;
