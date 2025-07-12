import { useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import {  fetchAsyncAppMetrics } from "../store/slices/settings";
import * as _l from "lodash";
import { getParametersFromLocalStorage } from "../helpers/commonHelper";

const useMetricsData = () => {
    const filters = useSelector(state => state.filters)  

  const userID = getParametersFromLocalStorage("userID");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAsyncAppMetrics(filters.system_filter.id, userID));
    },[])
    
};

export default useMetricsData;