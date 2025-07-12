import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAsyncWhatsChangedNumCores, getWhatsChangedNumCoresData } from "../../../../store/slices/charts/cpuChartsSlice";
import CanvasJSReact from "../../../../scripts/canvasjs.stock.react";
import WhatsChangedGeneralChartView from "../WhatsChangedChartMainPages/WhatsChangedGeneralChartView";
import useQueryData from '../../../../hooks/useQueryDataWhatsChanged';
import { createChartDataMapping } from "../../../../helpers/commonHelper";
import * as _ from 'lodash';
import GridLoader from "react-spinners/GridLoader";


const NumCoresChartPrint = () => {
  const dispatch = useDispatch();
  const numCoresData = useSelector(getWhatsChangedNumCoresData);
  const activeChartView = useSelector(state => state.charts.activeChartView);
  const qd = useQueryData();
  useEffect(() => {
    dispatch(fetchAsyncWhatsChangedNumCores(qd));
  }, [dispatch])

  const NumCoresUtilizationData = createChartDataMapping(
    numCoresData.data.data || [],
    "stackedColumn",
    "noOfCores"
  );
  

  return (
    <>  {numCoresData.loading &&
      <div className="chart_container">
        <div style={{ display: "block", margin: "auto" }}>
          <GridLoader color="#366bd6"/>
        </div>
        <div style={{ display: "block", margin: "auto" }}>
          <GridLoader color="#366bd6"/>
        </div>
      </div>
    }
      {!numCoresData.loading && !_.isEmpty(numCoresData.data) &&
        <div className="chart_container">
          <table className="table tableAlign printTable">
            <tbody>
              <tr>
                {activeChartView.isMetricsChart && (
                  <WhatsChangedGeneralChartView
                    key={"noofcores"}
                    data={NumCoresUtilizationData}
                    title={"Number of Cores"}
                    yAxisTitle={"Cores"}
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

export default NumCoresChartPrint
