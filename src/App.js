import { useState } from 'react';
import Search from './component/search';
import './App.css';
import CurrentWeather from './component/CurrentWeather/CurrentWeather';
import { WeatherApiKey, WeatherApiUrl } from './api';

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    // console.log(searchData);
    const [lat, lon] = searchData.value.split(' ');

    const currentWeatherFetch = fetch(`${WeatherApiUrl}/weather?lat=${lat}&lon=${lon}&appid=${WeatherApiKey}`);
    const forecastFetch = fetch(`${WeatherApiUrl}/forecast?lat=${lat}&lon=${lon}&appid=${WeatherApiKey}`);

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });
      })
      .catch((err) => console.log(err));
  };

  console.log('current weather', currentWeather);
  console.log('forecast', forecast);

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      <CurrentWeather />
    </div>
  );
}

export default App;
