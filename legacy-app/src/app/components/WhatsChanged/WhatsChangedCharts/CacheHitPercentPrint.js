import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAsyncCacheHitPercWC,
  getDiskCacheHitDataWC,
} from "../../../../store/slices/charts/diskChartsSlice";
import WhatsChangedGeneralChartView from "../WhatsChangedChartMainPages/WhatsChangedGeneralChartView";
import useQueryData from "../../../../hooks/useQueryDataWhatsChanged";
import { createChartDataMapping } from "../../../../helpers/commonHelper";
import * as _ from "lodash";
import GridLoader from "react-spinners/GridLoader";

const CacheHitPercentPrint = () => {
  const dispatch = useDispatch();
  const cacheHitPercentage = useSelector(getDiskCacheHitDataWC);
  const activeChartView = useSelector((state) => state.charts.activeChartView);
  const qd = useQueryData();
  useEffect(() => {
    dispatch(fetchAsyncCacheHitPercWC(qd));
  }, [dispatch]);

  const CacheHitPercentage = createChartDataMapping(
    cacheHitPercentage.data.data || [],
    "stackedColumn",
    "cacheHitPercentage"
  );

  return (
    <>
      {" "}
      {cacheHitPercentage.loading && (
        <div className="chart_container">
          <div style={{ display: "block", margin: "auto" }}>
            <GridLoader color="#366bd6"/>
          </div>
          <div style={{ display: "block", margin: "auto" }}>
            <GridLoader color="#366bd6"/>
          </div>
        </div>
      )}
      {!cacheHitPercentage.loading && !_.isEmpty(cacheHitPercentage.data) && (
        <div className="chart_container">
          <table className="table tableAlign printTable">
            <tbody>
              <tr>
                {activeChartView.isMetricsChart && (
                  <WhatsChangedGeneralChartView
                    key={"diskarm"}
                    data={CacheHitPercentage}
                    title={"Cache Hit Percentage"}
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

export default CacheHitPercentPrint;
