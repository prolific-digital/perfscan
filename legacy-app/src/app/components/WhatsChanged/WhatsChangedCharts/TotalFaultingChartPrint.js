import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAsyncTotalFaultingRateWhatsChanged,
  getTotalFaultingRateDataWc,
} from "../../../../store/slices/charts/memoryChartsSlice";
import WhatsChangedGeneralChartView from "../WhatsChangedChartMainPages/WhatsChangedGeneralChartView";
import useQueryData from "../../../../hooks/useQueryDataWhatsChanged";
import { createChartDataMapping } from "../../../../helpers/commonHelper";
import * as _ from "lodash";
import GridLoader from "react-spinners/GridLoader";


const TotalFaultingChartPrint = () => {
  const dispatch = useDispatch();
  const totalFaultingChartData = useSelector(getTotalFaultingRateDataWc);
  const activeChartView = useSelector((state) => state.charts.activeChartView);
  const qd = useQueryData();
  useEffect(() => {
    dispatch(fetchAsyncTotalFaultingRateWhatsChanged(qd));
  }, [dispatch]);

  const TopFaultingChart = createChartDataMapping(
    totalFaultingChartData.data.data || [],
    "stackedColumn",
    "totalFaultingRate"
  );

  return (
    <>
      {" "}
      {totalFaultingChartData.loading && (
        <div className="chart_container">
          <div style={{ display: "block", margin: "auto" }}>
            <GridLoader color="#366bd6"/>
          </div>
          <div style={{ display: "block", margin: "auto" }}>
            <GridLoader color="#366bd6"/>
          </div>
        </div>
      )}
      {!totalFaultingChartData.loading &&
        !_.isEmpty(totalFaultingChartData.data) && (
          <div className="chart_container">
            <table className="table tableAlign printTable">
              <tbody>
                <tr>
                  {activeChartView.isMetricsChart && (
                    <WhatsChangedGeneralChartView
                      key={"topfaultingchart"}
                      data={TopFaultingChart}
                      title={"Total Faulting Chart"}
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
      {!totalFaultingChartData.loading &&
        activeChartView.isMetricsChart &&
        activeChartView.isTrendsChart && (
          <div className="chart_container">
            <div className="chat_main1">
              {" "}
              {/* noDataStyle  */}
              No data available for Total Faulting.
            </div>
            <div className="chat_main1">
              {" "}
              {/* noDataStyle  */}
              No data available for Total Faulting.
            </div>
          </div>
        )}
      {!totalFaultingChartData.loading &&
        activeChartView.isMetricsChart &&
        activeChartView.isTrendsChart === false && (
          <div className="chart_container">
            <div className="chat_main1">
              {" "}
              {/* noDataStyle  */}
              No data available for Total Faulting.
            </div>
          </div>
        )}
      {!totalFaultingChartData.loading &&
        activeChartView.isMetricsChart === false &&
        activeChartView.isTrendsChart && (
          <div className="chart_container">
            <div className="chat_main1">
              {" "}
              {/* noDataStyle  */}
              No data available for Total Faulting.
            </div>
          </div>
        )}
    </>
  );
};

export default TotalFaultingChartPrint;
