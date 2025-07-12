import { useSelector } from "react-redux";
import { getParametersFromLocalStorage } from "../helpers/commonHelper";
import _ from "lodash";

const useQueryDataCapacityPlanningPDF = () => {
  const filters = useSelector((state) => state.filters);
  const userId = getParametersFromLocalStorage("userID");

  const capacityAnalysisQueryData = {
    busyday: filters?.capacity_filter.busyday
      ? filters?.capacity_filter.busyday
      : new Date().getDate(),
    sysid: filters?.capacity_filter.sysid || "",

    currentSystem: filters?.capacity_filter.sys_current.entity_name || "",
    currentSystemDescription:
      filters?.capacity_filter.sys_current.entity_description || "",
    currentSystemModel: filters?.capacity_filter.sys_current.model || "",

    currentSystemSerialNum:
      filters?.capacity_filter.sys_current.serial_number || "",
    currentSystemFetureCode:
      filters?.capacity_filter.sys_current.feature_code || "",
    current_num_cores: filters?.capacity_filter.current.cores || "",
    current_sys_cpw: filters?.capacity_filter.current.cpw || "",
    current_sys_max_cpw:
      _.toInteger(
        +filters?.capacity_filter.current.max_cpw /
          +filters?.capacity_filter.current.max_cores
      ) * +filters?.capacity_filter.current.cores || "",

    proposedSystem: filters?.capacity_filter.sys_proposed.entity_name || "",
    proposedSystemDescription:
      filters?.capacity_filter.sys_proposed.entity_description || "",
    proposedSystemModel: filters?.capacity_filter.sys_proposed.model || "",
    proposedSystemSerialNum:
      filters?.capacity_filter.sys_proposed.serial_number || "",
    proposedSystemFetureCode:
      filters?.capacity_filter.sys_proposed.feature_code || "",

    proposed_sys_cpw: filters?.capacity_filter.proposed.cpw || "",
    proposed_num_cores: filters?.capacity_filter.proposed.cores || "",
    proposed_total_num_cores: filters?.capacity_filter.proposed.max_cores || "",
    proposed_sys_max_cpw:
      _.toInteger(
        +filters?.capacity_filter.proposed.max_cpw /
          +filters?.capacity_filter.proposed.max_cores
      ) * +filters?.capacity_filter.proposed.cores || "",
    proposed_sys_max_cpw_rating: +filters?.capacity_filter.proposed.max_cpw,
    userId: userId,
    perc_growth: filters?.capacity_filter.perc_growth ,
    sysOpt: filters.capacity_filter.sysOpt || "",
    rptType: "capacity planning",
  };
  return capacityAnalysisQueryData;
};

export default useQueryDataCapacityPlanningPDF;
