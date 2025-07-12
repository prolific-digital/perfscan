import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAsyncReadWriteRatio, getDiskReadWriteData } from "../../../../store/slices/charts/diskChartsSlice";
import useQueryData from "../../../../hooks/useQueryDataHistorical";
import {
    createChartDataMapping,
} from "../../../../helpers/commonHelper";
import ChartView from "../../common/ChartView";
import ChartViewTrend from "../../common/ChartViewTrend";
import * as _ from 'lodash';
import GridLoader from "react-spinners/GridLoader";

const DiskReadWriteRatioPrint = ({ activeChartView }) => {
    const dispatch = useDispatch();
    const diskReadWriteRatioData = useSelector(getDiskReadWriteData);
    const qd = useQueryData();
    const [checkData, setCheckData] = useState(false); //new

    useEffect(() => {
        dispatch(fetchAsyncReadWriteRatio(qd));
    }, [dispatch])

    useEffect(() => {
        if (diskReadWriteRatioData.loading === false && !_.isEmpty(diskReadWriteRatioData.data)) {
            if (diskReadWriteRatioData.data.data.length === 0) {
                setCheckData(false);
            }
            else {
                setCheckData(true)
            }
        }
    }, [diskReadWriteRatioData])

    const DiskReadWriteRatioMetrics = createChartDataMapping(
        diskReadWriteRatioData.data.data || [],
        "stackedColumn",
        "readWriteRatio"
    );
    const DiskReadWriteRatioTrends = createChartDataMapping(
        diskReadWriteRatioData.data.trend || [],
        "stackedColumn",
        "readWriteRatioTrends"
    );

    return (
        <>  {diskReadWriteRatioData.loading &&
            <div className="chart_container">
                <div style={{ display: "block", margin: "auto" }}>
                   <GridLoader color="#366bd6"/>
                </div>
                <div style={{ display: "block", margin: "auto" }}>
                   <GridLoader color="#366bd6"/>
                </div>
            </div>
        }
            {!diskReadWriteRatioData.loading && !_.isEmpty(diskReadWriteRatioData.data) && (checkData) &&
                <div className="chart_container">
                    <table className="table tableAlign printTable">
                        <tbody>
                            <tr>
                                {activeChartView.isMetricsChart && (
                                    <ChartView
                                        key={"readwriteratio"}
                                        data={DiskReadWriteRatioMetrics}
                                        title={"Read Write Ratio"}
                                        yAxisTitle={"Utilization"}
                                        isVisible={activeChartView.isMetricsChart}
                                        showTotal={false}
                                        minimum={0}
                                    />
                                )}
                            </tr>
                            <tr>
                                {activeChartView.isTrendsChart && (
                                    <ChartViewTrend
                                        key={"readwriteratiotrends"}
                                        data={DiskReadWriteRatioTrends}
                                        title={"Read Write Ratio with Trends "}
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

            {!diskReadWriteRatioData.loading && (checkData === false) && activeChartView.isMetricsChart && activeChartView.isTrendsChart &&
                <div className="chart_container">
                    <div className="chat_main1"> {/* noDataStyle  */}
                        <div style={{textAlign:'center'}}>
                            <h4>Disk Read Write Ratio</h4>
                            <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for Disk Read Write Ratio."/>
                    </div>
                    </div>
                    <div className="chat_main1">  {/* noDataStyle  */}
                        <div style={{textAlign:'center'}}>
                            <h4>Disk Read Write Ratio</h4>
                            <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for Disk Read Write Ratio."/>
                    </div>
                    </div>
                </div>
            }

            {!diskReadWriteRatioData.loading && (checkData === false) && activeChartView.isMetricsChart && (activeChartView.isTrendsChart === false) &&
                <div className="chart_container">
                    <div className="chat_main1"> {/* noDataStyle  */}
                        <div style={{textAlign:'center'}}>
                            <h4>Disk Read Write Ratio</h4>
                            <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for Disk Read Write Ratio."/>
                    </div>
                    </div>
                </div>
            }
            {!diskReadWriteRatioData.loading && (checkData === false) && (activeChartView.isMetricsChart === false) && (activeChartView.isTrendsChart) &&
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

export default (DiskReadWriteRatioPrint);