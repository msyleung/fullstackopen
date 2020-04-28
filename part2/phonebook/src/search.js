import React from "react";
import "./index.css";

const Search = ({ search, handleChange, handleSearch }) => {
  return (
    <div className="search">
      Search:
      <form onSubmit={handleSearch}>
        <input value={search} onChange={handleChange} id="search" />
      </form>
    </div>
  );
};

export default Search;
