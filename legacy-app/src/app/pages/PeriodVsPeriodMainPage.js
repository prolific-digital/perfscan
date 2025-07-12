import React, { useState, Suspense, memo, useCallback } from "react";
import * as _l from "lodash";
import PeriodReportFilter from "../components/PeriodVsPeriod/PeriodReportFilter";
import { BeatLoader } from "react-spinners";
const PeriodVsPeriod = React.lazy(() => import("./PeriodVsPeriod"));

function PeriodVsPeriodMainPage() {
  const [dateTab, setDateTab] = useState(10);
  const [loadingReport, setLoadingReport] = useState(false);
  const runReportClickHandler = useCallback(async () => {
    setLoadingReport(true);
    return "run report"
    },[]) 

  const reRunReportClickHandler = useCallback(async () => {
    setLoadingReport(false);
  },[])

  return (
    <div className="performance_wrapper">
      <PeriodReportFilter dateTab={dateTab} runReport={runReportClickHandler} loadingReport={loadingReport} changeReport={reRunReportClickHandler} />
      <div className="filter_option">
        {loadingReport &&
          <Suspense fallback={<BeatLoader color="#366bd6"/>}>
            <PeriodVsPeriod />
          </Suspense>
        }
      </div>
    </div>
  )
}

export default memo(PeriodVsPeriodMainPage)
