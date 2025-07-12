import { useSelector} from "react-redux";
import { getParametersFromLocalStorage } from "../helpers/commonHelper";

const useQueryDataCapacityAnalysis = () => {
    const filters = useSelector(state => state.filters); 
    const userId = getParametersFromLocalStorage("userID");


  const capacityAnalysisQueryData =
  {
    busyday: filters?.capacity_filter.busyday ? filters?.capacity_filter.busyday : new Date().getDate(),
    ...({sysid : filters?.capacity_filter.sysid}),
    ...({num_cores : { 
        sys :filters?.capacity_filter.current.cores, proposed: filters?.capacity_filter.proposed.cores
    }}),
    ...({cpw: {sys:filters?.capacity_filter.current.cpw, proposed: filters?.capacity_filter.proposed.cpw}}),
    userId : userId,
    perc_growth : filters?.capacity_filter.perc_growth,
    ...({fileName: ''}),
    ...({saveReport: ''}),
    modelid: 2,
    sysOpt: filters.capacity_filter.sysOpt,
	  days:10,
    rptType: 'capacity_plannnig',
    limit : 10
}  
  return capacityAnalysisQueryData;
}

export default useQueryDataCapacityAnalysis;