import React from "react";

const NewEntry = ({ newName, newNumber, handleChange, handleSubmit }) => {
  return (
    <div className="newEntry">
      <h2>Add a new entry:</h2>
      <form onSubmit={handleSubmit} className="entryForm">
        <div>
          name: <input value={newName} onChange={handleChange} id="name" />
        </div>
        <div>
          number:{" "}
          <input value={newNumber} onChange={handleChange} id="number" />
        </div>
        <div>
          <button type="submit">save</button>
        </div>
      </form>
    </div>
  );
};

export default NewEntry;
