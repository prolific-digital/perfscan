import React, { Component } from "react";
import CanvasJSReact from '../../../scripts/canvasjs.stock.react';
import moment from "moment";
import { Dropdown } from "primereact/dropdown";
import {chart_dropDown_WC,chart_dropDown_name} from '../../../stylesheets/local/component/_common.scss'
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;
 
// chartDataMemoryVsFault

class MemVsFaultChart extends Component {
  constructor(props) {
    super(props);
    this.state = { dataPoints1: [], dataPoints2: [], dataPoints3: [], isLoaded: false, startDate: '', endDate: '', poolNumChange: "All", allMVFPools: null };
        this.setMinimum = this.setMinimum.bind(this);
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

  fetchDataPointsForPoolNumBasedCharts  (data, type) {
    let  result = data.map((item, index) => {
        if(item)
        {
          let dateTime = item.event_time 
            ? moment(item.event_time)
            : moment();
          const year = dateTime.year();
          const month = dateTime.month();
          const date = dateTime.date();
          const hours = dateTime.hours();
          const minutes = dateTime.minutes();
          return {
            x: new Date(year, month, date, hours, minutes),
            y: +item[type],
          };
        }
        else{
          return {
            x : new Date(),
            y: 0
          }
        }
      });
    return result;
  };
 
  async componentDidMount() {
    const newData = this.props.chartData;
    await this.getChartDataMappingForMemoryVSFault("All")
  }

  async getChartDataMappingForMemoryVSFault(indx){
    const newData = this.props.chartData;
    let poolList = [];
      poolList = newData.pools;
      if(poolList[poolList.length-1].value != "All"){
        poolList.push({value:"All",label:"All Pools"});
      }   
      this.setState({
        allMVFPools: poolList
      });
    if(indx == 'All'){
        this.setState({
            poolNumChange: indx
        })
        let originaldata = [];
        let poolNums = [];
        let poolStringValues = poolList;
        for(let i=0;i<poolStringValues.length;++i){
          if(poolStringValues[i].value != "All"){
          poolNums[i] = Number(poolStringValues[i].value);
          }
        }
        for(let i=poolNums[0];i<=poolNums[(poolNums.length-1)];++i){
          originaldata = originaldata.concat(newData.data[i]) 
        }
        
        const data_Faulting = await this.fetchDataPointsForPoolNumBasedCharts(originaldata, "faulting_rate");
        const data_memory_size = await this.fetchDataPointsForPoolNumBasedCharts(originaldata, "memory_size");

        let dps1 = [], dps2 = [], dps3 = [];
    
        for (let i = 0; i < data_Faulting.length; i++) {  
            dps1.push({x: new Date(data_Faulting[i].x), y: +(data_Faulting[i].y)});
            dps3.push({x: new Date(data_Faulting[i].x), y: +(data_Faulting[i].y)});
        }
        for (let i = 0; i < data_memory_size.length; i++) {  
            dps2.push({x: new Date(data_memory_size[i].x), y: +(data_memory_size[i].y)});
        }
        this.setState({
            isLoaded: true,
            dataPoints1: dps1,
            dataPoints2: dps2,
            dataPoints3: dps3
        });
       }
       else{
        this.setState({
            poolNumChange: indx
        });
        let originaldata = newData.data[indx];
        const data_Faulting = await this.fetchDataPointsForPoolNumBasedCharts(originaldata, "faulting_rate");
        const data_memory_size = await this.fetchDataPointsForPoolNumBasedCharts(originaldata, "memory_size");
        let dps1 = [], dps2 = [], dps3 = [];
    
        for (let i = 0; i < data_Faulting.length; i++) {  
            dps1.push({x: new Date(data_Faulting[i].x), y: +(data_Faulting[i].y)});
            dps3.push({x: new Date(data_Faulting[i].x), y: +(data_Faulting[i].y)});
        }
        for (let i = 0; i < data_memory_size.length; i++) {  
            dps2.push({x: new Date(data_memory_size[i].x), y: +(data_memory_size[i].y)});
        }
        this.setState({
            isLoaded: true,
            dataPoints1: dps1,
            dataPoints2: dps2,
            dataPoints3: dps3
        });
      }
  }

 
  render() {
    const options = {
      theme: "light2",
      title:{
        text:"Memory vs Faulting Chart"
      },
      subtitles: [{
        text: "Along with Trends"
      }],
      charts: [{
        axisX: {
          lineThickness: 5,
          tickLength: 0,
        //   labelFormatter: function(e) {
        //     return "";
        //   },
          crosshair: {
            enabled: true,
            snapToDataPoint: true,
            // labelFormatter: function(e) {
            //   return "";
            // }
          }
        },
        axisY: {
          title: " Data Faulting",
        //   prefix: "$",
          tickLength: 0
        },
        toolTip: {
          shared: true
        },
        data: [{
          name: "Faulting",
          yValueFormatString: "#,##0.##" , // "$#,###.##" 
          type: "stackedColumn",
          color: "#b81f0a",
          dataPoints : this.state.dataPoints1
        }]
      },{
        height: 100,
        axisX: {
          crosshair: {
            enabled: true,
            snapToDataPoint: true
          }
        },
        axisY: {
          title: "data memory size",
        //   prefix: "$",
          tickLength: 0
        },
        toolTip: {
          shared: true
        },
        data: [{
          name: "Memory",
          yValueFormatString: "#,##0.##", //  "$#,###.##"
          type: "stepLine",
          color: "#1EB294",
          dataPoints : this.state.dataPoints2
        }]
      }],
      navigator: {
        data: [{
          dataPoints: this.state.dataPoints3
        }],
        slider: {
          minimum: new Date(this.props.minDate),
          maximum: new Date(this.props.maxDate)
        }
      },
      rangeSelector: {
        enabled: false,
      }  
    };
    const containerProps = {
      width: "100%",
      height: "450px",
      margin: "auto"
    };
    return (
    //   <div> 
        <div style={{marginTop:"250px"}}>
          {
            this.state.isLoaded && 
            <>
                <span> 
                  <p>Select Pool Number</p>
                    <Dropdown
                        // style={{index:999}}
                        value={this.state.poolNumChange}
                        options={this.state.allMVFPools}
                        onChange={(e) => this.getChartDataMappingForMemoryVSFault(e.value)}
                        placeholder="Select a Pool Number"
                    />
                </span>   
                <CanvasJSStockChart containerProps={containerProps} options = {options} onRef = {ref => this.chart = ref} 
                />
            
            </>
          }
        </div>
    //   </div>
    );
  }
}
export default MemVsFaultChart;     