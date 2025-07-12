import React, { useState, useEffect, Fragment, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { useNavigate } from "react-router-dom";
import { APP_URL } from "../../../../typeCodes";
import { SHORT_METRICS } from '../../../../utils/constant';
import { useSelector, useDispatch } from 'react-redux';
import { fetchReports,getReportsData, setIsEditing } from '../../../../store/slices/report_scheduler/schedulerSlice';
import { PropagateLoader } from "react-spinners";
import { Toast } from 'primereact/toast';

export default function Reports({editReport, deleteReport, runReport}) {
    const [reports, setReports] = useState([]);
    const dispatch = useDispatch();
    const reportsData = useSelector(getReportsData);
    const state = useSelector(state => state);
    const toast = useRef(null);
    
    useEffect(() => {
        //console.log("Fetch Reports");
        dispatch(fetchReports());
    }, []);

    useEffect(()=>{
        setReports(reportsData.data);
    },[reportsData]);

   
    const imageBodyTemplateP = (reports) => {
        return ( 
          <Fragment>
          <div style={{backgroundColor:'white', marginBottom:'10px', textAlign:'center', paddingBottom:'20px'}} className="w-10rem shadow-2">
           <span style={{color:'black',height:'20px'}}>Primary</span>
          <img src={`${reports.logo_primary}`} alt={reports.logo_primary_name} style={{padding:'3px'}} className="w-9rem shadow-2 border-round" />
          
        </div>
        <div style={{backgroundColor:'white', marginBottom:'10px', textAlign:'center'}} className="w-10rem shadow-2">
        <span style={{color:'black',height:'20px'}}>Secondary</span>
       <img src={`${reports.logo_secondory}`} alt={reports.logo_secondary_name} style={{padding:'3px'}} className="w-9rem shadow-2 border-round" />
       
     </div></Fragment>
        )
      };

    const imageBodyTemplateS = (reports) => {
        return <img src={`${reports.logo_secondory}`} alt={reports.logo_secondary_name} className="w-6rem shadow-2 border-round" />;
    };

    const colorTemplateP = (reports) => {
        return (
        <Fragment> 
        <div style={{backgroundColor:`${reports.color_primary}`,height:'50px', marginBottom:'10px'}} className="w-5rem shadow-2 border-round">
          <span style={{color:'white',height:'20px', textAlign:'center'}}>P</span>
          <span style={{backgroundColor:'white', color:'black',height:'20px', textAlign:'center', border:'1px solid black'}}>{reports.color_primary}</span>
        </div>
        <div style={{backgroundColor:`${reports.color_secondary}`,height:'50px'}} className="w-5rem shadow-2 border-round">
          <span style={{color:'white',height:'20px', textAlign:'center'}}>S</span>
          <span style={{backgroundColor:'white', color:'black',height:'20px', textAlign:'center', border:'1px solid black'}}>{reports.color_secondary}</span>
        </div>
        </Fragment>);
};


    const metrixTemplate = (reports) => {
        return (
        <div style={{display: "flex",flexWrap: "wrap", gap: "0.2rem"}}>
        {
        Object.keys(reports.metrix).map((key) => 
        reports.metrix[key] ? 
            <span style={{width:'50px;',border:'1px solid black', borderRadius:'5px', padding:'2px', margin:'1px'}}>{SHORT_METRICS[key]}</span>
        : ''
        )}
        </div>
        )
    }

  const deliveryTemplate = (reports) => {
    switch(reports.delivery?.type){
      case "weekly" : {
        return (
          <div style={{display: "flex",flexWrap: "wrap", gap: "0.2rem"}}>
              Weekly at {reports.delivery.hour}:{reports.delivery.minute} on {reports.delivery.day_of_week}
          </div>
        )
        break;
      }
      case "monthly" : {
        return (
          <div style={{display: "flex",flexWrap: "wrap", gap: "0.2rem"}}>
              Monthly at {reports.delivery.hour}:{reports.delivery.minute} 
          </div>
        )
        break;
      }
      default : {
        return (
          <div style={{display: "flex",flexWrap: "wrap", gap: "0.2rem"}}>
              Daily at {reports.delivery.hour}:{reports.delivery.minute} 
          </div>
        )
        break;
      }
    }
  }
  
  const recipientsTemplate = (reports) => {
    const cntReceipients = reports.report_recipients.length;
    return (
      <div style={{display: "flex",flexWrap: "wrap", gap: "0.2rem"}}>
        {reports.report_recipients.map((report, i) =>
        {
          if(i < 3){
            return (
              <span style={{whiteSpace: 'normal', wordBreak: 'break-word'}}>
                {report}
              </span> 
            )
          }
        })}
        {cntReceipients > 3 ? <span>and {cntReceipients - 3} more</span> : ''} 
      </div>
    )
  }

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

    const reportActions = (report) => {
        return (
          <div style={{ display: "flex" }}>
            <button
              className="btn btn-icon-secondary btn-icon"
              onClick={() => editReport(report.report_id)}
              aria-label='Edit'
              title='Edit Report'
            >
              <i className="pi pi-pencil"></i>
            </button>
            <button
              className="btn btn-danger  btn-icon"
              style={{ marginLeft: "5px" }}
              onClick={(e) => deleteReport(report.report_id, report.cronicle_jobid ? report.cronicle_jobid : 0)}
              aria-label='Delete'
              title='Delete Report'
            >
              <i className="fa fa-trash"></i>
            </button>
            <button
              className="btn btn-icon-secondary btn-icon"
              style={{ marginLeft: "5px" }}
              onClick={() => report.cronicle_jobid ? runReport(report.cronicle_jobid) : toast.current.show({ severity: 'warn', summary: 'Info', detail: 'Schedule not set'})}
              aria-label='Play'
              title='Run Report'
            >
              <i className='fa fa-play'></i>
            </button>
          </div>
        );
      };
    
    
    
    const Template = (templates) => {
        switch (templates.sel_template) {
            case 'Template1':
                return <img src={`${APP_URL}template_1.png`} alt={templates.logo_secondary_name} className="w-6rem shadow-2 border-round" />;
            case 'Template2':
                return <img src={`${APP_URL}template_2.png`} alt={templates.logo_secondary_name} className="w-6rem shadow-2 border-round" />;
            case 'Template3':
                return <img src={`${APP_URL}template_3.png`} alt={templates.logo_secondary_name} className="w-6rem shadow-2 border-round" />;
            default:
                return null;
        }
    };
    const header = (
        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <span className="text-xl text-900 font-bold">Reports</span>
        </div>
    );
    const footer = `In total there are ${reports ? reports.length : 0} reports.`;

    return (
        <div className='table_wrapper'>
          <Toast ref={toast} />
            {reportsData.loading ? <PropagateLoader /> : 
            <div style={{width:'100%'}}>
                <DataTable value={reportsData.data}  footer={footer} tableStyle={{ minWidth: '60rem', width: '100%' }}
                paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} showGridlines>
                    <Column field="report_name" header="Report Name"></Column>
                    <Column field="sel_template" header="Template" body={Template}></Column>
                    <Column header="Color" body={colorTemplateP} style={{width:'120px'}}></Column>
                    <Column header="Logo" body={imageBodyTemplateP} style={{width:'190px'}}></Column>
                    <Column field="entity_name" header="System" style={{width:'120px'}}></Column>
                    <Column field="report_type" header="Report Type" style={{width:'140px'}}></Column>
                    <Column field="metrix" header="Metrics" body={metrixTemplate} style={{width:'140px'}}></Column>
                    <Column field="report_recipients" header="Recipients" body={recipientsTemplate} style={{width:'190px'}}></Column>
                    <Column field="delivery" header="Delivery" body={deliveryTemplate}></Column>
                    <Column header="Actions" field={(data) => reportActions(data, "report")}></Column>
                </DataTable>   
            </div> 
        }
        </div>
    );
}