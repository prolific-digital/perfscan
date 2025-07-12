import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAsyncPeriodNumCores,getNumCoresChartData } from "../../../../store/slices/periodVsPeriodCharts/periodCharts/periodCPUChartsSlice";
import usePeriodQueryData from "../../../../hooks/usePeriodQueryData";
import * as _ from 'lodash';
import moment from "moment";
import { findMinMax, getRound } from "../../../../helpers/commonHelper";
import {
    createChartDataMapping
  } from "../../../../helpers/commonHelper";
import ChartView from "../../common/ChartView";
import GridLoader from "react-spinners/GridLoader";
import { getUuidData } from "../../../../store/slices/reports/SaveNewReport/SaveNewReport";

const PeriodNumCoresChart = (syncHandler) => {
    const dispatch = useDispatch();
    const numCoresData = useSelector(getNumCoresChartData);
    const filters = useSelector(state => state.filters);
    const pFilter = filters.period_filter; //dates
    const uuid = useSelector(getUuidData);
    let period1 = "";
    let period2 = "";
    let max = 100;
    // Show only start date if both start and end date are same
    const period1_sdate = moment(pFilter[0].sdate).unix()
    const period1_edate = moment(pFilter[0].edate).unix()
    if( period1_sdate === period1_edate )
    {
         period1 = moment(pFilter[0].sdate).format("MMM Do YYYY")
    }else{
         period1 = moment(pFilter[0].sdate).format("MMM Do YYYY") + ' - ' + moment(pFilter[0].edate).format("MMM Do YYYY");
    }
    // Show only start date if both start and end date are same
    const period2_sdate = moment(pFilter[1].sdate).unix();
    const period2_edate = moment(pFilter[1].edate).unix();
    if( period2_sdate === period2_edate )
    {
        period2 = moment(pFilter[1].sdate).format("MMM Do YYYY")
    }else{
        period2 = moment(pFilter[1].sdate).format("MMM Do YYYY") + ' - ' + moment(pFilter[1].edate).format("MMM Do YYYY");
    }

    const pqd = usePeriodQueryData();

    useEffect(() => {
    if(!uuid?.loading && uuid.data.uniqueid ){
        dispatch(fetchAsyncPeriodNumCores(pqd));
    }
    }, [dispatch,uuid])

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
                        <div className="chart_container">  
                      {!_.isEmpty(numCoresData.data[0].data) &&
                            <ChartView
                            key={"cpuutilization"}
                            data={numCoresData1}
                            title={numCoresData.data[0].params.server}
                            title2={`Number of Cores`}
                            subtitle={period1}
                            yAxisTitle={"Number of Cores"}
                            xAxisDateFormat={numCoresData1[0].xValueFormatString}
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
                            xAxisDateFormat={numCoresData2[0].xValueFormatString}
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

export default PeriodNumCoresChart;