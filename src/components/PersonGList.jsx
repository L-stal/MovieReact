import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function PersonGList() {
  const [movies, setMovie] = useState([]);
  const [persons, setPersons] = useState([]);
  const [rating, setRating] = useState([]);

  let { firstName } = useParams();
  useEffect(() => {
    ApiCalls();
  }, []);

  const ApiCalls = () => {
    axios
      .get(`https://localhost:7125/api/PersonGenre?Name=${firstName}`)
      .then((res) => {
        setPersons(res.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`https://localhost:7125/api/Person/GetMoviesGenre?Name=${firstName}`)
      .then((res) => {
        setMovie(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(`https://localhost:7125/api/Person/GetRating?Name=${firstName}`)
      .then((res) => {
        setRating(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <ul>
        {persons.map((person) => (
          <div className="card-list">
            <li key={person.personId}>
              <h2>{person.name}</h2>
              <h4>Liked genres:</h4> {person.likedGenres}
            </li>
          </div>
        ))}
      </ul>
      <ul>
        <p>Added movies</p>
        {movies.map((movie) => (
          <div className="card-list">
            <li key={movie.moveLink}>
              <h2>{movie.movieName}</h2>
              {rating.map((rating) => {
                if (rating.movieName == movie.movieName) {
                  return <h4>Rating: {rating.rating}</h4>;
                }
              })}
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
}
