import React, { Fragment, useEffect, useState, useRef }  from 'react'
import { useDispatch, useSelector } from "react-redux";

import { Button } from "primereact/button";
import { getParametersFromLocalStorage } from "helpers/commonHelper";
import {  setReportName, setReportDesc} from "store/slices/report_scheduler/addSchedulerSlice";
import { InputText } from 'primereact/inputtext';

export const ReportFooter = ({SaveReport, cancelEdit}) => {
    
    const [selectedPeriod, setSelectedPeriod] = useState(null);
    const [rptName, setRptName] = useState('');
    const [rptDesc, setRptDesc] = useState('');

    const dispatch = useDispatch();
    
    const setName = () => {
      dispatch(setReportName(rptName));     
    }

    const setDesc = () => {
       dispatch(setReportDesc(rptDesc));
    }

    return (
        <Fragment>
        <div className="report_header" style={{ marginTop: "10px" }}>
            <div className='report_field'>
                <label htmlFor="reportname" className='report_field_label'>Report Name</label>
                <InputText id='reportname' value={rptName} className='report_field_input' onChange={(e) => setRptName(e.target.value)} onBlur={(e) => setName()}/>
            </div>
            <div className='report_field'>
                <label htmlFor="reportdesc" className='report_field_label'>Report Description</label>
                <InputText id='reportdesc' value={rptDesc} className='report_field_input' onChange={(e) => setRptDesc(e.target.value)} onBlur={() => setDesc()}/>
            </div>
            <div className='report_field'>
                <Button style={{fontWeight: "bold", height: '50px', marginTop: "2rem" }} onClick={SaveReport}>Save Report</Button>
            </div>
            <div className='report_field'>
                <Button style={{fontWeight: "bold", height: '50px', marginTop: "2rem", backgroundColor: "red", color: "white", borderColor: "red" }} severity="danger" onClick={cancelEdit}>Cancel</Button>
            </div>
        </div>
        </Fragment>
    )
}


export default ReportFooter
