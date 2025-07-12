import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchAsyncCPWGraph, getCPWChartData } from "../../../../store/slices/capacityplanning/CapacityPlanningSlice";
import useQueryDataCapacityAnalysis from "../../../../hooks/useQueryDataCapacityAnalysis";
import * as _ from 'lodash';
import moment from "moment";

import { createChartDataMapping, getCPWPerCore } from "../../../../helpers/capacityHelper";
import ChartViewCapacity from "../../common/ChartViewCapacity";
import GridLoader from "react-spinners/GridLoader";
import { findMinMax, getRound } from "../../../../helpers/commonHelper";
import { getUuidData } from "../../../../store/slices/reports/SaveNewReport/SaveNewReport";
import { getProposedGrowth, setProposedGrowth, getCurrent, getProposed } from "../../../../store/slices/capacityplanning/CapacityPlanningSlice";

const CapacityCpwChart = () => {
  const dispatch = useDispatch();
  const cpwData = useSelector(getCPWChartData);
  const filters = useSelector(state => state.filters);
  const cFilter = filters.capacity_filter; 
  const uuid = useSelector(getUuidData);
  const perc_growth = useSelector(getProposedGrowth);

  const current = useSelector(getCurrent);
  const proposed = useSelector(getProposed);

  let period1 = "";
  let period2 = "";
  let isPeriodSame = false;

  const MAX_CPW_CURRENT = getCPWPerCore(current.cores, current.max_cores, current.max_cpw);
  const MAX_CPW_PROPOSED = getCPWPerCore(proposed.cores, proposed.max_cores, proposed.max_cpw);
  let cpw_current = cFilter.current.cpw;
  let cpw_proposed = cFilter.sysOpt === 'current' ? cFilter.current.cpw : cFilter.proposed.cpw;
  const title_current = `${cFilter.sys_current.model}(${cFilter.sys_current.feature_code}) ${parseFloat(cFilter?.current?.cores)?.toFixed(2)} Core(s) (${_.round(MAX_CPW_CURRENT)})`;
  const title_proposed = `${cFilter.sys_proposed.model}(${cFilter.sys_proposed.feature_code}) ${parseFloat(cFilter?.proposed?.cores)?.toFixed(2)} Core(s) (${_.round(MAX_CPW_PROPOSED)})`;

  let max = 100;
  let maxCPW1 = 1;
  let maxCPW2 = 1;
  

  const pqd = useQueryDataCapacityAnalysis();
  useEffect(() => {
    dispatch(fetchAsyncCPWGraph(pqd));
  }, [dispatch])

  const cpw1 = createChartDataMapping(
    cpwData?.data[0]?.data || [],
    "splineArea",
    "cpwUtilization",
    0
  );

  const cpw2 = createChartDataMapping(
    cpwData?.data[1]?.data || [],
    "splineArea",
    "cpwUtilization",
    perc_growth
  );
  
 
  if(!_.isEmpty(cpwData.data[0]?.data) && !_.isEmpty(cpwData.data[1]?.data)){
    const min_max_1_dp1 = findMinMax(cpw1[2].dataPoints) 
    const min_max_2_dp1 = findMinMax(cpw2[2].dataPoints) 
    const min_max_1 = min_max_1_dp1[1];
    const min_max_2 = min_max_2_dp1[1];
    maxCPW1 = min_max_1;
    maxCPW2 = min_max_2;
    max = _.max([min_max_1, min_max_2]);
  }

  if(!_.isEmpty(cpwData.data[0]?.data) && _.isEmpty(cpwData.data[1]?.data)){
      const min_max_1_dp1 = findMinMax(cpw1[2].dataPoints) 
      const min_max_1 = min_max_1_dp1[1];
      maxCPW1 = getRound(min_max_1);
      max =_.max(min_max_1);
  }

  if(_.isEmpty(cpwData.data[0]?.data) && !_.isEmpty(cpwData.data[1]?.data)){
      const min_max_2_dp1 = findMinMax(cpw2[2].dataPoints) 
      const min_max_2 = min_max_2_dp1[1];
      maxCPW2 = getRound(min_max_2);
      max = _.max(min_max_2);
  }

  max = _.max([MAX_CPW_CURRENT, MAX_CPW_PROPOSED]);

  //max = 10000;
  return (
        <>
        {cpwData.loading && 
        <div className="chart_container">
          <div style={{ display: "block", margin: "auto" }}>
            <GridLoader color="#366bd6"/>
          </div>
          
          <div style={{ display: "block", margin: "auto" }}>
            <GridLoader color="#366bd6"/>
          </div>
        </div>
        }
        {!cpwData.loading && !_.isEmpty(cpwData.data) &&
        <>
          <div className="chart_container">
              {(_.isEmpty(cpwData?.data[0].data) || !cpwData?.data[0].data)  &&
                <div className="chat_main1"> {/* noDataStyle  */}
                    <div style={{textAlign:'center'}}>
                      <h4>CPU Utilization</h4>
                      <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for CPW Utilization."/>
                    </div>
                </div>
              }
              {!_.isEmpty(cpwData?.data[0].data) &&
                <ChartViewCapacity
                  key={"cpw1"}
                  data={cpw1}
                  title2={title_current}
                  title={cpwData?.data[0]?.params.server}
                  subtitle={`MAX CPW:${_.round(MAX_CPW_CURRENT)}`}
                  yAxisTitle={"Utilization"}
                  xAxisDateFormat={cpw1[0].xValueFormatString}
                  isVisible={true} 
                  showTotal={false}
                  minimum={0}
                  maximum={max}
                  maxCPW = {_.round(MAX_CPW_CURRENT)}
                  maxGrowthStart = {maxCPW1}
                />      
              }
              {_.isEmpty(cpwData.data[1].data) &&
                <div className="chat_main1"> {/* noDataStyle  */}
                    <div style={{textAlign:'center'}}>
                      <h4>CPW</h4>
                      <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for CPW Utilization."/>
                    </div>
                </div>
              }     
              {!_.isEmpty(cpwData.data[1].data) &&
              <ChartViewCapacity
                key={"cpw2"}
                data={cpw2}
                title2={cFilter.sysOpt === 'proposed' ? title_proposed : title_current}
                title={cpwData?.data[1]?.params.server}
                subtitle={cFilter.sysOpt === 'proposed' ? `MAX CPW:${_.round(MAX_CPW_PROPOSED)}` : `MAX CPW:${_.round(MAX_CPW_CURRENT)}`}
                yAxisTitle={"Utilization"}
                xAxisDateFormat={cpw2[0].xValueFormatString}
                isVisible={true}
                showTotal={false}
                minimum={0}
                maximum={max}
                maxCPW = {cFilter.sysOpt === 'proposed' ? _.round(MAX_CPW_PROPOSED) : _.round(MAX_CPW_CURRENT)}
                maxGrowthStart = {maxCPW2}
              />
              }                                         
          </div>
        </>
        }
    </>
    )
}

export default CapacityCpwChart;