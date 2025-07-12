// import React, { useRef } from "react";
// import CanvasJSReact from "../../scripts/canvasjs.stock.react";

// function ChartView(props) {
//   const { theme, data } = props;
//   const chartRef = useRef();

//   const toolTip = {
//     shared: true,
//   };
//   const legend = {
//     cursor: "pointer",
//     itemclick: function (e) {
//       if (typeof e.dataSeries.visible === "undefined" || e.dataSeries.visible) {
//         e.dataSeries.visible = false;
//       } else {
//         e.dataSeries.visible = true;
//       }
//       e.chart.render();
//     },
//   };
//   const options = {
//     theme: theme || "light2",
//     group: "group1",
//     title: {
//       text: "CPU Utilization",
//       fontWeight: "bolder",
//       fontColor: "#00",
//       fontFamily: "tahoma",
//       fontSize: 20,
//       padding: 10,
//     },
//     toolTip: toolTip,
//     axisY: {
//       title: "Utilization",
//       valueFormatString: "#,##0.##",
//     },
//     legend: legend,
//     data,
//   };
//   const CanvasJSChart = CanvasJSReact.CanvasJSChart;

//   return (
//     <div className="chat_main">
//       <CanvasJSChart options={options} ref={chartRef} />
//     </div>
//   );
// }

// export default ChartView;

/* App.js */

import React, { Component } from "react";
import CanvasJSReact from "../../scripts/canvasjs.stock.react";
import moment from "moment";


var CanvasJSChart = CanvasJSReact.CanvasJSChart;
class ChartView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataPoints: [],
    };
  }

  // componentDidMount() {
  //   var chart = this.chart;
  //   fetch("https://canvasjs.com/data/gallery/react/nifty-stock-price.json")
  //     .then(function (response) {
  //       return response.json();
  //     })
  //     .then(function (data) {
  //       for (var i = 0; i < data.length; i++) {
  //         dataPoints.push({
  //           x: new Date(data[i].x),
  //           y: data[i].y,
  //         });
  //       }
  //       chart.render();
  //     });
  // }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.data !== nextState.data) {
      // this.chart.render();
      return true;
    }
    return false;
  }

  render() {
    const { title, theme, data, yAxisTitle, axisY2, isVisible } = this.props;

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
      //rangeChanged: this.props.syncZoomHandler,

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
        valueFormatString: this.props.xAxisDateFormat,
      },
      axisY: {
        title: yAxisTitle || "Utilization",
        valueFormatString: "#,##0.##",
        ...(this.props.maximum && { maximum: this.props.maximum }),
        ...((this.props.minimum || this.props.minimum === 0) && {
          minimum: this.props.minimum,
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
          //onRef={(ref) => this.props.refHandler(ref)}
        />
      </div>
    );
  }
}

export default ChartView;
