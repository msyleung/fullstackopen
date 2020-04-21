import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0));

  const handleVote = () => {
    const copy = [...points];
    copy[selected] += 1;
    setPoints(copy);
  };

  const handleNextSelected = () => {
    let nextSelected = Math.floor(Math.random() * 6);
    setSelected(nextSelected);
  };

  return (
    <div className="container">
      <h1 className="quote">{anecdotes[selected]}</h1>
      <div className="points">
        has {points[selected]} vote{points[selected] === 1 ? "" : "s"}
      </div>
      <div className="buttons">
        <button onClick={handleVote}>vote</button>
        <button onClick={handleNextSelected}>next</button>
      </div>
    </div>
  );
};

const anecdotes = [
  "Git Good",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
