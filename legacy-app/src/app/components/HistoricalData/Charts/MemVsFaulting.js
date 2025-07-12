import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Dropdown } from "primereact/dropdown";
import {
  fetchAsyncMemorySizeVsFaulting,
  getMemoryVsFaultingData,
} from "../../../../store/slices/charts/memoryChartsSlice";
import useQueryData from "../../../../hooks/useQueryDataHistorical";
import {
  createChartDataMapping,
  getDataPointsForPoolNumBasedCharts,
} from "../../../../helpers/commonHelper";
import { DISK_OPERATIONS } from "../../../../typeCodes/index";
import ChartView from "../../common/ChartView";
import ChartViewTrend from "../../common/ChartViewTrend";
import * as _ from "lodash";
import GridLoader from "react-spinners/GridLoader";
import { getUuidData } from "../../../../store/slices/reports/SaveNewReport/SaveNewReport";
import { getExSummaryMemoryData } from "../../../../store/slices/datatables/executiveSummarySlice";

const MemVsFaulting = ({ activeChartView }) => {
  const dispatch = useDispatch();
  const memoryVsFaultingData = useSelector(getMemoryVsFaultingData);
  const qd = useQueryData();

  const [checkData, setCheckData] = useState(false); //new
  const uuid = useSelector(getUuidData);
  const systemName = memoryVsFaultingData?.data?.params?.server?.split(" ");

  const [memVsFaultDataPoints, setMemVsFaultDataPoints] = useState([]);
  const [allMemVsFaultPools, setAllMemVsFaultPools] = useState([]);
  const [pNumChangeMemVsFault, setPNumChangeMemVsFault] = useState([]);
  const criticalUtilizationValue = useSelector(getExSummaryMemoryData);

  useEffect(() => {
    if (!uuid?.loading && uuid.data.uniqueid) {
      dispatch(fetchAsyncMemorySizeVsFaulting(qd));
    }
  }, [dispatch, uuid]);

  useEffect(() => {
    if (memoryVsFaultingData?.data?.data) {
      createChartDataMappingForMemoryVSFault("All");
    }

    if (
      memoryVsFaultingData.loading === false &&
      !_.isEmpty(memoryVsFaultingData.data.data)
    ) {
      if (memoryVsFaultingData.data.data.length === 0) {
        setCheckData(false);
      } else {
        setCheckData(true);
      }
    }
  }, [memoryVsFaultingData]);

  const createChartDataMappingForMemoryVSFault = async (indx) => {
    //debugger;
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

      originaldata = memorySizeVsFaultingData.data["All"];

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
          type: "stackedArea",
          dataPoints: data_Faulting,
          color: "#b81f0a",
          
          name: "Fault / Sec",
          // axisYType: "secondary",
        },
        {
          ...DISK_OPERATIONS,
          type: "stackedArea",
          dataPoints: data_memory_size, 
          color: "#1EB294",
          name: "Total Memory Size (GB)",
          axisYType: "secondary", 
        }
        // ,{
        //   axisYType: "secondary",
        // }
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
          type: "stackedArea",
          dataPoints: data_Faulting,
          color: "#b81f0a",
          name: "Fault / Sec",
        },
        {
          ...DISK_OPERATIONS,

          type: "stackedArea",
          //name: "Profit",
          markerBorderColor: "white",
          markerBorderThickness: 2,
          showInLegend: true,
          yValueFormatString: "$#,##0",
          dataPoints: data_memory_size,
          axisYType: "secondary",
          //markerSize: 1,
          //color: "#1EB294",
          name: "Total Memory Size (GB)",
        }
      ];
      setMemVsFaultDataPoints(chartDataMemVsFault);
    }
  };

  const memoryVsFaultingDataTrends = createChartDataMapping(
    memoryVsFaultingData.data.trend || [],
    "stackedArea",
    "memorySizeVsFaultingTrends"
  );

  return (
    <>
      {memoryVsFaultingData.loading && (
        <div className="chart_container">
          <div style={{ display: "block", margin: "auto" }}>
            <GridLoader color="#366bd6" />
          </div>
          <div style={{ display: "block", margin: "auto" }}>
            <GridLoader color="#366bd6" />
          </div>
        </div>
      )}
      {!memoryVsFaultingData.loading &&
        !_.isEmpty(memoryVsFaultingData.data) &&
        checkData && (
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
                  title={"Memory Size vs Faulting"}
                  subtitle={systemName[0]}
                  yAxisTitle={"Fault / Sec"}
                  xAxisDateFormat={memVsFaultDataPoints[0].xValueFormatString}
                  isVisible={true}
                  showTotal={false}
                  // title2 = {"GB"}
                  minimum={0}
                  stripLineToggle={activeChartView.isShowGuidelines}
                  criticalUtilizationValue={memoryVsFaultingData}
                  metricType={"memory_size_faulting"}
                  selectedPool = {pNumChangeMemVsFault}
                />
              )}
              {activeChartView.isTrendsChart && (
                <ChartViewTrend
                  data={memoryVsFaultingDataTrends}
                  title={"Memory Size vs Faulting with Trends"}
                  subtitle={systemName[0]}
                  yAxisTitle={"Fault / Sec"}
                  isVisible={activeChartView.isTrendsChart}
                  // xAxisDateFormat="MMM YYYY"
                  title2 = {"GB"}
                  showTotal={false}
                  minimum={0}
                  stripLineToggle={activeChartView.isShowGuidelines}
                  criticalUtilizationValue={memoryVsFaultingData}
                  metricType={"memory_size_faulting"}
                  selectedPool = {pNumChangeMemVsFault}
                />
              )}
            </div>
          </>
        )}

      {!memoryVsFaultingData.loading &&
        _.isEmpty(memoryVsFaultingData.data.data) &&
        checkData === false &&
        activeChartView.isMetricsChart &&
        activeChartView.isTrendsChart && (
          <div className="chart_container">
            <div className="chat_main1">
              {" "}
              {/* noDataStyle  */}
              <div style={{ textAlign: "center" }}>
                <h4>Memory size Vs Faulting</h4>
                <img
                  style={{ height: "50%", width: "50%" }}
                  src="/noData.webp"
                  alt="No data available for Memory size vs faulting."
                />
              </div>
            </div>
            <div className="chat_main1">
              {" "}
              {/* noDataStyle  */}
              <div style={{ textAlign: "center" }}>
                <h4>Memory size Vs Faulting</h4>
                <img
                  style={{ height: "50%", width: "50%" }}
                  src="/noData.webp"
                  alt="No data available for Memory size vs faulting."
                />
              </div>
            </div>
          </div>
        )}

      {!memoryVsFaultingData.loading &&
        _.isEmpty(memoryVsFaultingData.data.data) &&
        checkData === false &&
        activeChartView.isMetricsChart &&
        activeChartView.isTrendsChart === false && (
          <div className="chart_container">
            <div className="chat_main1">
              {" "}
              {/* noDataStyle  */}
              <div style={{ textAlign: "center" }}>
                <h4>Memory size Vs Faulting</h4>
                <img
                  style={{ height: "50%", width: "50%" }}
                  src="/noData.webp"
                  alt="No data available for Memory size vs faulting."
                />
              </div>
            </div>
          </div>
        )}
      {!memoryVsFaultingData.loading &&
        _.isEmpty(memoryVsFaultingData.data.data) &&
        checkData === false &&
        activeChartView.isMetricsChart === false &&
        activeChartView.isTrendsChart && (
          <div className="chart_container">
            <div className="chat_main1">
              {" "}
              {/* noDataStyle  */}
              <div style={{ textAlign: "center" }}>
                <h4>Memory size Vs Faulting</h4>
                <img
                  style={{ height: "50%", width: "50%" }}
                  src="/noData.webp"
                  alt="No data available for Memory size vs faulting."
                />
              </div>
            </div>
          </div>
        )}
    </>
  );
};

export default React.memo(MemVsFaulting);
