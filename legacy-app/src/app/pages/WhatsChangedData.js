import React, { useEffect, useState, Suspense, memo } from "react";
import { useSelector,useDispatch } from "react-redux";
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import * as _l from "lodash";
import LineChartApex from "../components/WhatsChanged/WhatsChangedLineChart/LineChartApex";
import GridLoader from "react-spinners/GridLoader";
import { fetchAsyncTimeLineToggle, getTimeLineToggleData } from "../../store/slices/TimeLine/TimeLineToggleSlice";
import useQueryData from "../../hooks/useQueryDataWhatsChanged";
import { getUuidData } from "../../store/slices/reports/SaveNewReport/SaveNewReport";
const MetricsUtilizationChart = React.lazy(()=> import("../components/WhatsChanged/WhatsChangedCharts/MetricsUtilizationChart"));

const WhatsChangedData = () => {
  const [topbarTop, setTopbarTop] = useState(undefined);
  const dataTimeline = useSelector(getTimeLineToggleData);
  const dispatch = useDispatch();
  const qd = useQueryData();
  const uuid = useSelector(getUuidData);

  useEffect(() => {
    if(!uuid?.loading && uuid.data.uniqueid){
      dispatch(fetchAsyncTimeLineToggle(qd));
    }
  },[dispatch,uuid])


  useEffect(() => {
      const topbarEl = document.querySelector('.topbar').getBoundingClientRect();
      setTopbarTop(topbarEl.top);
  }, [])
  
  useEffect(() => {
    if (!topbarTop) return;
      window.addEventListener('scroll', isStickyTop);
    return () => {
        window.removeEventListener('scroll', isStickyTop);
    };
  }, [topbarTop]);
  
  const isStickyTop = (e) => {
      const topbarEl = document.querySelector('.topbar');
    const scrollTop = window.scrollY;
    if (scrollTop >= topbarTop - 40) {
        topbarEl.classList.add('is-sticky-top');
    } else {
        topbarEl.classList.remove('is-sticky-top');
      }
    }
    
  return (
    <div style={{ display: "flex", flex: 1, flexDirection: "row" }}>
      <div style={{ flex: 3 }}>
        <div className="topbar" style={{ flex: 3 }}>
          {!dataTimeline?.loading && dataTimeline?.data?.length>0 && 
          <LineChartApex />
          }
          {!dataTimeline?.loading && typeof dataTimeline?.data === "object" && 
          <p>{dataTimeline?.data?.message}</p>
          }
        </div>
        <Suspense fallback={<div><GridLoader color="#366bd6"/></div>}>
          <MetricsUtilizationChart />
        </Suspense>
      </div>
    </div>
   ) 

    
}

export default memo(WhatsChangedData);
