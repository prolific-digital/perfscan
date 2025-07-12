import React, {useEffect, useLayoutEffect, useState} from "react";
import {scaleLinear, scaleTime, max, timeFormat, extent } from 'd3';
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { fetchAsyncCPUMS, getCPUMsData } from "../../store/slices/charts/cpuChartsSlice";
import useQueryData from "../../hooks/useQueryData";
import ReactApexChart from "react-apexcharts";
import { changeActiveLinkFromLocation } from "react-metismenu/lib/actions/content";

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
      const dt = new Date(year, month, date, hours, minutes);
      return [
        moment(dt).valueOf(),
        +item[type],
      ];
    });
    return result;
};

export const StackedBarChart = ({data}) => {
  
  const [DataForChart, setDataForChart] = useState();
  const [Series, setSeries] = useState();
  
  const chartData = {
    series: [{
      data: Series
    }],
    options: {
      chart: {
        id: 'area-datetime1',
        group:'HistoricalCharts',
        type: 'area',
        height: 350,
        zoom: {
          autoScaleYaxis: true
        }
      },
      annotations: {
        yaxis: [{
          y: 30,
          borderColor: '#999',
          label: {
            show: true,
            text: 'Support',
            style: {
              color: "#fff",
              background: '#00E396'
            }
          },
          labels:{
            minWidth: 40
          }
        }],
        xaxis: [{
          x: new Date('01 Mar 2022').getTime(),
          borderColor: '#999',
          yAxisIndex: 0,
          label: {
            show: true,
            text: 'Rally',
            style: {
              color: "#fff",
              background: '#775DD0'
            }
          }
        }]
      },
      dataLabels: {
        enabled: false
      },
      markers: {
        size: 0,
        style: 'hollow',
      },
      xaxis: {
        type: 'datetime',
        min: new Date('01 Mar 2022').getTime(),
        tickAmount: 6,
      },
      tooltip: {
        x: {
          format: 'dd MMM yyyy'
        }
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.9,
          stops: [0, 100]
        }
      },
    },
    // selection: 'one_year',
  }


  const dispatch = useDispatch();
  const cpuMSData = useSelector(getCPUMsData);
  const activeChartView = useSelector(state => state.charts.activeChartView);
  const qd = useQueryData();
   
  useEffect(() => {
      dispatch(fetchAsyncCPUMS(qd));
  }, [dispatch])

  useEffect(() => {
    let op = getDataPoints(cpuMSData.data.data || [],"totalcpums");
    //setDataForChart(op);
    setSeries(op);
  }, [cpuMSData])

  useEffect(() => {
    setDataForChart(chartData);
  }, [Series])

  
    const tdate = new Date();
    return <>
      {DataForChart && DataForChart.series[0].data?.length &&
        <ReactApexChart options={DataForChart.options} series={DataForChart.series} type="area" height={350}/> 
      }   
    </>
}