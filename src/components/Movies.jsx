import axios from "axios";
import { useState, useEffect } from "react";

export default function MovieList() {
  const [movie, setMovies] = useState([]);

  useEffect(() => {
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
          <li>
            <h2>{movies.title}</h2>
            <h4>test</h4>
          </li>
        </div>
      ))}
    </ul>
  );
}
