import {useState,useEffect, Fragment} from 'react'
import LineChartDemo, { data } from "./LineChartDemo"
import MyStockChart from './MyStockChart';
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import {getTimelineData} from '../../services/apiService';

function WhatChangedGraphs(props) {
    const [reqDate, setReqDate] = useState(null);
    const [checkState, setCheckState] = useState(false);
    const [applicationCheck, setApplicationCheck] = useState([]);
    const [timeLineData, setTimeLineData] = useState([]);
    const [minDate, setMinDate] = useState('');
    const [maxDate, setMaxDate] = useState('');
    const [nodes, setNodes] = useState([])
    const [checked, setChecked] = useState([]);
    const [expanded, setExpanded] = useState([]);
    useEffect(() => {
        (async () => {
            let dataTimeline = await getTimelineData();
            setTimeLineData(dataTimeline); 
        })();
       let reqdate = getInitialData(6);
       setReqDate(reqdate);
       getCheckBoxFormated();
    }, [])
    
    const [eventData, setEventData] = useState(props.eventInfo);
    const [eventDataArr, setEventDataArr] = useState([]);
    const [versionsSelList, setVersionsSelList] = useState([]);

  const getInitialData = (numOfMonths, date = new Date()) => {
        date.setMonth(date.getMonth() - numOfMonths);
        return date;
  }
let getCheckBoxFormated = () => {
  let eventObjToArr = Object.entries(eventData.data);
  let testDat = eventObjToArr.map((res,index)=> {
    return {
        value: res[0],
        label:res[0],
        children: res[1].map((r,i)=>{
          return {
              value: r.version,
              label:r.version
          }
        })
    }
});
setNodes(testDat)
}
 

  let eventNamesList = ['Application', 'Configuration', 'Hardware', 'OS', 'PTF', 'Other'];

  const handleOnCheckBox = (r) => {
    let val = r.target.value;
    let name = r.target.name;
    let versionsTempList = [...versionsSelList];
    if(r.target.checked){
        versionsTempList.push(name);
        setVersionsSelList(versionsTempList);
    }
    else{
        let tempVar = versionsTempList.filter(removeUncheckedVersion);
        function removeUncheckedVersion(res){
            return (res != name)
        }
        setVersionsSelList(tempVar);
    }
  }

  const handleMainOnCheckBox = (r,arr) => {    
    let res=[];
    if(r.target.checked === true){
        arr[1].map((d,i)=>{
            res[i] = true;
        })
    }
    else{
        arr[1].map((d,i)=>{
            res[i] = false;
        })
    }
    setApplicationCheck(res);
  }

  const handleCheckData = (checked) => {
      let structuredEventsData = [], getCheckedDetails = [],sDates=[],eDates=[];
      let eventObjToArr = Object.entries(eventData.data);
      structuredEventsData = timeLineData ? timeLineData : [];
      setChecked( checked );
      checked.map((res,index)=>{
        timeLineData.data.filter(getReqData);
        function getReqData(r){
            if(r[1] === res){
                getCheckedDetails.push(r);
            }
        }
      })
      getCheckedDetails.map((res,index)=>{
            sDates.push(res[2]);
            eDates.push(res[3]);
      });
      if(sDates.length === 1 && eDates.length === 1){
          setMinDate(sDates[0]);
          setMaxDate(eDates[eDates.length-1]);
      }
      if(sDates.length > 1 && eDates.length > 1){
        let maxNum = eDates.reduce((prev, current) => {
            let prevDate = new Date(prev);
            let currentDate = new Date(current);
            return Math.max(prevDate, currentDate)
          });
          let minNum = sDates.reduce((prev, current) => {
            let prevDate = new Date(prev);
            let currentDate = new Date(current);
            return Math.min(prevDate, currentDate)
          });  
        let maxDateToBe = new Date(maxNum);
        let minDateToBe = new Date(minNum);
      }
  }

  return (
    <div style={{display:"flex", flex:1, flexDirection:"row"}} >
        <div style={{flex:3}}>
            <LineChartDemo eventInfo={props.eventInfo} versionsSelList = {checked} />
            <MyStockChart queryData={props.queryData} minDate={minDate} maxDate={maxDate} />
        </div>
        {/* <div style={{flex:1}} className="table_wrapper">
            {
                eventObjToArr.map((arr,i)=>{
                    return (
                        <>
                            <input
                                className="checkbox-item"
                                type="checkbox"
                                name={arr[0]}
                                value={i}
                                onChange={(e)=>handleMainOnCheckBox(e,arr)}
                            />
                            <label style={{paddingLeft:'4px'}}><b>{arr[0]}</b></label>

                            {arr[1].map((ver,i)=>{
                                return (
                                    <div style={{paddingLeft:"59px"}} > 
                                        <input
                                          className="checkbox-item"
                                          type="checkbox"
                                          name={ver.version}
                                          value={i}
                                          onChange={(e)=>handleOnCheckBox(e)}
                                        //   checked={(applicationCheck[i] != undefined)? applicationCheck[i]:false}
                                        />
                                        <label style={{paddingLeft:'4px'}}>{ver.version}</label>
                                    </div>
                                )
                            })}
                        </>
                    )
                })

            }
        </div> */}


        {/* test */}
        <div style={{flex:1}} className="table_wrapper">
            <div><p><b>Select Events</b></p></div>
            <CheckboxTree
                nodes={nodes}
                checked={checked}
                expanded={expanded}
                onCheck={checked => handleCheckData(checked)}
                onExpand={expanded => setExpanded( expanded )}
            />    
        </div>
    </div>
  )
}
export default WhatChangedGraphs