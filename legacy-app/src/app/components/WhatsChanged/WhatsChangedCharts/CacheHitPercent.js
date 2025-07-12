import React, { useEffect, useState, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAsyncCacheHitPercWC,
  getDiskCacheHitDataWC,
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

const CacheHitPercent = () => {
  const dispatch = useDispatch();
  const cacheHitPercentage = useSelector(getDiskCacheHitDataWC);
  const activeChartView = useSelector((state) => state.charts.activeChartView);
  const qd = useQueryData();
  useEffect(() => {
    dispatch(fetchAsyncCacheHitPercWC(qd));
  }, [dispatch]);

  const CacheHitPercentage = createChartDataMapping(
    cacheHitPercentage.data.data || [],
    "stackedColumn",
    "cacheHitPercentage"
  );
  const DiskArmUtilizationsTrends = createChartDataMapping(
    cacheHitPercentage.data.trend || [],
    "stackedColumn",
    "cacheHitPercentageTrends"
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
            <WhatsChangedGeneralChartView
              key={"diskarm"}
              data={CacheHitPercentage}
              title={"Cache Hit Percentage"}
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

export default CacheHitPercent;
