import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAsyncReadWriteRatioWC,
  getDiskReadWriteDataWC,
} from "../../../../store/slices/charts/diskChartsSlice";
import WhatsChangedGeneralChartView from "../WhatsChangedChartMainPages/WhatsChangedGeneralChartView";
import useQueryData from "../../../../hooks/useQueryDataWhatsChanged";
import { createChartDataMapping } from "../../../../helpers/commonHelper";
import * as _ from "lodash";
import GridLoader from "react-spinners/GridLoader";


const DiskReadWriteRatioPrint = () => {
  const dispatch = useDispatch();
  const diskReadWriteRatioData = useSelector(getDiskReadWriteDataWC);
  const activeChartView = useSelector((state) => state.charts.activeChartView);
  const qd = useQueryData();
  useEffect(() => {
    dispatch(fetchAsyncReadWriteRatioWC(qd));
  }, [dispatch]);

  const DiskReadWriteRatio = createChartDataMapping(
    diskReadWriteRatioData.data.data || [],
    "stackedColumn",
    "readWriteRatio"
  );

  return (
    <>
      {" "}
      {diskReadWriteRatioData.loading && (
        <div className="chart_container">
          <div style={{ display: "block", margin: "auto" }}>
            <GridLoader color="#366bd6"/>
          </div>
          <div style={{ display: "block", margin: "auto" }}>
            <GridLoader color="#366bd6"/>
          </div>
        </div>
      )}
      {!diskReadWriteRatioData.loading &&
        !_.isEmpty(diskReadWriteRatioData.data) && (
          <div className="chart_container">
            <table className="table tableAlign printTable">
              <tbody>
                <tr>
                  {activeChartView.isMetricsChart && (
                    <WhatsChangedGeneralChartView
                      key={"readwriteratio"}
                      data={DiskReadWriteRatio}
                      title={"Disk Read Write Ratio"}
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

export default DiskReadWriteRatioPrint;
