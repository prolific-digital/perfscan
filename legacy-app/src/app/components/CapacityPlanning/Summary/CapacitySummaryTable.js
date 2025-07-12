import React,{ useEffect, useState} from 'react';
import { useSelector, useDispatch } from "react-redux";
import moment from 'moment';
import GridLoader from "react-spinners/GridLoader";
import * as _ from 'lodash';

import useQueryDataCapacityAnalysis from '../../../../hooks/useQueryDataCapacityAnalysis';
import {
  fetchAsyncCPWExSummary, getCPWExSummary, getCurrent, getProposed, getProposedGrowth
} from "../../../../store/slices/capacityplanning/CapacityPlanningSlice";
import {
  calcPercentDiff,
  checkSystemStatusForPVsP,
  getParametersFromLocalStorage} from '../../../../helpers/commonHelper';
import {checkSystemStatusForCapacity, renderFindings, getCPWPerCore } from "../../../../helpers/capacityHelper";

import "../../../../stylesheets/main.scss"
import { getUuidData } from '../../../../store/slices/reports/SaveNewReport/SaveNewReport';

function CapacitySummaryTable(props) {
  const pqd = useQueryDataCapacityAnalysis();
  const dispatch = useDispatch();
  const uuid = useSelector(getUuidData);
  
  const cpwSummaryData = useSelector(getCPWExSummary);
  const filters = useSelector(state => state.filters);
  const cFilter = filters.capacity_filter; 
  const userID = getParametersFromLocalStorage("userID");
  const current = useSelector(getCurrent);
  const proposed = useSelector(getProposed);
  const PERC_GROWTH = useSelector(getProposedGrowth);

  let period1 = "";
  let period2 = "";
  let isPeriodSame = false;
  const MAX_CPW_CURRENT = _.round(getCPWPerCore(current.cores, current.max_cores, current.max_cpw));
  const MAX_CPW_PROPOSED = _.round(getCPWPerCore(proposed.cores, proposed.max_cores, proposed.max_cpw));
  // Show only start date if both start and end date are same

  useEffect(() => {
      dispatch(fetchAsyncCPWExSummary(pqd))
  }, [dispatch])
  
  return (
    <>
      {/* !!!!!!!!!!!!!!!!!!! CPU Data Table !!!!!!!!!!!!!!!!!!!!!! */}
    <div className='table_wrapper'>
    {cpwSummaryData?.loading &&
        <div>
          <GridLoader color="#366bd6"/>
        </div>
      }
      <div className='wrapDataTables'>
          { !cpwSummaryData?.loading && !_.isEmpty(cpwSummaryData?.data) &&
            <>
              {
                <table className="table table-bordered table-striped tableAlign">
                  <thead>
                    <tr style={{backgroundColor:'#efefef'}}> 
                      <th colSpan="6" style={{textAlign:"center", fontSize:"xx-large"}}>Capacity Planning Analysis</th>
                    </tr>
                    <tr style={{backgroundColor:'#efefef'}}> 
                      <th colSpan="6" style={{textAlign:"center", fontSize:"x-large"}}>System Comparision</th>
                    </tr>
                    <tr style={{backgroundColor:'#efefef'}}>
                      <th colSpan="3">Current System</th>
                      <th colSpan="3">Proposed System</th>
                    </tr>
                    <tr style={{backgroundColor:'#efefef'}}>
                      <th colSpan="3">{cFilter.sys_current.entity_name} - {cFilter.sys_current.entity_description}</th>
                      <th colSpan="3">{cFilter.sys_current.entity_name} - {cFilter.sys_current.entity_description}</th>
                    </tr>
                    
                    <tr style={{backgroundColor:'#efefef'}}>
                      {cFilter.sysOpt === "proposed" ?
                      <>
                      <th colSpan="3">{`${cFilter.sys_current.model}-${cFilter.sys_current.feature_code} - ${cFilter.current.cores} Cores (${MAX_CPW_CURRENT})`}</th>
                      <th colSpan="3">{`${cFilter.sys_proposed.model}-${cFilter.sys_proposed.feature_code} - ${cFilter.proposed.cores} Cores (${MAX_CPW_PROPOSED})`}</th> 
                      </>:
                      <>
                        <th colSpan="3">{`${cFilter.sys_current.model}-${cFilter.sys_current.feature_code} - ${cFilter.current.cores} Cores (${MAX_CPW_CURRENT})`}</th>
                        <th colSpan="3">{`${cFilter.sys_current.model}-${cFilter.sys_current.feature_code} - ${cFilter.current.cores} Cores (${MAX_CPW_CURRENT})`}</th> 
                        </>
                        }
                    </tr>
                    <tr style={{backgroundColor:'#efefef', color:'#000066'}}>
                      <th colSpan="3">No of Cores : {parseFloat(cFilter?.current?.cores)?.toFixed(2)}</th>
                      <th colSpan="3">No of Cores : {cFilter.sysOpt === "proposed" ? parseFloat(cFilter?.proposed?.cores)?.toFixed(2) : parseFloat(cFilter?.current?.cores)?.toFixed(2) } - Additional Growth : {cFilter.perc_growth} % </th>
                    </tr>
                    <tr style={{backgroundColor:'#efefef', color:'#1c4da7'}}>
                      <th colSpan="3">Date : {cFilter.busyday}</th>
                      <th colSpan="3">Date : {cFilter.busyday} </th>
                    </tr>
                      <tr style={{backgroundColor:'#efefef'}}>
                        <th colSpan="3" style={{textAlign:"center"}}>{period1}</th>
                        <th colSpan="3" style={{textAlign:"center"}}>{period2}</th>
                    </tr>

                      <tr style={{backgroundColor:'#75c5f0'}}>
                        <th style={{align:"center",height:"71px", width:"180px"}}>Core Metric</th>
                        <th style={{align:"center",height:"71px", width:"100px"}}>Status</th>
                        <th style={{align:"center",height:"71px"}}>Observations</th>
                        <th style={{align:"center",height:"71px", width:"180px"}}>Core Metric</th>
                        <th style={{align:"center",height:"71px", width:"100px"}}>Status</th>
                        <th style={{align:"center",height:"71px"}}>Observations</th>
                                                         
                    </tr>
                  </thead>
                      <tbody>
                        <tr>
                        <td style={{height:"auto"}}>CPW</td>
                          <td style={{height:"auto", width:"100px", backgroundColor: "aliceblue"}}>
                          {checkSystemStatusForCapacity(cpwSummaryData, 0)}
                          </td>
                          <td style={{height:"auto", backgroundColor: "aliceblue"}}>
                            {renderFindings(cpwSummaryData.data, 0)}
                          </td>
                          <td style={{height:"auto"}}>CPW</td>
                          <td style={{height:"auto", width:"100px", backgroundColor: "aliceblue"}}>
                          {cFilter.sysOpt === 'proposed' 
                          ? checkSystemStatusForCapacity(cpwSummaryData, 1)
                          : checkSystemStatusForCapacity(cpwSummaryData, 0)
                          }
                          </td>
                          <td style={{height:"auto", backgroundColor: "aliceblue"}}>
                            {cFilter.sysOpt === 'proposed' 
                            ? renderFindings(cpwSummaryData.data, 1, MAX_CPW_PROPOSED, cFilter.perc_growth)
                            : renderFindings(cpwSummaryData.data, 0, MAX_CPW_CURRENT, cFilter.perc_growth)
                            }
                          </td>
                        </tr>
                      </tbody>
                </table>
              }
            </>
          }
        </div>
      </div>
    </>
  )
}

export default CapacitySummaryTable


{/**

<tbody key={valIndex}>
                        <tr>
                          <td style={{height:"auto", width:"180px"}}>{res.dtypedesc}</td>
                          <td style={{ height: "auto", width: "100px" }}>
                            {checkSystemStatusForPVsP(res, 0)}
                          </td>
                          <td style={{height:"auto"}}>{renderFindings(res,0)}</td>
                          <td style={{height:"auto", width:"100px", backgroundColor: "aliceblue"}}>
                            {isPeriodSame ? checkSystemStatusForPVsP(res,0) : checkSystemStatusForPVsP(res,1)}
                          </td>
                            <td style={{height:"auto", backgroundColor: "aliceblue"}}>
                            {isPeriodSame ? renderFindings(res,0) : renderFindings(res,1)}
                          </td>
                          <td style={{ height: "auto" }}>
                            {isPeriodSame ? calcPercentDiff(res.data[0],res.data[0],res) : calcPercentDiff(res.data[0],res.data[1],res)}
                          </td>
                        </tr>
                      </tbody>
*/}