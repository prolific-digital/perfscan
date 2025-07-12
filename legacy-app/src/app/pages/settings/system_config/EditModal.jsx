import React, { useEffect, useState } from 'react'
import { Sidebar } from 'primereact/sidebar';
import { useDispatch, useSelector } from 'react-redux';

import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';

import {fetchIBMSystem, getIBMModal} from "store/slices/system_config/system_config.slice";


function EditModal({id, visibleRight, setVisibleRight, saveModal}) {
  
  const [series, setSeries] = useState('');
  const [model, setModel] = useState('');
  const [featureCode, setFeatureCode] = useState('');
  const [numCores, setNumCores] = useState('');
  const [speed, setSpeed] = useState('');
  const [lparCores, setLparCores] = useState(1);
  const [cpw, setCPW] = useState('');
  const [pGroup, setPGroup] = useState('');
  const [maxStorage, setMaxStorage] = useState('');
  const [maxMemory, setMaxMemory] = useState('');


  const dispatch = useDispatch();
  const modalData = useSelector(getIBMModal);

  useEffect(()=>{
    if(id !== null && id !== 'undefined'){
      dispatch(fetchIBMSystem(id));  
    }
  },[id])

  useEffect(()=>{
    setSeries(modalData.data.power_type);
    setModel(modalData.data.model);
    setFeatureCode(modalData.data.type_fc);
    setNumCores(modalData.data.num_of_cores);
    setSpeed(modalData.data.speed_ghz);
    setSpeed(modalData.data.speed_ghz)
    setCPW(modalData.data.cpw);
    setPGroup(modalData.data.pgroup);
    setMaxStorage(modalData.data.max_storage);
    setMaxMemory(modalData.data.max_memory);
  },[modalData])

  const saveModalData = () => {
    const data = {
        "model_config_id": modalData.data.model_config_id,
        "power_type": series,
        "model":model,
        "type_fc": featureCode,
        "num_of_cores": numCores,
        "speed_ghz": speed,
        "lpar_num_cores": lparCores,
        "cpw": cpw,
        "pgroup": pGroup,
        "per_node_cores": 0,
        "max_storage": maxStorage === '' ? 0 : maxStorage,
        "max_lpar_per_node": 0,
        "max_memory": maxMemory === '' ? 0 : maxMemory 
    }
    saveModal(JSON.stringify(data), 'edit');
  }
  
  return (
    <Sidebar visible={visibleRight} position="right" onHide={() => setVisibleRight(false)} style={{width:"20%"}} blockScroll dismissable={false} >
      
      {modalData.loading && <>Fetching Data ....</>}
      {modalData.error && <>Error Fetching Data...</>}

      <h2>Edit Model</h2>
        <div className="form_group model_config">
          <label className="label">Series</label>                
          <div className="build_para_card_capacity">                            
            <div className="filter_option"> 
              <InputText value={series} onChange={(e) => setSeries(e.target.value)} style={{width:"300px"}}/>                          
            </div>
          </div>
          </div>
          <div className="form_group model_config">
          <label className="label">Model</label>
          <div className="build_para_card_capacity">
            <div className="filter_option">
            <InputText value={model} onChange={(e) => setModel(e.target.value)} style={{width:"300px"}}/>
            </div>
          </div>
        </div>
        <div className="form_group model_config">
          <label className="label">Feature Code</label>
          <div className="build_para_card_capacity">
            <div className="filter_option">
            <InputText value={featureCode} onChange={(e) => setFeatureCode(e.target.value)} style={{width:"300px"}}/>
            </div>
          </div>
        </div>
        <div className="form_group model_config">
          <label className="label">Number of Cores</label>
          <div className="build_para_card_capacity">
            <div className="filter_option">
            <InputNumber value={numCores} onValueChange={(e) => setNumCores(e.value)} 
            style={{height:"40px"}}
            showButtons buttonLayout="horizontal" step={0.05}
            decrementButtonClassName="p-button-secondary" incrementButtonClassName="p-button-secondary" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
            mode="decimal" />            
            </div>
          </div>
        </div>
        <div className="form_group model_config">
          <label className="label">Speed</label>
          <div className="build_para_card_capacity">
            <div className="filter_option">
              <InputText value={speed} onChange={(e) => setSpeed(e.target.value)} style={{width:"300px"}}/>
            </div>
          </div>
        </div>
        <div className="form_group model_config">
          <label className="label">LPAR Cores</label>
          <div className="build_para_card_capacity">
            <div className="filter_option">
            <InputNumber value={lparCores} onValueChange={(e) => setLparCores(e.value)} 
            style={{height:"40px"}}
            showButtons buttonLayout="horizontal" step={0.05}
            decrementButtonClassName="p-button-secondary" incrementButtonClassName="p-button-secondary" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
            mode="decimal" />            
            </div>
          </div>
        </div>
        <div className="form_group model_config">
          <label className="label">CPW</label>
          <div className="build_para_card_capacity">
            <div className="filter_option">
            <InputNumber value={cpw} onValueChange={(e) => setCPW(e.value)} 
            style={{height:"40px"}}
            showButtons buttonLayout="horizontal" step={100}
            decrementButtonClassName="p-button-secondary" incrementButtonClassName="p-button-secondary" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
            mode="decimal" minFractionDigits="0" />            
            </div>
          </div>
        </div>
        
        <div className="form_group model_config">
          <label className="label">P Group</label>
          <div className="build_para_card_capacity">
            <div className="filter_option">
            <InputText value={pGroup} style={{width:"300px"}} onChange={(e)=> setPGroup(e.target.value)} />            
            </div>
          </div>
        </div>
        <div className="form_group model_config">
          <label className="label">Max Storage (TB) </label>
          <div className="build_para_card_capacity">
            <div className="filter_option">
            <InputText value={maxStorage} style={{width:"300px"}} onChange={(e)=> setMaxStorage(e.target.value)} />            
            </div>
          </div>
        </div>
        <div className="form_group model_config">
          <label className="label">Max Memory (GB) </label>
          <div className="build_para_card_capacity">
            <div className="filter_option">
            <InputText value={maxMemory} style={{width:"300px"}} onChange={(e) => setMaxMemory(e.target.value)} />            
            </div>
          </div>
        </div>
        <button className="btn btn-primary" style={{ marginLeft: "5px", marginTop: "10px", width: "100%"}} onClick={saveModalData}>
          Save
        </button>
    </Sidebar>
  )
}

export default EditModal;