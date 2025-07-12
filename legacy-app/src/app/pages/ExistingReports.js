import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import SectionHeader from "../components/SectionHeader";
import useClickOutside from "../hooks/useClickOutside";
import { fetchExistingReportsButtonsData } from "../../store/slices/reports"
import { useSelector, useDispatch } from "react-redux";
import { getParametersFromLocalStorage } from "../../helpers/commonHelper";
import { deleteTemporaryReport } from "../../store/slices/reports/SaveNewReport/SaveNewReport";
import { API_URL } from "../../typeCodes";

function ExistingReports() {
  const [selectedreportType, setSelectedreportType] = useState(null);
  const reportRef = useRef(null);
  const userId = getParametersFromLocalStorage("userID");
  const [reportListData, setReportListData] = useState('');
  const dispatch = useDispatch();
  useClickOutside(reportRef, () => setSelectedreportType(null));
  const reportData = useSelector((state) => state.reports);
  useEffect(() => {
    dispatch(fetchExistingReportsButtonsData(userId))
  }, [dispatch]);

  const pdfUrl = API_URL+"api/renderpdf?"

  const generateNewReport = (rptId,rptType,sysid,sysname,sdate1,edate1,stime1,etime1)=>{
    const qdPdf = {
                   sdate1, 
                   edate1,  
                   stime1,
                   etime1,
                   rptId, 
                   rptType, 
                   userId, 
                   sysid, 
                   sysname,
                   chartMetric: true,
                   trendMetric: true,
                   showGuidelines: false,
                   viewReport:false
                  };
    const searchParams = new URLSearchParams(qdPdf);
    let query = pdfUrl+searchParams.toString();
    return query;
  }


  useEffect(() => {
    if (!reportData.existingreportsbuttonsdata.loading) {
      if (reportData.existingreportsbuttonsdata.data.data) {
        setReportListData(reportData.existingreportsbuttonsdata.data.data)
      }
    }

  }, [reportData])


  const reportList = [
    {
      type: "list1",
      title: "Historical Analysis",
      bgColor: "#036ba3",
      dropdownTitle: "Historical Analysis Reporting",
      reportsListLink: (typeof (reportListData['historical data']) != 'undefined' && Object.keys(reportListData['historical data']).length != 0) ? reportListData['historical data']?.map((val) => (
        { linktitle: val.report_name, data: val })) : {},
      reportData: (typeof (reportListData['historical data']) != 'undefined' && Object.keys(reportListData['historical data']).length != 0) ? reportListData['historical data']?.map((val) => (
        { data: val })) : {}
    },
    {
      type: "list1",
      title: "What's Changed Analysis",
      bgColor: "#3ac37d",
      dropdownTitle: "What's Changed Reporting",
      reportsListLink: (typeof (reportListData['whats changed']) != 'undefined' && Object.keys(reportListData['whats changed']).length != 0) ? reportListData['whats changed']?.map((val) => (
        { linktitle: val.report_name, data: val })) : {},
      reportData: (typeof (reportListData['whats changed']) != 'undefined' && Object.keys(reportListData['whats changed']).length != 0) ? reportListData['whats changed']?.map((val) => (
        { data: val })) : {}
    },
    {
      type: "list1",
      title: "Period vs Period Comparisons",
      bgColor: "#794c89",
      dropdownTitle: "Period vs Period Reporting",
      reportsListLink: (typeof (reportListData['period Vs period']) != 'undefined' && Object.keys(reportListData['period Vs period']).length != 0) ? reportListData['period Vs period']?.map((val) => (
        { linktitle: val.report_name, data: val })) : {},
      reportData: (typeof (reportListData['period Vs period']) != 'undefined' && Object.keys(reportListData['period Vs period']).length != 0) ? reportListData['period Vs period']?.map((val) => (
        { data: val })) : {}
    },
    // {
    //   type: "list1",
    //   title: "Problem Determination",
    //   bgColor: "#d82550",
    //   dropdownTitle: "Problem Determination Reporting",
    //   reportsListLink: (typeof (reportListData['problem determination']) != 'undefined' && Object.keys(reportListData['problem determination']).length != 0) ? reportListData['problem determination']?.map((val) => (
    //     { linktitle: val.report_name, data: val })) : {},
    // },
    {
      type: "list1",
      title: "Capacity Planning",
      bgColor: "#b05007",
      dropdownTitle: "Capacity Planning Reporting",
      reportsListLink: (typeof (reportListData['capacity planning']) != 'undefined' && Object.keys(reportListData['period Vs period']).length != 0) ? reportListData['period Vs period']?.map((val) => (
        { linktitle: val.report_name, data: val })) : {},
      reportData: (typeof (reportListData['period Vs period']) != 'undefined' && Object.keys(reportListData['period Vs period']).length != 0) ? reportListData['period Vs period']?.map((val) => (
        { data: val })) : {}
    },
  ];

  const toggleSelectedGroup = (id) => {
    if (id === selectedreportType) return setSelectedreportType(null);
    setSelectedreportType(id);
  };

  // useEffect(()=>{
  //   if(uniqueId?.data?.uniqueid){
  //     dispatch(deleteTemporaryReport({uniqueid:uniqueId.data.uniqueid}));
  //    }
  // },[]) 

  return (
    <div className="existing_reports_wrapper">
      <SectionHeader title={"Existing Reports"} />
      <div className="existing_reports_list">
        {Object.keys(reportList).length > 0 && reportList.map((item, index) => {
          return (
            <div className={`report report_${index}`} key={index}>
              <button
                className="btn btn-primary"
                style={{
                  backgroundColor: item.bgColor,
                  borderColor: item.bgColor,
                }}
                onClick={(e) => toggleSelectedGroup(index)}
              >
                {item.title} <i className="fa fa-angle-down"></i>
              </button>
              {selectedreportType === index && (
                <div className="custom_popup_wrapper">
                  <div className="popup_header">
                    <div
                      className="bg_image"
                      style={{
                        backgroundColor: item.bgColor,
                      }}
                    ></div>
                    <div className="popup_title">{item.dropdownTitle}</div>
                    <div className="popup_subtitle">
                      Click on the desired report
                    </div>
                  </div>
                  <div className={Object.keys(item.reportsListLink).length > 0 ? "popup_body" : "popup_body_no_data" } key={index}>
                    <ul>
                      {Object.keys(item.reportsListLink).length > 0 ? item.reportsListLink.map((item, index) => (
                        <>
                          <li key={index} style={{marginBottom:'0.5rem'}}>
                            <Link to={`/reports-${item.data.report_type.split(' ')[0]}/${item.data.id}`}
                              state={{
                                sDate: item.data.start_date,
                                eDate: item.data.end_date,
                                sTime: item.data.stime,
                                eTime: item.data.etime,
                                system_name: item.data.system_name,
                                sysid: item.data.sysid,
                                userId: userId,
                                report_type: item.data.report_type,
                                report_name: item.data.report_name, 
                              }}>{item.linktitle}
                              </Link>
                              {(item.data.report_type==="historical data" || item.data.report_type === "period Vs period") &&
                              <a href={generateNewReport(item.data.id, item.data.report_type, item.data.sysid, item.data.system_name,item.data.start_date, item.data.end_date, item.data.stime, item.data.etime,)} target="_blank" rel="noreferrer" style={{position:'absolute', right:'0.8rem',marginTop:'-5px'}}>
                                <button type="btn" className="btn btn-primary"><i className="fa fa-file-pdf-o"></i></button>
                              </a>
                              }
                          </li>
                        </>
                      )) : 'No data available'}
                    </ul>
                  </div>
                </div>
              )}{" "}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ExistingReports;
