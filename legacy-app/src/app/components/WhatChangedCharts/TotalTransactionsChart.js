import React, { Component } from 'react'
import CanvasJSReact from '../../../scripts/canvasjs.stock.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;

export default class TotalTransactionsChart extends Component {
    constructor(props) {
        super(props);
        this.state = { dataPoints1: [], isLoaded: false, startDate: '', endDate: '' };
        this.setMinimum = this.setMinimum.bind(this);
      }  

      async componentDidMount() {
        const newData = this.props.chartData;
        var dps1 = [];
        for (var i = 0; i < newData.data.length; i++) {  
          dps1.push({x: new Date(newData.data[i].event_time), y: +(newData.data[i].total_transactions)});
        }
    
        this.setState({
          isLoaded: true,
          dataPoints1: dps1,
          startDate: this.props.minDate,
          endDate: this.props.maxDate,
        });
      }

      componentDidUpdate(prevProps){
        if(this.props.minDate != prevProps.minDate){
          this.setMinimum();
        }
    }
  
     setMinimum() {
      this.chart.navigator.slider.set("minimum", new Date(this.props.minDate));
      this.chart.navigator.slider.set("maximum", new Date(this.props.maxDate));
    }

  render() {
    const options = {
        theme: "light2",
        animationEnabled: true,
        title:{
          text:"Transactions"
        },
        subtitles: [{
          text: ""
        }],
        charts: [{
          axisY: {
            title: "Transactions"
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
            name: "Transactions",
            yValueFormatString: "#,##0.##", //  #,##0
            color: "##cc9900",
            xValueType: "dateTime",
            dataPoints : this.state.dataPoints1
          }
          ]
        }],
        rangeSelector: {
          enabled: false
        },
        navigator: {
          data: [{
            dataPoints: this.state.dataPoints1
          }],
          slider: {
            minimum: new Date(this.props.minDate),
            maximum: new Date(this.props.maxDate) 
          }
        }
    };
      const containerProps = {
        width: "100%",
        height: "450px",
        margin: "auto"
      };
      return (
        <div style={{marginTop:"250px"}}> 
            {
              this.state.isLoaded && 
              <CanvasJSStockChart containerProps={containerProps} options = {options}
                onRef={ref => this.chart = ref}
              />   
            }
        </div>
      );
  }
}
