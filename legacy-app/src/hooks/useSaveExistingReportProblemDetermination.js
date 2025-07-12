import { useSelector } from "react-redux";
import { getSaveNewReportData } from "../store/slices/reports/SaveNewReport/SaveNewReport";
import { getUuidData } from "../store/slices/reports/SaveNewReport/SaveNewReport";

const useSaveExistingReportDataProblemDetermination = () => {
    const filters = useSelector(state => state.filters);
    const savedReport = useSelector(getSaveNewReportData);
    const uuid = useSelector(getUuidData);

    const saveReportData = {
        dates: [{
            sdate: filters.problem_determination_date_filter.sdate ? filters.problem_determination_date_filter.sdate : new Date().getDate(), 
            edate: filters.problem_determination_date_filter.edate ? filters.problem_determination_date_filter.edate : new Date().getDate(),
            stime: filters.problem_determination_date_filter.stime ? filters.problem_determination_date_filter.stime : new Date().getTime(), 
            etime: filters.problem_determination_date_filter.etime ? filters.problem_determination_date_filter.etime : new Date().getTime() 
        }],
        ...(filters.system_filter && { sysid: filters.system_filter.id }),
        ...(filters.system_filter && {sysname: filters.system_filter.entity_name}),
        ...(savedReport.data.tempFileName && { tempFileName: savedReport.data.tempFileName }),
        ...(filters.problem_determination_save_filter.filename && {fileName: filters.problem_determination_save_filter.filename}),
        ...(filters.problem_determination_save_filter.saveReport && {saveReport: filters.problem_determination_save_filter.saveReport+""}),
        ...(uuid.data.uniqueid && {uniqueid: uuid.data.uniqueid})
    };

    return saveReportData;
}

export default useSaveExistingReportDataProblemDetermination;