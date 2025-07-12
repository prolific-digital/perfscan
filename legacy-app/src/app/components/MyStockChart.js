/* App.js */
import React, { Component } from "react";
import CanvasJSReact from '../../scripts/canvasjs.stock.react';
import {getCPUData} from '../../services/apiService'
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;
 
 
class MyStockChart extends Component {
  constructor(props) {
    super(props);
    this.state = { dataPoints1: [], dataPoints2: [], dataPoints3: [], dataPoints4: [], isLoaded: false };
  }
 
 
   async componentDidMount() {
    const response = await getCPUData(this.props.queryData);
    const newData = response.data;

    var dps1 = [], dps2 = [], dps3 = [], dps4 = [];
    for (var i = 0; i < newData.data.length; i++) {  
      dps1.push({x: new Date(newData.data[i].event_time), y: +(newData.data[i].syscpu)});
      dps2.push({x: new Date(newData.data[i].event_time), y: +(newData.data[i].intcpu)});
      dps3.push({x: new Date(newData.data[i].event_time), y: +(newData.data[i].batchcpu)});
      dps4.push({x: new Date(newData.data[i].event_time), y: +(newData.data[i].totalcpu)});
      // dps2.push({x: new Date(data[i].date), y: Number(data[i].volume_btc_eur)});
    }
    this.setState({
      isLoaded: true,
      dataPoints1: dps1,
      dataPoints2: dps2,
      dataPoints3: dps3,
      dataPoints4: dps4,
    });
  }


  
  render() {
    const options = {
        theme: "light2",
        animationEnabled: true,
        title:{
          text:"CPU Utilization"
        },
        subtitles: [{
          text: "Along with Trends"
        }],
        charts: [{
          axisY: {
            title: "Utilization"
          },
          toolTip: {
            shared: true
          },
          legend: {
                cursor: "pointer",
                itemclick: function (e) {
                  if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible)
                    e.dataSeries.visible = false;
                  else
                    e.dataSeries.visible = true;
                  e.chart.render();
                }
            },
          data: [{
            showInLegend: true,
            name: "System",
            yValueFormatString: "#,##0.##", //  #,##0
            xValueType: "dateTime",
            dataPoints : this.state.dataPoints1
          },{
            showInLegend: true,
            name: "Interactive",
            yValueFormatString: "#,##0.##", //#,##0
            dataPoints : this.state.dataPoints2
          },{
            showInLegend: true,
            name: "Batch",
            yValueFormatString: "#,##0.##", //#,##0
            dataPoints : this.state.dataPoints3
          }]
        }],
        rangeSelector: {
          enabled: false
        },
        navigator: {
          data: [{
            dataPoints: this.state.dataPoints4
          }],
          slider: {
            minimum: new Date(this.props.minDate),  //"2022-03-04" `'${this.props.minDate}'`
            maximum: new Date(this.props.maxDate) //"2022-03-08"  `'${this.props.maxDate}'`
          }
        }
    };
    const containerProps = {
      width: "100%",
      height: "450px",
      margin: "auto"
    };
    return (
      <div> 
        <div>
          {
            // Reference: https://reactjs.org/docs/conditional-rendering.html#inline-if-with-logical--operator
            this.state.isLoaded && 
            <CanvasJSStockChart containerProps={containerProps} options = {options}
              /* onRef = {ref => this.chart = ref} */
            />
          }
        </div>
      </div>
    );
  }
}
export default MyStockChart;                              