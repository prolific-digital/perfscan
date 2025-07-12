
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as _ from 'lodash';
import moment from "moment";
import {
    createChartDataMapping
  } from "../../../../helpers/commonHelper";
import ChartView from "../../common/ChartView";
import { findMinMax, getRound } from "../../../../helpers/commonHelper";
import { fetchAsyncDiskOperationsReports, getDiskOperationsDataReports} from "../../../../store/slices/reports/DataReportCharts/diskReportChartsSlice";
import GridLoader from "react-spinners/GridLoader";

const PeriodDiskOperationChartReport = ({reportId}) => {
    const dispatch = useDispatch();
    const diskOperationData = useSelector(getDiskOperationsDataReports);
    let period1 = "";
    let period2 = "";
    let max = 100;
    // Show only start date if both start and end date are same
    const period1_sdate = moment(diskOperationData?.data[0]?.params?.sdata).unix()
    const period1_edate = moment(diskOperationData?.data[0]?.params?.edate).unix()
    if( period1_sdate === period1_edate )
    {
         period1 = moment(diskOperationData?.data[0]?.params?.sdata).format("MMM Do YYYY")
    }else{
         period1 = moment(diskOperationData?.data[0]?.params?.sdata).format("MMM Do YYYY") + ' - ' + moment(diskOperationData?.data[0]?.params?.edate).format("MMM Do YYYY");
    }
    // Show only start date if both start and end date are same
    const period2_sdate = moment(diskOperationData?.data[1]?.params?.sdata).unix();
    const period2_edate = moment(diskOperationData?.data[1]?.params?.edate).unix();
    if( period2_sdate === period2_edate )
    {
        period2 = moment(diskOperationData?.data[1]?.params?.sdata).format("MMM Do YYYY")
    }else{
        period2 = moment(diskOperationData?.data[1]?.params?.sdata).format("MMM Do YYYY") + ' - ' + moment(diskOperationData?.data[1]?.params?.edate).format("MMM Do YYYY");
    }

    useEffect(() => {
        dispatch(fetchAsyncDiskOperationsReports(reportId));
    }, [dispatch])

    const diskOperationData1 = createChartDataMapping(
        diskOperationData.data[0]?.data || [],
        "stackedArea",
        "diskOperations"
    );
    const diskOperationData2 = createChartDataMapping(
        diskOperationData.data[1]?.data || [],
        "stackedArea",
        "diskOperations"
    );

    if(!_.isEmpty(diskOperationData.data[0]?.data) && !_.isEmpty(diskOperationData.data[1]?.data)){
        const min_max_1_dp1 = findMinMax(diskOperationData1[0].dataPoints) 
        const min_max_1_dp2 = findMinMax(diskOperationData1[1].dataPoints);
        const min_max_2_dp1 = findMinMax(diskOperationData2[0].dataPoints) 
        const min_max_2_dp2 = findMinMax(diskOperationData2[1].dataPoints);
        const min_max_1 = min_max_1_dp1[1] + min_max_1_dp2[1];
        const min_max_2 = min_max_2_dp1[1] + min_max_2_dp2[1];
        max = _.round(_.max([getRound(min_max_1), getRound(min_max_2)]),2);
    }

    if(!_.isEmpty(diskOperationData.data[0]?.data) && _.isEmpty(diskOperationData.data[1]?.data)){
        const min_max_1_dp1 = findMinMax(diskOperationData1[0].dataPoints) 
        const min_max_1_dp2 = findMinMax(diskOperationData1[1].dataPoints);
        const min_max_1 = min_max_1_dp1[1] + min_max_1_dp2[1];
        max = _.round(_.max(getRound(min_max_1)));
    }

    if(_.isEmpty(diskOperationData.data[0]?.data) && !_.isEmpty(diskOperationData.data[1]?.data)){
        const min_max_2_dp1 = findMinMax(diskOperationData2[0].dataPoints) 
        const min_max_2_dp2 = findMinMax(diskOperationData2[1].dataPoints);
        const min_max_2 = min_max_2_dp1[1] + min_max_2_dp2[1];
        max = _.round(_.max(getRound(min_max_2)));
    }
    
    return (
            <>  {diskOperationData.loading &&
                <div className="chart_container">                  
                    <div style={{display:"block",margin:"auto"}}>  
                       <GridLoader color="#366bd6"/>
                    </div>
                    <div style={{display:"block",margin:"auto"}}>  
                       <GridLoader color="#366bd6"/>
                    </div>
               </div>
                }
                {!diskOperationData.loading && !_.isEmpty(diskOperationData.data) &&
                <>
                        <div className="chart_container" style={{ pageBreakAfter: "always" }}>   
                        {!_.isEmpty(diskOperationData.data[0].data) &&
                            <ChartView
                            key={"cpuutilization"}
                            data={diskOperationData1}
                            title={diskOperationData.data[0].params.server}
                            title2={`Total Disk Operations`}
                            subtitle={period1}
                            yAxisTitle={"OPS / Sec"}
                            isVisible={true} 
                            showTotal={true} 
                            minimum = {0}
                            maximum = {max}/>
                        }
                        {_.isEmpty(diskOperationData.data[0].data) &&
                            <div className="chat_main1"> {/* noDataStyle  */}
                                <div style={{textAlign:'center'}}>
                                    <h4>Disk Operations</h4>
                                    <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for Disk Operations."/>
                                </div> 
                            </div>
                        }
                        {!_.isEmpty(diskOperationData.data[1].data) &&
                            <ChartView
                            key={"cpuutilizationtrends"}
                            data={diskOperationData2}
                            title={diskOperationData.data[1].params.server}
                            title2={`Total Disk Operations`}
                            subtitle={period2}
                            yAxisTitle={"OPS / Sec"}
                            isVisible={true}
                            showTotal={true}
                            minimum = {0}
                            maximum = {max}/>                                
                        }
                        {_.isEmpty(diskOperationData.data[1].data) &&
                            <div className="chat_main1"> {/* noDataStyle  */}
                                <div style={{textAlign:'center'}}>
                                    <h4>Disk Operations</h4>
                                    <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for Disk Operations."/>
                                </div> 
                            </div>
                        }
                        </div>
                </>
                }
            </>
    )
}

export default PeriodDiskOperationChartReport;