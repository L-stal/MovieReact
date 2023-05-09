import React from 'react';
import axios from 'axios';


export default class PersonList extends React.Component {
    state = {
      persons: [],
      movies: [],
    }
  
    componentDidMount() {
      axios.get(`https://localhost:7125/api/PersonGenre?Name=Leo`)
        .then(res => {
          const persons = res.data;
          this.setState({ persons });
        })
        .catch(error => {
          console.log(error);
        });
        
      axios.get(`https://localhost:7125/api/Person/GetMoviesGenre?Name=Leo`)
        .then(res => {
          const movies = res.data;
          this.setState({ movies });
        })
        .catch(error => {
          console.log(error);
        });
    }
  
    renderPersons() {
      return (
        <ul>
          {this.state.persons.map(person => (
            <div className="card-list">
              <li key={person.personId}>
                <h2>{person.name}</h2>
                <h4>Liked genres:</h4> {person.likedGenres}
              </li>
            </div>
          ))}
        </ul>
      );
    }
    
    renderMovies() {
      return (
        <ul>
          <p>Rated movies</p>
          {this.state.movies.map(movie => (
            <div className="card-list">
              <li key={movie.moveLink}>
                <h2>{movie.movieName}</h2>
              </li>
            </div>
          ))}
        </ul>
      );
    }
    
    render() {
      return (
        <div>
          {this.renderPersons()}
          {this.renderMovies()}
        </div>
      );
    }
  }