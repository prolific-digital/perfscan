import React, { useState, useEffect, Fragment } from "react";
import { MultiSelect } from 'primereact/multiselect';
import { useSelector, useDispatch } from 'react-redux';
import { fetchReportReceipients, getReportRecipients, setRecipients } from "store/slices/report_scheduler/editSchedulerSlice";


export default function Recipients({reportData, isEditing = false}) {

    const [selectedItems, setSelectedItems] = useState(null);
    const dispatch = useDispatch();
    
    const reportRecipientsData = useSelector(getReportRecipients);  

    useEffect(()=>{
        dispatch(fetchReportReceipients(reportData?.report_id));       
    },[reportData.report_id])
    
    useEffect(()=>{
        const items = reportRecipientsData?.data.filter((d) => {return d.isselected === 'TRUE'});
        setSelectedItems(items);
    },[reportRecipientsData])

    const selectedRecipients = () => {
        dispatch(setRecipients(selectedItems));
    }

    
    const recipientsTemplate = (option) => {
        return (
            <div className="flex align-items-center">
                <div>
                    <span>{option.report_user_name}</span> <span style={{fontSize: '0.7rem'}}>{option.report_user_email}</span> </div>
            </div>
        );
    };
    return (
            <Fragment>
            <div className="metric_header">Recipients</div>
            <MultiSelect 
                display="chip"
                value={selectedItems}
                options={reportRecipientsData?.data}
                optionLabel="report_user_name"
                onChange={(e) => {
                    setSelectedItems(e.value);
                }}
                onBlur={() => selectedRecipients()}
                itemTemplate={recipientsTemplate}
                placeholder="Select Recipients"
                filter
            />
            </Fragment>
    )
}