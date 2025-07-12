import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as _ from 'lodash';
import {
    createChartDataMapping
  } from "../../../../helpers/commonHelper";
import ChartView from "../../common/ChartView";
import moment from "moment";
import { findMinMax, getRound } from "../../../../helpers/commonHelper";
import { fetchAsyncTotalTransactionReports, getTotalTransactionsDataReports} from "../../../../store/slices/reports/DataReportCharts/otherReportChartsSlice";
import GridLoader from "react-spinners/GridLoader";

const PeriodTotalTransactionChartReport = ({reportId}) => {
    const dispatch = useDispatch();
    const totalTransactionData = useSelector(getTotalTransactionsDataReports);
    let period1 = "";
    let period2 = "";
    let max = 100;
    // Show only start date if both start and end date are same
    const period1_sdate = moment(totalTransactionData?.data[0]?.params?.sdata).unix()
    const period1_edate = moment(totalTransactionData?.data[0]?.params?.edate).unix()
    if( period1_sdate === period1_edate )
    {
         period1 = moment(totalTransactionData?.data[0]?.params?.sdata).format("MMM Do YYYY")
    }else{
         period1 = moment(totalTransactionData?.data[0]?.params?.sdata).format("MMM Do YYYY") + ' - ' + moment(totalTransactionData?.data[0]?.params?.edate).format("MMM Do YYYY");
    }
    // Show only start date if both start and end date are same
    const period2_sdate = moment(totalTransactionData?.data[1]?.params?.sdata).unix();
    const period2_edate = moment(totalTransactionData?.data[1]?.params?.edate).unix();
    if( period2_sdate === period2_edate )
    {
        period2 = moment(totalTransactionData?.data[1]?.params?.sdata).format("MMM Do YYYY")
    }else{
        period2 = moment(totalTransactionData?.data[1]?.params?.sdata).format("MMM Do YYYY") + ' - ' + moment(totalTransactionData?.data[1]?.params?.edate).format("MMM Do YYYY");
    }

    useEffect(() => {
        dispatch(fetchAsyncTotalTransactionReports(reportId));
    }, [dispatch])

    const totalTransactionData1 = createChartDataMapping(
        totalTransactionData.data[0]?.data || [],
        "stackedArea",
        "totalTransactions"
    );
    const totalTransactionData2 = createChartDataMapping(
        totalTransactionData.data[1]?.data || [],
        "stackedArea",
        "totalTransactions"
    );

    if(!_.isEmpty(totalTransactionData.data[0]?.data) && !_.isEmpty(totalTransactionData.data[1]?.data)){
        const min_max_1_dp1 = findMinMax(totalTransactionData1[0].dataPoints) 
        const min_max_2_dp1 = findMinMax(totalTransactionData2[0].dataPoints) 
        const min_max_1 = min_max_1_dp1[1];
        const min_max_2 = min_max_2_dp1[1];
        max = _.round(_.max([getRound(min_max_1), getRound(min_max_2)]),2);
    }

    if(!_.isEmpty(totalTransactionData.data[0]?.data) && _.isEmpty(totalTransactionData.data[1]?.data)){
        const min_max_1_dp1 = findMinMax(totalTransactionData1[0].dataPoints) 
        const min_max_1 = min_max_1_dp1[1];
        max = _.round(_.max(getRound(min_max_1)));
    }

    if(_.isEmpty(totalTransactionData.data[0]?.data) && !_.isEmpty(totalTransactionData.data[1]?.data)){
        const min_max_2_dp1 = findMinMax(totalTransactionData2[0].dataPoints) 
        const min_max_2 = min_max_2_dp1[1];
        max = _.round(_.max(getRound(min_max_2)));
    }

    return (
            <>  {totalTransactionData.loading &&
                <div className="chart_container">
                    <div style={{display:"block",margin:"auto"}}>  
                       <GridLoader color="#366bd6"/>
                    </div>
                    <div style={{display:"block",margin:"auto"}}>  
                       <GridLoader color="#366bd6"/>
                    </div>
                </div>
                }
                {!totalTransactionData.loading && !_.isEmpty(totalTransactionData.data) &&
                <>
                        <div className="chart_container" style={{ pageBreakAfter: "always" }}>
                    {!_.isEmpty(totalTransactionData.data[0].data) &&
                            <ChartView
                            key={"cpuutilization"}
                            data={totalTransactionData1}
                            title={totalTransactionData.data[0].params.server}
                            title2={`Total Transactions`}
                            subtitle={period1}
                            yAxisTitle={"Transactions"}
                            isVisible={true} 
                            showTotal={true} 
                            minimum = {0}
                            maximum = {max}
                            />
                    }
                    {_.isEmpty(totalTransactionData.data[0].data) &&
                        <div className="chat_main1"> {/* noDataStyle  */}
                            <div style={{textAlign:'center'}}>
                                <h4>Total Transactions</h4>
                                <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for Total Transactions."/>
                            </div>
                        </div>
                    }
                    {!_.isEmpty(totalTransactionData.data[1].data) &&
                            <ChartView
                            key={"cpuutilizationtrends"}
                            data={totalTransactionData2}
                            title={totalTransactionData.data[1].params.server}
                            title2={`Total Transactions`}
                            subtitle={period2}
                            yAxisTitle={"Transactions"}
                            isVisible={true}
                            showTotal={true}
                            minimum = {0}
                            maximum = {max}
                            />   
                    }
                    {_.isEmpty(totalTransactionData.data[1].data) &&
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

export default PeriodTotalTransactionChartReport;