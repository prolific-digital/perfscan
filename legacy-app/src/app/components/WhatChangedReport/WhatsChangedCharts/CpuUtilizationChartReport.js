import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createChartDataMapping } from "../../../../helpers/commonHelper";
import * as _ from 'lodash';
import { fetchAsyncCPUUtilizationReports, getCPUUtilDataReports } from "../../../../store/slices/reports/DataReportCharts/cpuReportChartsSlice";
import WhatsChangedGeneralChartViewReport from "../WhatsChangedChartMainPages/WhatsChangedGeneralChartViewReport";
import GridLoader from "react-spinners/GridLoader";

const CPUUtilizationChartReport = ({reportId,queryReportData}) => {
  const dispatch = useDispatch();
  const cpuData = useSelector(getCPUUtilDataReports);
    const activeChartView = useSelector(state => state.charts.activeChartView);
  useEffect(() => {
    dispatch(fetchAsyncCPUUtilizationReports(reportId));
    }, [dispatch])

  const CPUUtilizationData = createChartDataMapping(
    cpuData.data.data || [],
    "stackedColumn",
    "cpuUtilization"
  );
  
  return (
            <>  {cpuData.loading &&
        <div className="chart_container">
          <div style={{ display: "block", margin: "auto" }}>
            <GridLoader color="#366bd6"/>
          </div>
          <div style={{ display: "block", margin: "auto" }}>
            <GridLoader color="#366bd6"/>
          </div>
        </div>
                }
                {!cpuData.loading && !_.isEmpty(cpuData.data) &&
        <div className="chart_container">
          {activeChartView.isMetricsChart && (
            <WhatsChangedGeneralChartViewReport
              key={"cpuutilization"}
              data={CPUUtilizationData}
              title={"CPU Utilization"}
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

export default CPUUtilizationChartReport
