import React from 'react';
import { VictoryScatter } from 'victory';

const FemaleCounter = ({ currentStepIndex }) => {
  const data: { x: number; y: number; fill?: string }[] = [];

  if (currentStepIndex === 0) {
    // draw 100 students in a grid
    for (let i = 0; i < 100; i++) {
      data.push({
        x: Math.floor(i / 10) * 10,
        y: (i % 10) * 10,
        fill: '#222222',
      });
    }
  } else {
    const numberOfWomen = [42, 53, 34, 20][currentStepIndex - 1];
    // draw grid of women on left-hand side and grid of men on right-hand side
    for (let i = 0; i < 100; i++) {
      data.push({
        x: Math.floor(i / 10) * 10 + +(i >= numberOfWomen) * 75,
        y: (i % 10) * 10,
        fill: i < numberOfWomen ? '#ffc0cb' : 'teal',
      });
    }
  }

  return (
    <VictoryScatter
      data={data}
      animate={{ duration: 500 }}
      size={10}
      style={{
        data: {
          fill: ({ datum }) => datum.fill,
        },
      }}
    />
  );
};

export default FemaleCounter;
