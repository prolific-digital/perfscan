import { useSelector} from "react-redux";
import { getChartList } from "../store/slices/charts/chartsSlice";


const useChartList = () => {
    const chartList = useSelector(getChartList);  
    return chartList;
}

export default useChartList;