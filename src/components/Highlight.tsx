import React from 'react';
import tinycolor from 'tinycolor2';

const Highlight = ({ color, children }) => {
  const rgba = tinycolor(color)!.setAlpha(0.8).toRgbString();
  return <span style={{ boxShadow: `inset 0 -.15em 0 ${rgba}` }}>{children}</span>;
};

export default Highlight;
