import React from "react";
import ReactDOM from "react-dom";

// Header takes care of rendering the name of the course,
const Header = (props) => {
  return <h1>{props.course}</h1>;
};

// Refactor the Content component so that it does not render any names of parts or their number of exercises by itself.
const Part = (props) => {
  const { part, exercise } = props;
  return (
    <p>
      {part} {exercise}
    </p>
  );
};

// Content renders the parts and their number of exercises
const Content = (props) => {
  const { part1, part2, part3, exercises1, exercises2, exercises3 } = props;
  return (
    <div>
      <Part part={part1} exercise={exercises1}></Part>
      <Part part={part2} exercise={exercises2}></Part>
      <Part part={part3} exercise={exercises3}></Part>
    </div>
  );
};

// Total renders the total number of exercises.
const Total = (props) => {
  const { exercises1, exercises2, exercises3 } = props;
  return <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>;
};

const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  return (
    <div>
      <Header course={course}></Header>
      <Content
        part1={part1}
        part2={part2}
        part3={part3}
        exercises1={exercises1}
        exercises2={exercises2}
        exercises3={exercises3}
      ></Content>
      <Total
        exercises1={exercises1}
        exercises2={exercises2}
        exercises3={exercises3}
      ></Total>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
