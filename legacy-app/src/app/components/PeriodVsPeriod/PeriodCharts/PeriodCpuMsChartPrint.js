import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAsyncPeriodCPUMS, getCPUMsChartData } from "../../../../store/slices/periodVsPeriodCharts/periodCharts/periodCPUChartsSlice";
import usePeriodQueryData from "../../../../hooks/usePeriodQueryData";
import * as _ from 'lodash';
import ChartView from "../../common/ChartView";
import moment from "moment";
import { findMinMax, getRound } from "../../../../helpers/commonHelper";
import GridLoader from "react-spinners/GridLoader";
import {
    createChartDataMapping,
} from "../../../../helpers/commonHelper";

const PeriodCpuMsChartPrint = (syncHandler) => {
    const dispatch = useDispatch();
    const cpuMsData = useSelector(getCPUMsChartData);
    const filters = useSelector(state => state.filters);
    const pFilter = filters.period_filter; //dates

    let period1 = "";
    let period2 = "";
    let max = "";
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
        dispatch(fetchAsyncPeriodCPUMS(pqd));
    }, [dispatch])

    const cpuMs1 = createChartDataMapping(
        cpuMsData.data[0]?.data || [],
        "stackedColumn",
        "CPUMsUtilization"
    );
    const cpuMs2 = createChartDataMapping(
        cpuMsData.data[1]?.data || [],
        "stackedColumn",
        "CPUMsUtilization"
    );

    if (!_.isEmpty(cpuMsData.data[0]?.data) && !_.isEmpty(cpuMsData.data[1]?.data)) {
        const min_max_1_dp1 = findMinMax(cpuMs1[0].dataPoints)
        const min_max_2_dp1 = findMinMax(cpuMs2[0].dataPoints)
        const min_max_1 = min_max_1_dp1[1];
        const min_max_2 = min_max_2_dp1[1];
        max = _.round(_.max([getRound(min_max_1), getRound(min_max_2)]), 2);
    }

    if(!_.isEmpty(cpuMsData.data[0]?.data) && _.isEmpty(cpuMsData.data[1]?.data)){
        const min_max_1_dp1 = findMinMax(cpuMs1[0].dataPoints) 
        const min_max_1 = min_max_1_dp1[1];
        max = _.round(_.max(getRound(min_max_1)));
    }

    if(_.isEmpty(cpuMsData.data[0]?.data) && !_.isEmpty(cpuMsData.data[1]?.data)){
        const min_max_2_dp1 = findMinMax(cpuMs2[0].dataPoints) 
        const min_max_2 = min_max_2_dp1[1];
        max = _.round(_.max(getRound(min_max_2)));
    }

    return (
        <>
            {cpuMsData.loading &&
                <div className="chart_container">
                    <div style={{ display: "block", margin: "auto" }}>
                        <GridLoader color="#366bd6"/>
                    </div>
                    <div style={{ display: "block", margin: "auto" }}>
                        <GridLoader color="#366bd6"/>
                    </div>
                </div>
            }
            {!cpuMsData.loading && !_.isEmpty(cpuMsData.data) &&
                <>
                    <div className="chart_container">
                        <table className="table tableAlign printTable">
                            <tbody>
                                <tr>
                                    {!_.isEmpty(cpuMsData.data[0].data) &&
                                        <ChartView
                                            key={"cpuutilization"}
                                            data={cpuMs1}
                                            title={cpuMsData.data[0].params.server}
                                            title2={`Total CPU ms used`}
                                            subtitle={period1}
                                            yAxisTitle={"ms"}
                                            xAxisDateFormat={cpuMs1[0].xValueFormatString}
                                            isVisible={true} 
                                            showTotal={true}
                                            minimum={0}
                                            maximum={max}
                                        />
                                    }
                                    {_.isEmpty(cpuMsData.data[0].data) &&
                                        <div className="chat_main1">
                                            <div style={{textAlign:'center'}}>
                                                <h4>CPUMs</h4>
                                                <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for CPUMS data."/>
                                            </div>
                                        </div>
                                    }
                                </tr>
                                <tr>
                                    {!_.isEmpty(cpuMsData.data[1].data) &&
                                        <ChartView
                                            key={"cpuutilizationtrends"}
                                            data={cpuMs2}
                                            title={cpuMsData.data[1].params.server}
                                            title2={`Total CPU ms used`}
                                            subtitle={period2}
                                            yAxisTitle={"ms"}
                                            xAxisDateFormat={cpuMs2[0].xValueFormatString}
                                            isVisible={true}
                                            showTotal={true}
                                            minimum={0}
                                            maximum={max}
                                        />
                                    }
                                    {_.isEmpty(cpuMsData.data[1].data) &&
                                        <div className="chat_main1">
                                            <div style={{textAlign:'center'}}>
                                                <h4>CPUMs</h4>
                                                <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for CPUMS data."/>
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

export default PeriodCpuMsChartPrint;