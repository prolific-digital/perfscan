import { useSelector } from "react-redux";
import { getParametersFromLocalStorage } from "../helpers/commonHelper";
import { getUuidData } from "../store/slices/reports/SaveNewReport/SaveNewReport";

const useReportQueryData = () => {
    const filters = useSelector(state => state.filters)  
    const userId = getParametersFromLocalStorage("userID");
    const uuid = useSelector(getUuidData);

    const queryData = {
        ...(filters.historical_date_filter.sdate && { sdate: filters.historical_date_filter.sdate }),
        ...(filters.historical_date_filter.edate && { edate: filters.historical_date_filter.edate }),
        ...(filters.historical_date_filter.stime && { stime: filters.historical_date_filter.stime }),
        ...(filters.historical_date_filter.etime && { etime: filters.historical_date_filter.etime }),
        ...(filters.system_filter && { sysid: filters.system_filter.id }),
        userId:userId,
        ...(filters.system_filter && {sysname: filters.system_filter.entity_name}),
        rptType:'historical data',
        ...(uuid.data.uniqueid && {uniqueid: uuid.data.uniqueid})
        };

    return queryData;
}

export default useReportQueryData;