import React, { useState } from 'react';
import { Scrollama, Step } from 'react-scrollama';
import { ScrollComponent } from '../constants';

const FullPageScroller: React.FC<{
  Background: ScrollComponent;
  children: React.ReactNode;
}> = ({ Background, children }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const onStepEnter = ({ data }) => {
    setCurrentStepIndex(data);
  };

  const steps = React.Children.toArray(children);

  return (
    <div>
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: -100,
        }}
      >
        <div className="container-fluid">
          <Background currentStepIndex={currentStepIndex} />
        </div>
      </div>
      <Scrollama offset={0.5} onStepEnter={onStepEnter}>
        {steps.map((step, stepIndex) => (
          <Step data={stepIndex} key={stepIndex}>
            <div
              className="container"
              style={{
                padding: `25vh 0 ${stepIndex === steps.length - 1 ? '50vh' : '25vh'} 0`,
                opacity: currentStepIndex === stepIndex ? 1 : 0.2,
                transition: 'opacity 0.5s',
                zIndex: '100',
              }}
            >
              <div className="row p-4 align-items-center rounded-3 border shadow-lg bg-white">
                {step}
              </div>
            </div>
          </Step>
        ))}
      </Scrollama>
    </div>
  );
};

export default FullPageScroller;
