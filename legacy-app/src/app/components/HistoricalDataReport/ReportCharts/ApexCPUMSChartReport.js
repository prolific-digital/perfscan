import React, { useEffect, useState } from "react";
// import Charts from 'react-apexcharts';
import Chart from 'react-apexcharts';

import { useSelector, useDispatch } from "react-redux";
import { fetchAsyncCPUMSReports, getCPUMsDataReports } from "../../../../store/slices/reports/historicaldatareportcharts/cpuReportChartsSlice";
import useQueryData from "../../../../hooks/useQueryData";
import {
    createChartDataMapping,
    showUtilizationTooltip,
    hideUtilizationTooltip,
    showTrendsTooltip,
    hideTrendsTooltip,
    getFormattedDate,
    getParametersIntoLocalStorage,
    saveParametersIntoLocalStorage,
  } from "../../../../helpers/commonHelper";

import ChartView from "../../common/ChartView";
import ChartViewTrend from "../../common/ChartViewTrend";
import * as _ from 'lodash';
import moment from "moment";

const ApexCPUMSChartReport = (syncHandler) => {
    const [dataForChart, setDataForChart] = useState([]);
    const [series, setSeries] = useState([]);
    const [options, setOptions] = useState(
        {
            chart: {
              id: 'area-datetime',
              group:'social',
              type: 'area',
              height: 350,
              zoom: {
                autoScaleYaxis: true,
                // autoScaleXaxis:true
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
                x: new Date('14 Nov 2012').getTime(),
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
              min: new Date('01 Mar 2012').getTime(),
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
        }
    )
    const dispatch = useDispatch();
    const cpuMSData = useSelector(getCPUMsDataReports);
    const activeChartView = useSelector(state => state.charts.activeChartView);
    const qd = useQueryData();
    const chartData1 = {
        data: []
    } 
    useEffect(() => {
        dispatch(fetchAsyncCPUMSReports(qd));
    }, [dispatch])

    useEffect(() => {
        let op = getDataPoints(cpuMSData.data.data || [],"totalcpums");
        setDataForChart([{
            data:[op]
        }]);
        chartData1.data.push(op);
        setSeries([{
            data:[op]
        }]);
    }, [cpuMSData])

    const CPUMsUtilization = createChartDataMapping(
        cpuMSData.data.data || [],
        "stackedColumn",
        "CPUMsUtilization"
    );
    const CPUMsTrends = createChartDataMapping(
        cpuMSData.data.trend || [],
        "stackedColumn",
        "CPUMsTrends"
    );

    
     const getDataPoints = (data, type) => {
        let finalOutput = [];
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
          finalOutput.push([moment(dt).valueOf(),+item[type]]);
          return (
            [ moment(dt).valueOf(),
             +item[type],]
          )
        });
        return result;
      };

    return (
            <>  {cpuMSData.loading &&
                    <span>loading....</span>
                }
                {!cpuMSData.loading && !_.isEmpty(cpuMSData.data) &&
                <div className="chart_container">
                    {activeChartView.isMetricsChart && (
                        <div id="chart">
                        <Chart options={options} series={series} type="area" height={350} />
                        </div>
                    )}
                    {activeChartView.isTrendsChart && (
                        <ChartViewTrend
                        data={CPUMsTrends}
                        title={"Total CPU ms used with Trends "}
                        yAxisTitle={"ms"}
                        //refHandler={(ref) => dispatch(setChartList(ref))}
                        //showTooltip={showTrendsTooltip}
                        isVisible={activeChartView.isTrendsChart}
                        //hideTooltip={hideTrendsTooltip}
                        //syncZoomHandler={syncTrendsZoomHandler}
                        xAxisDateFormat="MMM YYYY"
                        showTotal={false}
                      />
                    )}
                </div>
                }
            </>
    )
}

export default ApexCPUMSChartReport;