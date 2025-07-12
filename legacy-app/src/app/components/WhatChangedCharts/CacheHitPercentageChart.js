import React, { Component } from 'react'
import CanvasJSReact from '../../../scripts/canvasjs.stock.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;

export default class CacheHitPercentageChart extends Component {
    constructor(props) {
        super(props);
        this.state = { dataPoints1: [], dataPoints2: [], isLoaded: false, startDate: '', endDate: '', updatedOptions: {} };
        this.setMinimum = this.setMinimum.bind(this);
      }  

      async componentDidMount() {
        const newData = this.props.chartData;
        var dps1 = [], dps2 = [], dps3 = [], dps4 = [];
        for (var i = 0; i < newData.data.length; i++) {  
          dps1.push({x: new Date(newData.data[i].event_time), y: +(newData.data[i].device_cache_read)});
          dps2.push({x: new Date(newData.data[i].event_time), y: +(newData.data[i].controller_cache_read)});
          dps3.push({x: new Date(newData.data[i].event_time), y: +(newData.data[i].controller_cache_write)});
          dps4.push({x: new Date(newData.data[i].event_time), y: +(newData.data[i].total)});
        }
    
        this.setState({
          isLoaded: true,
          dataPoints1: dps1,
          dataPoints2: dps2,
          dataPoints3: dps3,
          dataPoints4: dps4,
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
        text:"Cache Hit Percentage"
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
          name: "Device Cache Read %",
          yValueFormatString: "#,##0.##", //  #,##0
          color: "##f7ac08",
          xValueType: "dateTime",
          dataPoints : this.state.dataPoints1
        },{
          showInLegend: true,
          name: "Controller Cache Read %",
          yValueFormatString: "#,##0.##", //#,##0
          color: "#199d2c",
          dataPoints : this.state.dataPoints2
        },{
          showInLegend: true,
          name: "Controller Cache Write %",
          yValueFormatString: "#,##0.##", //#,##0
          color: "#e3f606",
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
