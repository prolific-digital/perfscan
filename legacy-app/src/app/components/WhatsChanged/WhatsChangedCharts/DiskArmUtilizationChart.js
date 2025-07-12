import React, { useEffect, useState, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAsyncDiskArmUtilization,getDiskArmData } from "../../../../store/slices/charts/diskChartsSlice";
import CanvasJSReact from "../../../../scripts/canvasjs.stock.react";
import WhatsChangedGeneralChartView from "../WhatsChangedChartMainPages/WhatsChangedGeneralChartView";
import useQueryData from '../../../../hooks/useQueryDataWhatsChanged';
import { createChartDataMapping } from "../../../../helpers/commonHelper";
import ContentLoader from "react-content-loader";
import * as _ from 'lodash';
import GridLoader from "react-spinners/GridLoader";

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;

const DiskArmUtilizationChart = () => {
  const dispatch = useDispatch();
    const diskArmData = useSelector(getDiskArmData);
    const activeChartView = useSelector(state => state.charts.activeChartView);
  const qd = useQueryData();
  useEffect(() => {
        dispatch(fetchAsyncDiskArmUtilization(qd));
    }, [dispatch])

  const DiskArmUtilization = createChartDataMapping(
    diskArmData.data.data || [],
    "stackedColumn",
    "diskArmUtilization"
  );
  const DiskArmUtilizationsTrends = createChartDataMapping(
    diskArmData.data.trend || [],
    "stackedColumn",
    "diskArmTrends"
  );

  return (
            <>  {diskArmData.loading &&
        <div className="chart_container">
          <div style={{ display: "block", margin: "auto" }}>
            <GridLoader color="#366bd6"/>
          </div>
          <div style={{ display: "block", margin: "auto" }}>
            <GridLoader color="#366bd6"/>
          </div>
        </div>
                }
                {!diskArmData.loading && !_.isEmpty(diskArmData.data) &&
        <div className="chart_container">
          {activeChartView.isMetricsChart && (
            <WhatsChangedGeneralChartView
              key={"diskarm"}
              data={DiskArmUtilization}
              title={"Disk Arm Utilization"}
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
                }
    </>
    )
}

export default DiskArmUtilizationChart
