import React, { useEffect, useState } from "react";
import { addFrame, getProposedSystems } from "../../../../services/apiService";
import { Toast } from "primereact/toast";
import {
  groupedItemTemplate,
  selectedSystemTemplate,
  systemOptionTemplate,
  validateAddSystem,
  validateFrameManagement,
} from "../../../../helpers/commonHelper";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "primereact/dropdown";

const AddFrame = (props) => {
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

  return (
    <div className="add-systems">
      <button
        className="btn btn-icon-primary btn-icon"
        onClick={() => navigate(-1)}
      >
        <i className="pi pi-arrow-left"></i>
      </button>
      <div className="sidebar-title">Add Frame</div>
      <div className="form-options">
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
        {defaultOptions.model_config_id && (
          <div className="form_group">
            <label className="label">Total Frame CPW</label>
            <input
              type="text"
              name="frame_cpw"
              disabled
              value={defaultOptions.frame_cpw}
              className="form-control"
              placeholder={"Enter frame cpw"}
              onChange={(e) => handleDefaultOptionChange(e)}
            />
          </div>
        )}

        {defaultOptions.model_config_id && (
          <div className="form_group">
            <label className="label">Total Frame Cores</label>
            <input
              type="text"
              name="frame_cores"
              disabled
              value={defaultOptions.frame_cores}
              className="form-control"
              placeholder={"Enter frame cores"}
              onChange={(e) => handleDefaultOptionChange(e)}
            />
          </div>
        )}

        {defaultOptions.model_config_id && (
          <div className="form_group">
            <label className="label">Activated Cores</label>
            <input
              type="text"
              name="activated_cores"
              value={defaultOptions.activated_cores}
              className="form-control"
              placeholder={"Enter activated cores"}
              onChange={(e) => handleDefaultOptionChange(e)}
            />
          </div>
        )}

        <div className="form_group">
          <label className="label">Description/Location</label>
          <input
            type="text"
            name="entity_description"
            value={defaultOptions.entity_description}
            className="form-control"
            placeholder={"Enter system description"}
            onChange={(e) => handleDefaultOptionChange(e)}
          />
        </div>

        {defaultOptions.model_config_id && (
          <div className="form_group">
            <label className="label">Activated CPW</label>
            <input
              type="text"
              name="activated_cpw"
              value={defaultOptions.activated_cpw}
              className="form-control"
              placeholder={"Enter activated"}
              onChange={(e) => handleDefaultOptionChange(e)}
            />
          </div>
        )}

        {defaultOptions.model_config_id && (
          <div className="form_group">
            <label className="label">Total DASD(TB)</label>
            <input
              type="text"
              name="total_dasd"
              value={defaultOptions.total_dasd}
              className="form-control"
              placeholder={"Enter dasd"}
              onChange={(e) => handleDefaultOptionChange(e)}
            />
          </div>
        )}

        {defaultOptions.model_config_id && (
          <div className="form_group">
            <label className="label">Total Memory(GB)</label>
            <input
              type="text"
              name="total_memory"
              value={defaultOptions.total_memory}
              className="form-control"
              placeholder={"Enter memory"}
              onChange={(e) => handleDefaultOptionChange(e)}
            />
          </div>
        )}

        <div className="form_group">
          <label className="label">Enter Serial Number</label>
          <input
            type="text"
            name="serial_number"
            value={defaultOptions.serial_number}
            className="form-control"
            placeholder={"Enter serial number"}
            onChange={(e) => handleDefaultOptionChange(e)}
          />
        </div>
        <div className="form_group">
          <label className="label">Show My Systems (Capacity Planning)</label>
          <select
            className="form-control"
            name="show_my_system"
            value={defaultOptions.show_my_system}
            onChange={(e) => handleDefaultOptionChange(e)}
          >
            <option value="">--Select--</option>
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
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
};

export default AddFrame;
