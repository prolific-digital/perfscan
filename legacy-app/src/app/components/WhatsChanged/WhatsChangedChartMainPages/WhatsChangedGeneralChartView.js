// import React, { useRef } from 'react';
// import CanvasJSReact from '../../../../scripts/canvasjs.stock.react';
// import useQueryData from '../../../../hooks/useQueryDataWhatsChanged';

// var CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;

// function WhatsChangedGeneralChartView(props) {
//   const qd = useQueryData();
//   var chartRef = useRef();
//   const { title, theme, data, isVisible } = props;

//   const options = {
//     theme: theme || "light2",
//     animationEnabled: true,
//     title: {
//       text: title || "Disk Arm Utilization"
//     },
//     subtitles: [{
//       text: ""
//     }],
//     charts: [{
//         axisY: {
//         title: "Utilization"
//         },
//         toolTip: {
//         shared: true
//         },
//         legend: {
//           cursor: "pointer",
//           itemclick: function (e) {
//               if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible)
//               e.dataSeries.visible = false;
//               else
//                 e.dataSeries.visible = true;
//             e.chart.render();
//             }
//           },
//       data: [{
//             showInLegend: true,
//             name: "Utilization",
//             yValueFormatString: "#,##0.##", //  #,##0
//             color: "#800040",
//             xValueType: "dateTime",
//         dataPoints : data[0].dataPoints
//       }]
//     }],
//     rangeSelector: {
//       enabled: false
//     },
//     navigator: {
//       data: [{
//         dataPoints: data[0].dataPoints
//       }],
//       slider: {
//         minimum: new Date(qd.sdate), //props.minDate
//         maximum: new Date(qd.edate) //props.maxDate
//       }
//     }
//   };
//   const containerProps = {
//     width: "100%",
//     height: "250px",
//     margin: "auto"
//   };

//   return (
//     <div className={"chat_main " + (isVisible ? "" : "hide-chart")}>
//         <CanvasJSStockChart containerProps={containerProps} options = {options}
//             onRef={ref => chartRef.current = ref}
//       />
//     </div>
//   );
// }

// export default WhatsChangedGeneralChartView;