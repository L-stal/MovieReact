import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function PersonList() {
  //const [firstName, setFirstName] = useState();
  const [persons, setPersons] = useState([]);
  const navigate = useNavigate();

  const handleClick = (person) => {
    //setFirstName(person.firstName);
    navigate(`/PersonGList/${person.firstName}`);
  };

  useEffect(() => {
    axios
      .get("https://localhost:7125/api/Persons/GetPersons")
      .then((res) => {
        setPersons(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <ul>
      {persons.map((person) => (
        <div
          className="card-list"
          onClick={() => handleClick(person)}
          key={person.personId}
        >
          <li>
            <h2>{person.firstName}</h2>
            <h4>Email:</h4> {person.email}
          </li>
        </div>
      ))}
    </ul>
  );
}
