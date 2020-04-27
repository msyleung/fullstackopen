import React from "react";

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

export default Content;
