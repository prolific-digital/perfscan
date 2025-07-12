import React, { useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAsyncDiskOperationsReports , getDiskOperationsDataReports } from "../../../../store/slices/reports/DataReportCharts/diskReportChartsSlice";
import {
    createChartDataMapping,
  } from "../../../../helpers/commonHelper";
import ChartView from "../../common/ChartView";
import ChartViewTrend from "../../common/ChartViewTrend";
import * as _ from 'lodash';
import GridLoader from "react-spinners/GridLoader";

const DiskOperationsReport = ({activeChartView,reportId}) => {
    const dispatch = useDispatch();
    const diskOperationsData = useSelector(getDiskOperationsDataReports);
    const [checkData, setCheckData] = useState(false); //new

    useEffect(() => {
        dispatch(fetchAsyncDiskOperationsReports(reportId));
    }, [dispatch])

    useEffect(() => {
        if(diskOperationsData.loading === false && !_.isEmpty(diskOperationsData.data)){
            if(diskOperationsData.data.data.length === 0){
                setCheckData(false);
            }
            else{
                setCheckData(true)
            }
        }
    }, [diskOperationsData])

    const DiskOperationsMetrics = createChartDataMapping(
        diskOperationsData.data.data || [],
        "stackedArea",
        "diskOperations"
    );
    const DiskOperationsTrends = createChartDataMapping(
        diskOperationsData.data.trend || [],
        "stackedArea",
        "diskOperationsTrends"
    );

    return (
            <>  {diskOperationsData.loading &&
                <div className="chart_container">
                <div style={{display:"block",margin:"auto"}}>  
                   <GridLoader color="#366bd6"/>
                </div>
                <div style={{display:"block",margin:"auto"}}>  
                   <GridLoader color="#366bd6"/>
                </div>
           </div>
                }
                {!diskOperationsData.loading && !_.isEmpty(diskOperationsData.data) && (checkData) &&
                <div className="chart_container" style={{ pageBreakAfter: "always" }}>
                    {activeChartView.isMetricsChart && (
                        <ChartView
                        key={"diskoperations"}
                        data={DiskOperationsMetrics}
                        title={"Total Disk Operations"}
                        yAxisTitle={"OPS / Sec"}
                        xAxisDateFormat={DiskOperationsMetrics[0].xValueFormatString}
                        isVisible={activeChartView.isMetricsChart}
                        showTotal={true}
                        minimum = {0}
                      />
                    )}
                    {activeChartView.isTrendsChart && (
                        <ChartViewTrend
                        key={"disksoperationstrends"}
                        data={DiskOperationsTrends}
                        title={"Total Disk Operations with Trends "}
                        yAxisTitle={"OPS / Sec"}
                        isVisible={activeChartView.isTrendsChart}
                        xAxisDateFormat="MMM YYYY"
                        showTotal={false}
                        minimum = {0}
                      />
                    )}
                </div>
                }

                {!diskOperationsData.loading && (checkData === false)  && activeChartView.isMetricsChart && activeChartView.isTrendsChart &&
                <div className="chart_container">
                <div className="chat_main1"> {/* noDataStyle  */}
                    <div style={{textAlign:'center'}}>
                        <h4>Disk Operations</h4>
                        <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for Disk Operations."/>
                    </div> 
                </div>
                <div className="chat_main1"> {/* noDataStyle  */}
                    <div style={{textAlign:'center'}}>
                        <h4>Disk Operations</h4>
                        <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for Disk Operations."/>
                    </div> 
                </div>
                </div> 
                }

                {!diskOperationsData.loading && (checkData === false)  && activeChartView.isMetricsChart && (activeChartView.isTrendsChart === false) &&
                    <div className="chart_container">
                    <div className="chat_main1"> {/* noDataStyle  */}
                        <div style={{textAlign:'center'}}>
                            <h4>Disk Operations</h4>
                            <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for Disk Operations."/>
                        </div> 
                    </div>  
                   </div>
                }
                 {!diskOperationsData.loading && (checkData === false)  && (activeChartView.isMetricsChart === false) && (activeChartView.isTrendsChart) &&
                    <div className="chart_container">
                    <div className="chat_main1"> {/* noDataStyle  */}
                        <div style={{textAlign:'center'}}>
                            <h4>Disk Operations</h4>
                            <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for Disk Operations."/>
                        </div> 
                    </div>  
                   </div>
                }
            </>
    )
}

export default DiskOperationsReport;