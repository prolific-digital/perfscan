import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAsyncDiskSpaceUtilizationWC,
  getDiskSpaceDataWC,
} from "../../../../store/slices/charts/diskChartsSlice";
import WhatsChangedGeneralChartView from "../WhatsChangedChartMainPages/WhatsChangedGeneralChartView";
import useQueryData from "../../../../hooks/useQueryDataWhatsChanged";
import { createChartDataMapping } from "../../../../helpers/commonHelper";
import * as _ from "lodash";
import GridLoader from "react-spinners/GridLoader";


const DiskSpaceUtlizationPrint = () => {
  const dispatch = useDispatch();
  const diskSpaceUtilization = useSelector(getDiskSpaceDataWC);
  const activeChartView = useSelector((state) => state.charts.activeChartView);
  const qd = useQueryData();
  useEffect(() => {
    dispatch(fetchAsyncDiskSpaceUtilizationWC(qd));
  }, [dispatch]);

  const DiskSpceUtilization = createChartDataMapping(
    diskSpaceUtilization.data.data || [],
    "column",
    "diskSpaceUtilization"
  );
  
  return (
    <>
      {diskSpaceUtilization.loading && (
        <div className="chart_container">
          <div style={{ display: "block", margin: "auto" }}>
            <GridLoader color="#366bd6"/>
          </div>
          <div style={{ display: "block", margin: "auto" }}>
            <GridLoader color="#366bd6"/>
          </div>
        </div>
      )}
      {!diskSpaceUtilization.loading &&
        !_.isEmpty(diskSpaceUtilization.data) && (
          <div className="chart_container">
            <table className="table tableAlign printTable">
              <tbody>
                <tr>
                  {activeChartView.isMetricsChart && (
                    <WhatsChangedGeneralChartView
                      key={"diskspaceutilization"}
                      data={DiskSpceUtilization}
                      title={"Disk Space Utilization"}
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

export default DiskSpaceUtlizationPrint;
