import React, { useEffect, useState } from "react";
import { fetchAsyncMetricsList, getMetricsListData } from "../../store/slices/metricsKey/metricsKeySlice";
import { useDispatch, useSelector } from "react-redux";
import * as _ from 'lodash';
import { DetailsProvider } from "../components/ProblemDeterminationReport/DetailedMetricsContextReport/DetailedContextReport";
import PdTableSummaryReport from "../components/ProblemDeterminationReport/TableSummaryReport/PdTableSummaryReport";
import PdTopJobsReport from "../components/ProblemDeterminationReport/ProblemDeterminationTopJobsReport/PdTopJobsReport";
import MemoryPdTableReport from "../components/ProblemDeterminationReport/PDMemoryTableReport/MemoryPdTableReport";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

const ProblemDeterminationReport = () => {
  const dispatch = useDispatch();
  const metricsKeyData = useSelector(getMetricsListData);
  const [loadingReport, setLoadingReport] = useState(true);
  const [toggleBuildParameter, setToggleBuildParameter] = useState(true);
  const [runReportStateValue, setRunReportStateValue] = useState(false);
  const [systemsList, setSystemsList] = useState([]);
  const location = useLocation();

  useEffect(() => {
    dispatch(fetchAsyncMetricsList());
  }, [dispatch])

  useEffect(() => {
    if (!_.isEmpty(metricsKeyData.data)) {
      if (!_.isEmpty(metricsKeyData.data?.metrics_key_data)) {
        setSystemsList(metricsKeyData.data.metrics_key_data)
      }
    }
  }, [metricsKeyData])

  const params = useParams();
  const reportId = { rptId: params.rptid }


  return (
    <DetailsProvider>
      <div className="performance_wrapper">
        {loadingReport &&
          <>
            <PdTableSummaryReport runReportStateValue={runReportStateValue} reportId={reportId} filters={location.state} />
            <button className="btn btn-primary" onClick={() => setToggleBuildParameter(!toggleBuildParameter)}>
              {toggleBuildParameter ? "Hide" : "Show"} Top Jobs
            </button>
            {toggleBuildParameter && (
              <PdTopJobsReport runReportStateValue={runReportStateValue} reportId={reportId} filters={location.state}/>
              )}
            <MemoryPdTableReport reportId={reportId} />
          </>
        }
      </div>
    </DetailsProvider>

  )
}

export default ProblemDeterminationReport