import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as _ from 'lodash';
import {
    createChartDataMapping
  } from "../../../../helpers/commonHelper";
import ChartView from "../../common/ChartView";
import moment from "moment";
import { findMinMax, getRound } from "../../../../helpers/commonHelper";
import { fetchAsyncEthernetUtilizationReports, getEthernetLineDataReports} from "../../../../store/slices/reports/DataReportCharts/otherReportChartsSlice";
import GridLoader from "react-spinners/GridLoader";

const PeriodEthernetLineChartReport = ({reportId}) => {
    const dispatch = useDispatch();
    const ethernetLineData = useSelector(getEthernetLineDataReports);
    let period1 = "";
    let period2 = "";
    let max = 100;
    // Show only start date if both start and end date are same
    const period1_sdate = moment(ethernetLineData?.data[0]?.params?.sdata).unix()
    const period1_edate = moment(ethernetLineData?.data[0]?.params?.edate).unix()
    if( period1_sdate === period1_edate )
    {
         period1 = moment(ethernetLineData?.data[0]?.params?.sdata).format("MMM Do YYYY")
    }else{
         period1 = moment(ethernetLineData?.data[0]?.params?.sdata).format("MMM Do YYYY") + ' - ' + moment(ethernetLineData?.data[0]?.params?.edate).format("MMM Do YYYY");
    }
    // Show only start date if both start and end date are same
    const period2_sdate = moment(ethernetLineData?.data[1]?.params?.sdata).unix();
    const period2_edate = moment(ethernetLineData?.data[1]?.params?.edate).unix();
    if( period2_sdate === period2_edate )
    {
        period2 = moment(ethernetLineData?.data[1]?.params?.sdata).format("MMM Do YYYY")
    }else{
        period2 = moment(ethernetLineData?.data[1]?.params?.sdata).format("MMM Do YYYY") + ' - ' + moment(ethernetLineData?.data[1]?.params?.edate).format("MMM Do YYYY");
    }

    useEffect(() => {
        dispatch(fetchAsyncEthernetUtilizationReports(reportId));
    }, [dispatch])

    const ethernetLineData1 = createChartDataMapping(
        ethernetLineData.data[0]?.data || [],
        "stackedArea",
        "ethernetLineUtilization" 
    );
    const ethernetLineData2 = createChartDataMapping(
        ethernetLineData.data[1]?.data || [],
        "stackedArea",
        "ethernetLineUtilization"  
    );

    if(!_.isEmpty(ethernetLineData.data[0]?.data) && !_.isEmpty(ethernetLineData.data[1]?.data)){
        const min_max_1_dp1 = findMinMax(ethernetLineData1[0].dataPoints) 
        const min_max_2_dp1 = findMinMax(ethernetLineData2[0].dataPoints) 
        const min_max_1 = min_max_1_dp1[1];
        const min_max_2 = min_max_2_dp1[1];
        max = _.round(_.max([getRound(min_max_1), getRound(min_max_2)]),2);
    }

    if(!_.isEmpty(ethernetLineData.data[0]?.data) && _.isEmpty(ethernetLineData.data[1]?.data)){
        const min_max_1_dp1 = findMinMax(ethernetLineData1[0].dataPoints) 
        const min_max_1 = min_max_1_dp1[1];
        max = _.round(_.max(getRound(min_max_1)));
    }

    if(_.isEmpty(ethernetLineData.data[0]?.data) && !_.isEmpty(ethernetLineData.data[1]?.data)){
        const min_max_2_dp1 = findMinMax(ethernetLineData2[0].dataPoints) 
        const min_max_2 = min_max_2_dp1[1];
        max = _.round(_.max(getRound(min_max_2)));
    }

    return (
            <>  {ethernetLineData.loading &&
                <div className="chart_container">                 
                    <div style={{display:"block",margin:"auto"}}>  
                       <GridLoader color="#366bd6"/>
                    </div>
                    <div style={{display:"block",margin:"auto"}}>  
                       <GridLoader color="#366bd6"/>
                    </div>
               </div>
                }
                {!ethernetLineData.loading && !_.isEmpty(ethernetLineData.data) &&
                <>
                        <div className="chart_container" style={{ pageBreakAfter: "always" }}> 
                        {!_.isEmpty(ethernetLineData.data[0].data) &&
                            <ChartView
                            key={"cpuutilization"}
                            data={ethernetLineData1}
                            title={ethernetLineData.data[0].params.server}
                            title2={`Ethernet Utilization`}
                            subtitle={period1}
                            yAxisTitle={"Utilization"}
                            isVisible={true} 
                            showTotal={true} 
                            minimum = {0}
                            maximum = {max}
                            />
                        }
                        {_.isEmpty(ethernetLineData.data[0].data) &&
                            <div className="chat_main1"> {/* noDataStyle  */}
                                <div style={{textAlign:'center'}}>
                                    <h4>Ethernet Line Utilization</h4>
                                    <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for Ethernet Line Utilization."/>
                                </div>
                            </div>
                        }
                        {!_.isEmpty(ethernetLineData.data[1].data) &&
                            <ChartView
                            key={"cpuutilizationtrends"}
                            data={ethernetLineData2}
                            title={ethernetLineData.data[1].params.server}
                            title2={`Ethernet Utilization`}
                            subtitle={period2}
                            yAxisTitle={"Utilization"}
                            isVisible={true}
                            showTotal={true}
                            minimum = {0}
                            maximum = {max}
                            /> 
                        }
                        {_.isEmpty(ethernetLineData.data[1].data) &&
                            <div className="chat_main1"> {/* noDataStyle  */}
                                <div style={{textAlign:'center'}}>
                                    <h4>Ethernet Line Utilization</h4>
                                    <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for Ethernet Line Utilization."/>
                                </div>
                            </div>
                        }                                
                        </div>
                </>
                }
            </>
    )
}

export default PeriodEthernetLineChartReport;