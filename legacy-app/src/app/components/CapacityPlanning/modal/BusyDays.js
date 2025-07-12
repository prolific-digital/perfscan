import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import GridLoader from "react-spinners/GridLoader";
import * as _ from 'lodash';
import { RadioButton } from 'primereact/radiobutton';
import { DataView } from 'primereact/dataview';
import { fetchAsyncBusyDays, getBusyDays } from "../../../../store/slices/capacityplanning/CapacityPlanningSlice"
import BusyDayChart from "./BusyDayChart";
import { capacitySaveFilter } from "../../../../store/slices/searchFilter";

const BusyDays = ({selBusyDay, setBusyDay}) => {
    const dispatch = useDispatch();
    const [busyDaysList, setBusyDaysList] = useState([]);
    const [busyDate, setBusyDate] = useState('');

    const busyDays = useSelector(getBusyDays);
    const filters = useSelector(state => state.filters);
    let capacityFilter = filters.capacity_filter;

    const qd = {userid:capacityFilter.userId, sys : capacityFilter.sysid};

    useEffect(() => {
        dispatch(fetchAsyncBusyDays(qd));
    }, [dispatch])
    
    const setSysBusyDate = (date, peak) => {
        selBusyDay();
        setBusyDay(date, peak);
        //setBusyDate(e)
        //dispatch(setBusyDay(e));
        //dispatch(capacitySaveFilter({...capacityFilter, busyday : e}));
    }
    

    return (<>
        {busyDays.loading && <span>Loading....</span>}
        {!busyDays.loading && !_.isEmpty(busyDays.data) &&
        <div className="m-0" id="busyDaysChart">
            <div className="busyDay" id="header">
                <div className="day header" id="header_day">Date</div>
                <div className="avg_peak header" id="header_avg_peak">Average/Peak (CPW)</div>
                <div className="chart header" id="header_chart">Utilization</div>
                <div className="sel header" id="header_sel">Select Day</div>
            </div>
            {busyDays.data.cpuData.map((data, idx) => {
            return(
            <div className="busyDay" key={`bd_${idx}`}>
                <div className="day" key={`day_${idx}`}>{data.datetime}</div>
                <div className="avg_peak" key={`avg_peak_${idx}`}>{data.avrg_cpw} / {data.peak_cpw}</div>
                <div className="chart" key={`chart_${idx}`} onClick={() => setSysBusyDate(data.datetime, data.peak_cpw)}>
                        <BusyDayChart bdate={data.datetime} id={`chart_${idx}`} />
                </div>
                <div className="sel" key={`sel_${idx}`}>
                    <RadioButton inputId={`busyDate_${idx}`} name="busyDay" value={data.datetime} onChange={(e) => setSysBusyDate(e.value, data.peak_cpw)} checked={data.datetime == busyDate}/>
                </div>
            </div>
            )})}
            
        </div>}
        </>)
}

export default BusyDays;