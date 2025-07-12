import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as _ from 'lodash';
import ChartView from "../../common/ChartView";
import moment from "moment";
import { findMinMax, getRound } from "../../../../helpers/commonHelper";
import {
    createChartDataMapping,
  } from "../../../../helpers/commonHelper";
import { fetchAsyncCPUMSReports,  getCPUMsDataReports} from "../../../../store/slices/reports/DataReportCharts/cpuReportChartsSlice";
import GridLoader from "react-spinners/GridLoader";

const PeriodCpuMsChartReport = ({ reportId }) => {
    const dispatch = useDispatch();
    const cpuMsData = useSelector(getCPUMsDataReports);

    let period1 = "";
    let period2 = "";
    let max = "";
    // Show only start date if both start and end date are same
    const period1_sdate = moment(cpuMsData?.data[0]?.params?.sdata).unix()
    const period1_edate = moment(cpuMsData?.data[0]?.params?.edate).unix()
    if( period1_sdate === period1_edate )
    {
         period1 = moment(cpuMsData?.data[0]?.params?.sdata).format("MMM Do YYYY")
    }else{
         period1 = moment(cpuMsData?.data[0]?.params?.sdata).format("MMM Do YYYY") + ' - ' + moment(cpuMsData?.data[0]?.params?.edate).format("MMM Do YYYY");
    }
    // Show only start date if both start and end date are same
    const period2_sdate = moment(cpuMsData?.data[1]?.params?.sdata).unix();
    const period2_edate = moment(cpuMsData?.data[1]?.params?.edate).unix();
    if( period2_sdate === period2_edate )
    {
        period2 = moment(cpuMsData?.data[1]?.params?.sdata).format("MMM Do YYYY")
    }else{
        period2 = moment(cpuMsData?.data[1]?.params?.sdata).format("MMM Do YYYY") + ' - ' + moment(cpuMsData?.data[1]?.params?.edate).format("MMM Do YYYY");
    }

    useEffect(() => {
        dispatch(fetchAsyncCPUMSReports(reportId));
    }, [dispatch])

    const cpuMs1 = createChartDataMapping(
        cpuMsData.data[0]?.data || [],
        "stackedArea",
        "CPUMsUtilization"
    );
    const cpuMs2 = createChartDataMapping(
        cpuMsData.data[1]?.data || [],
        "stackedArea",
        "CPUMsUtilization"
    );

    if (!_.isEmpty(cpuMsData.data[0]?.data) && !_.isEmpty(cpuMsData.data[1]?.data)) {
        const min_max_1_dp1 = findMinMax(cpuMs1[0].dataPoints)
        const min_max_2_dp1 = findMinMax(cpuMs2[0].dataPoints)
        const min_max_1 = min_max_1_dp1[1];
        const min_max_2 = min_max_2_dp1[1];
        max = _.round(_.max([getRound(min_max_1), getRound(min_max_2)]), 2);
    }

    if(!_.isEmpty(cpuMsData.data[0]?.data) && !_.isEmpty(cpuMsData.data[1]?.data)){
        const min_max_1_dp1 = findMinMax(cpuMs1[0].dataPoints) 
        const min_max_2_dp1 = findMinMax(cpuMs2[0].dataPoints) 
        const min_max_1 = min_max_1_dp1[1];
        const min_max_2 = min_max_2_dp1[1];
        max = _.round(_.max([getRound(min_max_1), getRound(min_max_2)]),2);
    }

    if(!_.isEmpty(cpuMsData.data[0]?.data) && _.isEmpty(cpuMsData.data[1]?.data)){
        const min_max_1_dp1 = findMinMax(cpuMs1[0].dataPoints) 
        const min_max_1 = min_max_1_dp1[1];
        max = _.round(_.max(getRound(min_max_1)));
    }

    if(_.isEmpty(cpuMsData.data[0]?.data) && !_.isEmpty(cpuMsData.data[1]?.data)){
        const min_max_2_dp1 = findMinMax(cpuMs2[0].dataPoints) 
        const min_max_2 = min_max_2_dp1[1];
        max = _.round(_.max(getRound(min_max_2)));
    }

    return (
            <>
                { cpuMsData.loading &&
                 <div className="chart_container">
                     <div style={{display:"block",margin:"auto"}}>  
                        <GridLoader color="#366bd6"/>
                     </div>
                     <div style={{display:"block",margin:"auto"}}>  
                        <GridLoader color="#366bd6"/>
                     </div>
                </div>
            }
            {!cpuMsData.loading && !_.isEmpty(cpuMsData.data) &&
                <>
                    <div className="chart_container" style={{ pageBreakAfter: "always" }}>
                        {!_.isEmpty(cpuMsData.data[0].data) &&
                            <ChartView
                            key={"cpuutilization"}
                            data={cpuMs1}
                            title={cpuMsData.data[0].params.server}
                            title2={`Total CPU ms used`}
                            subtitle={period1}
                            yAxisTitle={"ms"}
                            isVisible={true} 
                            showTotal={true} 
                            minimum = {0}
                            maximum = {max}
                            />
                        }
                        {_.isEmpty(cpuMsData.data[0].data) &&
                            <div className="chat_main1">
                                <div style={{textAlign:'center'}}>
                                    <h4>CPUMs</h4>
                                    <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for CPUMS data."/>
                                </div>
                            </div>
                        }
                        {!_.isEmpty(cpuMsData.data[1].data) &&
                            <ChartView
                            key={"cpuutilizationtrends"}
                            data={cpuMs2}
                            title={cpuMsData.data[1].params.server}
                            title2={`Total CPU ms used`}
                            subtitle={period2}
                            yAxisTitle={"ms"}
                            isVisible={true}
                            showTotal={true}
                            minimum = {0}
                            maximum = {max}
                            />
                        }
                        {_.isEmpty(cpuMsData.data[1].data) &&
                            <div className="chat_main1">
                                <div style={{textAlign:'center'}}>
                                    <h4>CPUMs</h4>
                                    <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for CPUMS data."/>
                                </div>
                            </div>
                        }
                    </div>
                </>
            }
        </>
    )
}

export default PeriodCpuMsChartReport;