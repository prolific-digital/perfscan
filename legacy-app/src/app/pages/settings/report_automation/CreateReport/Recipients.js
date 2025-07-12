import React, { useState, useEffect, Fragment } from "react";
import { MultiSelect } from 'primereact/multiselect';
import { useSelector, useDispatch } from 'react-redux';

import { fetchReceipients, getRecipients, setRecipients } from 'store/slices/report_scheduler/addSchedulerSlice';

export default function Recipients() {

    const [selectAll, setSelectAll] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const dispatch = useDispatch();
    
    const recipientsData = useSelector(getRecipients);
    
    useEffect(()=> {
        dispatch(fetchReceipients());
    },[]);   
    

    useEffect(()=> {
        console.log("Selected Recipients", selectedItems);
            dispatch(setRecipients(selectedItems));
    },[selectedItems]);

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
                options={recipientsData?.data}
                optionLabel="report_user_name"
                onChange={(e) => {
                   setSelectedItems(e.value);
                }}
                itemTemplate = {recipientsTemplate}
                placeholder="Select Recipients"
                filter
            />
            </Fragment>
    )
}