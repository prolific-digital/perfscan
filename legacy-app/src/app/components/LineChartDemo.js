import {useEffect,useState} from "react";
import { Chart } from "react-google-charts";
import {getTimelineData} from '../../services/apiService';
import moment from "moment";
//import { Graph } from "react-d3-graph";
/* testing */
let newData = [];
const config = [
  { type: "string", id: "Position" },
  { type: "string", id: "Name" },
  { type: "date", id: "Start" },
  { type: "date", id: "End" },
];
let date_diff_indays = async function(date1, date2) {
  let dt1 = new Date(date1);
  let dt2 = new Date(date2);
  return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));
  }
 const getDatesMethod = async (eventDate) => {
  const curDate = new Date();
  let evtDates = {};
  const diffDays = await date_diff_indays(eventDate,curDate);
  if(diffDays < 15){
    evtDates['sdate']=eventDate;
    evtDates['edate']=curDate;
  }
  if(diffDays > 15){
    let numberOfDaysToAdd = 15;
    let dt1 = new Date(eventDate);
    let dt2 = new Date(eventDate);
    let maxDate = dt1.setDate(dt1.getDate() + numberOfDaysToAdd);
    let minDate = dt2.setDate(dt1.getDate() - numberOfDaysToAdd);
    let sdate = new Date(maxDate);
    let edate = new Date(minDate);
    let properSDate = new Date(sdate.toDateString());
    let properEDate = new Date(edate.toDateString());
    evtDates['sdate']=properSDate;
    evtDates['edate']=properEDate;
  }
  
   return evtDates;   
}
newData.push(config);

/* end */
export const data = [
  [
    { type: "string", id: "Position" },
    { type: "string", id: "Name" },
    { type: "date", id: "Start" },
    { type: "date", id: "End" },
  ],
  ["Application", "v4.1", new Date(1789, 3, 30), new Date(1797, 2, 4)],
  ["OS", "VR42", new Date(1789, 3, 21), new Date(1797, 2, 4)],
  ["Application", "v4.2", new Date(1797, 2, 4), new Date(1801, 2, 4)],
  ["OS", "VR44", new Date(1797, 2, 4), new Date(1801, 2, 4),
  ],
];

// const google = window.google

function LineChartDemo(props) {
  const [eventData, setEventData] = useState(props.eventInfo);
  const [timeLineDetails, setTimeLineDetails] = useState([]);
  useEffect(() => {
    newData = []
    fetchTimelineData();
    // getChartData(props); 
  }, [props.versionsSelList]);

  const options = {
    timeline: {
      groupByRowLabel: true,
    },
  };

  // let dataTable = new google.visualization.DataTable();
   const getDatePoints = (item) => {
      for(let i=1;i<(item.length);++i){
        let dateTime1 = item[i][2]
           ? moment(item[i][2])
           : moment();
           const year = dateTime1.year();
           const month = dateTime1.month();
           const date = dateTime1.date();
           const hours = dateTime1.hours();
           const minutes = dateTime1.minutes();
           item[i][2] = new Date(year, month, date, hours, minutes);
        
        let dateTime2 = item[i][3]
           ? moment(item[i][3])
           : moment();
           const year1 = dateTime2.year();
           const month1 = dateTime2.month();
           const date1 = dateTime2.date();
           const hours1 = dateTime2.hours();
           const minutes1 = dateTime2.minutes();
           item[i][3] = new Date(year1, month1, date1, hours1, minutes1);
      }
      return item;
   }
   

  let fetchTimelineData = async () =>{
    let dataTimeline = await getTimelineData();
    if(dataTimeline.status == 200){
      let filteredDataTimeline = [], tempDataTimeline;
      filteredDataTimeline.push(dataTimeline.data[0]);
      let res = getDatePoints(dataTimeline.data);
      props.versionsSelList.map((d,i)=>{
          tempDataTimeline = res.filter(getFilteredVersionsMethod);
          function getFilteredVersionsMethod (r) {
            if(r[1] == d){
              filteredDataTimeline.push(r);
              return r;
            }
        }
      });
      setTimeLineDetails(filteredDataTimeline);
    }
  }
  
  let eventObjToArr = Object.entries(eventData.data);
 
  let getChartDetails = async(evnt) =>{
    let chartData = [];
    const {sdate,edate} = await getDatesMethod(evnt.event_time);
    chartData.push(evnt.change_type);
    chartData.push(evnt.version);
    chartData.push(sdate);
    chartData.push(edate);
    newData.push(chartData);
  }
  
  const getChartData = (events) => {
    let chartData = [],eventTime='event_time';

    let eventObjToArr = Object.entries(eventData.data);
    let nd = eventObjToArr.map((event,i)=>{ 
            event[1].filter(getChartDetails); 
    })
}

  return <Chart chartType="Timeline" data={timeLineDetails}  width="100%" height="200px" />;
}
export default LineChartDemo
