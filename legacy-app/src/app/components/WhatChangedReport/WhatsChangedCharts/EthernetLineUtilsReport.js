import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createChartDataMapping } from "../../../../helpers/commonHelper";
import * as _ from "lodash";
import { fetchAsyncEthernetUtilizationReports, getEthernetLineDataReports } from "../../../../store/slices/reports/DataReportCharts/otherReportChartsSlice";
import WhatsChangedGeneralChartViewReport from "../WhatsChangedChartMainPages/WhatsChangedGeneralChartViewReport";
import GridLoader from "react-spinners/GridLoader";

const EthernetLineUtilsReport = ({reportId,queryReportData}) => {
  const dispatch = useDispatch();
  const ethernetline = useSelector(getEthernetLineDataReports);
  const activeChartView = useSelector((state) => state.charts.activeChartView);
  useEffect(() => {
    dispatch(fetchAsyncEthernetUtilizationReports(reportId));
  }, [dispatch]);

  const EthernetLineUtil = createChartDataMapping(
    ethernetline.data.data || [],
    "stackedColumn",
    "ethernetLineUtilization"
  );

  return (
    <>
      {" "}
      {ethernetline.loading && (
        <div className="chart_container">
          <div style={{ display: "block", margin: "auto" }}>
            <GridLoader color="#366bd6"/>
          </div>
          <div style={{ display: "block", margin: "auto" }}>
            <GridLoader color="#366bd6"/>
          </div>
        </div>
      )}
      {!ethernetline.loading && !_.isEmpty(ethernetline.data) && (
        <div className="chart_container">
          {activeChartView.isMetricsChart && (
            <WhatsChangedGeneralChartViewReport
              key={"ethernetlineutil"}
              data={EthernetLineUtil}
              title={"Ethernet Line Util"}
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

export default EthernetLineUtilsReport;
