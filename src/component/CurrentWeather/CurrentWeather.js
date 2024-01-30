import './CurrentWeather.css';
import PropTypes from 'prop-types';

function CurrentWeather({ data }) {
  return (
    <div className="weather">
      <div className="top">
        <div>
          <p className="city">{ data.city }</p>
          <p className="weather-description">{ data.weather[0].description }</p>
        </div>
        <img alt="weather" className="weather-icon" src={`icons/${data.weather[0].icon}.png`} />
      </div>
      <div className="bottom">
        <p className="temperature">
          {Math.round(data.main.temp)}
          °C
        </p>
        <div className="details">
          <div className="parameter-row">
            <span className="parameter-label top">Details</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Feels like</span>
            <span className="parameter-value">
              {Math.round(data.main.feels_like)}
              °C
            </span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Wind</span>
            <span className="parameter-value">
              {data.wind.speed}
              {' '}
              m/s
            </span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Humidity</span>
            <span className="parameter-value">
              {data.main.humidity}
              %
            </span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Pressure</span>
            <span className="parameter-value">
              {data.main.pressure}
              {' '}
              hPa
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

CurrentWeather.propTypes = {
  data: PropTypes.shape({
    city: PropTypes.string.isRequired,
    // description: PropTypes.string.isRequired,
    // weather: PropTypes.string.isRequired,
    weather: PropTypes.arrayOf(PropTypes.shape({
      description: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
    })),
    main: PropTypes.arrayOf(PropTypes.shape({
      temp: PropTypes.number.isRequired,
      feels_like: PropTypes.number.isRequired,
      humidity: PropTypes.number.isRequired,
      pressure: PropTypes.number.isRequired,
    })),
    wind: PropTypes.arrayOf(PropTypes.shape({
      speed: PropTypes.number.isRequired,
    })),
  }).isRequired,
};

export default CurrentWeather;
