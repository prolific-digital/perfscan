import React, { useEffect, useRef, useState } from "react";
import {
  createSearchParams,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import {
  checkRealTimeSystemStatusCount,
  handlePrintDetails,
} from "../../helpers/commonHelper";
import ChartView from "../components/ChartView";
import SectionHeader from "../components/SectionHeader";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAsyncFramesLpars,
  getFrameLparList,
} from "../../store/slices/enterpriseServer/systemFrameSlice";
import useQueryData from "../../hooks/useQueryDataHistorical";
import { GridLoader } from "react-spinners";
import MetricsCardSysTest from "../components/MetricCardSysTest";
import MetricsCard from "../components/MetricsCard";
import {
  fetchAsyncMetricCPUData,
  getMetricsCPUData,
} from "../../store/slices/enterpriseServer/metricsSlice";

function HostView() {
  let navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const [foundSystemData, setfoundSystemData] = useState([]);
  const serialNo = searchParams.get("serialNo");
  const systemType = searchParams.get("systemType");
  const qd = useQueryData();
  const Lpar = searchParams.get("host");
  const dispatch = useDispatch();
  const lparList = useSelector(getFrameLparList);
  const cpuData = useSelector(getMetricsCPUData);

  useEffect(() => {
    dispatch(fetchAsyncMetricCPUData(qd));
  }, [dispatch]);

  const handleNavigation = (id, systemName, entity_name) => {
    const params = {
      sysId: id,
      serialNo,
      systemType,
      host: Lpar,
      lparName: systemName,
      entityName: entity_name,
    };
    navigate({
      pathname: "/metrics",
      search: `?${createSearchParams(params)}`,
    });
  };

  useEffect(() => {
    // if(!uuid?.loading && uuid.data.uniqueid){
    dispatch(fetchAsyncFramesLpars({ serialNumber: serialNo }));
    // }
  }, [dispatch, serialNo]);

  let breadCrumbsList = [
    {
      id: 1,
      name: "Enterprise",
      url: "/enterprise-server",
    },
    {
      id: 2,
      name: Lpar,
      url: "",
    },
  ];

  useEffect(() => {
    if (!lparList.loading) {
      const updatedDataSet = [];
      for (let i = 0; i < lparList.data.length; i++) {
        const foundKeyStatus = checkRealTimeSystemStatusCount(
          lparList.data[i].metricData
        );
        updatedDataSet.push({
          ...lparList.data[i],
          type: foundKeyStatus,
          msg: foundKeyStatus,
          path: "/metrics",
        });
      }
      setfoundSystemData(updatedDataSet);
    }
  }, [lparList]);


  return (
    <div className="enterprise_wrapper">
      <SectionHeader
        title={"LPAR / Host"}
        btnClickHandler={handlePrintDetails}
        breadCrumbsList={breadCrumbsList}
        serialNo={serialNo}
      />
      <div className="servers_wrapper-alerts">
        <div className="server_wrapper-alert">
          {lparList.loading && (
            <div>
              <GridLoader color="#366bd6" />
            </div>
          )}
          <div className="metrics_card_wrapper">
            {!lparList.loading &&
              foundSystemData?.map((item, index) => (
                <MetricsCardSysTest
                  key={index}
                  // keyID={item.id}
                  cardClickHandler={() =>
                    handleNavigation(
                      item.id,
                      item.entity_description,
                      item.entity_name
                    )
                  }
                  serverName={item?.entity_description}
                  keyID={item?.entity_data?.frame.serial_number}
                  msg={item?.msg}
                  serverLocation={item?.entity_name}
                  systemType={"Frame"}
                  type={item?.type}
                />
              ))}
          </div>
        </div>
        <div className="server_wrapper-alert scroll-container">
          <div className="server_parent server_parent_alert">
            {/* {cpuData.loading && (
              <div>
                <GridLoader color="#366bd6" />
              </div>
            )}
            {!cpuData.loading &&
              cpuData?.data?.data?.map((item, idx) => {
                if (item?.dtype === "cpu_ms" || item?.dtype === "cpw") {
                  // eslint-disable-next-line array-callback-return
                  return;
                } else {
                  return (
                    <MetricsCard
                      key={idx}
                      cpuData={item}
                      // cardClickHandler={() =>
                      //   handleNavigation(item.dtype, "/detailed-view-cpu")
                      // }
                      {...item}
                      alertMetricAlignClass={"alert_metric_alignment"}
                      // alertWrapperClass={"metric_alert_wrapper"}
                      // alertNotification={true}
                    />
                  );
                }
              })} */}
            <p style={{ textAlign: "center" }}>No alert data for Lpars.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HostView;
