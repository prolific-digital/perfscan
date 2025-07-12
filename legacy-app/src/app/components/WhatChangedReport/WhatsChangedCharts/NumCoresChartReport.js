import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createChartDataMapping } from "../../../../helpers/commonHelper";
import * as _ from 'lodash';
import { fetchAsyncNumCoresReports, getNumCoresDataReports } from "../../../../store/slices/reports/DataReportCharts/cpuReportChartsSlice";
import WhatsChangedGeneralChartViewReport from "../WhatsChangedChartMainPages/WhatsChangedGeneralChartViewReport";
import GridLoader from "react-spinners/GridLoader";


const NumCoresChartReport = ({reportId,queryReportData}) => {
  const dispatch = useDispatch();
  const numCoresData = useSelector(getNumCoresDataReports);
    const activeChartView = useSelector(state => state.charts.activeChartView);
  useEffect(() => {
    dispatch(fetchAsyncNumCoresReports(reportId));
    }, [dispatch])

  const NumCoresUtilizationData = createChartDataMapping(
    numCoresData.data.data || [],
    "stackedColumn",
    "noOfCores"
  );

  return (
            <>  {numCoresData.loading &&
        <div className="chart_container">
          <div style={{ display: "block", margin: "auto" }}>
            <GridLoader color="#366bd6"/>
          </div>
          <div style={{ display: "block", margin: "auto" }}>
            <GridLoader color="#366bd6"/>
          </div>
        </div>
                }
                {!numCoresData.loading && !_.isEmpty(numCoresData.data) &&
        <div className="chart_container">
          {activeChartView.isMetricsChart && (
            <WhatsChangedGeneralChartViewReport
              key={"noofcores"}
              data={NumCoresUtilizationData}
              title={"Number of Cores"}
              yAxisTitle={"Cores"}
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

export default NumCoresChartReport
