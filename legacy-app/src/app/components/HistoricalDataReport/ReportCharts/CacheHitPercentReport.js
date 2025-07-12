import React, { useEffect, useState, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAsyncCacheHitPercReports, getDiskCacheHitDataReports } from "../../../../store/slices/reports/DataReportCharts/diskReportChartsSlice";
import useQueryData from "../../../../hooks/useQueryDataHistorical";
import {
    createChartDataMapping,
  } from "../../../../helpers/commonHelper";
import ChartView from "../../common/ChartView";
import ChartViewTrend from "../../common/ChartViewTrend";
import * as _ from 'lodash';
import GridLoader from "react-spinners/GridLoader";

const CacheHitPercentReport = ({activeChartView,reportId}) => {
    const dispatch = useDispatch();
    const CacheHitData = useSelector(getDiskCacheHitDataReports);
    const [checkData, setCheckData] = useState(false);
    useEffect(() => {
        dispatch(fetchAsyncCacheHitPercReports(reportId));
    }, [dispatch])

    useEffect(() => {
        if(CacheHitData.loading === false && !_.isEmpty(CacheHitData.data)){
            if(CacheHitData.data.data.length === 0){
                setCheckData(false);
            }
            else{
                setCheckData(true)
            }
        }
    }, [CacheHitData])

    const CacheHitDataMatrics = createChartDataMapping(
        CacheHitData.data.data || [],
        "stackedArea",
        "cacheHitPercentage"
    );
    const CacheHitDataTrends = createChartDataMapping(
        CacheHitData.data.trend || [],
        "stackedArea",
        "cacheHitPercentageTrends"
    );

    return (
            <>  {CacheHitData.loading &&
                <div className="chart_container">
                <div style={{display:"block",margin:"auto"}}>  
                   <GridLoader color="#366bd6"/>
                </div>
                <div style={{display:"block",margin:"auto"}}>  
                   <GridLoader color="#366bd6"/>
                </div>
           </div>
                }
                {!CacheHitData.loading && !_.isEmpty(CacheHitData.data) && (checkData) &&
                <div className="chart_container" style={{ pageBreakAfter: "always" }}>
                    {activeChartView.isMetricsChart && (
                        <ChartView
                        data={CacheHitDataMatrics}
                        title={"Cache Hit % "}
                        yAxisTitle={"Utilization"}
                        xAxisDateFormat={CacheHitDataMatrics[0].xValueFormatString}
                        isVisible={true}
                        showTotal={true}
                        minimum = {0}
                      />
                    )}
                    {activeChartView.isTrendsChart && (
                        <ChartViewTrend
                        data={CacheHitDataTrends}
                        title={"Cache Hit % with Trends "}
                        yAxisTitle={"Utilization"}
                        isVisible={activeChartView.isTrendsChart}
                        xAxisDateFormat="MMM YYYY"
                        showTotal={true}
                        minimum = {0}
                      />
                    )}
                </div>
                }

                {!CacheHitData.loading && (checkData === false)  && activeChartView.isMetricsChart && activeChartView.isTrendsChart &&
                <div className="chart_container">
                    <div className="chat_main1"> {/* noDataStyle  */}
                        <div style={{textAlign:'center'}}>
                            <h4>CacheHit percentage</h4>
                            <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for CacheHit percentage."/>
                        </div> 
                    </div> 
                    <div className="chat_main1"> {/* noDataStyle  */}
                        <div style={{textAlign:'center'}}>
                            <h4>CacheHit percentage</h4>
                            <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for CacheHit percentage."/>
                        </div> 
                    </div> 
                </div> 
                }

                {!CacheHitData.loading && (checkData === false)  && activeChartView.isMetricsChart && (activeChartView.isTrendsChart === false) &&
                    <div className="chart_container">
                    <div className="chat_main1"> {/* noDataStyle  */}
                            <div style={{textAlign:'center'}}>
                                <h4>CacheHit percentage</h4>
                                <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for CacheHit percentage."/>
                            </div> 
                        </div> 
                   </div>
                }
                 {!CacheHitData.loading && (checkData === false)  && (activeChartView.isMetricsChart === false) && (activeChartView.isTrendsChart) &&
                    <div className="chart_container">
                        <div className="chat_main1"> {/* noDataStyle  */}
                            <div style={{textAlign:'center'}}>
                                <h4>CacheHit percentage</h4>
                                <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for CacheHit percentage."/>
                            </div> 
                        </div> 
                   </div>
                }
            </>
    )
}

export default memo(CacheHitPercentReport);