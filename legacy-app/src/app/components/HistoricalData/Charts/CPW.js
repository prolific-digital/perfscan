import React, { useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import * as _ from 'lodash';
import GridLoader from "react-spinners/GridLoader";
//Local imports to be put separtely.
import {
  createChartDataMapping,
} from "../../../../helpers/commonHelper";
import { fetchAsyncCPW, getCPWData } from "../../../../store/slices/charts/cpuChartsSlice";
import useQueryData from "../../../../hooks/useQueryDataHistorical";
import ChartView from "../../common/ChartView";
import ChartViewTrend from "../../common/ChartViewTrend";
import { getUuidData } from "../../../../store/slices/reports/SaveNewReport/SaveNewReport";
import { getExSummaryCPUData } from "../../../../store/slices/datatables/executiveSummarySlice";

const CPW = ({ activeChartView }) => {
  const dispatch = useDispatch();
  const cpwData = useSelector(getCPWData);
  const [checkData, setCheckData] = useState(false); //new
  const qd = useQueryData();
  const uuid = useSelector(getUuidData);
  const criticalUtilizationValue = useSelector(getExSummaryCPUData)
  const systemName = cpwData?.data?.params?.server?.split(' ');

  useEffect(() => {
    if(!uuid?.loading && uuid.data.uniqueid){
    dispatch(fetchAsyncCPW(qd));
    }
    }, [dispatch, uuid])


  useEffect(() => {
    if (cpwData.loading === false && !_.isEmpty(cpwData.data)) {
      if (cpwData.data.data.length === 0) {
        setCheckData(false);
      }
      else{
        setCheckData(true)
      }
    }
  }, [cpwData])


  const cpwUtilization = createChartDataMapping(
    cpwData.data.data || [],
    "stackedArea",
    "cpwUtilization"
  );
  const cpwUtilizationTrends = createChartDataMapping(
    cpwData.data.trend || [],
    "stackedArea",
    "cpwUtilizationTrends"
  );
  return (
            <>  {cpwData.loading &&
        <div className="chart_container">
          <div style={{ display: "block", margin: "auto" }}>
            <GridLoader color="#366bd6"/>
          </div>
          <div style={{ display: "block", margin: "auto" }}>
            <GridLoader color="#366bd6"/>
          </div>
        </div>
                }
                {!cpwData.loading && !_.isEmpty(cpwData.data) && (checkData) &&
        <div className="chart_container">
          {activeChartView.isMetricsChart && (
            <ChartView
              key={"cpuutilization"}
              data={cpwUtilization}
              title={"CPW"}
              subtitle={systemName[0]}
              yAxisTitle={"Utilization"}
              xAxisDateFormat={cpwUtilization[0].xValueFormatString}
              isVisible={true}
              showTotal={true}
              stripLineToggle = {activeChartView.isShowGuidelines}
              criticalUtilizationValue={cpwData}
              metricType = {"cpw"}
              minimum = {0}/>
          )}
          {activeChartView.isTrendsChart && (
            <ChartViewTrend
              key={"cpuutilizationtrends"}
              data={cpwUtilizationTrends}
              title={"CPW with Trends"}
              subtitle={systemName[0]}
              yAxisTitle={"Utilization"}
              isVisible={true}
              xAxisDateFormat="MMM YYYY"
              showTotal={true}
              minimum={0}
              stripLineToggle = {activeChartView.isShowGuidelines}
              criticalUtilizationValue={cpwData}
              metricType = {"cpw"}
            />
          )}
        </div>
                }

                {!cpwData.loading && (checkData === false)  && activeChartView.isMetricsChart && activeChartView.isTrendsChart &&
          <div className="chart_container">
                    <div className="chat_main1"> {/* noDataStyle  */}
                    <div style={{textAlign:'center'}}>
                      <h4>CPW</h4>
                      <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for CPU Utilization."/>
                    </div>
            </div>
                  <div className="chat_main1">  
                  <div style={{textAlign:'center'}}>
                    <h4>CPW</h4>
                    <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for CPU Utilization."/>
                  </div>
                  </div>
          </div>
                }

                {!cpwData.loading && (checkData === false)  && activeChartView.isMetricsChart && (activeChartView.isTrendsChart === false) &&
          <div className="chart_container">
                <div className="chat_main1"> {/* noDataStyle  */}
                <div style={{textAlign:'center'}}>
                  <h4>CPW</h4>
                  <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for CPU Utilization."/>
                </div>
            </div>
          </div>
                }
                 {!cpwData.loading && (checkData === false)  && (activeChartView.isMetricsChart === false) && (activeChartView.isTrendsChart) &&
          <div className="chart_container">
                    <div className="chat_main1"> {/* noDataStyle  */}
                    <div style={{textAlign:'center'}}>
                      <h4>CPW</h4>        
                      <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for CPU Utilization."/>
                </div>
            </div>
          </div>
                }
    </>
    )
}

export default React.memo(CPW);