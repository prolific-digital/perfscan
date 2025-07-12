import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createChartDataMapping } from "../../../../helpers/commonHelper";
import * as _ from "lodash";
import { fetchAsyncDiskOperationsReports, getDiskOperationsDataReports } from "../../../../store/slices/reports/DataReportCharts/diskReportChartsSlice";
import WhatsChangedGeneralChartViewReport from "../WhatsChangedChartMainPages/WhatsChangedGeneralChartViewReport";
import GridLoader from "react-spinners/GridLoader";

const DiskOperationsReport = ({reportId,queryReportData}) => {
  const dispatch = useDispatch();
  const diskOperations = useSelector(getDiskOperationsDataReports);
  const activeChartView = useSelector((state) => state.charts.activeChartView);
  useEffect(() => {
    dispatch(fetchAsyncDiskOperationsReports(reportId));
  }, [dispatch]);

  const DiskOperation = createChartDataMapping(
    diskOperations.data.data || [],
    "stackedColumn",
    "diskOperations"
  );
  
  return (
    <>
      {" "}
      {diskOperations.loading && (
        <div className="chart_container">
          <div style={{ display: "block", margin: "auto" }}>
            <GridLoader color="#366bd6"/>
          </div>
          <div style={{ display: "block", margin: "auto" }}>
            <GridLoader color="#366bd6"/>
          </div>
        </div>
      )}
      {!diskOperations.loading && !_.isEmpty(diskOperations.data) && (
        <div className="chart_container">
          {activeChartView.isMetricsChart && (
            <WhatsChangedGeneralChartViewReport
              key={"diskoperations"}
              data={DiskOperation}
              title={"Disk Operations"}
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

export default DiskOperationsReport;
