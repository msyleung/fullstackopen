import React, { useState } from "react";
import Display from "./display";

const App = () => {
  const [persons, setPersons] = useState([{ id: 0, name: "Arto Hellas" }]);
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
    event.target.id === "name"
      ? setNewName(event.target.value)
      : setNewNumber(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleChange} id="name" />
        </div>
        <div>
          number:{" "}
          <input value={newNumber} onChange={handleChange} id="number" />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <Display persons={persons} />
    </div>
  );
};

export default App;
