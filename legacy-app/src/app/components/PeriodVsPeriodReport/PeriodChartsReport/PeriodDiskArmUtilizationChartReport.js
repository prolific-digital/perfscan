import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as _ from 'lodash';
import moment
 from "moment";
import {
    createChartDataMapping
  } from "../../../../helpers/commonHelper";
import ChartView from "../../common/ChartView";
import { findMinMax, getRound } from "../../../../helpers/commonHelper";
import { fetchAsyncDiskArmUtilizationReports, getDiskArmDataReports} from "../../../../store/slices/reports/DataReportCharts/diskReportChartsSlice";
import GridLoader from "react-spinners/GridLoader";

const PeriodDiskArmUtilizationChartReport = ({reportId}) => {
    const dispatch = useDispatch();
    const diskArmData = useSelector(getDiskArmDataReports);
    let period1 = "";
    let period2 = "";
    let max = 100;
    // Show only start date if both start and end date are same
    const period1_sdate = moment(diskArmData?.data[0]?.params?.sdata).unix()
    const period1_edate = moment(diskArmData?.data[0]?.params?.edate).unix()
    if( period1_sdate === period1_edate )
    {
         period1 = moment(diskArmData?.data[0]?.params?.sdata).format("MMM Do YYYY")
    }else{
         period1 = moment(diskArmData?.data[0]?.params?.sdata).format("MMM Do YYYY") + ' - ' + moment(diskArmData?.data[0]?.params?.edate).format("MMM Do YYYY");
    }
    // Show only start date if both start and end date are same
    const period2_sdate = moment(diskArmData?.data[1]?.params?.sdata).unix();
    const period2_edate = moment(diskArmData?.data[1]?.params?.edate).unix();
    if( period2_sdate === period2_edate )
    {
        period2 = moment(diskArmData?.data[1]?.params?.sdata).format("MMM Do YYYY")
    }else{
        period2 = moment(diskArmData?.data[1]?.params?.sdata).format("MMM Do YYYY") + ' - ' + moment(diskArmData?.data[1]?.params?.edate).format("MMM Do YYYY");
    }

    useEffect(() => {
        dispatch(fetchAsyncDiskArmUtilizationReports(reportId));
    }, [dispatch])

    const diskArmData1 = createChartDataMapping(
        diskArmData.data[0]?.data || [],
        "stackedArea",
        "diskArmUtilization"
    );
    const diskArmData2 = createChartDataMapping(
        diskArmData.data[1]?.data || [],
        "stackedArea",
        "diskArmUtilization"
    );
    
    if(!_.isEmpty(diskArmData.data[0]?.data) && !_.isEmpty(diskArmData.data[1]?.data)){
        const min_max_1_dp1 = findMinMax(diskArmData1[0].dataPoints) 
        const min_max_2_dp1 = findMinMax(diskArmData2[0].dataPoints) 
        const min_max_1 = min_max_1_dp1[1];
        const min_max_2 = min_max_2_dp1[1];
        max = _.round(_.max([getRound(min_max_1), getRound(min_max_2)]),2);
    }

    if(!_.isEmpty(diskArmData.data[0]?.data) && _.isEmpty(diskArmData.data[1]?.data)){
        const min_max_1_dp1 = findMinMax(diskArmData1[0].dataPoints) 
        const min_max_1 = min_max_1_dp1[1];
        max = _.round(_.max(getRound(min_max_1)));
    }

    if(_.isEmpty(diskArmData.data[0]?.data) && !_.isEmpty(diskArmData.data[1]?.data)){
        const min_max_2_dp1 = findMinMax(diskArmData2[0].dataPoints) 
        const min_max_2 = min_max_2_dp1[1];
        max = _.round(_.max(getRound(min_max_2)));
    }

    return (
            <>  {diskArmData.loading &&
                <div className="chart_container">                  
                    <div style={{display:"block",margin:"auto"}}><GridLoader color="#366bd6"/>
                    </div>
                    <div style={{display:"block",margin:"auto"}}>  
                       <GridLoader color="#366bd6"/>
                    </div>
                </div>
                }
                {!diskArmData.loading && !_.isEmpty(diskArmData.data) &&
                <>
                        <div className="chart_container" style={{ pageBreakAfter: "always" }}> 
                        {!_.isEmpty(diskArmData.data[0].data) &&              
                            <ChartView
                            key={"cpuutilization"}
                            data={diskArmData1}
                            title={diskArmData.data[0].params.server}
                            title2={`Disk Arm Utilization`}
                            subtitle={period1}
                            yAxisTitle={"Utilization"}
                            isVisible={true} 
                            showTotal={true} 
                            minimum = {0}
                            maximum = {max}
                            />
                        }
                        {_.isEmpty(diskArmData.data[0].data) &&
                               <div className="chat_main1"> {/* noDataStyle  */}
                                    <div style={{textAlign:'center'}}>
                                        <h4>Disk Arm Utilization</h4>
                                        <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for DiskArm Utilization."/>
                                    </div>
                                </div>
                        }
                        {!_.isEmpty(diskArmData.data[1].data) &&
                            <ChartView
                            key={"cpuutilizationtrends"}
                            data={diskArmData2}
                            title={diskArmData.data[1].params.server}
                            title2={`Disk Arm Utilization`}
                            subtitle={period2}
                            yAxisTitle={"Utilization"}
                            isVisible={true}
                            showTotal={true}
                            minimum = {0}
                            maximum = {max}
                            />    
                        }
                        {_.isEmpty(diskArmData.data[1].data) &&
                               <div className="chat_main1"> {/* noDataStyle  */}
                                    <div style={{textAlign:'center'}}>
                                        <h4>Disk Arm Utilization</h4>
                                        <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for DiskArm Utilization."/>
                                    </div>
                                </div>
                        }                                   
                        </div>
                </>
                }
            </>
    )
}

export default PeriodDiskArmUtilizationChartReport;