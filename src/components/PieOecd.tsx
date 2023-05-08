import React from 'react';
import { VictoryPie } from 'victory';

const PieOecd = ({ currentStepIndex }) => {
  const data: { x: string; y: number; label?: string }[] = [];

  data.push({
    x: "Men",
    y: 15,
  });
  data.push({
    x: "Women",
    y: 7,
  });
  return (
    <VictoryPie
      data={data}
      animate={{ duration: 500 }}
      colorScale={["teal", "#ffc0cb",]}
      padAngle={({ datum }) => datum.y}
      innerRadius={100}
      width={600}
    />
  );
};

export default PieOecd;
