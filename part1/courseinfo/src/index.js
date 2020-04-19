import React from "react";
import ReactDOM from "react-dom";

// Header takes care of rendering the name of the course,
const Header = (props) => {
  return <h1>{props.course}</h1>;
};

// Refactor the Content component so that it does not render any names of parts or their number of exercises by itself.
const Part = (props) => {
  const { name, exercises } = props.part;
  return (
    <p>
      {name} {exercises}
    </p>
  );
};

// Content renders the parts and their number of exercises
const Content = (props) => {
  const { parts } = props;
  return parts.map((part, index) => <Part part={part} key={index}></Part>);
};

// Total renders the total number of exercises.
const Total = (props) => {
  const { parts } = props;
  const totalExercises = parts
    .map((part) => part.exercises)
    .reduce((accumulator, currentValue) => accumulator + currentValue);
  return <p>Number of exercises {totalExercises}</p>;
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course.name}></Header>
      <Content parts={course.parts}></Content>
      <Total parts={course.parts}></Total>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
