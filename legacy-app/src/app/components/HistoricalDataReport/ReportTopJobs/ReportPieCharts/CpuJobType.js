import React,{useEffect,useState} from 'react'
import { fetchAsyncCpuTopJobsChartReports, getCpuTopJobsChartDataReport } from '../../../../../store/slices/reports/topJobsReport/topJobsReportSlice';
import useQueryData from "../../../../../hooks/useQueryDataHistorical";
import * as _ from 'lodash';
import { useSelector, useDispatch } from "react-redux";
import CanvasJSReact from '../../../../../scripts/canvasjs.react';
import usePDQueryData from '../../../ProblemDetermination/QueryDates/usePDQueryData';
import moment from 'moment';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const CpuJobTypeReport = ({ runReportStateValue,reportId }) => {
  let qd = null;
  let pdQueryDates = usePDQueryData();
  let historicalQueryDates = useQueryData();
  const getSysId = useSelector(state=>state.filters.system_filter?.id);
  if (runReportStateValue === false) {
    qd = {
      sdate: moment(new Date()).format(),
      edate: moment(new Date()).format(),
      stime: moment(new Date()).subtract(15, 'minutes').format('h:mm:ss'),
      etime: moment(new Date()).format('h:mm:ss'),
      sysid: getSysId,
      pd: true
    }
  } else if (runReportStateValue === true) {
    qd = { ...pdQueryDates, pd: true };
  } else {
    qd = historicalQueryDates;
  }
  const topJobsChartData = useSelector(getCpuTopJobsChartDataReport);
  const dispatch = useDispatch();

  const [checkData, setCheckData] = useState(false);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (qd && getSysId != undefined) {
      dispatch(fetchAsyncCpuTopJobsChartReports(reportId));
    }
  }, [dispatch, getSysId]);
  useEffect(() => {
    if (topJobsChartData.loading === false) {
          if(!(_.isEmpty(topJobsChartData.data))){
            if(!(_.isEmpty(topJobsChartData.data?.data))){
          if (topJobsChartData.data.data[0].length !== 0) {
            setCheckData(true);
            setChartData(topJobsChartData.data?.data[0]);
          }
        }
          }
            else{
        setCheckData(false);
      }
    }
    },[topJobsChartData])

  const options = {
    exportEnabled: true,
    animationEnabled: true,
    theme: "light2",
    title: {
      text: "Percentage Breakdown ",
      fontSize: 15,
    },
    legend: {
      verticalAlign: "center", 
      horizontalAlign: "left",
    },
    data: [
      {
        type: "pie",
        startAngle: 75,
        toolTipContent: "<b>{label}</b>: {y} %",
        showInLegend: "true",
        legendText: "{label} - {y}%",
        indexLabelFontSize: 16,
        indexLabel: "{label} - {y}%",
        dataPoints: chartData.map(({ total, jobname }) => ({
          y: +total,
          label: jobname,
        })),
      },
    ],
  };

   return (
    <div>
      {(topJobsChartData.loading) && (_.isEmpty(topJobsChartData.data)) && 
            <div style={{textAlign:"center"}}>Loading...</div>
        }
        {!topJobsChartData.loading && !_.isEmpty(topJobsChartData.data) && (checkData) &&
            <CanvasJSChart options={options} title={"CPU ms"} />
        }
        {
          !topJobsChartData.loading && (checkData === false) && 
          <div style={{textAlign:'center'}}><img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for CPU Jobs Chart"/></div>
        }
        </div>
  )
}

export default CpuJobTypeReport