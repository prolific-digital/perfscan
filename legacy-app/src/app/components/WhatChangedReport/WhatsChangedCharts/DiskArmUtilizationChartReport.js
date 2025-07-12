import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createChartDataMapping } from "../../../../helpers/commonHelper";
import * as _ from 'lodash';
import { fetchAsyncDiskArmUtilizationReports, getDiskArmDataReports } from "../../../../store/slices/reports/DataReportCharts/diskReportChartsSlice";
import WhatsChangedGeneralChartViewReport from "../WhatsChangedChartMainPages/WhatsChangedGeneralChartViewReport";
import GridLoader from "react-spinners/GridLoader";

const DiskArmUtilizationChartReport = ({reportId,queryReportData}) => {
  const dispatch = useDispatch();
    const diskArmData = useSelector(getDiskArmDataReports);
    const activeChartView = useSelector(state => state.charts.activeChartView);
  useEffect(() => {
        dispatch(fetchAsyncDiskArmUtilizationReports(reportId));
    }, [dispatch])

  const DiskArmUtilization = createChartDataMapping(
    diskArmData.data.data || [],
    "stackedColumn",
    "diskArmUtilization"
  );
  
  return (
            <>  {diskArmData.loading &&
        <div className="chart_container">
          <div style={{ display: "block", margin: "auto" }}>
            <GridLoader color="#366bd6"/>
          </div>
          <div style={{ display: "block", margin: "auto" }}>
            <GridLoader color="#366bd6"/>
          </div>
        </div>
                }
                {!diskArmData.loading && !_.isEmpty(diskArmData.data) &&
        <div className="chart_container">
          {activeChartView.isMetricsChart && (
            <WhatsChangedGeneralChartViewReport
              key={"diskarm"}
              data={DiskArmUtilization}
              title={"Disk Arm Utilization"}
              yAxisTitle={"Utilization"}
              isVisible={activeChartView.isMetricsChart}
              maximum={10}
              minimum={0}
              showTotal={false}
              qd={queryReportData}
            />
          )}
        </div>
                }
    </>
    )
}

export default DiskArmUtilizationChartReport
