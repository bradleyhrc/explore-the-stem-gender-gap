import React from 'react';
export type ScrollComponent = React.FC<{ currentStepIndex: number }>;
export const axisStyle = {
  labels: { fontFamily: 'inherit', fontSize: 15, padding: 5 },
  tickLabels: { fontFamily: 'inherit', fontSize: 15, padding: 5 },
  axisLabel: { fontSize: 20, fontFamily: 'inherit', padding: 30 },
};
