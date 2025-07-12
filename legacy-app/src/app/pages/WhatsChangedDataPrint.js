import React, { useEffect, useState, Suspense } from "react";
import { useSelector, useDispatch } from "react-redux";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import * as _l from "lodash";
import LineChartApex from "../components/WhatsChanged/WhatsChangedLineChart/LineChartApex";
import CPUUtilizationChartPrint from "../components/WhatsChanged/WhatsChangedCharts/CpuUtilizationChartPrint";
import CpuMsChartPrint from "../components/WhatsChanged/WhatsChangedCharts/CpuMsChartPrint";
import NumCoresChartPrint from "../components/WhatsChanged/WhatsChangedCharts/NumCoresChartPrint";
import DiskArmUtilizationChartPrint from "../components/WhatsChanged/WhatsChangedCharts/DiskArmUtilizationChartPrint";
import DiskSpaceUtlizationPrint from "../components/WhatsChanged/WhatsChangedCharts/DiskSpaceUtilizationPrint";
import CacheHitPercentPrint from "../components/WhatsChanged/WhatsChangedCharts/CacheHitPercentPrint";
import DiskOperationsPrint from "../components/WhatsChanged/WhatsChangedCharts/DiskOperationsPrint";
import DiskReadWriteRatioPrint from "../components/WhatsChanged/WhatsChangedCharts/DiskReadWriteRatioPrint";
import DiskResponseTimePrint from "../components/WhatsChanged/WhatsChangedCharts/DiskResponseTimePrint";
import MachinePoolFaultingPrint from "../components/WhatsChanged/WhatsChangedCharts/MachinePoolFaultingPrint";
import Response5250Print from "../components/WhatsChanged/WhatsChangedCharts/Response5250Print";
import TopPoolFaultPrint from "../components/WhatsChanged/WhatsChangedCharts/TopPoolFaultPrint";
import TotalFaultingChartPrint from "../components/WhatsChanged/WhatsChangedCharts/TotalFaultingChartPrint";
import TotalTransactionPrint from "../components/WhatsChanged/WhatsChangedCharts/TotalTransactionPrint";
import EthernetLineUtilsPrint from "../components/WhatsChanged/WhatsChangedCharts/EthernetLineUtilsPrint";
import { getParametersFromLocalStorage } from "../../helpers/commonHelper";
import { fetchAsyncAppMetrics } from "../../store/slices/settings";
import { fetchAsyncTimeLineToggle, getTimeLineToggleData } from "../../store/slices/TimeLine/TimeLineToggleSlice";
import useQueryData from "../../hooks/useQueryDataWhatsChanged";
import PrintPageHeader from "./PrintPageHeader";

const WhatsChangedDataPrint = ({ printButton }) => {
  const filters = useSelector((state) => state.filters);
  const dataTimeline = useSelector(getTimeLineToggleData);

  const metrics_data_app = useSelector(
    (state) => state.settings.metrics_data_app
  );
  const [metrics, setMetrics] = useState();
  const dispatch = useDispatch();
  const userID = getParametersFromLocalStorage("userID");
  const qd = useQueryData();

  useEffect(() => {
    dispatch(
      fetchAsyncAppMetrics({
        systemID: filters.system_filter.id,
        userID: userID,
      })
    );
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchAsyncTimeLineToggle(qd));
  },[dispatch])

  useEffect(() => {
    setMetrics(metrics_data_app.data.data);
  }, [metrics_data_app.data.length]);

  const WhatsChangedFilter = JSON.parse(localStorage.getItem("WhatsChangedFilter"));

  return (
    <div>
      <div style={{ pageBreakAfter: "always" }}>
        <PrintPageHeader pageTitle={"What's Changed"} sDate={WhatsChangedFilter.sdate} eDate={WhatsChangedFilter.edate} mainmenu={false}/>
      </div>

      {metrics && metrics.cpu_utilization && (
        <div
          className="topbar"
          style={{
            marginTop: "15px",
            marginLeft: "1px",
            border: "2px solid black",
            pageBreakAfter: "always"
          }}
        >
          {!dataTimeline?.loading && dataTimeline?.data?.length>0 && 
          <LineChartApex report={true}/>
          }
          {!dataTimeline?.loading && typeof dataTimeline?.data === "object" && 
          <p>{dataTimeline?.data?.message}</p>
          }
          <Suspense fallback={<div>Loading...</div>}>
            <CPUUtilizationChartPrint />
          </Suspense>
        </div>
      )}

      {metrics && metrics.cpu_ms && (
        <div
          className="topbar"
          style={{
            marginTop: "15px",
            marginLeft: "1px",
            border: "2px solid black",
            pageBreakAfter: "always"
          }}
        >
          {!dataTimeline?.loading && dataTimeline?.data?.length>0 && 
          <LineChartApex report={true}/>
          }
          {!dataTimeline?.loading && typeof dataTimeline?.data === "object" && 
          <p>{dataTimeline?.data?.message}</p>
          }
          <Suspense fallback={<div>Loading...</div>}>
            <CpuMsChartPrint />
          </Suspense>
        </div>
      )}

      {metrics && metrics.no_of_cores && (
        <div
          className="topbar"
          style={{
            marginTop: "15px",
            marginLeft: "1px",
            border: "2px solid black",
            pageBreakAfter: "always"
          }}
        >
          {!dataTimeline?.loading && dataTimeline?.data?.length>0 && 
          <LineChartApex report={true}/>
          }
          {!dataTimeline?.loading && typeof dataTimeline?.data === "object" && 
          <p>{dataTimeline?.data?.message}</p>
          }
          <Suspense fallback={<div>Loading...</div>}>
            <NumCoresChartPrint />
          </Suspense>
        </div>
      )}

      {metrics && metrics.disk_space_utilization && (
        <div
          className="topbar"
          style={{
            marginTop: "15px",
            marginLeft: "1px",
            border: "2px solid black",
            pageBreakAfter: "always"
          }}
        >
          {!dataTimeline?.loading && dataTimeline?.data?.length>0 && 
          <LineChartApex report={true}/>
          }
          {!dataTimeline?.loading && typeof dataTimeline?.data === "object" && 
          <p>{dataTimeline?.data?.message}</p>
          }
          <Suspense fallback={<div>Loading...</div>}>
            <DiskSpaceUtlizationPrint />
          </Suspense>
        </div>
      )}

      {metrics && metrics.disk_arm_utilization && (
        <div
          className="topbar"
          style={{
            marginTop: "15px",
            marginLeft: "1px",
            border: "2px solid black",
            pageBreakAfter: "always"
          }}
        >
          {!dataTimeline?.loading && dataTimeline?.data?.length>0 && 
          <LineChartApex report={true}/>
          }
          {!dataTimeline?.loading && typeof dataTimeline?.data === "object" && 
          <p>{dataTimeline?.data?.message}</p>
          }
          <Suspense fallback={<div>Loading...</div>}>
            <DiskArmUtilizationChartPrint />
          </Suspense>
        </div>
      )}

      {metrics && metrics.disk_response_time && (
        <div
          className="topbar"
          style={{
            marginTop: "15px",
            marginLeft: "1px",
            border: "2px solid black",
            pageBreakAfter: "always"
          }}
        >
          {!dataTimeline?.loading && dataTimeline?.data?.length>0 && 
          <LineChartApex report={true}/>
          }
          {!dataTimeline?.loading && typeof dataTimeline?.data === "object" && 
          <p>{dataTimeline?.data?.message}</p>
          }
          <Suspense fallback={<div>Loading...</div>}>
            <DiskResponseTimePrint />
          </Suspense>
        </div>
      )}

      {metrics && metrics.total_disk_ops && (
        <div
          className="topbar"
          style={{
            marginTop: "15px",
            marginLeft: "1px",
            border: "2px solid black",
            pageBreakAfter: "always"
          }}
        >
          {!dataTimeline?.loading && dataTimeline?.data?.length>0 && 
          <LineChartApex report={true}/>
          }
          {!dataTimeline?.loading && typeof dataTimeline?.data === "object" && 
          <p>{dataTimeline?.data?.message}</p>
          }
          <Suspense fallback={<div>Loading...</div>}>
            <DiskOperationsPrint />
          </Suspense>
        </div>
      )}

      {metrics && metrics.read_write_ratio && (
        <div
          className="topbar"
          style={{
            marginTop: "15px",
            marginLeft: "1px",
            border: "2px solid black",
            pageBreakAfter: "always"
          }}
        >
          {!dataTimeline?.loading && dataTimeline?.data?.length>0 && 
          <LineChartApex report={true}/>
          }
          {!dataTimeline?.loading && typeof dataTimeline?.data === "object" && 
          <p>{dataTimeline?.data?.message}</p>
          }
          <Suspense fallback={<div>Loading...</div>}>
            <DiskReadWriteRatioPrint />
          </Suspense>
        </div>
      )}

      {metrics && metrics.cache_hit_perc && (
        <div
          className="topbar"
          style={{ marginLeft: "1px", border: "2px solid black", pageBreakAfter: "always" }}
        >
          {!dataTimeline?.loading && dataTimeline?.data?.length>0 && 
          <LineChartApex report={true}/>
          }
          {!dataTimeline?.loading && typeof dataTimeline?.data === "object" && 
          <p>{dataTimeline?.data?.message}</p>
          }
          <Suspense fallback={<div>Loading...</div>}>
            <CacheHitPercentPrint />
          </Suspense>
        </div>
      )}

      {metrics && metrics.machine_pool_faulting && (
        <div
          className="topbar"
          style={{
            marginTop: "15px",
            marginLeft: "1px",
            border: "2px solid black",
            pageBreakAfter: "always"
          }}
        >
          {!dataTimeline?.loading && dataTimeline?.data?.length>0 && 
          <LineChartApex report={true}/>
          }
          {!dataTimeline?.loading && typeof dataTimeline?.data === "object" && 
          <p>{dataTimeline?.data?.message}</p>
          }
          <Suspense fallback={<div>Loading...</div>}>
            <MachinePoolFaultingPrint />
          </Suspense>
        </div>
      )}

      {metrics && metrics.faulting_rate && (
        <div
          className="topbar"
          style={{
            marginTop: "15px",
            marginLeft: "1px",
            border: "2px solid black",
            pageBreakAfter: "always"
          }}
        >
          {!dataTimeline?.loading && dataTimeline?.data?.length>0 && 
          <LineChartApex report={true}/>
          }
          {!dataTimeline?.loading && typeof dataTimeline?.data === "object" && 
          <p>{dataTimeline?.data?.message}</p>
          }
          <Suspense fallback={<div>Loading...</div>}>
            <TotalFaultingChartPrint />
          </Suspense>
        </div>
      )}

      {metrics && metrics.top_pool_faulting_rate && (
        <div
          className="topbar"
          style={{
            marginTop: "15px",
            marginLeft: "1px",
            border: "2px solid black",
            pageBreakAfter: "always"
          }}
        >
          {!dataTimeline?.loading && dataTimeline?.data?.length>0 && 
          <LineChartApex report={true}/>
          }
          {!dataTimeline?.loading && typeof dataTimeline?.data === "object" && 
          <p>{dataTimeline?.data?.message}</p>
          }
          <Suspense fallback={<div>Loading...</div>}>
            <TopPoolFaultPrint />
          </Suspense>
        </div>
      )}

      {metrics && metrics.response_time_5250 && (
        <div
          className="topbar"
          style={{
            marginTop: "15px",
            marginLeft: "1px",
            border: "2px solid black",
            pageBreakAfter: "always"
          }}
        >
          {!dataTimeline?.loading && dataTimeline?.data?.length>0 && 
          <LineChartApex report={true}/>
          }
          {!dataTimeline?.loading && typeof dataTimeline?.data === "object" && 
          <p>{dataTimeline?.data?.message}</p>
          }
          <Suspense fallback={<div>Loading...</div>}>
            <Response5250Print />
          </Suspense>
        </div>
      )}

      {metrics && metrics.total_transactions && (
        <div
          className="topbar"
          style={{
            marginTop: "15px",
            marginLeft: "1px",
            border: "2px solid black",
            pageBreakAfter: "always"
          }}
        >
          {!dataTimeline?.loading && dataTimeline?.data?.length>0 && 
          <LineChartApex report={true}/>
          }
          {!dataTimeline?.loading && typeof dataTimeline?.data === "object" && 
          <p>{dataTimeline?.data?.message}</p>
          }
          <Suspense fallback={<div>Loading...</div>}>
            <TotalTransactionPrint />
          </Suspense>
        </div>
      )}

      {metrics && metrics.ethernet_line_utilization && (
        <div
          className="topbar"
          style={{
            marginTop: "15px",
            marginLeft: "1px",
            border: "2px solid black",
            pageBreakAfter: "always"
          }}
        >
          {!dataTimeline?.loading && dataTimeline?.data?.length>0 && 
          <LineChartApex report={true}/>
          }
          {!dataTimeline?.loading && typeof dataTimeline?.data === "object" && 
          <p>{dataTimeline?.data?.message}</p>
          }
          <Suspense fallback={<div>Loading...</div>}>
            <EthernetLineUtilsPrint />
          </Suspense>
        </div>
      )}
    </div>
  );
};

export default WhatsChangedDataPrint;
