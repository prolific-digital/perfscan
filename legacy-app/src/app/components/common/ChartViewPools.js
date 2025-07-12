import React, { useState, useEffect, useRef } from "react";
import CanvasJSReact from "../../../scripts/canvasjs.react";
import moment from "moment";
import { separateComma } from "../../../helpers/commonHelper";

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function ChartViewPools(props) {
  var chartRef = useRef();
  const {
    poolData,
    title,
    theme,
    stripLineToggle,
    criticalUtilizationValue,
    metricType,
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
  const dateString = poolData[0]?.event_time;
  // Create a Date object from the string
  const originalDate = new Date(dateString);

  // Subtract 7 minutes
  originalDate.setMinutes(originalDate.getMinutes() - 7);

  const formattedResult = originalDate.toString();

  function getMaxYValue(chart) {
    var maxYValue = -Infinity;
      // Iterate through each data point
      for (let i = 0; i < chart[0].dataPoints.length; i++) {
        let totalValue = 0;
        for(let j=0; j< chart.length ; j++){
          totalValue += chart[j].dataPoints[i].y;
        }
        maxYValue = Math.max(maxYValue, totalValue);
      }
    return maxYValue;
  }

  function toolTipContent(e) {
    var str = "";
    var total = 0;
    var str2, str3;
    for (var i = 0; i < e.entries.length; i++) {
      var str1 =
        '<span style= "color:' +
        e.entries[i].dataSeries.color +
        '"> ' +
        e.entries[i].dataSeries.name +
        "</span>: $<strong>" +
        e.entries[i].dataPoint.y +
        "</strong>bn<br/>";
      total = e.entries[i].dataPoint.y + total;
      str = str.concat(str1);
    }
    str2 =
      '<span style = "color:DodgerBlue;"><strong>' +
      e.entries[0].dataPoint.x.getFullYear() +
      "</strong></span><br/>";
    total = Math.round(total * 100) / 100;
    str3 =
      '<span style = "color:Tomato">Total:</span><strong> $' +
      total +
      "</strong>bn<br/>";
    return str2.concat(str).concat(str3);
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
    axisX: {
      crosshair: {
        enabled: true,
      },
      valueFormatString: props.xAxisDateFormat,
      minimum: moment(formattedResult, "ddd MMM DD YYYY HH:mm:ss ZZ"),
    },
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
        +peakValue &&
         {
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
    },
    data:
      stripLineToggle 
      && +peakValue
        ? [
            ...poolData,
            {
              showInLegend: "true",
              name: "Guidelines",
              legendMarkerType: "square",
              color: "#cc2121",
              type: "line",
              xValueFormatString: "DD MMM YY HH:mm",
              xValueType: "dateTime",
              yValueFormatString: "#,##0.##",
              dataPoints: [{}],
            },
          ]
        : poolData,
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

export default ChartViewPools;
