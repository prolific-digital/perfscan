import { useSelector } from "react-redux";
import { getParametersFromLocalStorage } from "../helpers/commonHelper";
import { getUuidData } from "../store/slices/reports/SaveNewReport/SaveNewReport";

const useReportData = () => {
  const filters = useSelector((state) => state.filters);
  const uuid = useSelector(getUuidData);
  const userId = getParametersFromLocalStorage("userID");

  const saveReportData = {
    dates: [
      {
        sdate: filters.historical_date_filter.sdate
          ? filters.historical_date_filter.sdate
          : new Date().getDate(),
        edate: filters.historical_date_filter.edate
          ? filters.historical_date_filter.edate
          : new Date().getDate(),
        stime: filters.historical_date_filter.stime
          ? filters.historical_date_filter.stime
          : new Date().getTime(),
        etime: filters.historical_date_filter.etime
          ? filters.historical_date_filter.etime
          : new Date().getTime(),
      },
    ],
    ...(filters.system_filter && { sysid: filters.system_filter.id }),
    userId: userId,
    ...(filters.system_filter && {
      sysname: filters.system_filter.entity_name,
    }),
    rptType: "historical data",
    ...{ fileName: filters.historical_save_filter.filename },
    ...{ saveReport: filters.historical_save_filter.saveReport + "" },
    ...(uuid.data.uniqueid && { uniqueid: uuid.data.uniqueid }),
  };

  return saveReportData;
};

export default useReportData;
