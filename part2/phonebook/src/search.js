import React from "react";
import "./index.css";

const Search = ({ search, handleChange }) => {
  return (
    <div className="search">
      Search:
      <input value={search} onChange={handleChange} id="search" />
    </div>
  );
};

export default Search;
