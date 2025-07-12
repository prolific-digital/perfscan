import React, { useEffect, useState, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAsyncTotalTransactionWhatsChanged,
  getTotalTransactionsDataWC,
} from "../../../../store/slices/charts/otherChartsSlice";
import CanvasJSReact from "../../../../scripts/canvasjs.stock.react";
import WhatsChangedGeneralChartView from "../WhatsChangedChartMainPages/WhatsChangedGeneralChartView";
import useQueryData from "../../../../hooks/useQueryDataWhatsChanged";
import { createChartDataMapping } from "../../../../helpers/commonHelper";
import ContentLoader from "react-content-loader";
import * as _ from "lodash";
import GridLoader from "react-spinners/GridLoader";


var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;

const TotalTransaction = () => {
  const dispatch = useDispatch();
  const totalTransactions = useSelector(getTotalTransactionsDataWC);
  const activeChartView = useSelector((state) => state.charts.activeChartView);
  const qd = useQueryData();
  useEffect(() => {
    dispatch(fetchAsyncTotalTransactionWhatsChanged(qd));
  }, [dispatch]);

  const TotalTransaction = createChartDataMapping(
    totalTransactions.data.data || [],
    "stackedColumn",
    "totalTransactions"
  );
  const CPUTrendsData = createChartDataMapping(
    totalTransactions.data.data || [],
    "column",
    "diskSpaceUtilizationTrends"
  );

  return (
    <>
      {" "}
      {totalTransactions.loading && (
        <div className="chart_container">
          <div style={{ display: "block", margin: "auto" }}>
            <GridLoader color="#366bd6"/>
          </div>
          <div style={{ display: "block", margin: "auto" }}>
            <GridLoader color="#366bd6"/>
          </div>
        </div>
      )}
      {!totalTransactions.loading && !_.isEmpty(totalTransactions.data) && (
        <div className="chart_container">
          {activeChartView.isMetricsChart && (
            <WhatsChangedGeneralChartView
              key={"totaltransaction"}
              data={TotalTransaction}
              title={"Total Transaction"}
              yAxisTitle={"Utilization"}
              isVisible={activeChartView.isMetricsChart}
              maximum={10}
              minimum={0}
              showTotal={false}
            />
          )}
        </div>
      )}
    </>
  );
};

export default TotalTransaction;
