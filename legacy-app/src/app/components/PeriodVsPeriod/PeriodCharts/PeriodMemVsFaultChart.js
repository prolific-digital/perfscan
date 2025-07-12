import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Dropdown } from "primereact/dropdown";
import {fetchAsyncPeriodMemorySizeVsFaulting, getMemoryVsFaultingData } from "../../../../store/slices/periodVsPeriodCharts/periodCharts/periodMemoryChartsSlice";
import usePeriodQueryData from "../../../../hooks/usePeriodQueryData";
import {
    getDataPointsForPoolNumBasedCharts
} from "../../../../helpers/commonHelper";
import {DISK_OPERATIONS} from '../../../../typeCodes/index';
import ChartView from "../../common/ChartView";
import * as _ from 'lodash';
import moment from "moment";
import { findMinMax, getRound } from "../../../../helpers/commonHelper";
import GridLoader from "react-spinners/GridLoader";
import { getUuidData } from "../../../../store/slices/reports/SaveNewReport/SaveNewReport";

const PeriodMemVsFaultChart = (syncHandler) => {
  const dispatch = useDispatch();
  const memoryVsFaultingData = useSelector(getMemoryVsFaultingData);
  const filters = useSelector(state => state.filters);
  const uuid = useSelector(getUuidData);
  const pFilter = filters.period_filter; //dates
  let period1 = "";
  let period2 = "";
  // Show only start date if both start and end date are same
    const period1_sdate = moment(pFilter[0].sdate).unix()
    const period1_edate = moment(pFilter[0].edate).unix()
    if( period1_sdate === period1_edate )
    {
         period1 = moment(pFilter[0].sdate).format("MMM Do YYYY")
  } else {
         period1 = moment(pFilter[0].sdate).format("MMM Do YYYY") + ' - ' + moment(pFilter[0].edate).format("MMM Do YYYY");
  }
  // Show only start date if both start and end date are same
  const period2_sdate = moment(pFilter[1].sdate).unix();
  const period2_edate = moment(pFilter[1].edate).unix();
    if( period2_sdate === period2_edate )
    {
        period2 = moment(pFilter[1].sdate).format("MMM Do YYYY")
  } else {
        period2 = moment(pFilter[1].sdate).format("MMM Do YYYY") + ' - ' + moment(pFilter[1].edate).format("MMM Do YYYY");
  }

  const pqd = usePeriodQueryData();

  const [memVsFaultDataPoints1, setMemVsFaultDataPoints1] = useState([]);
  const [memVsFaultDataPoints2, setMemVsFaultDataPoints2] = useState([]);
  const [allMemVsFaultPools1, setAllMemVsFaultPools1] = useState([]);
  const [allMemVsFaultPools2, setAllMemVsFaultPools2] = useState([]);
  const [pNumChangeMemVsFault1, setPNumChangeMemVsFault1] = useState([]);
  const [pNumChangeMemVsFault2, setPNumChangeMemVsFault2] = useState([]);
    const [DP1_Max, setDP1_Max] = useState(100);
    const [DP2_Max, setDP2_Max] = useState(100);

  useEffect(() => {
    if(!uuid?.loading && uuid.data.uniqueid){
    dispatch(fetchAsyncPeriodMemorySizeVsFaulting(pqd));
    }
    }, [dispatch,uuid])

  useEffect(() => {
    if (memoryVsFaultingData?.data[0]?.data) {
          createChartDataMappingForMemoryVSFault1(
              'All'
          );
          createChartDataMappingForMemoryVSFault2(
            'All'
        );
    }
    },[memoryVsFaultingData])
  const createChartDataMappingForMemoryVSFault1 = async (indx) => {
    let memVsFaultData = memoryVsFaultingData;
    let memorySizeVsFaultingData = {};
    let poolListWithAllTag = new Array();
    memorySizeVsFaultingData = memVsFaultData.data[0] || {};
          poolListWithAllTag = [...memVsFaultData.data[0].pools,{value:"All",label:"All Pools"}]
    setAllMemVsFaultPools1(poolListWithAllTag);

         if(indx == 'All'){
      setPNumChangeMemVsFault1(indx);
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
          const data_memory_size = getDataPointsForPoolNumBasedCharts(originaldata, "memory_size");
          const min_max_dp = findMinMax(data_Faulting);
          setDP1_Max(getRound(min_max_dp[1]));

      let chartDataMemVsFault = [
        {
          ...DISK_OPERATIONS,
              type: 'stackedArea',
          dataPoints: data_Faulting,
          color: "#b81f0a",
          name: "Fault / Sec",
        },
        {
          ...DISK_OPERATIONS,

          type: "stackedArea",
          markerBorderColor: "white",
          markerBorderThickness: 2,
          showInLegend: true,
          yValueFormatString: "$#,##0",
          dataPoints: data_memory_size,
          name: "Total Memory Size (GB)",
        },
      ];
      setMemVsFaultDataPoints1(chartDataMemVsFault);
         }
         else{    
      setPNumChangeMemVsFault1(indx);
      let originaldata = memorySizeVsFaultingData.data[indx];
          const data_Faulting = getDataPointsForPoolNumBasedCharts(originaldata, "faulting_rate");
          const data_memory_size = getDataPointsForPoolNumBasedCharts(originaldata, "memory_size");
          const min_max_dp = findMinMax(data_Faulting);
          setDP1_Max(getRound(min_max_dp[1]));

      let chartDataMemVsFault = [
        {
          ...DISK_OPERATIONS,
              type: 'stackedArea',
          dataPoints: data_Faulting,
          color: "#b81f0a",
          name: "Fault / Sec",
        },
        {
          ...DISK_OPERATIONS,

          type: "stackedArea",
          markerBorderColor: "white",
          markerBorderThickness: 2,
          showInLegend: true,
          yValueFormatString: "$#,##0",
          dataPoints: data_memory_size,
          name: "Total Memory Size (GB)",
        },
      ];
      setMemVsFaultDataPoints1(chartDataMemVsFault);
    }
      }

  const createChartDataMappingForMemoryVSFault2 = async (indx) => {
    let memVsFaultData = memoryVsFaultingData;
    let memorySizeVsFaultingData = {};
    let poolListWithAllTag = new Array();
    memorySizeVsFaultingData = memVsFaultData.data[1] || {};
              poolListWithAllTag = [...memVsFaultData.data[1].pools,{value:"All",label:"All Pools"}]
    setAllMemVsFaultPools2(poolListWithAllTag);

             if(indx == 'All'){
      setPNumChangeMemVsFault2(indx);
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
              const data_memory_size = getDataPointsForPoolNumBasedCharts(originaldata, "memory_size");
              const min_max_dp = findMinMax(data_Faulting);
              setDP2_Max(getRound(min_max_dp[1]));

      let chartDataMemVsFault = [
        {
          ...DISK_OPERATIONS,
                  type: 'stackedArea',
          dataPoints: data_Faulting,
          color: "#b81f0a",
          name: "Fault / Sec",
        },
        {
          ...DISK_OPERATIONS,

          type: "stackedArea",
          markerBorderColor: "white",
          markerBorderThickness: 2,
          showInLegend: true,
          yValueFormatString: "$#,##0",
          dataPoints: data_memory_size,
          name: "Total Memory Size (GB)",
        },
      ];
      setMemVsFaultDataPoints2(chartDataMemVsFault);
             }
             else{    
      setPNumChangeMemVsFault2(indx);
      let originaldata = memorySizeVsFaultingData.data[indx];
              const data_Faulting = getDataPointsForPoolNumBasedCharts(originaldata, "faulting_rate");
              const data_memory_size = getDataPointsForPoolNumBasedCharts(originaldata, "memory_size");
              const min_max_dp = findMinMax(data_Faulting);
              setDP2_Max(getRound(min_max_dp[1]));

      let chartDataMemVsFault = [
        {
          ...DISK_OPERATIONS,
                  type: 'stackedArea',
          dataPoints: data_Faulting,
          color: "#b81f0a",
          name: "Fault / Sec",
        },
        {
          ...DISK_OPERATIONS,

          type: "stackedArea",
          markerBorderColor: "white",
          markerBorderThickness: 2,
          showInLegend: true,
          yValueFormatString: "$#,##0",
          dataPoints: data_memory_size,
          name: "Total Memory Size (GB)",
        },
      ];
      setMemVsFaultDataPoints2(chartDataMemVsFault);
    }
          }

  return (
    <>
              {memoryVsFaultingData.loading &&
        <div className="chart_container">
          <div style={{ display: "block", margin: "auto" }}>
            <GridLoader color="#366bd6"/>
          </div>
          <div style={{ display: "block", margin: "auto" }}>
            <GridLoader color="#366bd6"/>
          </div>
        </div>
                }
                {!memoryVsFaultingData.loading && !_.isEmpty(memoryVsFaultingData.data) &&
        <>
                  <div className="chart_container" style={{display:'flex'}}>
            <div style={{ flex: "1" }}>
              <span className="chart_dropDown">
                <p className="chart_dropDown_name">Select Pool Number</p>
                <Dropdown
                  value={pNumChangeMemVsFault1}
                  options={allMemVsFaultPools1}
                            onChange={(e) => createChartDataMappingForMemoryVSFault1(e.value)}
                  placeholder="Select a Pool Number"
                />
              </span>
            </div>
            <div style={{ flex: "1" }}>
              <span className="chart_dropDown">
                <p className="chart_dropDown_name">Select Pool Number</p>
                <Dropdown
                  value={pNumChangeMemVsFault2}
                  options={allMemVsFaultPools2}
                            onChange={(e) => createChartDataMappingForMemoryVSFault2(e.value)}
                  placeholder="Select a Pool Number"
                />
              </span>
            </div>
          </div>

          <div className="chart_container">
                  {!_.isEmpty(memoryVsFaultingData.data[0].data) &&
              <ChartView
                data={memVsFaultDataPoints1}
                title={memoryVsFaultingData.data[0].params.server}
                title2={`Memory Size vs Faulting`}
                subtitle={period1}
                yAxisTitle={"Fault / Sec"}
                xAxisDateFormat={memVsFaultDataPoints1[0]?.xValueFormatString}
                isVisible={true}
                showTotal={false}
                        minimum = {0}
              />
                  } 
                  {_.isEmpty(memoryVsFaultingData.data[0].data) &&
                <div className="chat_main1">  {/* noDataStyle  */}
                    <div style={{textAlign:'center'}}>
                      <h4>Memory size Vs Faulting</h4>
                      <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for Memory size vs faulting."/>
                    </div>
                </div>
                  }
                  {!_.isEmpty(memoryVsFaultingData.data[1].data) &&
              <ChartView
                data={memVsFaultDataPoints2}
                title={memoryVsFaultingData.data[1].params.server}
                title2={`Memory Size vs Faulting`}
                subtitle={period2}
                yAxisTitle={"Fault / Sec"}
                xAxisDateFormat={memVsFaultDataPoints2[0]?.xValueFormatString}
                isVisible={true}
                showTotal={false}
                        minimum = {0}
              />
                  }
                  {_.isEmpty(memoryVsFaultingData.data[1].data) &&
                <div className="chat_main1">  {/* noDataStyle  */}
                    <div style={{textAlign:'center'}}>
                      <h4>Memory size Vs Faulting</h4>
                      <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for Memory size vs faulting."/>
                    </div>
                </div>
                  }                  
          </div>
        </>
            }
    </>
    )
}

export default PeriodMemVsFaultChart;