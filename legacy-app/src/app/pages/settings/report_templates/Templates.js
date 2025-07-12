import React, { useState, useEffect, Fragment, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { confirmPopup } from 'primereact/confirmpopup';
import { APP_URL } from "../../../../typeCodes";
import { useSelector, useDispatch } from 'react-redux';
import { fetchTemplates, getTemplates } from 'store/slices/report_templates/templates.slice';

import { PropagateLoader } from "react-spinners";
import { Toast } from 'primereact/toast';

export default function Templates({editTemplate, deleteTemplate}) {
    const [templates, setTemplates] = useState([]);
    const dispatch = useDispatch();
    const templatesData = useSelector(getTemplates);
    const toast = useRef(null);
    
    useEffect(() => {
        dispatch(fetchTemplates(1));
    }, []);

    useEffect(() => {
        setTemplates(templatesData.data);
    }, [templatesData]);
   

    console.log(templates);

    const imageBodyTemplateP = (templates) => {
        return ( 
          <Fragment>
          <div style={{backgroundColor:'white', marginBottom:'10px', textAlign:'center', paddingBottom:'10px'}} className="w-10rem shadow-2">
           <span style={{color:'black',height:'30px'}}>Primary</span>
          <img src={`${templates.logo_primary}`} alt={templates.logo_primary_name} style={{padding:'3px'}} className="w-9rem shadow-2 border-round" />
          
        </div>
        <div style={{backgroundColor:'white', marginBottom:'10px', textAlign:'center', paddingBottom:'10px'}} className="w-10rem shadow-2">
        <span style={{color:'black',height:'30px'}}>Secondary</span>
       <img src={`${templates.logo_secondory}`} alt={templates.logo_secondary_name} style={{padding:'3px'}} className="w-9rem shadow-2 border-round" />
       
     </div></Fragment>
        )
      };

    const isDefault = (templates) => {
        return (
          templates.is_default ? <span>Yes</span> : <span>No</span>
        )
    };

    const colorTemplateP = (templates) => {
        return (
        <Fragment> 
        <div style={{backgroundColor:`${templates.color_primary}`,height:'50px', width:'150px', marginBottom:'10px'}} >
          <span style={{backgroundColor:'black', color:'white',height:'20px', textAlign:'center', marginLeft:'-5px'}}>P</span>
          <span style={{backgroundColor:'white', color:'black',height:'20px', textAlign:'center'}}>{templates.color_primary}</span>
        </div>
        <div style={{backgroundColor:`${templates.color_secondary}`,height:'50px', width:'150px', marginBottom:'10px'}} >
          <span style={{backgroundColor:'black', color:'white',height:'20px', textAlign:'center',  marginLeft:'-5px'}}>S</span>
          <span style={{backgroundColor:'white', color:'black',height:'20px', textAlign:'center', }}>{templates.color_secondary}</span>
        </div>
        </Fragment>);
};

  const accept = (id) => {
    toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
  };

  const reject = () => {
    toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
  };

  const confirm = (event, id) => {
    confirmPopup({
        group: 'headless',
        target: event.currentTarget,
        message: 'Are you sure you want to proceed?', 
        icon: 'pi pi-exclamation-triangle',
        defaultFocus: 'accept',
        accept : () => accept(id),
        reject
    });
};

    const reportActions = (template) => {
        return (
          <div style={{ display: "flex" }}>
            <button
              className="btn btn-icon-secondary btn-icon"
              onClick={() => editTemplate(template.config_id)}
              aria-label='Edit'
              title={`Edit Template ${template.config_id}`}
            >
              <i className="pi pi-pencil"></i>
            </button>
            {
            !template.is_system &&
            <button
              className="btn btn-danger  btn-icon"
              style={{ marginLeft: "5px" }}
              onClick={(e) => deleteTemplate(template.config_id)}
              aria-label='Delete'
              title='Delete Template'
            >
              <i className="fa fa-trash"></i>
            </button>
            }
            {/*
            <button
              className="btn btn-icon-secondary btn-icon"
              style={{ marginLeft: "5px" }}
              onClick={() => viewTemplate(templates.config_id)}
              aria-label='Play'
              title='View Template'
            >
              <i className='fa fa-play'></i>
            </button>*/}
          </div>
        );
      };
    
    const getTemplateURL = (template) => {
      switch(template.report_type){
        case 'historical data':
          return `${APP_URL}historical/`;
        case 'period vs period':
          return `${APP_URL}PVP/`;
        case 'capacity':
          return `${APP_URL}capacity/`;
      }
    }
    
    const Template = (template) => {
        switch (template.sel_template) {
            case 'Template1':
                return <img src={`${getTemplateURL(template)}report_cover_1.webp`} alt={template.logo_secondary_name} className="w-12rem shadow-2 border-round" />;
            case 'Template2':
                return <img src={`${getTemplateURL(template)}report_cover_2.webp`} alt={template.logo_secondary_name} className="w-12rem shadow-2 border-round" />;
            case 'Template3':
                return <img src={`${getTemplateURL(template)}report_cover_3.webp`} alt={template.logo_secondary_name} className="w-12rem shadow-2 border-round" />;
            case 'Template4':
              return <img src={`${getTemplateURL(template)}report_cover_4.webp`} alt={template.logo_secondary_name} className="w-12rem shadow-2 border-round" />;
            case 'Template5':
              return <img src={`${getTemplateURL(template)}report_cover_5.webp`} alt={template.logo_secondary_name} className="w-12rem shadow-2 border-round" />;
              default:
                return null;
        }
    };
    const header = (
        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <span className="text-xl text-900 font-bold">Templates</span>
        </div>
    );
    const footer = `In total there are ${templates ? templates.length : 0} templates.`;

    return (
        <div className='table_wrapper'>
          <Toast ref={toast} />
            {templatesData.loading ? <PropagateLoader /> : 
            <div style={{width:'100%'}}>
                <DataTable value={templatesData.data}  footer={footer} tableStyle={{ minWidth: '60rem', width: '100%' }}
                paginator rows={2} rowsPerPageOptions={[5, 10, 25, 50]} showGridlines>
                    <Column field="template_name" header="Template Name"></Column>
                    <Column field="report_type" header="Template Type"></Column>
                    <Column field="sel_template" header="Template Preview" body={Template} style={{width:'220px'}}></Column>
                    <Column header="Color" body={colorTemplateP} style={{width:'180px'}}></Column>
                    <Column header="Logo" body={imageBodyTemplateP} style={{width:'190px'}}></Column>
                    <Column field="is_default" header="Default" body={isDefault}></Column>
                    <Column header="Actions" field={(data) => reportActions(data, "report")}></Column>
                </DataTable>   
            </div> 
        }
        </div>
    );
}