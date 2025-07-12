import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getFormattedDate,getParametersFromLocalStorage,saveParametersIntoLocalStorage } from "../../../../helpers/commonHelper";
import { problemDeterminationDateFilter } from "../../../../store/slices/searchFilter";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { getActiveTab } from "../../../../store/slices/common/commonSlice";
import * as _ from "lodash";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import moment from "moment";
import { deleteTemporaryReport } from "../../../../store/slices/reports/SaveNewReport/SaveNewReport";
import { getUuidData } from "../../../../store/slices/reports/SaveNewReport/SaveNewReport";
import { counterTogglePDTopJobs } from "../../../../store/slices/topJobs/toggleTopJobsButton";

const PDDateFilter = ({dateTabChange,reportChange,loadingReport}) => {
  let historicalFilter = getParametersFromLocalStorage("HistoricalFilter");
  const uuid = useSelector(getUuidData);
  const dispatch = useDispatch();

  /* Redux variables */
    let tabTransfer = useSelector(getActiveTab) //data for date tab change
  useEffect(() => {
      setBuildDateActiveTab(tabTransfer)
    },[tabTransfer])

  const [buildDateActiveTab, setBuildDateActiveTab] = useState(10);
  const [date, setDate] = useState({
    sdate: getFormattedDate(),
        stime: moment(new Date()).subtract(15,'minutes').format('hh:mm'),
    edate: getFormattedDate(),
        etime: moment(new Date()).format('hh:mm'),
  });
  const [selectedSystem, setSelectedSystem] = useState(
      (historicalFilter)? historicalFilter.selectedSystem : {}
  );

  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);

  useEffect(() => {
    dispatch(problemDeterminationDateFilter(date));
    const queryData = {
      ...(date.sdate && { sdate: date.sdate }),
      ...(date.edate && { edate: date.edate }),
      ...(date.stime && { stime: date.stime }),
      ...(date.etime && { etime: date.etime }),
          ...(_.isEmpty(selectedSystem) ? { sysid: 0 } : {sysid : selectedSystem.id}),
    };

    /* put last visited dates cache into local-store */
    saveParametersIntoLocalStorage("ProblemDeterminationFilter", {
      ...queryData,
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
        prevDate[type] = val;
        break;
      case "edate":
        prevDate[type] = val;
        break;
      case "stime":
        prevDate[type] = val;
        break;
      case "etime":
        prevDate[type] = val;
        break;
      default:
        break;
    }
    setDate(prevDate);
    dispatch(problemDeterminationDateFilter(prevDate));
    saveParametersIntoLocalStorage("ProblemDeterminationFilter", prevDate);
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

    useEffect(()=>{
      if(!uuid?.loading && uuid.data.uniqueid){
        dispatch(deleteTemporaryReport({uniqueid:uuid.data.uniqueid}));
      }
      dispatch(counterTogglePDTopJobs(false))
    },[dispatch, date.sdate, date.edate, date.stime, date.etime])

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
                      defaultValue={date.sdate ?? ""}
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
                      defaultValue={date.stime ?? ""}
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
                      defaultValue={date.edate ?? ""}
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
                      defaultValue={date.etime ?? ""}
                      disabled={date.etime.isDisabled}
                      onChange={(e) => dateClickHandler(e, "etime")}
                    />
                  </div>
                </div>
              </div>
            </div>
          </TabPane>
        </TabContent>
      </div>
        </div>)}


export default PDDateFilter;