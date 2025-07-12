import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAsyncWhatsChangedCPUMS, getWhatChangedCPUMsData } from "../../../../store/slices/charts/cpuChartsSlice";
import WhatsChangedGeneralChartView from "../WhatsChangedChartMainPages/WhatsChangedGeneralChartView";
import useQueryData from '../../../../hooks/useQueryDataWhatsChanged';
import { createChartDataMapping } from "../../../../helpers/commonHelper";
import * as _ from 'lodash';
import GridLoader from "react-spinners/GridLoader";


const CpuMsChartPrint = () => {
  const dispatch = useDispatch();
  const cpuMsData = useSelector(getWhatChangedCPUMsData);
  const activeChartView = useSelector(state => state.charts.activeChartView);
  const qd = useQueryData();
  useEffect(() => {
    dispatch(fetchAsyncWhatsChangedCPUMS(qd));
  }, [dispatch])

  const CPUMsUtilization = createChartDataMapping(
    cpuMsData.data.data || [],
    "stackedColumn",
    "CPUMsUtilization"
  );

  return (
    <>  {cpuMsData.loading &&
      <div className="chart_container">
        <div style={{ display: "block", margin: "auto" }}>
          <GridLoader color="#366bd6"/>
        </div>
        <div style={{ display: "block", margin: "auto" }}>
          <GridLoader color="#366bd6"/>
        </div>
      </div>
    }
      {!cpuMsData.loading && !_.isEmpty(cpuMsData.data) &&
        <div className="chart_container">
          <table className="table tableAlign printTable">
            <tbody>
              <tr>
                {activeChartView.isMetricsChart && (
                  <WhatsChangedGeneralChartView
                    key={"cpums"}
                    data={CPUMsUtilization}
                    title={"CPU ms"}
                    yAxisTitle={"ms"}
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
      }
    </>
  )
}

export default CpuMsChartPrint
