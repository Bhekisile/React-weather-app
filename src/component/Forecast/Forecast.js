import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
} from 'react-accessible-accordion';
import PropTypes from 'prop-types';

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
        <input type="text" id="title" />
      </label>
      <Accordion allowZeroExpanded>
        {data.list.splice(0, 7).map((item, idx) => (
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
