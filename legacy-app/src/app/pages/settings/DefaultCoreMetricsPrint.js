import React, { Fragment, useEffect, useState, useRef } from "react";
import {
  Nav,
  NavItem,
  NavLink,
  FormGroup,
  Label,
  TabContent,
  TabPane,
} from "reactstrap";
import { MultiSelect } from "primereact/multiselect";
import { useBeforeunload } from "react-beforeunload";
import { CPU, Disk, Memory, Other } from "../../../typeCodes";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
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
import { useCallback } from "react";

function DefaultCoreMetricsPrint() {
  const [activeTabID, setActiveTabID] = useState(1);
  const [activeTabID2, setActiveTabID2] = useState(2);
  const [globalMetricsOption, setGlobalMetricsOption] = useState({});
  const [systemMetricsOption, setSystemMetricsOption] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");
  const [selectedSystem, setSelectedSystem] = useState({});
  const [systemsList, setSystemsList] = useState([]);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [metricId, setMetricId] = useState(null);
  const [poolValue, setPoolValue] = useState([]);
  const [poolValueGlobal, setPoolValueGlobal] = useState([]);
  const [ethernetLineName, setEthernetLineName] = useState("");
  // before unload state
  const [hasSomeChanges, setHasSomeChanges] = useState(false);
  const [allPools, setAllPools] = useState([]);
  const [globalPool, setGlobalPool] = useState([]);
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
    // if (activeTabID2 === 2) {
    fetchGlobalMetrics();
    // }
  }, []);

  useEffect(() => {
    fetchAllSystems();
    //fetchAllPools(metricId);
  }, []);

  useEffect(() => {
    if (activeTabID2 === 2 && selectedSystem.length) {
      for (let ele of selectedSystem) {
        fetchSystemMetrics(ele.id);
      }
    }
  }, [activeTabID2, selectedSystem.length]);

  useEffect(() => {
    checkCPU();
    checkDISK();
    checkMemory();
    checkOther();
  }, [systemMetricsOption]);

  const showError = () => {
    toast.current.show({
      severity: "error",
      summary: "Error Message",
      detail: "Please select at least one metrics for charts",
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
        setGlobalPool(data);
        setPoolValueGlobal(pools);
      }
    } catch (error) {}
  };

  const fetchAllPoolsSys = useCallback(
    async (sysID, metricID) => {
      try {
        const response = await getPoolsListSys(sysID, metricID);
        let pools = [];
        if (response.status === 200) {
          const data = response.data || [];
          data.map((ele, idx) => {
            if (ele["active"]) {
              setAllPools((preVal) => {
                if (sysID) {
                  return [...preVal, { ...ele, sysID }];
                }
              });
              pools.push(data.value);
            }
          });
          setPoolValue(pools);
        }
      } catch (error) {}
    },
    [allPools.length]
  );

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
        setSystemMetricsOption(
          ((preVal) => {
            if (sysID) {
              return [...preVal, { ...data.metrics_data, sysID }];
            }
          }) || {}
        );
        fetchAllPoolsSys(sysID, data?.metric_id);
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
          setSelectedSystem(data);
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
          user_id: 1,
          metrics_data: globalMetricsOption,
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
          user_id: 1,
          metrics_data: systemMetricsOption,
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
        {option.entity_data.serial}
      </div>
    );
  };
  const selectedSystemTemplate = (option, props) => {
    if (option) {
      return (
        <div className="value-options">
          {option.entity_name} - {option.entity_description} -{" "}
          {option.entity_data.serial}
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

  const dataStateHandler = () => {
    if (isLoading) {
      return <Loading />;
    }
    if (isError) {
      return <Error error={isError} />;
    }
    return false;
  };

  const systemMetricItemRenderer = useCallback(
    (systemOptions, systemID, systemMetric, allPools) => {
      const currentSystem = systemOptions?.find(
        (systemOption) => systemOption.sysID === systemID
      );
      if (allPools.length) {
        const poolFiltering = allPools.filter(
          (poolData) => poolData.sysID == systemID
        );
      }
      if (!currentSystem) {
        return null;
      }
      return (
        <div className="metric_body">
          {systemMetric.map((item) => (
            <>
              <FormGroup check key={item.id}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <KeyLabel check htmlFor={item.key} key={item.key}>
                    {item.name}
                  </KeyLabel>
                  <KeyLabel>
                    {currentSystem[item.key] ? (
                      <i className="pi pi-check"></i>
                    ) : (
                      <i className="pi pi-times"></i>
                    )}
                  </KeyLabel>
                </div>
              </FormGroup>
              {item.key === "pool_faulting_rate" &&
                currentSystem["pool_faulting_rate"] && (
                  <div className="form-group" style={{ textAlign: "left" }}>
                    <label className="label">Pool Number</label>
                    <MultiSelect
                      disabled
                      value={poolValue}
                      options={allPools?.value}
                      // onChange={(e) => setPoolValue(e.value)}
                      optionLabel="name"
                      placeholder="Select pool"
                      maxSelectedLabels={3}
                    />
                  </div>
                )}
            </>
          ))}
        </div>
      );
    },
    [poolValue]
  );

  const KeyLabel = styled(Label)`
    margin-left: 5px;
    verticle-align: middle;
  `;
  return (
    <div className="setting-options">
      <Toast ref={toast} position="top-right" />
      {/* <SettingHeader
        iconClass={"fa fa-calendar-check-o"}
        title={"Core Metrics"}
        subTitle={"Select the desired core metrics for historical reporting."}
        printButton={printButton}
      /> */}
      <div className="default-core-metrics">
        <Nav tabs>
          <NavItem>
            <NavLink className={"active"}>Global Metrics</NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={String(1)}>
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
                    <div
                      className="metric_header"
                      style={{ textAlign: "center" }}
                    >
                      <FormGroup check style={{ paddingLeft: "0" }}>
                        <Label check for="cpu_utilization">
                          CPU
                        </Label>
                      </FormGroup>
                    </div>
                    <div className="metric_body">
                      {CPU.map((item, index) => (
                        <FormGroup check key={item.id}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <Label check for="cpu_utilization">
                              {item.name}
                            </Label>
                            <Label>
                              {globalMetricsOption[item.key] ? (
                                <i className="pi pi-check"></i>
                              ) : (
                                <i className="pi pi-times"></i>
                              )}
                            </Label>
                          </div>
                        </FormGroup>
                      ))}
                    </div>
                  </div>
                  <div className="metric_options">
                    <div className="metric_header">
                      <FormGroup check style={{ paddingLeft: "0" }}>
                        <Label check for="cpu_utilization">
                          Disk
                        </Label>
                      </FormGroup>
                    </div>
                    <div className="metric_body">
                      {Disk.map((item, index) => (
                        <FormGroup check key={item.id}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <Label check for="cpu_utilization">
                              {item.name}
                            </Label>
                            <Label>
                              {globalMetricsOption[item.key] ? (
                                <i className="pi pi-check"></i>
                              ) : (
                                <i className="pi pi-times"></i>
                              )}
                            </Label>
                          </div>
                        </FormGroup>
                      ))}
                    </div>
                  </div>
                  <div className="metric_options">
                    <div className="metric_header">
                      <FormGroup check style={{ paddingLeft: "0" }}>
                        <Label check for="cpu_utilization">
                          Memory
                        </Label>
                      </FormGroup>
                    </div>
                    <div className="metric_body">
                      {Memory.map((item, index) => (
                        <Fragment>
                          <FormGroup check key={item.id}>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <Label check for="cpu_utilization">
                                {item.name}
                              </Label>
                              <Label>
                                {globalMetricsOption[item.key] ? (
                                  <i className="pi pi-check"></i>
                                ) : (
                                  <i className="pi pi-times"></i>
                                )}
                              </Label>
                            </div>
                          </FormGroup>
                          {item.key === "pool_faulting_rate" &&
                            globalMetricsOption["pool_faulting_rate"] && (
                              <div
                                className="form-group"
                                style={{ textAlign: "left" }}
                              >
                                <label className="label">Pool Number</label>
                                <MultiSelect
                                  value={poolValueGlobal}
                                  options={globalPool}
                                  onChange={(e) => setPoolValue(e.value)}
                                  placeholder="Select pool"
                                  maxSelectedLabels={5}
                                  disabled
                                />
                              </div>
                            )}
                        </Fragment>
                      ))}
                    </div>
                  </div>
                  <div className="metric_options">
                    <div className="metric_header">
                      <FormGroup check style={{ paddingLeft: "0" }}>
                        <Label check for="cpu_utilization">
                          Other
                        </Label>
                      </FormGroup>
                    </div>
                    <div className="metric_body">
                      {Other.map((item, index) => (
                        <Fragment>
                          <FormGroup check key={item.id}>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <Label check for="cpu_utilization">
                                {item.name}
                              </Label>
                              <Label>
                                {globalMetricsOption[item.key] ? (
                                  <i className="pi pi-check"></i>
                                ) : (
                                  <i className="pi pi-times"></i>
                                )}
                              </Label>
                            </div>
                          </FormGroup>
                          {item.key === "ethernet_line_utilization" &&
                            globalMetricsOption[
                              "ethernet_line_utilization"
                            ] && (
                              <div className="form_group">
                                <input
                                  disabled
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
          </TabPane>
        </TabContent>
        <Nav tabs>
          <NavItem>
            <NavLink className={"active"}>System Metrics</NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={String(2)}>
          <TabPane tabId="2">
            <>
              {systemsList.map((system, index) => {
                return (
                  <div key={system.id}>
                    <h4>
                      {system.entity_name} {system.entity_description}{" "}
                      {system.entity_data.serial}
                    </h4>
                    <div className="metrics_options_container">
                      {dataStateHandler() || (
                        <Fragment>
                          <div className="metric_options">
                            <div className="metric_header">
                              <FormGroup check style={{ paddingLeft: "0" }}>
                                <KeyLabel check for="allcpu">
                                  CPU
                                </KeyLabel>
                              </FormGroup>{" "}
                            </div>
                            {systemMetricItemRenderer(
                              systemMetricsOption,
                              system.id,
                              CPU,
                              allPools
                            )}
                          </div>
                          <div className="metric_options">
                            <div className="metric_header">
                              <FormGroup check style={{ paddingLeft: "0" }}>
                                <KeyLabel check for="alldisk">
                                  Disk
                                </KeyLabel>
                              </FormGroup>
                            </div>
                            {systemMetricItemRenderer(
                              systemMetricsOption,
                              system.id,
                              Disk,
                              allPools
                            )}
                          </div>
                          <div className="metric_options">
                            <div className="metric_header">
                              <FormGroup check style={{ paddingLeft: "0" }}>
                                <KeyLabel check for="allmemory">
                                  Memory
                                </KeyLabel>
                              </FormGroup>
                            </div>
                            {systemMetricItemRenderer(
                              systemMetricsOption,
                              system.id,
                              Memory,
                              allPools
                            )}
                          </div>
                          <div className="metric_options">
                            <div className="metric_header">
                              <FormGroup check style={{ paddingLeft: "0" }}>
                                <KeyLabel check for="allother">
                                  Other
                                </KeyLabel>
                              </FormGroup>
                            </div>
                            {systemMetricItemRenderer(
                              systemMetricsOption,
                              system.id,
                              Other,
                              allPools
                            )}
                          </div>
                        </Fragment>
                      )}
                    </div>
                  </div>
                );
              })}
            </>
          </TabPane>
        </TabContent>
      </div>
    </div>
  );
}

export default DefaultCoreMetricsPrint;
