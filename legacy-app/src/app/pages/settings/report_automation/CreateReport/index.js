import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReportMetrics from "./ReportMetrics";
import Schedule from "./Schedule";
import Recipients from "./Recipients";
import ReportHeader from "./ReportHeader";
import {fetchCreateReport, getCreateReport, getReport} from "store/slices/report_scheduler/addSchedulerSlice";
import { Toast } from 'primereact/toast';
import _ from "lodash";
import { ReportFooter } from "./ReportFooter";
import { getParametersFromLocalStorage } from "helpers/commonHelper";

const CreateReport = ({reloadData}) => {
    const dispatch = useDispatch();
    const toast = useRef(null);
    
    const report = useSelector(getReport);
    const createReport = useSelector(getCreateReport);

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

        if(_.isEmpty(report.template)){
            showToast("error", "Error", "Please select a Template");
            return;
        }

        if(report.report_period === ''){
            showToast("error", "Error", "Please select a Report Period");
            return;
        }

        if(report.report_schedule.type === ''){
            showToast("error", "Error", "Please set Report Schedule");
            return;
        }

        if(report.report_schedule.type === 'weekly' ){
            if( report.report_schedule.days.length === 0){
                showToast("error", "Error", "Please choose day(s) of Week");
                return;
            }
        }

        if(report.report_schedule.type === 'monthly' ){
            if( report.report_schedule.months.length === 0){
                showToast("error", "Error", "Please choose day(s) of Month");
                return;
            }
        }

        if(_.isEmpty(report.recipients)){
            showToast("error", "Error", "Please select Recipients");
            return;
        }

        if(report.report_name === ''){
            showToast("error", "Error", "Please enter Report Name");
            return;
        }

        if(report.report_desc === ''){
            showToast("error", "Error", "Please enter Report Description");
            return;
        }
        
        const userID = getParametersFromLocalStorage('userID');
        const rptData = {...report, user_id : userID}
       
        dispatch(fetchCreateReport(rptData));
        
    }

    useEffect(() => {
        if(!createReport.loading && createReport.data.success ){
            toast.current.show({ severity: 'success', summary: 'Success', detail: createReport.data.message });  
            setTimeout(() => {
                toast.current.show({ severity: 'information', summary: 'Info', detail: 'redireting...' });
                reloadData(1);    
            },2000)
        }
    },[createReport])

    return (      
        <div className="setting-options">
            <Toast ref={toast} position="top-right" />
            <ReportHeader/>
            <ReportMetrics />
            <Schedule  />
            <Recipients />
            <ReportFooter SaveReport={SaveReport} cancelEdit={()=>reloadData(1, 'Create')}/>
        </div>
        
    );
};

export default CreateReport;