import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import PropTypes from 'prop-types';
import './Forecast.css';

const weekDays = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

function Forecast({ data }) {
  const dayInAWeek = new Date().getDay();
  const forecastDays = weekDays
    .slice(dayInAWeek, weekDays.length)
    .concat(weekDays.slice(0, dayInAWeek));

  return (
    <>
      <label htmlFor="title" className="title">
        Daily
        <input className="hidden" type="text" id="title" />
      </label>
      <Accordion allowZeroExpanded>
        {data.list.splice(0, 7).map((item, idx) => (
          // console.log('item', item);
          <AccordionItem key={item.dt}>
            <AccordionItemHeading>
              <AccordionItemButton>
                <div className="daily-item">
                  <img
                    alt="weather"
                    className="icon-small"
                    src={`icons/${item.weather[0].icon}.png`}
                  />
                  <label htmlFor="day" className="day">{ forecastDays[idx] }</label>
                  <label htmlFor="description" className="description">{ item.weather[0].description }</label>
                  <label htmlFor="minMax" className="min-max">
                    { Math.round(item.main.temp_min) }
                    °C /
                    {' '}
                    { Math.round(item.main.temp_max) }
                    °C
                  </label>
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <div className="daily-details-grid">
                <div className="daily-details-grid-item">
                  <label htmlFor="pressure">
                    Pressure
                    <input className="hidden" type="text" id="pressure" />
                  </label>
                  <label htmlFor="label-pressure">
                    <input className="hidden" type="text" id="label-pressure" />
                    {item.main.pressure}
                    hPa
                  </label>
                </div>
                <div className="daily-details-grid-item">
                  <label htmlFor="humidity">
                    Humidity
                    <input className="hidden" type="text" id="humidity" />
                  </label>
                  <label htmlFor="label-humidity">
                    <input className="hidden" type="text" id="label-humidity" />
                    {item.main.humidity}
                    %
                  </label>
                </div>
                <div className="daily-details-grid-item">
                  <label htmlFor="clouds">
                    Clouds
                    <input className="hidden" type="text" id="clouds" />
                  </label>
                  <label htmlFor="label-clouds">
                    <input className="hidden" type="text" id="label-clouds" />
                    {item.clouds.all}
                    %
                  </label>
                </div>
                <div className="daily-details-grid-item">
                  <label htmlFor="wind-speed">
                    Wind speed
                    <input className="hidden" type="text" id="wind-speed" />
                  </label>
                  <label htmlFor="wind-speed">
                    <input className="hidden" type="text" id="wind-speed" />
                    {item.wind.speed}
                    m/s
                  </label>
                </div>
                <div className="daily-details-grid-item">
                  <label htmlFor="sea-level">
                    Sea level
                    <input className="hidden" type="text" id="sea-level" />
                  </label>
                  <label htmlFor="sea-level">
                    <input className="hidden" type="text" id="sea-level" />
                    {item.main.sea_level}
                    m
                  </label>
                </div>
                <div className="daily-details-grid-item">
                  <label htmlFor="feels-like">
                    Feels like
                    <input className="hidden" type="text" id="feels-like" />
                  </label>
                  <label htmlFor="feels-like">
                    <input className="hidden" type="text" id="feels-like" />
                    {Math.round(item.main.feels_like)}
                    °C
                  </label>
                </div>
              </div>
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
}

Forecast.propTypes = {
  data: PropTypes.shape({
    weather: PropTypes.string.isRequired,
    list: PropTypes.objectOf(PropTypes.shape({
      main: PropTypes.arrayOf(PropTypes.shape({
        temp: PropTypes.number.isRequired,
      })),
    })),
  }).isRequired,
};

export default Forecast;
