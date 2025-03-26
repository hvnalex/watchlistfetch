import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import "./App.css"
// Main page component
function Home({ addToWatchlist, movies }) {
  return (
    <div className='homeclass'>
      <h1>Movie List</h1>
      <div className="movie-list">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-item">
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
              style={{ width: '100px' , height:'200px'}}
            />
            <h3>{movie.title}</h3>
            <p>{movie.overview}</p>
            <button onClick={() => addToWatchlist(movie)}>
              Add to Watchlist
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// Watchlist page component
function Watchlist({ watchlist, removeFromWatchlist }) {
  return (
    <div>
      <h1>Your Watchlist</h1>
      {watchlist.length === 0 ? (
        <p>No movies added to the watchlist yet.</p>
      ) : (
        watchlist.map((movie, index) => (
          <div key={index} className="watchlist-item">
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
              style={{ width: '100px' }}
            />
            <h3>{movie.title}</h3>
            <button onClick={() => removeFromWatchlist(movie)}>
              Remove from Watchlist
            </button>
          </div>
        ))
      )}
    </div>
  );
}

function App() {
  const [movies, setMovies] = useState([]);
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=83a9d8c2418a064922a53252297530ca');
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  const addToWatchlist = (movie) => {
    setWatchlist((prevWatchlist) => [...prevWatchlist, movie]);
  };

  const removeFromWatchlist = (movieToRemove) => {
    setWatchlist((prevWatchlist) =>
      prevWatchlist.filter((movie) => movie.id !== movieToRemove.id)
    );
  };

  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> | <Link to="/watchlist">Watchlist</Link>
      </nav>
      <Routes>
        <Route
          path="/"
          element={<Home movies={movies} addToWatchlist={addToWatchlist} />}
        />
        <Route
          path="/watchlist"
          element={<Watchlist watchlist={watchlist} removeFromWatchlist={removeFromWatchlist} />}
        />
      </Routes>
    </Router>
  );
}

export default App;

