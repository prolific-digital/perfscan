import { useSelector } from "react-redux";
import { getParametersFromLocalStorage } from "../helpers/commonHelper";
import { getUuidData } from "../store/slices/reports/SaveNewReport/SaveNewReport";
import moment from "moment";

const useQueryDataRealTimeMonitor = () => {
  const filters = useSelector((state) => state.filters);
  const uuid = useSelector(getUuidData);
  const userId = getParametersFromLocalStorage("userID");
  let today = new Date();
  const yesterdayDate = today.setDate(today.getDate() - 1);
  const formattedYesterDaysDate = moment(yesterdayDate).format("YYYY-MM-DD");
  let now = new Date();
  const filteredTime = now.setMinutes(now.getMinutes() - 15);

  const queryData = {
    sdate: formattedYesterDaysDate,
    edate: formattedYesterDaysDate,
    stime: "00:00",
    etime: moment(filteredTime).format("HH:mm"),
    sysid: filters?.system_filter.id,
    userId: userId,
    // sysname: "AETEST",
    rptType: "historical data",
  };

  return queryData;
};

export default useQueryDataRealTimeMonitor;
