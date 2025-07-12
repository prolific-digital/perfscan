import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAsyncMachinePoolFaultingWhatsChanged,
  getMachinPoolFaultingDataWc,
} from "../../../../store/slices/charts/memoryChartsSlice";
import WhatsChangedGeneralChartView from "../WhatsChangedChartMainPages/WhatsChangedGeneralChartView";
import useQueryData from "../../../../hooks/useQueryDataWhatsChanged";
import { createChartDataMapping } from "../../../../helpers/commonHelper";
import * as _ from "lodash";
import GridLoader from "react-spinners/GridLoader";

const MachinePoolFaultingPrint = () => {
  const dispatch = useDispatch();
  const machinePoolFaulting = useSelector(getMachinPoolFaultingDataWc);
  const activeChartView = useSelector((state) => state.charts.activeChartView);
  const qd = useQueryData();
  useEffect(() => {
    dispatch(fetchAsyncMachinePoolFaultingWhatsChanged(qd));
  }, [dispatch]);

  const MachinePool = createChartDataMapping(
    machinePoolFaulting.data.data || [],
    "stackedColumn",
    "machinePoolFaulting"
  );
  
  return (
    <>
      {" "}
      {machinePoolFaulting.loading && (
        <div className="chart_container">
          <div style={{ display: "block", margin: "auto" }}>
            <GridLoader color="#366bd6"/>
          </div>
          <div style={{ display: "block", margin: "auto" }}>
            <GridLoader color="#366bd6"/>
          </div>
        </div>
      )}
      {!machinePoolFaulting.loading && !_.isEmpty(machinePoolFaulting.data) && (
        <div className="chart_container">
          <table className="table tableAlign printTable">
            <tbody>
              <tr>
                {activeChartView.isMetricsChart && (
                  <WhatsChangedGeneralChartView
                    key={"machinepoolfaulting"}
                    data={MachinePool}
                    title={"Machine Pool Faulting Rate"}
                    yAxisTitle={"Utilization"}
                    isVisible={activeChartView.isMetricsChart}
                    maximum={10}
                    minimum={0}
                    showTotal={false}
                  />
                )}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default MachinePoolFaultingPrint;
