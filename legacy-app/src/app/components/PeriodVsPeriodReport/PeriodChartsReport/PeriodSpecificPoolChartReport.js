import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Dropdown } from "primereact/dropdown";
import {
    getDataPointsForPoolNumBasedCharts
  } from "../../../../helpers/commonHelper";
  import {DISK_OPERATIONS} from '../../../../typeCodes/index';
import ChartView from "../../common/ChartView";
import * as _ from 'lodash';
import moment from "moment";
import { findMinMax, getRound } from "../../../../helpers/commonHelper";
import { fetchAsyncSpecificPoolFaultingReports, getSpecificPoolFaultingDataReports} from "../../../../store/slices/reports/DataReportCharts/memoryReportChartsSlice";
import GridLoader from "react-spinners/GridLoader";

const PeriodSpecificPoolChartReport = ({reportId}) => {
    const dispatch = useDispatch();
    const specificPoolFaultingData = useSelector(getSpecificPoolFaultingDataReports);
    let period1 = "";
    let period2 = "";
    let max = 100;
    // Show only start date if both start and end date are same
    const period1_sdate = moment(specificPoolFaultingData?.data[0]?.params?.sdata).unix()
    const period1_edate = moment(specificPoolFaultingData?.data[0]?.params?.edate).unix()
    if( period1_sdate === period1_edate )
    {
         period1 = moment(specificPoolFaultingData?.data[0]?.params?.sdata).format("MMM Do YYYY")
    }else{
         period1 = moment(specificPoolFaultingData?.data[0]?.params?.sdata).format("MMM Do YYYY") + ' - ' + moment(specificPoolFaultingData?.data[0]?.params?.edate).format("MMM Do YYYY");
    }
    // Show only start date if both start and end date are same
    const period2_sdate = moment(specificPoolFaultingData?.data[1]?.params?.sdata).unix();
    const period2_edate = moment(specificPoolFaultingData?.data[1]?.params?.edate).unix();
    if( period2_sdate === period2_edate )
    {
        period2 = moment(specificPoolFaultingData?.data[1]?.params?.sdata).format("MMM Do YYYY")
    }else{
        period2 = moment(specificPoolFaultingData?.data[1]?.params?.sdata).format("MMM Do YYYY") + ' - ' + moment(specificPoolFaultingData?.data[1]?.params?.edate).format("MMM Do YYYY");
    }

    const [specificPoolDataPoints1, setSpecificPoolDataPoints1] = useState([]);
    const [specificPoolDataPoints2, setSpecificPoolDataPoints2] = useState([]);
    const [allSpecificPoolData1, setAllSpecificPoolData1] = useState([]);
    const [allSpecificPoolData2, setAllSpecificPoolData2] = useState([]);
    const [pNumChangeSpecificPool1, setPNumChangeSpecificPool1] = useState([]);
    const [pNumChangeSpecificPool2, setPNumChangeSpecificPool2] = useState([]);
    const [DP1_Max, setDP1_Max] = useState(100);
    const [DP2_Max, setDP2_Max] = useState(100);

    useEffect(() => {
        dispatch(fetchAsyncSpecificPoolFaultingReports(reportId));
    }, [dispatch])

    useEffect(()=>{
        if(specificPoolFaultingData?.data[0]?.data){
          createChartDataMappingForSpecificPoolFault1(
              'All'
          );
          createChartDataMappingForSpecificPoolFault2(
            'All'
        );
        }
    },[specificPoolFaultingData])
    const createChartDataMappingForSpecificPoolFault1 = async(indx)=> { 
        let memVsFaultData = specificPoolFaultingData;
        let memorySizeVsFaultingData = {};
        let poolListWithAllTag = new Array();
          memorySizeVsFaultingData = memVsFaultData.data[0] || {};
          poolListWithAllTag = [...memVsFaultData.data[0].pools,{value:"All",label:"All Pools"}]
          setAllSpecificPoolData1(poolListWithAllTag);
      
         if(indx == 'All'){
          setPNumChangeSpecificPool1(indx);
          let originaldata = [];
          let poolNums = [];
          let poolStringValues = poolListWithAllTag;
          for(let i=0;i<poolStringValues.length;++i){
            if(poolStringValues[i].value != "All"){
            poolNums[i] = Number(poolStringValues[i].value);
            }
          }
          
          originaldata = memorySizeVsFaultingData.data["All"];
          
          const data_Faulting = getDataPointsForPoolNumBasedCharts(originaldata, "faulting_rate");
          const min_max_dp = findMinMax(data_Faulting);
          setDP1_Max(getRound(min_max_dp[1]));
      
          let chartDataMemVsFault = [
            {
             ...DISK_OPERATIONS,
              type: 'stackedArea',
              dataPoints: data_Faulting,
             color: "#7D3C98",
             name: "Fault / Sec",
            },
         ];
         setSpecificPoolDataPoints1(chartDataMemVsFault);
         }
         else{    
          setPNumChangeSpecificPool1(indx);
          let originaldata = memorySizeVsFaultingData.data[indx];
          const data_Faulting = getDataPointsForPoolNumBasedCharts(originaldata, "faulting_rate");
          const min_max_dp = findMinMax(data_Faulting);
          setDP1_Max(getRound(min_max_dp[1]));

          let chartDataMemVsFault = [
            {
             ...DISK_OPERATIONS,
              type: 'stackedArea',
              dataPoints: data_Faulting,
             color: "#7D3C98",
             name: "Fault / Sec",
            }
         ];
         setSpecificPoolDataPoints1(chartDataMemVsFault);
        }
      }
    
      const createChartDataMappingForSpecificPoolFault2 = async(indx)=> { 
            let memVsFaultData = specificPoolFaultingData;
            let memorySizeVsFaultingData = {};
            let poolListWithAllTag = new Array();
              memorySizeVsFaultingData = memVsFaultData.data[1] || {};
              poolListWithAllTag = [...memVsFaultData.data[1].pools,{value:"All",label:"All Pools"}]
              setAllSpecificPoolData2(poolListWithAllTag);
          
             if(indx == 'All'){
              setPNumChangeSpecificPool2(indx);
              let originaldata = [];
              let poolNums = [];
              let poolStringValues = poolListWithAllTag;
              for(let i=0;i<poolStringValues.length;++i){
                if(poolStringValues[i].value != "All"){
                poolNums[i] = Number(poolStringValues[i].value);
                }
              }

              originaldata = memorySizeVsFaultingData.data["All"];
              
              const data_Faulting = getDataPointsForPoolNumBasedCharts(originaldata, "faulting_rate");
              const min_max_dp = findMinMax(data_Faulting);
              setDP2_Max(getRound(min_max_dp[1]));
          
              let chartDataMemVsFault = [
                {
                 ...DISK_OPERATIONS,
                  type: 'stackedArea',
                  dataPoints: data_Faulting,
                 color: "#7D3C98",
                 name: "Fault / Sec",
                }
             ];
             setSpecificPoolDataPoints2(chartDataMemVsFault);
             }
             else{    
              setPNumChangeSpecificPool2(indx);
              let originaldata = memorySizeVsFaultingData.data[indx];
              const data_Faulting = getDataPointsForPoolNumBasedCharts(originaldata, "faulting_rate");
              const min_max_dp = findMinMax(data_Faulting);
              setDP2_Max(getRound(min_max_dp[1]));

              let chartDataMemVsFault = [
                {
                 ...DISK_OPERATIONS,
                  type: 'stackedArea',
                  dataPoints: data_Faulting,
                 color: "#7D3C98",
                 name: "Fault / Sec",
                }
             ];
             setSpecificPoolDataPoints2(chartDataMemVsFault);
            }
          }

    if(!_.isEmpty(specificPoolFaultingData.data[0]?.data) && !_.isEmpty(specificPoolFaultingData.data[1]?.data)){
      max = _.round(_.max([DP1_Max, DP2_Max]),2);
    }

    if(!_.isEmpty(specificPoolFaultingData.data[0]?.data) && _.isEmpty(specificPoolFaultingData.data[1]?.data)){
      max = _.round(_.max(DP1_Max));
    }

    if(_.isEmpty(specificPoolFaultingData.data[0]?.data) && !_.isEmpty(specificPoolFaultingData.data[1]?.data)){
      max = _.round(_.max(DP2_Max));
    }
    
   
    return (
            <>        
            {specificPoolFaultingData.loading &&
                    <div className="chart_container">
                        <div style={{display:"block",margin:"auto"}}>  
                           <GridLoader color="#366bd6"/>
                        </div>
                        <div style={{display:"block",margin:"auto"}}>  
                           <GridLoader color="#366bd6"/>
                        </div>
                    </div>
                }
                {!specificPoolFaultingData.loading && !_.isEmpty(specificPoolFaultingData.data) &&
                <> {/* Main div */}
                   <div className="chart_container" style={{display:'flex'}}>
                    <div style={{flex:"1"}}> 
                    <span className="chart_dropDown">
                        <p className="chart_dropDown_name">Select Pool Number</p>  
                        <Dropdown
                          value={pNumChangeSpecificPool1}
                          options={allSpecificPoolData1}
                          onChange={(e) => createChartDataMappingForSpecificPoolFault1(e.value)}
                          placeholder="Select a Pool Number"
                        />
                    </span>
                  </div>
                 <div style={{flex:"1"}}>
                    <span className="chart_dropDown">
                        <p className="chart_dropDown_name">Select Pool Number</p>  
                        <Dropdown
                          value={pNumChangeSpecificPool2}
                          options={allSpecificPoolData2}
                          onChange={(e) => createChartDataMappingForSpecificPoolFault2(e.value)}
                          placeholder="Select a Pool Number"
                        />
                    </span>
                 </div>
                </div>

                <div className="chart_container" style={{ pageBreakAfter: "always" }}>
                {!_.isEmpty(specificPoolFaultingData.data[0].data) &&
                        <ChartView
                        data={specificPoolDataPoints1}
                        title={specificPoolFaultingData.data[0].params.server}
                        title2={`Specific Pool Faulting Rate`}
                        subtitle={period1}
                        yAxisTitle={"Fault / Sec"}
                        isVisible={true}
                        showTotal={false}
                        minimum = {0}
                        maximum = {max}
                      /> 
                }
                      {_.isEmpty(specificPoolFaultingData.data[0].data) &&
                         <div className="chat_main1"> {/* noDataStyle  */}
                            <div style={{textAlign:'center'}}>
                              <h4>Specific Pool</h4>
                              <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for Specific Pool Fault."/>
                            </div> 
                          </div>
                      } 
                      {!_.isEmpty(specificPoolFaultingData.data[1].data) &&
                        <ChartView
                        data={specificPoolDataPoints2}
                        title={specificPoolFaultingData.data[1].params.server}
                        title2={`Specific Pool Faulting Rate`}
                        subtitle={period2}
                        yAxisTitle={"Fault / Sec"}
                        isVisible={true}
                        showTotal={false}
                        minimum = {0}
                        maximum = {max}
                      />
                      } 
                      {_.isEmpty(specificPoolFaultingData.data[1].data) &&
                         <div className="chat_main1"> {/* noDataStyle  */}
                            <div style={{textAlign:'center'}}>
                              <h4>Specific Pool</h4>
                              <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for Specific Pool Fault."/>
                            </div> 
                          </div>
                      }    
              </div>
             </>
            }
            </>
    )
}
export default PeriodSpecificPoolChartReport;