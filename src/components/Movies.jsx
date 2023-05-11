import axios from "axios";
import { useState, useEffect } from "react";

export default function MovieList() {
  const [movie, setMovies] = useState([]);
  const POSTER_PREFIX = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    document.title = "Movie list";
    fetchMovies();
  }, []);

  const fetchMovies = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=04cb763c501f57fb2385cbde6cf894b4`
      )
      .then((res) => {
        setMovies(res.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <ul>
      {movie.map((movies) => (
        <div className="card-list" key={movies.id}>
          <img src={POSTER_PREFIX + movies.poster_path} alt="poster" />
          <li>
            <div className="card-text">
              <h4>{movies.title}</h4>
              <h5>{movies.overview}</h5>
              <h4>Rating:{movies.vote_average}</h4>
            </div>
          </li>
        </div>
      ))}
    </ul>
  );
}
