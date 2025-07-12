import React, { useEffect, useState } from "react";
import {
  FormGroup,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Label,
  Input,
} from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import SettingHeader from "../SettingHeader";
import {
  addFrame,
  getAllSystems,
  getGlobalPerformanceGuide,
  getMKeys,
  getProposedSystems,
  getSystemPerformanceGuide,
  updateGlobalPerformanceGuide,
} from "../../../../services/apiService";
import Loading from "../../../components/Loading";
import { Modal, ModalHeader, ModalFooter, Button } from "reactstrap";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import {
  getParametersFromLocalStorage,
  groupedItemTemplate,
  selectedSystemTemplate,
  systemOptionTemplate,
  validateFrameManagement,
} from "../../../../helpers/commonHelper";
import { Toast } from "primereact/toast";
import { Checkbox } from "primereact/checkbox";
import { Dropdown } from "primereact/dropdown";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { TriStateCheckbox } from "primereact/tristatecheckbox";

function AddUserNotification() {
  const [systemsList, setSystemsList] = useState([]);
  const [selectedSystem, setSelectedSystem] = useState([]);
  const [defaultOptions, setDefaultOptions] = useState({
    model_config_id: "",
    frame_cpw: "",
    frame_cores: "",
    entity_description: "",
    activated_cores: "",
    activated_cpw: "",
    serial_number: "",
    show_my_system: false,
    power_type: "",
    total_dasd: "",
    total_memory: "",
    email: false,
    sms: false,
    voice: "",
    push: "",
  });
  const toast = React.useRef(null);
  let navigate = useNavigate(); 

  useEffect(() => {
    fetchProposedSystems();
  }, []);

  useEffect(() => {
    if (defaultOptions.activated_cores) {
      const calculateCPW =
        +defaultOptions.frame_cpw / +defaultOptions.frame_cores;
      const calculatedCPW = +calculateCPW * +defaultOptions.activated_cores;
      setDefaultOptions({
        ...defaultOptions,
        activated_cpw: parseInt(calculatedCPW).toFixed(0),
      });
    } else {
      setDefaultOptions({
        ...defaultOptions,
        activated_cpw: "",
      });
    }
    return () => {
      setDefaultOptions({
        model_config_id: "",
        frame_cpw: "",
        frame_cores: "",
        entity_description: "",
        activated_cores: "",
        activated_cpw: "",
        serial_number: "",
        show_my_system: false,
        power_type: "",
        total_dasd: "",
        total_memory: "",
      });
    };
  }, [
    defaultOptions.activated_cores,
    selectedSystem,
    defaultOptions.frame_cpw,
    defaultOptions.frame_cores,
  ]);

  const fetchProposedSystems = async () => {
    try {
      let response = await getProposedSystems();

      if (response.status === 200) {
        setSystemsList(response.data.data);
      }
    } catch (error) {
    } finally {
    }
  };

  const systemChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setSelectedSystem(value);
    setDefaultOptions({
      ...defaultOptions,
      frame_cpw: value?.cpw || 0,
      frame_cores: value?.num_of_cores || 0,
      [name]: value?.model_config_id,
    });
  };

  const showToast = (type, summary, details) => {
    toast.current.show({
      severity: type || "success",
      summary: summary || "Success Message",
      detail: details || "Message Content",
      life: 3000,
    });
  };

  // default option changes handler Name and description
  const handleDefaultOptionChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "activated_cores" && +value > +defaultOptions.frame_cores)
      return showToast(
        "error",
        "Activated cores.",
        "Activated cores should not be more than frame cores"
      );
    setDefaultOptions({ ...defaultOptions, [name]: value });
  };

  const handleSaveandClose = async () => {
    try {
      const frameData = {
        model_config_id: defaultOptions.model_config_id,
        frame_cpw: defaultOptions.frame_cpw,
        frame_cores: defaultOptions.frame_cores,
        activated_cores: defaultOptions.activated_cores,
        activated_cpw: defaultOptions.activated_cpw,
        show_my_system: defaultOptions.show_my_system === "true" ? true : false,
        serial_number: defaultOptions.serial_number,
        power_type: selectedSystem.power_type,
        total_dasd: defaultOptions.total_dasd,
        total_memory: defaultOptions.total_memory,
      };
      const data = {
        entity_data: { frame: frameData },
        entity_description: defaultOptions.entity_description,
        model: `${selectedSystem.model} (${selectedSystem.type_fc}) (${
          selectedSystem.num_of_cores
        } ${selectedSystem.num_of_cores > 1 ? "Cores" : "Core"})`,
      };
      const errors = validateFrameManagement(data);
      if (errors.length) {
        let errList = errors.map((err) => ({
          severity: "error",
          summary: `${err}`,
          life: 3000,
        }));
        toast.current.show(errList);
        return;
      }
      let response = await addFrame(data);
      if (response.data.status === 201) {
        showToast("success", "Frame Added", "frame added successfully!!");
        setTimeout(() => {
          navigate(-1);
        }, 1000);
      }
      if (response.error?.status === 409) {
        showToast(
          "error",
          "System can not be added.",
          response.error?.message || "Something went wrong!"
        );
      }
    } catch (error) {
      showToast("error", "", error.response.data.message);
    }
  };

  const handleSystemOptionChange = (e) => {
    //debugger;
    const name = e.target.id;
    const checked = e.target.checked;
    setDefaultOptions({ ...defaultOptions, [name]: checked });
  };

  const KeyLabel = styled(Label)`
    margin-left: 5px;
    verticle-align: middle;
  `;

  return (
    <div className="add-systems">
      <button
        className="btn btn-icon-primary btn-icon"
        onClick={() => navigate(-1)}
      >
        <i className="pi pi-arrow-left"></i>
      </button>
      <div className="sidebar-title">Add User Notifications</div>
      <div style={{ display: "flex" }}>
        <div className="form-options" style={{ width: "84%" }}>
          <div className="form_group">
            <label className="label">Name</label>
            <input
              type="text"
              name="frame_cpw"
              disabled
              value={defaultOptions.frame_cpw}
              className="form-control"
              placeholder={"Enter name"}
              onChange={(e) => handleDefaultOptionChange(e)}
            />
          </div>
          <div className="form_group">
            <label className="label">email address</label>
            <input
              type="text"
              name="frame_cpw"
              disabled
              value={defaultOptions.frame_cpw}
              className="form-control"
              placeholder={"Enter email address"}
              onChange={(e) => handleDefaultOptionChange(e)}
            />
          </div>
          <div className="form_group">
            <label className="label">Phone Number(Voice)</label>
            <input
              type="text"
              name="frame_cpw"
              disabled
              value={defaultOptions.frame_cpw}
              className="form-control"
              placeholder={"Enter phone number"}
              onChange={(e) => handleDefaultOptionChange(e)}
            />
          </div>
          <div className="form_group">
            <label className="label">Phone Number(SMS)</label>
            <input
              type="text"
              name="frame_cpw"
              disabled
              value={defaultOptions.frame_cpw}
              className="form-control"
              placeholder={"Enter phone number"}
              onChange={(e) => handleDefaultOptionChange(e)}
            />
          </div>
          <div className="form_group">
            <label className="label">System</label>
            <div className="build_para_card_capacity">
              <div className="filter_option">
                <Dropdown
                  value={selectedSystem}
                  options={systemsList}
                  onChange={(e) => systemChangeHandler(e)}
                  optionLabel="label"
                  name="model_config_id"
                  filter
                  filterBy="model,type_fc,no_of_cores,cpw,power_type"
                  placeholder="Select a System"
                  valueTemplate={selectedSystemTemplate}
                  itemTemplate={systemOptionTemplate}
                  optionGroupLabel="label"
                  optionGroupChildren="items"
                  optionGroupTemplate={groupedItemTemplate}
                  className="w-full h-auto"
                  style={{ maxHeight: "40px", alignItems: "center" }}
                />
              </div>
            </div>
          </div>
          <div className="form_group">
            <label className="label">Metric</label>
            <div className="build_para_card_capacity">
              <div className="filter_option">
                <Dropdown
                  value={selectedSystem}
                  options={systemsList}
                  onChange={(e) => systemChangeHandler(e)}
                  optionLabel="label"
                  name="model_config_id"
                  filter
                  filterBy="model,type_fc,no_of_cores,cpw,power_type"
                  placeholder="Select a Metric"
                  valueTemplate={selectedSystemTemplate}
                  itemTemplate={systemOptionTemplate}
                  optionGroupLabel="label"
                  optionGroupChildren="items"
                  optionGroupTemplate={groupedItemTemplate}
                  className="w-full h-auto"
                  style={{ maxHeight: "40px", alignItems: "center" }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="alert_metric_options" style={{ width: "16%" }}>
          <div style={{ fontWeight: "bold", fontSize: "1rem" }}>Actions</div>
          <div className="metric_options metric_options_alerts">
            <div className="metric_body" style={{ marginTop: "10px" }}>
              <Label>Email</Label>
              <Input
                type="checkbox"
                id={"email"}
                checked={defaultOptions.email}
                style={{ marginLeft: "10px" }}
                onChange={(e) => handleSystemOptionChange(e)}
              />
            </div>
            <div className="metric_body" style={{ marginTop: "10px" }}>
              <Label>SMS</Label>
              <Input
                type="checkbox"
                id={"sms"}
                checked={defaultOptions.sms}
                style={{ marginLeft: "10px" }}
                onChange={(e) => handleSystemOptionChange(e)}
              />
            </div>
            <div className="metric_body" style={{ marginTop: "10px" }}>
              <Label>Voice(coming soon)</Label>
              {/* <Input
                type="checkbox"
                id={"email"}
                checked={defaultOptions.email}
                style={{ marginLeft: "10px" }}
                onChange={(e) => handleSystemOptionChange(e)}
              /> */}
            </div>
            <div className="metric_body" style={{ marginTop: "10px" }}>
              <Label>Push(coming soon)</Label>
              {/* <Input
                type="checkbox"
                id={"email"}
                checked={defaultOptions.email}
                style={{ marginLeft: "10px" }}
                onChange={(e) => handleSystemOptionChange(e)}
              /> */}
            </div>
          </div>
        </div>
      </div>

      <button
        className="btn btn-primary"
        onClick={handleSaveandClose}
        style={{ marginRight: "auto" }}
        // disabled={postEntityLoading}
      >
        Save and Close
      </button>
      <Toast ref={toast} position="top-right"></Toast>
    </div>
  );
}

export default AddUserNotification;
