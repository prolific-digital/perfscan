import React, { useEffect, useState } from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import SettingHeader from "./SettingHeader";
import { Dropdown } from "primereact/dropdown";
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
import { Checkbox } from "primereact/checkbox";
import { useDispatch } from "react-redux";
import { classNames } from 'primereact/utils';
import { getParametersFromLocalStorage } from "../../../helpers/commonHelper";
import { deleteTemporaryReport } from "../../../store/slices/reports/SaveNewReport/SaveNewReport";

function UserDefinedPerformance() {
  const [activeTabID, setActiveTabID] = useState(1);
  const [selectedSystem, setSelectedSystem] = useState({});
  const [globalGuidelinesData, setGlobalGuidelinesData] = useState([]);
  const [systemGuidelinesData, setSystemGuidelinesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alertCheck, setAlertCheck] = useState(false)
  const [notificationCheck, setNotificationCheck] = useState(false)
  const [systemsList, setSystemsList] = useState([]);
  const [metricsKeysData, setMetricsKeysData] = useState([]);
  const curUser = getParametersFromLocalStorage("userID");
  const uniqueId = getParametersFromLocalStorage("uniqueid");
  const dispatch = useDispatch();

  useEffect(() => {
    fetchMKeys();
    fetchGlobalPerformanceGuide(curUser);
    fetchAllSystems();
  }, [activeTabID]);

  useEffect(() => {
    if (activeTabID === 2 && selectedSystem && selectedSystem.id) {
      fetchSystemPerformanceGuide(selectedSystem.id, curUser);
    }
  }, [activeTabID, selectedSystem]);

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
          setSelectedSystem(data[0]);
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
  const fetchSystemPerformanceGuide = async (sysID, userID) => {
    try {
      setLoading(true);
      const response = await getSystemPerformanceGuide(sysID, userID);

      if (response.status === 200) {
        const data = response.data || [];
        setSystemGuidelinesData(data);
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
          fetchSystemPerformanceGuide(systemID, curUser);
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

  const checkBox = (options, state, setState) => {
    return (
      <Checkbox
        type="checkbox"
        value={options.value}
        checked={state}
        style={{ textAlign: "center" }}
        onChange={e => setState(e.checked)}
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

  const verifiedBodyTemplate = (rowData) => {
    return <i className={classNames('pi', { 'text-green-500 pi-check-circle': rowData.verified, 'text-red-500 pi-times-circle': !rowData.verified })}></i>;
}

  // useEffect(()=>{
  //   if(uniqueId?.data?.uniqueid){
  //     dispatch(deleteTemporaryReport({uniqueid:uniqueId.data.uniqueid}));
  //    }
  // },[])

  return (
    <div className="setting-options change-events">
      <SettingHeader
        iconClass={"fa fa-line-chart"}
        title={"User Defined Performance Guidelines"}
        subTitle={"Enter the desired performance guidelines"}
        pLink={"/userdefinedperformance-print"}
      />
      <div className="default-core-metrics">
        <Nav tabs>
          <NavItem>
            <NavLink
              className={activeTabID === 1 ? "active" : ""}
              onClick={() => setActiveTabID(1)}
            >
              Default Performance Guidelines
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={activeTabID === 2 ? "active" : ""}
              onClick={() => setActiveTabID(2)}
            >
              System Performance Guidelines
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={String(activeTabID)}>
          <TabPane tabId="1">
            <div className="metrics_options_container no-border">
              {loading ? (
                <Loading />
              ) : (
                <DataTable
                  value={globalGuidelinesData}
                  editMode="row"
                  showGridlines
                  rows={10}
                  paginator
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
                  {/* <Column
                    field="system_id"
                    header="Alert"
                    className="grey"
                    dataType="boolean"
                    style={{ minWidth: '8rem' }} 
                    body={verifiedBodyTemplate}
                    editor={(options) => checkBox(options, alertCheck, setAlertCheck)}
                  ></Column>
                  <Column
                    field="system_id"
                    header="Notification"
                    className="grey"
                    dataType="boolean"
                    style={{ minWidth: '8rem' }} 
                    body={verifiedBodyTemplate}
                    editor={(options) => checkBox(options, notificationCheck, setNotificationCheck)}
                  ></Column> */}
                  <Column
                    header="Actions"
                    rowEditor
                    headerStyle={{ width: "20%", minWidth: "8rem" }}
                    bodyStyle={{ textAlign: "center" }}
                  ></Column>
                </DataTable>
              )}
            </div>
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
            <div className="metrics_options_container no-border">
              {loading ? (
                <Loading />
              ) : (
                <DataTable
                  value={systemGuidelinesData}
                  editMode="row"
                  showGridlines
                  dataKey="id"
                  rows={10}
                  paginator
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
                  {/* <Column
                    field="system_id"
                    header="Alert"
                    className="grey"
                    dataType="boolean"
                    style={{ minWidth: '8rem' }} 
                    body={verifiedBodyTemplate}
                    editor={(options) => checkBox(options, alertCheck, setAlertCheck)}
                  ></Column>
                  <Column
                    field="system_id"
                    header="Notification"
                    className="grey"
                    dataType="boolean"
                    style={{ minWidth: '8rem' }} 
                    body={verifiedBodyTemplate}
                    editor={(options) => checkBox(options, notificationCheck, setNotificationCheck)}
                  ></Column> */}
                  <Column
                    header="Actions"
                    rowEditor
                    headerStyle={{ width: "20%", minWidth: "8rem" }}
                    bodyStyle={{ textAlign: "center" }}
                  ></Column>
                </DataTable>
              )}
            </div>
          </TabPane>
        </TabContent>
      </div>
    </div>
  );
}

export default UserDefinedPerformance;
