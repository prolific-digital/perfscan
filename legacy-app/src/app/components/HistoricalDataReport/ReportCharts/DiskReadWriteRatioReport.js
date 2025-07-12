import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAsyncReadWriteRatioReports, getDiskReadWriteDataReports} from "../../../../store/slices/reports/DataReportCharts/diskReportChartsSlice";
import {
    createChartDataMapping,
  } from "../../../../helpers/commonHelper";
import ChartView from "../../common/ChartView";
import ChartViewTrend from "../../common/ChartViewTrend";
import * as _ from 'lodash';
import GridLoader from "react-spinners/GridLoader";

const DiskReadWriteRatioReport = ({activeChartView,reportId}) => {
    const dispatch = useDispatch();
    const diskReadWriteRatioData = useSelector(getDiskReadWriteDataReports);
    const [checkData, setCheckData] = useState(false); //new

    useEffect(() => {
        dispatch(fetchAsyncReadWriteRatioReports(reportId));
    }, [dispatch])

    useEffect(() => {
        if(diskReadWriteRatioData.loading === false && !_.isEmpty(diskReadWriteRatioData.data)){
            if(diskReadWriteRatioData.data.data.length === 0){
                setCheckData(false);
            }
            else{
                setCheckData(true)
            }
        }
    }, [diskReadWriteRatioData])

    const DiskReadWriteRatioMetrics = createChartDataMapping(
        diskReadWriteRatioData.data.data || [],
        "stackedArea",
        "readWriteRatio"
    );
    const DiskReadWriteRatioTrends = createChartDataMapping(
        diskReadWriteRatioData.data.trend || [],
        "stackedArea",
        "readWriteRatioTrends"
    );

    return (
            <>  {diskReadWriteRatioData.loading &&
                <div className="chart_container">
                <div style={{display:"block",margin:"auto"}}>  
                   <GridLoader color="#366bd6"/>
                </div>
                <div style={{display:"block",margin:"auto"}}>  
                   <GridLoader color="#366bd6"/>
                </div>
           </div>
                }
                {!diskReadWriteRatioData.loading && !_.isEmpty(diskReadWriteRatioData.data) && (checkData) &&
                <div className="chart_container" style={{ pageBreakAfter: "always" }}>
                    {activeChartView.isMetricsChart && (
                        <ChartView
                        key={"readwriteratio"}
                        data={DiskReadWriteRatioMetrics}
                        title={"Read Write Ratio"}
                        yAxisTitle={"Utilization"}
                        xAxisDateFormat={DiskReadWriteRatioMetrics[0].xValueFormatString}
                        isVisible={activeChartView.isMetricsChart}
                        showTotal={false}
                        minimum = {0}
                      />
                    )}
                    {activeChartView.isTrendsChart && (
                        <ChartViewTrend
                        key={"readwriteratiotrends"}
                        data={DiskReadWriteRatioTrends}
                        title={"Read Write Ratio with Trends "}
                        yAxisTitle={"Utilization"}
                        isVisible={activeChartView.isTrendsChart}
                        xAxisDateFormat="MMM YYYY"
                        showTotal={false}
                        minimum = {0}
                      />
                    )}
                </div>
                }

            {!diskReadWriteRatioData.loading && (checkData === false)  && activeChartView.isMetricsChart && activeChartView.isTrendsChart &&
                <div className="chart_container">
                    <div className="chat_main1"> {/* noDataStyle  */}
                        <div style={{textAlign:'center'}}>
                            <h4>Disk Read Write Ratio</h4>
                            <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for Disk Read Write Ratio."/>
                        </div> 
                    </div>
                    <div className="chat_main1"> {/* noDataStyle  */}
                        <div style={{textAlign:'center'}}>
                            <h4>Disk Read Write Ratio</h4>
                            <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for Disk Read Write Ratio."/>
                        </div> 
                    </div>
                </div> 
                }

                {!diskReadWriteRatioData.loading && (checkData === false)  && activeChartView.isMetricsChart && (activeChartView.isTrendsChart === false) &&
                    <div className="chart_container">
                        <div className="chat_main1"> {/* noDataStyle  */}
                            <div style={{textAlign:'center'}}>
                                <h4>Disk Read Write Ratio</h4>
                                <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for Disk Read Write Ratio."/>
                            </div> 
                        </div>  
                   </div>
                }
                 {!diskReadWriteRatioData.loading && (checkData === false)  && (activeChartView.isMetricsChart === false) && (activeChartView.isTrendsChart) &&
                    <div className="chart_container">
                        <div className="chat_main1"> {/* noDataStyle  */}
                            <div style={{textAlign:'center'}}>
                                <h4>Disk Read Write Ratio</h4>
                                <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for Disk Read Write Ratio."/>
                            </div> 
                        </div>  
                   </div>
                }
            </>
    )
}

export default (DiskReadWriteRatioReport);