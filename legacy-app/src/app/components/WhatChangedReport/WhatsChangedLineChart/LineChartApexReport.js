import {useEffect,useState, useRef} from "react";
import ReactApexChart from "react-apexcharts";
import ApexCharts from "apexcharts";
import moment from "moment";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import useQueryData from '../../../../hooks/useQueryDataWhatsChanged';
import {fetchAsyncTimeLine, getTimeLineData, fetchAsyncCategories, getCategories, getSliderData} from '../../../../store/slices/TimeLine/TimeLineSlice'
import { getParametersFromLocalStorage } from "../../../../helpers/commonHelper";

const Button = styled.button`
  background-color: #036ba3;
  font-size:12px;
  color: white;
  padding: 5px 5px;
  border:1px solid;
  border-radius: 5px;
  outline: 0;
  text-transform: uppercase;
  margin-right: 2px;
  cursor: pointer;
  box-shadow: 0px 2px 2px lightgray;
  transition: ease background-color 250ms;
  &:hover {
    background-color: #75c5f0;
  }
  &:focus {
    background-color: #1c4054;
  }
  &:disabled {
    cursor: default;
    opacity: 0.7;
  }
`;

const Text = styled.span`
  font-size:12px;
  color:red;
  margin-left:10px;
`
const LineChartApex = (props) => {
  const[filteredData,setFilteredData] = useState([]);
  let chartData = "";
  const dispatch = useDispatch();
  const dataTimeline = useSelector(getTimeLineData);
  const dataCategories = useSelector(getCategories)
  const sliderData = useSelector(getSliderData);
  const sliderData_s = getParametersFromLocalStorage("slider");
  //const evtChart = useRef();
  const qd = useQueryData();
  const [series, setSeries] = useState([
    {
        "name": "Order Entry",
        "data": [
            {
                "x": "Application",
                "y": [
                    1649548800000,
                    1649808000000
                ]
            }
        ]
    },
    {
        "name": "Order Entry",
        "data": [
            {
                "x": "Application",
                "y": [
                    1649894400000,
                    1651622400000
                ]
            }
        ]
    },
    {
        "name": "Order Entry",
        "data": [
            {
                "x": "Application",
                "y": [
                    1651708800000,
                    1652745600000
                ]
            }
        ]
    },
    {
        "name": "Order Entry",
        "data": [
            {
                "x": "Application",
                "y": [
                    1652832000000,
                    1653091200000
                ]
            }
        ]
    },
    {
        "name": "Order Entry",
        "data": [
            {
                "x": "Application",
                "y": [
                    1653177600000,
                    1661385600000
                ]
            }
        ]
    },
    {
        "name": "IBMi OS Upgrade",
        "data": [
            {
                "x": "OS",
                "y": [
                    1649203200000,
                    1650499200000
                ]
            }
        ]
    },
    {
        "name": "IBMi OS Upgrade",
        "data": [
            {
                "x": "OS",
                "y": [
                    1650585600000,
                    1651622400000
                ]
            }
        ]
    },
    {
        "name": "IBMi OS Upgrade",
        "data": [
            {
                "x": "OS",
                "y": [
                    1651708800000,
                    1652745600000
                ]
            }
        ]
    },
    {
        "name": "IBMi OS Upgrade",
        "data": [
            {
                "x": "OS",
                "y": [
                    1652832000000,
                    1653091200000
                ]
            }
        ]
    },
    {
        "name": "IBMi OS Upgrade",
        "data": [
            {
                "x": "OS",
                "y": [
                    1653177600000,
                    1661385600000
                ]
            }
        ]
    }
]);
  const [timeLineData, setTimeLineData] = useState();
  const [options, setOptions] = useState({
    chart: {
      id: 'evttimeline',
      height: '100%',
      width:'100%',
      type: 'rangeBar',
      toolbar:{show:false}
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: '90%',
        rangeBarGroupRows: true
      }
    },
    colors: [
      "#008FFB", "#00E396", "#FEB019", "#FF4560", "#775DD0",
      "#3F51B5", "#546E7A", "#D4526E", "#8D5B4C", "#F86624",
      "#D7263D", "#1B998B", "#2E294E", "#F46036", "#E2C044"
    ],
    fill: {
      type: 'solid'
    },
    xaxis: {
      type: 'datetime',
      min: new Date(qd.sdate).getTime(),
      max: new Date(qd.edate).getTime()
    },
    legend: {
      show:true,
      position: 'right'
    },
    tooltip: {
      enabled: true
    },selection:'one_year'});

    useEffect(() => {
      dispatch(fetchAsyncTimeLine(qd));
      dispatch(fetchAsyncCategories(qd));
    },[dispatch])

    const toggle = (e) => {
        filteredData.map((item) => { 
          if(item.data[0].x === e.target.value){
            ApexCharts.exec("evttimeline", "toggleSeries", item.name);
          }
        })  
    }
       
    useEffect(() => {
    let min = moment(sliderData_s.min ? sliderData_s.min : qd.sdate).valueOf();
    let max = moment(sliderData_s.max ? sliderData_s.max : qd.edate).valueOf();
    if(series && series.length > 1)
    chartData = series.filter((item) => { 
        return  item.data[0].y[0] >= min &&
                item.data[0].y[1] <= max
    })
    setFilteredData(chartData);
    
    ApexCharts.exec("evttimeline", "updateSeries", filteredData);
    ApexCharts.exec("evttimeline", "updateOptions", {...options, xaxis: {
        type: 'datetime',
        min: min,
        max: max
      }});
    },[sliderData])
    
    useEffect(()=>{
        chartData = JSON.parse(JSON.stringify(dataTimeline.data))
        setSeries(chartData)
        setFilteredData(chartData);
    },[dataTimeline])
    let min = moment(sliderData_s.min ? sliderData_s.min : qd.sdate).valueOf();
    let max = moment(sliderData_s.max ? sliderData_s.max : qd.edate).valueOf();
    return (
    <>
   
    {
        dataCategories?.data.length &&
        dataCategories.data.map((d) => {
 return (
                <Button 
                    key = {d.change_type}
                    value={d.change_type_desc}
                    onClick={toggle}>
                    {d.change_type_desc}
                </Button>
            );
        })
    }
    <Text>Please use slider to sync the timeline</Text>
    {
     !dataTimeline.loading && 
      <ReactApexChart options={options} series={series} type="rangeBar" height={150} width={1392} />
     }
  </>
  )
}

export default LineChartApex


