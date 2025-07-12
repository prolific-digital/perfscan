import moment from "moment";
import {
  DISK_UTILIZATION,
  CPU_UTILIZATION_1,
  CPU_UTILIZATION_2,
  CPU_UTILIZATION_3,
  CPU_UTILIZATION_4,
  NO_OF_CORES,
  NO_OF_CORES_TRENDS,
  TRENDS,
  CPU_MS,
  CPU_MS_TRENDS,
  DISK_ARM_UTILIZATION,
  DISK_ARM_TRENDS,
  READS,
  DISK_OPERATIONS,
  DISK_OPERATIONS_TRENDS,
  DISK_RESPONSE,
  DISK_RESPONSE_TRENDS,
  CACHE_HIT,
  CACHE_HIT_TRENDS,
  CPW_UTILIZATION_1,
  CPW_UTILIZATION_2,
} from "../typeCodes";
import * as _ from "lodash";
export const handlePrintDetails = () => {};
export const getDate = (defaultHours, defaultMinutes) => {
  let date = new Date();
  const year = new Intl.DateTimeFormat("en", { year: "numeric" }).format(date);
  const month = new Intl.DateTimeFormat("en", { month: "2-digit" }).format(
    date
  );
  const day = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(date);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${year}-${month}-${day}T${defaultHours || hours}:${
    defaultMinutes || minutes
  }`;
};

export const getFormattedDate = (date) => {
  let d = date ? new Date(date) : new Date();
  const year = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
  const month = new Intl.DateTimeFormat("en", { month: "2-digit" }).format(d);
  const day = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);
  return `${year}-${month}-${day}`;
};

export const validateAddSystem = (data) => {
  let errors = [];
  if (!data.entity_name) {
    errors.push("Entity Name is required!");
  }
  if (!data.entity_type) {
    errors.push("Entity Type is required!");
  }
  if (!data.entity_description) {
    errors.push("Entity description is required!");
  }

  if (!data.model_config_id) {
    errors.push("Please select a system!");
  }
  return errors;
};

export const validateFrameManagement = (data, num_of_cores) => {
  let errors = [];
  if (!data.entity_description) {
    errors.push("Entity description is required!");
  }
  if (!data.entity_data.frame.activated_cores) {
    errors.push("Activated cores is required!");
  }
  if (!data.entity_data.frame.activated_cpw) {
    errors.push("Activated cpw is required!");
  }
  if (!data.entity_data.frame.frame_cores) {
    errors.push("Frame cores is required!");
  }
  if (!data.entity_data.frame.frame_cpw) {
    errors.push("Frame cpw is required!");
  }
  if (!data.entity_data.frame.serial_number) {
    errors.push("Serial number is required!");
  }
  if (isNaN(+data.entity_data.frame.activated_cores)) {
    errors.push("Activated cores should be in numbers!");
  }
  if (isNaN(+data.entity_data.frame.activated_cpw)) {
    errors.push("Activated cpw should be in numbers!");
  }
  if (isNaN(+data.entity_data.frame.frame_cores)) {
    errors.push("Frame cores should be in numbers!");
  }
  if (isNaN(+data.entity_data.frame.frame_cpw)) {
    errors.push("Frame cpw should be in numbers!");
  }
  if (
    +data.entity_data.frame.activated_cores >
      +data.entity_data.frame.frame_cores ||
    (data.entity_data.frame.activated_cores === "" &&
      +data.entity_data.frame.frame_cores)
  ) {
    errors.push("Activated cores can not be more than frame cores!");
  }
  return errors;
};

export const validateAddEvents = (data) => {
  let errors = [];
  if (!data.change_type) {
    errors.push("Change Type is required!");
  }
  if (!data.start_date) {
    errors.push("Start Date is required!");
  }

  return errors;
};

export const validateAddUser = (data) => {
  let errors = [];
  if (!data.name) {
    errors.push("User name is required!");
  }
  if (!data.email) {
    errors.push("Email id is required!");
  }
  if (!data.password) {
    errors.push("Password is required!");
  }
  return errors;
};

export const validateEditUser = (data) => {
  let errors = [];
  if (!data.name) {
    errors.push("User name is required!");
  }
  if (!data.email) {
    errors.push("Email id is required!");
  }
  return errors;
};

export const selectedSystemTemplate = (option, props) => {
  if (option) {
    return (
      <div className="value-options">
        {option.model +
          " (" +
          option.type_fc +
          ") " +
          option.num_of_cores +
          " Cores (" +
          option.cpw +
          ")"}
      </div>
    );
  }
  return <span>{props.placeholder}</span>;
};

export const systemOptionTemplate = (option) => {
  return (
    <div className="value-options">
      {option.model +
        " (" +
        option.type_fc +
        ") " +
        option.num_of_cores +
        " Cores (" +
        option.cpw +
        ")"}
    </div>
  );
};

export const groupedItemTemplate = (option) => {
  return (
    <div className="flex align-items-center">
      <img
        alt={option.label}
        src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png"
        className={`mr-2 flag flag-${
          option.code ? option.code.toLowerCase() : ""
        }`}
        style={{ width: "18px" }}
      />
      <div>{option.label}</div>
    </div>
  );
};

export const saveParametersIntoLocalStorage = (datakey, data) => {
  localStorage.setItem(datakey, JSON.stringify(data));
};

export const removeParametersFromLocalStorage = (datakey, data) => {
  localStorage.removeItem(datakey, JSON.stringify(data));
};

export const getParametersIntoLocalStorage = (datakey, data) => {
  let res = localStorage.getItem(datakey);
  if (res) {
    return JSON.parse(res);
  }
  return {};
};

export const getParametersFromLocalStorage = (datakey, data) => {
  let res = localStorage.getItem(datakey);
  if (res) {
    return JSON.parse(res);
  }
  return {};
};

export const checkPeakSystemStatus = (data) => {
  let status = "";
  if (+data?.warning === 0 && +data?.critical === 0) {
    status = "info";
  } else if (
    +data?.peak < +data?.warning &&
    +data?.peak < +data?.critical
  ) {
    status = "good";
  } else if (
    +data?.peak > +data?.warning &&
    +data?.peak < +data?.critical
  ) {
    status = "warning";
  } else if (+data?.peak > +data?.critical) {
    status = "critical";
  }
  return status;
};

export const checkRealTimeSystemStatus = (data) => {
  let status = "";
  if (+data.warning === 0 && +data.critical === 0) {
    status = "Info";
  } else if (
    +data.data[0].peak < +data.warning &&
    +data.data[0].peak < +data.critical
  ) {
    status = "Good";
  } else if (
    +data.data[0].peak > +data.warning &&
    +data.data[0].peak < +data.critical
  ) {
    status = "Warning";
  } else if (+data.data[0].peak > +data.critical) {
    status = "Critical";
  }
  return status;
};

export const checkRealTimeSystemStatusCount = (data) => {
  const statusKey = {};
  for (let i = 0; i < data?.length; i++) {
    const foundKey = checkPeakSystemStatus(data[i]);
    statusKey[foundKey] = statusKey[foundKey] + 1 || 1;
  }
  if (statusKey.hasOwnProperty("critical")) {
    return "critical";
  }
  if (
    !statusKey.hasOwnProperty("critical") &&
    statusKey.hasOwnProperty("warning")
  ) {
    return "warning";
  }
  if (
    !statusKey.hasOwnProperty("critical") &&
    !statusKey.hasOwnProperty("warning") &&
    statusKey.hasOwnProperty("good")
  ) {
    return "good";
  } else {
    return "info";
  }
};

export const checkRealTimeFrameStatusCount = (data) => {
  const statusKey = {};
  const lparData = data?.lparData;

  lparData.forEach((lparSystem) => {
    lparSystem.metricData.forEach((lparMetric) => {
      const foundKey = checkPeakSystemStatus(lparMetric);
      statusKey[foundKey] = statusKey[foundKey] + 1 || 1;
    });
  });

  if (statusKey.hasOwnProperty("critical")) {
    return "critical";
  }
  if (
    !statusKey.hasOwnProperty("critical") &&
    statusKey.hasOwnProperty("warning")
  ) {
    return "warning";
  }
  if (
    !statusKey.hasOwnProperty("critical") &&
    !statusKey.hasOwnProperty("warning") &&
    statusKey.hasOwnProperty("good")
  ) {
    return "good";
  } else {
    return "info";
  }
};

export const metricCalculation = (data, page) => {
  let type = data.dtype || "";
  let typeDescription = data.dtypedesc || "";
  let avgValue = data
    ? parseFloat(data?.avrg)
    : 0;
  let peakValue = data
    ? parseFloat(data?.peak)
    : 0;
  let diffValue = data
    ? parseFloat(data?.diff)
    : 0;
  let minValue = data ? parseFloat(data?.min) : 0;
  let maxValue = data ? parseFloat(data?.max) : 0;
  let avgPercentageSymBol = "%";
  let peakPercentageSymBol = "%";
  let diffPercentageSymBol = "%";
  let isDecimal =
    type === "cpums" || type === "total_transactions" ? false : true;

  switch (type) {
    case "disk_response_time":
    case "cpu_ms":
      avgPercentageSymBol = peakPercentageSymBol = " ms";
      diffPercentageSymBol = " %";
      break;
    case "no_of_cores":
    case "cpw":
      avgPercentageSymBol = peakPercentageSymBol = "";
      diffPercentageSymBol = " %";
      break;
    case "total_transactions":
      avgPercentageSymBol = peakPercentageSymBol = "";
      diffPercentageSymBol = "%";
      break;
    case "total_disk_ops":
      avgPercentageSymBol = peakPercentageSymBol = " ops / sec ";
      diffPercentageSymBol = " %";
      break;
    case "ethernet_line_utilization":
      avgPercentageSymBol = peakPercentageSymBol = "%"; //ops / sec
      diffPercentageSymBol = "%";
      break;
    case "TotalFaultingRate":
    case "faulting_rate": // FaultingRate
    case "machine_pool_faulting":
    case "memory_size_faulting":
      avgPercentageSymBol = peakPercentageSymBol = " faults / sec";
      diffPercentageSymBol = "%";
      break;
    case "response_time_5250":
      avgPercentageSymBol = peakPercentageSymBol = " seconds";
      diffPercentageSymBol = "%";
      break;
    default:
      break;
  }

  let average = isDecimal
    ? avgValue?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    : Math.floor(avgValue)?.toLocaleString();

  let peak = isDecimal
    ? peakValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    : Math.floor(peakValue)?.toLocaleString();
  // let peak = Math.floor(peakValue)?.toLocaleString();

  let difference = isDecimal
    ? diffValue?.toLocaleString()
    : Math.floor(diffValue)?.toLocaleString();

  if (type === "memoryvsfaulting") {
    // memoryvsfaulting
    typeDescription = "Faulting";
  }

  // if (data.data.length === 0) {
  //   return <div>No data found for selected period</div>;
  // }
  if (page === "metricPage") {
    return `${peak} ${peakPercentageSymBol}`;
  } else {
    return `The ${typeDescription} is ${peak} ${peakPercentageSymBol}`;
  }
};

export const getDataPoints = (data, type) => {
  //Off set is added to counter canvasjs timezone issue
  // let userDate = new Date();
  // let userTimezoneOffset = userDate.getTimezoneOffset() * 60000;
  let result = data?.map((item, index) => {
    let dateTime = item.event_time ? moment(item.event_time) : moment();
    const year = dateTime.year();
    const month = dateTime.month();
    const date = dateTime.date();
    const hours = dateTime.hours();
    const minutes = dateTime.minutes();
    const d = new Date(year, month, date, hours, minutes);
    const dt = new Date(d.getTime());
    return {
      x: dt,
      y: +item[type],
    };
  });
  return result;
};

export const getDataPointsTrendsHisotricalData = (data, type) => {
  //Off set is added to counter canvasjs timezone issue
  // let userDate = new Date();
  // let userTimezoneOffset = userDate.getTimezoneOffset() * 60000;
  let result = data?.map((item, index) => {
    let dateTime = item.event_time ? moment(item.event_time) : moment();
    const year = dateTime.year();
    const month = dateTime.month();
    const date = dateTime.date();
    const hours = dateTime.hours();
    const minutes = dateTime.minutes();
    const d = new Date(year, month, date, hours, minutes);
    const dt = new Date(d.getTime());
    return {
      dateFormat: moment(dt).format("MMM DD YYYY"),
      label: moment(dt).format("MMM YYYY"),
      y: +item[type],
    };
  });
  return result;
};

export const getDataPointsTopPool_old = (data, type) => {
  let userDate = new Date();
  let userTimezoneOffset = userDate.getTimezoneOffset() * 60000;
  let result = [];
  let colors = ["#696661", "#EDCA93", "#695A42", "#B6B1A8"];
  let pools = Object.keys(data[0].pools);
  if (pools.length) {
    pools.map((item, index) => {
      let PoolData = {};
      let dataSeries = [];
      let curPoolData = data[0].pools[item];
      for (let i = 0; i < curPoolData.length; i++) {
        let dateTime = curPoolData[i].etime
          ? moment(curPoolData[i].etime)
          : moment();
        const year = dateTime.year();
        const month = dateTime.month();
        const date = dateTime.date();
        const hours = dateTime.hours();
        const minutes = dateTime.minutes();
        const d = new Date(year, month, date, hours, minutes);
        const dt = new Date(d.getTime() + userTimezoneOffset).valueOf();
        /*const cYear = dt.year();
        const cMonth = dt.month();
        const cDate = dt.date();
        const curDate = moment([cYear, cMonth, cDate]).valueOf();
        //const dt = new Date(cDate.getTime() + userTimezoneOffset);*/
        dataSeries.push({ x: dt, y: +curPoolData[i].faulting_rate });
      }
      PoolData.type = "stackedArea";
      PoolData.showInLegend = "true";
      PoolData.xValueType = "dateTime";
      PoolData.color = colors[index];
      PoolData.name = curPoolData[0]?.pool;
      PoolData.dataPoints = dataSeries;
      PoolData.event_time = curPoolData[0].event_time;
      result.push(PoolData);
    });
  }
  let res = JSON.stringify(result);
  return JSON.parse(res);
};

const getDataPointsTopPool = (data, type) => {
 
  //console.log(data[0]);
  let userDate = new Date();
  let userTimezoneOffset = userDate.getTimezoneOffset() * 60000;
  let result = [];
  let colors = ["#696661", "#EDCA93", "#695A42", "#B6B1A8"]; 
  if(data && data.length > 0){
  let pools = Object.keys(data[0]?.pools);
  if (pools.length) {
    pools.map((item, index) => {
      let PoolData = {};
      let dataSeries = [];
      let curPoolData = data[0].pools[item];
      for (let i = 0; i < curPoolData.length; i++) {
        let dateTime = curPoolData[i].event_time
        ? moment(curPoolData[i].event_time)
        : moment();
      const year = dateTime.year();
      const month = dateTime.month();
      const date = dateTime.date();
      const hours = dateTime.hours();
      const minutes = dateTime.minutes();
      const d = new Date(year, month, date, hours, minutes);
      const dt = new Date(d.getTime() + userTimezoneOffset).valueOf();
        dataSeries.push({ x: dt, y: +curPoolData[i].faulting_rate });
      }
      PoolData.type = "stackedArea";
      PoolData.showInLegend = "true";
      PoolData.xValueType = "dateTime";
      PoolData.color = colors[index];
      PoolData.name = pools[index];
      PoolData.dataPoints = dataSeries;
      PoolData.event_time = curPoolData[0]?.event_time;
      result.push(PoolData);
    });
  }
  }
  let res = JSON.stringify(result);
  //console.log(res);
  return JSON.parse(res);
};

export const getDataPointsTopPoolTrends = (data, type) => {
  let userDate = new Date();
  let userTimezoneOffset = userDate.getTimezoneOffset() * 60000;
  let result = [];
  let colors = ["#696661", "#EDCA93", "#695A42", "#B6B1A8"];
  let pools = Object.keys(data);
  if (pools.length) {
    pools.map((item, index) => {
      let PoolData = {};
      let dataSeries = [];
      let curPoolData = data[item];
      for (let i = 0; i < curPoolData.length; i++) {
        let dateTime = curPoolData[i].etime
          ? moment(curPoolData[i].etime)
          : moment();
        const year = dateTime.year();
        const month = dateTime.month();
        const date = dateTime.date();
        const hours = dateTime.hours();
        const minutes = dateTime.minutes();
        const d = new Date(year, month, date, hours, minutes);
        const dt = new Date(d.getTime() + userTimezoneOffset).valueOf();
        /*const cYear = dt.year();
        const cMonth = dt.month();
        const cDate = dt.date();
        const curDate = moment([cYear, cMonth, cDate]).valueOf();
        //const dt = new Date(cDate.getTime() + userTimezoneOffset);*/
        dataSeries.push({
          dateFormat: moment(dt).format("MMM DD YYYY"),
          label: moment(dt).format("MMM YYYY"),
          y: +curPoolData[i].faulting_rate,
        });
      }
      PoolData.type = "stackedArea";
      PoolData.showInLegend = "true";
      PoolData.xValueType = moment(curPoolData[0]?.etime)?.format(
        "MMM DD YYYY"
      );
      PoolData.color = colors[index];
      PoolData.name = curPoolData[0]?.pool;
      PoolData.dataPoints = dataSeries;
      result.push(PoolData);
    });
  }
  let res = JSON.stringify(result);
  return JSON.parse(res);
};
/* test1 */

export const getDataPointsForMemVsFault = (data, type) => {
  let userDate = new Date();
  let userTimezoneOffset = userDate.getTimezoneOffset() * 60000;
  let result = data[1].map((item, index) => {
    let dateTime = item.event_time ? moment(item.event_time) : moment();
    const year = dateTime.year();
    const month = dateTime.month();
    const date = dateTime.date();
    const hours = dateTime.hours();
    const minutes = dateTime.minutes();
    const d = new Date(year, month, date, hours, minutes);
    const dt = new Date(d.getTime() + userTimezoneOffset);
    return {
      x: dt,
      y: +item[type],
    };
  });
  return result;
};

/* End of test1 */

export const getChartTypeObject = (originaldata, chartType, chartName) => {
  let chartData;
  switch (chartName) {
    case "cpuUtilization":
      const data_cpu_utilization_1 = getDataPoints(originaldata, "syscpu");
      const data_cpu_utilization_2 = getDataPoints(originaldata, "intcpu");
      const data_cpu_utilization_3 = getDataPoints(originaldata, "batchcpu");
      const data_cpu_utilization_4 = getDataPoints(originaldata, "totalcpu");
      // const data_cpu_utilization_4 = getDataPoints(originaldata, "totalcpu");

      chartData = [
        {
          ...CPU_UTILIZATION_1,
          type: chartType,
          dataPoints: data_cpu_utilization_1,
        },
        {
          ...CPU_UTILIZATION_2,
          type: chartType,
          dataPoints: data_cpu_utilization_2,
        },
        {
          ...CPU_UTILIZATION_3,
          type: chartType,
          dataPoints: data_cpu_utilization_3,
        },
      ];
      break;
    case "cpuUtilizationTrends":
      const data_syscpu_trends = getDataPointsTrendsHisotricalData(
        originaldata,
        "syscpu"
      );
      const data_intcpu_trends = getDataPointsTrendsHisotricalData(
        originaldata,
        "intcpu"
      );
      const data_batchcpu_trends = getDataPointsTrendsHisotricalData(
        originaldata,
        "batchcpu"
      );
      chartData = [
        {
          ...CPU_UTILIZATION_1,
          type: chartType,
          dataPoints: data_syscpu_trends,
        },
        {
          ...CPU_UTILIZATION_2,
          type: chartType,
          dataPoints: data_intcpu_trends,
        },
        {
          ...CPU_UTILIZATION_3,
          type: chartType,
          dataPoints: data_batchcpu_trends,
        },
      ];
      break;
    case "noOfCores":
      const datanoOfCores = getDataPoints(originaldata, "totalcores");
      chartData = [
        {
          ...NO_OF_CORES,
          type: chartType,
          dataPoints: datanoOfCores,
          name: "Number of Cores",
        },
      ];
      break;
    case "noOfCoresTrends":
      const datanoOfCoresTrends = getDataPointsTrendsHisotricalData(
        originaldata,
        "totalcores"
      );
      chartData = [
        {
          ...NO_OF_CORES_TRENDS,
          type: chartType,
          dataPoints: datanoOfCoresTrends,
          name: "Number of Cores",
        },
      ];
      break;
    case "cpwUtilization":
      const data_cpw_utilization_1 = getDataPoints(
        originaldata,
        "interactivecpw"
      );
      const data_cpw_utilization_2 = getDataPoints(originaldata, "batchcpw");

      chartData = [
        {
          ...CPW_UTILIZATION_1,
          type: chartType,
          cursor: "pointer",
          dataPoints: data_cpw_utilization_1,
        },
        {
          ...CPW_UTILIZATION_2,
          type: chartType,
          cursor: "pointer",
          dataPoints: data_cpw_utilization_2,
        },
      ];
      break;
    case "cpwUtilizationTrends":
      const data_cpw_trends_1 = getDataPointsTrendsHisotricalData(
        originaldata,
        "interactivecpw"
      );
      const data_cpw_trends_2 = getDataPointsTrendsHisotricalData(
        originaldata,
        "batchcpw"
      );

      chartData = [
        {
          ...CPW_UTILIZATION_1,
          type: chartType,
          dataPoints: data_cpw_trends_1,
        },
        {
          ...CPW_UTILIZATION_2,
          type: chartType,
          dataPoints: data_cpw_trends_2,
        },
      ];
      break;
    case "diskSpaceUtilization":
      const datadiskSpaceUtilization = getDataPoints(
        originaldata,
        "totalutilization"
      );
      chartData = [
        {
          ...DISK_UTILIZATION,
          type: chartType,
          dataPoints: datadiskSpaceUtilization,
          color: "#29a329",
          name: "Utilization",
        },
      ];
      break;
    case "diskSpaceUtilizationTrends":
      const diskSpaceUtilizationTrends = getDataPointsTrendsHisotricalData(
        originaldata,
        "totalutilization"
      );
      chartData = [
        {
          ...NO_OF_CORES_TRENDS,
          type: chartType,
          dataPoints: diskSpaceUtilizationTrends,
          color: "#29a329",
          name: "Utilization",
        },
      ];
      break;
    case "diskArmUtilization":
      const datadiskArmUtilization = getDataPoints(
        originaldata,
        "disk_arm_utilization"
      );
      chartData = [
        {
          ...DISK_ARM_UTILIZATION,
          type: chartType,
          dataPoints: datadiskArmUtilization,
          name: "Utilization",
        },
      ];
      break;
    case "diskArmTrends":
      const diskArmTrends = getDataPointsTrendsHisotricalData(
        originaldata,
        "disk_arm_utilization"
      );
      chartData = [
        {
          ...DISK_ARM_TRENDS,
          type: chartType,
          dataPoints: diskArmTrends,
          name: "Utilization",
        },
      ];
      break;
    case "CPUMsUtilization":
      const dataCPUMsUtilization = getDataPoints(originaldata, "totalcpums");
      chartData = [
        {
          ...CPU_MS,
          type: chartType,
          dataPoints: dataCPUMsUtilization,
        },
      ];
      break;
    case "CPUMsTrends":
      const CPUMsTrends = getDataPointsTrendsHisotricalData(
        originaldata,
        "totalcpums"
      );
      chartData = [
        {
          ...CPU_MS_TRENDS,
          type: chartType,
          dataPoints: CPUMsTrends,
        },
      ];
      break;
    case "readWriteRatio":
      const data_read = getDataPoints(originaldata, "read_write_ratio");
      chartData = [
        {
          ...READS,
          color: "#14e8f5",
          type: chartType,
          dataPoints: data_read,
        },
      ];
      break;
    case "readWriteRatioTrends":
      const data_read_treds = getDataPointsTrendsHisotricalData(
        originaldata,
        "read_write_ratio"
      );
      chartData = [
        {
          ...READS,
          color: "#14e8f5",
          type: chartType,
          dataPoints: data_read_treds,
        },
      ];
      break;

    case "diskOperations":
      const data_disk_reads = getDataPoints(originaldata, "reads_per_sec");
      const data_disk_writes = getDataPoints(originaldata, "writes_per_sec");
      chartData = [
        {
          ...DISK_OPERATIONS,
          type: chartType,
          dataPoints: data_disk_reads,
          color: "#3399ff",
          name: "Reads ",
        },
        {
          ...DISK_OPERATIONS,
          type: chartType,
          dataPoints: data_disk_writes,
          color: "#001933",
          name: "Writes ",
        },
      ];
      break;
    case "diskOperationsTrends":
      const data_disk_reads_trends = getDataPointsTrendsHisotricalData(
        originaldata,
        "reads_per_sec"
      );
      const data_disk_writes_trends = getDataPointsTrendsHisotricalData(
        originaldata,
        "writes_per_sec"
      );
      chartData = [
        {
          ...DISK_OPERATIONS_TRENDS,
          type: chartType,
          dataPoints: data_disk_reads_trends,
          color: "#3399ff",
          name: "Reads ",
        },
        {
          ...DISK_OPERATIONS_TRENDS,
          type: chartType,
          dataPoints: data_disk_writes_trends,
          color: "#001933",
          name: "Writes ",
        },
      ];
      break;
    case "diskResponse":
      const data_disk_response_service = getDataPoints(
        originaldata,
        "service_time"
      );
      const data_disk_response_wait = getDataPoints(originaldata, "wait_time");
      //const data_disk_response = getDataPoints(originaldata, "disk_response_time");

      chartData = [
        {
          ...DISK_RESPONSE,
          type: chartType,
          dataPoints: data_disk_response_service,
          color: "#c0c0c0",
          name: "Service",
        },
        {
          ...DISK_RESPONSE,
          type: chartType,
          dataPoints: data_disk_response_wait,
          color: "#b87333",
          name: "Wait",
        },
      ];
      break;
    case "diskResponseTrends":
      const data_disk_response_Service_trends =
        getDataPointsTrendsHisotricalData(originaldata, "service_time");
      const data_disk_response_wait_trends = getDataPointsTrendsHisotricalData(
        originaldata,
        "wait_time"
      );
      chartData = [
        {
          ...DISK_RESPONSE_TRENDS,
          type: chartType,
          dataPoints: data_disk_response_Service_trends,
          color: "#c0c0c0",
          name: "Service",
        },
        {
          ...DISK_RESPONSE_TRENDS,
          type: chartType,
          dataPoints: data_disk_response_wait_trends,
          color: "#b87333",
          name: "Wait",
        },
      ];
      break;
    case "machinePoolFaulting":
      const data_machine_Pool_Faulting = getDataPoints(
        originaldata,
        "machine_pool_faults"
      );
      chartData = [
        {
          ...DISK_OPERATIONS,
          type: chartType,
          dataPoints: data_machine_Pool_Faulting,
          color: "#ff8c02",
          name: "Faults / Sec",
        },
      ];
      break;
    case "machinePoolFaultingTrends":
      const data_machine_Pool_Faulting_trends =
        getDataPointsTrendsHisotricalData(originaldata, "machine_pool_faults");
      chartData = [
        {
          ...DISK_OPERATIONS_TRENDS,
          type: chartType,
          dataPoints: data_machine_Pool_Faulting_trends,
          color: "#ff8c02",
          name: "Faults / Sec",
        },
      ];
      break;
    case "totalFaultingRate":
      const data_total_Faulting_Rate = getDataPoints(
        originaldata,
        "total_faulting_rate"
      );
      chartData = [
        {
          ...DISK_OPERATIONS,
          type: chartType,
          dataPoints: data_total_Faulting_Rate,
          color: "#1b76d2",
          name: "Faults / Sec",
        },
      ];
      break;
    case "totalFaultingRateTrends":
      const data_total_Faulting_Rate_trends = getDataPointsTrendsHisotricalData(
        originaldata,
        "total_faulting_rate"
      );
      chartData = [
        {
          ...DISK_OPERATIONS_TRENDS,
          type: chartType,
          dataPoints: data_total_Faulting_Rate_trends,
          color: "#1b76d2",
          name: "Faults / Sec",
        },
      ];
      break;

    case "topPoolFaultingRate":
      //debugger;
      const data_top_Pool_Faulting_Rate_Pool = getDataPointsTopPool(
        originaldata,
        "faulting_rate"
      );
      chartData = data_top_Pool_Faulting_Rate_Pool;
      break;
    case "topPoolFaultingRateTrends":
      const data_top_Pool_Faulting_Rate_trends = getDataPointsTopPoolTrends(
        originaldata,
        "faulting_rate" //  topfaults
      );
      chartData = data_top_Pool_Faulting_Rate_trends;
      break;
    case "memorySizeVsFaulting":
      const data_Faulting = getDataPointsForMemVsFault(
        originaldata,
        "faulting_rate"
      );
      const data_memory_size = getDataPointsForMemVsFault(
        originaldata,
        "memory_size"
      );
      chartData = [
        {
          ...DISK_OPERATIONS,
          type: chartType,
          dataPoints: data_Faulting,
          color: "#b81f0a",
          name: "Fault / Sec",
        },
        {
          ...DISK_OPERATIONS,

          type: "stackedArea",
          //name: "Profit",
          markerBorderColor: "white",
          markerBorderThickness: 2,
          showInLegend: true,
          yValueFormatString: "$#,##0",
          dataPoints: data_memory_size,
          //markerSize: 1,
          //color: "#1EB294",
          name: "Total Memory Size (GB)",
        },
      ];
      break;
    case "memorySizeVsFaultingTrends":
      const data_Faulting_trends = getDataPointsTrendsHisotricalData(
        originaldata,
        "faulting_rate"
      );
      const data_memory_size_trends = getDataPointsTrendsHisotricalData(
        originaldata,
        "memory_size"
      );
      chartData = [
        {
          ...DISK_OPERATIONS,
          type: chartType, //stepLine
          color: "#b81f0a",
          dataPoints: data_Faulting_trends,
          name: "Fault / Sec",
        },
        {
          ...DISK_OPERATIONS,
          type: "stackedArea",
          //name: "Profit",
          // showInLegend: true,
          // yValueFormatString: "$#,##0",
          dataPoints: data_memory_size_trends,
          color: "#1EB294",
          name: "Total Memory Size (GB)",
          axisYType: "secondary",
        },
      ];
      break;
    case "specificPoolFaultingTrends":
      const specific_Pool_Faulting_Rate_trends =
        getDataPointsTrendsHisotricalData(originaldata, "faulting_rate");
      chartData = [
        {
          ...DISK_OPERATIONS_TRENDS,
          type: chartType,
          dataPoints: specific_Pool_Faulting_Rate_trends,
          color: "#7D3C98", // previous => 388e3c
          name: "Faults / Sec",
        },
      ];
      break;
    case "responseTime5250":
      const data_response_Time_5250 = getDataPoints(
        originaldata,
        "response_time_5250"
      );
      chartData = [
        {
          ...DISK_OPERATIONS,
          type: chartType,
          dataPoints: data_response_Time_5250,
          color: "#EE82EE",
          name: "Seconds",
        },
      ];
      break;
    case "responseTime5250Trends":
      const data_response_Time_5250_trends = getDataPointsTrendsHisotricalData(
        originaldata,
        "response_time_5250"
      );
      chartData = [
        {
          ...DISK_OPERATIONS_TRENDS,
          type: chartType,
          dataPoints: data_response_Time_5250_trends,
          color: "#EE82EE",
          name: "Seconds",
        },
      ];
      break;
    case "totalTransactions":
      const data_total_Transactions = getDataPoints(
        originaldata,
        "total_transactions"
      );
      chartData = [
        {
          ...DISK_OPERATIONS,
          type: chartType,
          dataPoints: data_total_Transactions,
          color: "#cc9900",
          name: "Transactions",
        },
      ];
      break;
    case "totalTransactionsTrends":
      const data_total_Transactions_trends = getDataPointsTrendsHisotricalData(
        originaldata,
        "total_transactions"
      );
      chartData = [
        {
          ...DISK_OPERATIONS_TRENDS,
          type: chartType,
          dataPoints: data_total_Transactions_trends,
          color: "#cc9900",
          name: "Transactions",
        },
      ];
      break;

    case "cacheHitPercentage":
      const data_device_cache_read = getDataPoints(
        originaldata,
        "device_cache_read"
      );
      const data_controller_cache_read = getDataPoints(
        originaldata,
        "controller_cache_read"
      );
      const data_controller_cache_write = getDataPoints(
        originaldata,
        "controller_cache_write"
      );
      chartData = [
        {
          ...CACHE_HIT,
          type: chartType,
          dataPoints: data_device_cache_read,
          color: "#f7ac08",
          name: "Device Cache Read %",
        },
        {
          ...CACHE_HIT,
          type: chartType,
          dataPoints: data_controller_cache_read,
          color: "#199d2c",
          name: "Controller Cache Read %",
        },
        {
          ...CACHE_HIT,
          type: chartType,
          dataPoints: data_controller_cache_write,
          color: "#e3f606",
          name: "Controller Cache Write %",
        },
      ];
      break;
    case "cacheHitPercentageTrends":
      const data_device_cache_read_trends = getDataPointsTrendsHisotricalData(
        originaldata,
        "device_cache_read"
      );
      const data_controller_cache_read_trends =
        getDataPointsTrendsHisotricalData(
          originaldata,
          "controller_cache_read"
        );
      const data_controller_cache_write_trends = getDataPoints(
        originaldata,
        "controller_cache_write"
      );
      chartData = [
        {
          ...CACHE_HIT_TRENDS,
          type: chartType,
          dataPoints: data_device_cache_read_trends,
          color: "#f7ac08",
          name: "Device Cache Read %",
        },
        {
          ...CACHE_HIT_TRENDS,
          type: chartType,
          dataPoints: data_controller_cache_read_trends,
          name: "Controller Cache Read %",
          color: "#199d2c",
        },
        {
          ...CACHE_HIT_TRENDS,
          type: chartType,
          dataPoints: data_controller_cache_write_trends,
          color: "#e3f606",
          name: "Controller Cache Write %",
        },
      ];
      break;

    case "ethernetLineUtilization":
      const data_ethernet_line_utilization = getDataPoints(
        originaldata,
        "total_utilization" // ethernet_line_utilization
      );
      chartData = [
        {
          ...DISK_OPERATIONS,
          type: chartType,
          dataPoints: data_ethernet_line_utilization,
          color: "#034C17", // prev => cc9900
          name: "Ethernet Line",
        },
      ];
      break;
    case "ethernetLineUtilizationTrends":
      const data_ethernet_line_utilization_trends =
        getDataPointsTrendsHisotricalData(
          originaldata,
          "total_utilization" //ethernet_line_utilization
        );
      chartData = [
        {
          ...DISK_OPERATIONS_TRENDS,
          type: chartType,
          dataPoints: data_ethernet_line_utilization_trends,
          color: "#034C17", // prev => cc9900
          name: "Ethernet Line",
        },
      ];
      break;

    default:
      break;
  }
  return chartData;
};
export const createChartDataMapping = (originaldata, chartType, chartName) => {
  return getChartTypeObject(originaldata, chartType, chartName);
};

export const getDataPointsForPoolNumBasedCharts = (data, type) => {
  let result = data?.map((item, index) => {
    if (item) {
      let dateTime = item.event_time ? moment(item.event_time) : moment();
      const year = dateTime.year();
      const month = dateTime.month();
      const date = dateTime.date();
      const hours = dateTime.hours();
      const minutes = dateTime.minutes();
      return {
        x: new Date(year, month, date, hours, minutes),
        y: +item[type],
      };
    } else {
      return {
        x: new Date(),
        y: 0,
      };
    }
  });
  return result;
};

export const getDataPointsForPoolNumBasedChartsTrends = (data, type) => {
  let result = data?.map((item, index) => {
    if (item) {
      let dateTime = item.event_time ? moment(item.event_time) : moment();
      const year = dateTime.year();
      const month = dateTime.month();
      const date = dateTime.date();
      const hours = dateTime.hours();
      const minutes = dateTime.minutes();
      return {
        x: new Date(year, month, date, hours, minutes),
        y: +item[type],
      };
    } else {
      return {
        // x: new Date(),
        y: 0,
      };
    }
  });
  return result;
};

export const checkSystemStatusForPVsP = (data, pNum) => {
  if (+data.data[pNum]?.warning === 0 && +data.data[pNum]?.critical === 0) {
    return (
      <span
        style={{
          color: "#fff",
          background: "#16aaff",
          fontWeight: "bold",
          padding: "0.4rem 0.6rem",
          borderRadius: "6px",
          fontSize: "0.75rem",
          fontWeight: "600",
        }}
      >
        INFO
      </span>
    );
  } else if (
    +data.data[pNum]?.avrg < +data.data[pNum]?.warning &&
    +data.data[pNum]?.avrg < +data.data[pNum]?.critical
  ) {
    return (
      <span
        style={{
          color: "#fff",
          background: "#3ac47d",
          fontWeight: "bold",
          padding: "0.4rem 0.6rem",
          borderRadius: "6px",
          fontSize: "0.75rem",
          fontWeight: "600",
        }}
      >
        GOOD
      </span>
    );
  } else if (
    +data.data[pNum]?.avrg > +data.data[pNum]?.warning &&
    +data.data[pNum]?.avrg < +data.data[pNum]?.critical
  ) {
    return (
      <span
        style={{
          color: "#fff",
          background: "#f7b924",
          fontWeight: "bold",
          padding: "0.4rem 0.6rem",
          borderRadius: "6px",
          fontSize: "0.75rem",
          fontWeight: "600",
        }}
      >
        WARNING
      </span>
    );
  } else if (+data.data[pNum]?.avrg > +data.data[pNum]?.critical) {
    return (
      <span
        style={{
          color: "#fff",
          background: "#d92550",
          fontWeight: "bold",
          padding: "0.4rem 0.6rem",
          borderRadius: "6px",
          fontSize: "0.75rem",
          fontWeight: "600",
        }}
      >
        CRITICAL
      </span>
    );
  } else {
    return (
      <span
        style={{
          color: "#fff",
          background: "#16aaff",
          fontWeight: "bold",
          padding: "0.4rem 0.6rem",
          borderRadius: "6px",
          fontSize: "0.75rem",
          fontWeight: "600",
        }}
      >
        INFO
      </span>
    );
  }
};

export const checkSystemStatusPVsPRenderType = (data, indexType) => {
  let status = "";
  if (
    +data.data[indexType]?.warning === 0 &&
    +data.data[indexType]?.critical === 0
  ) {
    status = "Info";
  } else if (
    +data.data[indexType]?.avrg < +data.data[indexType]?.warning &&
    +data.data[indexType]?.avrg < +data.data[indexType]?.critical
  ) {
    status = "Good";
  } else if (
    +data.data[indexType]?.avrg > +data.data[indexType]?.warning &&
    +data.data[indexType]?.avrg < +data.data[indexType]?.critical
  ) {
    status = "Warning";
  } else if (+data.data[indexType]?.avrg > +data.data[indexType]?.critical) {
    status = "Critical";
  } else {
    status = "Info";
  }
  return status;
};

export const checkSystemStatus = (data) => {
  let status = "";
  if (+data.warning === 0 && +data.critical === 0) {
    status = "Info";
  } else if (
    +data.data[0]?.avrg < +data.warning &&
    +data.data[0]?.avrg < +data.critical
  ) {
    status = "Good";
  } else if (
    +data.data[0]?.avrg > +data.warning &&
    +data.data[0]?.avrg < +data.critical
  ) {
    status = "Warning";
  } else if (+data.data[0]?.avrg > +data.critical) {
    status = "Critical";
  } else {
    status = "Info";
  }
  return status;
};

export const renderFindings = (data, version, date) => {
  let type = data?.dtype || "";
  let typeDescription = data.dtypedesc || "";

  if (
    typeof data.data[version] === "undefined" &&
    type !== "TopPoolFaultingRate"
  ) {
    return "No data found for selected period";
  }

  if (_.isEmpty(data?.data[version]) && type !== "TopPoolFaultingRate") {
    return "No data found for selected period";
  }

  if (type === "TopPoolFaultingRate") {
    let skey = Object.keys(data.data);
    const poolList = data?.data[skey[version]] || [];
    if (poolList.length !== 0 && typeof poolList !== "object") {
      const dataDom = poolList?.map((item, idx) => (
        <div className="findings_col">
          <div className="Info">
            The following pool was analyzed for : {item.pool}
          </div>
          <div className="Info">
            The average faulting rate was{" "}
            {parseFloat(item.faulting_rate)
              .toFixed(1)
              ?.toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
            fault/sec
          </div>
          <br></br>
        </div>
      ));
      return dataDom;
    } else {
      return (
        <div className="findings_col">
          <div className="Info">No data found for selected period.</div>
        </div>
      );
    }
  }
  if (type === "pool_faulting_rate") {
    const poolList = data.data || [];
    if (poolList.length !== 0) {
      const dataDom = poolList[version].map((item, idx) => (
        <div className="findings_col">
          <div className="Info">
            The following pool was analyzed for : {item.pool}
          </div>
          <div className={checkSystemStatusPVsPRenderType(data, version)}>
            The average faulting rate was{" "}
            {parseFloat(item.avrg)
              .toFixed(1)
              ?.toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
            <span className="table_wrapper_symbol">fault/sec</span>
          </div>
          <div className={checkSystemStatusPVsPRenderType(data, version)}>
            The peak faulting rate was{" "}
            {parseFloat(item.peak)
              .toFixed(1)
              ?.toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
            <span className="table_wrapper_symbol">fault/sec</span>
          </div>
          <br />
        </div>
      ));
      return dataDom;
    } else {
      return (
        <div className="findings_col">
          <div className="Info">No data found for selected period.</div>
        </div>
      );
    }
  }
  if (type === "cache_hit_perc") {
    const dataList = data.data[version] || [];
    if (dataList.length !== 0) {
      const dataDom = dataList.map((item, idx) => (
        <>
          {
            <div className="findings_col">
              {Object.keys(item).length !== 0 && (
                <>
                  <div className="Info">
                    <span className="table_wrapper_label">
                      {item.dtypedesc}
                    </span>
                  </div>
                  <div className={checkSystemStatusPVsPRenderType(data)}>
                    The average was{" "}
                    {item.avrg === null
                      ? "0.00"
                      : parseFloat(item.avrg)
                          .toFixed(1)
                          ?.toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                    <span className="table_wrapper_symbol">%</span>
                  </div>
                  <div className={checkSystemStatusPVsPRenderType(data)}>
                    The peak was{" "}
                    {parseFloat(item.peak)
                      .toFixed(1)
                      ?.toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                    <span className="table_wrapper_symbol">%</span>
                  </div>
                </>
              )}
              <br />
              {Object.keys(item).length === 0 && (
                <div className="Info">No data found for selected period.</div>
              )}
            </div>
          }
        </>
      ));
      return dataDom;
    } else {
      return (
        <div className="findings_col">
          <div className="Info">No data found for selected period.</div>
        </div>
      );
    }
  }
  let avgValue = 0;
  let peakValue = 0;
  let diffValue = 0;
  if (version === 1 && data.data[1]) {
    avgValue = data.data.length
      ? data.data[1].avrg === null
        ? 0
        : parseFloat(data.data[1].avrg)?.toFixed(1)
      : 0;
    peakValue = data.data.length
      ? data.data[1].peak === null
        ? 0
        : parseFloat(data.data[1].peak).toFixed(1)
      : 0;
    diffValue = data.data.length
      ? data.data[1].diff === null
        ? 0
        : parseFloat(data.data[1].diff).toFixed(1)
      : 0;
  } else if (version === 0 && data.data[0]) {
    avgValue = data.data.length
      ? data.data[0].avrg === null
        ? 0
        : parseFloat(data.data[0].avrg).toFixed(1)
      : 0;
    peakValue = data.data.length
      ? data.data[0].peak === null
        ? 0
        : parseFloat(data.data[0].peak).toFixed(1)
      : 0;
    diffValue = data.data.length
      ? data.data[0].diff === null
        ? 0
        : parseFloat(data.data[0].diff).toFixed(1)
      : 0;
  }
  let avgPercentageSymBol = "%";
  let peakPercentageSymBol = "%";
  let diffPercentageSymBol = "%";
  let isDecimal =
    type === "cpums" || type === "total_transactions" || type === "cpw"
      ? false
      : true;

  switch (type) {
    case "disk_response_time":
    case "cpu_ms":
      avgPercentageSymBol = peakPercentageSymBol = " ms";
      diffPercentageSymBol = " % ";
      break;
    case "cpw":
    case "no_of_cores":
      avgPercentageSymBol = peakPercentageSymBol = "";
      diffPercentageSymBol = "";
      break;
    case "total_transactions":
      avgPercentageSymBol = peakPercentageSymBol = "";
      diffPercentageSymBol = "%";
      break;
    case "total_disk_ops":
      avgPercentageSymBol = peakPercentageSymBol = " ops / sec ";
      diffPercentageSymBol = " % ";
      break;
    case "ethernet_line_utilization":
      avgPercentageSymBol = peakPercentageSymBol = "%"; //ops / sec
      diffPercentageSymBol = "%";
      break;
    case "TotalFaultingRate":
    case "faulting_rate": // FaultingRate
    case "machine_pool_faulting":
    case "memory_size_faulting":
      avgPercentageSymBol = peakPercentageSymBol = " faults / sec";
      diffPercentageSymBol = "%";
      break;
    case "response_time_5250":
      avgPercentageSymBol = peakPercentageSymBol = " seconds";
      diffPercentageSymBol = "%";
      break;
    default:
      break;
  }

  let average = isDecimal
    ? avgValue === 0
      ? avgValue
      : avgValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    : Math.floor(avgValue)?.toLocaleString();

  let peak = isDecimal
    ? peakValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    : Math.floor(peakValue)?.toLocaleString();

  let difference = isDecimal
    ? diffValue?.toLocaleString()
    : Math.floor(diffValue)?.toLocaleString();

  if (type === "memoryvsfaulting") {
    // memoryvsfaulting
    typeDescription = "Faulting";
  }
  let peakNum = parseInt(peak);
  if (data.data.length === 0) {
    return <div>No data found for selected period</div>;
  } else {
    return (
      <div className="findings_col">
        <div className={checkSystemStatusPVsPRenderType(data, version)}>
          The average {typeDescription} was {average}
          {avgPercentageSymBol}
        </div>
        <div className={checkSystemStatusPVsPRenderType(data, version)}>
          The peak {typeDescription} was {peak}
          {peakPercentageSymBol}
          <span style={{ filter: "brightness(85%)" }}>
            (
            {moment(data?.data[version]?.event_time).format(
              "MMMM Do YYYY, h:mm a"
            )}
            )
          </span>
        </div>
        {type === "memoryvsfaulting" && ( // memoryvsfaulting
          <>
            <br></br>
            <div className={checkSystemStatusPVsPRenderType(data, version)}>
              The average Memory was{" "}
              {Math.floor(data.avrgmem)?.toLocaleString()}
              {avgPercentageSymBol}
            </div>
            <div className={checkSystemStatusPVsPRenderType(data, version)}>
              The peak Memory was{" "}
              {Math.floor(data.peakmemory)?.toLocaleString()}
              {peakPercentageSymBol} (
              <span style={{ filter: "brightness(85%)" }}>
                (
                {moment(data?.data[version]?.event_time).format(
                  "MMMM Do YYYY, h:mm a"
                )}
                )
              </span>
              )
            </div>
          </>
        )}
      </div>
    );
  }
};

const cacheHitPercentageCal = (averagePercent, peakPercent, type) => {
  if (averagePercent === "" || peakPercent === "") {
    return (
      <div className="findings_col">
        <div className="Black">
          Comperative analysis not available due to no data found.
        </div>
      </div>
    );
  }

  if (Number(averagePercent) > 0 && Number(peakPercent) < 0) {
    return (
      <div className="findings_col">
        <div className="Black">
          The average {type} decreased by {averagePercent}%
        </div>
        <div className="Black">
          The peak {type} increased by {Math.abs(peakPercent)}%
        </div>
      </div>
    );
  } else if (Number(averagePercent) < 0 && Number(peakPercent) > 0) {
    return (
      <div className="findings_col">
        <div className="Black">
          The average {type} increased by {Math.abs(averagePercent)}%
        </div>
        <div className="Black">
          The peak {type} decreased by {peakPercent}%
        </div>
      </div>
    );
  } else if (Number(averagePercent) < 0 && Number(peakPercent) < 0) {
    return (
      <div className="findings_col">
        <div className="Black">
          The average {type} increased by {Math.abs(averagePercent)}%
        </div>
        <div className="Black">
          The peak {type} increased by {Math.abs(peakPercent)}%
        </div>
      </div>
    );
  } else if (Number(averagePercent) > 0 && Number(peakPercent) > 0) {
    return (
      <div className="findings_col">
        <div className="Black">
          The average {type} decreased by {Math.abs(averagePercent)}%
        </div>
        <div className="Black">
          The peak {type} decreased by {Math.abs(peakPercent)}%
        </div>
      </div>
    );
  } else if (Number(averagePercent) === 0 && Number(peakPercent) === 0) {
    return (
      <div className="findings_col">
        <div className="Black">No difference in the average {type}</div>
        <div className="Black">No difference in the peak {type}</div>
      </div>
    );
  } else {
    return (
      <div className="findings_col">
        <div className="Black">
          The average {type} increased by {Math.abs(averagePercent)}%
        </div>
        <div className="Black">
          The peak {type} increased by {Math.abs(peakPercent)}%
        </div>
      </div>
    );
  }
};

export const calcPercentDiff = (dataSet1, dataSet2, res) => {
  if (res.dtype === "pool_faulting_rate" || res.dtype === "TopPoolFaultingRate")
    return "";

  if (
    res.dtype === "cache_hit_perc" &&
    dataSet1.length > 0 &&
    dataSet2.length > 0
  ) {
    let type = res.dtypedesc;

    let a1 = !_.isEmpty(dataSet1[0]) ? Number(dataSet1[0].avrg) : 0;
    let a2 = !_.isEmpty(dataSet2[0]) ? Number(dataSet2[0].avrg) : 0;

    let a3 = !_.isEmpty(dataSet1[1]) ? Number(dataSet1[1].avrg) : 0;
    let a4 = !_.isEmpty(dataSet2[1]) ? Number(dataSet2[1].avrg) : 0;

    let a5 = !_.isEmpty(dataSet1[2]) ? Number(dataSet1[2].avrg) : 0;
    let a6 = !_.isEmpty(dataSet2[2]) ? Number(dataSet2[2].avrg) : 0;

    let p1 = !_.isEmpty(dataSet1[0]) ? Number(dataSet1[0].peak) : 0;
    let p2 = !_.isEmpty(dataSet2[0]) ? Number(dataSet2[0].peak) : 0;

    let p3 = !_.isEmpty(dataSet1[1]) ? Number(dataSet1[1].peak) : 0;
    let p4 = !_.isEmpty(dataSet2[1]) ? Number(dataSet2[1].peak) : 0;

    let p5 = !_.isEmpty(dataSet1[2]) ? Number(dataSet1[2].peak) : 0;
    let p6 = !_.isEmpty(dataSet2[2]) ? Number(dataSet2[2].peak) : 0;

    let diffAvrg1 = a1 && a2 ? (a1 - a2) / a1 : "";
    let diffAvrg2 = a3 && a4 ? (a3 - a4) / a3 : "";
    let diffAvrg3 = a5 && a6 ? (a5 - a6) / a5 : "";
    let diffAvrgPercent1 =
      diffAvrg1 || diffAvrg1 === 0 ? _.round(diffAvrg1, 2) * 100 : "";
    let diffAvrgPercent2 =
      diffAvrg2 || diffAvrg2 === 0 ? _.round(diffAvrg2, 2) * 100 : "";
    let diffAvrgPercent3 =
      diffAvrg2 || diffAvrg3 === 0 ? _.round(diffAvrg3, 2) * 100 : "";
    let diffAvrgPercentToTwoDecimal1 =
      diffAvrgPercent1 || diffAvrgPercent1 === 0
        ? +diffAvrgPercent1.toFixed(2)
        : "";
    let diffAvrgPercentToTwoDecimal2 =
      diffAvrgPercent2 || diffAvrgPercent2 === 0
        ? +diffAvrgPercent2.toFixed(2)
        : "";
    let diffAvrgPercentToTwoDecimal3 =
      diffAvrgPercent3 || diffAvrgPercent3 === 0
        ? +diffAvrgPercent3.toFixed(2)
        : "";

    const foundAvreagePercent = [
      diffAvrgPercentToTwoDecimal1,
      diffAvrgPercentToTwoDecimal2,
      diffAvrgPercentToTwoDecimal3,
    ];

    let diffPeak1 = p1 && p2 ? (p1 - p2) / p1 : "";
    let diffPeak2 = p3 && p4 ? (p3 - p4) / p3 : "";
    let diffPeak3 = p5 && p6 ? (p5 - p6) / p5 : "";
    let diffPeakPercent1 =
      diffPeak1 || diffPeak1 === 0 ? _.round(diffPeak1, 2) * 100 : "";
    let diffPeakPercent2 =
      diffPeak2 || diffPeak2 === 0 ? _.round(diffPeak2, 2) * 100 : "";
    let diffPeakPercent3 =
      diffPeak3 || diffPeak3 === 0 ? _.round(diffPeak3, 2) * 100 : "";
    let diffPeakPercentToTwoDecimal1 =
      diffPeakPercent1 || diffPeakPercent1 === 0
        ? +diffPeakPercent1.toFixed(2)
        : "";
    let diffPeakPercentToTwoDecimal2 =
      diffPeakPercent2 || diffPeakPercent2 === 0
        ? +diffPeakPercent2.toFixed(2)
        : "";
    let diffPeakPercentToTwoDecimal3 =
      diffPeakPercent3 || diffPeakPercent3 === 0
        ? +diffPeakPercent3.toFixed(2)
        : "";

    const foundPeakPercent = [
      diffPeakPercentToTwoDecimal1,
      diffPeakPercentToTwoDecimal2,
      diffPeakPercentToTwoDecimal3,
    ];

    return foundAvreagePercent.map((ele, index) =>
      cacheHitPercentageCal(ele, foundPeakPercent[index], type)
    );
  }

  if (_.isEmpty(dataSet1) || _.isEmpty(dataSet2)) {
    return (
      <div className="findings_col">
        <div className="Black">
          Comperative analysis not available due to no data found.
        </div>
      </div>
    );
  }

  if ((dataSet1 || dataSet2) && res.dtype !== "cache_hit_perc") {
    let type = res.dtypedesc;
    let a1 =
      dataSet1?.length > 0 || !_.isEmpty(dataSet1) ? Number(dataSet1.avrg) : 0;
    let a2 =
      dataSet2?.length > 0 || !_.isEmpty(dataSet2) ? Number(dataSet2.avrg) : 0;
    let p1 =
      dataSet1?.length > 0 || !_.isEmpty(dataSet1) ? Number(dataSet1.peak) : 0;
    let p2 =
      dataSet2?.length > 0 || !_.isEmpty(dataSet2) ? Number(dataSet2.peak) : 0;
    let diffAvrg = (a1 - a2) / a1;
    let diffPeak = (p1 - p2) / p1;
    let diffAvrgPercent = _.round(diffAvrg, 2) * 100;
    let diffPeakPercent = _.round(diffPeak, 2) * 100;
    let diffAvrgPercentToTwoDecimal = diffAvrgPercent.toFixed(2);
    let diffPeakPercentToTwoDecimal = diffPeakPercent.toFixed(2);
    if (
      Number(diffAvrgPercentToTwoDecimal) > 0 &&
      Number(diffPeakPercentToTwoDecimal) < 0
    ) {
      return (
        <div className="findings_col">
          <div className="Black">
            The average {type} decreased by {diffAvrgPercentToTwoDecimal}%
          </div>
          <div className="Black">
            The peak {type} increased by {Math.abs(diffPeakPercentToTwoDecimal)}
            %
          </div>
        </div>
      );
    } else if (
      Number(diffAvrgPercentToTwoDecimal) < 0 &&
      Number(diffPeakPercentToTwoDecimal) > 0
    ) {
      return (
        <div className="findings_col">
          <div className="Black">
            The average {type} increased by{" "}
            {Math.abs(diffAvrgPercentToTwoDecimal)}%
          </div>
          <div className="Black">
            The peak {type} decreased by {diffPeakPercentToTwoDecimal}%
          </div>
        </div>
      );
    } else if (
      Number(diffAvrgPercentToTwoDecimal) < 0 &&
      Number(diffPeakPercentToTwoDecimal) < 0
    ) {
      return (
        <div className="findings_col">
          <div className="Black">
            The average {type} increased by{" "}
            {Math.abs(diffAvrgPercentToTwoDecimal)}%
          </div>
          <div className="Black">
            The peak {type} increased by {Math.abs(diffPeakPercentToTwoDecimal)}
            %
          </div>
        </div>
      );
    } else if (
      Number(diffAvrgPercentToTwoDecimal) > 0 &&
      Number(diffPeakPercentToTwoDecimal) > 0
    ) {
      return (
        <div className="findings_col">
          <div className="Black">
            The average {type} decreased by{" "}
            {Math.abs(diffAvrgPercentToTwoDecimal)}%
          </div>
          <div className="Black">
            The peak {type} decreased by {Math.abs(diffPeakPercentToTwoDecimal)}
            %
          </div>
        </div>
      );
    } else if (
      Number(diffAvrgPercentToTwoDecimal) === 0 &&
      Number(diffPeakPercentToTwoDecimal) === 0
    ) {
      return (
        <div className="findings_col">
          <div className="Black">No difference in the average {type}</div>
          <div className="Black">No difference in the peak {type}</div>
        </div>
      );
    } else {
      return (
        <div className="findings_col">
          <div className="Black">
            The average {type} increased by{" "}
            {Math.abs(diffAvrgPercentToTwoDecimal)}%
          </div>
          <div className="Black">
            The peak {type} increased by {Math.abs(diffPeakPercentToTwoDecimal)}
            %
          </div>
        </div>
      );
    }
  } else {
    return <div className="findings_col">No data is available</div>;
  }
};

export const findMinMax = (arr = []) => {
  let min = 0,
    max = 100;
  if (arr.length) {
    min = arr[0].y;
    max = arr[0].y;
  }
  for (let i = 1, len = arr.length; i < len; i++) {
    let v = arr[i].y;
    min = v < min ? v : min;
    max = v > max ? v : max;
  }

  return [min, max];
};

export const separateComma = (val) => {
  // remove sign if negative
  var sign = 1;
  if (val < 0) {
    sign = -1;
    val = -val;
  }
  // trim the number decimal point if it exists
  let num = val?.toString().includes(".")
    ? val?.toString().split(".")[0]
    : val?.toString();
  let len = num?.toString().length;
  let result = "";
  let count = 1;

  for (let i = len - 1; i >= 0; i--) {
    result = num.toString()[i] + result;
    if (count % 3 === 0 && count !== 0 && i !== 0) {
      result = "," + result;
    }
    count++;
  }

  // add number after decimal point
  if (val.toString().includes(".")) {
    result = result + "." + val.toString().split(".")[1];
  }
  // return result with - sign if negative
  return sign < 0 ? "-" + result : result;
};

const getSum = (items, prop) => {
  return items.reduce(function (a, b) {
    return a + b[prop];
  }, 0);
};

export const getRound = (value) => {
  let retVal = 100;
  if (value < 1) {
    retVal = 1;
  } else if (value < 10 && value > 1) {
    retVal = _.round(value);
  } else if (value < 50 && value > 10) {
    retVal = _.round(value, 1);
  } else if (value < 100 && value > 50) {
    retVal = _.round(value, -2);
  } else if (value < 1000 && value > 100) {
    retVal = _.round(value, -2);
  } else if (value < 10000 && value > 1000) {
    retVal = _.round(value, -3);
  } else if (value < 100000 && value > 10000) {
    retVal = _.round(value, -4);
  } else if (value < 10000000 && value > 100000) {
    retVal = _.round(value, -5);
  } else {
    retVal = _.round(value, -6);
  }
  return retVal;
};

export const getReportPeriod = (period) => {
  switch (period) {
    case "yesterday":
      return {name : "Yesterday", code : "yesterday"};
    case "lastweek":
      return {name : "Last Week", code : "lastweek"};
    case "currentweek":
      return {name: "Current Week", code: "currentweek"};
    case "currentmonth":
      return {name: "Current Month", code: "currentmonth"};
    case "previousmonth":
      return {name : "Previous Month", code : "previousmonth"};
  }
}
/*
export const showUtilizationTooltip = (e) => {
  for (var i = 0; i < utilizationChartList.length; i++) {
    if (utilizationChartList[i] != e.chart)
      utilizationChartList[i]?.toolTip?.showAtX(e.entries[0].xValue);
  }
};
export const showTrendsTooltip = (e) => {
  for (var i = 0; i < trendsChartList.length; i++) {
    if (trendsChartList[i] != e.chart)
      trendsChartList[i]?.toolTip?.showAtX(e.entries[0].xValue);
  }
};

export const hideUtilizationTooltip = (e) => {
  for (var i = 0; i < utilizationChartList.length; i++) {
    if (utilizationChartList[i] != e.chart)
      utilizationChartList[i]?.toolTip.hide();
  }
};
export const hideTrendsTooltip = (e) => {
  for (var i = 0; i < trendsChartList.length; i++) {
    if (trendsChartList[i] != e.chart) trendsChartList[i]?.toolTip?.hide();
  }
};
*/
