import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createChartDataMapping } from "../../../../helpers/commonHelper";
import * as _ from "lodash";
import { fetchAsyncDiskResponseReports, getDiskResponseDataReports } from "../../../../store/slices/reports/DataReportCharts/diskReportChartsSlice";
import WhatsChangedGeneralChartViewReport from "../WhatsChangedChartMainPages/WhatsChangedGeneralChartViewReport";
import GridLoader from "react-spinners/GridLoader";

const DiskResponseTimeReport = ({reportId,queryReportData}) => {
  const dispatch = useDispatch();
  const diskResponseTime = useSelector(getDiskResponseDataReports);
  const activeChartView = useSelector((state) => state.charts.activeChartView);
  useEffect(() => {
    dispatch(fetchAsyncDiskResponseReports(reportId));
  }, [dispatch]);

  const DiskResponseTime = createChartDataMapping(
    diskResponseTime.data.data || [],
    "stackedColumn",
    "diskResponse"
  );

  return (
    <>
      {" "}
      {diskResponseTime.loading && (
        <div className="chart_container">
          <div style={{ display: "block", margin: "auto" }}>
            <GridLoader color="#366bd6"/>
          </div>
          <div style={{ display: "block", margin: "auto" }}>
            <GridLoader color="#366bd6"/>
          </div>
        </div>
      )}
      {!diskResponseTime.loading && !_.isEmpty(diskResponseTime.data) && (
        <div className="chart_container">
          {activeChartView.isMetricsChart && (
            <WhatsChangedGeneralChartViewReport
              key={"diskresponse"}
              data={DiskResponseTime}
              title={"Disk Response Time"}
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

export default DiskResponseTimeReport;
