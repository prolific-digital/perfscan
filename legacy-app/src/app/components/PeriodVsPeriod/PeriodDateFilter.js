import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DateRange } from 'react-date-range';
import format  from 'date-fns/format';
import { getFormattedDate,  getParametersFromLocalStorage, saveParametersIntoLocalStorage } from "../../../helpers/commonHelper";
import { periodFilter } from "../../../store/slices/searchFilter";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { getActiveTab } from "../../../store/slices/common/commonSlice";
import * as _ from "lodash";
import moment from "moment";

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { deleteTemporaryReport } from "../../../store/slices/reports/SaveNewReport/SaveNewReport";
import { getUuidData } from "../../../store/slices/reports/SaveNewReport/SaveNewReport";

function PeriodDateFilter({dateTabChange,reportChange, loadingReport}) {
  const lastQueryData = getParametersFromLocalStorage("PeriodFilter");
  const dispatch = useDispatch();
  const uuid = useSelector(getUuidData);

  /* Redux variables */
    let tabTransfer = useSelector(getActiveTab) //data for date tab change
  useEffect(() => {
      setBuildDateActiveTab(tabTransfer)
    },[tabTransfer])

  const [buildDateActiveTab, setBuildDateActiveTab] = useState(10);
  const [selectedSystem, setSelectedSystem] = useState(
      (lastQueryData)? lastQueryData.selectedSystem : {}
  );
  const [range1, setRange1] = useState([
    {
          startDate: lastQueryData && lastQueryData[0]?.sdate ? moment(lastQueryData[0].sdate)._d   : new Date(),
          endDate: lastQueryData &&  lastQueryData[0]?.edate ? moment( lastQueryData[0].edate)._d : new Date(),
          key: 'selection1'
        }
  ]);

  const [range2, setRange2] = useState([
    {
          startDate: lastQueryData && lastQueryData[1]?.sdate ? moment( lastQueryData[1].sdate)._d : new Date(),
          endDate: lastQueryData && lastQueryData[1]?.edate ? moment( lastQueryData[1].edate)._d : new Date(),
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
    let periodQuery = [];
    periodQuery.push(pVsPQuery);
    dispatch(periodFilter(pVsPQuery));
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
    saveParametersIntoLocalStorage("PeriodFilter", {
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

  const periodDateClickHandler = (e, type) => {
    reportChange();
    const val = e;
    let prevDate = JSON.parse(JSON.stringify(pVsPQuery));
    switch (type) {
      case "period1":
            setRange1([val])
            prevDate[0]["sdate"] = getFormattedDate(val.startDate);
            prevDate[0]["edate"] = getFormattedDate(val.endDate);
        break;
      case "period2":
            setRange2([val])
            prevDate[1]["sdate"] = getFormattedDate(val.startDate);
            prevDate[1]["edate"] = getFormattedDate(val.endDate);
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
    let periodQuery = [];
    periodQuery.push(prevDate);
    dispatch(periodFilter(prevDate));
    saveParametersIntoLocalStorage("PeriodFilter", prevDate);
  };

  // hide dropdown on ESC press
  const hideOnEscape1 = (e) => {
    if (e.key === "Escape") {
      setOpen1(false)
    }
    }

  const hideOnEscape2 = (e) => {
    if (e.key === "Escape") {
      setOpen2(false)
    }
    }

  // Hide on outside click
  const hideOnClickOutside1 = (e) => {
    if (refOne.current && !refOne.current.contains(e.target)) {
          setOpen1(false)
        }
    }
  const hideOnClickOutside2 = (e) => {
    if (refTwo.current && !refTwo.current.contains(e.target)) {
          setOpen2(false)
        }
    }

    // useEffect(()=>{
    //   if(!uuid?.loading && uuid?.data?.uniqueid){
    //     dispatch(deleteTemporaryReport({uniqueid:uuid.data.uniqueid}));
    //   }
    // },[dispatch, 
    //   pVsPQuery[0].sdate, pVsPQuery[0].edate, 
    //   pVsPQuery[0].stime, pVsPQuery[0].etime,
    //   pVsPQuery[1].sdate, pVsPQuery[1].edate,
    //   pVsPQuery[1].stime, pVsPQuery[1].etime ])

  return (
    <div className="build_para_card">
      <div className="build_title">{"Date Range"}</div>
      <div className="filter_option">
        <Nav tabs>
          <NavItem>
              <NavLink className={buildDateActiveTab === 10 ? "active" : ""} onClick={() => setBuildDateActiveTab(10)}>
              Period vs. Period Comparisons
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={String(buildDateActiveTab)}>
          <TabPane tabId="10">
            <div className="date_wrapper">
              <div className="form-group">
                <label className="label">Date ( Period 1 )</label>
                <input
                  value={`${format(range1[0].startDate,"MM/dd/yyyy")} to ${format(range1[0].endDate,"MM/dd/yyyy")}`}
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
                <input
                                  value={`${format(range2[0].startDate,"MM/dd/yyyy")} to ${format(range2[0].endDate,"MM/dd/yyyy")}`}
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


export default React.memo(PeriodDateFilter)