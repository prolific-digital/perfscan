import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createChartDataMapping } from "../../../../helpers/commonHelper";
import * as _ from "lodash";
import { fetchAsyncReadWriteRatioReports, getDiskReadWriteDataReports } from "../../../../store/slices/reports/DataReportCharts/diskReportChartsSlice";
import WhatsChangedGeneralChartViewReport from "../WhatsChangedChartMainPages/WhatsChangedGeneralChartViewReport";
import GridLoader from "react-spinners/GridLoader";

const DiskReadWriteRatioReport = ({reportId,queryReportData}) => {
  const dispatch = useDispatch();
  const diskReadWriteRatioData = useSelector(getDiskReadWriteDataReports);
  const activeChartView = useSelector((state) => state.charts.activeChartView);
  useEffect(() => {
    dispatch(fetchAsyncReadWriteRatioReports(reportId));
  }, [dispatch]);

  const DiskReadWriteRatio = createChartDataMapping(
    diskReadWriteRatioData.data.data || [],
    "stackedColumn",
    "readWriteRatio"
  );

  return (
    <>
      {" "}
      {diskReadWriteRatioData.loading && (
        <div className="chart_container">
          <div style={{ display: "block", margin: "auto" }}>
            <GridLoader color="#366bd6"/>
          </div>
          <div style={{ display: "block", margin: "auto" }}>
            <GridLoader color="#366bd6"/>
          </div>
        </div>
      )}
      {!diskReadWriteRatioData.loading &&
        !_.isEmpty(diskReadWriteRatioData.data) && (
          <div className="chart_container">
            {activeChartView.isMetricsChart && (
              <WhatsChangedGeneralChartViewReport
                key={"readwriteratio"}
                data={DiskReadWriteRatio}
                title={"Disk Read Write Ratio"}
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

export default DiskReadWriteRatioReport;
