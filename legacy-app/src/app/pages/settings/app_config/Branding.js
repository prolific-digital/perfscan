import React, { Fragment, useEffect, useReducer, useRef } from "react";
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';

import { useSelector, useDispatch } from "react-redux";
import { ScrollPanel } from 'primereact/scrollpanel';
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Slider } from 'primereact/slider';

import { getParametersFromLocalStorage } from "../../../../helpers/commonHelper";
import * as _ from "lodash";

// Templates 
import HistoricalTemplates from "./HistoricalTemplates"; 
import PvPTemplates from "./PvPTemplates";
import CapacityTemplates from "./CapacityTemplates";
// End Templates

import ColorPicker from "app/components/common/ColorPickerF";
import RadioCard from "app/components/common/RadioCard";

import SettingHeader from "../SettingHeader";
import { API_URL } from "../../../../typeCodes";
import {
    fetchAsyncLogos, fetchAsyncConfig, saveAsyncConfig, getBrandingData,
    getBrandConfigData, setBrandConfigData, deleteAsyncLogo, delLogoData,
    fetchTemplates, getTemplates
} from "../../../../store/slices/branding";

// Define initial state
const initialState = {
    template: '',
    templateName: '',
    selTemplate: {},
    colorPrimary: '',
    colorSecondary: '',
    selLogoPrimary: '',
    selLogoSecondary: '',
    selLogoNamePrimary: '',
    selLogoNameSecondary: '',
    selLogoPathP: null,
    selLogoPathS: null,
    upload: false,
    logoData: null,
    configData: null,
    reportType: 'historical data',
    selLogo: {},
    logoX: 0,
    logoY: 0,
};

// Define actions
const actionTypes = {
    SET_TEMPLATE: 'SET_TEMPLATE',
    SET_COLOR_PRIMARY: 'SET_COLOR_PRIMARY',
    SET_COLOR_SECONDARY: 'SET_COLOR_SECONDARY',
    SET_LOGO_PRIMARY: 'SET_LOGO_PRIMARY',
    SET_LOGO_SECONDARY: 'SET_LOGO_SECONDARY',
    SET_LOGO_NAME_PRIMARY: 'SET_LOGO_NAME_PRIMARY',
    SET_LOGO_NAME_SECONDARY: 'SET_LOGO_NAME_SECONDARY',
    SET_LOGO_PATH_P: 'SET_LOGO_PATH_P',
    SET_LOGO_PATH_S: 'SET_LOGO_PATH_S',
    SET_UPLOAD: 'SET_UPLOAD',
    SET_LOGO_DATA: 'SET_LOGO_DATA',
    SET_CONFIG_DATA: 'SET_CONFIG_DATA',
    SET_REPORT_TYPE: 'SET_REPORT_TYPE',
    SET_LOGO_POSITION_X: 'SET_LOGO_POSITION_X',
    SET_LOGO_POSITION_Y: 'SET_LOGO_POSITION_Y',
};

// Define reducer
const reducer = (state, action) => {
    switch (action.type) {
        case actionTypes.SET_TEMPLATE:
            return { ...state, template: action.payload };
        case actionTypes.SET_COLOR_PRIMARY:
            return { ...state, colorPrimary: action.payload };
        case actionTypes.SET_COLOR_SECONDARY:
            return { ...state, colorSecondary: action.payload };
        case actionTypes.SET_LOGO_PRIMARY:
            return { ...state, selLogoPrimary: action.payload };
        case actionTypes.SET_LOGO_SECONDARY:
            return { ...state, selLogoSecondary: action.payload };
        case actionTypes.SET_LOGO_NAME_PRIMARY:
            return { ...state, selLogoNamePrimary: action.payload };
        case actionTypes.SET_LOGO_NAME_SECONDARY:
            return { ...state, selLogoNameSecondary: action.payload };
        case actionTypes.SET_LOGO_PATH_P:
            return { ...state, selLogoPathP: action.payload };
        case actionTypes.SET_LOGO_PATH_S:
            return { ...state, selLogoPathS: action.payload };
        case actionTypes.SET_UPLOAD:
            return { ...state, upload: action.payload };
        case actionTypes.SET_LOGO_DATA:
            return { ...state, logoData: action.payload };
        case actionTypes.SET_CONFIG_DATA:
            return { ...state, configData: action.payload };
        case actionTypes.SET_REPORT_TYPE:
            return { ...state, reportType: action.payload };
        case actionTypes.SET_LOGO_POSITION_X:
            return { ...state, logoX: action.payload };
        case actionTypes.SET_LOGO_POSITION_Y:
            return { ...state, logoY: action.payload };
        default:
            return state;
    }
};

const ManageTemplate = ({ reloadData }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const toast = useRef(null);
    const userID = getParametersFromLocalStorage("userID");
    const uploadURL = API_URL + `api/upload/${userID}/type/logo`;

    const dispatchRedux = useDispatch();
    const logos = useSelector(getBrandingData);
    const brandConfig = useSelector(getBrandConfigData);
    const saveConfigData = useSelector(setBrandConfigData);
    const deleteLogoData = useSelector(delLogoData);
    const templates = useSelector(getTemplates);

    const RptType = [
        { name: 'Historical Data', code: 'historical data' },
    ];

    const onUpload = () => {
        dispatch({ type: actionTypes.SET_UPLOAD, payload: true });
        toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded Successfully' });
    };

    const SaveConfig = () => {
        if (state.selLogoPrimary === null) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Please pick a logo' });
            return;
        }
        if (state.template === null) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Please select a template' });
            return;
        }
        if (state.colorPrimary === '#042960' && state.colorSecondary === '#80BFF3') {
            toast.current.show({ severity: 'info', summary: 'Info', detail: 'No color selected, default colors used' });
        }
        const regex = /([a-zA-z]:(?:[\\|\/][a-zA-Z\d-_. ]+)*)([\\|\/])([a-zA-Z\d-_]+\.[a-zA-z]+)/g;
        const data = {
            "logo": state.selLogoPrimary,
            "logo_s": state.selLogoSecondary,
            "logo_name": state.selLogoNamePrimary,
            "logo_s_name": state.selLogoNameSecondary,
            "logo_path_p": _.replace(state.selLogoPathP, regex),
            "logo_path_s": _.replace(state.selLogoPathS, regex),
            "userid": userID,
            "rptType": state.reportType,
            "primaryColor": state.colorPrimary,
            "secondaryColor": state.colorSecondary,
            "selTemplate": state.template,
            "config_id": state.selTemplate.config_id,
            "template_name": state.templateName,
            "config_id": -1
        }
        dispatchRedux(saveAsyncConfig(data));
    };

    const setBrandTemplate = (template) => {
        dispatch({ type: actionTypes.SET_TEMPLATE, payload: template });
    };

    useEffect(() => {
        dispatchRedux(fetchAsyncLogos(userID));
    }, [dispatchRedux, state.upload, deleteLogoData]);

    useEffect(() => {
        if (!logos.loading && logos.data) {
            dispatch({ type: actionTypes.SET_LOGO_DATA, payload: logos.data });
        }
    }, [logos]);

    useEffect(() => {
        dispatchRedux(fetchTemplates(userID, 'historical data'));
    }, [dispatchRedux, saveConfigData]);

    useEffect(() => {
        dispatchRedux(fetchAsyncConfig(state.selTemplate.config_id));
    }, [state.selTemplate]);

    useEffect(() => {
        if (!brandConfig.loading && brandConfig.data.data) {
            dispatch({ type: actionTypes.SET_CONFIG_DATA, payload: brandConfig.data.data[0] });
        }
    }, [brandConfig]);

    useEffect(() => {
        if (!saveConfigData.loading && saveConfigData.data.success) {
            toast.current.show({ severity: 'success', summary: 'Success', detail: saveConfigData.data.message });
            setTimeout(() => {
                toast.current.show({ severity: 'information', summary: 'Info', detail: 'Redirecting...' });
                reloadData(1);
            }, 2000);
        }
    }, [saveConfigData]);

    return (
        <>
            <Toast ref={toast} position="top-right" />
            <div className="setting-options">
                <div className="branding" id="manageBranding">
                    <div className="manage-branding">
                        <div className="add-branding">
                            <div className="form-options">
                                <div className="form_group">
                                    <label className="label">Report Type</label>
                                    <Dropdown className="report_field_input"
                                        value={state.reportType}
                                        onChange={(e) => dispatch({ type: actionTypes.SET_REPORT_TYPE, payload: e.value })}
                                        options={RptType}
                                        optionLabel="name"
                                        inputId="reporttype"
                                        placeholder="Select Report Type"
                                    />
                                </div>
                                <div className="form_group">
                                    <label className="label">Choose Primary Color x</label>
                                    <ColorPicker selColor={state.colorPrimary} setParentColor={(color) => dispatch({ type: actionTypes.SET_COLOR_PRIMARY, payload: color })} style={{ height: '30px', width: '130px' }} />
                                </div>
                                <div className="form_group">
                                    <label className="label">Choose Secondary Color x</label>
                                    <ColorPicker selColor={state.colorSecondary} setParentColor={(color) => dispatch({ type: actionTypes.SET_COLOR_SECONDARY, payload: color })} style={{ height: '30px', width: '130px' }} />
                                </div>
                                <div className="form_group">
                                    <label className="label">Logo Position X</label>
                                    <InputText value={state.logoX} onChange={(e) => dispatch({ type: actionTypes.SET_LOGO_POSITION_X, payload: e.target.value })} />
                                    <Slider value={state.logoX} onChange={(e) => dispatch({ type: actionTypes.SET_LOGO_POSITION_X, payload: e.value })} max={800} />
                                </div>
                                <div className="form_group">
                                    <label className="label">Logo Position Y</label>
                                    <InputText value={state.logoY} onChange={(e) => dispatch({ type: actionTypes.SET_LOGO_POSITION_Y, payload: e.target.value })} />
                                    <Slider value={state.logoY} onChange={(e) => dispatch({ type: actionTypes.SET_LOGO_POSITION_Y, payload: e.value })} max={200} />
                                </div>
                                <div className="form_group upload">
                                    <label className="label">Upload New Logo</label>
                                    <FileUpload mode="basic" name="file" url={uploadURL} accept="image/*" maxFileSize={1000000} onUpload={onUpload} auto chooseLabel="Browse" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="manage-branding">
                        <div className="add-branding">
                            <div className="form-options">
                                <div className="form_group">
                                    <label className="label">Template Name</label>
                                    <InputText value={state.templateName} className="form-control" placeholder="Enter Template Name" style={{ width: '200px' }} onChange={(e) => dispatch({ type: actionTypes.SET_TEMPLATE_NAME, payload: e.target.value })} />
                                </div>
                                <div className="form_group">
                                    <Button onClick={SaveConfig} style={{ marginTop: "22px", height: '50px' }}>Save Settings</Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <div style={{ display: "flex", flexDirection: "column", width: '20%' }}>
                            {state.logoData &&
                                <Fragment>
                                    <h5>Primary Logo</h5>
                                    <ScrollPanel style={{ width: '100%', height: '150px' }} label="test">
                                        <RadioCard type="PrimaryLogo" data={state.logoData} selLogo={(logo) => dispatch({ type: actionTypes.SET_LOGO_PRIMARY, payload: logo })} selLogoName={(logoname) => dispatch({ type: actionTypes.SET_LOGO_NAME_PRIMARY, payload: logoname })} delLogo={delLogo} title="Select Primary Logo" selLogoPath={(path) => dispatch({ type: actionTypes.SET_LOGO_PATH_P, payload: path })} curLogo={state.selLogoNamePrimary} setSelLogo={(logo) => setLogo(logo)} />
                                    </ScrollPanel>
                                </Fragment>
                            }
                            {state.logoData &&
                                <Fragment>
                                    <h5>Secondary Logo</h5>
                                    <ScrollPanel style={{ width: '100%', height: '150px' }}>
                                        <RadioCard type="SecondaryLogo" data={state.logoData} selLogo={(logo) => dispatch({ type: actionTypes.SET_LOGO_SECONDARY, payload: logo })} selLogoName={(logoname) => dispatch({ type: actionTypes.SET_LOGO_NAME_SECONDARY, payload: logoname })} delLogo={delLogo} title="Select Secondary Logo" selLogoPath={(path) => dispatch({ type: actionTypes.SET_LOGO_PATH_S, payload: path })} curLogo={state.selLogoNameSecondary} setSelLogo={(logo) => setLogo(logo)} />
                                    </ScrollPanel>
                                </Fragment>}
                        </div>

                        {state.reportType === 'historical data' && <HistoricalTemplates setTemplate={setBrandTemplate} template={state.template} colorPrimary={state.colorPrimary} colorSecondary={state.colorSecondary} selLogoPrimary={state.selLogoPrimary} selLogoSecondary={state.selLogoSecondary} logoX={state.logoX} logoY={state.logoY} />}
                        {state.reportType === 'period vs period' && <PvPTemplates setTemplate={setBrandTemplate} template={state.template} colorPrimary={state.colorPrimary} colorSecondary={state.colorSecondary} selLogoPrimary={state.selLogoPrimary} selLogoSecondary={state.selLogoSecondary} />}
                        {state.reportType === 'capacity analysis' && <CapacityTemplates setTemplate={setBrandTemplate} template={state.template} colorPrimary={state.colorPrimary} colorSecondary={state.colorSecondary} selLogoPrimary={state.selLogoPrimary} selLogoSecondary={state.selLogoSecondary} />}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ManageTemplate;
