import React, { useEffect, useState, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAsyncDiskResponseWC,
  getDiskResponseDataWC,
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

const DiskResponseTime = () => {
  const dispatch = useDispatch();
  const diskResponseTime = useSelector(getDiskResponseDataWC);
  const activeChartView = useSelector((state) => state.charts.activeChartView);
  const qd = useQueryData();
  useEffect(() => {
    dispatch(fetchAsyncDiskResponseWC(qd));
  }, [dispatch]);

  const DiskResponseTime = createChartDataMapping(
    diskResponseTime.data.data || [],
    "stackedColumn",
    "diskResponse"
  );
  const DiskArmUtilizationsTrends = createChartDataMapping(
    diskResponseTime.data.trend || [],
    "stackedColumn",
    "diskResponseTrends"
  );

  return (
    <>
      {" "}
      {diskResponseTime.loading && (
        <div className="chart_container">
          <div style={{ display: "block", margin: "auto" }}>
            <GridLoader color="#366bd6"/>
          </div>
          <div style={{ display: "block", margin: "auto" }}>
            <GridLoader color="#366bd6"/>
          </div>
        </div>
      )}
      {!diskResponseTime.loading && !_.isEmpty(diskResponseTime.data) && (
        <div className="chart_container">
          {activeChartView.isMetricsChart && (
            <WhatsChangedGeneralChartView
              key={"diskresponse"}
              data={DiskResponseTime}
              title={"Disk Response Time"}
              yAxisTitle={"Utilization"}
              //refHandler={(ref) => utilizationChartList.push(ref)}
              //showTooltip={showUtilizationTooltip}
              isVisible={activeChartView.isMetricsChart}
              //hideTooltip={hideUtilizationTooltip}
              //syncZoomHandler={syncUtilizationZoomHandler}
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

export default DiskResponseTime;
