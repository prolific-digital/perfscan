import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAsyncPeriodResponse5250,getPeriodResponse5250Data } from "../../../../store/slices/periodVsPeriodCharts/periodCharts/periodOtherChartsSlice";
import usePeriodQueryData from "../../../../hooks/usePeriodQueryData";
import * as _ from 'lodash';
import {
    createChartDataMapping
  } from "../../../../helpers/commonHelper";
import ChartView from "../../common/ChartView";
import moment from "moment";
import { findMinMax, getRound } from "../../../../helpers/commonHelper";
import GridLoader from "react-spinners/GridLoader";
import { getUuidData } from "../../../../store/slices/reports/SaveNewReport/SaveNewReport";

const PeriodReponse5250Chart = (syncHandler) => {
    const dispatch = useDispatch();
    const response5250Data = useSelector(getPeriodResponse5250Data);
    const filters = useSelector(state => state.filters);
    const uuid = useSelector(getUuidData);
    const pFilter = filters.period_filter; //dates
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
    if(!uuid?.loading && uuid.data.uniqueid){
        dispatch(fetchAsyncPeriodResponse5250(pqd));
    }
    }, [dispatch,uuid])

    const response5250Data1 = createChartDataMapping(
        response5250Data.data[0]?.data || [],
        "stackedArea",
        "responseTime5250"
    );
    const response5250Data2 = createChartDataMapping(
        response5250Data.data[1]?.data || [],
        "stackedArea",
        "responseTime5250"
    );

    if(!_.isEmpty(response5250Data.data[0]?.data) && !_.isEmpty(response5250Data.data[1]?.data)){
        const min_max_1_dp1 = findMinMax(response5250Data1[0].dataPoints) 
        const min_max_2_dp1 = findMinMax(response5250Data2[0].dataPoints) 
        const min_max_1 = min_max_1_dp1[1];
        const min_max_2 = min_max_2_dp1[1];
        max = _.round(_.max([getRound(min_max_1), getRound(min_max_2)]),2);
    }

    if(!_.isEmpty(response5250Data.data[0]?.data) && _.isEmpty(response5250Data.data[1]?.data)){
        const min_max_1_dp1 = findMinMax(response5250Data1[0].dataPoints) 
        const min_max_1 = min_max_1_dp1[1];
        max = _.round(_.max(getRound(min_max_1)));
    }

    if(_.isEmpty(response5250Data.data[0]?.data) && !_.isEmpty(response5250Data.data[1]?.data)){
        const min_max_2_dp1 = findMinMax(response5250Data2[0].dataPoints) 
        const min_max_2 = min_max_2_dp1[1];
        max = _.round(_.max(getRound(min_max_2)));
    }

    return (
            <>  {response5250Data.loading &&
                <div className="chart_container">
                    <div style={{display:"block",margin:"auto"}}> 
                        <GridLoader color="#366bd6"/> 
                    </div>
                    <div style={{display:"block",margin:"auto"}}>  
                        <GridLoader color="#366bd6"/>
                    </div>
                </div>
                }
                {!response5250Data.loading && !_.isEmpty(response5250Data.data) &&
                <>
                        <div className="chart_container">
                    {!_.isEmpty(response5250Data.data[0].data) &&
                            <ChartView
                            key={"cpuutilization"}
                            data={response5250Data1}
                            title={response5250Data.data[0].params.server}
                            title2={`5250 Response Time`}
                            subtitle={period1}
                            yAxisTitle={"Seconds"}
                            xAxisDateFormat={response5250Data1[0].xValueFormatString}
                            isVisible={true} 
                            showTotal={true} 
                            minimum = {0}
                            maximum = {max}
                            />
                    }
                    {_.isEmpty(response5250Data.data[0].data) &&
                        <div className="chat_main1"> {/* noDataStyle  */}
                            <div style={{textAlign:'center'}}>
                                <h4>5250 Response Time</h4>
                                <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for 5250 Response Time."/>
                            </div>
                        </div>
                    }
                    {!_.isEmpty(response5250Data.data[1].data) &&
                            <ChartView
                            key={"cpuutilizationtrends"}
                            data={response5250Data2}
                            title={response5250Data.data[1].params.server}
                            title2={`5250 Response Time`}
                            subtitle={period2}
                            yAxisTitle={"Seconds"}
                            xAxisDateFormat={response5250Data2[0].xValueFormatString}
                            isVisible={true}
                            showTotal={true}
                            minimum = {0}
                            maximum = {max}
                            />   
                    }
                    {_.isEmpty(response5250Data.data[1].data) &&
                        <div className="chat_main1"> {/* noDataStyle  */}
                            <div style={{textAlign:'center'}}>
                                <h4>Total Transactions</h4>
                                <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for Total Transactions."/>
                            </div>
                        </div>
                    }                                   
                        </div>
                </>
                }
            </>
    )
}

export default PeriodReponse5250Chart;