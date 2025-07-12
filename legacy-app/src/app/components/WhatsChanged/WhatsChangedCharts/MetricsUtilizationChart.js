import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    fetchAsyncWhatsChangedCPUUtilization, getWhatChangedCPUData,
    fetchAsyncWhatsChangedCPUMS, getWhatChangedCPUMsData,
    fetchAsyncWhatsChangedNumCores, getWhatsChangedNumCoresData,
    fetchAsyncWhatsChangedCPW, getWhatChangedCPWData
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
import WhatsChangedUtilizationChart from "../WhatsChangedChartMainPages/WhatsChangedUtilizationChart";
import useQueryData from '../../../../hooks/useQueryDataWhatsChanged';
import { createChartDataMapping } from "../../../../helpers/commonHelper";
import * as _ from 'lodash';
import GridLoader from "react-spinners/GridLoader";
import { getUuidData } from "../../../../store/slices/reports/SaveNewReport/SaveNewReport";

const MetricsUtilizationChart = () => {
    const dispatch = useDispatch();
    const cpuData = useSelector(getWhatChangedCPUData);
    const cpuMsData = useSelector(getWhatChangedCPUMsData);
    const numCoresData = useSelector(getWhatsChangedNumCoresData);
    const cpwData = useSelector(getWhatChangedCPWData)
    const diskSpaceData = useSelector(getDiskSpaceDataWC);
    const diskArmData = useSelector(getDiskArmDataWC);
    const diskResponseData = useSelector(getDiskResponseDataWC);
    const diskOperationsData = useSelector(getDiskOperationsDataWC);
    const diskReadWriteData = useSelector(getDiskReadWriteDataWC);
    const diskCacheHitData = useSelector(getDiskCacheHitDataWC);

    const machinPoolFaultingData = useSelector(getMachinPoolFaultingData);
    const totalFaultingRateData = useSelector(getTotalFaultingRateData);
    const topPoolFaultingData = useSelector(getTopPoolFaultingData);

    const response5250Data = useSelector(getResponse5250Data);
    const totalTransactionsData = useSelector(getTotalTransactionsData);
    const ethernetLineData = useSelector(getEthernetLineData);
    const activeChartView = useSelector(state => state.charts.activeChartView);
    const qd = useQueryData();
    const uuid = useSelector(getUuidData);

    useEffect(() => {
    if(!uuid?.loading && uuid.data.uniqueid){
        dispatch(fetchAsyncWhatsChangedCPUUtilization(qd));
        dispatch(fetchAsyncWhatsChangedCPUMS(qd));
        dispatch(fetchAsyncWhatsChangedNumCores(qd));
        // dispatch(fetchAsyncWhatsChangedCPW(qd))
        dispatch(fetchAsyncDiskSpaceUtilizationWC(qd));
        dispatch(fetchAsyncDiskArmUtilizationWC(qd));
        dispatch(fetchAsyncDiskResponseWC(qd));
        dispatch(fetchAsyncDiskOperationsWC(qd));
        dispatch(fetchAsyncReadWriteRatioWC(qd));
        dispatch(fetchAsyncCacheHitPercWC(qd));

        dispatch(fetchAsyncMachinePoolFaulting(qd));
        dispatch(fetchAsyncTotalFaultingRate(qd));
        dispatch(fetchAsyncTopPoolFaultingRate(qd));
        dispatch(fetchAsyncMemorySizeVsFaulting(qd));
        dispatch(fetchAsyncSpecificPoolFaulting(qd));

        dispatch(fetchAsyncResponse5250(qd));
        dispatch(fetchAsyncTotalTransaction(qd));
        dispatch(fetchAsyncEthernetUtilization(qd));
    }
    }, [dispatch, uuid])

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

    // const CPWUtilizationData = createChartDataMapping(
    //     cpwData.data.data || [],
    //     "stackedColumn",
    //     "cpuUtilization"
    // );

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

    const TopPoolFaultingData = createChartDataMapping(
        topPoolFaultingData.data.data || [],
        "stackedColumn",
        "topPoolFaultingRate"
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
                        <WhatsChangedUtilizationChart
                            key={"utilization"}
                            cpudata={CPUUtilizationData}
                            cpumsdata={CPUMsUtilization}
                            numcoresdata={NumCoresUtilizationData}
                            // cpwdata={CPWUtilizationData}
                            diskspacedata={DiskSpaceUtilizationData}
                            diskarmdata={DiskArmUtilizationData}
                            diskresponsedata={DiskResponseTimeData}
                            diskoperationsdata={DiskOperationsData}
                            diskreadwritedata={DiskReadWriteData}
                            diskcachehitdata={DiskCacheHitData}
                            machinpoolfaultingdata={MachinPoolFaultingData}
                            totalfaultingratedata={TotalFaultingRateData}
                            topPoolFaultingData={TopPoolFaultingData}
                            response5250data={Response5250Data}
                            totaltransactionsdata={TotalTransactionsData}
                            ethernetlinedata={EthernetLineData}
                            isVisible={activeChartView.isMetricsChart}
                            maximum={10}
                            minimum={0}
                            height={4500}
                            showTotal={false}
                            minDate={qd.sdate}
                            maxDate={qd.edate}
                        />
                    )}
                </div>
            }
        </>
    )
}

export default MetricsUtilizationChart
