import { useSelector } from "react-redux";
import { getParametersFromLocalStorage } from "../helpers/commonHelper";
import { getUuidData } from "../store/slices/reports/SaveNewReport/SaveNewReport";

const useReportData = () => {
    const filters = useSelector(state => state.filters)  
    const userId = getParametersFromLocalStorage("userID");
    const uuid = useSelector(getUuidData);

    const saveReportData = {
        dates: [{
            sdate: filters.problem_determination_date_filter.sdate ? filters.problem_determination_date_filter.sdate : new Date().getDate(), 
            edate: filters.problem_determination_date_filter.edate ? filters.problem_determination_date_filter.edate : new Date().getDate(),
            stime: filters.problem_determination_date_filter.stime ? filters.problem_determination_date_filter.stime : new Date().getTime(), 
            etime: filters.problem_determination_date_filter.etime ? filters.problem_determination_date_filter.etime : new Date().getTime() 
        }],
        ...(filters.system_filter && { sysid: filters.system_filter.id }),
        userId:userId,
        ...(filters.system_filter && {sysname: filters.system_filter.entity_name}),
        rptType:'problem determination',
        ...({fileName: filters.problem_determination_save_filter.filename}),
        ...({saveReport: filters.problem_determination_save_filter.saveReport+""}),
        ...(uuid.data.uniqueid && {uniqueid: uuid.data.uniqueid})
    };

    return saveReportData;
}

export default useReportData;