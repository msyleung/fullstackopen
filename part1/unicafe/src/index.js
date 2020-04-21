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
  const total = good + neutral + bad;

  const handleAverage = () => {
    // the average score (good: 1, neutral: 0, bad: -1)
    return good / total + (bad / total) * -1 + (neutral / total) * 0 || 0;
  };

  const handlePercentagePositive = () => {
    // the average score (good: 1, neutral: 0, bad: -1)
    return (good / total) * 100 || 0;
  };

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
      <table class="results">
        <Results name={"good"} details={good}></Results>
        <Results name={"neutral"} details={neutral}></Results>
        <Results name={"bad"} details={bad}></Results>
        <Results name={"all"} details={total}></Results>
        <Results name={"average"} details={handleAverage()}></Results>
        <Results
          name={"positive"}
          details={`${handlePercentagePositive()}%`}
        ></Results>
      </table>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
