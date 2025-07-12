import React, { useCallback, useEffect, useState } from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { confirmDialog } from "primereact/confirmdialog";

import { deleteTemplate, updateReportData } from "services/apiService";
import SettingHeader from "../SettingHeader";
import { Toast } from "primereact/toast";

import {getTemplates} from "store/slices/branding/"
import { setIsEditing, getIsEditing, fetchTemplates } from "store/slices/report_templates/templates.slice";
import SectionHeader from "app/components/SectionHeader";
import Loading from "app/components/Loading";
import Templates from "./Templates";
import ManageTemplate from "./ManageTemplate";
import EditTemplate from "./EditTemplate";
/// Once React-Query is used lot of unnecessory code will be removed..

function ReportTemplates() {
  const [activeTabID, setActiveTabID] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isloading, setIsloading] = useState(false);
  const [isError, setIsError] = useState("");
 
  const dispatch = useDispatch();
  const templateData = useSelector(getTemplates);
  const cur_template = useSelector(getIsEditing);

  const toast = React.useRef(null);
  const showToast = (type, summary, details) => {
    toast.current.show({
      severity: type || "success",
      summary: summary || "Success Message",
      detail: details || "Message Content",
      life: 3000,
    });
  };

  const removeTemplate = async (id) => {
    try {
      setIsloading(true);
      let response = await deleteTemplate(id);
      if (response.data.success) {
        dispatch(fetchTemplates(1));
        showToast("success", "Template deleted", `${response.data.message}`);
      }else{
        console.log(response.data);
        showToast("warning", "Delete Error", `${response.data.message}`);
      }
    } catch (error) {
      setIsError("Something went wrong!! Please try again later");
    } finally {
      setIsloading(false);
    }
  };

  const reloadData = (val) => {
    dispatch(setIsEditing({isEditing: false, id: 0}));
    // this is an extra call to reset the state (needs optimization)
    //dispatch(setEditReportData({loading: false, data: [], error: ''}));
    dispatch(fetchTemplates(1))
    //dispatch(setReport({...NEW_REPORT, user_id : curUser}));
    setActiveTabID(val);
  }
  
  const createTemplate= (id) => {
    dispatch(setIsEditing({isEditing: false, id: 0}));
    setActiveTabID(id);
  }
  const editTemplate = (id) => {
    console.log("id is", id);
    dispatch(setIsEditing({isEditing: true, id: id}));
    setActiveTabID(3);
  }  

  const delTemplate = (id) => {
    confirmDialog({
      message: "Are you sure you want to Delete this Template?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => removeTemplate(id),
      reject: () => { },
    });
  }
    
  return (
    <>
      <div className="setting-container">
      
        <SettingHeader
          iconClass={"fa fa-line-chart"}
          title={"Branding"}
          subTitle={"Report Templates"}
        />
        <div className="default-core-metrics">
          <Nav tabs>
            <NavItem>
              <NavLink
                className={activeTabID === 1 ? "active" : ""}
                onClick={() => setActiveTabID(1)}
              >
                Templates
              </NavLink>
            </NavItem>

            <NavItem hidden={cur_template.isEditing}>
              <NavLink
                className={activeTabID === 2 ? "active" : ""}
                onClick={() => createTemplate(2)}
              >
                Create Template
              </NavLink>
            </NavItem>
            <NavItem hidden={!cur_template.isEditing}>
              <NavLink
                className={activeTabID === 3 ? "active" : ""}
                onClick={() => setActiveTabID(3)}
              >
                Edit Template
              </NavLink>
            </NavItem>
          </Nav>  
          <TabContent activeTab={String(activeTabID)}>
            <TabPane tabId="1">
              <Templates deleteTemplate={delTemplate} editTemplate={editTemplate}/>
            </TabPane>
            <TabPane tabId="2"> 
              <ManageTemplate reloadData={reloadData} />
            </TabPane> 
            <TabPane tabId="3"> 
              <EditTemplate reloadData={reloadData} templateId={cur_template.id}/>
            </TabPane>                  
          </TabContent>
        </div>
        <Toast ref={toast} position="top-right"></Toast>
      </div>
    </>
  );
}

export default ReportTemplates;
