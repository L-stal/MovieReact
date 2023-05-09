import React from 'react';
import axios from 'axios';


export default class PersonList extends React.Component {
    state = {
      persons: []
    }

  handleClick = (person) => {
    this.setState({ firstName: person.firstName });
    console.log(person.firstName);
  };
  
    componentDidMount() {
      axios.get(`https://localhost:7125/api/Persons/GetPersons`)
        .then(res => {
          const persons = res.data;
          this.setState({ persons });
        })
    }

    render() {
      return (
        <ul>
          {
            this.state.persons
              .map(person =>
                <div className="card-list" onClick={() => this.handleClick(person)}>
                <li key={person.personId}>
                  <h2>{person.firstName}</h2>
                  <h4>Email:</h4> {person.email}</li>
                  </div>
              )
          }
        </ul>
      )
    }
  }