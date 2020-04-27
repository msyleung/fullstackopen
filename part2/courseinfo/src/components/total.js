import React from "react";

// Total renders the total number of exercises.
const Total = (props) => {
  const { parts } = props;
  const totalExercises = parts
    .map((part) => part.exercises)
    .reduce((accumulator, currentValue) => accumulator + currentValue);
  return <p>Number of exercises {totalExercises}</p>;
};

export default Total;
