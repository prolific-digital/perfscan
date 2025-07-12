
import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAsyncPeriodReadWriteRatio, getPeriodDiskReadWriteData } from "../../../../store/slices/periodVsPeriodCharts/periodCharts/periodDiskChartSlice";
import usePeriodQueryData from "../../../../hooks/usePeriodQueryData";
import * as _ from 'lodash';
import moment from "moment";
import { findMinMax, getRound } from "../../../../helpers/commonHelper";
import {
    createChartDataMapping
} from "../../../../helpers/commonHelper";
import ChartView from "../../common/ChartView";
import GridLoader from "react-spinners/GridLoader";


const PeriodDiskReadWriteChartPrint = (syncHandler) => {
    const dispatch = useDispatch();
    const diskReadWriteData = useSelector(getPeriodDiskReadWriteData);
    const filters = useSelector(state => state.filters);
    const pFilter = filters.period_filter; //dates
    let period1 = "";
    let period2 = "";
    let max = 100;
    // Show only start date if both start and end date are same
    const period1_sdate = moment(pFilter[0].sdate).unix()
    const period1_edate = moment(pFilter[0].edate).unix()
    if (period1_sdate === period1_edate) {
        period1 = moment(pFilter[0].sdate).format("MMM Do YYYY")
    } else {
        period1 = moment(pFilter[0].sdate).format("MMM Do YYYY") + ' - ' + moment(pFilter[0].edate).format("MMM Do YYYY");
    }
    // Show only start date if both start and end date are same
    const period2_sdate = moment(pFilter[1].sdate).unix();
    const period2_edate = moment(pFilter[1].edate).unix();
    if (period2_sdate === period2_edate) {
        period2 = moment(pFilter[1].sdate).format("MMM Do YYYY")
    } else {
        period2 = moment(pFilter[1].sdate).format("MMM Do YYYY") + ' - ' + moment(pFilter[1].edate).format("MMM Do YYYY");
    }
    const pqd = usePeriodQueryData();

    useEffect(() => {
        dispatch(fetchAsyncPeriodReadWriteRatio(pqd));
    }, [dispatch])

    const diskReadWriteData1 = createChartDataMapping(
        diskReadWriteData.data[0]?.data || [],
        "stackedColumn",
        "readWriteRatio"
    );
    const diskReadWriteData2 = createChartDataMapping(
        diskReadWriteData.data[1]?.data || [],
        "stackedColumn",
        "readWriteRatio"
    );

    if (!_.isEmpty(diskReadWriteData.data[0]?.data) && !_.isEmpty(diskReadWriteData.data[1]?.data)) {
        const min_max_1_dp1 = findMinMax(diskReadWriteData1[0].dataPoints)
        const min_max_2_dp1 = findMinMax(diskReadWriteData2[0].dataPoints)
        const min_max_1 = min_max_1_dp1[1];
        const min_max_2 = min_max_2_dp1[1];
        max = _.round(_.max([getRound(min_max_1), getRound(min_max_2)]), 2);
    }

    if(!_.isEmpty(diskReadWriteData.data[0]?.data) && _.isEmpty(diskReadWriteData.data[1]?.data)){
        const min_max_1_dp1 = findMinMax(diskReadWriteData1[0].dataPoints) 
        const min_max_1 = min_max_1_dp1[1];
        max = _.round(_.max(getRound(min_max_1)));
    }

    if(_.isEmpty(diskReadWriteData.data[0]?.data) && !_.isEmpty(diskReadWriteData.data[1]?.data)){
        const min_max_2_dp1 = findMinMax(diskReadWriteData2[0].dataPoints) 
        const min_max_2 = min_max_2_dp1[1];
        max = _.round(_.max(getRound(min_max_2)));
    }

    return (
        <>  {diskReadWriteData.loading &&
            <div className="chart_container">
                <div style={{ display: "block", margin: "auto" }}>
                    <GridLoader color="#366bd6"/>
                    
                </div>
                <div style={{ display: "block", margin: "auto" }}>
                    <GridLoader color="#366bd6"/>
                    
                </div>
            </div>
        }
            {!diskReadWriteData.loading && !_.isEmpty(diskReadWriteData.data) &&
                <>
                    <div className="chart_container">
                        <table className="table tableAlign printTable">
                            <tbody>
                                <tr>
                                    {!_.isEmpty(diskReadWriteData.data[0].data) &&
                                        <ChartView
                                            key={"cpuutilization"}
                                            data={diskReadWriteData1}
                                            title2={`Read Write Ratio`}
                                            title={diskReadWriteData.data[0].params.server}
                                            subtitle={period1}
                                            yAxisTitle={"Ratio"}
                                            xAxisDateFormat={diskReadWriteData1[0].xValueFormatString}
                                            isVisible={true} 
                                            showTotal={true}
                                            minimum={0}
                                            maximum={max}
                                        />
                                    }
                                    {_.isEmpty(diskReadWriteData.data[0].data) &&
                                        <div className="chat_main1"> {/* noDataStyle  */}
                                            <div style={{textAlign:'center'}}>
                                                <h4>Disk Read Write Ratio</h4>
                                                <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for Disk Read Write Ratio."/>
                                            </div> 
                                        </div>
                                    }
                                </tr>
                                <tr>
                                    {!_.isEmpty(diskReadWriteData.data[1].data) &&

                                        <ChartView
                                            key={"cpuutilizationtrends"}
                                            data={diskReadWriteData2}
                                            title2={`Read Write Ratio`}
                                            title={diskReadWriteData.data[1].params.server}
                                            subtitle={period2}
                                            yAxisTitle={"Ratio"}
                                            xAxisDateFormat={diskReadWriteData2[0].xValueFormatString}
                                            isVisible={true}
                                            showTotal={true}
                                            minimum={0}
                                            maximum={max}
                                        />
                                    }
                                    {_.isEmpty(diskReadWriteData.data[1].data) &&
                                        <div className="chat_main1"> {/* noDataStyle  */}
                                            <div style={{textAlign:'center'}}>
                                                <h4>Disk Read Write Ratio</h4>
                                                <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for Disk Read Write Ratio."/>
                                            </div> 
                                        </div>
                                    }
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </>
            }
        </>
    )
}

export default PeriodDiskReadWriteChartPrint;