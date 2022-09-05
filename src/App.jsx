import React from "react";
import { useState } from "react";

const api = {
  key: "61d071fc066604ae8150d325cdb886cb",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = (e) => {
    if (e.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
          console.log(result);
        });
    }
  };

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  return (
    <div className="container">
      <h1>Weather App</h1>
      <div className="mt-5">
        <input
          className="btn"
          type="text"
          placeholder="search"
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          onKeyPress={search}
        />
      </div>
      {typeof weather.main != "undefined" ? (
        <div>
          <div className="container-location mt-3">
            <div className="location">
              {weather.name}, {weather.sys.country}
            </div>
            <div className="clouds">Clouds: {weather.clouds.all}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="container-weather">
            <div className="temp">Temperature: {weather.main.temp} C°</div>
            <div className="weather"></div>
          </div>
        </div>
      ) : ("")}
    </div>
  );
}

export default App;
