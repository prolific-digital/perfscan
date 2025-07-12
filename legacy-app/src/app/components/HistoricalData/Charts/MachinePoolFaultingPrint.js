import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAsyncMachinePoolFaulting, getMachinPoolFaultingData } from "../../../../store/slices/charts/memoryChartsSlice";
import useQueryData from "../../../../hooks/useQueryDataHistorical";
import {
  createChartDataMapping,
} from "../../../../helpers/commonHelper";
import ChartView from "../../common/ChartView";
import ChartViewTrend from "../../common/ChartViewTrend";
import * as _ from 'lodash';
import GridLoader from "react-spinners/GridLoader";

const MachinePoolFaultingPrint = ({ activeChartView }) => {
  const dispatch = useDispatch();
  const MachinePoolFaultingData = useSelector(getMachinPoolFaultingData);
  const qd = useQueryData();
  const [checkData, setCheckData] = useState(false); //new

  useEffect(() => {
    dispatch(fetchAsyncMachinePoolFaulting(qd));
  }, [dispatch])

  useEffect(() => {
    if (MachinePoolFaultingData.loading === false && !_.isEmpty(MachinePoolFaultingData.data.data)) {
      if (MachinePoolFaultingData.data.data.length === 0) {
        setCheckData(false);
      }
      else {
        setCheckData(true)
      }
    }
  }, [MachinePoolFaultingData])

  const MachinePoolFaultingMatrics = createChartDataMapping(
    MachinePoolFaultingData.data.data || [],
    "stackedColumn",
    "machinePoolFaulting"
  );
  const MachinePoolFaultingTrends = createChartDataMapping(
    MachinePoolFaultingData.data.trend || [],
    "stackedColumn",
    "machinePoolFaultingTrends"
  );

  return (
    <>  {MachinePoolFaultingData.loading && (checkData) &&
      <div className="chart_container">
        <div style={{ display: "block", margin: "auto" }}>
          <GridLoader color="#366bd6"/>
        </div>
        <div style={{ display: "block", margin: "auto" }}>
          <GridLoader color="#366bd6"/>
        </div>
      </div>
    }
      {!MachinePoolFaultingData.loading && !_.isEmpty(MachinePoolFaultingData.data.data) &&
        <div className="chart_container">
          <table className="table tableAlign printTable">
            <tbody>
              <tr>
                {activeChartView.isMetricsChart && (
                  <ChartView
                    data={MachinePoolFaultingMatrics}
                    title={"Machine Pool Faulting Rate"}
                    yAxisTitle={"Faults / Sec"}
                    isVisible={activeChartView.isMetricsChart}
                    showTotal={false}
                    minimum={0}
                  />
                )}
              </tr>
              <tr>
                {activeChartView.isTrendsChart && (
                  <ChartViewTrend
                    data={MachinePoolFaultingTrends}
                    title={"Machine Pool Faulting Rate with Trends "}
                    yAxisTitle={"Faults / Sec"}
                    isVisible={activeChartView.isTrendsChart}
                    xAxisDateFormat="MMM YYYY"
                    showTotal={false}
                    minimum={0}
                  />
                )}
              </tr>
            </tbody>
          </table>
        </div>
      }

      {!MachinePoolFaultingData.loading && _.isEmpty(MachinePoolFaultingData.data.data) && (checkData === false) && activeChartView.isMetricsChart && activeChartView.isTrendsChart &&
        <div className="chart_container">
          <div className="chat_main1"> {/* noDataStyle  */}
            <div style={{textAlign:'center'}}>
              <h4>Machine Pool Faulting</h4>
              <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for Machine Pool Faulting."/>
              </div>
          </div>
          <div className="chat_main1">  {/* noDataStyle  */}
            <div style={{textAlign:'center'}}>
              <h4>Machine Pool Faulting</h4>
              <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for Machine Pool Faulting."/>
              </div>
          </div>
        </div>
      }

      {!MachinePoolFaultingData.loading && _.isEmpty(MachinePoolFaultingData.data.data) && (checkData === false) && activeChartView.isMetricsChart && (activeChartView.isTrendsChart === false) &&
        <div className="chart_container">
          <div className="chat_main1"> {/* noDataStyle  */}
            <div style={{textAlign:'center'}}>
              <h4>Machine Pool Faulting</h4>
              <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for Machine Pool Faulting."/>
              </div>
          </div>
        </div>
      }
      {!MachinePoolFaultingData.loading && _.isEmpty(MachinePoolFaultingData.data.data) && (checkData === false) && (activeChartView.isMetricsChart === false) && (activeChartView.isTrendsChart) &&
        <div className="chart_container">
          <div className="chat_main1"> {/* noDataStyle  */}
            <div style={{textAlign:'center'}}>
              <h4>Machine Pool Faulting</h4>
              <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for Machine Pool Faulting."/>
              </div>
          </div>
        </div>
      }
    </>
  )
}

export default (MachinePoolFaultingPrint);