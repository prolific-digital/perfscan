import React, { useState, useEffect, useRef } from "react";
import CanvasJSReact from "../../../scripts/canvasjs.react";
import moment from "moment";
import { separateComma } from "../../../helpers/commonHelper";

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function ChartViewPoolTrends(props) {
  var chartRef = useRef();
  const {
    poolData,
    title,
    theme,
    stripLineToggle,
    criticalUtilizationValue,
    metricType,
    selectedPool,
  } = props;

  const [peakValue, setPeakValue] = useState(null);

  useEffect(() => {
    if (
      !criticalUtilizationValue?.loading &&
      criticalUtilizationValue?.data?.values.length
    ) {
      setPeakValue(criticalUtilizationValue?.data?.values[0]?.critical);
    }
    return;
  }, [
    metricType,
    criticalUtilizationValue?.loading,
    criticalUtilizationValue?.data?.values,
  ]);

  function toolTipContent(e) {
    var str = "";
    var total = 0;
    var str2;
    for (var i = 0; i < e.entries.length; i++) {
      var str1 =
        '<span style= "color:' +
        e.entries[i].dataSeries.color +
        '"> ' +
        e.entries[i].dataSeries.name +
        "</span>: " +
        e.entries[i].dataPoint.y +
        "</strong><br/>";
      total = e.entries[i].dataPoint.y + total;
      str = str.concat(str1);
    }
    str2 = "<span>" + e.entries[0].dataPoint.dateFormat + "</span><br/>";
    return str2.concat(str);
  }

  function getMaxYValue(chart) {
    var maxYValue = -Infinity;
    for (let i = 0; i < chart[0].dataPoints.length; i++) {
      let totalValue = 0;
      for (let j = 0; j < chart.length; j++) {
        totalValue += chart[j].dataPoints[i].y;
      }
      maxYValue = Math.max(maxYValue, totalValue);
    }
    return maxYValue;
  }

  const options = {
    theme: theme || "light2",
    animationEnabled: true,
    title: {
      text: title,
      fontWeight: "bolder",
      fontColor: "#000",
      fontFamily: "tahoma",
      fontSize: 20,
      padding: 10,
    },
    subtitles: [
      {
        text: props.subtitle || "",
      },
    ],
    axisY: {
      title: "Faults / Sec",
      valueFormatString: "#,##0.##",
      ...(props.maximum && { maximum: props.maximum }),
      ...((props.minimum || props.minimum === 0) && {
        minimum: props.minimum,
      }),
      ...(stripLineToggle &&
        getMaxYValue(poolData) < +peakValue && {
          maximum: +peakValue,
        }),
      ...(stripLineToggle &&
        +peakValue && {
          stripLines: [
            {
              value: +peakValue,
              thickness: 2,
              showOnTop: true,
              color: "#cc2121",
            },
          ],
        }),
    },
    toolTip: {
      shared: true,
      content: toolTipContent,
    },
    data: poolData,
  };

  return (
    <div className={"chat_main"}>
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

export default ChartViewPoolTrends;
