import React, { useEffect, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { getAllSystems } from "../../../services/apiService";
import { useDispatch, useSelector } from "react-redux";
import {
  saveParametersIntoLocalStorage,
  getParametersFromLocalStorage,
} from "../../../helpers/commonHelper";
import { systemFilter } from "../../../store/slices/searchFilter";
import { getUuidData } from "../../../store/slices/reports/SaveNewReport/SaveNewReport";
import { counterTogglePDTopJobs } from "../../../store/slices/topJobs/toggleTopJobsButton";

const SytemFilter = ({ reportChange, loadingReport }) => {
  const SystemFilterData = getParametersFromLocalStorage("systemfilter");
  const uniqueId = getParametersFromLocalStorage("uniqueid");
  const [systemsList, setSystemsList] = useState([]);
  const [selectedSystem, setSelectedSystem] = useState(
    SystemFilterData ? SystemFilterData : {}
  );
  const dispatch = useDispatch();
  const uuid = useSelector(getUuidData);
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

  const handleSystemChange = (systemdata) => {
    const { updatedAt, createdAt, entity_type, entity_data, ...rest } =
      systemdata;
    saveParametersIntoLocalStorage("systemfilter", systemdata);
    setSelectedSystem(systemdata);
    reportChange();
    dispatch(systemFilter(systemdata)); //dispatch systemFiltre action which is defined in reducer.
  };

  const fetchAllSystems = async () => {
    try {
      const response = await getAllSystems();
      if (response.status === 200) {
        const data = response.data || [];
        if (data.length) {
          setSystemsList(data);
          let issavedSystemExists = data.some(
            (item) => item.id == SystemFilterData.id
          );
          if (issavedSystemExists && SystemFilterData && SystemFilterData.id) {
            handleSystemChange(SystemFilterData);
          } else {
            handleSystemChange(data[0]);
          }
        }
      }
    } catch (error) {}
  };
  useEffect(() => {
    fetchAllSystems();
  }, []);

  useEffect(() => {
    // if(!loadingReport && uniqueId?.data?.uniqueid){
    //   dispatch(deleteTemporaryReport({uniqueid:uniqueId.data.uniqueid}));
    // }
    // if(!uuid?.loading && uuid?.data?.uniqueid){
    //   dispatch(deleteTemporaryReport({uniqueid:uuid.data.uniqueid}));
    // }
    dispatch(counterTogglePDTopJobs(false));
  }, [dispatch, SystemFilterData.id]);


  return (
    <div className="build_para_card">
      <div className="build_title">System</div>
      <div className="filter_option">
        <Dropdown
          value={selectedSystem}
          options={systemsList}
          onChange={(e) => handleSystemChange(e.value)}
          // filterFunction={filterOptions}
          optionLabel="entity_name,entity_description,entity_data.serial"
          filter
          filterBy="entity_name,entity_description,entity_data.frame.serial_number"
          placeholder="Select a System"
          valueTemplate={selectedSystemTemplate}
          itemTemplate={systemOptionTemplate}
        />
      </div>
      <div></div>
    </div>
  );
};

export default React.memo(SytemFilter);
