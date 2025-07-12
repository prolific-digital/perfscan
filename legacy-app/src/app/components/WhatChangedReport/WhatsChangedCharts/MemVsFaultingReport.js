import React, { useEffect, useState, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAsyncMemorySizeVsFaultingWhatsChanged,
  getMemoryVsFaultingDataWc,
} from "../../../../store/slices/charts/memoryChartsSlice";
import CanvasJSReact from "../../../../scripts/canvasjs.stock.react";
import useQueryData from "../../../../hooks/useQueryDataWhatsChanged";
import ContentLoader from "react-content-loader";
import * as _ from "lodash";
import { Dropdown } from "primereact/dropdown";
import {
  createChartDataMapping,
  showUtilizationTooltip,
  hideUtilizationTooltip,
  showTrendsTooltip,
  hideTrendsTooltip,
  getFormattedDate,
  getParametersIntoLocalStorage,
  saveParametersIntoLocalStorage,
  getDataPointsForPoolNumBasedCharts,
} from "../../../../helpers/commonHelper";
import { DISK_OPERATIONS } from "../../../../typeCodes/index";
import ChartView from "../../common/ChartView";
import { fetchAsyncMemorySizeVsFaultingReports, getMemoryVsFaultingDataReports } from "../../../../store/slices/reports/DataReportCharts/memoryReportChartsSlice";
import GridLoader from "react-spinners/GridLoader";

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;

const MemVsFaultingReport = ({reportId,queryReportData}) => {
  const dispatch = useDispatch();
  const memoryVsFaultingData = useSelector(getMemoryVsFaultingDataReports);
  const [allMemVsFaultPools, setAllMemVsFaultPools] = useState([]);
  const [pNumChangeMemVsFault, setPNumChangeMemVsFault] = useState([]);
  const [memVsFaultDataPoints, setMemVsFaultDataPoints] = useState([]);
  const [checkData, setCheckData] = useState(false); //new

  const activeChartView = useSelector((state) => state.charts.activeChartView);
  const qd = useQueryData();
  useEffect(() => {
    dispatch(fetchAsyncMemorySizeVsFaultingReports(reportId));
  }, [dispatch]);

  useEffect(() => {
    if (memoryVsFaultingData?.data?.data) {
      createChartDataMappingForMemoryVSFault("All");
    }

    if (
      memoryVsFaultingData.loading === false &&
      !_.isEmpty(memoryVsFaultingData.data)
    ) {
      if (memoryVsFaultingData.data.data.length === 0) {
        setCheckData(false);
      } else {
        setCheckData(true);
      }
    }
  }, [memoryVsFaultingData]);

  const createChartDataMappingForMemoryVSFault = async (indx) => {
    let memVsFaultData = memoryVsFaultingData;
    let memorySizeVsFaultingData = {};
    let poolListWithAllTag = new Array();
    memorySizeVsFaultingData = memVsFaultData.data || {};
    poolListWithAllTag = [
      ...memVsFaultData.data.pools,
      { value: "All", label: "All Pools" },
    ];
    setAllMemVsFaultPools(poolListWithAllTag);

    if (indx == "All") {
      setPNumChangeMemVsFault(indx);
      let originaldata = [];
      let poolNums = [];
      let poolStringValues = poolListWithAllTag;
      for (let i = 0; i < poolStringValues.length; ++i) {
        if (poolStringValues[i].value != "All") {
          poolNums[i] = Number(poolStringValues[i].value);
        }
      }
      for (let i = poolNums[0]; i <= poolNums[poolNums.length - 1]; ++i) {
        originaldata = originaldata.concat(memorySizeVsFaultingData.data[i]);
      }

      const data_Faulting = getDataPointsForPoolNumBasedCharts(
        originaldata,
        "faulting_rate"
      );
      const data_memory_size = getDataPointsForPoolNumBasedCharts(
        originaldata,
        "memory_size"
      );

      let chartDataMemVsFault = [
        {
          ...DISK_OPERATIONS,
          type: "stackedColumn",
          dataPoints: data_Faulting,
          color: "#b81f0a",
          name: "Fault / Sec",
        },
        {
          ...DISK_OPERATIONS,

          type: "stepLine",
          showInLegend: true,
          axisYType: "secondary",
          xValueFormatString: "####",
          axisYIndex: 1,
          dataPoints: data_memory_size,
          color: "#1EB294",
          name: "Total Memory Size (GB)",
        },
      ];
      setMemVsFaultDataPoints(chartDataMemVsFault);
    } else {
      setPNumChangeMemVsFault(indx);
      let originaldata = memorySizeVsFaultingData.data[indx];
      const data_Faulting = getDataPointsForPoolNumBasedCharts(
        originaldata,
        "faulting_rate"
      );
      const data_memory_size = getDataPointsForPoolNumBasedCharts(
        originaldata,
        "memory_size"
      );
      let chartDataMemVsFault = [
        {
          ...DISK_OPERATIONS,
          type: "stackedColumn",
          dataPoints: data_Faulting,
          color: "#b81f0a",
          name: "Fault / Sec",
        },
        {
          ...DISK_OPERATIONS,

          type: "stepLine",
          showInLegend: true,
          axisYType: "secondary",
          xValueFormatString: "####",
          axisYIndex: 1,
          dataPoints: data_memory_size,
          color: "#1EB294",
          name: "Total Memory Size (GB)",
        },
      ];
      setMemVsFaultDataPoints(chartDataMemVsFault);
    }
  };

  const memoryVsFaultingDataTrends = createChartDataMapping(
    memoryVsFaultingData.data.trend || [],
    "stackedColumn",
    "memorySizeVsFaultingTrends"
  );

  return (
    <>
      {" "}
      {memoryVsFaultingData.loading && (
        <div className="chart_container">
          <div style={{ display: "block", margin: "auto" }}>
            <GridLoader color="#366bd6"/>
          </div>
          <div style={{ display: "block", margin: "auto" }}>
            <GridLoader color="#366bd6"/>
          </div>
        </div>
      )}
      {!memoryVsFaultingData.loading && !_.isEmpty(memoryVsFaultingData.data) && (
        <>
          <>
            <span className="chart_dropDown">
              <p className="chart_dropDown_name">Select Pool Number</p>
              <Dropdown
                value={pNumChangeMemVsFault}
                options={allMemVsFaultPools}
                onChange={(e) =>
                  createChartDataMappingForMemoryVSFault(e.value)
                }
                placeholder="Select a Pool Number"
              />
            </span>
          </>
          <div className="chart_container">
            {activeChartView.isMetricsChart && (
              <ChartView
                data={memVsFaultDataPoints}
                key={"memvsfaulting"}
                title={"MemVsFaulting"}
                yAxisTitle={"Utilization"}
                isVisible={true}
                maximum={10}
                // minimum={0}
                showTotal={false}
              />
            )}
          </div>

          {!memoryVsFaultingData.loading &&
            checkData === false &&
            activeChartView.isMetricsChart &&
            activeChartView.isTrendsChart && (
              <div className="chart_container">
                <div className="chat_main1">
                  {" "}
                  {/* noDataStyle  */}
                  No data available for Memory size vs faulting.
                </div>
                <div className="chat_main1">
                  {" "}
                  {/* noDataStyle  */}
                  No data available for Memory size vs faulting.
                </div>
              </div>
            )}

          {!memoryVsFaultingData.loading &&
            checkData === false &&
            activeChartView.isMetricsChart &&
            activeChartView.isTrendsChart === false && (
              <div className="chart_container">
                <div className="chat_main1">
                  {" "}
                  {/* noDataStyle  */}
                  No data available for Memory size vs faulting.
                </div>
              </div>
            )}
          {!memoryVsFaultingData.loading &&
            checkData === false &&
            activeChartView.isMetricsChart === false &&
            activeChartView.isTrendsChart && (
              <div className="chart_container">
                <div className="chat_main1">
                  {" "}
                  {/* noDataStyle  */}
                  No data available for Memory size vs faulting.
                </div>
              </div>
            )}
        </>
      )}
    </>
  );
};

export default MemVsFaultingReport;
