import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Dropdown } from "primereact/dropdown";
import { fetchAsyncSpecificPoolFaulting, getSpecificPoolFaultingData } from "../../../../store/slices/charts/memoryChartsSlice";
import useQueryData from "../../../../hooks/useQueryDataHistorical";
import {
  createChartDataMapping,
  getDataPointsForPoolNumBasedCharts
} from "../../../../helpers/commonHelper";
import { DISK_OPERATIONS } from '../../../../typeCodes/index';
import ChartView from "../../common/ChartView";
import ChartViewTrend from "../../common/ChartViewTrend";
import * as _ from 'lodash';
import GridLoader from "react-spinners/GridLoader";

const SpecificPoolFaultPrint = ({ activeChartView }) => {
  const dispatch = useDispatch();
  const specificFaultData = useSelector(getSpecificPoolFaultingData);
  const qd = useQueryData();

  const [checkData, setCheckData] = useState(false); //new

  const [memVsFaultDataPoints, setMemVsFaultDataPoints] = useState([]);
  const [allMemVsFaultPools, setAllMemVsFaultPools] = useState([]);
  const [pNumChangeMemVsFault, setPNumChangeMemVsFault] = useState([]);

  useEffect(() => {
    dispatch(fetchAsyncSpecificPoolFaulting(qd));
  }, [dispatch])

  useEffect(() => {
    if (specificFaultData?.data?.data) {
      createChartDataMappingForMemoryVSFault(
        'All'
      );
    }

    if (specificFaultData.loading === false && !_.isEmpty(specificFaultData.data.data)) {
      if (specificFaultData.data.data.length === 0) {
        setCheckData(false);
      }
      else {
        setCheckData(true)
      }
    }
  }, [specificFaultData])

  const createChartDataMappingForMemoryVSFault = async (indx) => {
    let memVsFaultData = specificFaultData;
    let memorySizeVsFaultingData = {};
    let poolListWithAllTag = new Array();
    memorySizeVsFaultingData = memVsFaultData.data || {};
    poolListWithAllTag = [...memVsFaultData.data.pools, { value: "All", label: "All Pools" }]
    setAllMemVsFaultPools(poolListWithAllTag);

    if (indx == 'All') {
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
      const data_Faulting = getDataPointsForPoolNumBasedCharts(originaldata, "faulting_rate");

      let chartDataMemVsFault = [
        {
          ...DISK_OPERATIONS,
          type: 'stackedColumn',
          dataPoints: data_Faulting,
          color: "#7D3C98",
          name: "Fault / Sec",
        },
      ];
      setMemVsFaultDataPoints(chartDataMemVsFault);
    }
    else {
      setPNumChangeMemVsFault(indx);
      let originaldata = memorySizeVsFaultingData.data[indx];
      const data_Faulting = getDataPointsForPoolNumBasedCharts(originaldata, "faulting_rate");
      let chartDataMemVsFault = [
        {
          ...DISK_OPERATIONS,
          type: 'stackedColumn',
          dataPoints: data_Faulting,
          color: "#7D3C98",
          name: "Fault / Sec",
        },
      ];
      setMemVsFaultDataPoints(chartDataMemVsFault);
    }
  }


  const specificFaultDataTrends = createChartDataMapping(
    specificFaultData.data.trend || [],
    "stackedColumn",
    "specificPoolFaultingTrends"
  );

  return (
    <>

      {specificFaultData.loading &&
        <div className="chart_container">
          <div style={{ display: "block", margin: "auto" }}>
            <GridLoader color="#366bd6"/>
          </div>
          <div style={{ display: "block", margin: "auto" }}>
            <GridLoader color="#366bd6"/>
          </div>
        </div>
      }
      {!specificFaultData.loading && !_.isEmpty(specificFaultData.data.data) && (checkData) &&
        <>
          <>
            <span className="chart_dropDown">
              <p className="chart_dropDown_name">Select Pool Number</p>
              <Dropdown
                value={pNumChangeMemVsFault}
                options={allMemVsFaultPools}
                onChange={(e) => createChartDataMappingForMemoryVSFault(e.value)}
                placeholder="Select a Pool Number"
              />
            </span>
          </>
          <div className="chart_container">
            <table className="table tableAlign printTable">
              <tbody>
                <tr>
                  {activeChartView.isMetricsChart && (
                    <ChartView
                      data={memVsFaultDataPoints}
                      title={"Specific Pool Faulting Rate"}
                      yAxisTitle={"Fault / Sec"}
                      isVisible={true}
                      showTotal={false}
                      minimum={0}
                    />
                  )}
                </tr>
                <tr>
                  {activeChartView.isTrendsChart && (
                    <ChartViewTrend
                      data={specificFaultDataTrends}
                      title={"Specific Pool Faulting with Trends"}
                      yAxisTitle={"Fault / Sec"}
                      isVisible={activeChartView.isTrendsChart}
                      xAxisDateFormat="MMM YYYY"
                      showTotal={false}
                      minimum={0}
                    />
                  )}
                </tr>
              </tbody>
            </table>
          </div>
        </>
      }

      {!specificFaultData.loading && _.isEmpty(specificFaultData.data.data) && (checkData === false) && activeChartView.isMetricsChart && activeChartView.isTrendsChart &&
        <div className="chart_container">
          <div className="chat_main1"> {/* noDataStyle  */}
            <div style={{textAlign:'center'}}>
              <h4>Specific Pool Faulting</h4>
              <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for Specific Pool Fault."/>
            </div>
          </div>
          <div className="chat_main1"> {/* noDataStyle  */}
            <div style={{textAlign:'center'}}>
              <h4>Specific Pool</h4>
              <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for Specific Pool Fault."/>
            </div>
          </div>
        </div>
      }

      {!specificFaultData.loading && _.isEmpty(specificFaultData.data.data) && (checkData === false) && activeChartView.isMetricsChart && (activeChartView.isTrendsChart === false) &&
        <div className="chart_container">
          <div className="chat_main1"> {/* noDataStyle  */}
            <div style={{textAlign:'center'}}>
              <h4>Specific Pool Faulting</h4>
              <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for Specific Pool Fault."/>
            </div>
          </div>
        </div>
      }
      {!specificFaultData.loading && _.isEmpty(specificFaultData.data.data) && (checkData === false) && (activeChartView.isMetricsChart === false) && (activeChartView.isTrendsChart) &&
        <div className="chart_container">
          <div className="chat_main1"> {/* noDataStyle  */}
            <div style={{textAlign:'center'}}>
              <h4>Specific Pool Faulting</h4>
              <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for Specific Pool Fault."/>
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default (SpecificPoolFaultPrint);