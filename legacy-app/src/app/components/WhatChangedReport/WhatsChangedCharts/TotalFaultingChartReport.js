import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createChartDataMapping } from "../../../../helpers/commonHelper";
import * as _ from "lodash";
import { fetchAsyncTotalFaultingRateReports, getTotalFaultingRateDataReports } from "../../../../store/slices/reports/DataReportCharts/memoryReportChartsSlice";
import WhatsChangedGeneralChartViewReport from "../WhatsChangedChartMainPages/WhatsChangedGeneralChartViewReport";
import GridLoader from "react-spinners/GridLoader";

const TotalFaultingChartReport = ({reportId,queryReportData}) => {
  const dispatch = useDispatch();
  const totalFaultingChartData = useSelector(getTotalFaultingRateDataReports);
  const activeChartView = useSelector((state) => state.charts.activeChartView);
  useEffect(() => {
    dispatch(fetchAsyncTotalFaultingRateReports(reportId));
  }, [dispatch]);

  const TopFaultingChart = createChartDataMapping(
    totalFaultingChartData.data.data || [],
    "stackedColumn",
    "totalFaultingRate"
  );

  return (
    <>
      {" "}
      {totalFaultingChartData.loading && (
        <div className="chart_container">
          <div style={{ display: "block", margin: "auto" }}>
            <GridLoader color="#366bd6"/>
          </div>
          <div style={{ display: "block", margin: "auto" }}>
            <GridLoader color="#366bd6"/>
          </div>
        </div>
      )}
      {!totalFaultingChartData.loading &&
        !_.isEmpty(totalFaultingChartData.data) && (
          <div className="chart_container">
            {activeChartView.isMetricsChart && (
              <WhatsChangedGeneralChartViewReport
                key={"topfaultingchart"}
                data={TopFaultingChart}
                title={"Top Faulting Chart"}
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
      {!totalFaultingChartData.loading &&
        activeChartView.isMetricsChart &&
        activeChartView.isTrendsChart && (
          <div className="chart_container">
            <div className="chat_main1">
              {" "}
              {/* noDataStyle  */}
              No data available for Total Faulting.
            </div>
            <div className="chat_main1">
              {" "}
              {/* noDataStyle  */}
              No data available for Total Faulting.
            </div>
          </div>
        )}
      {!totalFaultingChartData.loading &&
        activeChartView.isMetricsChart &&
        activeChartView.isTrendsChart === false && (
          <div className="chart_container">
            <div className="chat_main1">
              {" "}
              {/* noDataStyle  */}
              No data available for Total Faulting.
            </div>
          </div>
        )}
      {!totalFaultingChartData.loading &&
        activeChartView.isMetricsChart === false &&
        activeChartView.isTrendsChart && (
          <div className="chart_container">
            <div className="chat_main1">
              {" "}
              {/* noDataStyle  */}
              No data available for Total Faulting.
            </div>
          </div>
        )}
    </>
  );
};

export default TotalFaultingChartReport;
