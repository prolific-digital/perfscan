import React, { useEffect, useState } from "react";
import {
  Nav,
  NavItem,
  NavLink,
  FormGroup,
  Input,
  Label,
  TabContent,
  TabPane,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";

import SysByCPW from "./SysByCPW";
import SysByGrowth from "./SysByGrowth";
import {
  fetchAsyncAutoProposedSys,
  getAutoProposedSys,
  setAutoSys,
  setNCoreProposed,
  setCPWProposed,
  setMaxCPWProposed,
  setMaxCoresProposed,
  fetchAsyncCurrentSysAutoProposedSys,
  getCurrentSysAutoProposedSys,
} from "../../../../store/slices/capacityplanning/CapacityPlanningSlice";
import { capacitySaveFilter } from "../../../../store/slices/searchFilter";
import useAutoProposedSys from "../../../../hooks/useAutoProposedSys";
import { getAllFrames } from "../../../../services/apiService";

const AutoSystems = (props) => {
  const [activeTabID, setActiveTabID] = useState(1);
  const pSysData = useSelector(getAutoProposedSys);
  const currentSysData = useSelector(getCurrentSysAutoProposedSys);
  //console.log(pSysData);
  const dispatch = useDispatch();
  const [frameList, setFrameList] = useState([]);
  const [isloading, setIsloading] = useState(false);
  const [isError, setIsError] = useState("");

  //const qd = useQueryDataCapacityAnalysis();
  const qd = useAutoProposedSys();
  const filters = useSelector((state) => state.filters);
  let capacityFilter = filters.capacity_filter;

  const setSystem = (system) => {
    props.selProposedSys();
    dispatch(setNCoreProposed(system.proposed_lpar_cores));
    dispatch(setMaxCoresProposed(system.m_ncores));
    dispatch(setCPWProposed(system.proposed_cpw));
    dispatch(setMaxCPWProposed(system.m_cpw));
    dispatch(setAutoSys(true));
    dispatch(
      capacitySaveFilter({
        ...capacityFilter,
        proposed: {
          cores: system.proposed_lpar_cores,
          cpw: system.proposed_cpw,
          max_cores: system.m_ncores,
          max_cpw: system.m_cpw,
        },
        sys_proposed: {
          model: system.m_model,
          feature_code: system.m_feature_code,
          model_config_id: system.m_id,
        },
      })
    );
  };

  const fetchAllFrames = async () => {
    try {
      setIsloading(true);
      let response = await getAllFrames();
      if (response.status === 200) {
        if (response.data?.length) {
          setFrameList(response.data);
        }
      }
    } catch (error) {
      setIsError("Something went wrong!! Please try again later");
    } finally {
      setIsloading(false);
    }
  };

  useEffect(() => {
    fetchAllFrames();
    dispatch(fetchAsyncCurrentSysAutoProposedSys(qd));
    dispatch(fetchAsyncAutoProposedSys(qd));
  }, []);

  return (
    <div className="default-core-metrics" id="printableArea">
      <Nav tabs>
        <NavItem>
          <NavLink
            className={activeTabID === 1 ? "active" : ""}
            onClick={() => setActiveTabID(1)}
          >
            Potential For Growth
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={activeTabID === 2 ? "active" : ""}
            onClick={() => setActiveTabID(2)}
          >
            Current Configuration
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={String(activeTabID)}>
        <TabPane tabId="1">
          <SysByGrowth
            data={pSysData.data.proposed}
            showMySystem={frameList[0]?.entity_data?.frame?.show_my_system}
            currentSysData={currentSysData?.data?.proposed}
            setData={(sys) => setSystem(sys)}
            params={qd}
            peak={capacityFilter.peak}
          />
        </TabPane>
        <TabPane tabId="2">
          <SysByCPW
            data={pSysData.data.configured}
            showMySystem={frameList[0]?.entity_data?.frame?.show_my_system}
            currentSysData={currentSysData?.data?.configured}
            setData={(sys) => setSystem(sys)}
            params={qd}
            peak={capacityFilter.peak}
          />
        </TabPane>
      </TabContent>
    </div>
  );
};

export default AutoSystems;
