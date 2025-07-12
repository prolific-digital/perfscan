import React, { Fragment, useEffect, useState, useRef } from "react";
import { Toast } from 'primereact/toast';
import {Button} from 'primereact/button'
import { Tooltip } from 'primereact/tooltip';
import { FileUpload } from 'primereact/fileupload';
import { Swiper, SwiperSlide } from "swiper/react";
import { useSelector, useDispatch } from "react-redux";
import { ScrollPanel } from 'primereact/scrollpanel';
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { BlockUI } from 'primereact/blockui';
import { Navigation } from "swiper";

import { getParametersFromLocalStorage } from "../../../helpers/commonHelper";
import * as _ from "lodash"; 

// Templates 
import CoverTemplate1 from "../../components/Branding/Historical/CoverTemplate1";
import CoverTemplate2 from "../../components/Branding/Historical/CoverTemplate2";
import CoverTemplate3 from "../../components/Branding/Historical/CoverTemplate3";
// End Templates 

import ColorPicker from "../../components/common/ColorPickerF";
import RadioCard from "../../components/common/RadioCard";


import SettingHeader from "./SettingHeader";
import { API_URL } from "../../../typeCodes";
import {fetchAsyncLogos, fetchAsyncConfig, saveAsyncConfig, getBrandingData, 
    getBrandConfigData, setBrandConfigData, deleteAsyncLogo, delLogoData, 
    fetchTemplates, getTemplates} from "../../../store/slices/branding/"


import 'swiper/swiper.min.css'
import 'swiper/modules/pagination/pagination.min.css'
import 'swiper/modules/navigation/navigation.min.css'

 
const ManageBranding = () => {
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
            "template_name":templateName
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
        dispatch(fetchAsyncConfig(selTemplate.config_id))
    },[selTemplate])

    useEffect(() => {
        if(!brandConfig.loading && brandConfig.data.data){
            setConfigData(brandConfig.data.data[0]);
        }
    },[brandConfig])

    useEffect(() => {
        if(!saveConfigData.loading && saveConfigData.data.success ){
            toast.current.show({ severity: 'success', summary: 'Success', detail: saveConfigData.data.message });
            return;
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
        //console.log({configData})    
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
    },[configData])
    return (
        <div className="setting-options">
            <Toast ref={toast} position="top-right" />
            <Tooltip target=".help">
                <p>
                    Logo height will be adjusted automatically to 100px, Logo should be transparent.
                </p>
            </Tooltip>
            <SettingHeader
                iconClass={"fa fa-picture-o"}
                title={"Branding"}
                subTitle={""}
            />
            <div className="branding" id="manageBranding">
            <div className="manage-branding">
            <div className="add-branding">
                        <div className="form-options">  
                        <div className="form_group">
                        <label className="label">Select Template</label>
                            <Dropdown placeholder="Select Template" value={selTemplate} options={templates.data} 
                            optionLabel="template_name" onChange={(e) => setBrandTemplate(e.value)}
                            valueTemplate={selectedBrandTemplate}
                            itemTemplate={brandOptionTemplate}/>
                        </div>
                        <div className="form_group">
                        <label className="label">Choose File</label>
                            <FileUpload mode="basic" name="file" url={uploadURL} accept="image/*" maxFileSize={1000000} onUpload={onUpload} auto chooseLabel="Browse"/>
                        </div>
                        </div>
                        </div></div>
                        <BlockUI blocked={false} template={<i className="pi pi-lock" style={{ fontSize: '3rem' }}></i>}>
                        <div className="manage-branding">
                            <div className="add-branding">
                                {/*<div className="sidebar-title">Logo and Colors <span className="help"> ! </span></div>*/}
                                    <div className="form-options">
                                        
                                        
                                        <div className="form_group">
                                            <label className="label">Choose Primary Color</label>
                                            
                                                <ColorPicker selColor={colorPrimary} setParentColor={getColorPrimary} style={{height:'50px'}}/>
                                            
                                        </div>
                                        <div className="form_group">
                                        <label className="label">Choose Secondary Color</label>
                                        
                                            <ColorPicker selColor={colorSecondary} setParentColor={getColorSecondary} style={{height:'50px'}}/>
                                        
                                        </div>
                                        <div className="form_group">
                                        <label className="label">Template Name</label>
                                            <InputText value={templateName} className="form-control" placeholder="Enter Template Name" style={{width:'200px'}} onChange={(e) => setTemplateName(e.target.value)}/>
                                        </div>
                                        <div className="form_group">
                                            <Button onClick={SaveConfig} style={{marginTop: "22px", height:'50px'}}>Save Settings</Button>
                                        </div>
                                    </div>
                                    <div className="form-options">
                                        {/*<BrandTemplate Primary={colorPrimary} Secondary={colorSecondary} width="400" height="400"/>*/}
                                    </div>
                                </div>
                            </div>
                            
                            <div style={{display: "flex",flexDirection: "row"}}>
                                <div style={{display: "flex",flexDirection: "column", width:'20%'}}>
                                    {logoData && configData && 
                                    <Fragment>
                                    <h5>Primary Logo</h5>
                                    <ScrollPanel style={{ width: '100%', height: '250px' }} label="test">
                                        <RadioCard type="PrimaryLogo" data={logoData} selLogo={getLogoPrimary} selLogoName={getLogoNamePrimary} delLogo={delLogo} title="Select Primary Logo" curLogo={configData.sel_logo_name} selLogoPath={getLogoPathP} />
                                    </ScrollPanel>
                                    </Fragment>
                                    }{logoData && configData && 
                                        <Fragment>
                                    <h5>Secondary Logo</h5>
                                    <ScrollPanel style={{ width: '100%', height: '250px' }} >
                                    
                                        <RadioCard type="SecondaryLogo" data={logoData} selLogo={getLogoSecondary} selLogoName={getLogoNameSecondary} delLogo={delLogo} title="Select Secondary Logo" curLogo={configData.sel_logo_s_name} selLogoPath={getLogoPathS} />
                                    
                                    </ScrollPanel></Fragment>}
                                </div>
                                <div style={{width:'30%'}} />
                                {configData &&  
                                <Swiper navigation={true} modules={[Navigation]} style={{width:'50%', height:'500px'}}>
                                    <SwiperSlide>
                                        {configData &&
                                        <>
                                        <CoverTemplate1 
                                            logo = {selLogoPrimary}
                                            logo_s = {selLogoSecondary}
                                            report_name = "Historical Analysis Report"
                                            system = "Greymine"
                                            report_period = "April 1-30, 2022"
                                            report_date = "02/25/2023"
                                            client_name = "Doug's Golf Supply"
                                            Primary={colorPrimary} Secondary={colorSecondary} width="300" />
                                        <span style={{display:"block", marginTop:"20px"}}>{template === 'Template1' ? 'SELECTED' :  <Button label="Choose Template 1" onClick={()=>setTemplate("Template1")}/>}</span>
                                        </>}
                                    </SwiperSlide>
                                    <SwiperSlide>
                                    {configData &&
                                        <>
                                        <CoverTemplate2 
                                            logo = {selLogoPrimary}
                                            logo_s = {selLogoSecondary}
                                            report_name = "Historical Analysis Report"
                                            system = "Greymine"
                                            report_period = "April 1-30, 2022"
                                            report_date = "02/25/2023"
                                            client_name = "Doug's Golf Supply"
                                            Primary={colorSecondary} Secondary={colorPrimary} width="300" />
                                        <span style={{display:"block", marginTop:"20px"}}>{template ==="Template2" ? 'SELECTED' : <Button label="Choose Template 2" onClick={()=>setTemplate("Template2")}/>}</span>
                                        </>}
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        {configData &&
                                        <>
                                        <CoverTemplate3 
                                            logo = {selLogoPrimary}
                                            logo_s = {selLogoSecondary}
                                            report_name = "Historical Analysis Report"
                                            system = "Greymine"
                                            report_period = "April 1-30, 2022"
                                            report_date = "02/25/2023"
                                            client_name = "Doug's Golf Supply"
                                            Primary={colorPrimary} Secondary={colorSecondary} width="300" />
                                            <span style={{display:"block", marginTop:"20px"}}>{template === 'Template3' ? 'SELECTED' : <Button label="Choose Template 3" onClick={()=>setTemplate("Template3")}/>}</span>
                                        </>}
                                    </SwiperSlide>
                                </Swiper>}
                           </div>
                        </BlockUI>
               {/* <embed
    src={"http://localhost:8080/api/renderPDF"}
    type="application/pdf"
    height={800}
    width={500}
/>*/}
              
                
            </div>
        </div>
    )
};

export default ManageBranding;