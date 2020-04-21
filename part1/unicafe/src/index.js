import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const Results = ({ name, details }) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{details}</td>
    </tr>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div class="container">
      <h1 class="header">Give feedback</h1>
      <div class="buttons">
        <Button handleClick={() => setGood(good + 1)} text="good"></Button>
        <Button
          handleClick={() => setNeutral(neutral + 1)}
          text="neutral"
        ></Button>
        <Button handleClick={() => setBad(bad + 1)} text="bad"></Button>
      </div>
      <h1 class="content">Statistics</h1>
      <div class="results">
        <table>
          <Results name={"good"} details={good}></Results>
          <Results name={"neutral"} details={neutral}></Results>
          <Results name={"bad"} details={bad}></Results>
        </table>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
