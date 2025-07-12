import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAsyncDiskSpaceUtilization, getDiskSpaceData } from "../../../../store/slices/charts/diskChartsSlice";
import useQueryData from "../../../../hooks/useQueryDataHistorical";
import {
    createChartDataMapping,
} from "../../../../helpers/commonHelper";
import ChartView from "../../common/ChartView";
import ChartViewTrend from "../../common/ChartViewTrend";
import * as _ from 'lodash';
import GridLoader from "react-spinners/GridLoader";

const DiskSpaceUtilizationPrint = ({ activeChartView }) => {
    const dispatch = useDispatch();
    const diskSpaceData = useSelector(getDiskSpaceData);
    const qd = useQueryData();
    const [checkData, setCheckData] = useState(false); //new

    useEffect(() => {
        dispatch(fetchAsyncDiskSpaceUtilization(qd));
    }, [dispatch])

    useEffect(() => {
        if (diskSpaceData.loading === false && !_.isEmpty(diskSpaceData.data)) {
            if (diskSpaceData.data.data.length === 0) {
                setCheckData(false);
            }
            else {
                setCheckData(true)
            }
        }
    }, [diskSpaceData])

    const DiskSpceUtilization = createChartDataMapping(
        diskSpaceData.data.data || [],
        "column",
        "diskSpaceUtilization"
    );
    const DiskSpaceUtilizationsTrends = createChartDataMapping(
        diskSpaceData.data.trend || [],
        "column",
        "diskSpaceUtilizationTrends"
    );

    return (
        <>  {diskSpaceData.loading &&
            <div className="chart_container">
                <div style={{ display: "block", margin: "auto" }}>
                   <GridLoader color="#366bd6"/>
                </div>
                <div style={{ display: "block", margin: "auto" }}>
                   <GridLoader color="#366bd6"/>
                </div>
            </div>
        }
            {!diskSpaceData.loading && !_.isEmpty(diskSpaceData.data) && (checkData) &&
                <div className="chart_container">
                    <table className="table tableAlign printTable">
                        <tbody>
                            <tr>
                                {activeChartView.isMetricsChart && (
                                    <ChartView
                                        key={"diskspaceutilization"}
                                        data={DiskSpceUtilization}
                                        title={"Disk Space Utilization"}
                                        yAxisTitle={"Utilization"}
                                        isVisible={activeChartView.isMetricsChart}
                                        minimum={0}
                                        showTotal={false}
                                    />
                                )}
                            </tr>
                            <tr>
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
                            </tr>
                        </tbody>
                    </table>
                </div>
            }

            {!diskSpaceData.loading && (checkData === false) && activeChartView.isMetricsChart && activeChartView.isTrendsChart &&
                <div className="chart_container">
                    <div className="chat_main1"> {/* noDataStyle  */}
                        <div style={{textAlign:'center'}}>
                            <h4>Disk Space Utilization</h4>
                            <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for Disk Space Utilization."/>
                    </div>
                    </div>
                    <div className="chat_main1">  {/* noDataStyle  */}
                        <div style={{textAlign:'center'}}>
                            <h4>Disk Space Utilization</h4>
                            <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for Disk Space Utilization."/>
                    </div>
                    </div>
                </div>
            }

            {!diskSpaceData.loading && (checkData === false) && activeChartView.isMetricsChart && (activeChartView.isTrendsChart === false) &&
                <div className="chart_container">
                    <div className="chat_main1"> {/* noDataStyle  */}
                        <div style={{textAlign:'center'}}>
                            <h4>Disk Space Utilization</h4>
                            <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for Disk Space Utilization."/>
                    </div>
                    </div>
                </div>
            }
            {!diskSpaceData.loading && (checkData === false) && (activeChartView.isMetricsChart === false) && (activeChartView.isTrendsChart) &&
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

export default (DiskSpaceUtilizationPrint);