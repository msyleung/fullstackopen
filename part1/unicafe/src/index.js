import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const Statistic = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({
  good,
  bad,
  neutral,
  total,
  handleAverage,
  handlePercentagePositive,
}) => {
  return (
    <div className="statistics">
      <h1 className="content">Statistics</h1>
      {total > 0 ? (
        <table className="Statistic">
          <tbody>
            <Statistic text={"good"} value={good}></Statistic>
            <Statistic text={"neutral"} value={neutral}></Statistic>
            <Statistic text={"bad"} value={bad}></Statistic>
            <Statistic text={"all"} value={total}></Statistic>
            <Statistic text={"average"} value={handleAverage()}></Statistic>
            <Statistic
              text={"positive"}
              value={`${handlePercentagePositive()}%`}
            ></Statistic>
          </tbody>
        </table>
      ) : (
        "No Feedback Given"
      )}
    </div>
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
    <div className="container">
      <h1 className="header">Give feedback</h1>
      <div className="buttons">
        <Button handleClick={() => setGood(good + 1)} text="good"></Button>
        <Button
          handleClick={() => setNeutral(neutral + 1)}
          text="neutral"
        ></Button>
        <Button handleClick={() => setBad(bad + 1)} text="bad"></Button>
      </div>
      <Statistics
        good={good}
        bad={bad}
        neutral={neutral}
        total={total}
        handleAverage={handleAverage}
        handlePercentagePositive={handlePercentagePositive}
      ></Statistics>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
