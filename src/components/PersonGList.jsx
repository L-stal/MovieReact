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
  const [showForm, setShowForm] = useState(false);
  const [movieName, setMovieName] = useState([]);
  const [movieGenre, setMovieGenre] = useState([]);
  const [movieLink, setMovieLink] = useState([]);
  const [showRating, setShowRating] = useState(false);
  const [movieRating, setMovieRating] = useState([]);

  let { firstName } = useParams();

  const selectedGenre = async (genres) => {
    console.log("Clicked");
    await axios
      .post(
        `https://localhost:7125/api/Person/AddGenre?personName=${firstName}&genreId=${genres.genreId}`
      )
      .catch((err) => {
        console.error(err);
      });
    ApiCalls();
  };

  const addMovie = () => {
    console.log("Clicked");
    axios
      .post(
        `https://localhost:7125/api/Person/AddMovieLink?personName=${firstName}&movieName=${movieName}&genreName=${movieGenre}&movieLink=${movieLink}`
      )
      .catch((err) => {
        console.error(err);
      });
    ApiCalls();
  };

  const addRating = async () => {
    console.log("Clicked");
    await axios
      .post(
        `https://localhost:7125/api/Movies/AddRatings?movieName=${movieName}&rating=${movieRating}`
      )
      .catch((err) => {
        console.error(err);
      });
    ApiCalls();
  };

  useEffect(() => {
    document.title = firstName + "'s page";
    ApiCalls();
  }, []);

  // useEffect(() => {
  //   ApiCalls();
  // }, []);

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
      <div className="choices">
        <button onClick={() => setShowGenres(!showGenres)}>
          Add a new liked genre
        </button>
        <button onClick={() => setShowForm(!showForm)}>Add a new moive</button>
        <button onClick={() => setShowRating(!showRating)}>
          Add rating to a moive
        </button>
      </div>
      {showForm && (
        <div className="add-movie">
          <form onSubmit={addRating}>
            <ul>
              <li>
                <label>Movie Name* </label>
                <input
                  type="text"
                  required
                  onChange={(e) => setMovieName(e.target.value)}
                />
              </li>
              <li>
                <label>Genre* </label>
                <input
                  type="text"
                  required
                  onChange={(e) => setMovieGenre(e.target.value)}
                />
              </li>
              <li>
                <label>Moive Link* </label>
                <input
                  type="text"
                  required
                  onChange={(e) => setMovieLink(e.target.value)}
                />
              </li>
              <input type="submit" value="Add new movie."></input>
            </ul>
          </form>
        </div>
      )}
      {showGenres && (
        <div className="genre-div">
          {genre.map((genres) => {
            if (!persons.find((person) => person.name === genres.name)) {
              return (
                <div
                  className="selectGenre"
                  key={genres.id}
                  onClick={() => selectedGenre(genres)}
                >
                  <h5>{genres.name}</h5>
                </div>
              );
            }
          })}
        </div>
      )}
      {showRating && (
        <div className="rating">
          <form onSubmit={addRating}>
            <ul>
              <li>
                <label>Movie Name* </label>
                <input
                  type="text"
                  required
                  onChange={(e) => setMovieName(e.target.value)}
                />
              </li>
              <li>
                <label>Rating* </label>
                <input
                  type="text"
                  required
                  onChange={(e) => setMovieRating(parseInt(e.target.value))}
                />
              </li>
              <input type="submit" value="Add rating."></input>
            </ul>
          </form>
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
