import React, { useEffect, useState,lazy, Suspense } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReportFilter from "../components/HistoricalData/ReportFilter"
// import HistoricalData from './HistoricalData';
import CPUUtilization from "../components/HistoricalData/Charts/CPUUtilization";
import useQueryData from "../../hooks/useQueryData";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { fetchAsyncGlobalMetrics, fetchAsyncSystemMetrics } from "../../store/slices/settings";
import * as _l from "lodash";
// import PeriodVsPeriod from "./PeriodVsPeriod";
import { setActiveTab } from "../../store/slices/common/commonSlice";
import useMetricsData from "../../hooks/useMetricsData";
import moment from "moment";
// import WhatsChanged from "./WhatsChangedData";
import { Button } from 'primereact/button';
import { Link } from "react-router-dom";
const HistoricalData = React.lazy(()=>import('./HistoricalData')) ;
const PeriodVsPeriod = React.lazy(()=>import("./PeriodVsPeriod"));
const WhatsChanged = React.lazy(()=>import("./WhatsChangedData"));





const PerformanceInsights = () => {
  //Local Vars
  const [loadingReport, setLoadingReport] = useState(false);
  const [buildDateActiveTab, setBuildDateActiveTab] = useState(1); 
  const [historicClicked, setHistoricClicked] = useState(true);
  const [whatsChangedClicked, setWhatsChangedClicked] = useState(false);
  const [periodVsPeriodClicked, setPeriodVsPeriodClicked] = useState(false) ;
  
  const [dateTab, setDateTab] = useState(10);

  // Redux Vars
  const filters = useSelector(state => state.filters)   
  const dispatch = useDispatch();

  /* TEST START */

const [systemDataActive, setSystemDataActive] = useState(true);
const [whatChangedDataActive, setWhatChangedDataActive] = useState(false);
const [periodVsPeriodDataActive, setPeriodVsPeriodDataActive] = useState(false);
const [systemStyle, setSystemStyle] = useState("p-button-raised");
const [whatChangedStyle, setWhatChangedStyle] = useState("p-button-raised p-button-text");
const [periodVsPeriodStyle, setPeriodVsPeriodStyle] = useState("p-button-raised p-button-text");

/* TEST END */

  useEffect(() => {
    dispatch(fetchAsyncGlobalMetrics());
    dispatch(fetchAsyncSystemMetrics(filters.system_filter.id));
  }, [dispatch]);

  useEffect(() => {
  let someDate = new Date();
  let data1 = moment(someDate).valueOf();

}, [])

  const runReportClickHandler = async () => {
    setLoadingReport(true);
    return "run report"
  }

  const reRunReportClickHandler = async () => {
    setLoadingReport(false);
  }

  // useEffect(() => {
  //   dispatch(fetchAsyncGlobalMetrics());
  //   if(filters && _l.isEmpty(filters.system_filter) === false){
  //     dispatch(fetchAsyncSystemMetrics(filters.system_filter.id));
  //   }
  // }, [dispatch])

  

  const handleHistoricTabSelection = () => {
    dispatch(setActiveTab(10));
    setBuildDateActiveTab(1);
    // setHistoricClicked(true);
    // setWhatsChangedClicked(false);
    // setPeriodVsPeriodClicked(false);
  }

  const handleWhatsChangedTabSelection = () => {
    dispatch(setActiveTab(10));
    setBuildDateActiveTab(2);
    // setHistoricClicked(false);
    // setWhatsChangedClicked(true);
    // setPeriodVsPeriodClicked(false);
  }

  const handlePeriodTabSelection = () => {
    dispatch(setActiveTab(11));
    setBuildDateActiveTab(3);
    // setHistoricClicked(false);
    // setWhatsChangedClicked(false);
    // setPeriodVsPeriodClicked(true);
  }

  /* TEST START */

  const showSystemData = () => {
    setDateTab(10);
    // dispatch(setActiveTab(10));
    setSystemDataActive(true);
    setWhatChangedDataActive(false);
    setPeriodVsPeriodDataActive(false);
    setSystemStyle("p-button-raised");
    setWhatChangedStyle("p-button-raised p-button-text");
    setPeriodVsPeriodStyle("p-button-raised p-button-text");
  }

  const showWhatChangedData = () => {
    setDateTab(10);
    // dispatch(setActiveTab(10));
    setWhatChangedDataActive(true);
    setSystemDataActive(false);
    setPeriodVsPeriodDataActive(false);
    setWhatChangedStyle("p-button-raised");
    setSystemStyle("p-button-raised p-button-text");
    setPeriodVsPeriodStyle("p-button-raised p-button-text");
  }

  const showPeriodVsPeriodData = () => {
    setDateTab(11);
    // dispatch(setActiveTab(11));
    setPeriodVsPeriodDataActive(true);
    setSystemDataActive(false);
    setWhatChangedDataActive(false);
    setPeriodVsPeriodStyle("p-button-raised");
    setSystemStyle("p-button-raised p-button-text");
    setWhatChangedStyle("p-button-raised p-button-text");
  }

  /* TEST END */

  return (
    <div>
      Performance Insights 
      <ReportFilter dateTab={dateTab} runReport = {runReportClickHandler} loadingReport = {loadingReport} changeReport = {reRunReportClickHandler} />
      <div className="filter_option">
        <Nav fill tabs>
            <NavItem>
                <NavLink className={buildDateActiveTab === 1 ? "active" : ""} onClick={() => handleHistoricTabSelection()}>
                    Historical Data
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink className={buildDateActiveTab === 2 ? "active" : ""} onClick={() => handleWhatsChangedTabSelection()}>
                    What's Changed Analysis
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink to="/performance-insights/period-vs-period" className={buildDateActiveTab === 3 ? "active" : ""} onClick={() => handlePeriodTabSelection()}>
                    Period vs Period
                </NavLink>
            </NavItem>
        </Nav>
        <TabContent activeTab={String(buildDateActiveTab)}>
            <TabPane tabId="1">
              {loadingReport &&
               <Suspense fallback={<div>Loading...</div>}>
                 <HistoricalData />
               </Suspense>
              }
            </TabPane>
            <TabPane tabId="2">
              {loadingReport &&
               <Suspense fallback={<div>Loading...</div>}>
                 <WhatsChanged/>
               </Suspense>
              }
            </TabPane>
            <TabPane tabId="3">
              {loadingReport &&
               <Suspense fallback={<div>Loading...</div>}>
                  {/* <PeriodVsPeriod /> */}
                  3
               </Suspense>
              }
            </TabPane>
        </TabContent>
        <div>
          <Link to ="period-vs-period">Period vs Period</Link>
        </div>
      </div>
{/* TEST START */}
      {/* <div style={{display:"flex", flex:1,flexDirection:"row",alignItems: 'center',justifyContent: 'center',marginBottom: '15px'}}>
            <Button
                  style={{flex:1}}
                  label="Historical Data" className={`${systemStyle}`}     
                  onClick={()=>{showSystemData()}}
              />         
            <Button
                  style={{flex:1}}
                  label="What's Changed Analysis" className={`${whatChangedStyle}`}
                  onClick={()=>{showWhatChangedData()}} 
              />
              <Button
                  style={{flex:1}}
                  label="Period Vs Period" className={`${periodVsPeriodStyle}`}
                  onClick={()=>{showPeriodVsPeriodData()}} 
              />            
      </div> */}
  {/* TEST END */}

  {/* {
    systemDataActive && loadingReport &&
    <Suspense fallback={<div>Loading...</div>}>
      <HistoricalData/>
    </Suspense>
  }
  {
    whatChangedDataActive && loadingReport &&
    <Suspense fallback={<div>Loading...</div>}>
      <WhatsChanged/>
    </Suspense>
  }
  {
    periodVsPeriodDataActive && loadingReport &&
    <Suspense fallback={<div>Loading...</div>}>
      <PeriodVsPeriod/>
    </Suspense>
  }   */}


    </div>
  )
};
export default PerformanceInsights;