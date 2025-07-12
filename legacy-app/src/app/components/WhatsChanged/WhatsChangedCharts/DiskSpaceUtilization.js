import React, { useEffect, useState, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAsyncDiskSpaceUtilizationWC,
  getDiskSpaceDataWC,
} from "../../../../store/slices/charts/diskChartsSlice";
import CanvasJSReact from "../../../../scripts/canvasjs.stock.react";
import WhatsChangedGeneralChartView from "../WhatsChangedChartMainPages/WhatsChangedGeneralChartView";
import useQueryData from "../../../../hooks/useQueryDataWhatsChanged";
import { createChartDataMapping } from "../../../../helpers/commonHelper";
import ContentLoader from "react-content-loader";
import * as _ from "lodash";
import GridLoader from "react-spinners/GridLoader";

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;

const DiskSpaceUtlization = () => {
  const dispatch = useDispatch();
  const diskSpaceUtilization = useSelector(getDiskSpaceDataWC);
  const activeChartView = useSelector((state) => state.charts.activeChartView);
  const qd = useQueryData();
  useEffect(() => {
    dispatch(fetchAsyncDiskSpaceUtilizationWC(qd));
  }, [dispatch]);

  const DiskSpceUtilization = createChartDataMapping(
    diskSpaceUtilization.data.data || [],
    "column",
    "diskSpaceUtilization"
  );
  const CPUTrendsData = createChartDataMapping(
    diskSpaceUtilization.data.data || [],
    "column",
    "diskSpaceUtilizationTrends"
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
              <WhatsChangedGeneralChartView
                key={"diskspaceutilization"}
                data={DiskSpceUtilization}
                title={"Disk Space Utilization"}
                yAxisTitle={"Utilization"}
                isVisible={activeChartView.isMetricsChart}
                maximum={10}
                minimum={0}
                showTotal={false}
              />
            )}
          </div>
        )}
    </>
  );
};

export default DiskSpaceUtlization;
