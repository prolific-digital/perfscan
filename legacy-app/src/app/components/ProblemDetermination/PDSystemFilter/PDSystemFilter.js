import { defaultFormat } from "moment"
import React, { useEffect, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { getAllSystems, getAllEvents } from "../../../../services/apiService";
import { useSelector, useDispatch } from "react-redux";
import {
    getParametersIntoLocalStorage,
    saveParametersIntoLocalStorage,
  } from "../../../../helpers/commonHelper";
import { systemFilter } from "../../../../store/slices/searchFilter";

const PDSytemFilter = () => {
    const lastQueryData = getParametersIntoLocalStorage("systemfilter");
    const [systemsList, setSystemsList] = useState([]);
    const [eventsList, setEventsList] = useState([]);
    const [selectedSystem, setSelectedSystem] = useState(
      (lastQueryData)? lastQueryData : {}
    );
    const dispatch = useDispatch();

    const systemOptionTemplate = (option) => {
      return (
        <div className="value-options">
          {option.entity_name} - {option.entity_description} - {" "}
          {option.entity_data.serial}
        </div>
      );
    };
  
    const selectedSystemTemplate = (option, props) => {
        if (option) {
          return (
            <div className="value-options">
              {option.entity_name} - {option.entity_description} - {" "}
            </div>
          );
        }
        return <span>{props.placeholder}</span>;
    };

    const handleSystemChange = (systemdata) => {
      const { updatedAt, createdAt, entity_type, entity_data, ...rest } =  systemdata;
      setSelectedSystem(systemdata);
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
                (item) => item.id == lastQueryData.selectedSystem.id
              );
              if (
                issavedSystemExists &&
                lastQueryData &&
                lastQueryData.selectedSystem &&
                lastQueryData.selectedSystem.id
              ) {
                handleSystemChange(lastQueryData.selectedSystem);
              } else {
                handleSystemChange(data[0]);
              }
            }
          }
        } catch (error) {}
    };
    
    const fetchAllEvents = async () => {
        try {
          let response = await getAllEvents();
          if (response.status === 200) {
            if (response.data?.length) {
              setEventsList(response.data || []);
            }
          }
        } catch (error) {}
    };


    useEffect(() => {
        fetchAllSystems();
        fetchAllEvents();
        dispatch(systemFilter(selectedSystem));
    }, []);

    // const systemIdHandle = () => {
    //   sysIdChange();
    // }

    return (
        <div className="build_para_card">
                    <div className="build_title">System</div>
                    <div className="filter_option">
                        <Dropdown
                            value={selectedSystem}
                            options={systemsList}
                            onChange={(e) => handleSystemChange(e.value)}
                            optionLabel="entity_name,entity_description,entity_data.serial"
                            filter
                            filterBy="entity_name,entity_description,entity_data.serial"
                            placeholder="Select a System"
                            valueTemplate={selectedSystemTemplate}
                            itemTemplate={systemOptionTemplate}
                        />
                    </div>
                    <div>
                      {/* {
                        (selectedSystem) &&
                        <div>
                          {systemIdHandle()}
                        </div> 
                      } */}
                      
                    </div>
                    
                </div>
    )
}

export default PDSytemFilter;