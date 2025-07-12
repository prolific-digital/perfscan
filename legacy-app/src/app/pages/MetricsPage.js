import { useSelector } from "react-redux";
import { BeatLoader } from "react-spinners";

import React, { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { createSearchParams, useNavigate, useParams, useSearchParams } from "react-router-dom";

import { handlePrintDetails } from "../../helpers/commonHelper";
import { systemFrameData } from "store/slices/enterpriseServer/RTGraphSlice/enterpriseServerRTData";
import { pieChartToggleState, topJobsToggleState } from "../../store/slices/charts/alertChartsSlice";
import { ScrollTop } from 'primereact/scrolltop';

// Lazy-loaded components
const ReportGraphDetails = React.lazy(() => import("./ReportGraphDetails"));
const SectionHeader = React.lazy(() => import("../components/SectionHeader"));
const AlertView = React.lazy(() => import("./EnterpriseServerView/AlertView"));
const ToggleSystems = React.lazy(() => import("./EnterpriseServerView/ToggleSystems"));
const Metrics = React.lazy(() => import("./EnterpriseServerView/MetricsPage/Metrics"));
const TopJobs = React.lazy(() => import("../components/RealTimeGraphs/TopJobs/TopJobs"));
const TopJobsPieChartToggle = React.lazy(() => import("./EnterpriseServerView/MetricsPage/TopJobsPieChartToggle"));

function MetricsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const host = searchParams.get("host");
  // const params2 = useParams()
  const serverId = searchParams.get("sysId");
  const serialNo = searchParams.get("serialNo");
  const lparName = searchParams.get("lparName");
  const systemType = searchParams.get("systemType");

  const metricRefs  = useRef({});

  const scrollIntoViewHandler = (metricName) =>{
    const ref = metricRefs?.current[metricName];
    if(ref){
      metricRefs?.current[metricName]?.scrollIntoView({
        behavior: "smooth", // Smooth scrolling
        block: "center",    // Align to the center of the viewport
      });
    }
  }

  let navigate = useNavigate();
  const arr = useSelector(systemFrameData);
  const [redirect, setRedirect] = useState(false);
  const topJobsToggle = useSelector(topJobsToggleState);
  const pieChartToggle = useSelector(pieChartToggleState);
  const [selectedSystem, setSelectedSystem] = useState({});
  const [filteredBreadCrumbsList, setFilteredBreadCrumbsList] = useState([]);

  const params = { sysId: serverId, serialNo, systemType, host };

  const breadCrumbsList = [
    { id: 1, name: "Enterprise", url: "/enterprise-server" },
    {
      id: 2,
      name: host,
      ...(systemType === "Frame" && {
        url: `/server?${createSearchParams(params)}`,
      }),
    },
  ];

  const breadCrumbsList2 = [
    { id: 3, name: serialNo, url: "" },
    { id: 4, name: lparName, url: "" },
  ];

  const groupOptionsList = [
    { id: 3, value: "serverName", viewText: "Server Serial No." },
    { id: 1, value: "type", viewText: "Server Health Type" },
  ];

  useEffect(()=>{
    if(!serverId || !host || !serialNo || !systemType){
      setRedirect(true);
    }
  },[host, serialNo, serverId, systemType])

  if(redirect){
    navigate("/enterprise-server")
  }

  useEffect(()=>{
    if (arr?.length) {
      const foundSys = arr?.find((ele) => +ele?.id === +serverId);
      setSelectedSystem(foundSys);
      if (
        +foundSys?.id !== +serverId ||
        foundSys.serial_number !== serialNo ||
        foundSys?.entity_name !== systemType ||
        foundSys?.entity_name !== host
      ) {
        setSearchParams({
          sysId: foundSys?.id,
          serialNo: foundSys?.serial_number,
          systemType: foundSys?.entity_name,
          host: foundSys?.entity_name,
          // ...(systemType === "host" && { entityName: entity_name }),
          ...(foundSys?.entity_name == "5" && {
            entityName: foundSys?.entity_name,
          }),
        });
      }
    }
  },[arr?.length, host, serialNo, serverId, systemType])

  const handleSystemChange = useCallback((systemData) => {
    setSelectedSystem(systemData);
    setSearchParams({
      sysId: systemData?.id,
      serialNo: systemData?.serial_number,
      systemType: systemData?.entity_name,
      host: systemData?.entity_name,
      // ...(systemType === "host" && { entityName: entity_name }),
      ...(systemData?.entity_name == "5" && {
        entityName: systemData?.entity_name,
      }),
    });
  }, []);

  useEffect(() => {
    const updatedBreadCrumbs =
      systemType === "Frame"
        ? [...breadCrumbsList, ...breadCrumbsList2]
        : [...breadCrumbsList, breadCrumbsList2[0]];
    setFilteredBreadCrumbsList(updatedBreadCrumbs);
  }, [host, serverId, systemType]);

  const fallbackLoader = <BeatLoader color="#366bd6" />;

  const renderSystemOption = (option) => (
    <div style={{ display: "flex", alignItems: "center" }}>
      <p
        className={`metricsCard ${option.type.toLowerCase()}`}
        style={{ margin: "0 0.5rem", width: "5%", padding: "0.5rem 0.7rem" }}
      />
      <p className="value-options">{`${option.entity_name} - ${option.entity_description} - ${option.serial_number}`}</p>
    </div>
  );

  return (
    <div className="enterprise_wrapper">
      <Suspense fallback={fallbackLoader}>
        <SectionHeader
          title="Metrics"
          btnClickHandler={handlePrintDetails}
          breadCrumbsList={filteredBreadCrumbsList}
        />
      </Suspense>

      <Suspense fallback="">
        <ToggleSystems
          selectedSystem={selectedSystem}
          activeTab={() => {}}
          handleSystemChange={handleSystemChange}
          systemOptionTemplate={renderSystemOption}
          groupOptionsList={groupOptionsList}
          selectedSystemTemplate={(option, props) =>
            option ? (
              <div className="value-options">{`${option.entity_name} - ${option.entity_description} - ${option.serial_number}`}</div>
            ) : (
              <span>{props.placeholder}</span>
            )
          }
          id={serverId}
        />
      </Suspense>

      <div className="servers_wrapper-alerts">
        <div
          className="server_wrapper-alert"
          style={{
            // width: "60%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "15rem",
          }}
        >
          <Suspense fallback={fallbackLoader}>
            <Metrics id={serverId} scrollIntoViewHandler={scrollIntoViewHandler}/>
          </Suspense>
          <Suspense fallback={fallbackLoader}>
            <TopJobsPieChartToggle />
          </Suspense>
        </div>
        {/* <Suspense fallback={fallbackLoader}>
          <AlertView width="36%" />
        </Suspense> */}
      </div>

      <Suspense fallback={fallbackLoader}>
        <ReportGraphDetails id={serverId} sysName={host} metricRefs ={metricRefs }/>
      </Suspense>

      {(topJobsToggle || pieChartToggle) && (
        <Suspense fallback={fallbackLoader}>
          <TopJobs alertPage={true} id={serverId} sysName={host}/>
        </Suspense>
      )}
      <ScrollTop />
    </div>
  );
}

export default MetricsPage;
