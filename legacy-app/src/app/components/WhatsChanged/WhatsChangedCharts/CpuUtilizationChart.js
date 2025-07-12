import React, { useEffect, useState, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAsyncWhatsChangedCPUUtilization,getWhatChangedCPUData } from "../../../../store/slices/charts/cpuChartsSlice";
import CanvasJSReact from "../../../../scripts/canvasjs.stock.react";
import WhatsChangedGeneralChartView from "../WhatsChangedChartMainPages/WhatsChangedGeneralChartView";
import useQueryData from '../../../../hooks/useQueryDataWhatsChanged';
import { createChartDataMapping } from "../../../../helpers/commonHelper";
import ContentLoader from "react-content-loader";
import * as _ from 'lodash';
import GridLoader from "react-spinners/GridLoader";

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;

const CPUUtilizationChart = () => {
  const dispatch = useDispatch();
  const cpuData = useSelector(getWhatChangedCPUData);
    const activeChartView = useSelector(state => state.charts.activeChartView);
  const qd = useQueryData();
  useEffect(() => {
    dispatch(fetchAsyncWhatsChangedCPUUtilization(qd));
    }, [dispatch])

  const CPUUtilizationData = createChartDataMapping(
    cpuData.data.data || [],
    "stackedColumn",
    "cpuUtilization"
  );
  const CPUTrendsData = createChartDataMapping(
    cpuData.data.trend || [],
    "stackedColumn",
    "cpuUtilizationTrends"
  );

  return (
            <>  {cpuData.loading &&
        <div className="chart_container">
          <div style={{ display: "block", margin: "auto" }}>
            <GridLoader color="#366bd6"/>
          </div>
          <div style={{ display: "block", margin: "auto" }}>
            <GridLoader color="#366bd6"/>
          </div>
        </div>
                }
                {!cpuData.loading && !_.isEmpty(cpuData.data) &&
        <div className="chart_container">
          {activeChartView.isMetricsChart && (
            <WhatsChangedGeneralChartView
              key={"cpuutilization"}
              data={CPUUtilizationData}
              title={"CPU Utilization"}
              yAxisTitle={"Utilization"}
              isVisible={activeChartView.isMetricsChart}
              maximum={10}
              minimum={0}
              showTotal={false}
            />
          )}
        </div>
                }
    </>
    )
}

export default CPUUtilizationChart
