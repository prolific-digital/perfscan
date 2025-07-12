import React, { useEffect, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import * as _ from "lodash";
import { useDispatch, useSelector } from "react-redux";

import { getAllSystems } from "../../../../services/apiService";
import {
  saveParametersIntoLocalStorage,
  getParametersFromLocalStorage,
} from "../../../../helpers/commonHelper";
import { systemFilter } from "../../../../store/slices/searchFilter";
import { getUuidData } from "../../../../store/slices/reports/SaveNewReport/SaveNewReport";
import {
  getCurrent,
  setNCoreCurrent,
  setCPWCurrent,
  setMaxCoresCurrent,
  setMaxCPWCurrent,
  setAutoSys,
} from "../../../../store/slices/capacityplanning/CapacityPlanningSlice";
import { capacitySaveFilter } from "../../../../store/slices/searchFilter";

const SytemFilter = ({ reportChange, loadingReport }) => {
  const SystemFilterData = getParametersFromLocalStorage("systemfilter");
  const uniqueId = getParametersFromLocalStorage("uniqueid");
  const [systemsList, setSystemsList] = useState([]);
  const [selectedSystem, setSelectedSystem] = useState();
  const dispatch = useDispatch();
  const uuid = useSelector(getUuidData);
  const filters = useSelector((state) => state.filters);
  let capacityFilter = filters.capacity_filter;

  useEffect(() => {
    reportChange();
    dispatch(setAutoSys(false));
  }, [selectedSystem]);

  useEffect(() => {
    if (Object.keys(SystemFilterData).length !== 0) {
      saveParametersIntoLocalStorage("systemfilter_capacity", SystemFilterData);
      setSelectedSystem(SystemFilterData);
    }
  }, []);

  const systemOptionTemplate = (option) => {
    return (
      <div className="value-options">
        {option.entity_name} - {option.entity_data.frame.model}
        {" ("}
        {option.entity_data.frame.feature_code}
        {") "}
        {option.entity_data.lpar.lpar_cores}
        {" Core(s) ("}
        {option.entity_data.lpar.cpw_rating}
        {")"}
      </div>
    );
  };

  const selectedSystemTemplate = (option, props) => {
    if (option) {
      return (
        <div className="value-options">
          {option.entity_name} - {option.entity_data.frame.model}
          {" ("}
          {option.entity_data.frame.feature_code}
          {") "}
          {option.entity_data.lpar.lpar_cores}
          {" Core(s) ("}
          {option.entity_data.lpar.cpw_rating}
          {")"}
        </div>
      );
    }
    return <span>{props.placeholder}</span>;
  };

  const handleSystemChange = (systemdata) => {
    const { updatedAt, createdAt, entity_type, entity_data, ...rest } =
      systemdata;
    saveParametersIntoLocalStorage("systemfilter_capacity", systemdata);
    setSelectedSystem(systemdata);
    reportChange();
    dispatch(
      setNCoreCurrent(_.toNumber(systemdata.entity_data.lpar.lpar_cores))
    );
    dispatch(setCPWCurrent(_.toNumber(systemdata.entity_data.lpar.cpw_rating)));
    dispatch(
      setMaxCoresCurrent(
        _.toNumber(systemdata.entity_data.frame.total_frame_cores)
      )
    );
    dispatch(
      setMaxCPWCurrent(
        _.toNumber(systemdata.entity_data.frame.total_cpw_rating)
      )
    );

    dispatch(
      capacitySaveFilter({
        ...capacityFilter,
        sysid: systemdata.id,
        current: {
          cores: _.toNumber(systemdata.entity_data.lpar.lpar_cores),
          cpw: _.toNumber(systemdata.entity_data.lpar.cpw_rating),
          max_cores: _.toNumber(systemdata.entity_data.frame.total_frame_cores),
          max_cpw: _.toNumber(systemdata.entity_data.frame.total_cpw_rating),
        },
        sys_current: {
          entity_name: systemdata.entity_name,
          entity_description: systemdata.entity_description,
          serial_number: systemdata.entity_data.frame.serial_number,
          model: systemdata.entity_data.frame.model,
          feature_code: systemdata.entity_data.frame.feature_code,
          model_config_id: systemdata.model_config_id,
        },
      })
    );
  };

  const fetchAllSystems = async () => {
    try {
      const response = await getAllSystems();
      if (response.status === 200) {
        const data = response.data || [];
        if (data.length) {
          setSystemsList(data);
          const foundSystem = data?.find(
            (ele, idx) => ele.id === SystemFilterData.id
          );
          dispatch(
            setNCoreCurrent(_.toNumber(foundSystem.entity_data.lpar.lpar_cores))
          );
          dispatch(
            setCPWCurrent(_.toNumber(foundSystem.entity_data.lpar.cpw_rating))
          );
          dispatch(
            setMaxCoresCurrent(
              _.toNumber(foundSystem.entity_data.frame.total_frame_cores)
            )
          );
          dispatch(
            setMaxCPWCurrent(
              _.toNumber(foundSystem.entity_data.frame.total_cpw_rating)
            )
          );
          dispatch(
            capacitySaveFilter({
              ...capacityFilter,
              sysid: foundSystem.id,
              current: {
                cores: _.toNumber(foundSystem.entity_data.lpar.lpar_cores),
                cpw: _.toNumber(foundSystem.entity_data.lpar.cpw_rating),
                max_cores: _.toNumber(
                  foundSystem.entity_data.frame.total_frame_cores
                ),
                max_cpw: _.toNumber(
                  foundSystem.entity_data.frame.total_cpw_rating
                ),
              },
              sys_current: {
                entity_name: foundSystem.entity_name,
                entity_description: foundSystem.entity_description,
                serial_number: foundSystem.entity_data.frame.serial_number,
                model: foundSystem.entity_data.frame.model,
                feature_code: foundSystem.entity_data.frame.feature_code,
                model_config_id: foundSystem.model_config_id,
              },
            })
          );
          {
            /*
          let issavedSystemExists = data.some(
            (item) => item.id == SystemFilterData.id
          );
              if (
                issavedSystemExists &&
                SystemFilterData &&
                SystemFilterData.id
              ) {
            handleSystemChange(SystemFilterData);
          } else {
            handleSystemChange(data[0]);
          }*/
          }
        }
      }
    } catch (error) {}
  };
  useEffect(() => {
    fetchAllSystems();
    // dispatch(capacitySaveFilter());
  }, []);

  return (
    <div className="build_para_card_capacity">
      <div className="build_title">Current System</div>
      <div className="filter_option">
        <Dropdown
          value={selectedSystem}
          options={systemsList}
          onChange={(e) => handleSystemChange(e.value)}
          optionLabel="entity_name,entity_data.frame.model,entity_data.frame.feature_code"
          filter
          filterBy="entity_name,entity_data.frame.model,entity_data.frame.feature_code"
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
