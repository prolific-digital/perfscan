import React, { useEffect, useState, useRef } from 'react'
import { Sidebar } from 'primereact/sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { Toast } from 'primereact/toast';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';

import { fetchIBMSystem, getIBMModal } from "store/slices/system_config/system_config.slice";
import { Button } from 'reactstrap';

function EditModal({ visibleRight, setVisibleRight, saveModal }) {
    const [powerType, setPowerType] = useState('Power 10');
    const [modal, setModal] = useState('');
    const [featureCode, setFeatureCode] = useState('');
    const [numCores, setNumCores] = useState('');
    const [speed, setSpeed] = useState('');
    const [lparCores, setLparCores] = useState('');
    const [cpw, setCPW] = useState('');
    const [pGroup, setPGroup] = useState('');
    const [maxStorage, setMaxStorage] = useState('');
    const [maxMemory, setMaxMemory] = useState('');

    const toast = useRef(null);

    const showToast = (type, summary, details) => {
        toast.current.show({
            severity: type || "success",
            summary: summary || "Success Message",
            detail: details || "Message Content",
            life: 3000,
        });
    };

    const saveModalData = () => {
        let err = false;
        const data = {
            "power_type": powerType,
            "model": modal,
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
        if(powerType === ''){
            showToast("error","Data Error", "Series is Required");
            err = true;
        }else if(modal === ''){
            showToast("error","Data Error", "Model is Required");
            err = true;
        }else if(featureCode === ''){
            showToast("error","Data Error", "Feature Code is required");
            err = true
        }else if(numCores === ''){
            showToast("error","Data Error", "Number of Cores is required");
            err = true
        }else if(cpw === ''){
            showToast("error","Data Error", "CPW is required");
            err = true
        }
        if(!err){
            saveModal(JSON.stringify(data), 'add');
        }
        
    }

    return (
        <Sidebar visible={visibleRight} position="right" onHide={() => setVisibleRight(false)} style={{ width: "20%" }} blockScroll dismissable={false}>
            <Toast ref={toast} position="top-right"></Toast>
            <h2>Add Model</h2>
            <div className="form_group model_config">
                <label className="label">Series</label>
                <div className="build_para_card_capacity model_config">
                    <div className="filter_option">
                        <InputText value={powerType} onChange={(e) => setPowerType(e.target.value)} style={{ width: "300px" }} />
                    </div>
                </div>
            </div>
            <div className="form_group model_config">
                <label className="label">Model</label>
                <div className="build_para_card_capacity model_config">
                    <div className="filter_option">
                        <InputText value={modal} onChange={(e) => setModal(e.target.value)} style={{ width: "300px" }} />
                    </div>
                </div>
            </div>
            <div className="form_group model_config">
                <label className="label">Feature Code</label>
                <div className="build_para_card_capacity model_config">
                    <div className="filter_option">
                        <InputText value={featureCode} onChange={(e) => setFeatureCode(e.target.value)} style={{ width: "300px" }} />
                    </div>
                </div>
            </div>
            <div className="form_group model_config">
                <label className="label">Number of Cores</label>
                <div className="build_para_card_capacity">
                    <div className="filter_option">
                        <InputNumber value={numCores} onValueChange={(e) => setNumCores(e.value)}
                            style={{ height: "40px" }}
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
                        <InputText value={speed} onChange={(e) => setSpeed(e.target.value)} style={{ width: "300px" }} />
                    </div>
                </div>
            </div>
            <div className="form_group model_config">
                <label className="label">LPAR Cores</label>
                <div className="build_para_card_capacity">
                    <div className="filter_option">
                        <InputNumber value={lparCores} onValueChange={(e) => setLparCores(e.value)}
                            style={{ height: "40px" }}
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
                            style={{ height: "40px" }}
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
                        <InputText value={pGroup} style={{ width: "300px" }} onChange={(e) => setPGroup(e.target.value)} />
                    </div>
                </div>
            </div>
            <div className="form_group model_config">
                <label className="label">Max Storage (TB) </label>
                <div className="build_para_card_capacity">
                    <div className="filter_option">
                        <InputNumber value={maxStorage} onValueChange={(e) => setMaxStorage(e.value)} style={{ height: "40px" }} />
                    </div>
                </div>
            </div>
            <div className="form_group model_config">
                <label className="label">Max Memory (GB) </label>
                <div className="build_para_card_capacity">
                    <div className="filter_option">
                        <InputNumber value={maxMemory} onValueChange={(e) => setMaxMemory(e.value)} style={{ height: "40px" }} />
                    </div>
                </div>
            </div>
            <button className="btn btn-primary" style={{ marginLeft: "5px", marginTop: "10px", width: "100%" }} onClick={() => saveModalData()}>
                Save
            </button>
        </Sidebar>
    )
}

export default EditModal;