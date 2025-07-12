import React, {useEffect} from "react";
import {scaleLinear, scaleTime, max, timeFormat, extent } from 'd3';
import moment from "moment";

import { fetchAsyncCPUMS, getCPUMsData } from "../../store/slices/charts/cpuChartsSlice";
import { useSelector, useDispatch } from "react-redux";
import useQueryData from "../../hooks/useQueryData";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";

const getDataPoints = (data, type) => {
    
    let result = data.map((item, index) => {
      let dateTime = item.event_time
        ? moment(item.event_time)
        : moment();
      const year = dateTime.year();
      const month = dateTime.month();
      const date = dateTime.date();
      const hours = dateTime.hours();
      const minutes = dateTime.minutes();
      return {
        x: new Date(year, month, date, hours, minutes),
        y: +item[type],
      };
    });
    return result;
};

export const StackedBarChart = ({data}) => {
    //const cpuMSData = useSelector(getCPUMsData);
    //const qd = useQueryData();
   
    //const data = cpuMSData;
    const dataCPUMsUtilization = getDataPoints(data, "totalcpums");
    
    const width = 960;
    const height = 500;
    const margin = { top: 20, right: 30, bottom: 65, left: 90 };
    const xAxisLabelOffset = 25;
    const yAxisLabelOffset = 75;

    const innerHeight = height - margin.top - margin.bottom;
    const innerWidth = width - margin.left - margin.right;

    const xValue = d => d.x;
    const xAxisLabel = 'Time';

    const yValue = d => d.y;
    const yAxisLabel = 'CPU Ms';
    
    const xAxisTickFormat = timeFormat('%b %Y');

    const xScale = scaleTime()
      .domain(extent(dataCPUMsUtilization, xValue))
      .range([0, innerWidth])
      .nice();
  
    const yScale = scaleLinear()
      .domain(extent(dataCPUMsUtilization, yValue))
      .range([innerHeight, 0]);
  

   
    return <>
        <svg width={width} height={height}>
        <g transform={`translate(${margin.left},${margin.top})`}>
        <AxisBottom
          xScale={xScale}
          innerHeight={innerHeight}
          tickFormat={xAxisTickFormat}
          tickOffset={-5}
        />
        <text
          className="axis-label"
          x={innerWidth / 2}
          y={innerHeight + xAxisLabelOffset}
          textAnchor="middle"
        >
          {xAxisLabel}
        </text>
        <AxisLeft yScale={yScale} innerWidth={innerWidth} tickOffset={10} />
        <text
          className="axis-label"
          textAnchor="middle"
          transform={`translate(${-yAxisLabelOffset},${innerHeight /
            2}) rotate(-90)`}
        >
          {yAxisLabel}
        </text>
        
        </g>
        </svg>
    </>
}