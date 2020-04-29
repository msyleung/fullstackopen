import React, { useState, useEffect } from "react";
import axios from "axios";

const DisplayOne = ({ country }) => {
  return (
    <div>
      <h1>{country.name}</h1>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>
      <h2>languages</h2>
      <ul>
        {country.languages.map((language) => (
          <li key={language.name}>{language.name}</li>
        ))}
      </ul>
      <p>
        <img src={country.flag} alt="country flag" width="100vh"></img>
      </p>
    </div>
  );
};

const DisplayHelper = ({ countries }) => {
  if (countries.length > 10) {
    return <div>Too many matches</div>;
  } else if (countries.length === 1) {
    return <DisplayOne country={countries[0]} />;
  }
  return (
    <div>
      {countries &&
        countries.map((country) => (
          <div key={country.name}>{country.name}</div>
        ))}
    </div>
  );
};

const App = () => {
  const [search, setSearch] = useState("");
  const [countriesData, setCountriesData] = useState([]);

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setCountriesData(response.data);
    });
  }, []);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const searchCountries = () => {
    if (!search) return "";
    let matchingCountries = countriesData.filter((country) => {
      return country.name.includes(search);
    });
    return matchingCountries;
  };

  return (
    <div className="container">
      Find countries: <input value={search} onChange={handleSearch}></input>
      <DisplayHelper countries={searchCountries()} />
    </div>
  );
};

export default App;
