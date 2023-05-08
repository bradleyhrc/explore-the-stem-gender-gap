import React, { useState } from 'react';
import { Scrollama, Step } from 'react-scrollama';
import { ScrollComponent } from '../constants';

const HalfPageScroller: React.FC<{
  Background: ScrollComponent;
  children: React.ReactNode;
  textWidth?: number;
}> = ({ Background, children, textWidth = 8 }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const onStepEnter = ({ data }) => {
    setCurrentStepIndex(data);
  };

  const steps = React.Children.toArray(children);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className={`col-${textWidth}`}>
          <Scrollama offset={0.5} onStepEnter={onStepEnter}>
            {steps.map((step, stepIndex) => (
              <Step data={stepIndex} key={stepIndex}>
                <div
                  style={{
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <div>{step}</div>
                </div>
              </Step>
            ))}
          </Scrollama>
        </div>
        <div className={`col-${12 - textWidth}`}>
          <div
            style={{
              position: 'sticky',
              top: 0,
              height: '100vh',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Background currentStepIndex={currentStepIndex} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HalfPageScroller;
