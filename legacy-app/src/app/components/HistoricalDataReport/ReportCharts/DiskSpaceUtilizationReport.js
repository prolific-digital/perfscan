import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAsyncDiskSpaceUtilizationReports, getDiskSpaceDataReports} from "../../../../store/slices/reports/DataReportCharts/diskReportChartsSlice";
import {
    createChartDataMapping,
  } from "../../../../helpers/commonHelper";
import ChartView from "../../common/ChartView";
import ChartViewTrend from "../../common/ChartViewTrend";
import * as _ from 'lodash';
import GridLoader from "react-spinners/GridLoader";

const DiskSpaceUtilizationReport = ({activeChartView,reportId}) => {
    const dispatch = useDispatch();
    const diskSpaceData = useSelector(getDiskSpaceDataReports);
    const [checkData, setCheckData] = useState(false); //new

    useEffect(() => {
        dispatch(fetchAsyncDiskSpaceUtilizationReports(reportId));
    }, [dispatch])

    useEffect(() => {
        if(diskSpaceData.loading === false && !_.isEmpty(diskSpaceData.data)){
            if(diskSpaceData.data.data.length === 0){
                setCheckData(false);
            }
            else{
                setCheckData(true)
            }
        }
    }, [diskSpaceData])

    const DiskSpceUtilization = createChartDataMapping(
        diskSpaceData.data.data || [],
        "stackedArea",
        "diskSpaceUtilization"
    );
    const DiskSpaceUtilizationsTrends = createChartDataMapping(
        diskSpaceData.data.trend || [],
        "stackedArea",
        "diskSpaceUtilizationTrends"
    );

    return (
            <>  {diskSpaceData.loading &&
                <div className="chart_container">
                <div style={{display:"block",margin:"auto"}}>  
                   <GridLoader color="#366bd6"/>
                </div>
                <div style={{display:"block",margin:"auto"}}>  
                   <GridLoader color="#366bd6"/>
                </div>
           </div>
                }
                {!diskSpaceData.loading && !_.isEmpty(diskSpaceData.data) && (checkData) &&
                <div className="chart_container" style={{ pageBreakAfter: "always" }}>
                    {activeChartView.isMetricsChart && (
                        <ChartView
                        key={"diskspaceutilization"}
                        data={DiskSpceUtilization}
                        title={"Disk Space Utilization"}
                        yAxisTitle={"Utilization"}
                        xAxisDateFormat={DiskSpceUtilization[0].xValueFormatString}
                        isVisible={activeChartView.isMetricsChart}
                        minimum={0}
                        showTotal={false}
                      />
                    )}
                    {activeChartView.isTrendsChart && (
                        <ChartViewTrend
                        key={"diskspaceutilizationtrends"}
                        data={DiskSpaceUtilizationsTrends}
                        title={"Disk Space Utilization with Trends"}
                        yAxisTitle={"Utilization"}
                        isVisible={activeChartView.isTrendsChart}
                        xAxisDateFormat="MMM YYYY"
                        showTotal={false}
                        minimum={0}
                      />
                    )}
                </div>
                }

                {!diskSpaceData.loading && (checkData === false)  && activeChartView.isMetricsChart && activeChartView.isTrendsChart &&
                <div className="chart_container">
                    <div className="chat_main1"> {/* noDataStyle  */}
                        <div style={{textAlign:'center'}}>
                            <h4>Disk Space Utilization</h4>
                            <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for Disk Space Utilization."/>
                        </div> 
                    </div>
                    <div className="chat_main1"> {/* noDataStyle  */}
                        <div style={{textAlign:'center'}}>
                            <h4>Disk Space Utilization</h4>
                            <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for Disk Space Utilization."/>
                        </div> 
                    </div>
                </div> 
                }

                {!diskSpaceData.loading && (checkData === false)  && activeChartView.isMetricsChart && (activeChartView.isTrendsChart === false) &&
                    <div className="chart_container">
                        <div className="chat_main1"> {/* noDataStyle  */}
                            <div style={{textAlign:'center'}}>
                                <h4>Disk Space Utilization</h4>
                                <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for Disk Space Utilization."/>
                            </div> 
                        </div>  
                   </div>
                }
                 {!diskSpaceData.loading && (checkData === false)  && (activeChartView.isMetricsChart === false) && (activeChartView.isTrendsChart) &&
                    <div className="chart_container">
                        <div className="chat_main1"> {/* noDataStyle  */}
                            <div style={{textAlign:'center'}}>
                                <h4>Disk Space Utilization</h4>
                                <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for Disk Space Utilization."/>
                            </div> 
                        </div>  
                   </div>
                }
            </>
    )
}

export default (DiskSpaceUtilizationReport);