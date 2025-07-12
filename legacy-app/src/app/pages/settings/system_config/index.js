import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { PropagateLoader } from "react-spinners";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { MultiSelect } from 'primereact/multiselect';
import { InputText } from 'primereact/inputtext';

import { fetchIBMSystems, getIBMModals, updateIBMSystems, createIBMSystems, getUpdateData, getCreateData, deleteIBMSystems, getDeleteData  } from 'store/slices/system_config/system_config.slice';
import SectionHeader from "app/components/SectionHeader";
import DelWithConfirm from 'app/components/common/DelWithConfirm';
import SettingHeader from "../SettingHeader";
import EditModal from './EditModal';
import AddModal from "./AddModal";

export default function SystemConfig() {
    const [sysConfig , setSysConfig] = useState(null);
    const [sysID, setSysID] = useState(null);
    const [edit, setEdit] = useState(false);
    const [add, setAdd] = useState(false);
    
    const columns = [
      { field: 'power_type', header: 'Power Type' },
      { field: 'model', header: 'Model' },
      { field: 'type_fc', header: 'Feature Code' },
      { field: 'num_of_cores', header: 'Number of Cores' },
      { field: 'speed_ghz', header: 'Processor Speed' },
      { field: 'lpar_num_cores', header: 'Number of Cores (LPAR)' },
      { field: 'cpw', header: 'CPW' },
      { field: 'pgroup', header: 'P Group' },
      { field: 'max_storage', header: 'Storage' },
      { field: 'max_memory', header: 'Memory' }
    ];
    const [filters, setFilters] = useState({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [visibleColumns, setVisibleColumns] = useState(columns);

    const dispatch = useDispatch();
    const ibmModalsData = useSelector(getIBMModals);
    const updateData = useSelector(getUpdateData);
    const createData = useSelector(getCreateData);
    const deleteData = useSelector(getDeleteData);

    const toast = useRef(null);
    const dt = useRef(null);

    useEffect(() => {
      dispatch(fetchIBMSystems());        
    }, []);

    useEffect(()=> {
        setSysConfig(ibmModalsData.data);
    },[ibmModalsData])

    const showToast = (type, summary, details) => {
      toast.current.show({
        severity: type || "success",
        summary: summary || "Success Message",
        detail: details || "Message Content",
        life: 3000,
      });
    };

    const editSystem = (id) => {
        setEdit(true);
        setSysID(id);
    }

    const deleteSystem = (id) => {
      dispatch(deleteIBMSystems(id));      
    }

    const onColumnToggle = (event) => {
      let selectedColumns = event.value;
      let orderedSelectedColumns = columns.filter((col) => selectedColumns.some((sCol) => sCol.field === col.field));

      setVisibleColumns(orderedSelectedColumns);
    };

    const onGlobalFilterChange = (e) => {
      const value = e.target.value;
      let _filters = { ...filters };

      _filters['global'].value = value;

      setFilters(_filters);
      setGlobalFilterValue(value);
    };

    const sysActions = (sys) => {
        return (
          <div style={{ display: "flex" }}>
            <button
              className="btn btn-icon-secondary btn-icon"
              onClick={() => editSystem(sys.model_config_id)}
              aria-label='Edit'
              title='Edit Report'
            >
              <i className="pi pi-pencil"></i>
            </button>
            <DelWithConfirm message={`Do you want to delete ${sys.power_type} ( ${sys.model}, ${sys.type_fc} )`} onAccept={deleteSystem} id={sys.model_config_id} />
            {/*<button
              className="btn btn-danger  btn-icon"
              style={{ marginLeft: "5px" }}
              onClick={(e) => deleteSystem(sys.model_config_id)}
              aria-label='Delete'
              title='Delete System'
            >
              <i className="fa fa-trash"></i>
            </button>*/}
          </div>
        );
    };

    const saveModal = (data, action) => {
      console.log("Save Model Called");
      if(action === 'edit'){        
        dispatch(updateIBMSystems(data)); 
        setEdit(false);      
      }else{        
        dispatch(createIBMSystems(data));        
        setAdd(false);
      }      
    }
    useEffect(()=>{
      if(createData && createData.data.success){
        showToast("success", "Data Saved", "Model Config Created Successfully");
        dispatch(fetchIBMSystems());
      }else if(createData && createData.data.success === false){
        showToast("error", "Error", createData?.data?.message);
      }
    },[createData]);

    useEffect(()=> {
      if(updateData && updateData.data.success){
        showToast("success", "Data Saved", "Model Config Updated Successfully");
        dispatch(fetchIBMSystems());
      }else if(updateData && updateData.data.success === false){
        showToast("error", "Error", updateData?.data?.message);
      }
    },[updateData]);

    useEffect(()=> {
      if(deleteData && deleteData.data.success){
        showToast("success", "Delete", "Model data deleted successfully");
        dispatch(fetchIBMSystems());
      }else if(deleteData && deleteData.data.success === false){
        showToast("error", "Error", deleteData?.data?.message);
      }
    },[deleteData]);

    const header = () => {
      return (
        <>
          <div className="flex" style={{justifyContent:'space-between'}}>         
            <button className="btn btn-primary" style={{ marginLeft: "5px", marginTop: "10px"}} onClick={()=> setAdd(true)}>
              New IBMi Model
            </button>            
            <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" style={{width:"300px"}} />
            <MultiSelect value={visibleColumns} options={columns} optionLabel="header" onChange={onColumnToggle} className="w-full sm:w-20rem" display="chip" />
          </div>          
        </>
      );
    }
    
    return (
        <div className="setting-container">
              {/*<SectionHeader title={"Settings"} help="true" type="IBM-MODELS" />*/}
              <div className="setting-options-wrapper">
                <div className="setting-options">
                <SettingHeader
                iconClass={"fa fa-calendar-check-o"}
                title={"IBM Models"}
                subTitle={
                "IBM Power Systems"
                }
                pLink={""}
            />            
            <Toast ref={toast} position="top-right"></Toast> 
            {ibmModalsData.loading ? <PropagateLoader /> : 
            <div style={{width:'100%'}}>               
                <DataTable ref={dt} value={sysConfig} filters={filters} stripedRows paginator rows={10} rowsPerPageOptions={[10, 20, 50, 100]}
                sortMode="multiple" header={header} >
                    <Column field="model_config_id" header="ID"></Column>
                    {visibleColumns.map((col) => (
                      <Column key={col.field} field={col.field} header={col.header} sortable />
                    ))}
                    <Column header="Action" field={(data) => sysActions(data)}></Column>
                </DataTable>                            
            </div>
            }
        </div>
      </div>
      <EditModal id={sysID} visibleRight={edit} setVisibleRight={setEdit} saveModal={saveModal} />
      <AddModal  visibleRight={add} setVisibleRight={setAdd} saveModal={saveModal} />
    </div>
    );
}