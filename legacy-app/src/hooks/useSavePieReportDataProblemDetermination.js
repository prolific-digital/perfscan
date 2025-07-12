import { useSelector } from "react-redux";
import { getParametersFromLocalStorage } from "../helpers/commonHelper";
import { getUuidData } from "../store/slices/reports/SaveNewReport/SaveNewReport";

const usePdPieReportData = () => {
    const filters = useSelector(state => state.filters)  
    const userId = getParametersFromLocalStorage("userID");
    const uuid = useSelector(getUuidData);

    const saveReportData = {
        ...(filters.problem_determination_date_filter.sdate && { sdate: filters.problem_determination_date_filter.sdate }),
        ...(filters.problem_determination_date_filter.edate && { edate: filters.problem_determination_date_filter.edate }),
        ...(filters.problem_determination_date_filter.stime && { stime: filters.problem_determination_date_filter.stime }),
        ...(filters.problem_determination_date_filter.etime && { etime: filters.problem_determination_date_filter.etime }),
        userId:userId,
        ...(filters.system_filter && {sysid: filters.system_filter.id }),
        ...(filters.system_filter && {sysname: filters.system_filter.entity_name}),
        rptType:'problem determination',
        ...({fileName: filters.problem_determination_save_filter.filename}),
        ...({saveReport: filters.problem_determination_save_filter.saveReport+""}),
        ...(uuid.data.uniqueid && {uniqueid: uuid.data.uniqueid})
    };

    return saveReportData;
}

export default usePdPieReportData;