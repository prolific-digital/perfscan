import React, { useCallback, useEffect, useState } from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { confirmDialog } from "primereact/confirmdialog";

import { deleteScheduledReport, updateReportData } from "services/apiService";
import SettingHeader from "../SettingHeader";
import { Toast } from "primereact/toast";
import {fetchReports, runScheduledReport, getRunReportData, getIsEditing, setIsEditing } from "store/slices/report_scheduler/schedulerSlice";
import { setReport as setEditReport, setEditReportData } from "store/slices/report_scheduler/editSchedulerSlice";
import { setReport as setNewReport} from "store/slices/report_scheduler/addSchedulerSlice";

import {fetchTemplates, getTemplates} from "store/slices/branding/"
import Reports from "./Reports";
import CreateReport from "./CreateReport"
import EditReport from "./EditReport";
import SectionHeader from "app/components/SectionHeader";
import Loading from "app/components/Loading";
import { EDIT_REPORT, NEW_REPORT } from "typeCodes";

/// Once React-Query is used lot of unnecessory code will be removed..

function ReportAutomation() {
  const [activeTabID, setActiveTabID] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isloading, setIsloading] = useState(false);
  const [isError, setIsError] = useState("");
 
  const cur_report = useSelector(getIsEditing);
 
  const dispatch = useDispatch();
  const templateData = useSelector(getTemplates);
  const runReportData = useSelector(getRunReportData);
  
  const toast = React.useRef(null);
  const showToast = (type, summary, details) => {
    toast.current.show({
      severity: type || "success",
      summary: summary || "Success Message",
      detail: details || "Message Content",
      life: 3000,
    });
  };

  const removeReport = async (id, jobid) => {
    try {
      setIsloading(true);
      let response = await deleteScheduledReport(id, jobid);
      if (response.status === 200) {
        dispatch(fetchReports());
        showToast("success", "Report deleted", "Report deleted successfully!!");
      }
    } catch (error) {
      setIsError("Something went wrong!! Please try again later");
    } finally {
      setIsloading(false);
    }
  };

  const reloadData = (val, type) => {
    dispatch(setIsEditing({isEditing: false, id: 0}));
    dispatch(setEditReport(EDIT_REPORT));
    dispatch(setNewReport(NEW_REPORT));
    // this is an extra call to reset the state (needs optimization)
    dispatch(setEditReportData({loading: false, data: [], error: ''}));
    dispatch(fetchReports())
    //dispatch(setReport({...NEW_REPORT, user_id : curUser}));
    setActiveTabID(val);
  }
  
  const createReport = (id) => {
    dispatch(setIsEditing({isEditing: false, id: 0}));
    setActiveTabID(id);
  }
  const editReport = (id) => {
    dispatch(setIsEditing({isEditing: true, id: id}));
    setActiveTabID(3);
  }

    const runReport = async(jobid) => {
    dispatch(runScheduledReport(jobid));
  }

  useEffect(() => { 
    if (!runReportData.loading && runReportData.data.success) {
      showToast("success", "Report Run", "Report Run successfully!!");
    }
  }, [runReportData]);

  const delReport = (id, jobid) => {
    confirmDialog({
      message: "Are you sure you want to Delete this report?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => removeReport(id, jobid),
      reject: () => { },
    });
  }
    
  return (
    <>
      <div className="setting-container">
      {/*<SectionHeader title={"Settings"} help="true" type="CP-AUTOMATION" />*/}
        <SettingHeader
          iconClass={"fa fa-line-chart"}
          title={"Reports Automation"}
          subTitle={""}
        />
        <div className="default-core-metrics">
          <Nav tabs>
            <NavItem>
              <NavLink
                className={activeTabID === 1 ? "active" : ""}
                onClick={() => setActiveTabID(1)}
              >
                Reports
              </NavLink>
            </NavItem>

            <NavItem hidden={cur_report.isEditing}>
              <NavLink
                className={activeTabID === 2 ? "active" : ""}
                onClick={() => createReport(2)}
                
              >
                Create Report
              </NavLink>
            </NavItem>
            <NavItem hidden={!cur_report.isEditing}>
              <NavLink
                className={activeTabID === 3 ? "active" : ""}
                onClick={() => setActiveTabID(3)}
              >
                Edit Report
              </NavLink>
            </NavItem>
          </Nav>  
          <TabContent activeTab={String(activeTabID)}>
            <TabPane tabId="1">
              <div className="metrics_options_container no-border">
                {loading ? (
                  <Loading />
                ) : (
                  <Reports editReport={editReport}  runReport={runReport} deleteReport={delReport} />
                )}
              </div>
            </TabPane>
            <TabPane tabId="2" hidden={cur_report.isEditing}> 
              <CreateReport reloadData={reloadData}  />
            </TabPane> 
            <TabPane tabId="3" hidden={!cur_report.isEditing}> 
              {cur_report.isEditing &&
                <EditReport reloadData={reloadData} rptid={cur_report.id} />
              }
            </TabPane>                  
          </TabContent>
        </div>
        <Toast ref={toast} position="top-right"></Toast>
      </div>
    </>
  );
}

export default ReportAutomation;
