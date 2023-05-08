import React from 'react';
import FullPageScroller from './FullPageScroller';
import { VictoryAxis, VictoryChart, VictoryLegend, VictoryLine } from 'victory';
import { ScrollComponent, axisStyle } from '../constants';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const data = {
  bio: { name: 'Biology', color: 'red', data: [25, 31.2, 45.5, 50.2, 59.8] },
  chem: { name: 'Chemistry', color: 'orange', data: [18.5, 22.5, 36.3, 43.1, 51.8] },
  math: { name: 'Math', color: 'green', data: [33.3, 40.7, 46.5, 45.8, 44.9] },
  ess: { name: 'Earth/Space', color: 'blue', data: [9.4, 18.3, 22.3, 33.3, 41.2] },
  phys: { name: 'Physics', color: 'darkblue', data: [4.9, 10.9, 14.6, 18.5, 20.7] },
  eng: { name: 'Engineering', color: 'purple', data: [0.4, 3.4, 14.5, 17.9, 19.5] },
  cs: { name: 'CS', color: 'pink', data: [14.6, 19.8, 35.8, 27.6, 20.5] },
};

const LineGraph: ScrollComponent = ({ currentStepIndex }) => {
  return (
    <VictoryChart width={window.innerWidth * 0.8} height={window.innerHeight * 0.8}>
      <VictoryAxis style={axisStyle} />
      <VictoryAxis style={axisStyle} label="Bachelors earned by women (%)" dependentAxis />
      <VictoryLegend
        orientation="horizontal"
        style={axisStyle}
        gutter={20}
        data={Object.keys(data).map((key) => ({
          name: data[key].name,
          symbol: { fill: data[key].color },
        }))}
      />
      {Object.keys(data).map((key, i) => (
        <VictoryLine
          animate={{ duration: 500 }}
          key={i}
          data={data[key].data.slice(0, [2, 3, 5][currentStepIndex]).map((y, i) => ({
            x: ['1966', '1976', '1986', '1996', '2006'][i],
            y,
          }))}
          style={{
            data: {
              stroke: data[key].color,
              strokeWidth: key === 'cs' ? 4 : 1.5,
            },
          }}
        />
      ))}
    </VictoryChart>
  );
};

const LineGraphScroller = () => {
  return (
    <FullPageScroller Background={LineGraph}>
      <div>
        In the United States from 1970 to 1980 the ratio of women in computer science programs, like
        every other STEM field,
        <OverlayTrigger placement="top" overlay={<Tooltip>(Hill et al., 2010)</Tooltip>}>
          <a href="https://www.aauw.org/app/uploads/2020/03/why-so-few-research.pdf">
            was actually increasing
          </a>
        </OverlayTrigger>
        .
      </div>
      <div>
        It reached almost 40% before the trend reversed and it started declining to 20% in the 2000s
        where it's remained until today.
      </div>
      <div>
        Why is it that in the United States the gender ratio of women has steadily increased for
        most stem fields except computer science?
      </div>
    </FullPageScroller>
  );
};

export default LineGraphScroller;
