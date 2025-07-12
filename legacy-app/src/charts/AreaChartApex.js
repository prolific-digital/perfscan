import React, {useEffect, useLayoutEffect, useState} from "react";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { fetchAsyncCPUMS, getCPUMsData } from "../store/slices/charts/cpuChartsSlice";
import useQueryData from "../hooks/useQueryData";
import ApexChart from "react-apexcharts";
import axios from 'axios';

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


export const AreaChartApex = () => {

    const [seriesData, setSeriesData] = useState([]);
    const [DataForChartA, setDataForChartA] = useState([]);

    

    const dispatch = useDispatch();
    const cpuMSData = useSelector(getCPUMsData);
    const activeChartView = useSelector(state => state.charts.activeChartView);
    const qd = useQueryData();
    
    let chartData1 = {
        series: [{
          data: []
        }],
        options: {
          chart: {
            id: 'area-datetime1',
            group: 'HistoricCharts',
            type: 'area',
            height: 350,
            zoom: {
              autoScaleYaxis: true
            }
          },
          legend: {
            show: true,
            position: 'top'
          },    
          annotations: {
            yaxis: [
              {
                y: 250000,
                borderColor: '#ff9b47',
                label: {
                  borderColor: '#ff9b47',
                  style: {
                    color: '#fff',
                    background: '#ff9b47'
                  },
                  text: 'Warning'
                }
              },
              {
                y: 350000,
                borderColor: '#FE0000',
                label: {
                  borderColor: '#FE0000',
                  style: {
                    color: '#fff',
                    background: '#FE0000'
                  },
                  text: 'Critical'
                }
              }
            ]
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
            min: new Date('01 Apr 2022').getTime(),
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
          noData: {
            text: 'Loading...'
          }
        },
        selection: 'one_month',
    }
    setDataForChartA(chartData1);
    useEffect(() => {
        dispatch(fetchAsyncCPUMS(qd));
    }, [dispatch])

    useEffect(() => {
        let op = getDataPoints(cpuMSData.data.data || [],"totalcpums");
        setSeriesData(op);
    }, [cpuMSData])

    useEffect(() => {
        setDataForChartA(chartData1);
        //ApexChart.exec('datetime1', 'updateSeries', [{data: seriesData}])
      }, [seriesData])
    
    return (
        <>
            <span className="chartTitle">CPU Utilization</span><span className="chartSubTitle"></span>
            <ApexChart options={DataForChartA.options} series={DataForChartA.series} type="area" height={350}/>
        </> 
    )
}

