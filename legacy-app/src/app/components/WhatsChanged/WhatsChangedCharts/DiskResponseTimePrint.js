import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAsyncDiskResponseWC,
  getDiskResponseDataWC,
} from "../../../../store/slices/charts/diskChartsSlice";
import WhatsChangedGeneralChartView from "../WhatsChangedChartMainPages/WhatsChangedGeneralChartView";
import useQueryData from "../../../../hooks/useQueryDataWhatsChanged";
import { createChartDataMapping } from "../../../../helpers/commonHelper";
import * as _ from "lodash";
import GridLoader from "react-spinners/GridLoader";

const DiskResponseTimePrint = () => {
  const dispatch = useDispatch();
  const diskResponseTime = useSelector(getDiskResponseDataWC);
  const activeChartView = useSelector((state) => state.charts.activeChartView);
  const qd = useQueryData();
  useEffect(() => {
    dispatch(fetchAsyncDiskResponseWC(qd));
  }, [dispatch]);

  const DiskResponseTime = createChartDataMapping(
    diskResponseTime.data.data || [],
    "stackedColumn",
    "diskResponse"
  );

  return (
    <>
      {" "}
      {diskResponseTime.loading && (
        <div className="chart_container">
          <div style={{ display: "block", margin: "auto" }}>
            <GridLoader color="#366bd6"/>
          </div>
          <div style={{ display: "block", margin: "auto" }}>
            <GridLoader color="#366bd6"/>
          </div>
        </div>
      )}
      {!diskResponseTime.loading && !_.isEmpty(diskResponseTime.data) && (
        <div className="chart_container">
          <table className="table tableAlign printTable">
            <tbody>
              <tr>
                {activeChartView.isMetricsChart && (
                  <WhatsChangedGeneralChartView
                    key={"diskresponse"}
                    data={DiskResponseTime}
                    title={"Disk Response Time"}
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

export default DiskResponseTimePrint;
