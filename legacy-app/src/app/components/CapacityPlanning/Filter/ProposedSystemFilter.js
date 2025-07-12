import React, { useEffect, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputSwitch } from "primereact/inputswitch";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import * as _ from "lodash";

import { getProposedSystems } from "../../../../services/apiService";
import { useDispatch, useSelector } from "react-redux";
import {
  saveParametersIntoLocalStorage,
  getParametersFromLocalStorage,
} from "../../../../helpers/commonHelper";
import { getUuidData } from "../../../../store/slices/reports/SaveNewReport/SaveNewReport";
import {
  setNCoreProposed,
  setCPWProposed,
  setSysOpt,
  setMaxCPWProposed,
  setMaxCoresProposed,
} from "../../../../store/slices/capacityplanning/CapacityPlanningSlice";
import { capacitySaveFilter } from "../../../../store/slices/searchFilter";
import { fetchAsyncCPConfig } from "../../../../store/slices/appconfig/AppConfigSlice";
import { getCPWPerCore } from "../../../../helpers/capacityHelper";
import AutoSystems from "../modal/AutoSystems";

const ProposedSytemFilter = ({ reportChange, loadingReport }) => {
  const SystemFilterData = getParametersFromLocalStorage("systemfilter");
  const uniqueId = getParametersFromLocalStorage("uniqueid");
  const [systemsList, setSystemsList] = useState([]);
  const [checked, setChecked] = useState(false);
  const [autoSystem, setAutoSystem] = useState(false);
  const [visible, setVisible] = useState(false);
  const [selectedSystem, setSelectedSystem] = useState(
    // SystemFilterData ? SystemFilterData :
    {}
  );

  const filters = useSelector((state) => state.filters);
  let capacityFilter = filters.capacity_filter;

  const dispatch = useDispatch();
  const uuid = useSelector(getUuidData);
  const isBusyDay = _.isEmpty(capacityFilter.busyday);

  const systemOptionTemplate = (option) => {
    return (
      <div className="value-options">
        {option.model +
          " (" +
          option.type_fc +
          ") " +
          option.num_of_cores +
          " Cores (" +
          option.cpw +
          ")"}
      </div>
    );
  };

  const selectedSystemTemplate = (option, props) => {
    if (option) {
      return (
        <div className="value-options">
          {option.model +
            " (" +
            option.type_fc +
            ") " +
            option.num_of_cores +
            " Cores (" +
            option.cpw +
            ")"}
        </div>
      );
    }
    return <span>{props.placeholder}</span>;
  };

  const groupedItemTemplate = (option) => {
    return (
      <div className="flex align-items-center">
        <img
          alt={option.label}
          src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png"
          className={`mr-2 flag flag-${option.code.toLowerCase()}`}
          style={{ width: "18px" }}
        />
        <div>{option.label}</div>
      </div>
    );
  };

  const showProposedSys = (e) => {
    setAutoSystem(true);
    setVisible(e);
    // reportChange();
  };

  const setUseSystem = (e) => {
    setAutoSystem(false);
    setChecked(e);
    dispatch(setSysOpt(e === true ? "current" : "proposed"));
    dispatch(
      capacitySaveFilter({
        ...capacityFilter,
        sysOpt: e === true ? "current" : "proposed",
      })
    );
    if (e === true) {
      const sys_data = systemsList.map((element) => {
        return {
          ...element,
          items: element?.items?.filter(
            (item) =>
              item?.model_config_id ===
              capacityFilter?.sys_current?.model_config_id
          ),
        };
      });
      const sys = sys_data.filter((data) => data.items?.length);
      handleSystemChange(sys[0]?.items[0]);
    }
  };

  const handleSystemChange = (systemdata) => {
    if (
      systemdata?.model_config_id ===
      capacityFilter?.sys_current?.model_config_id
    ) {
      setChecked(true);
    } else {
      setChecked(false);
    }
    setAutoSystem(false);
    // const { updatedAt, createdAt, entity_type, entity_data, ...rest } =  systemdata;
    //saveParametersIntoLocalStorage("psystemfilter", systemdata);
    setSelectedSystem(systemdata);
    const CPW = getCPWPerCore(
      systemdata?.num_of_cores,
      systemdata?.num_of_cores,
      systemdata?.cpw
    );
    dispatch(setNCoreProposed(systemdata?.num_of_cores));
    dispatch(setMaxCoresProposed(systemdata?.num_of_cores));
    dispatch(setMaxCPWProposed(systemdata?.cpw));
    dispatch(setCPWProposed(CPW));
    dispatch(
      capacitySaveFilter({
        ...capacityFilter,
        proposed: {
          cores: systemdata?.num_of_cores,
          cpw: systemdata?.cpw,
          max_cores: systemdata?.num_of_cores,
          max_cpw: systemdata?.cpw,
        },
        sys_proposed: {
          model: systemdata?.model,
          feature_code: systemdata?.type_fc,
          model_config_id: systemdata?.model_config_id,
        },
      })
    );
  };

  //debugger;
  const fetchAllSystems = async () => {
    try {
      const response = await getProposedSystems();
      if (response.status === 200) {
        const data = response.data.data || [];
        if (data.length) {
          setSystemsList(data);
          //handleSystemChange(data[0]);
          /*let issavedSystemExists = data.some(
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
    } catch (error) {}
  };

  useEffect(() => {
    fetchAllSystems();
    dispatch(fetchAsyncCPConfig());
  }, []);

  useEffect(() => {
    if (!loadingReport) {
      setSelectedSystem({});
    }
  }, [loadingReport]);

  const filterOptions = (value) => {
    return systemsList.map((filterItems) =>
      filterItems.items.filter((item) =>
        item.cpw
      )
    );
  };

  return (
    <div className="build_para_card_capacity">
      <div className="build_title">
        Proposed System
        {autoSystem ? <span className="autoSys"> ( Auto Proposed ) </span> : ""}
      </div>
      <div className="filter_option">
        <Dropdown
          value={selectedSystem}
          options={systemsList}
          onChange={(e) => handleSystemChange(e.value)}
          optionLabel="label"
          filter
          filterFunction={filterOptions}
          filterBy="model,type_fc,no_of_cores,cpw,power_type"
          placeholder="Select a System"
          valueTemplate={selectedSystemTemplate}
          itemTemplate={systemOptionTemplate}
          optionGroupLabel="label"
          optionGroupChildren="items"
          optionGroupTemplate={groupedItemTemplate}
        />
      </div>

      <div className="filter_option">
        <div className="busyDays">
          <InputSwitch
            checked={checked}
            onChange={(e) => setUseSystem(e.value)}
          />
          <span className="curSystem">Use Current System</span>
          <span> </span>
          <Button
            label="Auto Proposed System"
            icon="pi pi-external-link"
            onClick={() => showProposedSys(true)}
            disabled={isBusyDay || checked}
          />
        </div>
      </div>
      <div>
        <Dialog
          header="Auto Proposed Systems"
          visible={visible}
          style={{ width: "80vw" }}
          breakpoints={{ "960px": "90vw", "641px": "100vw" }}
          onHide={() => showProposedSys(false)}
        >
          <AutoSystems
            id="autoSys"
            selProposedSys={() => showProposedSys(false)}
          />
        </Dialog>
      </div>
    </div>
  );
};

export default React.memo(ProposedSytemFilter);
