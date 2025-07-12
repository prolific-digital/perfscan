import React, {useState, Suspense, memo } from "react";
import { useCallback } from "react";
import { BeatLoader } from "react-spinners";
import HistoricalReportFilter from "../components/HistoricalData/HistoricalReportFilter";

const HistoricalData = React.lazy(()=>import('./HistoricalData')) ;

 function HistoricalDataMainPage()  {
  const [loadingReport, setLoadingReport] = useState(false);

  const [dateTab, setDateTab] = useState(10);
  const runReportClickHandler = async () => {
    setLoadingReport(true);
    return "run report"
    }

  const reRunReportClickHandler = async () => {
    setLoadingReport(false);
  }
   
  return (
    <div className="performance_wrapper">
    <HistoricalReportFilter dateTab={dateTab} runReport = {runReportClickHandler} loadingReport = {loadingReport} changeReport = {reRunReportClickHandler} />
       <div className="filter_option">
        {loadingReport &&
          <Suspense fallback={<BeatLoader color="#366bd6"/>}>
               <HistoricalData />
          </Suspense>
        }
      </div> 
    </div>
  )
}

export default memo(HistoricalDataMainPage)
