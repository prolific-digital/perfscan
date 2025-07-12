import React, { Fragment, useEffect, useState, useRef }  from 'react'
import { useDispatch, useSelector } from "react-redux";

import { Button } from "primereact/button";
import {
    Label,
} from "reactstrap";


import {  setReportName, setReportDesc} from "store/slices/report_scheduler/editSchedulerSlice";


import { InputText } from 'primereact/inputtext';

export const ReportFooter = ({saveReport, reportData, cancelEdit}) => {
    
    const [rptName, setRptName] = useState('');
    const [rptDesc, setRptDesc] = useState('');
    

    const dispatch = useDispatch();
   
    const setName = () => {
      dispatch(setReportName(rptName));     
    }

    const setDesc = () => {
       dispatch(setReportDesc(rptDesc));
    }

    useEffect(() => {
        setRptName(reportData.report_name);
        setRptDesc(reportData.report_description);
    }, [reportData.report_id])

    return (
        <Fragment>
        <div className="report_header" style={{ marginTop: "10px" }}>
            <div className='report_field'>
                <Label for="reportname" className='report_field_label'>Report Name</Label>
                <InputText id='reportname' value={rptName} className='report_field_input' onChange={(e) => setRptName(e.target.value)} onBlur={(e) => setName()}/>
            </div>
            <div className='report_field'>
                <Label for="reportdesc" className='report_field_label'>Report Description</Label>
                <InputText id='reportdesc' value={rptDesc} className='report_field_input' onChange={(e) => setRptDesc(e.target.value)} onBlur={() => setDesc()}/>
            </div>
            <div className='report_field'>
            <Button style={{fontWeight: "bold", height: '50px', marginTop: "2rem" }} onClick={saveReport}>Save Report</Button>
            </div>
            
                <div className='report_field'>
                <Button style={{fontWeight: "bold", height: '50px', marginTop: "2rem", backgroundColor: "red", color: "white", borderColor: "red" }} severity="danger" onClick={()=>cancelEdit()}>Cancel</Button>
                </div>
        </div>
        </Fragment>
    )
}


export default ReportFooter
