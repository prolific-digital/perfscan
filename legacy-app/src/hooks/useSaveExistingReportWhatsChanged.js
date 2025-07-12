import { useSelector } from "react-redux";
import { getSaveNewReportData } from "../store/slices/reports/SaveNewReport/SaveNewReport";
import { getUuidData } from "../store/slices/reports/SaveNewReport/SaveNewReport";

const useSaveExistingReportDataWhatsChanged = () => {
    const filters = useSelector(state => state.filters);
    const savedReport = useSelector(getSaveNewReportData);
    const uuid = useSelector(getUuidData);

    const saveReportData = {
        dates: [{
            sdate: filters.whats_changed_date_filter.sdate ? filters.whats_changed_date_filter.sdate : new Date().getDate(), 
            edate: filters.whats_changed_date_filter.edate ? filters.whats_changed_date_filter.edate : new Date().getDate(),
            stime: filters.whats_changed_date_filter.stime ? filters.whats_changed_date_filter.stime : new Date().getTime(), 
            etime: filters.whats_changed_date_filter.etime ? filters.whats_changed_date_filter.etime : new Date().getTime() 
        }],
        ...(filters.system_filter && {sysname: filters.system_filter.entity_name}),
        ...(savedReport.data.tempFileName && { tempFileName: savedReport.data.tempFileName }),
        ...({fileName: filters.whats_changed_save_filter.filename}),
        ...({saveReport: filters.whats_changed_save_filter.saveReport+""}),
        ...(uuid.data.uniqueid && {uniqueid: uuid.data.uniqueid})
    };

    return saveReportData;
}

export default useSaveExistingReportDataWhatsChanged;