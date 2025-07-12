import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as _ from 'lodash';
import moment from "moment";
import { findMinMax, getRound } from "../../../../helpers/commonHelper";
import {
    createChartDataMapping
  } from "../../../../helpers/commonHelper";
import ChartView from "../../common/ChartView";
import { fetchAsyncReadWriteRatioReports, getDiskReadWriteDataReports} from "../../../../store/slices/reports/DataReportCharts/diskReportChartsSlice";
import GridLoader from "react-spinners/GridLoader";

const PeriodDiskReadWriteChartReport = ({reportId}) => {
    const dispatch = useDispatch();
    const diskReadWriteData = useSelector(getDiskReadWriteDataReports);
    let period1 = "";
    let period2 = "";
    let max = 100;
    // Show only start date if both start and end date are same
    const period1_sdate = moment(diskReadWriteData?.data[0]?.params?.sdata).unix()
    const period1_edate = moment(diskReadWriteData?.data[0]?.params?.edate).unix()
    if( period1_sdate === period1_edate )
    {
         period1 = moment(diskReadWriteData?.data[0]?.params?.sdata).format("MMM Do YYYY")
    }else{
         period1 = moment(diskReadWriteData?.data[0]?.params?.sdata).format("MMM Do YYYY") + ' - ' + moment(diskReadWriteData?.data[0]?.params?.edate).format("MMM Do YYYY");
    }
    // Show only start date if both start and end date are same
    const period2_sdate = moment(diskReadWriteData?.data[1]?.params?.sdata).unix();
    const period2_edate = moment(diskReadWriteData?.data[1]?.params?.edate).unix();
    if( period2_sdate === period2_edate )
    {
        period2 = moment(diskReadWriteData?.data[1]?.params?.sdata).format("MMM Do YYYY")
    }else{
        period2 = moment(diskReadWriteData?.data[1]?.params?.sdata).format("MMM Do YYYY") + ' - ' + moment(diskReadWriteData?.data[1]?.params?.edate).format("MMM Do YYYY");
    }

    useEffect(() => {
        dispatch(fetchAsyncReadWriteRatioReports(reportId));
    }, [dispatch])

    const diskReadWriteData1 = createChartDataMapping(
        diskReadWriteData.data[0]?.data || [],
        "stackedArea",
        "readWriteRatio"
    );
    const diskReadWriteData2 = createChartDataMapping(
        diskReadWriteData.data[1]?.data || [],
        "stackedArea",
        "readWriteRatio"
    );

    if(!_.isEmpty(diskReadWriteData.data[0]?.data) && !_.isEmpty(diskReadWriteData.data[1]?.data)){
        const min_max_1_dp1 = findMinMax(diskReadWriteData1[0].dataPoints) 
        const min_max_2_dp1 = findMinMax(diskReadWriteData2[0].dataPoints) 
        const min_max_1 = min_max_1_dp1[1];
        const min_max_2 = min_max_2_dp1[1];
        max = _.round(_.max([getRound(min_max_1), getRound(min_max_2)]),2);
    }

    if(!_.isEmpty(diskReadWriteData.data[0]?.data) && _.isEmpty(diskReadWriteData.data[1]?.data)){
        const min_max_1_dp1 = findMinMax(diskReadWriteData1[0].dataPoints) 
        const min_max_1 = min_max_1_dp1[1];
        max = _.round(_.max(getRound(min_max_1)));
    }

    if(_.isEmpty(diskReadWriteData.data[0]?.data) && !_.isEmpty(diskReadWriteData.data[1]?.data)){
        const min_max_2_dp1 = findMinMax(diskReadWriteData2[0].dataPoints) 
        const min_max_2 = min_max_2_dp1[1];
        max = _.round(_.max(getRound(min_max_2)));
    }

    return (
            <>  {diskReadWriteData.loading &&
                <div className="chart_container">                  
                    <div style={{display:"block",margin:"auto"}}>  
                       <GridLoader color="#366bd6"/>
                    </div>
                    <div style={{display:"block",margin:"auto"}}>  
                       <GridLoader color="#366bd6"/>
                    </div>
                </div>
                }
                {!diskReadWriteData.loading && !_.isEmpty(diskReadWriteData.data) &&
                <>
                    <div className="chart_container" style={{ pageBreakAfter: "always" }}>  
                    {!_.isEmpty(diskReadWriteData.data[0].data) &&
                            <ChartView
                            key={"cpuutilization"}
                            data={diskReadWriteData1}
                            title={diskReadWriteData.data[0].params.server}
                            title2={`Read Write Ratio`}
                            subtitle={period1}
                            yAxisTitle={"Ratio"}
                            isVisible={true} 
                            showTotal={true} 
                            minimum = {0}
                            maximum = {max}
                            />
                    }
                    {_.isEmpty(diskReadWriteData.data[0].data) &&
                            <div className="chat_main1"> {/* noDataStyle  */}
                                <div style={{textAlign:'center'}}>
                                    <h4>Disk Read Write Ratio</h4>
                                    <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for Disk Read Write Ratio."/>
                                </div> 
                            </div>
                    }
                    {!_.isEmpty(diskReadWriteData.data[1].data) &&

                            <ChartView
                            key={"cpuutilizationtrends"}
                            data={diskReadWriteData2}
                            title={diskReadWriteData.data[1].params.server}
                            title2={`Read Write Ratio`}
                            subtitle={period2}
                            yAxisTitle={"Ratio"}
                            isVisible={true}
                            showTotal={true}
                            minimum = {0}
                            maximum = {max}
                            /> 
                    }
                    {_.isEmpty(diskReadWriteData.data[1].data) &&
                            <div className="chat_main1"> {/* noDataStyle  */}
                                <div style={{textAlign:'center'}}>
                                    <h4>Disk Read Write Ratio</h4>
                                    <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for Disk Read Write Ratio."/>
                                </div> 
                            </div>
                    }                                    
                    </div>
                </>
                }
            </>
    )
}

export default PeriodDiskReadWriteChartReport;