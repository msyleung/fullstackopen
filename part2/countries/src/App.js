import React, { useState, useEffect } from "react";
import axios from "axios";

const DisplayWeather = ({ capital }) => {
  const [weather, setWeather] = useState("");

  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${capital}`
      )
      .then((response) => {
        setWeather(response.data.current);
      });
  }, [capital]);

  return (
    <div>
      <h2>Weather in {capital}</h2>
      {weather && (
        <div>
          <p>Temperature: {weather.temperature}</p>
          <p>
            <img
              src={weather.weather_icons[0]}
              alt={weather.weather_descriptions[0]}
            ></img>
          </p>
          <p>
            Wind: {weather.wind_speed} mph direction {weather.wind_dir}
          </p>
        </div>
      )}
    </div>
  );
};

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
      <DisplayWeather capital={country.capital} />
    </div>
  );
};

const DisplayAll = ({ countries, handleButton }) => {
  return (
    <div>
      {countries.map((country, index) => (
        <div key={country.name}>
          {country.name}
          <button
            onClick={() => {
              handleButton(countries[index]);
            }}
          >
            show
          </button>
        </div>
      ))}
    </div>
  );
};

const DisplayHelper = ({
  countries,
  handleButton,
  showOne,
  currentCountry,
}) => {
  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  } else if (countries.length === 1) {
    return <DisplayOne country={countries[0]} />;
  }
  return (
    <div>
      {showOne && <DisplayOne country={currentCountry} />}
      {!showOne && countries && (
        <DisplayAll countries={countries} handleButton={handleButton} />
      )}
    </div>
  );
};

const App = () => {
  const [search, setSearch] = useState("");
  const [countriesData, setCountriesData] = useState([]);
  const [showOne, setShowOne] = useState(false);
  const [currentCountry, setCurrentCountry] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setCountriesData(response.data);
    });
  }, []);

  const handleButton = (country) => {
    setShowOne(!showOne);
    setCurrentCountry(country);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
    setShowOne(false);
    setCurrentCountry("");
  };

  const searchCountries = () => {
    if (!search) return "";
    let matchingCountries = countriesData.filter((country) => {
      return country.name.toLowerCase().includes(search.toLowerCase());
    });
    return matchingCountries;
  };

  return (
    <div className="container">
      Find countries: <input value={search} onChange={handleSearch}></input>
      <DisplayHelper
        countries={searchCountries()}
        handleButton={handleButton}
        showOne={showOne}
        currentCountry={currentCountry}
      />
    </div>
  );
};

export default App;
