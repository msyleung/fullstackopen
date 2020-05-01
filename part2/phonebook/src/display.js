import React from "react";

const Display = ({ persons, handleDelete }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>
            <h2>Numbers</h2>
          </th>
        </tr>
      </thead>
      <tbody>
        {persons.map((person) => (
          <tr key={person.id} className="row">
            <td>{person.name}</td>
            <td>{person.number}</td>
            <td>
              <button onClick={handleDelete} id={person.id} name={person.name}>
                delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Display;
