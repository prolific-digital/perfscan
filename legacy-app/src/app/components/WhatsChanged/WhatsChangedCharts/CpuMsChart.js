import React, { useEffect, useState, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAsyncWhatsChangedCPUMS,getWhatChangedCPUMsData } from "../../../../store/slices/charts/cpuChartsSlice";
import CanvasJSReact from "../../../../scripts/canvasjs.stock.react";
import WhatsChangedGeneralChartView from "../WhatsChangedChartMainPages/WhatsChangedGeneralChartView";
import useQueryData from '../../../../hooks/useQueryDataWhatsChanged';
import { createChartDataMapping } from "../../../../helpers/commonHelper";
import ContentLoader from "react-content-loader";
import * as _ from 'lodash';
import GridLoader from "react-spinners/GridLoader";

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;

const CpuMsChart = () => {
  const dispatch = useDispatch();
  const cpuMsData = useSelector(getWhatChangedCPUMsData);
    const activeChartView = useSelector(state => state.charts.activeChartView);
  const qd = useQueryData();
  useEffect(() => {
    dispatch(fetchAsyncWhatsChangedCPUMS(qd));
    }, [dispatch])

  const CPUMsUtilization = createChartDataMapping(
    cpuMsData.data.data || [],
    "stackedColumn",
    "CPUMsUtilization"
  );
  const CPUMsTrends = createChartDataMapping(
    cpuMsData.data.trend || [],
    "stackedColumn",
    "CPUMsTrends"
  );

  return (
            <>  {cpuMsData.loading &&
        <div className="chart_container">
          <div style={{ display: "block", margin: "auto" }}>
            <GridLoader color="#366bd6"/>
          </div>
          <div style={{ display: "block", margin: "auto" }}>
            <GridLoader color="#366bd6"/>
          </div>
        </div>
                }
                {!cpuMsData.loading && !_.isEmpty(cpuMsData.data) &&
        <div className="chart_container">
          {activeChartView.isMetricsChart && (
            <WhatsChangedGeneralChartView
              key={"cpums"}
              data={CPUMsUtilization}
              title={"CPU ms"}
              yAxisTitle={"ms"}
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

export default CpuMsChart
