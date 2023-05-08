import participation from './participation_all.json';
import culture from './culture.json';
import _ from 'lodash';
import { iso31661 } from 'iso-3166';

export const codeToName = iso31661.reduce((acc, d) => ({ ...acc, [d.alpha3]: d.name }), {});
codeToName.USA = 'United States';
codeToName.GBR = 'United Kingdom';

export const allCountries = _.sortBy(
  _.uniq(participation.map((d) => d.code)),
  (code) => codeToName[code],
);

// source: https://meta.wikimedia.org/wiki/List_of_countries_by_regional_classification
import regions from './regions.json';
export { regions };

// source: https://data.worldbank.org/indicator/SP.POP.TOTL
import indicators from './indcators.json';
export { indicators };

export const allData = _.groupBy(participation, 'code');
export const latestData = allCountries.reduce((acc, code) => {
  const countryData = participation.filter((d) => d.code === code);
  const latest = _.maxBy(countryData, 'year');
  return {
    ...acc,
    [code]: latest.participation,
  };
}, {});
export const oldData = allCountries.reduce((acc, code) => {
  const countryData = participation.filter((d) => d.code === code && d.citation === 'UNESCO');
  const latest = _.maxBy(countryData, 'year');
  if (latest)
    return {
      ...acc,
      [code]: latest.participation,
    };
  return acc;
}, {});
export const disasterData = _.fromPairs(
  allCountries
    .map((code) => {
      const countryData = participation.filter((d) => d.code === code);
      const nineties = countryData.filter(({ year }) => year >= 1990 && year < 2000);
      const teens = countryData.filter(({ year }) => year >= 2010 && year < 2020);
      return [
        code,
        {
          before: nineties.length ? _.meanBy(nineties, 'participation') : NaN,
          after: teens.length ? _.meanBy(teens, 'participation') : NaN,
          code,
        },
      ];
    })
    .filter(([code, { before, after }]) => !_.isNaN(before) && !_.isNaN(after)),
);
export const cultureData = _.fromPairs(culture.map((d) => [d.code, d]));

export const highlightableCountries = allCountries.filter(
  (code) => disasterData[code] && cultureData[code],
);
