import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ id: 0, name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    let newPerson = { name: newName, id: persons.length + 1 };
    setPersons(persons.concat(newPerson));
  };

  const handleChange = (event) => {
    setNewName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <p key={person.id}>{person.name}</p>
      ))}
    </div>
  );
};

export default App;
