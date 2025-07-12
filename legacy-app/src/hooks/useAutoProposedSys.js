import React, {useEffect} from "react";
import { getParametersFromLocalStorage } from "../helpers/commonHelper";
import { useDispatch, useSelector } from "react-redux";
import { fetchAsyncCPConfig, getCapacityConfig } from "../store/slices/appconfig/AppConfigSlice";

const useAutoProposedSys = () => {
    const filters = useSelector(state => state.filters); 
    const userId = getParametersFromLocalStorage("userID");
    

    const cpConfig = useSelector(getCapacityConfig);
  
    const growth_perc = cpConfig.data.filter(d => d.config_key === 'growth_perc');
    const num_systems = cpConfig.data.filter(d => d.config_key === 'num_proposed_system');


    const autoProposedSysParams =
    {
        busyday: filters?.capacity_filter.busyday ? filters?.capacity_filter.busyday : new Date().getDate(),
        sysid : filters?.capacity_filter.sysid,
        userId : userId,
        perc_growth :growth_perc[0]?.config_value,
        limit : num_systems[0]?.config_value
    }  
    return autoProposedSysParams;
}

export default useAutoProposedSys;