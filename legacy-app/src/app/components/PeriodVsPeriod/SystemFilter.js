import React, { useEffect, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { SelectButton } from 'primereact/selectbutton';
import { getAllSystems } from "../../../services/apiService";
import { useDispatch, useSelector } from "react-redux";
import {
    getParametersFromLocalStorage,
    saveParametersIntoLocalStorage,
  } from "../../../helpers/commonHelper";
import { systemFilter, _systemFilter,periodSaveFilter } from "../../../store/slices/searchFilter";
import { deleteTemporaryReport } from "../../../store/slices/reports/SaveNewReport/SaveNewReport";
import { getUuidData } from "../../../store/slices/reports/SaveNewReport/SaveNewReport";

const SytemFilter = ({reportChange,loadingReport}) => {
    const SystemFilterData = getParametersFromLocalStorage("systemfilter");
    const _SystemFilterData = getParametersFromLocalStorage("_systemfilter");
    const periodSaveFilter1 = getParametersFromLocalStorage("PeriodSaveFilter")
    const uniqueId = getParametersFromLocalStorage("uniqueid")
    const uuid = useSelector(getUuidData);
    const [systemsList, setSystemsList] = useState([]);
    const [selectedSystem, setSelectedSystem] = useState(
      SystemFilterData ? SystemFilterData : {}
    );
    const [_selectedSystem, _setSelectedSystem] = useState(
      _SystemFilterData ? _SystemFilterData : {}
    );
    const [value1, setValue1] = useState('Single');
    const [placeholder, setPlaceholder] = useState('Select a system')
    const dispatch = useDispatch();
    const options = ['Single', 'Multiple'];  

    const systemOptionTemplate = (option) => {
      return (
        <div className="value-options">
          {option.entity_name} - {option.entity_description} - {" "}
          {option.entity_data.frame.serial_number}
        </div>
      );
    };
  
    const selectedSystemTemplate = (option, props) => {
        if (option) {
          return (
            <div className="value-options">
              {option.entity_name} - {option.entity_description} - {" "}
              {option.entity_data.frame.serial_number}
            </div>
          );
        }
        return <span>{props.placeholder}</span>;
    };

    const handleSystemChange = (systemdata, systype) => {
      const { updatedAt, createdAt, entity_type, entity_data, ...rest } =  systemdata;
      if(systype === 1){
        setSelectedSystem(systemdata);
        dispatch(systemFilter(systemdata)); //dispatch systemFilter action which is defined in reducer.
        saveParametersIntoLocalStorage("systemfilter", systemdata);
      }else{
        _setSelectedSystem(systemdata);
        dispatch(_systemFilter(systemdata)); //dispatch systemFilter action which is defined in reducer.
        saveParametersIntoLocalStorage("_systemfilter", systemdata);        
      }
      reportChange()
    };
    
    const fetchAllSystems = async () => {
        try {
          const response = await getAllSystems();
          if (response.status === 200) {
            const data = response.data || [];
            if (data.length) {
              setSystemsList(data);
              let isSavedSystemExists = data.some(
                (item) => item.id == SystemFilterData.id
              );
              let _isSavedSystemExists = data.some(
                (item) => item.id == _SystemFilterData.id
              );
              if (
                isSavedSystemExists &&
                SystemFilterData &&
                SystemFilterData.id
              ) {
                handleSystemChange(SystemFilterData, 1);
              } else if (
                _isSavedSystemExists &&
                SystemFilterData &&
                SystemFilterData.id
              ) {
                handleSystemChange(_SystemFilterData, 2);
              } else {
                handleSystemChange(data[0], 1);
                handleSystemChange(data[0], 2);
              }
            }
          }
        } catch (error) {}
    };
    

    useEffect(() => {
        fetchAllSystems()
    }, []);

    // useEffect(()=>{
    //   if(!loadingReport && uniqueId?.data?.uniqueid){
    //     dispatch(deleteTemporaryReport({uniqueid:uniqueId.data.uniqueid}));
    //   }
    //   if(!uuid?.loading && uuid.data.uniqueid){
    //     dispatch(deleteTemporaryReport({uniqueid:uuid.data.uniqueid}));
    //   }
    // },[dispatch, SystemFilterData.id, _SystemFilterData.id])

    const setSysChoice = (e) => {
      setValue1(e.value);
      if(e.value === 'Multiple'){
        let sysOpt = 'Multiple'
        setPlaceholder('Select First System');
        dispatch(periodSaveFilter({...periodSaveFilter1,sysOpt}));
        saveParametersIntoLocalStorage("PeriodSaveFilter",{...periodSaveFilter1,sysOpt})
        reportChange()
      }else{
        let sysOpt = 'Single'
        setPlaceholder('Select a system');
        dispatch(periodSaveFilter({...periodSaveFilter1,sysOpt}));
        saveParametersIntoLocalStorage("PeriodSaveFilter",{...periodSaveFilter1,sysOpt})
        reportChange()
      }
    }  

    return (
        <div className="build_para_card">
                    <div className="build_title">System</div>
                    <div>
                      <SelectButton value={value1} options={options} onChange={(e) => setSysChoice(e)} style={{paddingBottom:'30px'}}/>
                    </div>
                    <div className="filter_option">
                        <Dropdown
                            value={selectedSystem}
                            options={systemsList}
                            onChange={(e) => handleSystemChange(e.value,1)}
                            optionLabel="entity_name,entity_description,entity_data.serial"
                            filter
                            filterBy="entity_name,entity_description,entity_data.frame.serial_number"
                            placeholder={placeholder}
                            valueTemplate={selectedSystemTemplate}
                            itemTemplate={systemOptionTemplate}
                        />
                    </div>
                    {value1 === "Multiple" &&
                    <div className="filter_option" style={{marginTop:'30px'}}>
                        <Dropdown
                            value={_selectedSystem}
                            options={systemsList}
                            onChange={(e) => handleSystemChange(e.value,2)}
                            optionLabel="entity_name,entity_description,entity_data.serial"
                            filter
                            filterBy="entity_name,entity_description,entity_data.serial"
                            placeholder="Select Second System"
                            valueTemplate={selectedSystemTemplate}
                            itemTemplate={systemOptionTemplate}
                        />
                    </div>
                    }
                </div>
    )
}

export default React.memo(SytemFilter);