import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAsyncDiskOperationsWC,
  getDiskOperationsDataWC,
} from "../../../../store/slices/charts/diskChartsSlice";
import WhatsChangedGeneralChartView from "../WhatsChangedChartMainPages/WhatsChangedGeneralChartView";
import useQueryData from "../../../../hooks/useQueryDataWhatsChanged";
import { createChartDataMapping } from "../../../../helpers/commonHelper";
import * as _ from "lodash";
import GridLoader from "react-spinners/GridLoader";

const DiskOperationsPrint = () => {
  const dispatch = useDispatch();
  const diskOperations = useSelector(getDiskOperationsDataWC);
  const activeChartView = useSelector((state) => state.charts.activeChartView);
  const qd = useQueryData();
  useEffect(() => {
    dispatch(fetchAsyncDiskOperationsWC(qd));
  }, [dispatch]);

  const DiskOperation = createChartDataMapping(
    diskOperations.data.data || [],
    "stackedColumn",
    "diskOperations"
  );

  return (
    <>
      {diskOperations.loading && (
        <div className="chart_container">
          <div style={{ display: "block", margin: "auto" }}>
            <GridLoader color="#366bd6"/>
          </div>
          <div style={{ display: "block", margin: "auto" }}>
            <GridLoader color="#366bd6"/>
          </div>
        </div>
      )}
      {!diskOperations.loading && !_.isEmpty(diskOperations.data) && (
        <div className="chart_container">
          <table className="table tableAlign printTable">
            <tbody>
              <tr>
                {activeChartView.isMetricsChart && (
                  <WhatsChangedGeneralChartView
                    key={"diskoperations"}
                    data={DiskOperation}
                    title={"Disk Operations"}
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

export default DiskOperationsPrint;
