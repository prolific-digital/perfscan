import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAsyncTopPoolFaultingRateWhatsChanged,
  getTopPoolFaultingDataWc,
} from "../../../../store/slices/charts/memoryChartsSlice";
import useQueryData from "../../../../hooks/useQueryDataWhatsChanged";
import { createChartDataMapping } from "../../../../helpers/commonHelper";
import * as _ from "lodash";
import ChartViewPools from "../../common/ChartViewPools";
import GridLoader from "react-spinners/GridLoader";


const TopPoolFaultPrint = () => {
  const dispatch = useDispatch();
  const topPoolFaultingData = useSelector(getTopPoolFaultingDataWc);
  const activeChartView = useSelector((state) => state.charts.activeChartView);
  const [checkData, setCheckData] = useState(false); //new

  const qd = useQueryData();
  useEffect(() => {
    dispatch(fetchAsyncTopPoolFaultingRateWhatsChanged(qd));
  }, [dispatch]);

  useEffect(() => {
    if (
      topPoolFaultingData.loading === false &&
      !_.isEmpty(topPoolFaultingData.data)
    ) {
      if (topPoolFaultingData.data.data.length === 0) {
        setCheckData(false);
      } else {
        setCheckData(true);
      }
    }
  }, [topPoolFaultingData]);

  const topPoolFaultingDataMatrics = createChartDataMapping(
    topPoolFaultingData.data.data || [],
    "stackedColumn",
    "topPoolFaultingRate"
  );

  return (
    <>
      {topPoolFaultingData.loading && (
        <div className="chart_container">
          <div style={{ display: "block", margin: "auto" }}>
            <GridLoader color="#366bd6"/>
          </div>
          <div style={{ display: "block", margin: "auto" }}>
            <GridLoader color="#366bd6"/>
          </div>
        </div>
      )}
      {!topPoolFaultingData.loading &&
        !_.isEmpty(topPoolFaultingData.data) &&
        checkData && (
          <div className="chart_container">
            <table className="table tableAlign printTable">
              <tbody>
                <tr>
                  {activeChartView.isMetricsChart && (
                    <ChartViewPools
                      poolData={topPoolFaultingDataMatrics}
                      title={"Top Pool Faulting Rate"}
                      yAxisTitle={"Faults / Sec"}
                      isVisible={true}
                      showTotal={false}
                      minimum={0}
                    />
                  )}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      {!topPoolFaultingData.loading &&
        checkData === false &&
        activeChartView.isMetricsChart &&
        activeChartView.isTrendsChart && (
          <div className="chart_container">
            <div className="chat_main1">
              No data available for Top Pool Fault.
            </div>
            <div className="chat_main1">
              No data available for Top Pool Fault.
            </div>
          </div>
        )}
      {!topPoolFaultingData.loading &&
        checkData === false &&
        activeChartView.isMetricsChart &&
        activeChartView.isTrendsChart === false && (
          <div className="chart_container">
            <div className="chat_main1">
              No data available for Top Pool Fault.
            </div>
          </div>
        )}
      {!topPoolFaultingData.loading &&
        checkData === false &&
        activeChartView.isMetricsChart === false &&
        activeChartView.isTrendsChart && (
          <div className="chart_container">
            <div className="chat_main1">
              No data available for Top Pool Fault.
            </div>
          </div>
        )}
    </>
  );
};

export default TopPoolFaultPrint;
