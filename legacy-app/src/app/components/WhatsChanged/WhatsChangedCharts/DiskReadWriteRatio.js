import React, { useEffect, useState, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAsyncReadWriteRatioWC,
  getDiskReadWriteDataWC,
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

const DiskReadWriteRatio = () => {
  const dispatch = useDispatch();
  const diskReadWriteRatioData = useSelector(getDiskReadWriteDataWC);
  const activeChartView = useSelector((state) => state.charts.activeChartView);
  const qd = useQueryData();
  useEffect(() => {
    dispatch(fetchAsyncReadWriteRatioWC(qd));
  }, [dispatch]);

  const DiskReadWriteRatio = createChartDataMapping(
    diskReadWriteRatioData.data.data || [],
    "stackedColumn",
    "readWriteRatio"
  );
  const DiskArmUtilizationsTrends = createChartDataMapping(
    diskReadWriteRatioData.data.trend || [],
    "stackedColumn",
    "readWriteRatioTrends"
  );

  return (
    <>
      {" "}
      {diskReadWriteRatioData.loading && (
        <div className="chart_container">
          <div style={{ display: "block", margin: "auto" }}>
            <GridLoader color="#366bd6"/>
          </div>
          <div style={{ display: "block", margin: "auto" }}>
            <GridLoader color="#366bd6"/>
          </div>
        </div>
      )}
      {!diskReadWriteRatioData.loading &&
        !_.isEmpty(diskReadWriteRatioData.data) && (
          <div className="chart_container">
            {activeChartView.isMetricsChart && (
              <WhatsChangedGeneralChartView
                key={"readwriteratio"}
                data={DiskReadWriteRatio}
                title={"Disk Read Write Ratio"}
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

export default DiskReadWriteRatio;
