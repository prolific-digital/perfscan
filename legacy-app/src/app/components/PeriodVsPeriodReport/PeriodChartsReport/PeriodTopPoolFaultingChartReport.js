import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as _ from 'lodash';
import {
    createChartDataMapping
  } from "../../../../helpers/commonHelper";
import ChartView from "../../common/ChartView";
import { findMinMax, getRound } from "../../../../helpers/commonHelper";
import { fetchAsyncTopPoolFaultingRateReports, getTopPoolFaultingDataReports} from "../../../../store/slices/reports/DataReportCharts/memoryReportChartsSlice";
import GridLoader from "react-spinners/GridLoader";

const PeriodTopPoolFaultingChartReport = ({reportId}) => {
    const dispatch = useDispatch();
    const TopPoolData = useSelector(getTopPoolFaultingDataReports);
    let max = 100;
    useEffect(() => {
        dispatch(fetchAsyncTopPoolFaultingRateReports(reportId));
    }, [dispatch])

    const TopPoolData1 = createChartDataMapping(
        TopPoolData.data[0]?.data || [],
        "stackedArea",
        "topPoolFaultingRate"
    );
    const TopPoolData2 = createChartDataMapping(
        TopPoolData.data[1]?.data || [],
        "stackedArea",
        "topPoolFaultingRate"
    );

    if(!_.isEmpty(TopPoolData.data[0]?.data) && !_.isEmpty(TopPoolData.data[1]?.data)){
        const min_max_1_dp1 = findMinMax(TopPoolData1[0].dataPoints); 
        const min_max_1_dp2 = findMinMax(TopPoolData1[1].dataPoints); 
        const min_max_1_dp3 = findMinMax(TopPoolData1[2].dataPoints); 
        const min_max_1_dp4 = findMinMax(TopPoolData1[3].dataPoints); 

        const min_max_2_dp1 = findMinMax(TopPoolData2[0].dataPoints); 
        const min_max_2_dp2 = findMinMax(TopPoolData2[1].dataPoints); 
        const min_max_2_dp3 = findMinMax(TopPoolData2[2].dataPoints); 
        const min_max_2_dp4 = findMinMax(TopPoolData2[3].dataPoints); 

        const min_max_1 = min_max_1_dp1[1] + min_max_1_dp2[1] + min_max_1_dp3[1] + min_max_1_dp4[1];
        const min_max_2 = min_max_2_dp1[1] + min_max_2_dp2[1] + min_max_2_dp3[1] + min_max_2_dp4[1];
        max = _.round(_.max([getRound(min_max_1), getRound(min_max_2)]),2);
    }

    if(!_.isEmpty(TopPoolData.data[0]?.data) && _.isEmpty(TopPoolData.data[1]?.data)){
        const min_max_1_dp1 = findMinMax(TopPoolData1[0].dataPoints);
        const min_max_1_dp2 = findMinMax(TopPoolData1[1].dataPoints); 
        const min_max_1_dp3 = findMinMax(TopPoolData1[2].dataPoints); 
        const min_max_1_dp4 = findMinMax(TopPoolData1[3].dataPoints); 

        const min_max_1 = min_max_1_dp1[1] + min_max_1_dp2[1] + min_max_1_dp3[1] + min_max_1_dp4[1];
        max = _.round(_.max(getRound(min_max_1)));
    }

    if(_.isEmpty(TopPoolData.data[0]?.data) && !_.isEmpty(TopPoolData.data[1]?.data)){
        const min_max_2_dp1 = findMinMax(TopPoolData2[0].dataPoints);
        const min_max_2_dp2 = findMinMax(TopPoolData2[1].dataPoints); 
        const min_max_2_dp3 = findMinMax(TopPoolData2[2].dataPoints); 
        const min_max_2_dp4 = findMinMax(TopPoolData2[3].dataPoints); 
        
        const min_max_2 = min_max_2_dp1[1] + min_max_2_dp2[1] + min_max_2_dp3[1] + min_max_2_dp4[1];
        max = _.round(_.max(getRound(min_max_2)));
    }
    
    return (
            <>  {TopPoolData.loading &&
                <div className="chart_container">
                    <div style={{display:"block",margin:"auto"}}>  
                       <GridLoader color="#366bd6"/>
                    </div>
                    <div style={{display:"block",margin:"auto"}}>  
                       <GridLoader color="#366bd6"/>
                    </div>
               </div>
                }
                {!TopPoolData.loading && !_.isEmpty(TopPoolData.data) &&
                <>
                        <div className="chart_container">  
                      {!_.isEmpty(TopPoolData.data[0].data) &&
                            <ChartView
                            key={"cpuutilization"}
                            data={TopPoolData1}
                            title={TopPoolData.data[0].params.server}
                            title2={"Top Pool Faulting Rate"}
                            yAxisTitle={"Faults / Sec"}
                            isVisible={true} 
                            showTotal={true} 
                            minimum = {0}
                            maximum = {max}
                            />
                      }
                      {_.isEmpty(TopPoolData.data[0].data) &&
                        <div className="chat_main1"> {/* noDataStyle  */}
                            <div style={{textAlign:'center'}}>
                                <h4>Top Pool Faulting</h4>
                                <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for Top Pool Fault."/>
                            </div>
                        </div>
                      }
                      {!_.isEmpty(TopPoolData.data[1].data) &&
                            <ChartView
                            key={"cpuutilizationtrends"}
                            data={TopPoolData2}
                            title={TopPoolData.data[1].params.server}
                            title2={"Top Pool Faulting Rate"}
                            yAxisTitle={"Faults / Sec"}
                            isVisible={true}
                            showTotal={true}
                            minimum = {0}
                            maximum = {max}
                            />                                    
                        }
                        {_.isEmpty(TopPoolData.data[1].data) &&
                        <div className="chat_main1"> {/* noDataStyle  */}
                            <div style={{textAlign:'center'}}>
                                <h4>Top Pool Faulting</h4>
                                <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for Top Pool Fault."/>
                            </div>
                        </div>
                        }
                        </div>
                    
                </>
                }
            </>
    )
}

export default PeriodTopPoolFaultingChartReport;