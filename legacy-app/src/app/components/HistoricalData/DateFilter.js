import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DateRange } from 'react-date-range';
import format from 'date-fns/format';
import { addDays } from 'date-fns';
import { getFormattedDate,  getParametersFromLocalStorage, saveParametersIntoLocalStorage } from "../../../helpers/commonHelper";
import { dateFilter,periodFilter } from "../../../store/slices/searchFilter";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { getActiveTab } from "../../../store/slices/common/commonSlice";
import * as _ from "lodash";

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const DateFilter = ({dateTabChange,reportChange}) => {
    const lastQueryData = getParametersFromLocalStorage();
    const dispatch = useDispatch();

    /* Redux variables */
    let tabTransfer = useSelector(getActiveTab) //data for date tab change
    const [dateTabSelected, setDateTabSelected] = useState(dateTabChange)
    useEffect(()=>{
      setBuildDateActiveTab(tabTransfer)
    },[tabTransfer])

    const [buildDateActiveTab, setBuildDateActiveTab] = useState(tabTransfer);    
    const [date, setDate] = useState({
        sdate: {
          value:
            lastQueryData && lastQueryData.sdate
              ? lastQueryData.sdate
              : getFormattedDate(),
          isDisabled: false,
        },
        stime: {
          value: lastQueryData && lastQueryData.stime ? lastQueryData.stime : "",
          isDisabled: false,
        },
        edate: {
          value:
            lastQueryData && lastQueryData.edate
              ? lastQueryData.edate
              : getFormattedDate(),
          isDisabled: false,
        },
        etime: {
          value: lastQueryData && lastQueryData.etime ? lastQueryData.etime : "",
          isDisabled: false,
        },
    });
    const [selectedSystem, setSelectedSystem] = useState(
      (lastQueryData)? lastQueryData.selectedSystem : {}
    );
    const [range1, setRange1] = useState([
        {
          startDate: lastQueryData && lastQueryData[0]?.sdate ? new Date( lastQueryData[0].sdate) : getFormattedDate(),
          endDate: lastQueryData && lastQueryData[0]?.edate ? new Date( lastQueryData[0].edate) : getFormattedDate(),
          key: 'selection1'
        }
    ]);
    const [range2, setRange2] = useState([
        {
          startDate: lastQueryData && lastQueryData[1]?.sdate ? new Date( lastQueryData[1].sdate) : getFormattedDate(),
          endDate: lastQueryData && lastQueryData[1]?.edate ? new Date( lastQueryData[1].edate) : getFormattedDate(),
          key: 'selection2'
        }
      ]);
    const [pVsPQuery, setPVsPQuery] = useState([
      {
        sdate:lastQueryData && lastQueryData[0]?.sdate ? lastQueryData[0].sdate : getFormattedDate(),
        edate:lastQueryData && lastQueryData[0]?.edate ? lastQueryData[0].edate : getFormattedDate(),
        stime:lastQueryData && lastQueryData[0]?.stime ? lastQueryData[0].stime : "",
        etime:lastQueryData && lastQueryData[0]?.etime ? lastQueryData[0].etime : ""
      },
      {
        sdate:lastQueryData && lastQueryData[1]?.sdate ? lastQueryData[1].sdate : getFormattedDate(),
        edate:lastQueryData && lastQueryData[1]?.edate ? lastQueryData[1].edate : getFormattedDate(),
        stime:lastQueryData && lastQueryData[1]?.stime ? lastQueryData[1].stime : "",
        etime:lastQueryData && lastQueryData[1]?.etime ? lastQueryData[1].etime : ""
      }
    ]);

    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    

    useEffect(() => {
        dispatch(dateFilter(date));
        let periodQuery =[];
        periodQuery.push(pVsPQuery);
        dispatch(periodFilter(pVsPQuery));
        const queryData = {
          ...(date.sdate.value && { sdate: date.sdate.value }),
          ...(date.edate.value && { edate: date.edate.value }),
          ...(date.stime.value && { stime: date.stime.value }),
          ...(date.etime.value && { etime: date.etime.value }),
          ...(_.isEmpty(selectedSystem) ? { sysid: 0 } : {sysid : selectedSystem.id}),
        };
        // const periodQueryData = [{
        //   (pVsPQuery[0].sdate && sdate: pVsPQuery[0].sdate)
        //     }
        //   ]
        // }
        const periodQueryData = [
          {
              ...(pVsPQuery[0].sdate && { sdate: pVsPQuery[0].sdate }),
              ...(pVsPQuery[0].edate && { edate: pVsPQuery[0].edate }),
              ...(pVsPQuery[0].stime && { stime: pVsPQuery[0].stime }),
              ...(pVsPQuery[0].etime && { etime: pVsPQuery[0].etime }),
           },
           {
              ...(pVsPQuery[1].sdate && { sdate: pVsPQuery[1].sdate }),
              ...(pVsPQuery[1].edate && { edate: pVsPQuery[1].edate }),
              ...(pVsPQuery[1].stime && { stime: pVsPQuery[1].stime }),
              ...(pVsPQuery[1].etime && { etime: pVsPQuery[1].etime }),
           },
  
      ];

        /* put last visited dates cache into local-store */
        saveParametersIntoLocalStorage({
          ...queryData,
          ...periodQueryData,
          selectedSystem: selectedSystem,
        });
        document.addEventListener("keydown", hideOnEscape1, true)
        document.addEventListener("keydown", hideOnEscape2, true)
        document.addEventListener("click", hideOnClickOutside1, true)
        document.addEventListener("click", hideOnClickOutside2, true)
    }, [])
/* All the refs */
  const refOne = useRef(null);
  const refTwo = useRef(null);
/* End of refs */  

    const dateClickHandler = (e, type) => {
        reportChange();
        const val = e.target.value;
        let prevDate = JSON.parse(JSON.stringify(date));
        switch (type) {
          case "sdate":
            prevDate[type]["value"] = val;
            break;
          case "edate":
            prevDate[type]["value"] = val;
            break;
          case "stime":
            prevDate[type]["value"] = val;
            break;
          case "etime":
            prevDate[type]["value"] = val;
            break;
          default:
            break;
        }
        setDate(prevDate);
        dispatch(dateFilter(prevDate));
    };

    const periodDateClickHandler = (e, type) => {
        reportChange();
        const val = e;
        let prevDate = JSON.parse(JSON.stringify(pVsPQuery));
        switch (type) {
          case "period1":
            setRange1([val])
            prevDate[0]["sdate"] = val.startDate;
            prevDate[0]["edate"] = val.endDate;
            break;
          case "period2":
            setRange2([val])
            prevDate[1]["sdate"] = val.startDate;
            prevDate[1]["edate"] = val.endDate;
            break;
          case "stime1":
            prevDate[0]["stime"] = val;
            break;
          case "etime1":
            prevDate[0]["etime"] = val;
            break;
          case "stime2":
            prevDate[1]["stime"] = val;
            break;
          case "etime2":
            prevDate[1]["etime"] = val;
            break;
          default:
            break;
        }
        setPVsPQuery(prevDate);
        let periodQuery =[];
        periodQuery.push(prevDate);
        dispatch(periodFilter(prevDate));
      };

    const predefinedRangeHandler = (e) => {
        reportChange();
        const id = e.target.id;
        let stime = e.target.getAttribute("data-stime");
        let etime = e.target.getAttribute("data-etime");
        if(id === "now"){
            let current = new Date();
            etime = `${current.getHours()}:${current.getMinutes()}`;
            let MS_PER_MINUTE = 60000;
            let myStartDate = new Date(current - 15 * MS_PER_MINUTE);
            let endHour = myStartDate.getHours();
            let endMin = myStartDate.getMinutes();
            if(endMin < 10){
              stime = `${myStartDate.getHours()}:0${myStartDate.getMinutes()}`;
            }
            else{
              stime = `${myStartDate.getHours()}:${myStartDate.getMinutes()}`;
            }
            
        }
        let sdate = null;
        let edate = null;
        if(e.target.getAttribute("data-sdate") && e.target.getAttribute("data-edate")){
           sdate = e.target.getAttribute("data-sdate");
           edate = e.target.getAttribute("data-edate");
        }
        if (stime && etime) {
          let prevDate = JSON.parse(JSON.stringify(date));
            prevDate["stime"]["value"] = stime;
            prevDate["stime"]["isDisabled"] = id === "custom" ? false : true;
            prevDate["etime"]["value"] = etime;
            if (sdate) {
              prevDate["sdate"]["value"] = sdate;
            }
            if (edate) {
              prevDate["edate"]["value"] = edate;
            }
            prevDate["etime"]["isDisabled"] = id === "custom" ? false : true;
           setDate(prevDate);
          dispatch(dateFilter(prevDate));
        }
    };

// hide dropdown on ESC press
  const hideOnEscape1 = (e) => {
    if( e.key === "Escape" ) {
      setOpen1(false)
    }
  }

  const hideOnEscape2 = (e) => {
    if( e.key === "Escape" ) {
      setOpen2(false)
    }
  }

    // Hide on outside click
    const hideOnClickOutside1 = (e) => {
        if( refOne.current && !refOne.current.contains(e.target) ) {
          setOpen1(false)
        }
      }
      const hideOnClickOutside2 = (e) => {
        if( refTwo.current && !refTwo.current.contains(e.target) ) {
          setOpen2(false)
        }
      }

      const handlePeriodTabSelection = () => {
        setBuildDateActiveTab(11);
      }

    return (
        <div className="build_para_card">
            <div className="build_title">{"Date Range"}</div>
            <div className="filter_option">
                <Nav tabs>
                    <NavItem>
                        <NavLink className={buildDateActiveTab === 10 ? "active" : ""} onClick={() => setBuildDateActiveTab(10)}>
                            Normal
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className={buildDateActiveTab === 11 ? "active" : ""} onClick={() => handlePeriodTabSelection()}>
                            Period vs. Period Comparisons
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={String(buildDateActiveTab)}>
                    <TabPane tabId="10">
                        <div className="time_wrapper_with_range">
                            <div className="normal_date_container">
                                <div className="date_wrapper">
                                    <div className="form-group">
                                        <label className="label">Start Date</label>
                                        <input
                                            type="date"
                                            className="form-control "
                                            value={date.sdate.value}
                                            disabled={date.sdate.isDisabled}
                                            onChange={(e) => dateClickHandler(e, "sdate")}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="label">Start Time</label>
                                        <input
                                            type="time"
                                            name="stime"
                                            className="form-control"
                                            value={date.stime.value}
                                            disabled={date.stime.isDisabled}
                                            onChange={(e) => dateClickHandler(e, "stime")}
                                        />
                                    </div>
                                </div>
                                <div className="date_wrapper">
                                    <div className="form-group">
                                        <label className="label">End Date</label>
                                        <input
                                            type="date"
                                            name="edate"
                                            className="form-control "
                                            value={date.edate.value}
                                            disabled={date.edate.isDisabled}
                                            onChange={(e) => dateClickHandler(e, "edate")}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="label">End Time</label>
                                        <input
                                            type="time"
                                            name="etime"
                                            className="form-control"
                                            value={date.etime.value}
                                            disabled={date.etime.isDisabled}
                                            onChange={(e) => dateClickHandler(e, "etime")}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="predefiend_range">
                                <div className="title">Predefined time range</div>
                                <div className="form-group">
                                    <input
                                        type="radio"
                                        id="24hrs"
                                        name="timerange"
                                        data-stime="00:01"
                                        data-etime="23:59"
                                        onChange={(e) => predefinedRangeHandler(e)}
                                    />
                                    <label className="label" htmlFor="24hrs">
                                        Select this for all 24 Hours
                                    </label>
                                </div>

                                <div className="form-group">
                                    <input
                                        type="radio"
                                        id="today"
                                        name="timerange"
                                        data-stime="00:01"
                                        data-sdate={getFormattedDate()}
                                        data-edate={getFormattedDate()}
                                        data-etime="23:59"
                                        onChange={(e) => predefinedRangeHandler(e)}
                                    />
                                    <label className="label" htmlFor="today">
                                        Select this for today
                                    </label>
                                </div>
                                <div className="form-group">
                                    <input
                                        type="radio"
                                        id="now"
                                        name="timerange"
                                        data-stime="08:00"
                                        data-etime="08:10"
                                        onChange={(e) => predefinedRangeHandler(e)}
                                    />
                                    <label className="label" htmlFor="now">
                                        Problem Determination right now
                                    </label>
                                </div>
                                <div className="form-group">
                                    <input
                                        type="radio"
                                        name="timerange"
                                        id="custom"
                                        data-stime="00:01"
                                        data-etime="23:59"
                                        onChange={(e) => predefinedRangeHandler(e)}
                                    />
                                    <label className="label" htmlFor="custom">
                                        Custom date
                                    </label>
                                </div>
                            </div>
                        </div>
                    </TabPane>
                    <TabPane tabId="11">
                        <div className="date_wrapper">
                            <div className="form-group">
                                <label className="label">Date ( Period 1 )</label>
                                {/* <input type="date" className="form-control " /> */}
                                <input value={`${format(range1[0]?.startDate, "MM/dd/yyyy")} to ${format(range1[0]?.endDate, "MM/dd/yyyy")}`}
                                className="form-control"
                                onClick={ () => setOpen1(open1 => !open1) }
                                readOnly                               
                                />
                                <div ref={refOne}>
                                {open1 && 
                                  <DateRange
                                    onChange={item => periodDateClickHandler(item.selection1, "period1")}
                                    editableDateInputs={true}
                                    moveRangeOnFirstSelection={false}
                                    ranges={range1}
                                    months={1}
                                    direction="horizontal"
                                    className="calendarElement"
                                    readOnlyInput
                                  />
                                }
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="label">From Time ( Period 1 )</label>
                                <input type="time"
                                   className="form-control "
                                   value={pVsPQuery[0].stime} 
                                   onChange={item => periodDateClickHandler(item.target.value, "stime1")}
                                />
                            </div>
                            <div className="form-group">
                                <label className="label">To Time ( Period 1 )</label>

                                <input 
                                  type="time"   
                                  className="form-control "
                                  value={pVsPQuery[0].etime}
                                  onChange={item => periodDateClickHandler(item.target.value, "etime1")}
                                />
                            </div>
                        </div>
                        <div className="date_wrapper">
                            <div className="form-group">
                                <label className="label">Date ( Period 2)</label>
                                {/* <input type="date" className="form-control " /> */}
                                <input value={`${format(range2[0].startDate, "MM/dd/yyyy")} to ${format(range2[0].endDate, "MM/dd/yyyy")}`}
                                  className="form-control"
                                  onClick={ () => setOpen2(open2 => !open2) }
                                  readOnly
                                />
                                <div ref={refTwo}>
                                  {open2 && 
                                    <DateRange
                                      onChange={item => periodDateClickHandler(item.selection2, "period2")}
                                      editableDateInputs={true}
                                      moveRangeOnFirstSelection={false}
                                      ranges={range2}
                                      months={1}
                                      direction="horizontal"
                                      className="calendarElement"
                                      readOnlyInput
                                    />
                                  }
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="label">From Time ( Period 2)</label>
                                <input 
                                  type="time" 
                                  className="form-control "
                                  value={pVsPQuery[1].stime} 
                                  onChange={item => periodDateClickHandler(item.target.value, "stime2")}
                                />
                            </div>
                            <div className="form-group">
                                <label className="label">To Time ( Period 2)</label>

                                <input 
                                  type="time" 
                                  className="form-control "
                                  value={pVsPQuery[1].etime} 
                                  onChange={item => periodDateClickHandler(item.target.value, "etime2")}
                                />
                            </div>
                        </div>
                    </TabPane>
                </TabContent>
            </div>
        </div>)}


export default DateFilter;