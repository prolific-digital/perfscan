import React, { useEffect, useState, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    fetchAsyncWhatsChangedCPUUtilization, getWhatChangedCPUData,
    fetchAsyncWhatsChangedCPUMS, getWhatChangedCPUMsData,
    fetchAsyncWhatsChangedNumCores, getWhatsChangedNumCoresData
} from "../../../../store/slices/charts/cpuChartsSlice";
import {
    fetchAsyncDiskSpaceUtilizationWC, getDiskSpaceDataWC,
    fetchAsyncDiskArmUtilizationWC, getDiskArmDataWC,
    fetchAsyncDiskResponseWC, getDiskResponseDataWC,
    fetchAsyncDiskOperationsWC, getDiskOperationsDataWC,
    fetchAsyncReadWriteRatioWC, getDiskReadWriteDataWC,
    fetchAsyncCacheHitPercWC, getDiskCacheHitDataWC
} from "../../../../store/slices/charts/diskChartsSlice";
import {
    fetchAsyncMachinePoolFaulting, getMachinPoolFaultingData,
    fetchAsyncTotalFaultingRate, getTotalFaultingRateData,
    fetchAsyncTopPoolFaultingRate, getTopPoolFaultingData,
    fetchAsyncMemorySizeVsFaulting, getMemoryVsFaultingData,
    fetchAsyncSpecificPoolFaulting, getSpecificPoolFaultingData
} from "../../../../store/slices/charts/memoryChartsSlice";
import {
    fetchAsyncResponse5250, getResponse5250Data,
    fetchAsyncTotalTransaction, getTotalTransactionsData,
    fetchAsyncEthernetUtilization, getEthernetLineData
} from "../../../../store/slices/charts/otherChartsSlice";
import CanvasJSReact from "../../../../scripts/canvasjs.stock.react";
import WhatsChangedUtilizationChartReport from "../WhatsChangedChartMainPages/WhatsChangedUtilizationChartReport";

import useQueryData from '../../../../hooks/useQueryDataWhatsChanged';
import { createChartDataMapping } from "../../../../helpers/commonHelper";
import ContentLoader from "react-content-loader";
import * as _ from 'lodash';
import { fetchAsyncCPUMSReports, fetchAsyncCPUUtilizationReports, fetchAsyncNumCoresReports, 
    getCPUUtilDataReports,getCPUMsDataReports,getNumCoresDataReports } from "../../../../store/slices/reports/DataReportCharts/cpuReportChartsSlice";
import { fetchAsyncCacheHitPercReports, fetchAsyncDiskArmUtilizationReports, fetchAsyncDiskOperationsReports,
     fetchAsyncDiskResponseReports, fetchAsyncDiskSpaceUtilizationReports, fetchAsyncReadWriteRatioReports,
     getDiskArmDataReports,getDiskCacheHitDataReports,getDiskOperationsDataReports,
     getDiskReadWriteDataReports,getDiskResponseDataReports,getDiskSpaceDataReports } from "../../../../store/slices/reports/DataReportCharts/diskReportChartsSlice";
import { fetchAsyncMachinePoolFaultingReports, fetchAsyncMemorySizeVsFaultingReports, 
    fetchAsyncSpecificPoolFaultingReports, fetchAsyncTotalFaultingRateReports, 
    getMachinPoolFaultingDataReports,getMemoryVsFaultingDataReports,
    getSpecificPoolFaultingDataReports,getTopPoolFaultingDataReports,
    getTotalFaultingRateDataReports } from "../../../../store/slices/reports/DataReportCharts/memoryReportChartsSlice";
import { fetchAsyncEthernetUtilizationReports, fetchAsyncResponse5250Reports, 
    fetchAsyncTotalTransactionReports,getEthernetLineDataReports, 
    getResponse5250DataReports,getTotalTransactionsDataReports } from "../../../../store/slices/reports/DataReportCharts/otherReportChartsSlice";
import GridLoader from "react-spinners/GridLoader";


var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;

const MetricsUtilizationChartReport = ({queryReportData,reportId}) => {
    // debugger;
    const dispatch = useDispatch();
    const cpuData = useSelector(getCPUUtilDataReports);
    const cpuMsData = useSelector(getCPUMsDataReports);
    const numCoresData = useSelector(getNumCoresDataReports);
    const diskSpaceData = useSelector(getDiskSpaceDataReports);
    const diskArmData = useSelector(getDiskArmDataReports);
    const diskResponseData = useSelector(getDiskResponseDataReports);
    const diskOperationsData = useSelector(getDiskOperationsDataReports);
    const diskReadWriteData = useSelector(getDiskReadWriteDataReports);
    const diskCacheHitData = useSelector(getDiskCacheHitDataReports);

    const machinPoolFaultingData = useSelector(getMachinPoolFaultingDataReports);
    const totalFaultingRateData = useSelector(getTopPoolFaultingDataReports);
    const memoryVsFaultingData = useSelector(getMemoryVsFaultingDataReports);
    const specificPoolFaultingData = useSelector(getSpecificPoolFaultingDataReports);

    const response5250Data = useSelector(getResponse5250DataReports);
    const totalTransactionsData = useSelector(getTotalFaultingRateDataReports);
    const ethernetLineData = useSelector(getEthernetLineDataReports);
    const activeChartView = useSelector(state => state.charts.activeChartView);
    // const qd = useQueryData();
    useEffect(() => {
        dispatch(fetchAsyncCPUUtilizationReports(reportId));
        dispatch(fetchAsyncCPUMSReports(reportId));
        dispatch(fetchAsyncNumCoresReports(reportId));
        dispatch(fetchAsyncDiskSpaceUtilizationReports(reportId));
        dispatch(fetchAsyncDiskArmUtilizationReports(reportId));
        dispatch(fetchAsyncDiskResponseReports(reportId));
        dispatch(fetchAsyncDiskOperationsReports(reportId));
        dispatch(fetchAsyncReadWriteRatioReports(reportId));
        dispatch(fetchAsyncCacheHitPercReports(reportId));

        dispatch(fetchAsyncMachinePoolFaultingReports(reportId));
        dispatch(fetchAsyncTotalFaultingRateReports(reportId));
        dispatch(fetchAsyncMemorySizeVsFaultingReports(reportId));
        dispatch(fetchAsyncSpecificPoolFaultingReports(reportId));

        dispatch(fetchAsyncResponse5250Reports(reportId));
        dispatch(fetchAsyncTotalTransactionReports(reportId));
        dispatch(fetchAsyncEthernetUtilizationReports(reportId));
    }, [dispatch])

    const CPUUtilizationData = createChartDataMapping(
        cpuData.data.data || [],
        "stackedColumn",
        "cpuUtilization"
    );


    const CPUMsUtilization = createChartDataMapping(
        cpuMsData.data.data || [],
        "stackedColumn",
        "CPUMsUtilization"
    );

    const NumCoresUtilizationData = createChartDataMapping(
        numCoresData.data.data || [],
        "stackedColumn",
        "noOfCores"
    );

    const DiskSpaceUtilizationData = createChartDataMapping(
        diskSpaceData.data.data || [],
        "stackedColumn",
        "diskSpaceUtilization"
    )

    const DiskArmUtilizationData = createChartDataMapping(
        diskArmData.data.data || [],
        "stackedColumn",
        "diskArmUtilization"
    );

    const DiskResponseTimeData = createChartDataMapping(
        diskResponseData.data.data || [],
        "stackedColumn",
        "diskResponse"
    );

    const DiskOperationsData = createChartDataMapping(
        diskOperationsData.data.data || [],
        "stackedColumn",
        "diskOperations"
    );


    const DiskReadWriteData = createChartDataMapping(
        diskReadWriteData.data.data || [],
        "stackedColumn",
        "readWriteRatio"
    );

    const DiskCacheHitData = createChartDataMapping(
        diskCacheHitData.data.data || [],
        "stackedColumn",
        "cacheHitPercentage"
    );

    const MachinPoolFaultingData = createChartDataMapping(
        machinPoolFaultingData.data.data || [],
        "stackedColumn",
        "machinePoolFaulting"
    );

    const TotalFaultingRateData = createChartDataMapping(
        totalFaultingRateData.data.data || [],
        "stackedColumn",
        "totalFaultingRate"
    );

    const Response5250Data = createChartDataMapping(
        response5250Data.data.data || [],
        "stackedColumn",
        "responseTime5250"
    );

    const TotalTransactionsData = createChartDataMapping(
        totalTransactionsData.data.data || [],
        "stackedColumn",
        "totalTransactions"
    );

    const EthernetLineData = createChartDataMapping(
        ethernetLineData.data.data || [],
        "stackedColumn",
        "ethernetLineUtilization"
    );

    return (
        <>  {cpuData.loading &&
            <div className="chart_container_wc">
                <div style={{ display: "block", margin: "auto" }}>
                    <GridLoader color="#366bd6"/>
                </div>
                <div style={{ display: "block", margin: "auto" }}>
                    <GridLoader color="#366bd6"/>
                </div>
            </div>
        }
            {!cpuData.loading && !_.isEmpty(cpuData.data) &&
                <div className="chart_container_wc">
                    {activeChartView.isMetricsChart && (
                        <WhatsChangedUtilizationChartReport
                            key={"utilization"}
                            cpudata={CPUUtilizationData}
                            cpumsdata={CPUMsUtilization}
                            numcoresdata={NumCoresUtilizationData}
                            diskspacedata={DiskSpaceUtilizationData}
                            diskarmdata={DiskArmUtilizationData}
                            diskresponsedata={DiskResponseTimeData}
                            diskoperationsdata={DiskOperationsData}
                            diskreadwritedata={DiskReadWriteData}
                            diskcachehitdata={DiskCacheHitData}
                            machinpoolfaultingdata={MachinPoolFaultingData}
                            totalfaultingratedata={TotalFaultingRateData}
                            response5250data={Response5250Data}
                            totaltransactionsdata={TotalTransactionsData}
                            ethernetlinedata={EthernetLineData}
                            isVisible={activeChartView.isMetricsChart}
                            maximum={10}
                            minimum={0}
                            height={2000}
                            showTotal={false}
                            minDate={queryReportData.sdate}
                            maxDate={queryReportData.edate}
                        />
                    )}
                </div>
            }
        </>
    )
}

export default MetricsUtilizationChartReport
