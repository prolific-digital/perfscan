import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as _ from 'lodash';
import {
    createChartDataMapping
  } from "../../../../helpers/commonHelper";
import ChartView from "../../common/ChartView";
import moment from "moment";
import { findMinMax, getRound } from "../../../../helpers/commonHelper";
import { fetchAsyncTotalFaultingRateReports, getTotalFaultingRateDataReports} from "../../../../store/slices/reports/DataReportCharts/memoryReportChartsSlice";
import GridLoader from "react-spinners/GridLoader";

const PeriodTotalFaultingRateChartReport = ({reportId}) => {
    const dispatch = useDispatch();
    const TotalFaultingData = useSelector(getTotalFaultingRateDataReports);
    let period1 = "";
    let period2 = "";
    let max = 100;
    // Show only start date if both start and end date are same
    const period1_sdate = moment(TotalFaultingData?.data[0]?.params?.sdata).unix()
    const period1_edate = moment(TotalFaultingData?.data[0]?.params?.edate).unix()
    if( period1_sdate === period1_edate )
    {
         period1 = moment(TotalFaultingData?.data[0]?.params?.sdata).format("MMM Do YYYY")
    }else{
         period1 = moment(TotalFaultingData?.data[0]?.params?.sdata).format("MMM Do YYYY") + ' - ' + moment(TotalFaultingData?.data[0]?.params?.edate).format("MMM Do YYYY");
    }
    // Show only start date if both start and end date are same
    const period2_sdate = moment(TotalFaultingData?.data[1]?.params?.sdata).unix();
    const period2_edate = moment(TotalFaultingData?.data[1]?.params?.edate).unix();
    if( period2_sdate === period2_edate )
    {
        period2 = moment(TotalFaultingData?.data[1]?.params?.sdata).format("MMM Do YYYY")
    }else{
        period2 = moment(TotalFaultingData?.data[1]?.params?.sdata).format("MMM Do YYYY") + ' - ' + moment(TotalFaultingData?.data[1]?.params?.edate).format("MMM Do YYYY");
    }

    useEffect(() => {
        dispatch(fetchAsyncTotalFaultingRateReports(reportId));
    }, [dispatch])

    const TotalFaultingData1 = createChartDataMapping(
        TotalFaultingData.data[0]?.data || [],
        "stackedArea",
        "totalFaultingRate"
    );
    const TotalFaultingData2 = createChartDataMapping(
        TotalFaultingData.data[1]?.data || [],
        "stackedArea",
        "totalFaultingRate"
    );
    
    if(!_.isEmpty(TotalFaultingData.data[0]?.data) && !_.isEmpty(TotalFaultingData.data[1]?.data)){
        const min_max_1_dp1 = findMinMax(TotalFaultingData1[0].dataPoints) 
        const min_max_2_dp1 = findMinMax(TotalFaultingData2[0].dataPoints) 
        const min_max_1 = min_max_1_dp1[1];
        const min_max_2 = min_max_2_dp1[1];
        max = _.round(_.max([getRound(min_max_1), getRound(min_max_2)]),2);
    }

    if(!_.isEmpty(TotalFaultingData.data[0]?.data) && _.isEmpty(TotalFaultingData.data[1]?.data)){
        const min_max_1_dp1 = findMinMax(TotalFaultingData1[0].dataPoints) 
        const min_max_1 = min_max_1_dp1[1];
        max = _.round(_.max(getRound(min_max_1)));
    }

    if(_.isEmpty(TotalFaultingData.data[0]?.data) && !_.isEmpty(TotalFaultingData.data[1]?.data)){
        const min_max_2_dp1 = findMinMax(TotalFaultingData2[0].dataPoints) 
        const min_max_2 = min_max_2_dp1[1];
        max = _.round(_.max(getRound(min_max_2)));
    }

    return (
            <>  {TotalFaultingData.loading &&
                <div className="chart_container">
                    <div style={{display:"block",margin:"auto"}}>  
                       <GridLoader color="#366bd6"/>
                    </div>
                    <div style={{display:"block",margin:"auto"}}>  
                       <GridLoader color="#366bd6"/>
                    </div>
               </div>
                }
                {!TotalFaultingData.loading && !_.isEmpty(TotalFaultingData.data) &&
                <>
                        <div className="chart_container" style={{ pageBreakAfter: "always" }}> 
                    {!_.isEmpty(TotalFaultingData.data[0].data) &&                                        
                            <ChartView
                            key={"cpuutilization"}
                            data={TotalFaultingData1}
                            title={TotalFaultingData.data[0].params.server}
                            title2={`Total Faulting Rate`}
                            subtitle={period1}
                            yAxisTitle={"Faults / Sec"}
                            isVisible={true} 
                            showTotal={true} 
                            minimum = {0}
                            maximum = {max}
                            />
                    }
                    {_.isEmpty(TotalFaultingData.data[0].data) &&
                        <div className="chat_main1"> {/* noDataStyle  */}
                            <div style={{textAlign:'center'}}>
                                <h4>Total Faulting Chart</h4>
                                <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for Total Faulting Chart."/>
                            </div>
                        </div>
                      }
                    {!_.isEmpty(TotalFaultingData.data[1].data) &&
                            <ChartView
                            key={"cpuutilizationtrends"}
                            data={TotalFaultingData2}
                            title={TotalFaultingData.data[1].params.server}
                            title2={`Total Faulting Rate`}
                            subtitle={period2}
                            yAxisTitle={"Faults / Sec"}
                            isVisible={true}
                            showTotal={true}
                            minimum = {0}
                            maximum = {max}
                            /> 
                    }
                    {_.isEmpty(TotalFaultingData.data[1].data) &&
                        <div className="chat_main1"> {/* noDataStyle  */}
                            <div style={{textAlign:'center'}}>
                                <h4>Total Faulting Chart</h4>
                                <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for Total Faulting Chart."/>
                            </div>
                        </div>
                    }                                
                        </div>
                </>
                }
            </>
    )
}

export default PeriodTotalFaultingRateChartReport;