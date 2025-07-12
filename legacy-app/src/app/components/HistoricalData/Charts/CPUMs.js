import React, { useEffect, useState, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAsyncCPUMS, getCPUMsData } from "../../../../store/slices/charts/cpuChartsSlice";
import useQueryData from "../../../../hooks/useQueryDataHistorical";
import {
  createChartDataMapping,
} from "../../../../helpers/commonHelper";
import ChartView from "../../common/ChartView";
import ChartViewTrend from "../../common/ChartViewTrend";
import * as _ from 'lodash';
import GridLoader from "react-spinners/GridLoader";
import { getUuidData } from "../../../../store/slices/reports/SaveNewReport/SaveNewReport";
import { getExSummaryCPUData } from "../../../../store/slices/datatables/executiveSummarySlice";

const CPUMs = ({ activeChartView }) => {
  const dispatch = useDispatch();
  const cpuMSData = useSelector(getCPUMsData);
  const [checkData, setCheckData] = useState(false);
  const qd = useQueryData();
  const uuid = useSelector(getUuidData);
  const criticalUtilizationValue = useSelector(getExSummaryCPUData)
  const systemName = cpuMSData?.data?.params?.server?.split(' ');

  useEffect(() => {
    if(!uuid?.loading && uuid.data.uniqueid ){
    dispatch(fetchAsyncCPUMS(qd));
    }
    }, [dispatch, uuid])

  useEffect(() => {
    if (cpuMSData.loading === false && !_.isEmpty(cpuMSData.data)) {
      if (cpuMSData.data.data.length === 0) {
        setCheckData(false);
      }
            else{
                setCheckData(true)
    }
        }
    }, [cpuMSData])

  const CPUMsUtilization = createChartDataMapping(
    cpuMSData.data.data || [],
    "stackedArea",
    "CPUMsUtilization"
  );
  const CPUMsTrends = createChartDataMapping(
    cpuMSData.data.trend || [],
    "stackedArea",
    "CPUMsTrends"
  );

  return (
            <>  {cpuMSData.loading &&
        <div className="chart_container">
          <div style={{ display: "block", margin: "auto" }}>
            <GridLoader color="#366bd6"/>
          </div>
          <div style={{ display: "block", margin: "auto" }}>
            <GridLoader color="#366bd6"/>
          </div>
        </div>
                }
                {!cpuMSData.loading && !_.isEmpty(cpuMSData.data) && (checkData) &&
        <div className="chart_container">
          {activeChartView.isMetricsChart && (
            <ChartView
              data={CPUMsUtilization}
              title={"Total CPU ms used"}
              subtitle={systemName[0]}
              yAxisTitle={"ms"}
              xAxisDateFormat={CPUMsUtilization[0].xValueFormatString}
              isVisible={true}
              showTotal={false}
              stripLineToggle = {activeChartView.isShowGuidelines}
              criticalUtilizationValue={cpuMSData}
              metricType = {"cpu_ms"}
              minimum={0}
            />
          )}
          {activeChartView.isTrendsChart && (
            <ChartViewTrend
              data={CPUMsTrends}
              title={"Total CPU ms used with Trends "}
              subtitle={systemName[0]}
              yAxisTitle={"ms"}
              isVisible={activeChartView.isTrendsChart}
              xAxisDateFormat="MMM YYYY"
              showTotal={false}
              minimum={0}
              stripLineToggle = {activeChartView.isShowGuidelines}
              criticalUtilizationValue={cpuMSData}
              metricType = {"cpu_ms"}
            />
          )}
        </div>
                }

                {!cpuMSData.loading && (checkData === false)  && activeChartView.isMetricsChart && activeChartView.isTrendsChart &&
          <div className="chart_container">
                <div className="chat_main1"> {/* noDataStyle  */}
              <div style={{textAlign:'center'}}>
                <h4>CPUMs</h4>
                <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for CPUMS data."/>
                </div>
            </div>
                <div className="chat_main1">  {/* noDataStyle  */}
              <div style={{textAlign:'center'}}>
                <h4>CPUMs</h4>
                <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for CPUMS data."/>
                </div>
            </div>
          </div>
                }

                {!cpuMSData.loading && (checkData === false)  && activeChartView.isMetricsChart && (activeChartView.isTrendsChart === false) &&                   
          <div className="chart_container">
                    <div className="chat_main1">
                    <div style={{textAlign:'center'}}>
                      <h4>CPUMs</h4>
                      <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for CPUMS data."/>
                </div>
          </div>
                 </div>
                }
                 {!cpuMSData.loading && (checkData === false)  && (activeChartView.isMetricsChart === false) && (activeChartView.isTrendsChart) &&
          <div className="chart_container">
                    <div className="chat_main1">
                    <div style={{textAlign:'center'}}>
                      <h4>CPUMs</h4>
                      <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for CPUMS data."/>
                </div> 
                  </div>  
          </div>
                }
    </>
    )
}

export default React.memo(CPUMs);