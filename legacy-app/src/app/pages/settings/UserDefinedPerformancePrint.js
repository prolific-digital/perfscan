import React, { useCallback, useEffect, useState } from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import {
  getAllSystems,
  getGlobalPerformanceGuide,
  getMKeys,
  getSystemPerformanceGuide,
  updateGlobalPerformanceGuide,
} from "../../../services/apiService";
import Loading from "../../components/Loading";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { getParametersFromLocalStorage } from "../../../helpers/commonHelper";

function UserDefinedPerformancePrint() {
  const [activeTabID, setActiveTabID] = useState(1);
  const [activeTabID2, setActiveTabID2] = useState(2);
  const [selectedSystem, setSelectedSystem] = useState({});
  const [globalGuidelinesData, setGlobalGuidelinesData] = useState([]);
  const [systemGuidelinesData, setSystemGuidelinesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [systemsList, setSystemsList] = useState([]);
  const [metricsKeysData, setMetricsKeysData] = useState([]);
  const curUser = getParametersFromLocalStorage("userID");

  useEffect(() => {
    fetchMKeys();
    fetchGlobalPerformanceGuide(curUser);
    fetchAllSystems();
  }, [activeTabID]);

  useEffect(() => {
    if (activeTabID2 === 2 && selectedSystem.length) {
      for (let ele of selectedSystem) {
        fetchSystemPerformanceGuide(ele.id,curUser);
      }
    }
  }, [activeTabID2, selectedSystem.length]);


  const fetchMKeys = async () => {
    try {
      const response = await getMKeys();
      if (response.status === 200) {
        const data = response.data.metrics_key_data || [];
        setMetricsKeysData(data);
      }
    } catch (error) {}
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

  const fetchGlobalPerformanceGuide = async (userID) => {
    try {
      setLoading(true);
      const response = await getGlobalPerformanceGuide(userID);
      if (response.status === 200) {
        const data = response.data || [];
        setGlobalGuidelinesData(data);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const fetchSystemPerformanceGuide = async (sysID , curUser) => {
    try {
      setLoading(true);
      const response = await getSystemPerformanceGuide(sysID , curUser);

      if (response.status === 200) {
        const data = response.data || [];
        setSystemGuidelinesData((preVal) => {
          if (sysID) {
            return [...preVal, ...data];
          }
        });
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const updatePerformanceGuide = async (metricId, body, type, systemID) => {
    try {
      const response = await updateGlobalPerformanceGuide(metricId, body);
      if (response.status === 200) {
        if (type === "global") {
          fetchGlobalPerformanceGuide(curUser);
        } else {
          fetchSystemPerformanceGuide(systemID,curUser);
        }
      }
    } catch (error) {}
  };

  const onRowEditGuidelines = (e, type) => {
    let { newData } = e;
    const { metrics_config_id, ...rest } = newData;
    updatePerformanceGuide(metrics_config_id, rest, type, rest.system_id);
  };

  const textEditor = (options) => {
    return (
      <InputText
        type="number"
        value={options.value}
        style={{ textAlign: "center" }}
        onChange={(e) => options.editorCallback(e.target.value)}
      />
    );
  };

  // edit table end
  const renderMetricName = (key) => {
    const matchedDatawithKey = metricsKeysData.find(
      (item) => item.data_field === key
    );
    return matchedDatawithKey?.display_value || key;
  };

  const dataStateHandler = () => {
    if (loading) {
      return <Loading />;
    }
    return false;
  };

  const systemPerformanceHandler = useCallback(
    (systemOptions, systemId) => {
      const currentSystem = systemOptions.filter(
        (systemOption) => systemOption.system_id == systemId
      );
      return (
        <>
          <DataTable
            value={currentSystem}
            editMode="row"
            dataKey="id"
            onRowEditComplete={(e) => onRowEditGuidelines(e, "system")}
            responsiveLayout="scroll"
          >
            <Column
              field={({ metric_name }) => renderMetricName(metric_name)}
              header="Core Metrics"
              style={{ width: "40%" }}
            ></Column>
            <Column
              field="warning"
              header="Warning"
              className="grey"
              editor={(options) => textEditor(options)}
              style={{ width: "20%" }}
            ></Column>

            <Column
              field="critical"
              header="Critical"
              className="grey"
              editor={(options) => textEditor(options)}
              style={{ width: "20%" }}
            ></Column>
          </DataTable>
        </>
      );
    },
    [systemGuidelinesData]
  );

  return (
    <div className="setting-options change-events">
      <div className="default-core-metrics">
        <Nav tabs>
          <NavItem>
            <NavLink className="active">Global Performance Guidelines</NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={String(1)}>
          <TabPane tabId="1">
            <div className="metrics_options_container no-border">
              {loading ? (
                <Loading />
              ) : (
                <DataTable
                  value={globalGuidelinesData}
                  editMode="row"
                  dataKey="id"
                  onRowEditComplete={(e) => onRowEditGuidelines(e, "global")}
                  responsiveLayout="scroll"
                >
                  <Column
                    field={({ metric_name }) => renderMetricName(metric_name)}
                    header="Core Metrics"
                    style={{ width: "40%" }}
                  ></Column>
                  <Column
                    field="warning"
                    header="Warning"
                    className="grey"
                    editor={(options) => textEditor(options)}
                    style={{ width: "20%" }}
                  ></Column>

                  <Column
                    field="critical"
                    header="Critical"
                    className="grey"
                    editor={(options) => textEditor(options)}
                    style={{ width: "20%" }}
                  ></Column>
                </DataTable>
              )}
            </div>
          </TabPane>
        </TabContent>
        <Nav tabs>
          <NavItem>
            <NavLink className="active">System Performance Guidelines</NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={String(2)}>
          <TabPane tabId="2">
            {systemsList.map((system) => {
              return (
                <>
                  <div className="system-option">
                    <h4>
                      {system.entity_name} {system.entity_description}{" "}
                      {system.entity_data.serial}
                    </h4>
                  </div>
                  <div className="metrics_options_container no-border">
                    {
                      dataStateHandler() ||
                        systemPerformanceHandler(
                          systemGuidelinesData,
                          system.id
                        )
                      // <DataTable
                      //   value={systemGuidelinesData}
                      //   editMode="row"
                      //   dataKey="id"
                      //   onRowEditComplete={(e) =>
                      //     onRowEditGuidelines(e, "system")
                      //   }
                      //   responsiveLayout="scroll"
                      // >
                      //   <Column
                      //     field={({ metric_name }) =>
                      //       renderMetricName(metric_name)
                      //     }
                      //     header="Core Metrics"
                      //     style={{ width: "40%" }}
                      //   ></Column>
                      //   <Column
                      //     field="warning"
                      //     header="Warning"
                      //     className="grey"
                      //     editor={(options) => textEditor(options)}
                      //     style={{ width: "20%" }}
                      //   ></Column>

                      //   <Column
                      //     field="critical"
                      //     header="Critical"
                      //     className="grey"
                      //     editor={(options) => textEditor(options)}
                      //     style={{ width: "20%" }}
                      //   ></Column>
                      // </DataTable>
                    }
                  </div>
                </>
              );
            })}
          </TabPane>
        </TabContent>
      </div>
    </div>
  );
}

export default UserDefinedPerformancePrint;
