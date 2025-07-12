import React, { Component } from 'react'
import CanvasJSReact from '../../../scripts/canvasjs.stock.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;

export default class CpuMsChart extends Component {
    constructor(props) {
        super(props);
        this.state = { dataPoints1: [], dataPoints2: [], isLoaded: false, startDate: '', endDate: '', updatedOptions: {} };
        this.setMinimum = this.setMinimum.bind(this);
      }  

      async componentDidMount() {
        const newData = this.props.chartData;
    
        var dps1 = [], dps2 = [], dps3 = [], dps4 = [];
        for (var i = 0; i < newData.data.length; i++) {  
          dps1.push({x: new Date(newData.data[i].event_time), y: +(newData.data[i].totalcpums)});
          dps2.push({x: new Date(newData.data[i].event_time), y: +(newData.data[i].totalcpums)});
        }
    
        this.setState({
          isLoaded: true,
          dataPoints1: dps1,
          dataPoints2: dps2,
          startDate: this.props.minDate,
          endDate: this.props.maxDate,
          updatedOptions:this.options
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
          text:"Total CPU MS Used"
        },
        subtitles: [{
          text: "Along with Trends"
        }],
        charts: [{
          axisY: {
            title: "ms"
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
            name: "ms used",
            yValueFormatString: "#,##0.##", //  #,##0
            color: "#4a47c4",
            xValueType: "dateTime",
            dataPoints : this.state.dataPoints1
          }]
        }],
        rangeSelector: {
          enabled: false
        },
        navigator: {
          data: [{
            dataPoints: this.state.dataPoints2
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
              // Reference: https://reactjs.org/docs/conditional-rendering.html#inline-if-with-logical--operator
              this.state.isLoaded && 
              <CanvasJSStockChart containerProps={containerProps} options = {options}
                onRef={ref => this.chart = ref}
              />   
            }
        </div>
      );
  }
}
