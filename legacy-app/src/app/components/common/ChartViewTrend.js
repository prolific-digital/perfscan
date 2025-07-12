import React, { useState, useEffect, useRef } from "react";
import CanvasJSReact from "../../../scripts/canvasjs.react";
import moment from "moment";

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function ChartViewTrend(props) {
  var chartRef = useRef();
  const {
    title,
    theme,
    data,
    subtitle,
    yAxisTitle,
    axisY2,
    isVisible,
    title2,
    stripLineToggle,
    criticalUtilizationValue,
    metricType,
    selectedPool,
  } = props;
  //const dispatch = useDispatch();

  /*useEffect(()=>{
    dispatch(setChartList(chartRef.current));
  });*/

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
    criticalUtilizationValue?.loading,
    selectedPool,
    criticalUtilizationValue?.data?.values,
  ]);

  const legend = {
    cursor: "pointer",
    itemclick: function (e) {
      if (
        typeof e?.dataSeries?.visible === "undefined" ||
        e?.dataSeries?.visible
      ) {
        e.dataSeries.visible = false;
      } else {
        e.dataSeries.visible = true;
      }
      e.chart?.render();
    },
  };

  function getMaxYValue(chart) {
    var maxYValue = -Infinity;
    if (
      metricType === "cpu_utilization" ||
      metricType === "cpw" ||
      metricType === "disk_response_time" ||
      metricType === "total_disk_ops"
    ) {
      for (let i = 0; i < chart[0].dataPoints.length; i++) {
        let totalValue = 0;
        for (let j = 0; j < chart.length; j++) {
          totalValue += chart[j].dataPoints[i].y || 0;
        }
        maxYValue = Math.max(maxYValue, totalValue);
      }
    } else {
      // Iterate through each data point
      chart[0]?.dataPoints?.forEach(function (dataPoint) {
        if (dataPoint.y > maxYValue) {
          maxYValue = dataPoint.y;
        }
      });
    }
    return maxYValue;
  }

  const options = {
    theme: theme || "light2",
    group: "group1",
    animationEnabled: true,
    zoomEnabled: true,
    //rangeChanged: props.syncHandler,

    toolTip: {
      shared: true,
      enabled: true, //disable here
      animationEnabled: true, //disable here
      //updated: this.props.showTooltip,
      //hidden: this.props.hideTooltip,
      contentFormatter: function (e) {
        let content = " ";
        let total = 0;
        let date = "";
        let color = "";
        for (let i = 0; i < e.entries.length; i++) {
          // debugger
          total = total + e.entries[i].dataPoint.y;
          date = e?.entries[i]?.dataPoint?.dateFormat;
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
    subtitles: [
      {
        text: subtitle || "",
        fontSize: 15,
      },
    ],
    // axisX: {
    //   crosshair: {
    //     enabled: false,
    //   },
    //   valueFormatString: props.xAxisDateFormat,
    //   minimum: moment(formattedResult, "ddd MMM DD YYYY HH:mm:ss ZZ"),
    // },
    axisY: {
      title: yAxisTitle || "Utilization",
      valueFormatString: "#,##0.##",
      ...(props.maximum && { maximum: props.maximum }),
      ...((props.minimum || props.minimum === 0) && {
        minimum: props.minimum,
      }),
      ...(stripLineToggle &&
        getMaxYValue(data) < +peakValue && {
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
    ...(title2 && {
      axisY2: {
        title: "Memory (GB)",
        valueFormatString: "#,##0.##",
        ...(props.maximum && { maximum: props.maximum }),
        ...((props.minimum || props.minimum === 0) && {
          minimum: props.minimum,
        }),
      },
    }),
    legend: legend,
    data:
      stripLineToggle && +peakValue
        ? [
            ...data,
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
        : data,
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

export default ChartViewTrend;
