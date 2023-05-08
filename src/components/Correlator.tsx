import _ from 'lodash';
import React from 'react';
import BootstrapButton from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { VictoryAxis, VictoryChart, VictoryScatter, VictoryVoronoiContainer } from 'victory';
import tinycolor from 'tinycolor2';

import { ScrollComponent, axisStyle } from '../constants';
import { useCountry } from '../contexts/CountryContext';
import {
  allCountries,
  allData,
  codeToName,
  cultureData,
  indicators,
  latestData,
  regions,
} from '../data';
import CountrySelect from './CountrySelect';
import HalfPageScroller from './HalfPageScroller';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import Highlight from './Highlight';

const colors = {
  Europe: '#1f77b4',
  'Asia & Pacific': '#ff7f0e',
  'South/Latin America': '#6dcf77',
  'Arab States': '#d62728',
  'North America': '#9467bd',
  Africa: '#8c564b',
  'Middle east': '#e377c2',
};

const dataExtractors = {
  // cultural dimensions
  powerDistance: {
    name: 'Power Distance',
    description: 'Higher values indicate a stronger power hierarchy',
    get: (code) => cultureData[code]?.powerDistance,
  },
  individuality: {
    name: 'Individuality',
    description: 'Higher values indicate looser ties with family and community',
    get: (code) => cultureData[code]?.individuality,
  },
  masculinity: {
    name: 'Masculinity',
    description:
      'Higher values indicate stereotypically masculine culture (hero-worshipping, achievement-centric, etc.)',
    get: (code) => cultureData[code]?.masculinity,
  },
  uncertaintyAvoidance: {
    name: 'Uncertainty Avoidance',
    description: 'Higher values indicate a culture that is more risk-averse',
    get: (code) => cultureData[code]?.uncertaintyAvoidance,
  },
  timeOrientation: {
    name: 'Time Orientation',
    description: 'Higher values indicate a culture that is more long-term oriented',
    get: (code) => cultureData[code]?.timeOrientation,
  },
  indulgence: {
    name: 'Indulgence',
    description: 'Higher values indicate a culture that is more hedonistic',
    get: (code) => cultureData[code]?.indulgence,
  },

  latest: {
    name: 'Graduates/students (%)',
    description: 'Latest graduates data from any source',
    get: (code) => latestData[code],
  },
  latestWorldBank: {
    name: 'STEM graduates (%, c. 2018)',
    description: 'Latest World Bank data',
    get: (code) =>
      _.maxBy(_.filter(allData[code], ['citation', 'World Bank']), 'year')?.participation,
  },
  earliestWorldBank: {
    name: 'STEM graduates (%, c. 2000)',
    description: 'Earliest World Bank data',
    get: (code) =>
      _.minBy(_.filter(allData[code], ['citation', 'World Bank']), 'year')?.participation,
  },
  delta: {
    name: 'Change in STEM graduates (p.p.)',
    description: 'Difference between latest and earliest World Bank data',
    get: (code) =>
      _.maxBy(_.filter(allData[code], ['citation', 'World Bank']), 'year')?.participation -
      _.minBy(_.filter(allData[code], ['citation', 'World Bank']), 'year')?.participation,
  },
  handpicked: {
    name: 'CS/Math students (%, c. 2000)',
    description: 'National and institutional data hand-curated by Galpin (2002)',
    get: (code) => _.maxBy(_.filter(allData[code], ['citation', 'Galpin']), 'year')?.participation,
  },
  unesco: {
    name: 'CS/Math graduates (%, c. 1997, UNESCO)',
    description: 'National data from UNESCO (1998)',
    get: (code) => _.find(allData[code], ['citation', 'UNESCO'])?.participation,
  },
  eu: {
    name: 'CS/Math students (%, c. 1998)',
    description: 'National data from the European Union',
    get: (code) => _.find(allData[code], ['citation', 'EU'])?.participation,
  },

  population: {
    name: 'Population',
    description: 'Population on a log scale (World Bank, 2021)',
    get: (code) => Math.log(indicators[code]?.population),
  },
  gdp: {
    name: 'GDP',
    description: 'GDP on a log scale (World Bank, 2021)',
    get: (code) => Math.log(indicators[code]?.gdp),
  },
  gdpPerCapita: {
    name: 'GDP per capita',
    description: '(World Bank, 2021)',
    get: (code) => indicators[code]?.gdpPerCapita / 1000,
  },
};

const highlights = ['POL', 'SRB', 'ROU', 'USA', 'CAN'];

const CorrelatorPlayground = React.createContext({
  xAxis: 'masculinity',
  setXAxis: (_) => {},
  yAxis: 'latestWorldBank',
  setYAxis: (_) => {},
  sizing: 'population',
  setSizing: (_) => {},
});

const Correlator: ScrollComponent = ({ currentStepIndex }) => {
  const country = useCountry();
  const { xAxis, yAxis, sizing } = React.useContext(CorrelatorPlayground);
  const X = ['masculinity', 'powerDistance', xAxis][currentStepIndex];
  const Y = ['latestWorldBank', 'latestWorldBank', yAxis][currentStepIndex];
  const S = ['population', 'population', sizing][currentStepIndex];
  const data = allCountries
    .map((code) => ({
      x: dataExtractors[X].get(code),
      y: dataExtractors[Y].get(code),
      amount: dataExtractors[S].get(code),
      code,
    }))
    .filter(({ x, y, amount }) => x && y && amount);

  return (
    <VictoryChart
      height={window.innerHeight * 0.8}
      width={window.innerWidth * 0.4}
      containerComponent={
        <VictoryVoronoiContainer
          labels={({ datum }) =>
            `${codeToName[datum.code]}\n${_.round(datum.x, 2)}, ${_.round(datum.y, 1)}%`
          }
        />
      }
    >
      <VictoryAxis label={dataExtractors[X].name} style={axisStyle} />
      <VictoryAxis dependentAxis label={dataExtractors[Y].name} style={axisStyle} />
      <VictoryScatter
        data={data}
        style={{
          data: {
            fill: ({ datum }) => {
              if (currentStepIndex === 1) {
                if (country === datum.code) return '#009E60';
                if (highlights.includes(datum.code)) {
                  return colors[regions[datum.code]];
                }
                return tinycolor(colors[regions[datum.code]])!.setAlpha(0.4).toHex8String();
              }
              return colors[regions[datum.code]];
            },
          },
        }}
        animate={{ duration: 500 }}
        bubbleProperty="amount"
        maxBubbleSize={25}
        minBubbleSize={5}
      />
    </VictoryChart>
  );
};

const Button = ({ x = false, y = false, s = false, value }) => {
  const { xAxis, setXAxis, yAxis, setYAxis, sizing, setSizing } =
    React.useContext(CorrelatorPlayground);
  const isSelected = (x && xAxis === value) || (y && yAxis === value) || (s && sizing === value);
  const update = (x && setXAxis) || (y && setYAxis) || setSizing;
  return (
    <OverlayTrigger
      placement="right"
      overlay={<Tooltip>{dataExtractors[value].description}</Tooltip>}
    >
      <BootstrapButton
        variant={isSelected ? 'primary' : 'outline-primary'}
        size="sm"
        onClick={() => update(value)}
      >
        {dataExtractors[value].name}
      </BootstrapButton>
    </OverlayTrigger>
  );
};

const CorrelatorScroller = () => {
  const country = useCountry();
  const [xAxis, setXAxis] = React.useState('masculinity');
  const [yAxis, setYAxis] = React.useState('latestWorldBank');
  const [sizing, setSizing] = React.useState('population');
  return (
    <CorrelatorPlayground.Provider value={{ xAxis, setXAxis, yAxis, setYAxis, sizing, setSizing }}>
      <HalfPageScroller Background={Correlator} textWidth={6}>
        <div>
          <p>
            The map is pretty, but not super helpful for seeing what the values actually are. On
            this graph, countries are coloured by their region and the size of the bubble denotes
            population. Hover over a dot to see the exact value.
          </p>
          <p>
            We hypothesized that cultural factors affect the gender gap and tested this by using
            Hofstede's six cultural dimensions.
          </p>
          <p>
            <small>
              Note: Masculinity here is not a measure of bias, but the tendency of a culture to be
              achievement-oriented and hero-worshipping.
            </small>
          </p>
        </div>
        <div>
          <p>
            You can see that some eastern European countries like{' '}
            <Highlight color="#1f77b4">Serbia</Highlight>,
            <Highlight color="#1f77b4">Romania</Highlight>, and{' '}
            <Highlight color="#1f77b4">Poland</Highlight> still stand out as the most equal European
            nations. Yet, they are also the most predisposed to a hierarchical society.
          </p>
          <p>
            We can also see that <Highlight color="#9467bd">Canada</Highlight> and{' '}
            <Highlight color="#9467bd">the United States</Highlight> are, as we know, culturally
            similar and have a similar gender gap.
          </p>
          <p>
            The country you selected before, <CountrySelect />, is also highlighted.
          </p>
        </div>
        <div>
          <p>Here's a bunch of data that we've collected. See if you can find any patterns:</p>
          <p>
            National indicators:{' '}
            <ButtonGroup vertical>
              <Button x value="masculinity" />
              <Button x value="powerDistance" />
              <Button x value="individuality" />
              <Button x value="uncertaintyAvoidance" />
              <Button x value="timeOrientation" />
              <Button x value="indulgence" />
            </ButtonGroup>
            {/* {'  '}
            <ButtonGroup vertical>
              <Button x value="masculinity" />
              <Button x value="powerDistance" />
              <Button x value="individuality" />
              <Button x value="uncertaintyAvoidance" />
              <Button x value="timeOrientation" />
              <Button x value="indulgence" />
            </ButtonGroup> */}
          </p>
          <p>
            Female participation rates:{' '}
            <ButtonGroup vertical>
              <Button y value="latest" />
              <Button y value="latestWorldBank" />
              <Button y value="earliestWorldBank" />
              <Button y value="delta" />
              <Button y value="handpicked" />
              <Button y value="unesco" />
              <Button y value="eu" />
            </ButtonGroup>
          </p>
          <p>
            Dot sizes:{' '}
            <ButtonGroup>
              <Button s value="population" />
              <Button s value="gdp" />
              <Button s value="gdpPerCapita" />
            </ButtonGroup>
          </p>
        </div>
      </HalfPageScroller>
    </CorrelatorPlayground.Provider>
  );
};

export default CorrelatorScroller;
