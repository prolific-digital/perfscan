import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as _ from 'lodash';
import moment from "moment";
import { findMinMax, getRound } from "../../../../helpers/commonHelper";
import {
    createChartDataMapping
  } from "../../../../helpers/commonHelper";
import ChartView from "../../common/ChartView";
import { fetchAsyncNumCoresReports, getNumCoresDataReports} from "../../../../store/slices/reports/DataReportCharts/cpuReportChartsSlice";
import GridLoader from "react-spinners/GridLoader";

const PeriodNumCoresChartReport = ({reportId}) => {
    const dispatch = useDispatch();
    const numCoresData = useSelector(getNumCoresDataReports);
    let period1 = "";
    let period2 = "";
    let max = 100;
    // Show only start date if both start and end date are same
    const period1_sdate = moment(numCoresData?.data[0]?.params?.sdata).unix()
    const period1_edate = moment(numCoresData?.data[0]?.params?.edate).unix()
    if( period1_sdate === period1_edate )
    {
         period1 = moment(numCoresData?.data[0]?.params?.sdata).format("MMM Do YYYY")
    }else{
         period1 = moment(numCoresData?.data[0]?.params?.sdata).format("MMM Do YYYY") + ' - ' + moment(numCoresData?.data[0]?.params?.edate).format("MMM Do YYYY");
    }
    // Show only start date if both start and end date are same
    const period2_sdate = moment(numCoresData?.data[1]?.params?.sdata).unix();
    const period2_edate = moment(numCoresData?.data[1]?.params?.edate).unix();
    if( period2_sdate === period2_edate )
    {
        period2 = moment(numCoresData?.data[1]?.params?.sdata).format("MMM Do YYYY")
    }else{
        period2 = moment(numCoresData?.data[1]?.params?.sdata).format("MMM Do YYYY") + ' - ' + moment(numCoresData?.data[1]?.params?.edate).format("MMM Do YYYY");
    }

    useEffect(() => {
        dispatch(fetchAsyncNumCoresReports(reportId));
    }, [dispatch])

    const numCoresData1 = createChartDataMapping(
        numCoresData.data[0]?.data || [],
        "stackedArea",
        "noOfCores"
    );
    const numCoresData2 = createChartDataMapping(
        numCoresData.data[1]?.data || [],
        "stackedArea",
        "noOfCores"
    );
    
    if(!_.isEmpty(numCoresData.data[0]?.data) && !_.isEmpty(numCoresData.data[1]?.data)){
        const min_max_1_dp1 = findMinMax(numCoresData1[0].dataPoints) 
        const min_max_2_dp1 = findMinMax(numCoresData2[0].dataPoints) 
        const min_max_1 = min_max_1_dp1[1];
        const min_max_2 = min_max_2_dp1[1];
        max = _.round(_.max([getRound(min_max_1), getRound(min_max_2)]),2);
    }

    if(!_.isEmpty(numCoresData.data[0]?.data) && _.isEmpty(numCoresData.data[1]?.data)){
        const min_max_1_dp1 = findMinMax(numCoresData1[0].dataPoints) 
        const min_max_1 = min_max_1_dp1[1];
        max = _.round(_.max(getRound(min_max_1)));
    }

    if(_.isEmpty(numCoresData.data[0]?.data) && !_.isEmpty(numCoresData.data[1]?.data)){
        const min_max_2_dp1 = findMinMax(numCoresData2[0].dataPoints) 
        const min_max_2 = min_max_2_dp1[1];
        max = _.round(_.max(getRound(min_max_2)));
    }

    return (
            <>  {numCoresData.loading &&
                <div className="chart_container">
                    <div style={{display:"block",margin:"auto"}}>  
                       <GridLoader color="#366bd6"/>
                    </div>
                    <div style={{display:"block",margin:"auto"}}>  
                       <GridLoader color="#366bd6"/>
                    </div>
               </div>
                }
                {!numCoresData.loading && !_.isEmpty(numCoresData.data) &&
                <>
                        <div className="chart_container" style={{ pageBreakAfter: "always" }}>  
                      {!_.isEmpty(numCoresData.data[0].data) &&
                            <ChartView
                            key={"cpuutilization"}
                            data={numCoresData1}
                            title={numCoresData.data[0].params.server}
                            title2={`Number of Cores`}
                            subtitle={period1}
                            yAxisTitle={"Number of Cores"}
                            isVisible={true} 
                            showTotal={true} 
                            minimum = {0}
                            maximum = {max}
                            />
                      }
                      {_.isEmpty(numCoresData.data[0].data) &&
                         <div className="chat_main1"> {/* noDataStyle  */}
                            <div style={{textAlign:'center'}}>
                                <h4>Num Cores</h4>
                                <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for Number of Cores."/>
                            </div> 
                        </div>
                      }
                      {!_.isEmpty(numCoresData.data[1].data) &&
                            <ChartView
                            key={"cpuutilizationtrends"}
                            data={numCoresData2}
                            title={numCoresData.data[1].params.server}
                            title2={`Number of Cores`}
                            subtitle={period2}
                            yAxisTitle={"Number of Cores"}
                            isVisible={true}
                            showTotal={true}
                            minimum = {0}
                            maximum = {max}
                            /> 
                      }
                    {_.isEmpty(numCoresData.data[1].data) &&
                         <div className="chat_main1"> {/* noDataStyle  */}
                            <div style={{textAlign:'center'}}>
                                <h4>Num Cores</h4>
                                <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for Number of Cores."/>
                            </div> 
                        </div>
                    }                                   
                        </div>
                </>
                }
            </>
    )
}

export default PeriodNumCoresChartReport;