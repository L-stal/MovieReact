import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function PersonGList() {
  const [movies, setMovie] = useState([]);
  const [persons, setPersons] = useState([]);
  const [rating, setRating] = useState([]);
  const [genre, setGenre] = useState([]);
  const [showGenres, setShowGenres] = useState(false);

  let { firstName } = useParams();

  useEffect(() => {
    document.title = firstName + "'s page";
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
    axios
      .get(`https://localhost:7125/api/Genre/GetAllGenre`)
      .then((res) => {
        setGenre(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="main-div">
      <div className="show-genre">
        <button onClick={() => setShowGenres(!showGenres)}>+</button>Add a
        linked genre
      </div>
      {showGenres && (
        <div className="genre-div">
          {genre.map((genres) => {
            if (!persons.find((person) => person.name === genres.name)) {
              return (
                <div className="selectGenre" key={genres.id}>
                  <h5>{genres.name}</h5>
                </div>
              );
            }
          })}
        </div>
      )}

      <ul>
        <div className="card-list">
          <h2 className="name">{firstName}</h2>
          <div className="card-text">
            <h4 className="genres-heading">Liked genres:</h4>
            <ul className="genres-list">
              {persons.map((person) => (
                <li key={person.personId}>
                  <h4>{person.name}</h4>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </ul>
      <ul>
        <p>Added movies</p>
        {movies.map((movie) => (
          <div className="card-list">
            <li key={movie.moveLink}>
              <h2>{movie.movieName}</h2>
              {rating.map((rating) => {
                if (rating.movieName == movie.movieName) {
                  return <h4>Personal rating: {rating.rating}</h4>;
                }
              })}
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
}
