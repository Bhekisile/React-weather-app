import { useState } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import PropTypes from 'prop-types';
import { GeoApiUrl, geoApiOptions } from '../api';

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  const loadOptions = (inputValue) => fetch(
    `${GeoApiUrl}/cities?countryIds=174469&namePrefix=${inputValue}`,
    geoApiOptions,
  )
    .then((response) => response.json())
    .then((response) => {
      return {
        options: response.data.map((city) => {
          return {
            value: `${city.latitude} ${city.longitude}`,
            label: `${city.name}`, ${city.countryCode},
          };
        }),
      };
    })
    .catch((err) => console.error(err));

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  return (
    <AsyncPaginate
      placeholder="Search for city"
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
    />
  );
};

Search.propTypes = {
  onSearchChange: PropTypes.string.isRequired,
};

export default Search;
