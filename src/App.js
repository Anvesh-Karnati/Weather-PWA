import "./App.css";
import { fetchWeather } from "./Api/fetchWeather";
import React, { useState } from "react";

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [flag, setFlag] = useState(false);
  const search = async (e) => {
    if (e.key === "Enter") {
      setFlag(true);
      const data = await fetchWeather(query);
      setWeather(data);
      setQuery("");
     
    }
  };
  const searchButton = async (e) => {
    setFlag(true);
    const data = await fetchWeather(query);
    setWeather(data);
    setQuery("");
    
  };
  return (
    <div className="main-container">
      <input
        type="text"
        className="search"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={search}
      />
      <button className="searchButton" onClick={searchButton}>
        Search
      </button>
      {weather.main ? (
        <div className="city">
          <h2 className="city-name">
            <span>{weather.name}</span>
            <sup>{weather.sys.country}</sup>
          </h2>
          <div className="city-temp">
            {weather.main.temp}
            <sup>&deg;C</sup>
          </div>
          <div className="info">
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
              className="city-icon"
            />
            <p>{weather.weather[0].description}</p>
          </div>
        </div>
      ) : (
        flag && (
          <div className="city">
            <h2 className="city-name">
              <span>NOT FOUND</span>
            </h2>
          </div>
        )
      )}
    </div>
  );
}

export default App;
