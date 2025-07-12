import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAsyncEthernetUtilizationWhatsChanged,
  getEthernetLineDataWC,
} from "../../../../store/slices/charts/otherChartsSlice";
import WhatsChangedGeneralChartView from "../WhatsChangedChartMainPages/WhatsChangedGeneralChartView";
import useQueryData from "../../../../hooks/useQueryDataWhatsChanged";
import { createChartDataMapping } from "../../../../helpers/commonHelper";
import * as _ from "lodash";
import GridLoader from "react-spinners/GridLoader";

const EthernetLineUtilsPrint = () => {
  const dispatch = useDispatch();
  const ethernetline = useSelector(getEthernetLineDataWC);
  const activeChartView = useSelector((state) => state.charts.activeChartView);
  const qd = useQueryData();
  useEffect(() => {
    dispatch(fetchAsyncEthernetUtilizationWhatsChanged(qd));
  }, [dispatch]);

  const EthernetLineUtil = createChartDataMapping(
    ethernetline.data.data || [],
    "stackedColumn",
    "ethernetLineUtilization"
  );

  return (
    <>
      {" "}
      {ethernetline.loading && (
        <div className="chart_container">
          <div style={{ display: "block", margin: "auto" }}>
            <GridLoader color="#366bd6"/>
          </div>
          <div style={{ display: "block", margin: "auto" }}>
            <GridLoader color="#366bd6"/>
          </div>
        </div>
      )}
      {!ethernetline.loading && !_.isEmpty(ethernetline.data) && (
        <div className="chart_container">
          <table className="table tableAlign printTable">
            <tbody>
              <tr>
                {activeChartView.isMetricsChart && (
                  <WhatsChangedGeneralChartView
                    key={"ethernetlineutil"}
                    data={EthernetLineUtil}
                    title={"Ethernet Line Util"}
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

export default EthernetLineUtilsPrint;
