import React, { useEffect, useState, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAsyncWhatsChangedNumCores,getWhatsChangedNumCoresData } from "../../../../store/slices/charts/cpuChartsSlice";
import CanvasJSReact from "../../../../scripts/canvasjs.stock.react";
import WhatsChangedGeneralChartView from "../WhatsChangedChartMainPages/WhatsChangedGeneralChartView";
import useQueryData from '../../../../hooks/useQueryDataWhatsChanged';
import { createChartDataMapping } from "../../../../helpers/commonHelper";
import ContentLoader from "react-content-loader";
import * as _ from 'lodash';
import GridLoader from "react-spinners/GridLoader";

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;

const NumCoresChart = () => {
  const dispatch = useDispatch();
  const numCoresData = useSelector(getWhatsChangedNumCoresData);
    const activeChartView = useSelector(state => state.charts.activeChartView);
  const qd = useQueryData();
  useEffect(() => {
    dispatch(fetchAsyncWhatsChangedNumCores(qd));
    }, [dispatch])

  const NumCoresUtilizationData = createChartDataMapping(
    numCoresData.data.data || [],
    "stackedColumn",
    "noOfCores"
  );
  const NumCoresTrendsData = createChartDataMapping(
    numCoresData.data.trend || [],
    "stackedColumn",
        "noOfCores"
  );

  return (
            <>  {numCoresData.loading &&
        <div className="chart_container">
          <div style={{ display: "block", margin: "auto" }}>
          <GridLoader color="#366bd6"/>
          </div>
          <div style={{ display: "block", margin: "auto" }}>
          <GridLoader color="#366bd6"/>
          </div>
        </div>
                }
                {!numCoresData.loading && !_.isEmpty(numCoresData.data) &&
        <div className="chart_container">
          {activeChartView.isMetricsChart && (
            <WhatsChangedGeneralChartView
              key={"noofcores"}
              data={NumCoresUtilizationData}
              title={"Number of Cores"}
              yAxisTitle={"Cores"}
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

export default NumCoresChart
