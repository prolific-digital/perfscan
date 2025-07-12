import { useSelector} from "react-redux";
import { getUuidData } from "../store/slices/reports/SaveNewReport/SaveNewReport";

const useQueryData = () => {
    const filters = useSelector(state => state.filters)  
    const uuid = useSelector(getUuidData);

    const queryData = {
        ...(filters.date_filter.sdate && { sdate: filters.date_filter.sdate }),
        ...(filters.date_filter.edate && { edate: filters.date_filter.edate }),
        ...(filters.date_filter.stime && { stime: filters.date_filter.stime }),
        ...(filters.date_filter.etime && { etime: filters.date_filter.etime }),
        ...(filters.system_filter && { sysid: filters.system_filter.id }),
        ...(uuid.data.uniqueid && {uniqueid: uuid.data.uniqueid})
    };

    return queryData;
}

export default useQueryData;