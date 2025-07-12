import React, { useDebugValue } from "react";
import { Chart } from "react-google-charts";
import { createChartDataMapping } from "../../../helpers/commonHelper";
import { useSelector, useDispatch } from "react-redux";
import { fetchAsyncWhatsChangedCPUUtilization,getWhatChangedCPUData } from "../../../store/slices/charts/cpuChartsSlice";
import moment from "moment";
import * as _ from 'lodash';

export const getDataPoints = (data, type) => {
    let result = data.map((item, index) => {
      let dateTime = item.event_time
        ? moment(item.event_time)
        : moment();
      const year = dateTime.year();
      const month = dateTime.month();
      const date = dateTime.date();
      const hours = dateTime.hours();
      const minutes = dateTime.minutes();
      return [
        new Date(year, month, date, hours, minutes),
        +item[type],
      ];
    });
    result.unshift(["Date","SysCPU"]);
    return result;
  };

export const data = [
  ["Date", "Value"],
  [new Date(1996, 1, 1), 2000 * Math.random()],
  [new Date(1997, 1, 1), 2000 * Math.random()],
  [new Date(1998, 1, 1), 2000 * Math.random()],
  [new Date(1999, 1, 1), 2000 * Math.random()],
  [new Date(2000, 1, 1), 2000 * Math.random()],
  [new Date(2001, 1, 1), 2000 * Math.random()],
  [new Date(2002, 1, 1), 2000 * Math.random()],
  [new Date(2003, 1, 1), 2000 * Math.random()],
  [new Date(2004, 1, 1), 2000 * Math.random()],
  [new Date(2005, 1, 1), 2000 * Math.random()],
  [new Date(2006, 1, 1), 2000 * Math.random()],
  [new Date(2007, 1, 1), 2000 * Math.random()],
  [new Date(2008, 1, 1), 2000 * Math.random()],
  [new Date(2009, 1, 1), 2000 * Math.random()],
];

export const options = {
  chartArea: { height: "100%", width: "100%" },
  hAxis: { slantedText: false },
  vAxis: { viewWindow: { min: 0, max: 5 } },
  legend: { position: "none" },
};

function GoogleChart() {
const cpuData = useSelector(getWhatChangedCPUData); 

const CPUUtilizationData = getDataPoints(
    cpuData.data.data || [],
    "syscpu"
);

  return (
    <>
    {!cpuData.loading && !_.isEmpty(cpuData.data) &&
    <Chart
      chartType="LineChart"
      width="100%"
      height="400px"
      data={CPUUtilizationData}
      options={options}
      chartPackages={["corechart", "controls"]}
      controls={[
        {
          controlType: "ChartRangeFilter",
          options: {
            filterColumnIndex: 0,
            ui: {
              chartType: "LineChart",
              chartOptions: {
                chartArea: { width: "100%", height: "50%" },
                hAxis: { baselineColor: "none" },
              },
            },
          },
          controlPosition: "bottom",
          controlWrapperParams: {
            state: {
              range: {
                start: new Date(2021, 8, 18),
                end: new Date(2022, 8, 18),
              },
            },
          },
        },
      ]}
    />
    }
    </>
  );
}

export default GoogleChart;