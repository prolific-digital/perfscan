import { useSelector} from "react-redux";
import { getParametersFromLocalStorage } from "../helpers/commonHelper";
import { getUuidData } from "../store/slices/reports/SaveNewReport/SaveNewReport";

const usePeriodQueryData = () => {
    const filters = useSelector(state => state.filters); 
    const userId = getParametersFromLocalStorage("userID");
    const uuid = useSelector(getUuidData);


  const periodQueryData ={
    dates: [{
      sdate: filters.period_filter[0].sdate ? filters.period_filter[0].sdate : new Date().getDate(), 
      edate: filters.period_filter[0].edate ? filters.period_filter[0].edate : new Date().getDate(),
      ...(filters.period_filter[0].stime && {stime: filters.period_filter[0].stime}), 
      ...(filters.period_filter[0].etime && {etime: filters.period_filter[0].etime})  
  },
  {
      sdate: filters.period_filter[1].sdate ? filters.period_filter[1].sdate : new Date().getDate(), 
      edate: filters.period_filter[1].edate ? filters.period_filter[1].edate : new Date().getDate(),
      ...(filters.period_filter[1].stime && {stime: filters.period_filter[1].stime}), 
      ...(filters.period_filter[1].etime && {etime: filters.period_filter[1].etime}) 
  }],
    ...(filters.system_filter && filters.period_save_filter.sysOpt === 'Single' ? {sysid: filters.system_filter.id } :
            {sysid:[filters.system_filter.id,filters._system_filter.id]}),
            userId : userId,
            ...(filters.system_filter && filters.period_save_filter.sysOpt === 'Single' ? {sysname: filters.system_filter.entity_name}:
            {sysname: [filters.system_filter.entity_name,filters._system_filter.entity_name]}),
        rptType:'period Vs period',
        ...({fileName: filters.period_save_filter.filename}),
        ...({saveReport: filters.period_save_filter.saveReport+""}),
        ...(filters.period_save_filter.sysOpt && {sysOpt: filters.period_save_filter.sysOpt}),
        ...(uuid.data.uniqueid && {uniqueid: uuid.data.uniqueid})
  };
  return periodQueryData;
}

export default usePeriodQueryData;