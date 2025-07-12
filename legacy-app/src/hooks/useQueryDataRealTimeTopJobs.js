import { useSelector } from "react-redux";
import { getParametersFromLocalStorage } from "../helpers/commonHelper";
import { getUuidData } from "../store/slices/reports/SaveNewReport/SaveNewReport";
import moment from "moment";

const useQueryDataRealTimeTopJobs = () => {
  let today = new Date();
  const yesterdayDate = new Date(today.setDate(today.getDate() - 1));
  const formattedYesterDaysDate = moment(yesterdayDate).format("YYYY-MM-DD");
  const filters = useSelector((state) => state.filters);
  let now = new Date();
  const userId = getParametersFromLocalStorage("userID");

  // Subtract 30 minutes from the current time
  now.setMinutes(now.getMinutes() - 30);

  // Round down to the nearest hour
  now.setMinutes(0, 0, 0);

  // Format the new time using Moment.js
  let roundedTime = moment(now).format("HH:mm");

  const queryData = {
    sdate: formattedYesterDaysDate,
    edate: formattedYesterDaysDate,
    // stime: roundedTime,
    // etime: roundedTime,
    // sysid: 1,
    userId: userId,
    sysid: filters?.system_filter.id,
    // sysname: "AETEST",
  };

  return queryData;
};

export default useQueryDataRealTimeTopJobs;
