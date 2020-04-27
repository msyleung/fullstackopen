import React from "react";
import Header from "./header";
import Content from "./content";
import Total from "./total";

// Total renders the total number of exercises.
const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name}></Header>
      <Content parts={course.parts}></Content>
      <Total parts={course.parts}></Total>
    </div>
  );
};

export default Course;
