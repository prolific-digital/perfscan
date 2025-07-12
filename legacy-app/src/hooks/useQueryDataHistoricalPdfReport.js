import { useSelector } from "react-redux";
import { getParametersFromLocalStorage } from "../helpers/commonHelper";
import { getUuidData } from "../store/slices/reports/SaveNewReport/SaveNewReport";
import { getChartList } from "../store/slices/charts/chartsSlice";

const useQueryDataHistoricalPdfReport = () => {
    const filters = useSelector(state => state.filters)  
    const uuid = useSelector(getUuidData);
    const userId = getParametersFromLocalStorage("userID");
    const chartFlag =useSelector(getChartList)

    const queryData = {
        ...(filters.historical_date_filter.sdate && { sdate1: filters.historical_date_filter.sdate }),
        ...(filters.historical_date_filter.edate && { edate1: filters.historical_date_filter.edate }),
        ...(filters.historical_date_filter.stime && { stime1: filters.historical_date_filter.stime }),
        ...(filters.historical_date_filter.etime && { etime1: filters.historical_date_filter.etime }),
        ...(filters.system_filter && { sysid: filters.system_filter.id }),
        userId:userId,
        ...(filters.system_filter && {sysname: filters.system_filter.entity_name}),
        rptType:'historical data',
        ...(filters.historical_save_filter.filename && {fileName: filters.historical_save_filter.filename}),
        ...(filters.historical_save_filter.saveReport && {saveReport: filters.historical_save_filter.saveReport}),
        ...({chartMetric: chartFlag.isMetricsChart}),
        ...({trendMetric: chartFlag.isTrendsChart}),
        ...({showGuidelines: chartFlag.isShowGuidelines}),
    };

    return queryData;
}

export default useQueryDataHistoricalPdfReport;