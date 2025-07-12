import React from "react";
import { useSelector } from "react-redux";

import { getBusyDays } from "../../../../store/slices/capacityplanning/CapacityPlanningSlice"
import ChartViewBusyDays from "../../../components/common/ChartViewBusyDays"
import {createChartDataMapping} from "../../../../helpers/commonHelper";

const BusyDayChart = (props) => {
    const {bdate} = props;
    const busyDays = useSelector(getBusyDays);

    const cpuUtilization = createChartDataMapping(
        busyDays.data.graph[bdate] || [],
        "stackedArea",
        "cpuUtilization"
    );

    return <ChartViewBusyDays
    data={cpuUtilization}
    title={"CPU Utilization"}
    yAxisTitle={"Utilization"}
    //xAxisDateFormat={CPUMsUtilization[0].xValueFormatString}
    isVisible={true}
    showTotal={false}
    minimum={0}
    maximum={40} />
}

export default BusyDayChart