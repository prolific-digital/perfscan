import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createChartDataMapping } from "../../../../helpers/commonHelper";
import * as _ from 'lodash';
import { fetchAsyncCPUMSReports, getCPUMsDataReports } from "../../../../store/slices/reports/DataReportCharts/cpuReportChartsSlice";
import WhatsChangedGeneralChartViewReport from "../WhatsChangedChartMainPages/WhatsChangedGeneralChartViewReport";
import GridLoader from "react-spinners/GridLoader";

const CpuMsChartReport = ({reportId,queryReportData}) => {
  const dispatch = useDispatch();
  const cpuMsData = useSelector(getCPUMsDataReports);
    const activeChartView = useSelector(state => state.charts.activeChartView);
  useEffect(() => {
    dispatch(fetchAsyncCPUMSReports(reportId));
    }, [dispatch])

  const CPUMsUtilization = createChartDataMapping(
    cpuMsData.data.data || [],
    "stackedColumn",
    "CPUMsUtilization"
  );

  return (
            <>  {cpuMsData.loading &&
        <div className="chart_container">
          <div style={{ display: "block", margin: "auto" }}>
            <GridLoader color="#366bd6"/>
          </div>
          <div style={{ display: "block", margin: "auto" }}>
            <GridLoader color="#366bd6"/>
          </div>
        </div>
                }
                {!cpuMsData.loading && !_.isEmpty(cpuMsData.data) &&
        <div className="chart_container">
          {activeChartView.isMetricsChart && (
            <WhatsChangedGeneralChartViewReport
              key={"cpums"}
              data={CPUMsUtilization}
              title={"CPU ms"}
              yAxisTitle={"ms"}
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

export default CpuMsChartReport
