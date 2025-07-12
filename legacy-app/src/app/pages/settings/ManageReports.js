import React, { useEffect, useState } from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import SettingHeader from "./SettingHeader";
import moment from "moment";
import {
  getAllSystems,
  getGlobalPerformanceGuide,
  getMKeys,
  getSystemPerformanceGuide,
  updateGlobalPerformanceGuide,
} from "../../../services/apiService";
import Loading from "../../components/Loading";
import { Modal, ModalHeader, ModalFooter, Button } from "reactstrap";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { confirmDialog } from "primereact/confirmdialog";
import { getParametersFromLocalStorage } from "../../../helpers/commonHelper";
import { fetchExistingReportsButtonsData } from "../../../store/slices/reports";
import { deleteReport, updateReportData } from "../../../services/apiService";
import { Toast } from "primereact/toast";
import { deleteTemporaryReport } from "../../../store/slices/reports/SaveNewReport/SaveNewReport";

function ManageReports() {
  const [activeTabID, setActiveTabID] = useState(1);
  const [reportListData, setReportListData] = useState('');
  const [loading, setLoading] = useState(false);
  const [isloading, setIsloading] = useState(false);
  const [, setIsError] = useState("");
  const curUser = getParametersFromLocalStorage("userID");
  const reportData = useSelector((state) => state.reports);
  const uniqueId = getParametersFromLocalStorage("uniqueid")
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    "rptName": '',
    "rptId": 0
  });

  const toast = React.useRef(null);
  const showToast = (type, summary, details) => {
    toast.current.show({
      severity: type || "success",
      summary: summary || "Success Message",
      detail: details || "Message Content",
      life: 3000,
    });
  };
    
  useEffect(() => {
    dispatch(fetchExistingReportsButtonsData(curUser))
  }, [dispatch]);

  useEffect(() => {
    if (!reportData.existingreportsbuttonsdata.loading) {
      if (reportData.existingreportsbuttonsdata.data.data) {
        setReportListData(reportData.existingreportsbuttonsdata.data.data)
      }
    }
  }, [reportData])

  const removeReport = async (id) => {
    try {
      setIsloading(true);
      let response = await deleteReport(id);
      if (response.status === 200) {
        dispatch(fetchExistingReportsButtonsData(curUser))
        showToast("success", "Report deleted", "Report deleted successfully!!");
        //fetchAllEvents();
      }
    } catch (error) {
      setIsError("Something went wrong!! Please try again later");
    } finally {
      setIsloading(false);
    }
  };

  const confirm = (id) => {
    confirmDialog({
      message: "Are you sure you want to Delete this report?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => removeReport(id),
      reject: () => { },
    });
  };

  const navigateToEdit = (item) => {
    setFormData({
      "rptName": item.report_name,
      "rptId": item.id
    })
    setShow(true);
  };

  const renderReportActions = (item) => {
    return (
      <div style={{ display: "flex" }}>
        <button
          className="btn btn-icon-secondary btn-icon"
          onClick={() => navigateToEdit(item)}
        >
          <i className="pi pi-pencil"></i>
        </button>
        <button
          className="btn btn-danger  btn-icon"
          style={{ marginLeft: "5px" }}
          onClick={() => confirm(item.id)}
        >
          <i className="fa fa-trash"></i>
        </button>
      </div>
    );
  };

  const handleChangeReport = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const updateReport = async (e) => {
    e.preventDefault();

    try {
      setIsloading(true);
      let response = await updateReportData(formData);
      if (response.status === 200) {
        dispatch(fetchExistingReportsButtonsData(curUser))
        showToast("success", "Report Updated", "Report updated successfully!!");
        setShow(false)
      }
    } catch (error) {
      setIsError("Something went wrong!! Please try again later");
    } finally {
      setIsloading(false);
    }
  }

  // useEffect(()=>{
  //   if(uniqueId?.data?.uniqueid){
  //     dispatch(deleteTemporaryReport({uniqueid:uniqueId.data.uniqueid}));
  //    }
  // },[]) 

  return (
    <>
      <div className="setting-options change-events">
        <SettingHeader
          iconClass={"fa fa-line-chart"}
          title={"Manage Saved Reports"}
          subTitle={""}
        />
        <div className="default-core-metrics">
          <Nav tabs>
            <NavItem>
              <NavLink
                className={activeTabID === 1 ? "active" : ""}
                onClick={() => setActiveTabID(1)}
              >
                Historical Reports
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={activeTabID === 2 ? "active" : ""}
                onClick={() => setActiveTabID(2)}
              >
                Whats Changed Reports
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={activeTabID === 3 ? "active" : ""}
                onClick={() => setActiveTabID(3)}
              >
                Period vs Period Reports
              </NavLink>
            </NavItem>
            {/* <NavItem>
              <NavLink
                className={activeTabID === 4 ? "active" : ""}
                onClick={() => setActiveTabID(4)}
              >
                Problem Determination Reports
              </NavLink>
            </NavItem> */}
            <NavItem>
              <NavLink
                className={activeTabID === 5 ? "active" : ""}
                onClick={() => setActiveTabID(5)}
              >
                Capacity Planning Reports
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
                    value={reportListData['historical data']}
                    editMode="row"
                    showGridlines
                    rows={10}
                    paginator
                    dataKey="id"
                    responsiveLayout="scroll"
                    emptyMessage="No available reports"
                  >
                    <Column
                      field="report_name"
                      header="Report Name"
                      className="grey"
                      style={{ width: "70%" }}
                    ></Column>
                    <Column
                      field={(item) => moment(item.createdAt).format("LLL")}
                      header="Report Date"
                      className="grey"
                    ></Column>
                    <Column
                      field={(data) => renderReportActions(data)}
                      header="Actions"
                      style={{}}
                    ></Column>
                  </DataTable>
                )}
              </div>
            </TabPane>
            <TabPane tabId="2">
              <div className="metrics_options_container no-border">
                {loading ? (
                  <Loading />
                ) : (
                  <DataTable
                    value={reportListData['whats changed']}
                    editMode="row"
                    showGridlines
                    rows={10}
                    paginator
                    dataKey="id"
                    responsiveLayout="scroll"
                    emptyMessage="No available reports"
                  >
                    <Column
                      field="report_name"
                      header="Report Name"
                      className="grey"
                      style={{ width: "70%" }}
                    ></Column>
                    <Column
                      field="createdAt"
                      header="Report Date"
                      className="grey"
                    ></Column>
                    <Column
                      field={(data) => renderReportActions(data)}
                      header="Actions"
                      style={{}}
                    ></Column>
                  </DataTable>
                )}
              </div>
            </TabPane>
            <TabPane tabId="3">
              <div className="metrics_options_container no-border">
                {loading ? (
                  <Loading />
                ) : (
                  <DataTable
                    value={reportListData['period Vs period']}
                    editMode="row"
                    showGridlines
                    rows={10}
                    paginator
                    dataKey="id"
                    responsiveLayout="scroll"
                    emptyMessage="No available reports"
                  >
                    <Column
                      field="report_name"
                      header="Report Name"
                      className="grey"
                      style={{ width: "70%" }}
                    ></Column>
                    <Column
                      field="createdAt"
                      header="Report Date"
                      className="grey"
                    ></Column>
                    <Column
                      field={(data) => renderReportActions(data)}
                      header="Actions"
                      style={{}}
                    ></Column>
                  </DataTable>
                )}
              </div>
            </TabPane>
            {/* <TabPane tabId="4">
              <div className="metrics_options_container no-border">
                {loading ? (
                  <Loading />
                ) : (
                  <DataTable
                    value={reportListData['problem determination']}
                    editMode="row"
                    showGridlines
                    rows={10}
                    paginator
                    dataKey="id"
                    responsiveLayout="scroll"
                    emptyMessage="No available reports"
                  >
                    <Column
                      field="report_name"
                      header="Report Name"
                      className="grey"
                      style={{ width: "70%" }}
                    ></Column>
                    <Column
                      field="createdAt"
                      header="Report Date"
                      className="grey"
                    ></Column>
                    <Column
                      field={(data) => renderReportActions(data)}
                      header="Actions"
                      style={{}}
                    ></Column>
                  </DataTable>
                )}
              </div>
            </TabPane> */}
              <TabPane tabId="5">
              <div className="metrics_options_container no-border">
                {loading ? (
                  <Loading />
                ) : (
                  <DataTable
                    value={reportListData['capacity planning']}
                    editMode="row"
                    showGridlines
                    rows={10}
                    paginator
                    dataKey="id"
                    responsiveLayout="scroll"
                    emptyMessage="No available reports"
                  >
                    <Column
                      field="report_name"
                      header="Report Name"
                      className="grey"
                      style={{ width: "70%" }}
                    ></Column>
                    <Column
                      field="createdAt"
                      header="Report Date"
                      className="grey"
                    ></Column>
                    <Column
                      field={(data) => renderReportActions(data)}
                      header="Actions"
                      style={{}}
                    ></Column>
                  </DataTable>
                )}
              </div>
            </TabPane>
          </TabContent>
        </div>
        <Toast ref={toast} position="top-right"></Toast>
      </div>
      <Modal isOpen={show} onHide={() => setShow(false)} style={{ zIndex: 99999 }}>
        <form onSubmit={(e) => updateReport(e)}>
          <ModalHeader>Edit report name</ModalHeader>

          <input
            className="form-control"
            style={{ width: '50%', margin: '0px 10px 0px 10px' }}
            name="rptName"
            type="text"
            value={formData.rptName}
            onChange={(e) => { handleChangeReport(e) }}
          />
          <input
            name="rptId"
            type="hidden"
            value={formData.rptId}
          />

          <ModalFooter>
            <Button variant="secondary" onClick={() => setShow(false)}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </ModalFooter>
        </form>
      </Modal>
    </>
  );
}

export default ManageReports; //UserDefinedPerformance;
