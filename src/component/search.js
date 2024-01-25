/* eslint-disable */
import React, { useState } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import PropTypes from 'prop-types';
import { GeoApiUrl, geoApiOptions } from '../api';

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  const loadOptions = (inputValue) => {
    return fetch(
    `${GeoApiUrl}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
    geoApiOptions,
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      response.json();
    })
    .then((response) => {
      return {
        options: response.data.map((city) => {
          return {
            value: `${city.latitude} ${city.longitude}`,
            label: `${city.name}, ${city.countryCode}`,
          };
        }),
      };
    })
    // .catch((err) => console.log(err));
    .catch((err) => {
      console.error('Error fetching data:', err);
      return { options: [] }; // Return empty options array in case of an error
    });
  }

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
  onSearchChange: PropTypes.func.isRequired,
};

export default Search;
