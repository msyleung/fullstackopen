import React from "react";

const Display = ({ persons }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Numbers</th>
        </tr>
      </thead>
      <tbody>
        {persons.map((person) => (
          <tr key={person.id}>
            <td>{person.name}</td>
            <td>{person.number}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Display;
