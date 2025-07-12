import React, { useEffect, useState } from "react";
import {
  fetchAsyncCpuTopJobsChart,
  getCpuTopJobsChartData,
} from "../../../../../store/slices/topJobs/topJobsSlice";
import useQueryData from "../../../../../hooks/useQueryDataHistorical";
import * as _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import CanvasJSReact from "../../../../../scripts/canvasjs.react";
import usePDQueryData from "../../../ProblemDetermination/QueryDates/usePDQueryData";
import moment from "moment";
import { getUuidData } from "../../../../../store/slices/reports/SaveNewReport/SaveNewReport";
import useQueryDataRealTimeTopJobs from "../../../../../hooks/useQueryDataRealTimeTopJobs";
import {
  fetchAsyncRealTimeCpuTopJobsChart,
  getRealTimeCpuTopJobsChartData,
} from "../../../../../store/slices/topJobs/topJobsRealTimeMonitorSlice";
import { useSearchParams } from "react-router-dom";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;
const CpuJobType = ({ runReportStateValue, print, alertPage }) => {
  let qd = null;
  let [searchParams] = useSearchParams();
  const realTimeQuery = useQueryDataRealTimeTopJobs();
  let pdQueryDates = usePDQueryData();
  let historicalQueryDates = useQueryData();
  const uuid = useSelector(getUuidData);
  const sysid = searchParams.get("sysId");
  const entityName = searchParams.get("entityName");
  const getSysId = useSelector((state) => state.filters.system_filter?.id);
  if (runReportStateValue === false) {
    qd = {
      sdate: moment(new Date()).format(),
      edate: moment(new Date()).format(),
      stime: moment(new Date()).subtract(15, "minutes").format("h:mm:ss"),
      etime: moment(new Date()).format("h:mm:ss"),
      sysid: getSysId,
      pd: true,
    };
  } else if (runReportStateValue === true) {
    qd = { ...pdQueryDates, pd: true };
  } else {
    qd = historicalQueryDates;
  }
  const topJobsChartData = useSelector(
    alertPage ? getRealTimeCpuTopJobsChartData : getCpuTopJobsChartData
  );
  const dispatch = useDispatch();

  const [checkData, setCheckData] = useState(false);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (!uuid?.loading && uuid.data.uniqueid && !alertPage) {
      // if (qd && getSysId != undefined) {
      dispatch(fetchAsyncCpuTopJobsChart(qd));
      // }
    }
    if (alertPage) {
      dispatch(
        fetchAsyncRealTimeCpuTopJobsChart({
          ...realTimeQuery,
          sysid,
          entityName,
        })
      );
    }
  }, [dispatch, uuid]);

  useEffect(() => {
    if (print) {
      dispatch(fetchAsyncCpuTopJobsChart(qd));
    }
  }, [dispatch]);

  useEffect(() => {
    if (topJobsChartData.loading === false) {
      if (!_.isEmpty(topJobsChartData.data)) {
        if (!_.isEmpty(topJobsChartData.data?.data)) {
          if (topJobsChartData.data.data[0].length !== 0) {
            setCheckData(true);
            setChartData(topJobsChartData.data?.data[0]);
          }
        }
      } else {
        setCheckData(false);
      }
    }
  }, [topJobsChartData]);

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
      {topJobsChartData.loading && _.isEmpty(topJobsChartData.data) && (
        <div style={{ textAlign: "center" }}>Loading...</div>
      )}
      {!topJobsChartData.loading &&
        !_.isEmpty(topJobsChartData.data) &&
        checkData && <CanvasJSChart options={options} title={"CPU ms"} />}
      {!topJobsChartData.loading && checkData === false && (
        <div style={{ textAlign: "center" }}>
          <img
            style={{ height: "50%", width: "50%" }}
            src="/noData.webp"
            alt="No data available for CPU Jobs Chart"
          />
        </div>
      )}
    </div>
  );
};

export default CpuJobType;
