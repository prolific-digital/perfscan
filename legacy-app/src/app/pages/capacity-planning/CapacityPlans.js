import React, { memo, useEffect,Suspense, useState } from 'react';

import CapacityHeader from '../../components/CapacityPlanning/CapacityHeader/'
//import PeriodSummaryTable from '../../components/PeriodVsPeriod/PeriodSummaryTable';
import { useSelector, useDispatch } from "react-redux";
import { BeatLoader } from "react-spinners";
import CapacityCpwChart from '../../components/CapacityPlanning/CapacityCharts/CapacityCpwChart';
import CapacitySummaryTable from '../../components/CapacityPlanning/Summary/CapacitySummaryTable';

function CapacityPlans() {
  const filters = useSelector(state => state.filters);
  let capacityFilter = filters.capacity_filter;

  
  const system2 = capacityFilter.sysOpt === 'current' ? capacityFilter.sys_current.model + ' - ' + capacityFilter.sys_current.feature_code : capacityFilter.sys_proposed.model + ' - ' + capacityFilter.sys_proposed.feature_code;
  const sys2Cores = capacityFilter.sysOpt === 'current' ? capacityFilter.current.max_cores : capacityFilter.proposed.max_cores || "";
  const sys2CPW = capacityFilter.sysOpt === 'current' ? capacityFilter.current.max_cpw : capacityFilter.proposed.max_cpw || "";

  return (
  <>
    
      <>
        {/*<CapacityHeader
          system1 = {capacityFilter.sys_current.model + ' - ' + capacityFilter.sys_current.feature_code}
          system2 = { system2 }
          sys1Cores = {capacityFilter.current.max_cores}
          sys2Cores = {sys2Cores}
          sys1CPW = {capacityFilter.current.max_cpw}
          sys2CPW = { sys2CPW }
          sysOpt = { capacityFilter.sysOpt }
        /> */}
        <CapacitySummaryTable />
        {/* TODO : Capacity Summary Table Here */ }
      </>
      <div className="chart_view_wrapper">
          <Suspense fallback={<BeatLoader color="#366bd6"/>}>
            <CapacityCpwChart />
           
          </Suspense>
      </div>
  </>
  )
}

export default memo(CapacityPlans);