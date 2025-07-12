import React, { useState, Suspense, useCallback } from "react";
import * as _l from "lodash";
import WhatsChangedReportFilter from "../components/WhatsChanged/WhatsChangedReportFilter";
import GridLoader from "react-spinners/GridLoader";
const WhatsChangedData = React.lazy(() => import("./WhatsChangedData"));

const WhatsChangedMainPage = () => {
  const [loadingReport, setLoadingReport] = useState(false);
  const [dateTab, setDateTab] = useState(10);

  const runReportClickHandler = useCallback(async () => {
    setLoadingReport(true);
    return "run report"
  },[]) 

  const reRunReportClickHandler = useCallback(async () => {
    setLoadingReport(false);
    },[]) 

  return (
    <div>
      <div className="filter_option">
      <WhatsChangedReportFilter dateTab={dateTab} runReport = {runReportClickHandler} loadingReport = {loadingReport} changeReport = {reRunReportClickHandler} />
      </div>
          {loadingReport &&
        <Suspense fallback={<div><GridLoader color="#366bd6"/></div>}>
          <WhatsChangedData />
        </Suspense>
          }
    </div>
    )
}

export default WhatsChangedMainPage