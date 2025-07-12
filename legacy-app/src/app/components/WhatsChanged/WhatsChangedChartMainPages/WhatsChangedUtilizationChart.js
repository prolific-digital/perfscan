import React, { useRef } from 'react';
import CanvasJSReact from '../../../../scripts/canvasjs.stock.react';
import { setSliderData } from '../../../../store/slices/TimeLine/TimeLineSlice';
import { useDispatch } from 'react-redux';
import { saveParametersIntoLocalStorage } from "../../../../helpers/commonHelper";

var CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;

function WhatsChangedGeneralChartView(props) {
  var chartRef = useRef();
  var dispatch = useDispatch();

  const { theme, isVisible } = props;

  const options = {
    theme: theme || "light2",
    animationEnabled: true,
    height: props.height,
    charts: [{
      toolTip: {
        shared: true
      },
      title: {
        text: "CPU Utilization"
      },
      axisX: {
        crosshair: {
          enabled: true,
          snapToDataPoint: true,
        }
      },
      axisY: {
        title: "Utilization",
        minimum:0,
      },
      data: [{
        showInLegend: true,
        name: props.cpudata[0].name,
        yValueFormatString: props.cpudata[0].yValueFormatString, //  #,##0
        color: props.cpudata[0].color,
        xValueType: props.cpudata[0].xValueType,
        dataPoints: props.cpudata[0].dataPoints
      }, {
        showInLegend: true,
        name: props.cpudata[1].name,
        yValueFormatString: props.cpudata[1].yValueFormatString, //  #,##0
        color: props.cpudata[1].color,
        xValueType: props.cpudata[1].xValueType,
        dataPoints: props.cpudata[1].dataPoints
      }, {
        showInLegend: true,
        name: props.cpudata[2].name,
        yValueFormatString: props.cpudata[2].yValueFormatString, //  #,##0
        color: props.cpudata[2].color,
        xValueType: props.cpudata[2].xValueType,
        dataPoints: props.cpudata[2].dataPoints
      }]
    },
    {
      title: {
        text: "CPU ms"
      },
      toolTip: {
        shared: true
      },
      axisX: {
        crosshair: {
          enabled: true,
          snapToDataPoint: true
        }
      },
      axisY: {
        title: "ms",
        minimum:0,
      },
      data: [{
        showInLegend: true,
        name: props.cpumsdata[0].name,
        yValueFormatString: props.cpumsdata[0].yValueFormatString, //  #,##0
        color: props.cpumsdata[0].color,
        xValueType: "dateTime",
        dataPoints: props.cpumsdata[0].dataPoints
      }]
    },
    {
      title: {
        text: "Number of Cores"
      },
      toolTip: {
        shared: true
      },
      axisX: {
        crosshair: {
          enabled: true,
          snapToDataPoint: true
        }
      },
      axisY: {
        title: "cores",
        minimum:0,
      },
      data: [{
        showInLegend: true,
        name: props.numcoresdata[0].name,
        yValueFormatString: props.numcoresdata[0].yValueFormatString, //  #,##0
        color: props.numcoresdata[0].color,
        xValueType: "dateTime",
        dataPoints: props.numcoresdata[0].dataPoints
      }]
    },
    // {
    //   toolTip: {
    //     shared: true
    //   },
    //   title: {
    //     text: "CPW Utilization"
    //   },
    //   axisX: {
    //     crosshair: {
    //       enabled: true,
    //       snapToDataPoint: true,
    //     }
    //   },
    //   axisY: {
    //     title: "Utilization",
    //     minimum:0,
    //   },
    //   data: [{
    //     showInLegend: true,
    //     name: props.cpwdata[0].name,
    //     yValueFormatString: props.cpwdata[0].yValueFormatString, //  #,##0
    //     color: props.cpwdata[0].color,
    //     xValueType: props.cpwdata[0].xValueType,
    //     dataPoints: props.cpwdata[0].dataPoints
    //   }, {
    //     showInLegend: true,
    //     name: props.cpwdata[1].name,
    //     yValueFormatString: props.cpwdata[1].yValueFormatString, //  #,##0
    //     color: props.cpwdata[1].color,
    //     xValueType: props.cpwdata[1].xValueType,
    //     dataPoints: props.cpwdata[1].dataPoints
    //   }, {
    //     showInLegend: true,
    //     name: props.cpwdata[2].name,
    //     yValueFormatString: props.cpwdata[2].yValueFormatString, //  #,##0
    //     color: props.cpwdata[2].color,
    //     xValueType: props.cpwdata[2].xValueType,
    //     dataPoints: props.cpwdata[2].dataPoints
    //   }]
    // },
    {
      title: {
        text: "Disk Space Utilization"
      },

      toolTip: {
        shared: true
      },
      axisX: {
        crosshair: {
          enabled: true,
          snapToDataPoint: true
        }
      },
      axisY: {
        title: "Utilization",
        minimum:0,
      },
      data: [{
        showInLegend: true,
        name: props.diskspacedata[0].name,
        yValueFormatString: props.diskspacedata[0].yValueFormatString, //  #,##0
        color: props.diskspacedata[0].color,
        xValueType: "dateTime",
        dataPoints: props.diskspacedata[0].dataPoints
      }]
    },
    {
      title: {
        text: "Disk Arm Utilization"
      },

      toolTip: {
        shared: true
      },
      axisX: {
        crosshair: {
          enabled: true,
          snapToDataPoint: true
        }
      },
      axisY: {
        title: "Utilization",
        minimum:0,
      },
      data: [{
        showInLegend: true,
        name: props.diskarmdata[0].name,
        yValueFormatString: props.diskarmdata[0].yValueFormatString, //  #,##0
        color: props.diskarmdata[0].color,
        xValueType: "dateTime",
        dataPoints: props.diskarmdata[0].dataPoints
      }]
    }, {
      title: {
        text: "Disk Response Time"
      },
      toolTip: {
        shared: true
      },
      axisX: {
        crosshair: {
          enabled: true,
          snapToDataPoint: true
        }
      },
      axisY: {
        title: "ms",
        minimum:0,
      },
      data: [{
        showInLegend: true,
        name: props.diskresponsedata[0].name,
        yValueFormatString: props.diskresponsedata[0].yValueFormatString, //  #,##0
        color: props.diskresponsedata[0].color,
        xValueType: "dateTime",
        dataPoints: props.diskresponsedata[0].dataPoints
      }]
    }, {
      title: {
        text: "Total Disk Operations"
      },
      toolTip: {
        shared: true
      },
      axisX: {
        crosshair: {
          enabled: true,
          snapToDataPoint: true
        }
      },
      axisY: {
        title: "ops/sec",
        minimum:0,
      },
      data: [{
        showInLegend: true,
        name: props.diskoperationsdata[0].name,
        yValueFormatString: props.diskoperationsdata[0].yValueFormatString, //  #,##0
        color: props.diskoperationsdata[0].color,
        xValueType: props.diskoperationsdata[0].xValueType,
        dataPoints: props.diskoperationsdata[0].dataPoints
      }, {
        showInLegend: true,
        name: props.diskoperationsdata[1].name,
        yValueFormatString: props.diskoperationsdata[1].yValueFormatString, //  #,##0
        color: props.diskoperationsdata[1].color,
        xValueType: props.diskoperationsdata[1].xValueType,
        dataPoints: props.diskoperationsdata[1].dataPoints
      }]
    }, {
      title: {
        text: "Read Write Ratio"
      },
      toolTip: {
        shared: true
      },
      axisX: {
        crosshair: {
          enabled: true,
          snapToDataPoint: true
        }
      },
      axisY: {
        title: "Utilization",
        minimum:0,
      },
      data: [{
        showInLegend: true,
        name: props.diskreadwritedata[0].name,
        yValueFormatString: props.diskreadwritedata[0].yValueFormatString, //  #,##0
        color: props.diskreadwritedata[0].color,
        xValueType: props.diskreadwritedata[0].xValueType,
        dataPoints: props.diskreadwritedata[0].dataPoints
      }]
    }, {
      title: {
        text: "Cache Hit %"
      },
      toolTip: {
        shared: true
      },
      axisX: {
        crosshair: {
          enabled: true,
          snapToDataPoint: true
        }
      },
      axisY: {
        title: "Utilization",
        minimum:0,
      },
      data: [{
        showInLegend: true,
        name: props.diskcachehitdata[0].name,
        yValueFormatString: props.diskcachehitdata[0].yValueFormatString, //  #,##0
        color: props.diskcachehitdata[0].color,
        xValueType: props.diskcachehitdata[0].xValueType,
        dataPoints: props.diskcachehitdata[0].dataPoints
      }]
    }, {
      title: {
        text: "Machine Pool Faulting Rate"
      },
      toolTip: {
        shared: true
      },
      axisX: {
        crosshair: {
          enabled: true,
          snapToDataPoint: true
        }
      },
      axisY: {
        title: "Faults / Sec",
        minimum:0,
      },
      data: [{
        showInLegend: true,
        name: props.machinpoolfaultingdata[0].name,
        yValueFormatString: props.machinpoolfaultingdata[0].yValueFormatString, //  #,##0
        color: props.machinpoolfaultingdata[0].color,
        xValueType: props.machinpoolfaultingdata[0].xValueType,
        dataPoints: props.machinpoolfaultingdata[0].dataPoints
      }]
    }, {
      title: {
        text: "Total Faulting Rate"
      },
      toolTip: {
        shared: true
      },
      axisX: {
        crosshair: {
          enabled: true,
          snapToDataPoint: true
        }
      },
      axisY: {
        title: "Faults / Sec",
        minimum:0,
      },
      data: [{
        showInLegend: true,
        name: props.totalfaultingratedata[0].name,
        yValueFormatString: props.totalfaultingratedata[0].yValueFormatString, //  #,##0
        color: props.totalfaultingratedata[0].color,
        xValueType: props.totalfaultingratedata[0].xValueType,
        dataPoints: props.totalfaultingratedata[0].dataPoints
      }]
    },
    {
      title: {
        text: "Top Pool Faulting Rate"
      },
      toolTip: {
        shared: true
      },
      axisX: {
        crosshair: {
          enabled: true,
          snapToDataPoint: true
        }
      },
      axisY: {
        title: "Faults / Sec",
        minimum:0,
      },
      data: [{
        showInLegend: true,
        name: props.topPoolFaultingData[0]?.name,
        yValueFormatString: props.topPoolFaultingData[0]?.yValueFormatString, //  #,##0
        color: props.topPoolFaultingData[0]?.color,
        xValueType: props.topPoolFaultingData[0]?.xValueType,
        dataPoints: props.topPoolFaultingData[0]?.dataPoints
      },
      {
        showInLegend: true,
        name: props.topPoolFaultingData[1]?.name,
        yValueFormatString: props.topPoolFaultingData[1]?.yValueFormatString, //  #,##0
        color: props.topPoolFaultingData[1]?.color,
        xValueType: props.topPoolFaultingData[1]?.xValueType,
        dataPoints: props.topPoolFaultingData[1]?.dataPoints
      },
      {
        showInLegend: true,
        name: props.topPoolFaultingData[2]?.name,
        yValueFormatString: props.topPoolFaultingData[2]?.yValueFormatString, //  #,##0
        color: props.topPoolFaultingData[2]?.color,
        xValueType: props.topPoolFaultingData[2]?.xValueType,
        dataPoints: props.topPoolFaultingData[2]?.dataPoints
      },
      {
        showInLegend: true,
        name: props.topPoolFaultingData[3]?.name,
        yValueFormatString: props.topPoolFaultingData[3]?.yValueFormatString, //  #,##0
        color: props.topPoolFaultingData[3]?.color,
        xValueType: props.topPoolFaultingData[3]?.xValueType,
        dataPoints: props.topPoolFaultingData[3]?.dataPoints
      }]
    },
    {
      title: {
        text: "5250 Response Time"
      },
      toolTip: {
        shared: true
      },
      axisX: {
        crosshair: {
          enabled: true,
          snapToDataPoint: true
        }
      },
      axisY: {
        title: "Seconds",
        minimum:0,
      },
      data: [{
        showInLegend: true,
        name: props.response5250data[0].name,
        yValueFormatString: props.response5250data[0].yValueFormatString, //  #,##0
        color: props.response5250data[0].color,
        xValueType: props.response5250data[0].xValueType,
        dataPoints: props.response5250data[0].dataPoints
      }]
    }, {
      title: {
        text: "Total Transactions"
      },
      toolTip: {
        shared: true
      },
      axisX: {
        crosshair: {
          enabled: true,
          snapToDataPoint: true
        }
      },
      axisY: {
        title: "Transactions",
        minimum:0,
      },
      data: [{
        showInLegend: true,
        name: props.totaltransactionsdata[0].name,
        yValueFormatString: props.totaltransactionsdata[0].yValueFormatString, //  #,##0
        color: props.totaltransactionsdata[0].color,
        xValueType: props.totaltransactionsdata[0].xValueType,
        dataPoints: props.totaltransactionsdata[0].dataPoints
      }]
    }, {
      title: {
        text: "Ethernet Utilization"
      },
      toolTip: {
        shared: true
      },
      axisX: {
        crosshair: {
          enabled: true,
          snapToDataPoint: true
        }
      },
      axisY: {
        title: "Utilization",
        minimum:0,
      },
      data: [{
        showInLegend: true,
        name: props.ethernetlinedata[0].name,
        yValueFormatString: props.ethernetlinedata[0].yValueFormatString, //  #,##0
        color: props.ethernetlinedata[0].color,
        xValueType: props.ethernetlinedata[0].xValueType,
        dataPoints: props.ethernetlinedata[0].dataPoints
      }]
    }],
    rangeSelector: {
      enabled: false
    },
    navigator: {
      verticalAlign: "bottom",
      height: 100,
      data: [{
        dataPoints: props.numcoresdata[0].dataPoints
      }],
      /*slider: {
        minimum: new Date(props.minDate), //props.minDate
        maximum: new Date(props.maxDate) //props.maxDate
      }*/
    },
    rangeChanging: function (e) {
      let slider = { min: e.minimum, max: e.maximum };
      dispatch(setSliderData(slider));
      saveParametersIntoLocalStorage("slider", slider);
    }
  };
  const containerProps = {
    width: "100%",
    height: "100%",
    margin: "auto",
  };

  return (
    <div className={"chat_main_wc " + (isVisible ? "" : "hide-chart")}>
      <CanvasJSStockChart containerProps={containerProps} options={options}
        onRef={ref => chartRef.current = ref}
      />
    </div>
  );
}

export default WhatsChangedGeneralChartView;