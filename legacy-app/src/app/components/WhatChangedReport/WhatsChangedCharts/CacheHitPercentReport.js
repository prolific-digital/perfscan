import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useQueryData from "../../../../hooks/useQueryDataWhatsChanged";
import { createChartDataMapping } from "../../../../helpers/commonHelper";
import * as _ from "lodash";
import WhatsChangedGeneralChartViewReport from "../WhatsChangedChartMainPages/WhatsChangedGeneralChartViewReport";
import { fetchAsyncCacheHitPercReports, getDiskCacheHitDataReports } from "../../../../store/slices/reports/DataReportCharts/diskReportChartsSlice";
import GridLoader from "react-spinners/GridLoader";

const CacheHitPercentReport = ({reportId,queryReportData}) => {
  const dispatch = useDispatch();
  const cacheHitPercentage = useSelector(getDiskCacheHitDataReports);
  const activeChartView = useSelector((state) => state.charts.activeChartView);
  useEffect(() => {
    dispatch(fetchAsyncCacheHitPercReports(reportId));
  }, [dispatch]);

  const CacheHitPercentage = createChartDataMapping(
    cacheHitPercentage.data.data || [],
    "stackedColumn",
    "cacheHitPercentage"
  );
  
  return (
    <>
      {" "}
      {cacheHitPercentage.loading && (
        <div className="chart_container">
          <div style={{ display: "block", margin: "auto" }}>
            <GridLoader color="#366bd6"/>
          </div>
          <div style={{ display: "block", margin: "auto" }}>
            <GridLoader color="#366bd6"/>
          </div>
        </div>
      )}
      {!cacheHitPercentage.loading && !_.isEmpty(cacheHitPercentage.data) && (
        <div className="chart_container">
          {activeChartView.isMetricsChart && (
            <WhatsChangedGeneralChartViewReport
              key={"diskarm"}
              data={CacheHitPercentage}
              title={"Cache Hit Percentage"}
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

export default CacheHitPercentReport;
