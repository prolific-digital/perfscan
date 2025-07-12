import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAsyncTotalTransactionReports,getTotalTransactionsDataReports } from "../../../../store/slices/reports/DataReportCharts/otherReportChartsSlice";
import {
  createChartDataMapping,
} from "../../../../helpers/commonHelper";
import ChartView from "../../common/ChartView";
import ChartViewTrend from "../../common/ChartViewTrend";
import * as _ from 'lodash';
import GridLoader from "react-spinners/GridLoader";

const TotalTransactionsReport = ({ activeChartView,reportId }) => {
  const dispatch = useDispatch();
  const totalTransactionsData = useSelector(getTotalTransactionsDataReports);
  const [checkData, setCheckData] = useState(false); //new

  useEffect(() => {
    dispatch(fetchAsyncTotalTransactionReports(reportId));
    }, [dispatch])

  useEffect(() => {
        if(totalTransactionsData.loading === false && !_.isEmpty(totalTransactionsData.data)){
      if (totalTransactionsData.data.data.length === 0) {
        setCheckData(false);
      }
            else{
                setCheckData(true)
    }
        }
    }, [totalTransactionsData])

  const totalTransactionsDataMatrics = createChartDataMapping(
    totalTransactionsData.data.data || [],
    "stackedArea",
    "totalTransactions"
  );
  const totalTransactionsDataTrends = createChartDataMapping(
    totalTransactionsData.data.trend || [],
    "stackedArea",
    "totalTransactionsTrends"
  );

  return (
            <>  {totalTransactionsData.loading &&
        <div className="chart_container">
          <div style={{ display: "block", margin: "auto" }}>
            <GridLoader color="#366bd6"/>
          </div>
          <div style={{ display: "block", margin: "auto" }}>
            <GridLoader color="#366bd6"/>
          </div>
        </div>
                }
                {!totalTransactionsData.loading && !_.isEmpty(totalTransactionsData.data) && (checkData) &&
          <div className="chart_container" style={{ pageBreakAfter: "always" }}>
            {activeChartView.isMetricsChart && (
              <ChartView
                data={totalTransactionsDataMatrics}
                title={"Total Transactions"}
                yAxisTitle={"Transactions"}
                xAxisDateFormat={totalTransactionsDataMatrics[0].xValueFormatString}
                isVisible={true}
                showTotal={false}
                minimum={0}
              />
            )}
            {activeChartView.isTrendsChart && (
              <ChartViewTrend
                data={totalTransactionsDataTrends}
                title={"Total Transactions with Trend"}
                yAxisTitle={"Transactions"}
                isVisible={activeChartView.isTrendsChart}
                xAxisDateFormat="MMM YYYY"
                showTotal={false}
                minimum={0}
              />
            )}
          </div>
                }

                {!totalTransactionsData.loading && (checkData === false)  && activeChartView.isMetricsChart && activeChartView.isTrendsChart &&
          <div className="chart_container">
            <div className="chat_main1"> {/* noDataStyle  */}
              <div style={{textAlign:'center'}}>
                <h4>Total Transactions</h4>
                <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for Total Transactions."/>
              </div>
            </div>
            <div className="chat_main1"> {/* noDataStyle  */}
              <div style={{textAlign:'center'}}>
                <h4>Total Transactions</h4>
                <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for Total Transactions."/>
              </div>
            </div>
          </div>
                }

                {!totalTransactionsData.loading && (checkData === false)  && activeChartView.isMetricsChart && (activeChartView.isTrendsChart === false) &&
          <div className="chart_container">
              <div className="chat_main1"> {/* noDataStyle  */}
              <div style={{textAlign:'center'}}>
                <h4>Total Transactions</h4>
                <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for Total Transactions."/>
              </div>
            </div>
          </div>
                }
                 {!totalTransactionsData.loading && (checkData === false)  && (activeChartView.isMetricsChart === false) && (activeChartView.isTrendsChart) &&
          <div className="chart_container">
            <div className="chat_main1"> {/* noDataStyle  */}
              <div style={{textAlign:'center'}}>
                <h4>Total Transactions</h4>
                <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for Total Transactions."/>
              </div>
            </div>
          </div>
                }
    </>
    )
}

export default (TotalTransactionsReport);