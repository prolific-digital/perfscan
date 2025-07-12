import React, { useState, useEffect, useRef } from 'react';
import CanvasJSReact from "../../../scripts/canvasjs.react";
import moment from "moment";
import { separateComma } from '../../../helpers/commonHelper';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function ChartView(props) {
  var chartRef = useRef();
  const { title, title2 ,theme, data, yAxisTitle, axisY2, isVisible, subtitle, showTotal } = props;
  //const dispatch = useDispatch();

  /*useEffect(()=>{
    dispatch(setChartList(chartRef.current));
  });*/

  const legend = {
    cursor: "pointer",
    itemclick: function (e) {
      if (
        typeof e.dataSeries.visible === "undefined" ||
        e.dataSeries.visible
      ) {
        e.dataSeries.visible = false;
      } else {
        e.dataSeries.visible = true;
      }
      e.chart.render();
    },
  };

  const options = {
    theme: theme || "light2",
    interactivityEnabled: false,
    group: "group1",
    animationEnabled: false,
    zoomEnabled: false,
    //rangeChanged: props.syncHandler,
    height:100,
    width :300,
    cursor: "pointer",
    data: data,
  };


  return (
      <CanvasJSChart
        options={options}
        onRef={(ref) => {
          chartRef.current = ref;
        }}
        style={{cursor:'pointer'}}
      />
  );
}

export default ChartView;