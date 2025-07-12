import React, { Fragment, useEffect, useState, useRef } from "react";
import {
  Nav,
  NavItem,
  NavLink,
  FormGroup,
  Input,
  Label,
  TabContent,
  TabPane,
} from "reactstrap";
import { MultiSelect } from "primereact/multiselect";
import { TriStateCheckbox } from "primereact/tristatecheckbox";
import { useBeforeunload } from "react-beforeunload";
import SettingHeader from "./SettingHeader";
import { CPU, Disk, Memory, Other } from "../../../typeCodes";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import { Dropdown } from "primereact/dropdown";
import {
  getGlobalMetrics,
  getSystemMetrics,
  getAllSystems,
  updateGlobalMetrics,
  updateSystemMetrics,
  getPoolsList,
  getPoolsListSys,
} from "../../../services/apiService";
import { Toast } from "primereact/toast";
import { useDispatch } from "react-redux";
import { globalMetrics } from "../../../store/slices/settings/";
import { getParametersFromLocalStorage } from "../../../helpers/commonHelper";
import styled from "styled-components";
import { deleteTemporaryReport } from "../../../store/slices/reports/SaveNewReport/SaveNewReport";
import SectionHeader from "../../components/SectionHeader";

function DefaultCoreMetrics() {
  //debugger;
  const [activeTabID, setActiveTabID] = useState(1);
  const [globalMetricsOption, setGlobalMetricsOption] = useState({});
  const [systemMetricsOption, setSystemMetricsOption] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");
  const [selectedSystem, setSelectedSystem] = useState({});
  const [systemsList, setSystemsList] = useState([]);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [metricId, setMetricId] = useState(null);
  const [poolValue, setPoolValue] = useState([]);
  const [ethernetLineName, setEthernetLineName] = useState("");
  const uniqueId = getParametersFromLocalStorage("uniqueid");
  // before unload state
  const [hasSomeChanges, setHasSomeChanges] = useState(false);
  const [allPools, setAllPools] = useState([]);
  const [allCPU, setAllCPU] = useState(null);
  const [allDisk, setAllDisk] = useState(null);
  const [allMemory, setAllMemory] = useState(null);
  const [allOther, setAllOther] = useState(null);

  const toast = useRef(null);
  const dispatch = useDispatch();
  const curUser = getParametersFromLocalStorage("userID");
  useBeforeunload((event) => {
    if (hasSomeChanges) {
      event.preventDefault();
    }
  });
  useEffect(() => {
    if (activeTabID === 1) {
      fetchGlobalMetrics(curUser);
    }
  }, [activeTabID]);

  useEffect(() => {
    fetchAllSystems();
  }, []);

  useEffect(() => {
    checkCPU();
    checkDISK();
    checkMemory();
    checkOther();
  }, [systemMetricsOption]);

  useEffect(() => {
    if (activeTabID === 2 && selectedSystem && selectedSystem.id) {
      fetchSystemMetrics(selectedSystem.id, curUser);
    }
  }, [activeTabID, selectedSystem, selectedSystem.id]);

  const showError = () => {
    toast.current.show({
      severity: "error",
      summary: "Error Message",
      detail:
        "At least one of the metrics should be selected to view in the report section",
      life: 3000,
    });
  };

  const showSuccess = () => {
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "Metrics updated successfully",
      life: 3000,
    });
  };

  const checkExSummary = (type) => {
    let ExSummary = true;
    const exs = type["executing_summary"];
    const op = Object.keys(type)
      .filter(function (value) {
        return value !== "top_jobs_utilisation";
      })
      .filter(function (value) {
        return value !== "system_specifications";
      })
      .filter(function (value) {
        return value !== "executing_summary";
      });
    if (type === globalMetricsOption) {
      const isSelected = op.filter((item) => type[item] === true);
      if (
        exs === false &&
        type["top_jobs_utilisation"] === false &&
        type["system_specifications"] === false &&
        isSelected.length === 0
      ) {
        ExSummary = false;
      }
      if (
        exs === false &&
        (type["top_jobs_utilisation"] || type["system_specifications"]) &&
        isSelected.length === 0
      ) {
        ExSummary = true;
      }
      if (exs && isSelected.length === 0) {
        ExSummary = false;
      }
    } else {
      const isSelected = op.filter(
        (item) => type[item] === true || type[item] === false
      ).length;
      if (
        (exs === null || exs === false) &&
        (type["top_jobs_utilisation"] || type["system_specifications"]) &&
        isSelected === 0
      ) {
        ExSummary = true;
      }
      if (exs === true && isSelected === 0) {
        ExSummary = false;
      }
    }
    return ExSummary;
  };

  const fetchAllPools = async (id) => {
    try {
      const response = await getPoolsList(id);
      let pools = [];
      if (response.status === 200) {
        const data = response.data || [];
        data.map((data, idx) => {
          if (data["active"]) {
            pools.push(data.value);
          }
        });
        setAllPools(data);
        setPoolValue(pools);
      }
    } catch (error) {}
  };

  const fetchAllPoolsSys = async (sysID, metricID) => {
    try {
      const response = await getPoolsListSys(sysID, metricID);
      let pools = [];
      if (response.status === 200) {
        const data = response.data || [];
        data.map((data, idx) => {
          if (data["active"]) {
            pools.push(data.value);
          }
        });
        setAllPools(data);
        setPoolValue(pools);
      }
    } catch (error) {}
  };

  const fetchGlobalMetrics = async (curUser) => {
    try {
      setIsLoading(true);
      setIsError("");
      setMetricId(null);
      const response = await getGlobalMetrics(curUser);
      if (response.status === 200) {
        const data = response.data || {};
        setMetricId(data.metric_id);
        setGlobalMetricsOption(data.metrics_data || {});
        fetchAllPools(data.metric_id);
      }
    } catch (error) {
      setIsError("Something went Wrong!");
    } finally {
      setIsLoading(false);
    }
  };
  const fetchSystemMetrics = async (sysID, userID) => {
    try {
      setIsLoading(true);
      setIsError("");
      setMetricId(null);
      const response = await getSystemMetrics(sysID, userID);
      if (response.status === 200) {
        const data = response.data || {};
        setMetricId(data.metric_id);
        setSystemMetricsOption(data.metrics_data || {});
        fetchAllPoolsSys(sysID, data.metric_id);
      }
    } catch (error) {
      setIsError(error.message || "Something went Wrong!");
    } finally {
      setIsLoading(false);
    }
  };
  const fetchAllSystems = async () => {
    try {
      const response = await getAllSystems();
      if (response.status === 200) {
        const data = response.data || [];
        if (data.length) {
          setSystemsList(data);
          setSelectedSystem(data[0]);
        }
      }
    } catch (error) {}
  };

  const confirmGlobalSaveHandler = async () => {
    const ExSummary = checkExSummary(globalMetricsOption);
    if (ExSummary !== false) {
      try {
        setUpdateLoading(true);
        const data = {
          system_id: null,
          user_id: curUser,
          metrics_data: { ...globalMetricsOption, cache_hit_perc: false },
          pool: poolValue.join(","),
        };
        const response = await updateGlobalMetrics(metricId, data);
        if (response.status === 200) {
          setHasSomeChanges(false);
          showSuccess();
          fetchGlobalMetrics(curUser);
          dispatch(globalMetrics(data));
        }
      } catch (error) {
      } finally {
        setUpdateLoading(false);
      }
    } else {
      showError();
    }
  };
  const confirmSystemSaveHandler = async () => {
    const ExSummary = checkExSummary(systemMetricsOption);
    if (ExSummary !== false) {
      try {
        setUpdateLoading(true);
        const data = {
          system_id: selectedSystem.id,
          user_id: curUser,
          metrics_data: { ...systemMetricsOption, cache_hit_perc: false },
          pool: poolValue.join(","),
        };
        const response = await updateSystemMetrics(metricId, data);
        if (response.status === 200) {
          setHasSomeChanges(false);
          showSuccess();
          fetchSystemMetrics(selectedSystem.id, curUser);
          setHasSomeChanges(false);
        }
      } catch (error) {
      } finally {
        setUpdateLoading(false);
      }
    } else {
      showError();
    }
  };

  const handleGlobalOptionChange = (e) => {
    const name = e.target.name;
    const checked = e.target.checked;
    setHasSomeChanges(true);
    if (name === "allcpu") {
      let res = {};
      CPU.forEach((item) => {
        res[item.key] = checked;
      });
      setGlobalMetricsOption({ ...globalMetricsOption, ...res });
    } else if (name === "alldisk") {
      let res = {};
      Disk.forEach((item) => {
        res[item.key] = checked;
      });
      setGlobalMetricsOption({ ...globalMetricsOption, ...res });
    } else if (name === "allmemory") {
      let res = {};
      Memory.forEach((item) => {
        res[item.key] = checked;
      });
      setGlobalMetricsOption({ ...globalMetricsOption, ...res });
    } else if (name === "allother") {
      let res = {};
      Other.forEach((item) => {
        res[item.key] = checked;
      });
      setGlobalMetricsOption({ ...globalMetricsOption, ...res });
    } else {
      setGlobalMetricsOption({ ...globalMetricsOption, [name]: checked });
    }
  };
  const checkCPU = () => {
    const CPULen = CPU.length;
    const isTrue = CPU.filter(
      (item) => systemMetricsOption[item.key] === true
    ).length;
    const isFalse = CPU.filter(
      (item) => systemMetricsOption[item.key] === false
    ).length;
    const isNull = CPU.filter(
      (item) => systemMetricsOption[item.key] === null
    ).length;
    if (isTrue === CPULen) {
      setAllCPU(true);
    }
    if (isFalse === CPULen) {
      setAllCPU(false);
    }
    if (isNull === CPULen) {
      setAllCPU(null);
    }
  };

  const checkDISK = () => {
    const DiskLen = Disk.length;
    const isTrue = Disk.filter(
      (item) => systemMetricsOption[item.key] === true
    ).length;
    const isFalse = Disk.filter(
      (item) => systemMetricsOption[item.key] === false
    ).length;
    const isNull = Disk.filter(
      (item) => systemMetricsOption[item.key] === null
    ).length;
    if (isTrue === DiskLen) {
      setAllDisk(true);
    }
    if (isFalse === DiskLen) {
      setAllDisk(false);
    }
    if (isNull === DiskLen) {
      setAllDisk(null);
    }
  };

  const checkMemory = () => {
    const MemoryLen = Memory.length;
    const isTrue = Memory.filter(
      (item) => systemMetricsOption[item.key] === true
    ).length;
    const isFalse = Memory.filter(
      (item) => systemMetricsOption[item.key] === false
    ).length;
    const isNull = Memory.filter(
      (item) => systemMetricsOption[item.key] === null
    ).length;
    if (isTrue === MemoryLen) {
      setAllMemory(true);
    }
    if (isFalse === MemoryLen) {
      setAllMemory(false);
    }
    if (isNull === MemoryLen) {
      setAllMemory(null);
    }
  };

  const checkOther = () => {
    const OtherLen = Other.length;
    const isTrue = Other.filter(
      (item) => systemMetricsOption[item.key] === true
    ).length;
    const isFalse = Other.filter(
      (item) => systemMetricsOption[item.key] === false
    ).length;
    const isNull = Other.filter(
      (item) => systemMetricsOption[item.key] === null
    ).length;
    if (isTrue === OtherLen) {
      setAllOther(true);
    }
    if (isFalse === OtherLen) {
      setAllOther(false);
    }
    if (isNull === OtherLen) {
      setAllOther(null);
    }
  };
  const handleSystemOptionChange = (e) => {
    //debugger;
    const name = e.target.id;
    const checked = e.target.value;
    setHasSomeChanges(true);
    if (name === "allcpu") {
      let res = {};
      CPU.forEach((item) => {
        res[item.key] = checked;
      });
      setSystemMetricsOption({ ...systemMetricsOption, ...res });
      setAllCPU(checked);
    } else if (name === "alldisk") {
      let res = {};
      Disk.forEach((item) => {
        res[item.key] = checked;
      });
      setSystemMetricsOption({ ...systemMetricsOption, ...res });
      setAllDisk(checked);
    } else if (name === "allmemory") {
      let res = {};
      Memory.forEach((item) => {
        res[item.key] = checked;
      });
      setSystemMetricsOption({ ...systemMetricsOption, ...res });
      setAllMemory(checked);
    } else if (name === "allother") {
      let res = {};
      Other.forEach((item) => {
        res[item.key] = checked;
      });
      setSystemMetricsOption({ ...systemMetricsOption, ...res });
      setAllOther(checked);
    } else {
      setSystemMetricsOption({ ...systemMetricsOption, [name]: checked });
    }
  };

  const systemOptionTemplate = (option) => {
    return (
      <div className="value-options">
        {option.entity_name} - {option.entity_description} -{" "}
        {option.entity_data.frame.serial_number}
      </div>
    );
  };
  const selectedSystemTemplate = (option, props) => {
    if (option) {
      return (
        <div className="value-options">
          {option.entity_name} - {option.entity_description} -{" "}
          {option.entity_data.frame.serial_number}
        </div>
      );
    }
    return <span>{props.placeholder}</span>;
  };
  const renderFooter = (callback) => {
    return (
      <div>
        <button className="btn btn-custom" onClick={callback}>
          Close
        </button>
        <button className="btn btn-primary" onClick={callback}>
          Save
        </button>
      </div>
    );
  };

  const selectedPoolsTemplate = (option) => {
    if (option) {
      return (
        <div className="value-options">
          {option.label}
          <div>{option.value}</div>
        </div>
      );
    }

    return "Select Pool";
  };

  // useEffect(()=>{
  //   if(uniqueId?.data?.uniqueid){
  //     dispatch(deleteTemporaryReport({uniqueid:uniqueId.data.uniqueid}));
  //    }
  // },[])

  const KeyLabel = styled(Label)`
    margin-left: 5px;
    verticle-align: middle;
  `;
  return (
    <div className="setting-container">
      {/*<SectionHeader title={"Settings"} help="true" type="CORE-METRICS" />*/}
      <div className="setting-options-wrapper">
        <div className="setting-options">
          <Toast ref={toast} position="top-right" />
          <SettingHeader
            iconClass={"fa fa-calendar-check-o"}
            title={"Core Metrics"}
            subTitle={
              "Select the desired core metrics for historical reporting."
            }
            pLink={"/defaultcoremetrics-print"}
          />
          <div className="default-core-metrics" id="printableArea">
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={activeTabID === 1 ? "active" : ""}
                  onClick={() => setActiveTabID(1)}
                >
                  Default Metrics
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={activeTabID === 2 ? "active" : ""}
                  onClick={() => setActiveTabID(2)}
                >
                  System Metrics Override
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={String(activeTabID)}>
              <TabPane tabId="1">
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
                          <FormGroup check>
                            <Input
                              type="checkbox"
                              name={"allcpu"}
                              checked={
                                CPU.filter(
                                  (item) =>
                                    globalMetricsOption[item.key] !== true
                                ).length < 1
                              }
                              onChange={(e) => handleGlobalOptionChange(e)}
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
                                checked={globalMetricsOption[item.key]}
                                onChange={(e) => handleGlobalOptionChange(e)}
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
                          <FormGroup check>
                            <Input
                              type="checkbox"
                              name={"alldisk"}
                              checked={
                                Disk.filter(
                                  (item) =>
                                    globalMetricsOption[item.key] !== true
                                ).length < 1
                              }
                              onChange={(e) => handleGlobalOptionChange(e)}
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
                                checked={globalMetricsOption[item.key]}
                                onChange={(e) => handleGlobalOptionChange(e)}
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
                          <FormGroup check>
                            <Input
                              type="checkbox"
                              name={"allmemory"}
                              checked={
                                Memory.filter(
                                  (item) =>
                                    globalMetricsOption[item.key] !== true
                                ).length < 1
                              }
                              onChange={(e) => handleGlobalOptionChange(e)}
                            />
                            <Label check for="cpu_utilization">
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
                                  checked={globalMetricsOption[item.key]}
                                  onChange={(e) => handleGlobalOptionChange(e)}
                                />
                                <Label check for="cpu_utilization">
                                  {item.name}
                                </Label>
                              </FormGroup>
                              {item.key === "pool_faulting_rate" &&
                                globalMetricsOption["pool_faulting_rate"] && (
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
                          <FormGroup check>
                            <Input
                              type="checkbox"
                              name={"allother"}
                              checked={
                                Other.filter(
                                  (item) =>
                                    globalMetricsOption[item.key] !== true
                                ).length < 1
                              }
                              onChange={(e) => handleGlobalOptionChange(e)}
                            />
                            <Label check for="cpu_utilization">
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
                                  checked={globalMetricsOption[item.key]}
                                  onChange={(e) => handleGlobalOptionChange(e)}
                                />
                                <Label check for="cpu_utilization">
                                  {item.name}
                                </Label>
                              </FormGroup>
                              {item.key === "ethernet_line_utilization" &&
                                globalMetricsOption[
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
                <div className="custom-tooltip">
                  <i
                    className="pi pi-info-circle"
                    tooltip="A Disabled Button"
                  ></i>{" "}
                  <span>
                    At least one of the metric should be selected to view in the
                    report section.
                  </span>
                </div>
                <button
                  className="btn btn-primary"
                  style={{ marginLeft: "auto" }}
                  onClick={confirmGlobalSaveHandler}
                >
                  Confirm and Save Changes
                </button>
              </TabPane>
              <TabPane tabId="2">
                <div className="system-option">
                  <Dropdown
                    value={selectedSystem}
                    options={systemsList}
                    onChange={(e) => setSelectedSystem(e.value)}
                    optionLabel="name"
                    filter
                    filterBy="entity_name"
                    placeholder="Select a System"
                    valueTemplate={selectedSystemTemplate}
                    itemTemplate={systemOptionTemplate}
                  />
                </div>
                <div className="metrics_options_container">
                  {isLoading ? (
                    <Loading />
                  ) : isError ? (
                    <Error error={isError} />
                  ) : isError ? (
                    <Error error={isError} />
                  ) : (
                    <Fragment>
                      <div className="metric_options">
                        <div className="metric_header">
                          <FormGroup check>
                            <TriStateCheckbox
                              id={"allcpu"}
                              value={allCPU}
                              onChange={(e) => handleSystemOptionChange(e)}
                            />
                            <KeyLabel check for="alllcpu">
                              CPU
                            </KeyLabel>
                          </FormGroup>{" "}
                        </div>
                        <div className="metric_body">
                          {CPU.map((item, index) => (
                            <FormGroup check key={item.id}>
                              <TriStateCheckbox
                                id={item.key}
                                key={`${item.key}_${index}`}
                                value={systemMetricsOption[item.key]}
                                onChange={(e) => handleSystemOptionChange(e)}
                              />
                              <KeyLabel check htmlFor={item.key} key={item.key}>
                                {item.name}
                              </KeyLabel>
                            </FormGroup>
                          ))}
                        </div>
                      </div>
                      <div className="metric_options">
                        <div className="metric_header">
                          <FormGroup check>
                            <TriStateCheckbox
                              id={"alldisk"}
                              value={allDisk}
                              onChange={(e) => handleSystemOptionChange(e)}
                            />
                            <KeyLabel check for="alldisk">
                              Disk
                            </KeyLabel>
                          </FormGroup>
                        </div>
                        <div className="metric_body">
                          {Disk.map((item, index) => (
                            <FormGroup check key={item.id}>
                              <TriStateCheckbox
                                id={item.key}
                                key={`${item.key}_${index}`}
                                value={systemMetricsOption[item.key]}
                                onChange={(e) => handleSystemOptionChange(e)}
                              />
                              <KeyLabel check for={item.key}>
                                {item.name}
                              </KeyLabel>
                            </FormGroup>
                          ))}
                        </div>
                      </div>
                      <div className="metric_options">
                        <div className="metric_header">
                          <FormGroup check>
                            <TriStateCheckbox
                              id={"allmemory"}
                              value={allMemory}
                              onChange={(e) => handleSystemOptionChange(e)}
                            />
                            <KeyLabel check for="allmemory">
                              Memory
                            </KeyLabel>
                          </FormGroup>
                        </div>
                        <div className="metric_body">
                          {Memory.map((item, index) => (
                            <Fragment>
                              <FormGroup check key={item.id}>
                                <TriStateCheckbox
                                  id={item.key}
                                  key={`${item.key}_${index}`}
                                  value={systemMetricsOption[item.key]}
                                  onChange={(e) => handleSystemOptionChange(e)}
                                />
                                <KeyLabel check for={item.key}>
                                  {item.name}
                                </KeyLabel>
                              </FormGroup>
                              {item.key === "pool_faulting_rate" &&
                                systemMetricsOption["pool_faulting_rate"] && (
                                  <div
                                    className="form-group"
                                    style={{ textAlign: "left" }}
                                  >
                                    <label className="label">Pool Number</label>
                                    {/* system level pool dropdown */}
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
                          <FormGroup check>
                            <TriStateCheckbox
                              id={"allother"}
                              value={allOther}
                              onChange={(e) => handleSystemOptionChange(e)}
                            />
                            <KeyLabel check for="allother">
                              Other
                            </KeyLabel>
                          </FormGroup>
                        </div>
                        <div className="metric_body">
                          {Other.map((item, index) => (
                            <Fragment>
                              <FormGroup check key={item.id}>
                                <TriStateCheckbox
                                  id={item.key}
                                  key={`${item.key}_${index}`}
                                  value={systemMetricsOption[item.key]}
                                  onChange={(e) => handleSystemOptionChange(e)}
                                />
                                <KeyLabel check for={item.key}>
                                  {item.name}
                                </KeyLabel>
                              </FormGroup>
                              {item.key === "ethernet_line_utilization" &&
                                systemMetricsOption[
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
                <div className="custom-tooltip">
                  <i
                    className="pi pi-info-circle"
                    tooltip="A Disabled Button"
                  ></i>{" "}
                  <span>
                    At least one of the metric should be selected to view in the
                    report section.
                  </span>
                </div>
                <button
                  className="btn btn-primary"
                  style={{ marginLeft: "auto" }}
                  onClick={confirmSystemSaveHandler}
                >
                  Confirm and Save Changes
                </button>
              </TabPane>
            </TabContent>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DefaultCoreMetrics;
