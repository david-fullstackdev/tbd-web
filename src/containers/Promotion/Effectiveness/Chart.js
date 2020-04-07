import React from 'react';
import { Xaxis, Yaxis, Legend } from 'react-d3-core';
import { Area, Chart } from 'react-d3-shape';
import watchWidth from 'helpers/watchWidth';


const height = 400;
const chartSeries = [
  { color: '#bbd994', field: "tpr", name: "TPR" },
  { color: '#6d93ad', field: "sales", name: "Base Sales" },
  { color: '#75acd4', field: "impacts", name: "Competitive Pricing Impacts" }
];
const x = d => d.date;
const margin = 15;
const margins = { left: 50, right: margin, top: margin, bottom: 40 };

export const ChartLegend = () => (
  <Legend chartSeries={chartSeries} />
);

const EffectivenessChart = ({ data, width }) => (
  <Chart
    data={data}
    height={height}
    width={width}
    margins={margins}
    chartSeries={chartSeries}
    x={x}
    xScale="time"
    xLabel="Week"
    yTicks={[5]}
    yLabel="Volume"
  >
    <Area chartSeries={chartSeries} />
    <Yaxis />
    <Xaxis />
  </Chart>
);

export default watchWidth(EffectivenessChart);