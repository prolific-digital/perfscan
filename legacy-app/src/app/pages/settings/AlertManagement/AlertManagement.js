import React, { useEffect, useState } from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import SettingHeader from "../SettingHeader";
import moment from "moment";
import {
  getAllSystems,
  getGlobalPerformanceGuide,
  getMKeys,
  getSystemPerformanceGuide,
  updateGlobalPerformanceGuide,
} from "../../../../services/apiService";
import Loading from "../../../components/Loading";
import { Modal, ModalHeader, ModalFooter, Button } from "reactstrap";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { confirmDialog } from "primereact/confirmdialog";
import { getParametersFromLocalStorage } from "../../../../helpers/commonHelper";
import { fetchExistingReportsButtonsData } from "../../../../store/slices/reports";
import {
  deleteReport,
  updateReportData,
} from "../../../../services/apiService";
import { Toast } from "primereact/toast";
import { deleteTemporaryReport } from "../../../../store/slices/reports/SaveNewReport/SaveNewReport";
import { Checkbox } from "primereact/checkbox";
import { Dropdown } from "primereact/dropdown";
import { useNavigate } from "react-router-dom";
import { Row } from "primereact/row";
import { ColumnGroup } from "primereact/columngroup";
import { FilterMatchMode } from "primereact/api";

function AlertManagement() {
  const [activeTabID, setActiveTabID] = useState(1);
  const [selectedSystem, setSelectedSystem] = useState({});
  const [globalGuidelinesData, setGlobalGuidelinesData] = useState([]);
  const [systemGuidelinesData, setSystemGuidelinesData] = useState([]);
  const [globalFilterValue1, setGlobalFilterValue1] = useState("");
  const [loading, setLoading] = useState(false);
  const [alertCheck, setAlertCheck] = useState(false);
  const [notificationCheck, setNotificationCheck] = useState(false);
  const [systemsList, setSystemsList] = useState([]);
  const [metricsKeysData, setMetricsKeysData] = useState([]);
  const curUser = getParametersFromLocalStorage("userID");
  const uniqueId = getParametersFromLocalStorage("uniqueid");
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [filters1] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

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
        onChange={(e) => setState(e.checked)}
      />
    );
  };

  const getActiveTab = (tab) => {
    setActiveTabID(tab);
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

  const renderHeader = () => {
    return (
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <input
          type="search"
          style={{ maxWidth: "15rem" }}
          value={globalFilterValue1}
          onChange={(e) => onGlobalFilterChange1(e)}
          placeholder="Enter your search key word"
          className="form-control"
        />
      </div>
    );
  };

  const confirm = (id) => {
    confirmDialog({
      message: "Are you sure you want to Delete this system?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => removeSystem(id),
      reject: () => {},
    });
  };

  const onGlobalFilterChange1 = (e) => {
    const value = e.target.value;
    let _filters1 = { ...filters1 };
    _filters1["global"].value = value;

    setGlobalFilterValue1(value);
  };

  const removeSystem = async (id) => {
    // try {
    //   setIsloading(true);
    //   let response = await deleteSystem(id);
    //   if (response.status === 200) {
    //     fetchAllSystems();
    //   }
    // } catch (error) {
    //   setIsError("Something went wrong!! Please try again later");
    // } finally {
    //   setIsloading(false);
    // }
    return;
  };

  const header = renderHeader();

  let headerGroup = (
    <ColumnGroup>
      <Row>
        <Column header="" colSpan={2} />
        <Column header="Action" colSpan={4} />
        <Column header="" colSpan={2} />
      </Row>
      <Row>
        <Column
          // field={({ metric_name }) => renderMetricName(metric_name)}
          header="Company"
          style={{ width: "20%" }}
        />
        <Column
          // field="warning"
          header="Recipient"
          className="grey"
          editor={(options) => textEditor(options)}
          style={{ width: "15%" }}
        />

        <Column
          // field="critical"
          header="Email"
          className="grey"
          editor={(options) => textEditor(options)}
          style={{ width: "10%" }}
        />
        <Column
          // field="critical"
          header="SMS"
          className="grey"
          editor={(options) => textEditor(options)}
          style={{ width: "10%" }}
        />
        <Column
          // field="critical"
          header="Voice"
          className="grey"
          editor={(options) => textEditor(options)}
          style={{ width: "10%" }}
        />
        <Column
          // field="system_id"
          header="Push"
          className="grey"
          editor={(options) => checkBox(options, alertCheck, setAlertCheck)}
          style={{ width: "10%" }}
        />
        <Column
          // field="critical"
          header="Metrics"
          className="grey"
          editor={(options) =>
            checkBox(options, notificationCheck, setNotificationCheck)
          }
          style={{ width: "20%" }}
        />
        <Column
          header="Actions"
          rowEditor
          headerStyle={{ width: "20%", minWidth: "8rem" }}
          bodyStyle={{ textAlign: "center" }}
        />
      </Row>
    </ColumnGroup>
  );

  return (
    <div className="setting-options change-events">
      <SettingHeader
        iconClass={"fa fa-line-chart"}
        title={"Alert Managements"}
        subTitle={"Manage Alerts Notifications"}
        pLink={true}
        showAlertButtons={true}
        getActiveTab={getActiveTab}
        activeTabID={activeTabID}
      />
      <div className="manage-systems-wrapper">
        <TabContent activeTab={String(activeTabID)}>
          <TabPane tabId="1">
            <div className="metrics_options_container no-border">
              {loading ? (
                <Loading />
              ) : (
                <>
                  <DataTable
                    //   value={globalGuidelinesData}
                    editMode="row"
                    showGridlines
                    rows={10}
                    paginator
                    dataKey="id"
                    onRowEditComplete={(e) => onRowEditGuidelines(e, "global")}
                    responsiveLayout="scroll"
                    header={header}
                    headerColumnGroup={headerGroup}
                    emptyMessage="No System Found"
                  >
                    <Column field={({ entity_name }) => entity_name} />
                    <Column
                    // field="warning"
                    />

                    <Column
                    // field="critical"
                    />
                    <Column
                    // field="system_id"
                    />
                    <Column
                    // field="system_id"
                    />
                    <Column
                    // field="system_id"
                    />
                    <Column
                    // field="system_id"
                    />
                    <Column
                    // field="critical"
                    />
                  </DataTable>
                </>
              )}
            </div>
          </TabPane>
          <TabPane tabId="2">
            <div className="add-systems">
              <div
                className="form-options alert_updated_form_options"
                style={{ flexDirection: "column", margin: "1rem" }}
              >
                <label className="label alert_label">Threshold Rules</label>
                <div
                  className="form_group alert_updated_form_group"
                  style={{ marginTop: "0.4rem" }}
                >
                  <label className="label">Alert Frequency(1-10)</label>
                  <input
                    type="text"
                    name="frame_cpw"
                    disabled
                    // value={defaultOptions.frame_cpw}
                    className="form-control alert_inputs"
                    placeholder={"Select"}
                    // onChange={(e) => handleDefaultOptionChange(e)}
                  />
                </div>
                <div
                  className="form_group alert_updated_form_group"
                  style={{ marginTop: "1rem" }}
                >
                  <label className="label">Time Range in Minutes(1-40)</label>
                  <input
                    type="text"
                    name="frame_cpw"
                    disabled
                    // value={defaultOptions.frame_cpw}
                    className="form-control alert_inputs"
                    placeholder={"Select"}
                    // onChange={(e) => handleDefaultOptionChange(e)}
                  />
                </div>
              </div>
            </div>
          </TabPane>
        </TabContent>
      </div>
    </div>
  );
}

export default AlertManagement;
