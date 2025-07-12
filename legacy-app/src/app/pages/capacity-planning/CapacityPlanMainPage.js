import React, { useState, useCallback, Suspense, useEffect } from "react";
import * as _l from "lodash";
import { BeatLoader } from "react-spinners";
import { useDispatch,useSelector } from "react-redux";
import SectionHeader from "../../components/SectionHeader";
import ReportFilter from "../../components/CapacityPlanning/Filter/ReportFilter";
import { getAutoSys } from "../../../store/slices/capacityplanning/CapacityPlanningSlice";
import useQueryDataCapacityPlanningPDF from "../../../hooks/useQueryDataCapacityPlanningPDF";

const CapacityPlans = React.lazy(() => import("./CapacityPlans"));
const Testing = React.lazy(()=> import("./Testing"));

function CapacityPlanMainPage() {
  const [activeTabID, setActiveTabID] = useState(1);

  const [loadingReport, setLoadingReport] = useState(false);
  
  
  const runReportClickHandler = useCallback(async () => {
    setLoadingReport(true);
    return "run report"
  },[]) 
  
  const reRunReportClickHandler = () => {
    setLoadingReport(false);
  }
  
  const filters = useSelector(state => state.filters);
  let capacityFilter = filters.capacity_filter;
  const isAutoSys = useSelector(getAutoSys);
  
  useEffect(()=>{
    if(isAutoSys){
      runReportClickHandler();
    }
  },[isAutoSys])

  return (
    <div className="capacity_plans_wrapper">
      <SectionHeader title="Capacity Planning Analysis" subTitle="Capacity Planning" help="true" type="CP" />
      <ReportFilter runReportHandler ={runReportClickHandler} loadingReport={loadingReport} changeReport={reRunReportClickHandler} />
      <div className="filter_option">
        {(loadingReport) &&
          <Suspense fallback={<BeatLoader color="#366bd6"/>}>
            <CapacityPlans  />
          </Suspense>
        }
      </div> 
    </div>
  );
}

export default CapacityPlanMainPage;
