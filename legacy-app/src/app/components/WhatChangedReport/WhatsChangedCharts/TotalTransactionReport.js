import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createChartDataMapping } from "../../../../helpers/commonHelper";
import * as _ from "lodash";
import { fetchAsyncTotalTransactionReports, getTotalTransactionsDataReports } from "../../../../store/slices/reports/DataReportCharts/otherReportChartsSlice";
import WhatsChangedGeneralChartViewReport from "../WhatsChangedChartMainPages/WhatsChangedGeneralChartViewReport";
import GridLoader from "react-spinners/GridLoader";

const TotalTransactionReport = ({reportId,queryReportData}) => {
  const dispatch = useDispatch();
  const totalTransactions = useSelector(getTotalTransactionsDataReports);
  const activeChartView = useSelector((state) => state.charts.activeChartView);
  useEffect(() => {
    dispatch(fetchAsyncTotalTransactionReports(reportId));
  }, [dispatch]);

  const TotalTransaction = createChartDataMapping(
    totalTransactions.data.data || [],
    "stackedColumn",
    "totalTransactions"
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
            <WhatsChangedGeneralChartViewReport
              key={"totaltransaction"}
              data={TotalTransaction}
              title={"Total Transaction"}
              yAxisTitle={"Utilization"}
              isVisible={activeChartView.isMetricsChart}
              maximum={10}
              minimum={0}
              showTotal={false}
              qd={queryReportData}
            />
          )}
        </div>
      )}
    </>
  );
};

export default TotalTransactionReport;
