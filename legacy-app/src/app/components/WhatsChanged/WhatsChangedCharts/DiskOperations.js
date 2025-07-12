import React, { useEffect, useState, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAsyncDiskOperationsWC,
  getDiskOperationsDataWC,
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

const DiskOperations = () => {
  const dispatch = useDispatch();
  const diskOperations = useSelector(getDiskOperationsDataWC);
  const activeChartView = useSelector((state) => state.charts.activeChartView);
  const qd = useQueryData();
  useEffect(() => {
    dispatch(fetchAsyncDiskOperationsWC(qd));
  }, [dispatch]);

  const DiskOperation = createChartDataMapping(
    diskOperations.data.data || [],
    "stackedColumn",
    "diskOperations"
  );
  const DiskArmUtilizationsTrends = createChartDataMapping(
    diskOperations.data.trend || [],
    "stackedColumn",
    "diskOperationsTrends"
  );

  return (
    <>
      {" "}
      {diskOperations.loading && (
        <div className="chart_container">
          <div style={{ display: "block", margin: "auto" }}>
            <GridLoader color="#366bd6"/>
          </div>
          <div style={{ display: "block", margin: "auto" }}>
            <GridLoader color="#366bd6"/>
          </div>
        </div>
      )}
      {!diskOperations.loading && !_.isEmpty(diskOperations.data) && (
        <div className="chart_container">
          {activeChartView.isMetricsChart && (
            <WhatsChangedGeneralChartView
              key={"diskoperations"}
              data={DiskOperation}
              title={"Disk Operations"}
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

export default DiskOperations;
