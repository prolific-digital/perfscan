import React, { useEffect, useState } from "react";
import {
  fetchAsyncMetricsList,
  getMetricsListData,
} from "../../store/slices/metricsKey/metricsKeySlice";
import { useDispatch, useSelector } from "react-redux";
import * as _ from "lodash";
import PdTableSummaryPrint from "../components/ProblemDetermination/TableSummary/PdTableSummaryPrint";
import PdTopJobsPrint from "../components/ProblemDetermination/ProblemDeterminationTopJobs/PdTopJobsPrint";
import MemoryPdTablePrint from "../components/ProblemDetermination/PDMemoryTable/MemoryPdTablePrint";
import { DetailsProvider } from "../components/ProblemDetermination/DetailedMetricsContext/DetailedContext";
import PrintPageHeader from "./PrintPageHeader"

const ProblemDeterminationPrint = () => {

  const dispatch = useDispatch();
  const metricsKeyData = useSelector(getMetricsListData);
  const [systemsList, setSystemsList] = useState([]);
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

  const ProblemDeterminationFilter = JSON.parse(localStorage.getItem("ProblemDeterminationFilter"));
  return (
    <DetailsProvider>
      <div style={{ pageBreakAfter: "always" }}>
        <PrintPageHeader pageTitle={'Problem Determination'} sDate={ProblemDeterminationFilter.sdate} eDate={ProblemDeterminationFilter.edate} mainmenu={false}/>
      </div>
      <PdTableSummaryPrint runReportStateValue={true} />
      <PdTopJobsPrint runReportStateValue={true} />
      <MemoryPdTablePrint runReportStateValue={true}/>
    </DetailsProvider>
  );
};

export default ProblemDeterminationPrint;
