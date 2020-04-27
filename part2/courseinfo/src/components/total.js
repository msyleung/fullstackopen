import React from "react";

// Total renders the total number of exercises.
const Total = ({ parts }) => {
  const totalExercises = parts
    .map((part) => part.exercises)
    .reduce((accumulator, currentValue) => accumulator + currentValue);
  return (
    <p>
      <b>
        total of {totalExercises} exercise{totalExercises !== 1 ? "s" : ""}
      </b>
    </p>
  );
};

export default Total;
