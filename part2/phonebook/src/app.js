import React, { useState } from "react";
import Display from "./display";
import NewEntry from "./new";
import Search from "./search";

const App = () => {
  const [persons, setPersons] = useState([
    { id: 0, name: "Arto Hellas" },
    { id: 1, name: "Ada Lovelace", number: "39-44-5323523" },
    { id: 2, name: "Dan Abramov", number: "12-43-234345" },
    { id: 3, name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [personsToDisplay, setPersonsToDisplay] = useState(persons);
  const [search, setSearch] = useState("");

  const [newNumber, setNewNumber] = useState("");
  const [newName, setNewName] = useState("");

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
