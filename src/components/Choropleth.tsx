import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
console.log(d3);
import { geoRobinson } from 'd3-geo-projection';
import { ScrollComponent } from '../constants';
import topo from '../data/world.json';
import FullPageScroller from './FullPageScroller';
import { allData, latestData, oldData } from '../data';

const drawSvg = ({ inputRef, data }) => {
  const width = 800;
  const height = 450;
  const container = d3.select(inputRef.current);
  container.selectAll('*').remove();
  const svg = container
    .append('svg')
    .attr('width', '100%')
    .attr('height', 'auto')
    .attr('viewBox', `0 0 ${width} ${height}`);

  // style of geographic projection and scaling
  const projection = geoRobinson()
    .scale(130)
    .translate([width / 2, height / 2]);

  // Define color scale
  const colorScale = d3.scaleThreshold().domain([0, 10, 20, 30, 40, 50]).range(d3.schemeOrRd[7]);

  // add tooltip
  const tooltip = d3.select('body').append('div').attr('class', 'tooltip').style('opacity', 0);

  let mouseOver = function (e, d) {
    d3.selectAll('.Country')
      .transition()
      .duration(200)
      .style('opacity', 0.5)
      .style('stroke', 'transparent');
    d3.select(this).transition().duration(200).style('opacity', 1).style('stroke', 'black');
    const [x, y] = d3.pointer(e);
    tooltip
      .style('left', x + 15 + 'px')
      .style('top', y - 28 + 'px')
      .transition()
      .duration(400)
      .style('opacity', 1)
      .text(d.properties.name + ': ' + Math.round((d.total / 1000000) * 10) / 10 + ' mio.');
  };

  let mouseLeave = function () {
    d3.selectAll('.Country')
      .transition()
      .duration(200)
      .style('opacity', 1)
      .style('stroke', 'transparent');
    tooltip.transition().duration(300).style('opacity', 0);
  };

  // Draw the map
  const world = svg.append('g').attr('class', 'world');
  world
    .selectAll('path')
    .data(topo.features)
    .enter()
    .append('path')
    // draw each country
    // d3.geoPath() is a built-in function of d3 v4 and takes care of showing the map from a properly formatted geojson file, if necessary filtering it through a predefined geographic projection
    .attr('d', d3.geoPath().projection(projection))

    //retrieve the name of the country from data
    .attr('data-name', function (d) {
      return d.properties.name;
    })

    // set the color of each country
    .attr('fill', function (d) {
      d.total = data[d.id] || 0;
      return colorScale(d.total);
    })

    // add a class, styling and mouseover/mouseleave and click functions
    .style('stroke', 'transparent')
    .attr('class', function (d) {
      return 'Country';
    })
    .attr('id', function (d) {
      return d.id;
    })
    .style('opacity', 1)
    .on('mouseover', mouseOver)
    .on('mouseleave', mouseLeave);
};

const Choropleth: ScrollComponent = ({ currentStepIndex }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    drawSvg({ inputRef, data: [latestData, oldData][currentStepIndex] });
  }, [currentStepIndex]);

  return <div id="choropleth-container" ref={inputRef} />;
};

const ChoroplethScroller = () => {
  return (
    <FullPageScroller Background={Choropleth}>
      <div>
        We can visualize which countries have a higher female participation rate from the previous
        dataset by plotting on a map of the globe.
      </div>
      <div>
        With the oldest dataset we have, there is actually a clearer geographic pattern: eastern
        Europe and central Asia have a handful of majority-women STEM/CS programs.
      </div>
    </FullPageScroller>
  );
};

export default ChoroplethScroller;
