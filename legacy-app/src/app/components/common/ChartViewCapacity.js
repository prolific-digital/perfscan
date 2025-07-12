import React, { useState, useEffect, useRef } from 'react';
import CanvasJSReact from "../../../scripts/canvasjs.react";
import moment from "moment";
import { separateComma } from '../../../helpers/commonHelper';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function ChartViewCapacity(props) {
  var chartRef = useRef();
  const { title, title2,title3 ,theme, data, yAxisTitle, axisY2, isVisible, subtitle, showTotal, maxCPW, maxGrowthStart } = props;

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
    height:'450',
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
          content += `<span style='color:${color};'>${e.entries[i].dataSeries.name}:</span> ${separateComma(e.entries[i].dataPoint.y)} <br/>`;
        }
        if (e.entries.length > 1 && showTotal) {
          return `${moment(date).format(
            "Do MMMM YYYY, h:mm a"
          )} <br/> Total: ${separateComma(total?.toFixed(2))}<br/> ${content}`;
        } else {
          return `${moment(date).format(
            "Do MMMM YYYY, h:mm a"
          )} <br/> ${content}`;
        }
      },
    },
    title: {
      text: title || "CPW Utilization",
      fontWeight: "bolder",
      fontColor: "#000",
      fontFamily: "tahoma",
      fontSize: 17,
      padding: 10,
    },
    subtitles:[
      {
        text: title3,
        fontWeight: "bolder",
        fontColor: "#000",
        fontFamily: "tahoma",
        fontSize: 17,
        padding: 5,
      },
      {
        text: title2 || "",
        fontWeight: "bolder",
        fontColor: "#000",
        fontFamily: "tahoma",
        fontSize: 17,
        padding: 5,
      },
    ],
    axisX: {
      crosshair: {
        enabled: true
      },
      valueFormatString: props.xAxisDateFormat,
    },
    axisY: {
      //interval: 1500,
      stripLines:[
        {                
          value: maxCPW,                
          color:"#800020",
          label : `Max CPW`,
          labelFontColor: "#a8a8a8",  
          thickness:2,
          labelPlacement:"outside",
          showOnTop : true     
        },
        {                
            startValue:maxCPW > maxGrowthStart ? maxGrowthStart : 0,
            endValue:maxCPW,                
            color: maxCPW > maxGrowthStart ? "#8df299" : "#de8c7a",
            label: maxCPW > maxGrowthStart ? `Potential for Growth` : "Workload Exceeds Max CPW",
            labelFontColor: "#fff",
            labelBackgroundColor:maxGrowthStart <= maxCPW ? "#025205":"#750d05",
            showOnTop : true,
            opacity:0.4
            // labelPlacement:"outside",
        }
      ],  
      title: yAxisTitle || "Utilization",
      valueFormatString: "#,##0.##",
      ...(props.maximum && { maximum: props.maximum }),
      ...((props.minimum || props.minimum === 0) && {
      minimum: props.minimum,
      })
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

export default ChartViewCapacity;