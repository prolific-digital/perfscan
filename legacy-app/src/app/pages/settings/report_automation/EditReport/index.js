import { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useParams } from 'react-router-dom';
import ReportMetrics from "./EditReportMetrics";
import Schedule from "./EditSchedule";
import Recipients from "./EditRecipients";
import ReportHeader from "./EditReportHeader";
import ReportFooter from "./EditReportFooter";
import { getEditReportData,  fetchReport, getReport, fetchEditReport, getReportData, setReport } from "store/slices/report_scheduler/editSchedulerSlice";
import { PropagateLoader } from "react-spinners";
import { Toast } from 'primereact/toast';
import { Button } from "primereact/button";
import _ from "lodash";
import { EDIT_REPORT } from "typeCodes";
import { set } from "store";

const EditReport = ({reloadData, rptid}) => {
    const report = useSelector(getReport); // local state
    const reportData = useSelector(getReportData); // report data from api
    const editReport = useSelector(getEditReportData); // save report data (edit) from api

    const dispatch = useDispatch();
    const toast = useRef(null);

    //const { id } = report;
    useEffect(() => {
        dispatch(fetchReport(rptid));
    },[rptid]);


    const showToast = (type, summary, details) => {
        toast.current.show({
          severity: type || "success",
          summary: summary || "Success Message",
          detail: details || "Message Content",
          life: 3000,
        });
    };

    const SaveReport = () => {
        if(report===null){
            showToast({details:"Please fill all required fields"});
            return;
        }
        if(report.system_id === 0){
            showToast("error", "Error", "Please select a System");
            return;
        }

        if(report.template_id === 0){
            showToast("error", "Error", "Please select a Template");
            return;
        }

        if(report.report_period === ''){
            showToast("error", "Error", "Please select a Report Period");
            return;
        }
        if(_.isEmpty(report.report_schedule)){
            showToast("error", "Error", "Please set Report Schedule");
            return;
        }

        if(_.isEmpty(report.recipients)){
            showToast("error", "Error", "Please select Recipients");
            return;
        }

        dispatch(fetchEditReport(report));
    }

    useEffect(() => {
        dispatch(setReport(reportData.data))
    },[reportData])

    useEffect(() => {
        if(!editReport.loading && editReport.data.success ){
            toast.current.show({ severity: 'success', summary: 'Success', detail: editReport.data.message });  
            const timeout = setTimeout(() => {
                toast.current.show({ severity: 'information', summary: 'Info', detail: 'redireting...' });
                reloadData(1, 'Edit');  
                console.log("Called");  
            },2000);
            
            return () => {
                clearTimeout(timeout);
            }
        }
        
    },[editReport])
    
    return (      
        <Fragment>
        {reportData.loading && <PropagateLoader />} 

        {!reportData.loading && reportData.data &&
        <div className="setting-options">
                <Fragment>
                    <Toast ref={toast} position="top-right" />
                    <ReportHeader reportData={report} isEditing = {true} />
                    <ReportMetrics reportData={report} isEditing = {true} />
                    <Schedule reportData={report?.report_schedule}  />
                    <Recipients reportData={report} isEditing = {true} />
                    <ReportFooter reportData={report} saveReport={SaveReport} isEditing = {true} cancelEdit={() => reloadData(1, 'Edit')}/>
                </Fragment>
           
        </div> }
       </Fragment> 
    );
};

export default EditReport;