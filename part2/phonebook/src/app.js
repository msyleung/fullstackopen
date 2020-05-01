import React, { useState, useEffect } from "react";
import Display from "./display";
import NewEntry from "./new";
import Search from "./search";
import Api from "./services/api";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [personsToDisplay, setPersonsToDisplay] = useState(persons);
  const [search, setSearch] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newName, setNewName] = useState("");

  const setDatabase = () => {
    Api.getAll().then((newPeople) => setPersons(newPeople));
  };

  useEffect(() => {
    setDatabase();
  }, []);

  useEffect(() => {
    setPersonsToDisplay(persons);
  }, [persons]);

  useEffect(() => {
    if (!search) {
      return setPersonsToDisplay(persons);
    }
    let newSearch = persons.filter((person) =>
      person.name.toLowerCase().includes(search.toLowerCase())
    );
    setPersonsToDisplay(newSearch);
  }, [search, persons]);

  const handleExistingUser = (currentPerson, newInfo) => {
    let { number, name, id } = currentPerson;
    if (number === newInfo.number) {
      window.alert(`${name} is already added to the phonebook!`);
    } else {
      let replace = window.confirm(
        `${name} is already added to the phonebook, replace the old number with the new one?`
      );
      if (replace) {
        Api.update(id, newInfo).then(() => setDatabase());
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let newInfo = {
      id: persons.length + 1,
      name: newName,
      number: newNumber,
    };
    let currentPerson = persons.find((person) => person.name === newInfo.name);
    currentPerson
      ? handleExistingUser(currentPerson, newInfo)
      : Api.create(newInfo).then((savedPerson) => {
          setPersons(persons.concat(savedPerson));
        });
    setNewName("");
    setNewNumber("");
  };

  const handleChange = (event) => {
    const { id, value } = event.target;
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

  const handleDelete = (event) => {
    let { id, name } = event.target;
    if (window.confirm(`Delete ${name}?`)) {
      Api.destroy(id).then(() => {
        setDatabase();
      });
    }
  };

  return (
    <div className="container">
      <h1>Phonebook</h1>
      <Search search={search} handleChange={handleChange} />
      <NewEntry
        newName={newName}
        newNumber={newNumber}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <Display persons={personsToDisplay} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
