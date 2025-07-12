import React, { useEffect, useState, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAsyncEthernetUtilizationWhatsChanged,
  getEthernetLineDataWC,
} from "../../../../store/slices/charts/otherChartsSlice";
import CanvasJSReact from "../../../../scripts/canvasjs.stock.react";
import WhatsChangedGeneralChartView from "../WhatsChangedChartMainPages/WhatsChangedGeneralChartView";
import useQueryData from "../../../../hooks/useQueryDataWhatsChanged";
import { createChartDataMapping } from "../../../../helpers/commonHelper";
import ContentLoader from "react-content-loader";
import * as _ from "lodash";
import GridLoader from "react-spinners/GridLoader";

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;

const EthernetLineUtils = () => {
  const dispatch = useDispatch();
  const ethernetline = useSelector(getEthernetLineDataWC);
  const activeChartView = useSelector((state) => state.charts.activeChartView);
  const qd = useQueryData();
  useEffect(() => {
    dispatch(fetchAsyncEthernetUtilizationWhatsChanged(qd));
  }, [dispatch]);

  const EthernetLineUtil = createChartDataMapping(
    ethernetline.data.data || [],
    "stackedColumn",
    "ethernetLineUtilization"
  );
  const CPUTrendsData = createChartDataMapping(
    ethernetline.data.data || [],
    "stackedColumn",
    "ethernetLineUtilizationTrends"
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
            <WhatsChangedGeneralChartView
              key={"ethernetlineutil"}
              data={EthernetLineUtil}
              title={"Ethernet Line Util"}
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

export default EthernetLineUtils;
