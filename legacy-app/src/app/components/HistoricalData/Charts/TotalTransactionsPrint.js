import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAsyncTotalTransaction, getTotalTransactionsData } from "../../../../store/slices/charts/otherChartsSlice";
import useQueryData from "../../../../hooks/useQueryDataHistorical";
import {
  createChartDataMapping,
} from "../../../../helpers/commonHelper";
import ChartView from "../../common/ChartView";
import ChartViewTrend from "../../common/ChartViewTrend";
import * as _ from 'lodash';
import GridLoader from "react-spinners/GridLoader";

const TotalTransactionsPrint = ({ activeChartView }) => {
  const dispatch = useDispatch();
  const totalTransactionsData = useSelector(getTotalTransactionsData);
  const qd = useQueryData();
  const [checkData, setCheckData] = useState(false); //new

  useEffect(() => {
    dispatch(fetchAsyncTotalTransaction(qd));
  }, [dispatch])

  useEffect(() => {
    if (totalTransactionsData.loading === false && !_.isEmpty(totalTransactionsData.data)) {
      if (totalTransactionsData.data.data.length === 0) {
        setCheckData(false);
      }
      else {
        setCheckData(true)
      }
    }
  }, [totalTransactionsData])

  const totalTransactionsDataMatrics = createChartDataMapping(
    totalTransactionsData.data.data || [],
    "stackedColumn",
    "totalTransactions"
  );
  const totalTransactionsDataTrends = createChartDataMapping(
    totalTransactionsData.data.trend || [],
    "stackedColumn",
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
        <div className="chart_container">
          <table className="table tableAlign printTable">
            <tbody>
              <tr>
                {activeChartView.isMetricsChart && (
                  <ChartView
                    data={totalTransactionsDataMatrics}
                    title={"Total Transactions"}
                    yAxisTitle={"Transactions"}
                    isVisible={true}
                    showTotal={false}
                    minimum={0}
                  />
                )}
              </tr>
              <tr>
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
              </tr>
            </tbody>
          </table>
        </div>
      }

      {!totalTransactionsData.loading && (checkData === false) && activeChartView.isMetricsChart && activeChartView.isTrendsChart &&
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

      {!totalTransactionsData.loading && (checkData === false) && activeChartView.isMetricsChart && (activeChartView.isTrendsChart === false) &&
        <div className="chart_container">
          <div className="chat_main1"> {/* noDataStyle  */}
              <div style={{textAlign:'center'}}>
                <h4>Total Transactions</h4>
                <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for Total Transactions."/>
              </div>
            </div>
        </div>
      }
      {!totalTransactionsData.loading && (checkData === false) && (activeChartView.isMetricsChart === false) && (activeChartView.isTrendsChart) &&
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

export default (TotalTransactionsPrint);