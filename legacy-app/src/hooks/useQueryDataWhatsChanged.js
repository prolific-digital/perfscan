import { useSelector} from "react-redux";
import { getParametersFromLocalStorage } from "../helpers/commonHelper";
import { getUuidData } from "../store/slices/reports/SaveNewReport/SaveNewReport";

const useQueryData = () => {
    const filters = useSelector(state => state.filters)
    const uuid = useSelector(getUuidData);
    const userId = getParametersFromLocalStorage("userID");


    const queryData = {
        ...(filters.whats_changed_date_filter.sdate && { sdate: filters.whats_changed_date_filter.sdate }),
        ...(filters.whats_changed_date_filter.edate && { edate: filters.whats_changed_date_filter.edate }),
        ...(filters.whats_changed_date_filter.stime && { stime: filters.whats_changed_date_filter.stime }),
        ...(filters.whats_changed_date_filter.etime && { etime: filters.whats_changed_date_filter.etime }),
        ...(filters.system_filter && { sysid: filters.system_filter.id }),
        userId:userId,
        ...(filters.system_filter && {sysname: filters.system_filter.entity_name}),
        rptType:'whats changed',
        ...({fileName: filters.whats_changed_save_filter.filename}),
        ...({saveReport: filters.whats_changed_save_filter.saveReport+""}),
        ...(uuid.data.uniqueid && {uniqueid: uuid.data.uniqueid})
    };

    return queryData;
}

export default useQueryData;