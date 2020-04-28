import React, { useState, useEffect } from "react";
import Display from "./display";
import NewEntry from "./new";
import Search from "./search";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [personsToDisplay, setPersonsToDisplay] = useState(persons);
  const [search, setSearch] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newName, setNewName] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
      setPersonsToDisplay(response.data);
    });
  }, []);

  const sendAlert = (name) => {
    let message = `${name} is already added to phonebook`;
    window.alert(message);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let newPerson = {
      id: persons.length + 1,
      name: newName,
      number: newNumber,
    };
    let exists = persons.some((person) => person.name === newPerson.name);
    exists ? sendAlert(newPerson.name) : setPersons(persons.concat(newPerson));
    setNewName("");
    setNewNumber("");
  };

  const handleChange = (event) => {
    let id = event.target.id;
    let value = event.target.value;
    switch (id) {
      case "name":
        setNewName(value);
        break;
      case "number":
        setNewNumber(value);
        break;
      case "search":
        setSearch(value);
        break;
      default:
        console.log("???");
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    let newSearch = persons.filter((person) =>
      person.name.toLowerCase().includes(search.toLowerCase())
    );
    if (newSearch.length > 0) {
      setPersonsToDisplay(newSearch);
    } else {
      setPersonsToDisplay(persons);
    }
  };

  return (
    <div className="container">
      <h1>Phonebook</h1>
      <Search
        search={search}
        handleChange={handleChange}
        handleSearch={handleSearch}
      />
      <NewEntry
        newName={newName}
        newNumber={newNumber}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <Display persons={personsToDisplay} />
    </div>
  );
};

export default App;
