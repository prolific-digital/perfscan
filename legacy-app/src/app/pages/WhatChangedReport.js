import React, { useEffect, useState, Suspense } from "react";
import { useSelector } from "react-redux";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import * as _l from "lodash";
import LineChartApex from "../components/WhatsChanged/WhatsChangedLineChart/LineChartApex";
import { useParams } from "react-router-dom";
import CPUUtilizationChartReport from "../components/WhatChangedReport/WhatsChangedCharts/CpuUtilizationChartReport";
import CpuMsChartReport from "../components/WhatChangedReport/WhatsChangedCharts/CpuMsChartReport";
import NumCoresChartReport from "../components/WhatChangedReport/WhatsChangedCharts/NumCoresChartReport";
import DiskSpaceUtlizationReport from "../components/WhatChangedReport/WhatsChangedCharts/DiskSpaceUtilizationReport";
import DiskArmUtilizationChartReport from "../components/WhatChangedReport/WhatsChangedCharts/DiskArmUtilizationChartReport";
import DiskResponseTimeReport from "../components/WhatChangedReport/WhatsChangedCharts/DiskResponseTimeReport";
import DiskOperationsReport from "../components/WhatChangedReport/WhatsChangedCharts/DiskOperationsReport";
import DiskReadWriteRatioReport from "../components/WhatChangedReport/WhatsChangedCharts/DiskReadWriteRatioReport";
import CacheHitPercentReport from "../components/WhatChangedReport/WhatsChangedCharts/CacheHitPercentReport";
import MachinePoolFaultingReport from "../components/WhatChangedReport/WhatsChangedCharts/MachinePoolFaultingReport";
import TotalFaultingChartReport from "../components/WhatChangedReport/WhatsChangedCharts/TotalFaultingChartReport";
import TopPoolFaultReport from "../components/WhatChangedReport/WhatsChangedCharts/TopPoolFaultReport";
import Response5250Report from "../components/WhatChangedReport/WhatsChangedCharts/Response5250Report";
import TotalTransactionReport from "../components/WhatChangedReport/WhatsChangedCharts/TotalTransactionReport";
import EthernetLineUtilsReport from "../components/WhatChangedReport/WhatsChangedCharts/EthernetLineUtilsReport";
import PrintPageHeader from "./PrintPageHeader";

const WhatsChangedReport = ({ printButton, filters }) => {

  const params = useParams();

  const queryReportData = {
    sdate: filters.sDate,
    edate: filters.eDate,
    stime: filters.sTime,
    etime: filters.eTime,
    sysid: filters.sysid,
    sysname: filters.system_name,
    rptType: filters.report_type,
    reportName: filters.report_name
  };

  const reportId = { rptId: params.rptid }

  const metrics_data_app = useSelector(
    (state) => state.settings.metrics_data_app
  );
  const [metrics, setMetrics] = useState();

  useEffect(() => {
    setMetrics(metrics_data_app.data.data);
  }, [metrics_data_app.data.length]);


  return (
    <>
    <div style={{ pageBreakAfter: "always" }}>
        <PrintPageHeader pageTitle={"What's Changed Data Analysis"} sDate={queryReportData.sdate} eDate={queryReportData.edate} mainmenu={true}/>
      </div>
      <div>
        <div
          className="topbar"
          style={{
            marginTop: "15px",
            marginLeft: "1px",
            border: "2px solid black",
            pageBreakAfter: "always"
          }}
        >
          <LineChartApex report={true}/>
          <Suspense fallback={<div>Loading...</div>}>
            <CPUUtilizationChartReport reportId={reportId} queryReportData={queryReportData} />
          </Suspense>
        </div>

        <div
          className="topbar"
          style={{
            marginTop: "15px",
            marginLeft: "1px",
            border: "2px solid black",
            pageBreakAfter: "always"
          }}
        >
          <LineChartApex report={true}/>
          <Suspense fallback={<div>Loading...</div>}>
            <CpuMsChartReport reportId={reportId} queryReportData={queryReportData} />
          </Suspense>
        </div>

        <div
          className="topbar"
          style={{
            marginTop: "15px",
            marginLeft: "1px",
            border: "2px solid black",
            pageBreakAfter: "always"
          }}
        >
          <LineChartApex report={true}/>
          <Suspense fallback={<div>Loading...</div>}>
            <NumCoresChartReport reportId={reportId} queryReportData={queryReportData} />
          </Suspense>
        </div>

        <div
          className="topbar"
          style={{
            marginTop: "15px",
            marginLeft: "1px",
            border: "2px solid black",
            pageBreakAfter: "always"
          }}
        >
          <LineChartApex report={true}/>
          <Suspense fallback={<div>Loading...</div>}>
            <DiskSpaceUtlizationReport reportId={reportId} queryReportData={queryReportData} />
          </Suspense>
        </div>

        <div
          className="topbar"
          style={{
            marginTop: "15px",
            marginLeft: "1px",
            border: "2px solid black",
            pageBreakAfter: "always"
          }}
        >
          <LineChartApex report={true}/>
          <Suspense fallback={<div>Loading...</div>}>
            <DiskArmUtilizationChartReport reportId={reportId} queryReportData={queryReportData} />
          </Suspense>
        </div>

        <div
          className="topbar"
          style={{
            marginTop: "15px",
            marginLeft: "1px",
            border: "2px solid black",
            pageBreakAfter: "always"
          }}
        >
          <LineChartApex report={true}/>
          <Suspense fallback={<div>Loading...</div>}>
            <DiskResponseTimeReport reportId={reportId} queryReportData={queryReportData} />
          </Suspense>
        </div>

        <div
          className="topbar"
          style={{
            marginTop: "15px",
            marginLeft: "1px",
            border: "2px solid black",
            pageBreakAfter: "always"
          }}
        >
          <LineChartApex report={true}/>
          <Suspense fallback={<div>Loading...</div>}>
            <DiskOperationsReport reportId={reportId} queryReportData={queryReportData} />
          </Suspense>
        </div>

        <div
          className="topbar"
          style={{
            marginTop: "15px",
            marginLeft: "1px",
            border: "2px solid black",
            pageBreakAfter: "always"
          }}
        >
          <LineChartApex report={true}/>
          <Suspense fallback={<div>Loading...</div>}>
            <DiskReadWriteRatioReport reportId={reportId} queryReportData={queryReportData} />
          </Suspense>
        </div>

        <div
          className="topbar"
          style={{ marginLeft: "1px", border: "2px solid black", pageBreakAfter: "always" }}
        >
          <LineChartApex report={true}/>
          <Suspense fallback={<div>Loading...</div>}>
            <CacheHitPercentReport reportId={reportId} queryReportData={queryReportData} />
          </Suspense>
        </div>

        <div
          className="topbar"
          style={{
            marginTop: "15px",
            marginLeft: "1px",
            border: "2px solid black",
            pageBreakAfter: "always"
          }}
        >
          <LineChartApex report={true}/>
          <Suspense fallback={<div>Loading...</div>}>
            <MachinePoolFaultingReport reportId={reportId} queryReportData={queryReportData} />
          </Suspense>
        </div>

        <div
          className="topbar"
          style={{
            marginTop: "15px",
            marginLeft: "1px",
            border: "2px solid black",
            pageBreakAfter: "always"
          }}
        >
          <LineChartApex report={true}/>
          <Suspense fallback={<div>Loading...</div>}>
            <TotalFaultingChartReport reportId={reportId} queryReportData={queryReportData} />
          </Suspense>
        </div>

        <div
          className="topbar"
          style={{
            marginTop: "15px",
            marginLeft: "1px",
            border: "2px solid black",
            pageBreakAfter: "always"
          }}
        >
          <LineChartApex report={true}/>
          <Suspense fallback={<div>Loading...</div>}>
            <TopPoolFaultReport reportId={reportId} queryReportData={queryReportData} />
          </Suspense>
        </div>

        <div
          className="topbar"
          style={{
            marginTop: "15px",
            marginLeft: "1px",
            border: "2px solid black",
            pageBreakAfter: "always"
          }}
        >
          <LineChartApex report={true}/>
          <Suspense fallback={<div>Loading...</div>}>
            <Response5250Report reportId={reportId} queryReportData={queryReportData} />
          </Suspense>
        </div>

        <div
          className="topbar"
          style={{
            marginTop: "15px",
            marginLeft: "1px",
            border: "2px solid black",
            pageBreakAfter: "always"
          }}
        >
          <LineChartApex report={true}/>
          <Suspense fallback={<div>Loading...</div>}>
            <TotalTransactionReport reportId={reportId} queryReportData={queryReportData} />
          </Suspense>
        </div>

        <div
          className="topbar"
          style={{
            marginTop: "15px",
            marginLeft: "1px",
            border: "2px solid black",
            pageBreakAfter: "always"
          }}
        >
          <LineChartApex report={true}/>
          <Suspense fallback={<div>Loading...</div>}>
            <EthernetLineUtilsReport reportId={reportId} queryReportData={queryReportData} />
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default WhatsChangedReport;
