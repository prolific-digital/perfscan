import React, { useEffect, useState, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAsyncCacheHitPerc, getDiskCacheHitData } from "../../../../store/slices/charts/diskChartsSlice";
import useQueryData from "../../../../hooks/useQueryDataHistorical";
import {
    createChartDataMapping,
} from "../../../../helpers/commonHelper";

import ChartView from "../../common/ChartView";
import ChartViewTrend from "../../common/ChartViewTrend";
import * as _ from 'lodash';
import GridLoader from "react-spinners/GridLoader";

const CacheHitPercentPrint = ({ activeChartView }) => {
    const dispatch = useDispatch();
    const CacheHitData = useSelector(getDiskCacheHitData);
    const [checkData, setCheckData] = useState(false);
    const qd = useQueryData();
    useEffect(() => {
        dispatch(fetchAsyncCacheHitPerc(qd));
    }, [dispatch])

    useEffect(() => {
        if (CacheHitData.loading === false && !_.isEmpty(CacheHitData.data)) {
            if (CacheHitData.data.data.length === 0) {
                setCheckData(false);
            }
            else {
                setCheckData(true)
            }
        }
    }, [CacheHitData])

    const CacheHitDataMatrics = createChartDataMapping(
        CacheHitData.data.data || [],
        "stackedColumn",
        "cacheHitPercentage"
    );
    const CacheHitDataTrends = createChartDataMapping(
        CacheHitData.data.trend || [],
        "stackedColumn",
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
                <div className="chart_container">
                    <table className="table tableAlign printTable">
                        <tbody>
                            <tr>
                                {activeChartView.isMetricsChart && (
                                    <ChartView
                                        data={CacheHitDataMatrics}
                                        title={"Cache Hit % "}
                                        yAxisTitle={"Utilization"}
                                        isVisible={true}
                                        showTotal={true}
                                        minimum={0}
                                    />
                                )}
                            </tr>
                            <tr>
                                {activeChartView.isTrendsChart && (
                                    <ChartViewTrend
                                        data={CacheHitDataTrends}
                                        title={"Cache Hit % with Trends "}
                                        yAxisTitle={"Utilization"}
                                        isVisible={activeChartView.isTrendsChart}
                                        xAxisDateFormat="MMM YYYY"
                                        showTotal={true}
                                        minimum={0}
                                    />
                                )}
                            </tr>
                        </tbody>
                    </table>
                </div>
            }

            {!CacheHitData.loading && (checkData === false) && activeChartView.isMetricsChart && activeChartView.isTrendsChart &&
                <div className="chart_container">
                    <div className="chat_main1"> {/* noDataStyle  */}
                        <div style={{textAlign:'center'}}>
                            <h4>CacheHit percentage</h4>
                            <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for CacheHit percentage."/>
                    </div> 
                    </div>
                    <div className="chat_main1">  {/* noDataStyle  */}
                        <div style={{textAlign:'center'}}>
                            <h4>CacheHit percentage</h4>
                            <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for CacheHit percentage."/>
                    </div> 
                    </div>
                </div>
            }

            {!CacheHitData.loading && (checkData === false) && activeChartView.isMetricsChart && (activeChartView.isTrendsChart === false) &&
                <div className="chart_container">
                    <div className="chat_main1"> {/* noDataStyle  */}
                        <div style={{textAlign:'center'}}>
                            <h4>CacheHit percentage</h4>
                            <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for CacheHit percentage."/>
                    </div> 
                    </div>
                </div>
            }
            {!CacheHitData.loading && (checkData === false) && (activeChartView.isMetricsChart === false) && (activeChartView.isTrendsChart) &&
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

export default memo(CacheHitPercentPrint);