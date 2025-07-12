import React, { Fragment, useEffect, useState, useRef } from "react";
import { MultiSelect } from "primereact/multiselect";
import { useDispatch, useSelector } from "react-redux";
import {
    FormGroup,
    Input,
    Label
} from "reactstrap";
import _, { has } from "lodash";

import { getParametersFromLocalStorage } from "helpers/commonHelper";
import { CPU, Disk, Memory, Other } from "typeCodes/index";
import Loading from "app/components/Loading";
import Error from "app/components/Error";
import { getReport, setMetrics, getReportData } from "store/slices/report_scheduler/editSchedulerSlice";


const ReportMetrics = ({reportData}) => {
    const [reportMetricsOption, setReportMetricsOption] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState("");
    const [hasSomeChanges, setHasSomeChanges] = useState(false);
    const [poolValue, setPoolValue] = useState([]);
    const [ethernetLineName, setEthernetLineName] = useState("");
    const [allPools, setAllPools] = useState([]);

    const dispatch = useDispatch();
    const curUser = getParametersFromLocalStorage("userID");

    const sysID = reportData?.sys?.id || 0;  

    useEffect(() => {
        hasSomeChanges === true &&
        dispatch(setMetrics(reportMetricsOption));
    }, [reportMetricsOption, hasSomeChanges]);

    const handleReportOptionChange = (e) => {
        const name = e.target.name;
        const checked = e.target.checked;
        setHasSomeChanges(true);
        if (name === "allcpu") {
            let res = {};
            CPU.forEach((item) => {
                res[item.key] = checked;
            });
            setReportMetricsOption({ ...reportMetricsOption, ...res });
        } else if (name === "alldisk") {
            let res = {};
            Disk.forEach((item) => {
                res[item.key] = checked;
            });
            setReportMetricsOption({ ...reportMetricsOption, ...res });
        } else if (name === "allmemory") {
            let res = {};
            Memory.forEach((item) => {
                res[item.key] = checked;
            });
            setReportMetricsOption({ ...reportMetricsOption, ...res });
        } else if (name === "allother") {
            let res = {};
            Other.forEach((item) => {
                res[item.key] = checked;
            });
            setReportMetricsOption({ ...reportMetricsOption, ...res });
        } else {
            setReportMetricsOption({ ...reportMetricsOption, [name]: checked });
        }
    };


        useEffect(() => {           
            reportData?.report_metrix &&
            setReportMetricsOption(reportData?.report_metrix);
        }, [reportData.report_id]);


    return (
        <Fragment>
            <div className="metrics_options_container">
                {isLoading ? (
                    <Loading />
                ) : isError ? (
                    <Error error={isError} />
                ) : isError ? (
                    <Error error={"No Data Found"} />
                ) : (
                    <Fragment>
                        <div className="metric_options">
                            <div className="metric_header">
                                <FormGroup check style={{ textAlign: "left" }}>
                                    <Input
                                        type="checkbox"
                                        name={"allcpu"}
                                        checked={
                                            CPU.filter(
                                                (item) =>
                                                    reportMetricsOption[item.key] !== true
                                            ).length < 1
                                        }
                                        onChange={(e) => handleReportOptionChange(e)}
                                    />
                                    <Label check for="allcpu">
                                        CPU
                                    </Label>
                                </FormGroup>
                            </div>
                            <div className="metric_body">
                                {CPU.map((item, index) => (
                                    <FormGroup check key={item.id}>
                                        <Input
                                            type="checkbox"
                                            name={item.key}
                                            id={item.key}
                                            key={`${item.key}_${index}`}
                                            checked={reportMetricsOption[item.key]}
                                            onChange={(e) => handleReportOptionChange(e)}
                                        />
                                        <Label check for="cpu_utilization">
                                            {item.name}
                                        </Label>
                                    </FormGroup>
                                ))}
                            </div>
                        </div>
                        <div className="metric_options">
                            <div className="metric_header">
                                <FormGroup check style={{ textAlign: "left" }}>
                                    <Input
                                        type="checkbox"
                                        name={"alldisk"}
                                        checked={
                                            Disk.filter(
                                                (item) =>
                                                    reportMetricsOption[item.key] !== true
                                            ).length < 1
                                        }
                                        onChange={(e) => handleReportOptionChange(e)}
                                    />
                                    <Label check for="cpu_utilization">
                                        Disk
                                    </Label>
                                </FormGroup>
                            </div>
                            <div className="metric_body">
                                {Disk.map((item, index) => (
                                    <FormGroup check key={item.id}>
                                        <Input
                                            type="checkbox"
                                            name={item.key}
                                            id={item.key}
                                            key={`${item.key}_${index}`}
                                            checked={reportMetricsOption[item.key]}
                                            onChange={(e) => handleReportOptionChange(e)}
                                        />
                                        <Label check for="cpu_utilization">
                                            {item.name}
                                        </Label>
                                    </FormGroup>
                                ))}
                            </div>
                        </div>
                        <div className="metric_options">
                            <div className="metric_header">
                                <FormGroup check style={{ textAlign: "left" }}>
                                    <Input
                                        type="checkbox"
                                        name={"allmemory"}
                                        checked={
                                            Memory.filter(
                                                (item) =>
                                                    reportMetricsOption[item.key] !== true
                                            ).length < 1
                                        }
                                        onChange={(e) => handleReportOptionChange(e)}
                                    />
                                    <Label check for="allmemory">
                                        Memory
                                    </Label>
                                </FormGroup>
                            </div>
                            <div className="metric_body">
                                {Memory.map((item, index) => (
                                    <Fragment>
                                        <FormGroup check key={item.id}>
                                            <Input
                                                type="checkbox"
                                                name={item.key}
                                                id={item.key}
                                                key={`${item.key}_${index}`}
                                                checked={reportMetricsOption[item.key]}
                                                onChange={(e) => handleReportOptionChange(e)}
                                            />
                                            <Label check for="cpu_utilization">
                                                {item.name}
                                            </Label>
                                        </FormGroup>
                                        {item.key === "pool_faulting_rate" &&
                                            reportMetricsOption["pool_faulting_rate"] && (
                                                <div
                                                    className="form-group"
                                                    style={{ textAlign: "left" }}
                                                >
                                                    <label className="label">Pool Number</label>
                                                    <MultiSelect
                                                        value={poolValue}
                                                        options={allPools}
                                                        onChange={(e) => setPoolValue(e.value)}
                                                        // optionLabel="name"
                                                        placeholder="Select pool"
                                                        maxSelectedLabels={5}
                                                    //selectedItemTemplate={selectedPoolsTemplate}
                                                    />
                                                </div>
                                            )}
                                    </Fragment>
                                ))}
                            </div>
                        </div>
                       
                        <div className="metric_options">
                            <div className="metric_header">
                                <FormGroup check style={{ textAlign: "left" }}>
                                    <Input
                                        type="checkbox"
                                        name={"allother"}
                                        checked={
                                            Other.filter(
                                                (item) =>
                                                    reportMetricsOption[item.key] !== true
                                            ).length < 1
                                        }
                                        onChange={(e) => handleReportOptionChange(e)}
                                    />
                                    <Label check for="allother">
                                        Other
                                    </Label>
                                </FormGroup>
                            </div>
                            <div className="metric_body">
                                {Other.map((item, index) => (
                                    <Fragment>
                                        <FormGroup check key={item.id}>
                                            <Input
                                                type="checkbox"
                                                name={item.key}
                                                id={item.key}
                                                key={`${item.key}_${index}`}
                                                checked={reportMetricsOption[item.key]}
                                                onChange={(e) => handleReportOptionChange(e)}
                                            />
                                            <Label check for="cpu_utilization">
                                                {item.name}
                                            </Label>
                                        </FormGroup>
                                        {item.key === "ethernet_line_utilization" &&
                                            reportMetricsOption[
                                            "ethernet_line_utilization"
                                            ] && (
                                                <div className="form_group">
                                                    <input
                                                        className="form-control"
                                                        onChange={(e) =>
                                                            setEthernetLineName(e.target.value)
                                                        }
                                                        placeholder="Enter Line name"
                                                        value={ethernetLineName}
                                                    />
                                                </div>
                                            )}
                                    </Fragment>
                                ))}
                            </div>
                        </div>
                    </Fragment>
                )}
            </div>
        </Fragment>
    )
}

export default ReportMetrics;