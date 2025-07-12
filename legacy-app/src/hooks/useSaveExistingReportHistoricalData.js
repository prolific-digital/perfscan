import { useSelector } from "react-redux";
import { getSaveNewReportData } from "../store/slices/reports/SaveNewReport/SaveNewReport";
import { getUuidData } from "../store/slices/reports/SaveNewReport/SaveNewReport";

const useSaveExistingReportDataHistoricalData = () => {
    const filters = useSelector(state => state.filters);
    const uuid = useSelector(getUuidData);
    const savedReport = useSelector(getSaveNewReportData);

    const saveReportData = {
        dates: [{
            sdate: filters.historical_date_filter.sdate ? filters.historical_date_filter.sdate : new Date().getDate(), 
            edate: filters.historical_date_filter.edate ? filters.historical_date_filter.edate : new Date().getDate(),
            stime: filters.historical_date_filter.stime ? filters.historical_date_filter.stime : new Date().getTime(), 
            etime: filters.historical_date_filter.etime ? filters.historical_date_filter.etime : new Date().getTime() 
        }],
        ...(filters.system_filter && {sysname: filters.system_filter.entity_name}),
        ...(savedReport.data.tempFileName && { tempFileName: savedReport.data.tempFileName }),
        ...({fileName: filters.historical_save_filter.filename}),
        ...({saveReport: filters.historical_save_filter.saveReport+""}),
        ...(uuid.data.uniqueid && {uniqueid: uuid.data.uniqueid})
    };

    return saveReportData;
}

export default useSaveExistingReportDataHistoricalData;