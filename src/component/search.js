import React, { useState } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import PropTypes from 'prop-types';
import { GeoApiUrl, geoApiOptions } from '../api';

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  const loadOptions = async (inputValue) => {
    try {
      const response = await fetch(
        `${GeoApiUrl}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
        geoApiOptions,
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();

      return {
        options: responseData.data.map((city) => ({
          value: `${city.latitude} ${city.longitude}`,
          label: `${city.name}, ${city.countryCode}`,
        })),
      };
    } catch (err) {
      console.error('Error fetching data:', err);
      return { options: [] };
    }
  };

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
