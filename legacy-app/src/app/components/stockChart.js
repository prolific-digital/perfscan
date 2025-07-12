/* App.js */
import React, { Component } from "react";
import CanvasJSReact from '../../scripts/canvasjs.stock.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;
 
 
class MyStockChart extends Component {
  constructor(props) {
    super(props);
    this.state = { dataPoints1: [], dataPoints2: [], dataPoints3: [], isLoaded: false };
  }
 
  componentDidMount() {
    //Reference: https://reactjs.org/docs/faq-ajax.html#example-using-ajax-results-to-set-local-state
    fetch("https://canvasjs.com/data/docs/btcvolume2018.json")
      .then(res => res.json())
      .then(
        (data) => {
          var dps1 = [], dps2 = []
          for (var i = 0; i < data.length; i++) {
            dps1.push({x: new Date(data[i].date), y: Number(data[i].volume_btc_usd)});
            dps2.push({x: new Date(data[i].date), y: Number(data[i].volume_btc_eur)});
          }
          this.setState({
            isLoaded: true,
            dataPoints1: dps1,
            dataPoints2: dps2,
          });
        }
      )
  }
 
  render() {
    const options = {
        theme: "light2",
        animationEnabled: true,
        title:{
          text:"Multi-Series StockChart with Navigator"
        },
        subtitles: [{
          text: "No of Trades: BTC/USD vs BTC/EUR"
        }],
        charts: [{
          axisY: {
            title: "No of Trades"
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
            name: "No of Trades in $",
            yValueFormatString: "#,##0",
            xValueType: "dateTime",
            dataPoints : this.state.dataPoints1
          },{
            showInLegend: true,
            name: "No of Trades in €",
            yValueFormatString: "#,##0",
            dataPoints : this.state.dataPoints2
          }]
        }],
        rangeSelector: {
          enabled: false
        },
        navigator: {
          data: [{
            dataPoints: this.state.dataPoints1
          }],
          slider: {
            minimum: new Date(),
            maximum: new Date()
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