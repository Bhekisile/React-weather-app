import { useState } from 'react';
import Search from './component/search';
import './App.css';
import CurrentWeather from './component/CurrentWeather/CurrentWeather';
import { WeatherApiKey, WeatherApiUrl } from './api';
import Forecast from './component/Forecast/Forecast';

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(' ');

    const currentWeatherFetch = fetch(`${WeatherApiUrl}/weather?lat=${lat}&lon=${lon}&appid=${WeatherApiKey}&units=metric`);
    const forecastFetch = fetch(`${WeatherApiUrl}/forecast?lat=${lat}&lon=${lon}&appid=${WeatherApiKey}&units=metric`);

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default App;
