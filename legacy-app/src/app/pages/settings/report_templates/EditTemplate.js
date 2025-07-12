import React, { Fragment, useEffect, useState, useRef } from "react";
import { Toast } from 'primereact/toast';
import {Button} from 'primereact/button'
import { Tooltip } from 'primereact/tooltip';
import { FileUpload } from 'primereact/fileupload';
import { useSelector, useDispatch } from "react-redux";
import { ScrollPanel } from 'primereact/scrollpanel';
import { InputText } from "primereact/inputtext";
import { Slider } from 'primereact/slider';
import { Checkbox } from 'primereact/checkbox';

import { getParametersFromLocalStorage } from "../../../../helpers/commonHelper";
import * as _ from "lodash"; 

import ColorPicker from "../../../components/common/ColorPickerF";
import RadioCard from "../../../components/common/RadioCard";

import { API_URL } from "../../../../typeCodes";
import {fetchAsyncLogos, fetchAsyncConfig, saveAsyncConfig, getBrandingData, 
    getBrandConfigData, setBrandConfigData, deleteAsyncLogo, delLogoData, 
    fetchTemplates, getTemplates} from "../../../../store/slices/branding"


import 'swiper/swiper.min.css'
import 'swiper/modules/pagination/pagination.min.css'
import 'swiper/modules/navigation/navigation.min.css'

// Templates 
import HistoricalTemplates from "./HistoricalTemplates"; 
import PvPTemplates from "./PvPTemplates";
import CapacityTemplates from "./CapacityTemplates";
// End Templates
 
const EditTemplate = ({reloadData, templateId}) => {
    //debugger;
    const [template, setTemplate] = useState('');
    const [templateName, setTemplateName] = useState('');
    const [selTemplate, setSelTemplate] = useState({});
    const [colorPrimary, setColorPrimary] = useState('#042960');
    const [colorSecondary, setColorSecondary] = useState('#80BFF3');
    const [selLogoPrimary, setSelLogoPrimary] = useState(null);
    const [selLogoSecondary, setSelLogoSeondary] = useState(null);
    const [selLogoNamePrimary, setSelLogoNamePrimary] = useState(null);
    const [selLogoNameSecondary, setSelLogoNameSeondary] = useState(null);
    const [selLogoPathP, setSelLogoPathP] = useState(null);
    const [selLogoPathS, setSelLogoPathS] = useState(null);
    const [upload, setUpload] = useState(false);
    const [logoData,setLogoData] = useState(null);
    const [configData, setConfigData] = useState(null);
    const [rptType, setRptType] = useState('historical data');
    const [selLogoP, setSelLogoP] = useState({});
    const [selLogoS, setSelLogoS] = useState({});
    const [logoX, setLogoX] = useState(0)
    const [logoY, setLogoY] = useState(0)
    const [checked, setChecked] = useState(false);
    const toast = useRef(null);

    const userID = getParametersFromLocalStorage("userID");
    const uploadURL = API_URL + `api/upload/${userID}/type/logo`;

    const dispatch = useDispatch();
    const logos = useSelector(getBrandingData);
    const brandConfig = useSelector(getBrandConfigData);
    const saveConfigData = useSelector(setBrandConfigData);
    const deleteLogoData = useSelector(delLogoData);
    const templates = useSelector(getTemplates);
   
    const onUpload = () => {
        setUpload(true);
        toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded Successfully' });
    };

    const SaveConfig = () => {
        if(selLogoPrimary === null){
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Please pick a logo' });
            return;
        }
        if(template === null){
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Please select a template' });
            return;
        }
        if(colorPrimary === '#042960' && colorSecondary === '#80BFF3'){
            toast.current.show({ severity: 'info', summary: 'Info', detail: 'No color selected, default colors used' });
        }
        const regex = /([a-zA-z]:(?:[\\|\/][a-zA-Z\d-_. ]+)*)([\\|\/])([a-zA-Z\d-_]+\.[a-zA-z]+)/g;
        const data = {
            "logo":selLogoPrimary,
            "logo_s":selLogoSecondary,
            "logo_name":selLogoNamePrimary,
            "logo_s_name":selLogoNameSecondary,
            "logo_path_p":_.replace(selLogoPathP, regex),
            "logo_path_s":_.replace(selLogoPathS, regex),
            "userid": userID,
            "rptType": rptType,
            "primaryColor": colorPrimary,
            "secondaryColor": colorSecondary,
            "selTemplate": template,
            "config_id":selTemplate.config_id,
            "template_name":templateName,
            "logox": logoX,
            "logoy": logoY,
            "isDefault": checked
        }
        dispatch(saveAsyncConfig(data));
    }
    
    const setBrandTemplate = (template) => {
        setSelTemplate(template);
    }
    const getColorPrimary = (color) => {
        setColorPrimary(color)
    };

    const getColorSecondary = (color) => {
        setColorSecondary(color)
    };

    const getLogoPrimary = (logo) =>{
        setSelLogoPrimary(logo);
    }

    const getLogoSecondary = (logo) =>{
        setSelLogoSeondary(logo);
    }

    const getLogoNamePrimary = (logoname) =>{
        setSelLogoNamePrimary(logoname);
    }

    const getLogoNameSecondary = (logoname) =>{
        setSelLogoNameSeondary(logoname);
    }

    const getLogoPathP = (logoPath) => {
        setSelLogoPathP(logoPath);
    }

    const getLogoPathS = (logoPath) => {
        setSelLogoPathS(logoPath);
    }

    const delLogo = (sellogo) => {
        dispatch(deleteAsyncLogo({userID, sellogo}))
    }

    const setLogoP = (logo) => {
        setSelLogoP(logo);        
    }

    const setLogoS = (logo) => {
        setSelLogoS(logo);        
    }
    
    useEffect(() => {
        dispatch(fetchAsyncLogos(userID)) 
    }, [dispatch, upload, deleteLogoData]);

    useEffect(() => {
        if(!logos.loading && logos.data){
        setLogoData(logos.data)
        }
    },[logos])

    useEffect(() => {
        dispatch(fetchTemplates(userID,'historical data'));
    },[dispatch, saveConfigData])

    useEffect(() => {
        dispatch(fetchAsyncConfig(templateId))
    },[templateId])

    useEffect(() => {
        if(!brandConfig.loading && brandConfig.data.data){
            setConfigData(brandConfig.data.data[0]);
        }
    },[brandConfig])
    
    
    console.log(configData);
    useEffect(() => {
        if(!saveConfigData.loading && saveConfigData.data.success ){
            toast.current.show({ severity: 'success', summary: 'Success', detail: saveConfigData.data.message });
            setTimeout(() => {
                toast.current.show({ severity: 'information', summary: 'Info', detail: 'redireting...' });
                reloadData(1);    
            },2000)
        }
    },[saveConfigData]);
   
    const brandOptionTemplate = (option) => {
        return (
            <div className="value-options">
                {option.template_name} - {option.sel_template}
            </div>
        );
    };
    const selectedBrandTemplate = (option, props) => {
        if (option) {
            return (
                <div className="value-options">
                    {option.template_name} - {option.sel_template}
                </div>
            );
        }
        return <span>{props.placeholder}</span>;
    };
    useEffect(()=> { 
        setBrandTemplate(configData);
        setColorPrimary(configData?.color_primary);
        setColorSecondary(configData?.color_secondary);
        setTemplate(configData?.sel_template);
        setSelLogoPrimary(configData?.sel_logo);
        setSelLogoSeondary(configData?.sel_logo_s);
        setSelLogoNamePrimary(configData?.sel_logo_name);
        setSelLogoNameSeondary(configData?.sel_logo_s_name);
        setSelLogoPathP(configData?.sel_logo_path);
        setSelLogoPathS(configData?.sel_logo_s_path);
        setTemplateName(configData?.template_name);
        setLogoX(configData?.logox);
        setLogoY(configData?.logoy);
        setChecked(configData?.is_default);
    },[configData])

    return (
        <div className="setting-options">
            <Toast ref={toast} position="top-right" />
            <Tooltip target=".help">
                <p>
                    Logo height will be adjusted automatically to 100px, Logo should be transparent.
                </p>
            </Tooltip>
            {/*}
            <SettingHeader
                iconClass={"fa fa-picture-o"}
                title={"Branding"}
                subTitle={""}
            />*/}
            <div className="branding" id="manageBranding">
                    <div className="manage-branding">
                        <div className="add-branding">
                            <div className="form-options">
                                
                                <div className="form_group">
                                    <label className="label">Choose Primary Color x</label>
                                    <ColorPicker selColor={colorPrimary} setParentColor={getColorPrimary} style={{ height: '30px', width: '130px' }} />
                                </div>
                                <div className="form_group">
                                    <label className="label">Choose Secondary Color x</label>
                                    <ColorPicker selColor={colorSecondary} setParentColor={getColorSecondary} style={{ height: '30px', width: '130px' }} />
                                </div>
                                <div className="form_group">
                                    <label className="label">Logo Position X</label>
                                    <InputText value={logoX} onChange={(e) => setLogoX(e.target.value)} />
                                    <Slider value={logoX} onChange={(e) => setLogoX(e.value)} max={800} />
                                </div>
                                <div className="form_group">
                                    <label className="label">Logo Position Y</label>
                                    <InputText value={logoY} onChange={(e) => setLogoY(e.target.value)} />
                                    <Slider value={logoY} onChange={(e) => setLogoY(e.value)} max={1122} />
                                </div>                              
                            </div>
                        </div></div>
                    <div className="manage-branding">
                        <div className="add-branding">
                            {/*<div className="sidebar-title">Logo and Colors <span className="help"> ! </span></div>*/}
                            <div className="form-options">
                                
                                    <div className="form_group">
                                        <label className="label">Template Name</label>
                                        <InputText value={templateName} className="form-control" placeholder="Enter Template Name" style={{ width: '200px' }} onChange={(e) => setTemplateName(e.target.value)} />                                
                                    </div>
                                    <div className="form_group">
                                        <label className="label">Cover Page Default </label>
                                        <Checkbox onChange={e => setChecked(e.checked)} checked={checked} ></Checkbox>
                                    </div> 
                                    <div className="form_group">
                                    <Button onClick={SaveConfig} style={{ marginTop: "22px", height: '50px' }}>Save Settings</Button>
                                </div>                              
                            </div>
                            
                            <div className="form-options">
                                {/*<BrandTemplate Primary={colorPrimary} Secondary={colorSecondary} width="400" height="400"/>*/}
                            </div>
                        </div>
                    </div>


                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <div style={{ display: "flex", flexDirection: "column", width: '20%' }}>
                            {logoData &&
                                <Fragment>
                                    <h5 style={{marginBottom:"20px"}}>Primary Logo</h5>
                                    <ScrollPanel style={{ width: '100%', height: '150px' }} label="test">
                                        <RadioCard type="PrimaryLogo" data={logoData} selLogo={getLogoPrimary} selLogoName={getLogoNamePrimary} delLogo={delLogo} title="Select Primary Logo" selLogoPath={getLogoPathP} curLogo={selLogoNamePrimary} setSelLogo={setLogoP} />
                                    </ScrollPanel>
                                </Fragment>
                            }{logoData &&
                                <Fragment>
                                    <h5 style={{marginTop:"50px", marginBottom:"20px"}}>Secondary Logo</h5>
                                    <ScrollPanel style={{ width: '100%', height: '150px'}} >

                                        <RadioCard type="SecondaryLogo" data={logoData} selLogo={getLogoSecondary} selLogoName={getLogoNameSecondary} delLogo={delLogo} title="Select Secondary Logo" selLogoPath={getLogoPathS} curLogo={selLogoNameSecondary} setSelLogo={setLogoS} />

                                    </ScrollPanel></Fragment>}
                        </div>

                        {configData?.report_type === 'historical data' && <HistoricalTemplates setTemplate={setTemplate} template={template} colorPrimary={colorPrimary} colorSecondary={colorSecondary} selLogoPrimary={selLogoPrimary} selLogoSecondary={selLogoSecondary} logoX={logoX} logoY={logoY} />}
                        {configData?.report_type === 'period vs period' && <PvPTemplates setTemplate={setTemplate} template={template} colorPrimary={colorPrimary} colorSecondary={colorSecondary} selLogoPrimary={selLogoPrimary} selLogoSecondary={selLogoSecondary} />}
                        {configData?.report_type === 'capacity analysis' && <CapacityTemplates setTemplate={setTemplate} template={template} colorPrimary={colorPrimary} colorSecondary={colorSecondary} selLogoPrimary={selLogoPrimary} selLogoSecondary={selLogoSecondary} />}
                    </div>                              
            </div>
        </div>
    )
};

export default EditTemplate;