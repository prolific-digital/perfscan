import React, { useEffect, useState } from "react";
import {
  getEtypes,
  getSpecificEtypes,
  addEntity,
  getProposedSystems,
} from "../../../../services/apiService";
import { Toast } from "primereact/toast";
import {
  groupedItemTemplate,
  selectedSystemTemplate,
  systemOptionTemplate,
  validateAddSystem,
} from "../../../../helpers/commonHelper";
import { ekeys } from "../../../../services/apiService";
import { useNavigate, useParams } from "react-router-dom";
import { Dropdown } from "primereact/dropdown";

const AddSystem = (props) => {
  const [systemsList, setSystemsList] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState([]); //
  const [systemTypeID, setSystemTypeID] = useState("");
  const [entityOptions, setEntityOptions] = useState({});
  const [delfautlOptions, setDelfautlOptions] = useState({
    entity_name: "",
    entity_description: "",
    // show_my_system: false,
  });
  const [selectedSystem, setSelectedSystem] = useState([]);
  const [showMySystem, setShowMySystem] = useState(false);
  const toast = React.useRef(null);
  let navigate = useNavigate();


  const [loadingOptionList, setLoadingOptionList] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchEtypes();
    fetchProposedSystems();
  }, []);

  useEffect(() => {
    // get all ekeys when any sysytem ID changes happen
    if (systemTypeID) {
      getkeys(systemTypeID);
    }
  }, [systemTypeID]);

  const fetchEtypes = async () => {
    try {
      let response = await getEtypes();

      if (response.status === 200) {
        setData(response.data);
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

  const fetchSpecificEtypes = async (id) => {
    try {
      let response = await getSpecificEtypes(id);

      if (response.status === 200) {
        setSubCategoryList(response.data);
      }
    } catch (error) {
    } finally {
    }
  };

  const getkeys = async (id) => {
    try {
      setLoadingOptionList(true);
      let response = await ekeys(id);
      if (response.status === 200) {
        const datakeys = response.data?.key_data;
        if (Object.keys(datakeys).length > 0) {
          setEntityOptions(datakeys);
        }
      }
    } catch (error) {
    } finally {
      setLoadingOptionList(false);
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

  const eTypeChangeHandler = (val) => {
    if (val) {
      setSystemTypeID("");
      setEntityOptions({});
      fetchSpecificEtypes(val);
    }
  };

  const systemChangeHandler = (e) => {
    const value = e.target.value;
    setSelectedSystem(value);
  };

  // entity option handle changes
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
        entity_type: systemTypeID,
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
      let response = await addEntity(data);
      if (response.data.status === 201) {
        showToast("success", "System Added", "system added successfully!!");
        setTimeout(() => {
          navigate(-1);
        }, 1000);
      }
      if (response.error?.status === 409) {
        showToast(
          "error",
          "System can not be added.",
          response.error?.data?.message || "Something went wrong!"
        );
      }
    } catch (error) {
      showToast("error", "", error.message);
    }
  };

  let filterETypes = data.filter((item) => !Boolean(item.generic_id));
  return (
    <div className="add-systems">
      <button
        className="btn btn-icon-primary btn-icon"
        onClick={() => navigate(-1)}
      >
        <i className="pi pi-arrow-left"></i>
      </button>
      <div className="sidebar-title">Add System</div>
      <div className="form-options">
        <div className="form_group">
          <label className="label">Select System Type</label>
          <select
            className="form-control"
            onChange={(e) => eTypeChangeHandler(e.target.value)}
            defaultValue=""
          >
            <option disabled value="">
              --Select System type--
            </option>
            {filterETypes.map((item) => (
              <option key={item.id} value={item.id}>
                {item.description}
              </option>
            ))}
          </select>
        </div>
        {subCategoryList.length > 0 && (
          <div className="form_group">
            <label className="label">Select System sub Type</label>

            <select
              name="entity_type"
              className="form-control"
              onChange={(e) => setSystemTypeID(e.target.value)}
              value={systemTypeID}
            >
              <option disabled value="">
                --Select System sub Type--
              </option>
              {subCategoryList.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.description}
                </option>
              ))}
            </select>
          </div>
        )}

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
        {loadingOptionList ? (
          <div className="form_group">
            <label className="label">
              loading option for selected Sysytem types
            </label>
          </div>
        ) : (
          Object.keys(entityOptions).map((item, index) => (
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
                      placeholder={`Enter ${key}`}
                      onChange={(e) => handleEntityOptionChange(e, item)}
                    />
                  </div>
                );
              })}
            </div>
          ))
        )}
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

export default AddSystem;
