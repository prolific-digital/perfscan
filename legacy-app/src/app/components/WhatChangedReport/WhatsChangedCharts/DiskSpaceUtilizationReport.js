import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createChartDataMapping } from "../../../../helpers/commonHelper";
import * as _ from "lodash";
import { fetchAsyncDiskSpaceUtilizationReports, getDiskSpaceDataReports } from "../../../../store/slices/reports/DataReportCharts/diskReportChartsSlice";
import WhatsChangedGeneralChartViewReport from "../WhatsChangedChartMainPages/WhatsChangedGeneralChartViewReport";
import GridLoader from "react-spinners/GridLoader";


const DiskSpaceUtlizationReport = ({reportId,queryReportData}) => {
  const dispatch = useDispatch();
  const diskSpaceUtilization = useSelector(getDiskSpaceDataReports);
  const activeChartView = useSelector((state) => state.charts.activeChartView);
  useEffect(() => {
    dispatch(fetchAsyncDiskSpaceUtilizationReports(reportId));
  }, [dispatch]);

  const DiskSpceUtilization = createChartDataMapping(
    diskSpaceUtilization.data.data || [],
    "column",
    "diskSpaceUtilization"
  );

  return (
    <>
      {" "}
      {diskSpaceUtilization.loading && (
        <div className="chart_container">
          <div style={{ display: "block", margin: "auto" }}>
            <GridLoader color="#366bd6"/>
          </div>
          <div style={{ display: "block", margin: "auto" }}>
            <GridLoader color="#366bd6"/>
          </div>
        </div>
      )}
      {!diskSpaceUtilization.loading &&
        !_.isEmpty(diskSpaceUtilization.data) && (
          <div className="chart_container">
            {activeChartView.isMetricsChart && (
              <WhatsChangedGeneralChartViewReport
                key={"diskspaceutilization"}
                data={DiskSpceUtilization}
                title={"Disk Space Utilization"}
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

export default DiskSpaceUtlizationReport;
