import { useSelector} from "react-redux";
import { getParametersFromLocalStorage } from "../helpers/commonHelper";

const usePeriodPdfQueryData = () => {
    const filters = useSelector(state => state.filters); 
    const userId = getParametersFromLocalStorage("userID");


  const periodQueryData ={
      sdate1: filters?.period_filter[0]?.sdate ? filters?.period_filter[0]?.sdate : new Date().getDate(), 
      edate1: filters?.period_filter[0]?.edate ? filters?.period_filter[0]?.edate : new Date().getDate(),
      ...(filters?.period_filter[0]?.stime && {stime1: filters?.period_filter[0]?.stime}), 
      ...(filters?.period_filter[0]?.etime && {etime1: filters?.period_filter[0]?.etime}),  
      sdate2: filters?.period_filter[1]?.sdate ? filters?.period_filter[1]?.sdate : new Date().getDate(), 
      edate2: filters?.period_filter[1]?.edate ? filters?.period_filter[1]?.edate : new Date().getDate(),
      ...(filters?.period_filter[1]?.stime && {stime2: filters?.period_filter[1]?.stime}), 
      ...(filters?.period_filter[1]?.etime && {etime2: filters?.period_filter[1]?.etime}), 
    ...(filters?.system_filter && filters?.period_save_filter.sysOpt === 'Single' ? {sysid: filters?.system_filter.id } :
            {sysid:[filters?.system_filter.id,filters?._system_filter.id]}),
            userId : userId,
            ...(filters?.system_filter && filters?.period_save_filter.sysOpt === 'Single' ? {sysname: filters?.system_filter.entity_name}:
            {sysname: [filters?.system_filter.entity_name,filters?._system_filter.entity_name]}),
        rptType:'period Vs period',
        ...({fileName: filters?.period_save_filter.filename}),
        ...({saveReport: filters?.period_save_filter.saveReport+""}),
        ...(filters?.period_save_filter.sysOpt && {sysOpt: filters?.period_save_filter.sysOpt}),
  };
  return periodQueryData;
}

export default usePeriodPdfQueryData;