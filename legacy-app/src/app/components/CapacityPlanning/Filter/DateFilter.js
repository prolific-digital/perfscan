import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import BusyDays from "../modal/BusyDays";
import { Calendar } from 'primereact/calendar';

import { getFormattedDate,  getParametersFromLocalStorage, saveParametersIntoLocalStorage } from "../../../../helpers/commonHelper";
import { capacitySaveFilter } from "../../../../store/slices/searchFilter";
import * as _ from "lodash";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { getUuidData } from "../../../../store/slices/reports/SaveNewReport/SaveNewReport";
import { getBusyDay, setAutoSys, setBusyDay } from "../../../../store/slices/capacityplanning/CapacityPlanningSlice"

const DateFilter = ({dateTabChange,reportChange,loadingReport}) => {
  //let capacityFilter = getParametersFromLocalStorage("CapacityFilter");
  const lastQueryData = getParametersFromLocalStorage();
  const dispatch = useDispatch();
  const uuid = useSelector(getUuidData);
  const filters = useSelector(state => state.filters);
  let capacityFilter = filters.capacity_filter;
  const busyDay = useSelector(getBusyDay);

  const [value, setValue] = useState("");
  const [checked, setChecked] = useState(false);
  const [visible, setVisible] = useState(false);


  useEffect(()=>{
    if(loadingReport){
      reportChange();
      dispatch(setAutoSys(false));
    }
    return
  },[value])


  useEffect(()=>{
    if(!loadingReport){
      setValue("")
    }
    return
  },[loadingReport])
 

  const showBusyDays = (e) => {
    setChecked(e);
    setVisible(e);
    // reportChange();
  }

  const setBusyDate = (d, p) => {
    setValue(d)
    setBusyDay(d);
    // dispatch(setAutoSys(false));
    dispatch(capacitySaveFilter({...capacityFilter, busyday : d, peak : p}));
  }
  
  return (
    <div className="build_para_card_capacity">
      <div className="build_title">Date (Busy Workload Date)</div>
      <div className="filter_option">
        <input
          type="date"
          className="form-control "
          value={value}
          //disabled={date.sdate.isDisabled}
          onChange={(e) => setBusyDate(e.target.value)}
        />
      </div>
      <div className="filter_option">
        <div className="busyDays">
          <Button label="View Busy Days" icon="pi pi-external-link" onClick={() => showBusyDays(true)} />
        </div>
        <div>
        <Dialog header="Select Busy Day" visible={visible} style={{ width: '50vw' }} breakpoints={{ '960px': '75vw', '641px': '100vw' }} onHide={() => showBusyDays(false)}>
           <BusyDays id="busyDayChart" selBusyDay = {() => showBusyDays(false)} setBusyDay = {(date, peak) => setBusyDate(date, peak)} loadingReport={loadingReport}/>
        </Dialog>
      </div>
      </div>
    </div>)}


export default React.memo(DateFilter);