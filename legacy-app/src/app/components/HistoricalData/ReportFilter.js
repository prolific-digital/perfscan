import React, { useState } from "react";
import SectionHeader from "../../components/SectionHeader";
import SystemFilter from "./SystemFilter";
import DateFilter from "./DateFilter";


const PerformanceDataFilter = ({dateTab,runReport, loadingReport,changeReport}) => {

    const [toggleBuildParameter, setToggleBuildParameter] = useState(true);
    const [isSaveReport, setIsSaveReport] = useState(false);
    const [dateTabChange, setDateTabChange] = useState(dateTab);
   

    const saveReportCheckHandler = () => {
        setIsSaveReport((isSaveReport) => !isSaveReport);
    };

    const handleReRunReportChange = () => {
            changeReport();
    }
    
    return (
        <div className="performance_wrapper">
            <SectionHeader title={"Performance Insights"} subTitle="Historical Data Analysis" />
            <div className="build_parameter_wrapper">
                <button className="btn btn-primary" onClick={() => setToggleBuildParameter(!toggleBuildParameter)}>
                    {toggleBuildParameter ? "Hide" : "Show"} Parameters
                </button>
                {toggleBuildParameter && (
                    <div className="parametes_card_wrap">
                        <SystemFilter />
                        <DateFilter dateTabChange={dateTabChange} reportChange = {handleReRunReportChange} />
                        <div>
                            <div
                                className="form-group checkbox-wrapper"
                                style={{
                                    flexDirection: "row",
                                    flexWrap: "nowrap",
                                    whiteSpace: "nowrap",
                                }}
                            >
                                <input
                                    className="checkbox-item"
                                    type="checkbox"
                                    id="now"
                                    name="timerange"
                                    checked={isSaveReport}
                                    onChange={saveReportCheckHandler}
                                />
                                <label className="label" htmlFor="now">
                                    Do you want to save this report?
                                </label>
                                {isSaveReport && (
                                    <div className="show-field">
                                        <input
                                            className="form-control"
                                            placeholder="Enter Report name"
                                        />
                                    </div>
                                )}
                            </div>
                            <button className="btn btn-primary" onClick={runReport}>
                                Run Report
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
};

export default PerformanceDataFilter;
// loadingReport &&
// {<i className="pi pi-spin pi-spinner"></i>}