import React, { useEffect, useState, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAsyncSpecificPoolFaultingWhatsChanged,
  getSpecificPoolFaultingDataWc,
} from "../../../../store/slices/charts/memoryChartsSlice";
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
import CanvasJSReact from "../../../../scripts/canvasjs.stock.react";
import WhatsChangedGeneralChartView from "../WhatsChangedChartMainPages/WhatsChangedGeneralChartView";
import useQueryData from "../../../../hooks/useQueryDataWhatsChanged";
import ContentLoader from "react-content-loader";
import ChartView from "../../common/ChartView";
import * as _ from "lodash";
import { DISK_OPERATIONS } from "../../../../typeCodes/index";
import GridLoader from "react-spinners/GridLoader";

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;

const SpecificPoolFault = () => {
  const dispatch = useDispatch();
  const specificFaultData = useSelector(getSpecificPoolFaultingDataWc);
  const qd = useQueryData();

  const [checkData, setCheckData] = useState(false); //new

  const [memVsFaultDataPoints, setMemVsFaultDataPoints] = useState([]);
  const [allMemVsFaultPools, setAllMemVsFaultPools] = useState([]);
  const [pNumChangeMemVsFault, setPNumChangeMemVsFault] = useState([]);

  const activeChartView = useSelector((state) => state.charts.activeChartView);

  useEffect(() => {
    dispatch(fetchAsyncSpecificPoolFaultingWhatsChanged(qd));
  }, [dispatch]);

  useEffect(() => {
    if (specificFaultData?.data?.data) {
      createChartDataMappingForMemoryVSFault("All");
    }

    if (
      specificFaultData.loading === false &&
      !_.isEmpty(specificFaultData.data)
    ) {
      if (specificFaultData.data.data.length === 0) {
        setCheckData(false);
      } else {
        setCheckData(true);
      }
    }
  }, [specificFaultData]);

  const createChartDataMappingForMemoryVSFault = async (indx) => {
    let memVsFaultData = specificFaultData;
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
      //   const data_memory_size = getDataPointsForPoolNumBasedCharts(originaldata, "memory_size");

      let chartDataMemVsFault = [
        {
          ...DISK_OPERATIONS,
          type: "stackedColumn",
          dataPoints: data_Faulting,
          color: "#7D3C98",
          name: "Fault / Sec",
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
      let chartDataMemVsFault = [
        {
          ...DISK_OPERATIONS,
          type: "stackedColumn",
          dataPoints: data_Faulting,
          color: "#7D3C98",
          name: "Fault / Sec",
        },
      ];
      setMemVsFaultDataPoints(chartDataMemVsFault);
    }
  };

  //   const CPUTrendsData = createChartDataMapping(
  //     specificFaultData.data.data || [],
  //     "stackedColumn",
  //     "machinePoolFaultingTrends"
  //   );

  return (
    <>
      {specificFaultData.loading && (
        <div className="chart_container">
          <div style={{ display: "block", margin: "auto" }}>
            <GridLoader color="#366bd6"/>
          </div>
          <div style={{ display: "block", margin: "auto" }}>
            <GridLoader color="#366bd6"/>
          </div>
        </div>
      )}
      {!specificFaultData.loading &&
        !_.isEmpty(specificFaultData.data) &&
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
                  title={"Specific Pool Faulting Rate"}
                  yAxisTitle={"Fault / Sec"}
                  //refHandler={(ref) => dispatch(setChartList(ref))}
                  //showTooltip={showUtilizationTooltip}
                  isVisible={true}
                  //hideTooltip={hideUtilizationTooltip}
                  //syncZoomHandler={syncHandler}
                  showTotal={false}
                  minimum={0}
                />
              )}
            </div>
          </>
        )}

      {!specificFaultData.loading &&
        checkData === false &&
        activeChartView.isMetricsChart &&
        activeChartView.isTrendsChart && (
          <div className="chart_container">
            <div className="chat_main1">
              {" "}
              {/* noDataStyle  */}
              No data available for Specific Pool Fault.
            </div>
            <div className="chat_main1">
              {" "}
              {/* noDataStyle  */}
              No data available for Specific Pool Fault.
            </div>
          </div>
        )}

      {!specificFaultData.loading &&
        checkData === false &&
        activeChartView.isMetricsChart &&
        activeChartView.isTrendsChart === false && (
          <div className="chart_container">
            <div className="chat_main1">
              {" "}
              {/* noDataStyle  */}
              No data available for Specific Pool Fault.
            </div>
          </div>
        )}
      {!specificFaultData.loading &&
        checkData === false &&
        activeChartView.isMetricsChart === false &&
        activeChartView.isTrendsChart && (
          <div classN ame="chart_container">
            <div className="chat_main1">
              {" "}
              {/* noDataStyle  */}
              No data available for Specific Pool Fault.
            </div>
          </div>
        )}
    </>
  );
};

export default SpecificPoolFault;
