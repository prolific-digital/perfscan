import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAsyncNumCores, getNumCoresData } from "../../../../store/slices/charts/cpuChartsSlice";
import useQueryData from "../../../../hooks/useQueryDataHistorical";
import {
    createChartDataMapping,
} from "../../../../helpers/commonHelper";
import ChartView from "../../common/ChartView";
import ChartViewTrend from "../../common/ChartViewTrend";
import * as _ from 'lodash';
import GridLoader from "react-spinners/GridLoader";

const NumCoresPrint = ({ activeChartView }) => {
    const dispatch = useDispatch();
    const numCoresData = useSelector(getNumCoresData);
    const qd = useQueryData();
    const [checkData, setCheckData] = useState(false); //new
    useEffect(() => {
        dispatch(fetchAsyncNumCores(qd));
    }, [dispatch])

    //new
    useEffect(() => {
        if (numCoresData.loading === false && !_.isEmpty(numCoresData.data)) {
            if (numCoresData.data.data.length === 0) {
                setCheckData(false);
            }
            else {
                setCheckData(true)
            }
        }
    }, [numCoresData])

    const NumCoresUtilization = createChartDataMapping(
        numCoresData.data.data || [],
        "stackedColumn",
        "noOfCores"
    );
    const NumCoresTrends = createChartDataMapping(
        numCoresData.data.trend || [],
        "stackedColumn",
        "noOfCores"
    );

    return (
        <>  {numCoresData.loading &&
            <div className="chart_container">
                <div style={{ display: "block", margin: "auto" }}>
                   <GridLoader color="#366bd6"/>
                </div>
                <div style={{ display: "block", margin: "auto" }}>
                   <GridLoader color="#366bd6"/>
                </div>
            </div>
        }
            {!numCoresData.loading && !_.isEmpty(numCoresData.data) && (checkData) &&
                <div className="chart_container">
                    <table className="table tableAlign printTable">
                        <tbody>
                            <tr>
                                {activeChartView.isMetricsChart && (
                                    <ChartView
                                        key={"noofcores"}
                                        data={NumCoresUtilization}
                                        title={"Number of Cores"}
                                        yAxisTitle={"Cores"}
                                        isVisible={activeChartView.isMetricsChart}
                                        showTotal={false}
                                        minimum={0}
                                    />
                                )}
                            </tr>
                            <tr>
                                {activeChartView.isTrendsChart && (
                                    <ChartViewTrend
                                        key={"noofcorestrends"}
                                        data={NumCoresTrends}
                                        title={"Number of Cores with Trends"}
                                        yAxisTitle={"Cores"}
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

            {/* NEW CHANGES */}

            {!numCoresData.loading && (checkData === false) && activeChartView.isMetricsChart && activeChartView.isTrendsChart &&
                <div className="chart_container">
                    <div className="chat_main1"> {/* noDataStyle  */}
                        <div style={{textAlign:'center'}}>
                            <h4>Num Cores</h4>
                            <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for Number of Cores."/>
                        </div>
                    </div>
                    <div className="chat_main1">  {/* noDataStyle  */}
                        <div style={{textAlign:'center'}}>
                            <h4>Num Cores</h4>
                            <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for Number of Cores."/>
                        </div>
                    </div>
                </div>
            }

            {!numCoresData.loading && (checkData === false) && activeChartView.isMetricsChart && (activeChartView.isTrendsChart === false) &&
                <div className="chart_container">
                    <div className="chat_main1"> {/* noDataStyle  */}
                        <div style={{textAlign:'center'}}>
                            <h4>Num Cores</h4>
                            <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for Number of Cores."/>
                        </div>
                    </div>
                </div>
            }
            {!numCoresData.loading && (checkData === false) && (activeChartView.isMetricsChart === false) && (activeChartView.isTrendsChart) &&
                <div className="chart_container">
                    <div className="chat_main1"> {/* noDataStyle  */}
                        <div style={{textAlign:'center'}}>
                            <h4>Num Cores</h4>
                            <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for Number of Cores."/>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default (NumCoresPrint);