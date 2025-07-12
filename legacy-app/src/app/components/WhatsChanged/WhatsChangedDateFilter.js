import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getFormattedDate,  getParametersFromLocalStorage, saveParametersIntoLocalStorage } from "../../../helpers/commonHelper";
import { whatsChangedDateFilter } from "../../../store/slices/searchFilter";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { getActiveTab } from "../../../store/slices/common/commonSlice";
import * as _ from "lodash";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { deleteTemporaryReport } from "../../../store/slices/reports/SaveNewReport/SaveNewReport";
import { getUuidData } from "../../../store/slices/reports/SaveNewReport/SaveNewReport";

const WhatsChangedDateFilter = ({dateTabChange,reportChange, loadingReport}) => {
  let whatsChangedFilter = getParametersFromLocalStorage("WhatsChangedFilter");
  const dispatch = useDispatch();
  const uuid = useSelector(getUuidData);

  /* Redux variables */
    let tabTransfer = useSelector(getActiveTab) //data for date tab change
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);

  useEffect(() => {
      setBuildDateActiveTab(tabTransfer)
    },[tabTransfer])


  const [buildDateActiveTab, setBuildDateActiveTab] = useState(10);
  const [date, setDate] = useState({
    sdate: whatsChangedFilter && whatsChangedFilter.sdate ? whatsChangedFilter.sdate : getFormattedDate(),
    stime: whatsChangedFilter && whatsChangedFilter.stime ? whatsChangedFilter.stime : "00:01",
    edate: whatsChangedFilter && whatsChangedFilter.edate ? whatsChangedFilter.edate : getFormattedDate(),
    etime: whatsChangedFilter && whatsChangedFilter.etime ? whatsChangedFilter.etime : "23:59",
    dateType: whatsChangedFilter && whatsChangedFilter.dateType ? whatsChangedFilter.dateType : "24hrs"
  });
  const [selectedSystem, setSelectedSystem] = useState(
        (whatsChangedFilter)? whatsChangedFilter.selectedSystem : {}
  );

  useEffect(() => {
    dispatch(whatsChangedDateFilter(date));
    const queryData = {
      ...(date.sdate && { sdate: date.sdate }),
      ...(date.edate && { edate: date.edate }),
      ...(date.stime && { stime: date.stime }),
      ...(date.etime && { etime: date.etime }),
          ...(_.isEmpty(selectedSystem) ? { sysid: 0 } : {sysid : selectedSystem.id}),
    };

    /* put last visited dates cache into local-store */
    saveParametersIntoLocalStorage("WhatsChangedFilter", {
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
    dispatch(whatsChangedDateFilter(prevDate));
    saveParametersIntoLocalStorage("WhatsChangedFilter", prevDate);
  };

  const predefinedRangeHandler = (e) => {
    reportChange();
    const id = e.target.id;
    let stime = e.target.getAttribute("data-stime");
    let etime = e.target.getAttribute("data-etime");
    if (id === "now") {
      let current = new Date();
      etime = `${current.getHours()}:${current.getMinutes()}`;
      let MS_PER_MINUTE = 60000;
      let myStartDate = new Date(current - 15 * MS_PER_MINUTE);
      let endMin = myStartDate.getMinutes();
      if (endMin < 10) {
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
      dispatch(whatsChangedDateFilter(prevDate));
      saveParametersIntoLocalStorage("WhatsChangedFilter", prevDate);
    }
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
    //   if(!uuid?.loading && uuid.data.uniqueid){
    //     dispatch(deleteTemporaryReport({uniqueid:uuid.data.uniqueid}));
    //   }
    // },[dispatch, date.sdate, date.edate, date.stime, date.etime])

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
              </div>
            </div>
          </TabPane>
        </TabContent>
      </div>
        </div>)}


export default React.memo(WhatsChangedDateFilter);