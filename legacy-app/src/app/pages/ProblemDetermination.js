import React, { useEffect, useState } from "react";
import { fetchAsyncMetricsList } from "../../store/slices/metricsKey/metricsKeySlice";
import { useDispatch } from "react-redux";
import * as _ from 'lodash';
import PdTableSummary from "../components/ProblemDetermination/TableSummary/PdTableSummary";
import PdTopJobs from "../components/ProblemDetermination/ProblemDeterminationTopJobs/PdTopJobs";
import { DetailsProvider } from "../components/ProblemDetermination/DetailedMetricsContext/DetailedContext";
import MemoryPdTable from "../components/ProblemDetermination/PDMemoryTable/MemoryPdTable";
import PDReportFilter from "../components/ProblemDetermination/PDReportFilter/PDReportFilter";
import { useCallback } from "react";
import { getToggleValue } from "../../store/slices/topJobs/toggleTopJobsButton";
import { useSelector } from "react-redux";

const ProblemDetermination = () => {
  const dispatch = useDispatch();
  const [loadingReport, setLoadingReport] = useState(false);
  const [toggleBuildParameter, setToggleBuildParameter] = useState(true);
  const [runReportStateValue, setRunReportStateValue] = useState(false);
  const toggleVal = useSelector(getToggleValue);
  const [dateTab, setDateTab] = useState(10);
  const filter = useSelector(state=>state.toggleTopJobsBtn)
  useEffect(() => {
    dispatch(fetchAsyncMetricsList());
  }, [dispatch])
  const runReportClickHandler = useCallback(async () => {
    setLoadingReport(true);
    setRunReportStateValue(true);
    return "run report"
  },[]) 

  const reRunReportClickHandler = useCallback(async () => {
    setLoadingReport(false);
    setRunReportStateValue(true);
  },[]) 

  return (
    <DetailsProvider loadingReport={loadingReport}>
      <div className="performance_wrapper">
        <PDReportFilter dateTab={dateTab} runReport={runReportClickHandler} loadingReport={loadingReport} changeReport={reRunReportClickHandler} />
        {loadingReport &&
          <>
            <PdTableSummary runReportStateValue={runReportStateValue} loadingReport={loadingReport}/>
            {toggleVal && 
            <button className="btn btn-primary" onClick={() => setToggleBuildParameter(!toggleBuildParameter)}>
              {toggleBuildParameter ? "Hide" : "Show"} Top Jobs
            </button>
            }
            {toggleBuildParameter && (
              <PdTopJobs runReportStateValue={runReportStateValue} />
            )}
        <MemoryPdTable runReportStateValue={runReportStateValue}/>
          </>
        }
      </div>
    </DetailsProvider>
  )
}

export default ProblemDetermination