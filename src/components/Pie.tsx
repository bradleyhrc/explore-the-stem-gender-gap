import React from 'react';
import { VictoryPie } from 'victory';

const FemaleCounter = ({ currentStepIndex }) => {
  const data: { x: string; y: number; label?: string }[] = [];

  if (currentStepIndex === 0) {
      data.push({
        x: " ",
        y: 100,
        label: " ",
      });
  } else {
    const percentWomen = [0.0517, 0.31][currentStepIndex - 1];
    // draw grid of women on left-hand side and grid of men on right-hand side
      data.push({
        x: "Men",
        y: 1-percentWomen,
      });
      data.push({
        x: "Women",
        y: percentWomen,
      });
  }

  return (
    <VictoryPie
      data={data}
      animate={{ duration: 500 }}
      colorScale= {currentStepIndex == 0 ? ["teal",] : ["teal", "#ffc0cb",]}
      padAngle={({ datum }) => datum.y}
      innerRadius={100}
      width={600}
    />
  );
};

export default FemaleCounter;
