import React, { useState } from 'react';
const api = {
  key: "c0d9809aad20beee9e67291d769f074a",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({})

  /*
  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
      .then(result => result.json())
      .then(result => { 
      setWeather(result);
      setQuery('');
      console.log(result);
      })
    }
  }
  */

  const search = () => {
    fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
    .then(result => result.json())
    .then(result => { 
    setWeather(result);
    
    console.log(result);
    })
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}`;
  }

  return (
    <div className={
      (typeof weather.main !="undefined") ? ((weather.main.temp > 16) ? 'App warm' : 'App')
      : 'App'
    }>
      <main> 
        <div className='search-box'>
          <input type="text" className="search-bar" 
          placeholder="Type here..."
          onChange={e => setQuery(e.target.value)}
          value={query}
          onKeyUp={search}
          /*onKeyPress={search}*/

          />
        </div>

      {(typeof weather.main != "undefined") ? (
      <div>
        <div className="location-box">
         <div className="location">{weather.name}, {weather.sys.country}</div>
          <div  className="date">{dateBuilder(new Date())}</div>
        </div>

        <div className="weather-box">
          <div className="temp">
          {Math.round(weather.main.temp)}°C
          </div>
      <div className="weather">{weather.weather[0].main}</div>
      <div className="weather">{weather.main.pressure} hPa</div>
      <div className="weather">Wind: {weather.wind.deg}deg {weather.wind.speed}m/s</div>
        </div>
      </div>
      ) : (
        <div>
        <div className="location-box">
         <div className="location">Type in localization above.</div>
          <div  className="date">{dateBuilder(new Date())}</div>
        </div>

        <div className="weather-box">
          <div className="temp">
          Temp.
          </div>
      <div className="weather">Weather</div>
        </div>
      </div>
      )}
      </main>
    </div>
  );
}

export default App;
