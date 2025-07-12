import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as _ from 'lodash';
import {
    createChartDataMapping
  } from "../../../../helpers/commonHelper";
import ChartView from "../../common/ChartView";
import moment from "moment";
import { findMinMax, getRound } from "../../../../helpers/commonHelper";
import { fetchAsyncMachinePoolFaultingReports, getMachinPoolFaultingDataReports} from "../../../../store/slices/reports/DataReportCharts/memoryReportChartsSlice";
import GridLoader from "react-spinners/GridLoader";

const PeriodMachinPoolFaultingChartReport = ({reportId}) => {
    const dispatch = useDispatch();
    const machinePoolFaultingData = useSelector(getMachinPoolFaultingDataReports);
    let period1 = "";
    let period2 = "";
    let max = 100;
    // Show only start date if both start and end date are same
    const period1_sdate = moment(machinePoolFaultingData?.data[0]?.params?.sdata).unix()
    const period1_edate = moment(machinePoolFaultingData?.data[0]?.params?.edate).unix()
    if( period1_sdate === period1_edate )
    {
         period1 = moment(machinePoolFaultingData?.data[0]?.params?.sdata).format("MMM Do YYYY")
    }else{
         period1 = moment(machinePoolFaultingData?.data[0]?.params?.sdata).format("MMM Do YYYY") + ' - ' + moment(machinePoolFaultingData?.data[0]?.params?.edate).format("MMM Do YYYY");
    }
    // Show only start date if both start and end date are same
    const period2_sdate = moment(machinePoolFaultingData?.data[1]?.params?.sdata).unix();
    const period2_edate = moment(machinePoolFaultingData?.data[1]?.params?.edate).unix();
    if( period2_sdate === period2_edate )
    {
        period2 = moment(machinePoolFaultingData?.data[1]?.params?.sdata).format("MMM Do YYYY")
    }else{
        period2 = moment(machinePoolFaultingData?.data[1]?.params?.sdata).format("MMM Do YYYY") + ' - ' + moment(machinePoolFaultingData?.data[1]?.params?.edate).format("MMM Do YYYY");
    }

    useEffect(() => {
        dispatch(fetchAsyncMachinePoolFaultingReports(reportId));
    }, [dispatch])

    const machinePoolFaultingData1 = createChartDataMapping(
        machinePoolFaultingData.data[0]?.data || [],
        "stackedArea",
        "machinePoolFaulting"
    );
    const machinePoolFaultingData2 = createChartDataMapping(
        machinePoolFaultingData.data[1]?.data || [],
        "stackedArea",
        "machinePoolFaulting"
    );

    if(!_.isEmpty(machinePoolFaultingData.data[0]?.data) && !_.isEmpty(machinePoolFaultingData.data[1]?.data)){
        const min_max_1_dp1 = findMinMax(machinePoolFaultingData1[0].dataPoints) 
        const min_max_2_dp1 = findMinMax(machinePoolFaultingData2[0].dataPoints) 
        const min_max_1 = min_max_1_dp1[1];
        const min_max_2 = min_max_2_dp1[1];
        max = _.round(_.max([getRound(min_max_1), getRound(min_max_2)]),2);
    }

    if(!_.isEmpty(machinePoolFaultingData.data[0]?.data) && _.isEmpty(machinePoolFaultingData.data[1]?.data)){
        const min_max_1_dp1 = findMinMax(machinePoolFaultingData1[0].dataPoints) 
        const min_max_1 = min_max_1_dp1[1];
        max = _.round(_.max(getRound(min_max_1)));
    }

    if(_.isEmpty(machinePoolFaultingData.data[0]?.data) && !_.isEmpty(machinePoolFaultingData.data[1]?.data)){
        const min_max_2_dp1 = findMinMax(machinePoolFaultingData2[0].dataPoints) 
        const min_max_2 = min_max_2_dp1[1];
        max = _.round(_.max(getRound(min_max_2)));
    }

    return (
            <>  {machinePoolFaultingData.loading &&
                <div className="chart_container">                 
                    <div style={{display:"block",margin:"auto"}}>  
                       <GridLoader color="#366bd6"/>
                    </div>
                    <div style={{display:"block",margin:"auto"}}>  
                       <GridLoader color="#366bd6"/>
                    </div>
               </div>
                }
                {!machinePoolFaultingData.loading && !_.isEmpty(machinePoolFaultingData.data) &&
                <>
                        <div className="chart_container" style={{ pageBreakAfter: "always" }}>   
                        {!_.isEmpty(machinePoolFaultingData.data[0].data) &&
                            <ChartView
                            key={"cpuutilization"}
                            data={machinePoolFaultingData1}
                            title={machinePoolFaultingData.data[0].params.server}
                            title2={`Machine Pool Faulting Rate`}
                            subtitle={period1}
                            yAxisTitle={"Faults / Sec"}
                            isVisible={true} 
                            showTotal={true} 
                            minimum = {0}
                            maximum = {max}
                            />    
                        }                        
                        {_.isEmpty(machinePoolFaultingData.data[0].data) &&
                            <div className="chat_main1"> {/* noDataStyle  */}
                                <div style={{textAlign:'center'}}>
                                    <h4>Machine Pool Faulting</h4>
                                    <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for Machine Pool Faulting."/>
                                </div>
                            </div>
                        }       
                        {!_.isEmpty(machinePoolFaultingData.data[1].data) &&
                            <ChartView
                            key={"cpuutilizationtrends"}
                            data={machinePoolFaultingData2}
                            title={machinePoolFaultingData.data[1].params.server}
                            title2={`Machine Pool Faulting Rate`}
                            subtitle={period2}
                            yAxisTitle={"Faults / Sec"}
                            isVisible={true}
                            showTotal={true}
                            minimum = {0}
                            maximum = {max}
                            /> 
                        } 
                         {_.isEmpty(machinePoolFaultingData.data[1].data) &&
                            <div className="chat_main1"> {/* noDataStyle  */}
                                <div style={{textAlign:'center'}}>
                                    <h4>Machine Pool Faulting</h4>
                                    <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for Machine Pool Faulting."/>
                                </div>
                            </div>
                        }                                    
                        </div>
                </>
                }
            </>
    )
}

export default PeriodMachinPoolFaultingChartReport;