import './CurrentWeather.css';

function CurrentWeather() {
  return (
    <div className="weather">
      <div className="top">
        <div>
          <p className="city">Johannesburg</p>
          <p className="weather-description">Sunny</p>
        </div>
        <img alt="weather" className="weather-icon" src="icons/01d.png" />
      </div>
    </div>
  );
}

export default CurrentWeather;
