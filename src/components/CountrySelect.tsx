import React from 'react';
import Select from 'react-select';
import CountryContext from '../contexts/CountryContext';
import _ from 'lodash';
import { codeToName, highlightableCountries } from '../data';

const CountrySelect = () => {
  const { code, setCode } = React.useContext(CountryContext);
  const options = highlightableCountries.map((code) => ({
    value: code,
    label: codeToName[code],
  }));
  return (
    <Select
      value={options.find((o) => o.value === code)}
      onChange={(o) => setCode(o.value)}
      options={options}
      styles={{
        container: (provided) => ({
          ...provided,
          display: 'inline-block',
        }),
        control: (provided) => ({
          ...provided,
          border: 'none',
          boxShadow: `inset 0 -.15em 0 #009E60`,
          borderRadius: 0,
        }),
        valueContainer: (provided) => ({
          ...provided,
          padding: 0,
        }),
        indicatorSeparator: (provided) => ({
          display: 'none',
        }),
      }}
    />
  );
};

export default CountrySelect;
