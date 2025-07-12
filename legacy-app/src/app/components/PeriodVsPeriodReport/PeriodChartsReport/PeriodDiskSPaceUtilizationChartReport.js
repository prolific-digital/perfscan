import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as _ from 'lodash';
import moment from "moment";
import { findMinMax, getRound } from "../../../../helpers/commonHelper";
import {
    createChartDataMapping
  } from "../../../../helpers/commonHelper";
import ChartView from "../../common/ChartView";
import { fetchAsyncDiskSpaceUtilizationReports, getDiskSpaceDataReports} from "../../../../store/slices/reports/DataReportCharts/diskReportChartsSlice";
import GridLoader from "react-spinners/GridLoader";

const PeriodDiskSPaceUtilizationChartReport = ({reportId}) => {
    const dispatch = useDispatch();
    const diskSpaceData = useSelector(getDiskSpaceDataReports);
    let period1 = "";
    let period2 = "";
    let max = 100;
    // Show only start date if both start and end date are same
    const period1_sdate = moment(diskSpaceData?.data[0]?.params?.sdata).unix()
    const period1_edate = moment(diskSpaceData?.data[0]?.params?.edate).unix()
    if( period1_sdate === period1_edate )
    {
         period1 = moment(diskSpaceData?.data[0]?.params?.sdata).format("MMM Do YYYY")
    }else{
         period1 = moment(diskSpaceData?.data[0]?.params?.sdata).format("MMM Do YYYY") + ' - ' + moment(diskSpaceData?.data[0]?.params?.edate).format("MMM Do YYYY");
    }
    // Show only start date if both start and end date are same
    const period2_sdate = moment(diskSpaceData?.data[1]?.params?.sdata).unix();
    const period2_edate = moment(diskSpaceData?.data[1]?.params?.edate).unix();
    if( period2_sdate === period2_edate )
    {
        period2 = moment(diskSpaceData?.data[1]?.params?.sdata).format("MMM Do YYYY")
    }else{
        period2 = moment(diskSpaceData?.data[1]?.params?.sdata).format("MMM Do YYYY") + ' - ' + moment(diskSpaceData?.data[1]?.params?.edate).format("MMM Do YYYY");
    }

    useEffect(() => {
        dispatch(fetchAsyncDiskSpaceUtilizationReports(reportId));
    }, [dispatch])

    const diskSpaceData1 = createChartDataMapping(
        diskSpaceData.data[0]?.data || [],
        "stackedArea",
        "diskSpaceUtilization"
    );
    const diskSpaceData2 = createChartDataMapping(
        diskSpaceData.data[1]?.data || [],
        "stackedArea",
        "diskSpaceUtilization"
    );

    if(!_.isEmpty(diskSpaceData.data[0]?.data) && !_.isEmpty(diskSpaceData.data[1]?.data)){
        const min_max_1_dp1 = findMinMax(diskSpaceData1[0].dataPoints) 
        const min_max_2_dp1 = findMinMax(diskSpaceData2[0].dataPoints) 
        const min_max_1 = min_max_1_dp1[1];
        const min_max_2 = min_max_2_dp1[1];
        max = _.round(_.max([getRound(min_max_1), getRound(min_max_2)]),2);
    }

    if(!_.isEmpty(diskSpaceData.data[0]?.data) && _.isEmpty(diskSpaceData.data[1]?.data)){
        const min_max_1_dp1 = findMinMax(diskSpaceData1[0].dataPoints) 
        const min_max_1 = min_max_1_dp1[1];
        max = _.round(_.max(getRound(min_max_1)));
    }

    if(_.isEmpty(diskSpaceData.data[0]?.data) && !_.isEmpty(diskSpaceData.data[1]?.data)){
        const min_max_2_dp1 = findMinMax(diskSpaceData2[0].dataPoints) 
        const min_max_2 = min_max_2_dp1[1];
        max = _.round(_.max(getRound(min_max_2)));
    }
    
    return (
            <>  {diskSpaceData.loading &&
                <div className="chart_container">                 
                    <div style={{display:"block",margin:"auto"}}>  
                       <GridLoader color="#366bd6"/>
                    </div>
                    <div style={{display:"block",margin:"auto"}}>  
                       <GridLoader color="#366bd6"/>
                    </div>
               </div>
                }
                {!diskSpaceData.loading && !_.isEmpty(diskSpaceData.data) &&
                <>
                        <div className="chart_container" style={{ pageBreakAfter: "always" }}>  
                        {!_.isEmpty(diskSpaceData.data[0].data) &&
                            <ChartView
                            key={"cpuutilization"}
                            data={diskSpaceData1}
                            title={diskSpaceData.data[0].params.server}
                            title2={`Disk Space Utilization`}
                            subtitle={period1}
                            yAxisTitle={"Utilization"}
                            isVisible={true} 
                            showTotal={true} 
                            minimum = {0}
                            maximum = {max}
                            />
                        }
                        {_.isEmpty(diskSpaceData.data[0].data) &&
                            <div className="chat_main1"> {/* noDataStyle  */}
                                <div style={{textAlign:'center'}}>
                                    <h4>Disk Space Utilization</h4>
                                    <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for Disk Space Utilization."/>
                                </div> 
                            </div>
                        }
                        {!_.isEmpty(diskSpaceData.data[1].data) &&
                            <ChartView
                            key={"cpuutilizationtrends"}
                            data={diskSpaceData2}
                            title={diskSpaceData.data[1].params.server}
                            title2={`Disk Space Utilization`}
                            subtitle={period2}
                            yAxisTitle={"Utilization"}
                            isVisible={true}
                            showTotal={true}
                            minimum = {0}
                            maximum = {max}
                            /> 
                        } 
                        {_.isEmpty(diskSpaceData.data[1].data) &&
                            <div className="chat_main1"> {/* noDataStyle  */}
                                <div style={{textAlign:'center'}}>
                                    <h4>Disk Space Utilization</h4>
                                    <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for Disk Space Utilization."/>
                                </div> 
                            </div>
                        }
                        </div>
                </>
                }
            </>
    )
}

export default PeriodDiskSPaceUtilizationChartReport;