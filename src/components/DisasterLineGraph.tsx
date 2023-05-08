import React from 'react';
import _ from 'lodash';
import { VictoryAxis, VictoryChart, VictoryLine, VictoryVoronoiContainer } from 'victory';

import { useCountry } from '../contexts/CountryContext';
import { codeToName, disasterData } from '../data';
import CountrySelect from './CountrySelect';
import HalfPageScroller from './HalfPageScroller';
import { ScrollComponent } from '../constants';
import Highlight from './Highlight';

const DisasterLineGraph: ScrollComponent = ({ currentStepIndex }) => {
  const country = useCountry();
  return (
    <VictoryChart
      height={window.innerHeight * 0.8}
      containerComponent={
        <VictoryVoronoiContainer
          labels={({ datum }) => `${codeToName[datum.code]}\n${_.round(datum.y, 1)}%`}
        />
      }
    >
      <VictoryAxis
        style={{
          axis: { stroke: 'white' },
          tickLabels: { fontFamily: 'inherit', fontSize: '20px' },
        }}
        dependentAxis
        tickValues={[25, 50, 75]}
      />
      <VictoryAxis
        style={{
          axis: { stroke: 'white' },
          tickLabels: { fontFamily: 'inherit', fontSize: '20px' },
        }}
      />
      {Object.values(disasterData).map(({ before, after, code }, i) => {
        const isBigDown = before > 50 && after < 50;
        const isGettingBalanced = before < after;
        return (
          <VictoryLine
            categories={{ x: ['1990s', '2010s'] }}
            data={[
              { x: '1990s', y: before, code },
              { x: '2010s', y: after, code },
            ]}
            style={{
              data: {
                stroke: [
                  '#222222',
                  isBigDown ? '#F92772' : 'grey',
                  code === country ? '#009E60' : 'grey',
                  isGettingBalanced ? '#A6E220' : 'grey',
                ][currentStepIndex],
                strokeWidth: ({ active }) =>
                  active
                    ? 4
                    : [
                        1.5,
                        isBigDown ? 1.5 : 1,
                        code === country ? 4 : 1,
                        isGettingBalanced ? 1.5 : 1,
                      ][currentStepIndex],
              },
            }}
            key={i}
          />
        );
      })}
    </VictoryChart>
  );
};

const DisasterLineScroller = () => {
  const country = useCountry();
  const disaster = disasterData[country];
  return (
    <HalfPageScroller Background={DisasterLineGraph}>
      <div>
        We've compiled data points demonstrating the participation ratios of women in STEM
        across different countries, from the 1990s to the 2010s.
      </div>
      <div>
        As discussed earlier, <Highlight color="#F92772">certain countries</Highlight> saw
        considerable drops in the ratio of women admitted in this time frame.
      </div>
      <div>
        But each country has their own story. If we consider <CountrySelect />, there was a{' '}
        <Highlight color="#009E60">
          {Math.abs(disaster.before - disaster.after) > 10 && 'big '}
          {Math.abs(disaster.before - disaster.after) < 2 && 'slight '}
          {disaster.before < disaster.after ? 'rise' : 'drop'} from {_.round(disaster.before, 2)}%
          to {_.round(disaster.after, 2)}%
        </Highlight>{' '}
        in the ratio of women.
      </div>
      <div>
        While certain countries show progress in their participation rates, others report a downward
        trend. But overall, <Highlight color="#A6E220">most countries</Highlight> are getting closer
        to the middle of the graph (50% participation of women in STEM). While this may not be
        enough, it does show a general trend towards a more balanced and inclusive environment.
      </div>
    </HalfPageScroller>
  );
};

export default DisasterLineScroller;
