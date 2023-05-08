import _ from 'lodash';
import React from 'react';

const CountryContext = React.createContext<{ code: string; setCode: (_: string) => void }>({
  code: 'CAN',
  setCode: _.noop,
});
export const useCountry = () => React.useContext(CountryContext).code;
export default CountryContext;
