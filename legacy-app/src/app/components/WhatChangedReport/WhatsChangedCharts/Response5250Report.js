import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createChartDataMapping } from "../../../../helpers/commonHelper";
import * as _ from "lodash";
import { fetchAsyncResponse5250Reports, getResponse5250DataReports } from "../../../../store/slices/reports/DataReportCharts/otherReportChartsSlice";
import WhatsChangedGeneralChartViewReport from "../WhatsChangedChartMainPages/WhatsChangedGeneralChartViewReport";
import GridLoader from "react-spinners/GridLoader";

const Response5250Report = ({reportId,queryReportData}) => {
  const dispatch = useDispatch();
  const response5250 = useSelector(getResponse5250DataReports);
  const activeChartView = useSelector((state) => state.charts.activeChartView);
  useEffect(() => {
    dispatch(fetchAsyncResponse5250Reports(reportId));
  }, [dispatch]);

  const Response5250 = createChartDataMapping(
    response5250.data.data || [],
    "stackedColumn",
    "responseTime5250"
  );

  return (
    <>
      {" "}
      {response5250.loading && (
        <div className="chart_container">
          <div style={{ display: "block", margin: "auto" }}>
            <GridLoader color="#366bd6"/>
          </div>
          <div style={{ display: "block", margin: "auto" }}>
            <GridLoader color="#366bd6"/>
          </div>
        </div>
      )}
      {!response5250.loading && !_.isEmpty(response5250.data) && (
        <div className="chart_container">
          {activeChartView.isMetricsChart && (
            <WhatsChangedGeneralChartViewReport
              key={"response5250"}
              data={Response5250}
              title={"Response5250"}
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

export default Response5250Report;
