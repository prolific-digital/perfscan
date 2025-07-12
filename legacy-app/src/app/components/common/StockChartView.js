import React, { useState, useEffect, useRef } from 'react';
import CanvasJSReact from "../../../scripts/canvasjs.react";
import moment from "moment";


var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function ChartView(props) {
  var chartRef = useRef();
  const { title, theme, data, yAxisTitle, axisY2, isVisible } = props;
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
    group: "group1",
    animationEnabled: true,
    zoomEnabled: true,
    //rangeChanged: props.syncHandler,

    toolTip: {
      shared: true,
      enabled: true,       //disable here
      animationEnabled: true, //disable here
      //updated: this.props.showTooltip,
      //hidden: this.props.hideTooltip,
      contentFormatter: function (e) {
        let content = " ";
        let total = 0;
        let date = "";
        let color = "";
        for (let i = 0; i < e.entries.length; i++) {
          total = total + e.entries[i].dataPoint.y;
          date = e.entries[i].dataPoint.x;
          color = e.entries[i].dataSeries.color;
          content += `<span style='color:${color};'>${e.entries[i].dataSeries.name}:</span> ${e.entries[i].dataPoint.y} <br/>`;
        }
        if (e.entries.length > 1) {
          return `${moment(date).format(
            "Do MMMM YYYY, h:mm a"
          )}<br/> Total: ${total.toFixed(2)}<br/> ${content}`;
        } else {
          return `${moment(date).format(
            "Do MMMM YYYY, h:mm a"
          )}<br/> ${content}`;
        }
      },
    },
    title: {
      text: title || "CPU Utilization",
      fontWeight: "bolder",
      fontColor: "#000",
      fontFamily: "tahoma",
      fontSize: 20,
      padding: 10,
    },
    axisX: {
      crosshair: {
        enabled: true
      },
      valueFormatString: props.xAxisDateFormat,
    },
    axisY: {
      title: yAxisTitle || "Utilization",
      valueFormatString: "#,##0.##",
      ...(props.maximum && { maximum: props.maximum }),
      ...((props.minimum || props.minimum === 0) && {
        minimum: props.minimum,
      }),
    },
    ...(axisY2 && {
      axisY2,
    }),
    legend: legend,
    data: data,
  };

  return (
    <div className={"chat_main " + (isVisible ? "" : "hide-chart")}>
      <CanvasJSChart
        options={options}
        onRef={(ref) => {
          chartRef.current = ref;
        }}
      />
      {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
    </div>
  );
}

export default ChartView;