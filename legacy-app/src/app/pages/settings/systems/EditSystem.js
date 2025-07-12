import React, { useEffect, useState } from "react";
import { Toast } from "primereact/toast";
import {
  groupedItemTemplate,
  selectedSystemTemplate,
  systemOptionTemplate,
  validateAddSystem,
} from "../../../../helpers/commonHelper";
import {
  getProposedSystems,
  getSpecificSystem,
  updateEntity,
} from "../../../../services/apiService";
import { useParams, useNavigate } from "react-router-dom";
import { Dropdown } from "primereact/dropdown";

const EditSystem = (props) => {
  const [systemsList, setSystemsList] = useState([]);
  const [entityOptions, setEntityOptions] = useState({});
  const [delfautlOptions, setDelfautlOptions] = useState({
    entity_name: "",
    entity_description: "",
    entity_type: "",
  });
  const [selectedSystem, setSelectedSystem] = useState([]);
  const [showMySystem, setShowMySystem] = useState(false);
  const params = useParams();
  let navigate = useNavigate();
  const toast = React.useRef(null);

  useEffect(() => {
    fetchProposedSystems();
  }, []);

  useEffect(() => {
    if (params && params.systemId) {
      fetchSpecificSystems(params.systemId);
    }
  }, [params, params.systemId, systemsList]);


  const fetchSpecificSystems = async () => {
    try {
      let response = await getSpecificSystem(params.systemId);

      if (response.status === 200) {
        let data = response.data || {};
        const filterSystem = systemsList?.filter(
          (ele) =>
            ele?.label?.trim() === data?.entity_data?.frame?.power_type?.trim()
        );
        const foundSystem = filterSystem[0]?.items?.find(
          (ele) =>
            ele?.model_config_id === data?.model_config_id
        );
        setSelectedSystem(foundSystem);
        setDelfautlOptions({
          entity_name: data.entity_name,
          entity_description: data.entity_description,
          entity_type: data.entity_type,
        });
        setEntityOptions({
          ...data.entity_data,
        });
        setShowMySystem(
          !data?.entity_data?.frame?.show_my_system ? false : true
        );
      }
    } catch (error) {
    } finally {
    }
  };

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

  const showToast = (type, summary, details) => {
    toast.current.show({
      severity: type || "success",
      summary: summary || "Success Message",
      detail: details || "Message Content",
      life: 3000,
    });
  };

  const systemChangeHandler = (e) => {
    const value = e.target.value;
    setSelectedSystem(value);
  };

  const handleEntityOptionChange = (e, item) => {
    const name = e.target.name;
    const value = e.target.value;
    const tempObj = { ...entityOptions };
    tempObj[item][name] = value;
    setEntityOptions(tempObj);
  };

  // default option changes handler Name and description
  const handleDefaultOptionChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "show_my_system") {
      setShowMySystem(value);
      return;
    }
    setDelfautlOptions({ ...delfautlOptions, [name]: value });
  };

  const handleSaveandClose = async () => {
    try {
      const updateFrameData = {
        ...entityOptions.frame,
        show_my_system: showMySystem === "true" ? true : false,
        power_type: selectedSystem?.power_type || "",
      };
      const data = {
        ...delfautlOptions,
        model_config_id: selectedSystem.model_config_id,
        entity_data: {
          frame: { ...updateFrameData },
          lpar: { ...entityOptions.lpar },
        },
      };
      const errors = validateAddSystem(data);
      if (errors.length) {
        let errList = errors.map((err) => ({
          severity: "error",
          summary: `${err}`,
          life: 3000,
        }));
        toast.current.show(errList);
        return;
      }
      let response = await updateEntity(params.systemId, data);
      if (response.status === 200) {
        showToast(
          "success",
          "Entity updated",
          response.data.message || "Entity was updated successfully."
        );
        setTimeout(() => {
          navigate(-1);
        }, 1000);
      }
    } catch (error) {
      showToast("error", "", error.message);
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
      <div className="sidebar-title">Edit System</div>
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
        <div className="form_group">
          <label className="label">{"Name"}</label>
          <input
            type="text"
            name="entity_name"
            value={delfautlOptions.entity_name}
            className="form-control"
            placeholder={"Enter system name"}
            onChange={(e) => handleDefaultOptionChange(e)}
          />
        </div>
        <div className="form_group">
          <label className="label">{"Description"}</label>
          <input
            type="text"
            name="entity_description"
            value={delfautlOptions.entity_description}
            className="form-control"
            placeholder={"Enter system description"}
            onChange={(e) => handleDefaultOptionChange(e)}
          />
        </div>
        <div className="form_group">
          <label className="label">Show My Systems (Capacity Planning)</label>
          <select
            className="form-control"
            name="show_my_system"
            value={showMySystem}
            onChange={(e) => handleDefaultOptionChange(e)}
          >
            <option value="">--Select System--</option>
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </div>
      </div>
      <div className="form-options">
        {Object.keys(entityOptions).map((item, index) => (
          <div className="form_group" key={index}>
            <label className="label">Enter {item} Details Below:</label>
            {Object.keys(entityOptions[item])?.map((key, ind) => {
              return (
                <div className="form_group" key={ind}>
                  <label className="label">Enter {key}</label>
                  <input
                    type="text"
                    name={key}
                    className="form-control"
                    value={entityOptions[item][key]}
                    placeholder={`Enter ${ind}`}
                    onChange={(e) => handleEntityOptionChange(e, item)}
                  />
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <button
        className="btn btn-primary"
        onClick={handleSaveandClose}
        style={{ marginRight: "auto" }}
      >
        Save and Close
      </button>
      <Toast ref={toast} position="top-right"></Toast>
    </div>
  );
};

export default EditSystem;
