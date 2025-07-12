import React, { Fragment, useEffect, useState, useRef }  from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import {
    Label,
} from "reactstrap";
import { getAllSystems, getAllSchedulerSystems  } from "services/apiService";
import { getParametersFromLocalStorage, getReportPeriod } from "helpers/commonHelper";
import { setSystem, setTemplate, setPeriod, setReportType, getReport } from "store/slices/report_scheduler/editSchedulerSlice";

import { fetchTemplates, getTemplates } from "store/slices/branding";

import { InputText } from 'primereact/inputtext';

export const ReportHeader = ({reportData}) => {
    const [selectedSystem, setSelectedSystem] = useState({});
    const [selectedTemplate, setSelectedTemplate] = useState({});
    const [selectedReport, setSelectedReport] = useState({});
    const [systemsList, setSystemsList] = useState([]);
    const [selectedPeriod, setSelectedPeriod] = useState({});


    const dispatch = useDispatch();
    const curUser = getParametersFromLocalStorage("userID");
    const Templates = useSelector(getTemplates);
    //const report = useSelector(getReport);

    const templates = Templates.data.filter(t => t.config_id !== -1);
   
    const RptPeriod = [
        { name: 'Yesterday', code: 'yesterday' },
        { name: 'Last Week', code: 'lastweek' },
        { name: 'Current Week', code: 'currentweek' },
        { name: 'Current Month', code: 'currentmonth' },
        { name: 'Previous Month', code: 'previousmonth' }
        ];
    
    const RptType = [
        { name: 'Historical', code: 'historical' }
    ];

    useEffect(() => {
        fetchAllSystems();
        dispatch(fetchTemplates(curUser,'historical data'));
    }, []);

    const setCurSystem = (system) => {
        setSelectedSystem(system);
        dispatch(setSystem({id:system.id, name:system.entity_name}));
    }

    const setCurReportType = (report) => {
        setReportType(report);
        dispatch(setReportType(report));    
    }

    const setCurTemplate = (template) => {
        setSelectedTemplate(template);
        dispatch(setTemplate(template));
    }

    const setCurPeriod = (period) => {
        setSelectedPeriod(period);
        dispatch(setPeriod(period));
    }

    const fetchAllSystems = async () => {
        try {
            const response = await getAllSchedulerSystems();
            if (response.status === 200) {
                const data = response.data || [];
                if (data.length) {
                    setSystemsList(data);
                }
            }
        } catch (error) { }
    };

    const systemOptionTemplate = (option) => {
        return (
            <div className="value-options">
                {option.entity_name} - {option.entity_description}
            </div>
        );
    };

    const selectedSystemTemplate = (option, props) => {
        if (option) {
            return (
                <div className="value-options">
                    {option.entity_name} - {option.entity_description} 
                </div>
            );
        }
        return <span>{props.placeholder}</span>;
    };

    useEffect(() => {
            setSelectedSystem(reportData.system);
            setSelectedTemplate(reportData.template);
            setSelectedPeriod(getReportPeriod(reportData?.report_period?.code));
            setSelectedReport({ name: 'Historical', code: 'historical' }); 
    },[reportData]);

    return (
        <Fragment>
        <div className="report_header" style={{ marginTop: "10px" }}>
            <div className='report_field'>
            <Label for="system" className='report_field_label'>System</Label>
            <Dropdown
                className='report_field_input'
                value={selectedSystem}
                options={systemsList}
                onChange={(e) => setCurSystem(e.value)}
                optionLabel="name"
                filter
                filterBy="entity_name"
                placeholder="Select a System"
                valueTemplate={selectedSystemTemplate}
                itemTemplate={systemOptionTemplate}
                id="system"
                disabled
            />
            </div>
            <div className='report_field'>
            <Label for="reporttype" className='report_field_label'>Report Type</Label>
            <Dropdown className='report_field_input'
                value={selectedReport} 
                onChange={(e) => setSelectedReport(e.value)} 
                options={RptType} 
                optionLabel="name" 
                inputId='reporttype'
                placeholder="Select Report Type"/>
            </div>
            <div className='report_field'>
            <Label for="template" className='report_field_label'>Template</Label>
            <Dropdown 
                className='report_field_input'
                value={selectedTemplate} 
                onChange={(e) => setCurTemplate(e.value)} 
                options={templates} 
                optionLabel="template_name" 
                id="template"
                placeholder={Templates.loading ? "Loading..." : "Select Template" }
                loading={Templates.loading}/>
            </div>
            <div className='report_field'>
            <Label for="rptperiod" className='report_field_label'>Period</Label>
            <Dropdown
                className='report-field-input' 
                value={selectedPeriod} 
                onChange={(e) => setCurPeriod(e.value)} 
                options={RptPeriod} 
                optionLabel="name" 
                id="rptperiod"
                placeholder="Select Report Period" />
            </div>
            
        </div>
        </Fragment>
    )
}


export default ReportHeader
