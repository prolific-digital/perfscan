import * as _ from "lodash";
import React, { useEffect, useState } from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";

import NavBar from "../../NavTab/NavBar";
import CpuJobType from "./PieCharts/CpuJobType";
import FaultsJobType from "./PieCharts/FaultsJobType";
import AsynciosJobType from "./PieCharts/AsynciosJobType";
import SynciosJobType from "./PieCharts/SynciosJobType";
import TotaliosJobType from "./PieCharts/TotaliosJobType";
import { topJobsPieChartTrigger } from "../../../pages/GraphQL/Mutations/TopJobsMutations";

import { useMutation } from "@apollo/client";

const TopJobsPieChart = ({ alertPage, pieChartToggle, selectedSystem, id }) => {
  /* State variables */
  const [activeInternalTabID, setInternalActiveTabID] = useState(1);
  const [topJobsPieDataMutation, pieChartWholeDayData] = useMutation(
    topJobsPieChartTrigger
  );

  useEffect(() => {
    topJobsDataMutationHandler(+id);
  }, [id]);

  const topJobsDataMutationHandler = async (id) => {
    try {
      await topJobsPieDataMutation({ variables: { topJobsPieDataId: id } });
    } catch (error) {
      console.log(error);
      if (error.name === "AbortError") {
      } else {
        console.error(error);
      }
    }
  };

  return (
    <div className="topjobs-conatiner">
      <div className="top-jobs-nav">
        <NavBar tabName={"Pie Chart"}/>
      </div>

      <TabContent activeTab={String(pieChartToggle ? 2 : "")}>
        <TabPane tabId="2">
          <Nav tabs className="pie-inside-tabbing">
            <NavItem>
              <NavLink
                className={activeInternalTabID === 1 ? "active" : ""}
                onClick={() => setInternalActiveTabID(1)}
              >
                CPU ms
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={activeInternalTabID === 2 ? "active" : ""}
                onClick={() => setInternalActiveTabID(2)}
              >
                Total IOs
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={activeInternalTabID === 3 ? "active" : ""}
                onClick={() => setInternalActiveTabID(3)}
              >
                Sync IOs
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={activeInternalTabID === 4 ? "active" : ""}
                onClick={() => setInternalActiveTabID(4)}
              >
                Async IOs
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={activeInternalTabID === 5 ? "active" : ""}
                onClick={() => setInternalActiveTabID(5)}
              >
                Faults
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={String(pieChartToggle && activeInternalTabID)}>
            <TabPane tabId="1">
              <div className="pie-chart-wrapper">
                <CpuJobType
                  runReportStateValue={undefined}
                  alertPage={alertPage || false}
                  pieChartWholeDayData={pieChartWholeDayData}
                  selectedSystem={selectedSystem}
                  id={id}
                />
              </div>
            </TabPane>
            <TabPane tabId="2">
              <div className="pie-chart-wrapper">
                <TotaliosJobType
                  runReportStateValue={undefined}
                  alertPage={alertPage || false}
                  pieChartWholeDayData={pieChartWholeDayData}
                  selectedSystem={selectedSystem}
                  id={id}
                />
              </div>
            </TabPane>
            <TabPane tabId="3">
              <div className="pie-chart-wrapper">
                <SynciosJobType
                  runReportStateValue={undefined}
                  alertPage={alertPage || false}
                  pieChartWholeDayData={pieChartWholeDayData}
                  selectedSystem={selectedSystem}
                  id={id}
                />
              </div>
            </TabPane>
            <TabPane tabId="4">
              <div className="pie-chart-wrapper">
                <AsynciosJobType
                  runReportStateValue={undefined}
                  alertPage={alertPage || false}
                  pieChartWholeDayData={pieChartWholeDayData}
                  selectedSystem={selectedSystem}
                  id={id}
                />
              </div>
            </TabPane>
            <TabPane tabId="5">
              <div className="pie-chart-wrapper">
                <FaultsJobType
                  runReportStateValue={undefined}
                  alertPage={alertPage || false}
                  pieChartWholeDayData={pieChartWholeDayData}
                  selectedSystem={selectedSystem}
                  id={id}
                />
              </div>
            </TabPane>
          </TabContent>
        </TabPane>
      </TabContent>
    </div>
  );
};

export default React.memo(TopJobsPieChart);
