import React from 'react';
import _ from 'lodash';
import {
  VictoryChart,
  VictoryGroup,
  VictoryBar,
  VictoryLegend,
  VictoryVoronoiContainer,
  VictoryAxis,
} from 'victory';

import stereotypeData from '../data/stereotypes.json';
import HalfPageScroller from './HalfPageScroller';
import { ScrollComponent, axisStyle } from '../constants';
import Highlight from './Highlight';

const BarGraph: ScrollComponent = ({ currentStepIndex }) => {
  const caseNum = stereotypeData[currentStepIndex];
  const range = [1, 7];

  return (
    <VictoryChart
      height={window.innerHeight * 0.8}
      domain={{ y: [range[0], range[1]] }}
      domainPadding={{ x: 60 }}
      containerComponent={<VictoryVoronoiContainer labels={({ datum }) => `${datum.y}`} />}
    >
      <VictoryAxis style={axisStyle} />
      <VictoryAxis style={axisStyle} dependentAxis />
      <VictoryLegend
        orientation="horizontal"
        style={axisStyle}
        gutter={20}
        data={[
          { name: 'Men', symbol: { fill: 'teal' } },
          { name: 'Women', symbol: { fill: '#ffc0cb' } },
        ]}
      />
      <VictoryGroup
        offset={20}
        animate={{ duration: 400, onLoad: { duration: 200 } }}
        colorScale={['teal', '#ffc0cb']}
      >
        <VictoryBar
          data={[
            { x: 'Before', y: caseNum.before[0] },
            { x: 'Stereotypical', y: caseNum.stereotypical[0] },
            { x: 'Non-Stereotypical', y: caseNum.nonstereotypical[0] },
          ]}
        />
        <VictoryBar
          data={[
            { x: 'Before', y: caseNum.before[1] },
            { x: 'Stereotypical', y: caseNum.stereotypical[1] },
            { x: 'Non-Stereotypical', y: caseNum.nonstereotypical[1] },
          ]}
        />
        <VictoryBar
          data={[
            { x: 'Before', y: caseNum.before[2] },
            { x: 'Stereotypical', y: caseNum.stereotypical[2] },
            { x: 'Non-Stereotypical', y: caseNum.nonstereotypical[2] },
          ]}
        />
      </VictoryGroup>
    </VictoryChart>
  );
};

const BarGraphScroller = () => {
  return (
    <HalfPageScroller Background={BarGraph}>
      <div>
        An experiment with 165 high school students in the northwestern United States asked them to
        rate their interest in taking a CS class from 1-7. This is their interest before seeing a
        picture of the classroom.
      </div>
      <div>
        After seeing a picture of a <Highlight color="teal">stereotypical CS classroom</Highlight>{' '}
        with Star Wars/Star Trek items, electronics, software, tech magazines, computer parts, video
        games, computer books, and science fiction books, the interest levels did not meaningfully
        change.
      </div>
      <div>
        However, after seeing a picture of a{' '}
        <Highlight color="teal">non-stereotypical CS classroom</Highlight> with nature pictures, art
        pictures, water bottles, pens, a coffee maker, lamps, general magazines, and plants, the
        interest of girls increased and the interest of boys still remained about the same.
      </div>
    </HalfPageScroller>
  );
};

export default BarGraphScroller;
