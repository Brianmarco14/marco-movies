import './App.css';
import {getMovieList, searchMovie} from "./api"
import { useEffect, useState } from 'react';

function App() {
  const [popularMovies, setPopularMovies] = useState([])

  useEffect(()=>{
    getMovieList().then((result)=>{
      setPopularMovies(result)
    })
  }, [])

  const PopularMovieList = () =>{
    return popularMovies.map((movie, i) =>{
      return(
          <div className="movie-wrapper" key={i}>
            <div className="movie-title">{movie.title}</div>
            <img src={`${process.env.REACT_APP_BASEIMGURL}/${movie.poster_path}`} alt="" className="movie-img" />
            <div className="movie-date">release: {movie.release_date}</div>
            <div className="movie-rate">{movie.vote_average}</div>
          </div>
      )
    })
  }

  const search = async (q) =>{
    if (q.length > 3) { 
      const query = await searchMovie(q)
      setPopularMovies(query.results)
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Marco Movies</h1>
          <input type="text" placeholder='cari movies....' className='movie-search' onChange={({target})=>search(target.value)} />
        <div className="movie-container">
         <PopularMovieList />
        </div>
      </header>
    </div>
  );
}

export default App;
