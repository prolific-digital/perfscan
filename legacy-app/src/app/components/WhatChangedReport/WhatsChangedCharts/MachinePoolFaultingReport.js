import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createChartDataMapping } from "../../../../helpers/commonHelper";
import * as _ from "lodash";
import { fetchAsyncMachinePoolFaultingReports, getMachinPoolFaultingDataReports } from "../../../../store/slices/reports/DataReportCharts/memoryReportChartsSlice";
import WhatsChangedGeneralChartViewReport from "../WhatsChangedChartMainPages/WhatsChangedGeneralChartViewReport";
import GridLoader from "react-spinners/GridLoader";

const MachinePoolFaultingReport = ({reportId,queryReportData}) => {
  const dispatch = useDispatch();
  const machinePoolFaulting = useSelector(getMachinPoolFaultingDataReports);
  const activeChartView = useSelector((state) => state.charts.activeChartView);
  useEffect(() => {
    dispatch(fetchAsyncMachinePoolFaultingReports(reportId));
  }, [dispatch]);

  const MachinePool = createChartDataMapping(
    machinePoolFaulting.data.data || [],
    "stackedColumn",
    "machinePoolFaulting"
  );

  return (
    <>
      {" "}
      {machinePoolFaulting.loading && (
        <div className="chart_container">
          <div style={{ display: "block", margin: "auto" }}>
            <GridLoader color="#366bd6"/>
          </div>
          <div style={{ display: "block", margin: "auto" }}>
            <GridLoader color="#366bd6"/>
          </div>
        </div>
      )}
      {!machinePoolFaulting.loading && !_.isEmpty(machinePoolFaulting.data) && (
        <div className="chart_container">
          {activeChartView.isMetricsChart && (
            <WhatsChangedGeneralChartViewReport
              key={"machinepoolfaulting"}
              data={MachinePool}
              title={"Machine Pool Faulting Rate"}
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

export default MachinePoolFaultingReport;
