import React, { useState, Suspense,memo } from "react";
import ReportFilter from "../components/HistoricalData/ReportFilter"
import * as _l from "lodash";
// import WhatsChanged from "./WhatsChangedData";
const PeriodVsPeriod = React.lazy(()=>import("./PeriodVsPeriod"));

function TestFile() {
  const [dateTab, setDateTab] = useState(10);
  const [loadingReport, setLoadingReport] = useState(false);


  const runReportClickHandler = async () => {
    setLoadingReport(true);
    return "run report"
  }
  const reRunReportClickHandler = async () => {
    setLoadingReport(false);
  }

  return (
    <div>
      Period Vs Period 
      <ReportFilter dateTab={dateTab} runReport = {runReportClickHandler} loadingReport = {loadingReport} changeReport = {reRunReportClickHandler} />
      <div className="filter_option">
      <Suspense fallback={<div>Loading...</div>}>
        <PeriodVsPeriod/>
      </Suspense>
     </div>
    </div>
  )
}

export default memo(TestFile)