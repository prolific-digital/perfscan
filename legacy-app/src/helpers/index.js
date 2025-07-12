const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://api.rotorooter.perfscan.com/"
    : "http://localhost:8080/";
export const API_URL = API_BASE_URL; //http://localhost:8080/

export const CPU = [
  {
    id: 4,
    name: "CPW",
    key: "cpw",
  },
  {
    id: 1,
    name: "CPU Utilization",
    key: "cpu_utilization",
  },
  {
    id: 3,
    name: "Number of Cores",
    key: "no_of_cores",
  },
  {
    id: 2,
    name: "CPU ms",
    key: "cpu_ms",
  },
];
export const Disk = [
  {
    id: 1,
    name: "Disk Space Utilization",
    key: "disk_space_utilization",
  },

  {
    id: 2,
    name: "Disk Arm Utilization",
    key: "disk_arm_utilization",
  },
  {
    id: 3,
    name: "Disk Response Time",
    key: "disk_response_time",
  },
  {
    id: 4,
    name: "Total Disk Operations",
    key: "total_disk_ops",
  },

  {
    id: 5,
    name: "Read /Write Ratio",
    key: "read_write_ratio",
  },
  {
    id: 6,
    name: "Cache Hit %",
    key: "cache_hit_perc",
  },
  {
    id: 7,
    name: "Cache Hit Misses",
    key: "cache_hit_misses",
  },
];
export const Memory = [
  {
    id: 1,
    name: "Machine Pool Faulting",
    key: "machine_pool_faulting",
  },
  {
    id: 2,
    name: "Faulting rate (Fault / Sec)",
    key: "faulting_rate",
  },
  {
    id: 3,
    name: "Top Pool Faulting Rate",
    key: "top_pool_faulting_rate",
  },
  {
    id: 4,
    name: "Memory Size vs Faulting",
    key: "memory_size_faulting",
  },
  {
    id: 5,
    name: "Specific Pool Faulting Rate",
    key: "pool_faulting_rate",
  },
  {
    id: 6,
    name: "Pool Number",
    key: "pool_number",
  },
];
export const Other = [
  {
    id: 2,
    name: "5250 Response Time",
    key: "response_time_5250",
  },
  {
    id: 3,
    name: "Total Transactions",
    key: "total_transactions",
  },
  {
    id: 1,
    name: "Executive Summary",
    key: "executing_summary",
  },
  {
    id: 4,
    name: "Top Jobs Reporting",
    key: "top_jobs_utilisation",
  },
  {
    id: 5,
    name: "Ethernet Line Utilization",
    key: "ethernet_line_utilization",
  },
  {
    id: 6,
    name: "System Specifications",
    key: "system_specifications",
  },
  // {
  //   id: 6,
  //   name: "Change Growth %",
  //   key: "change_growth_perc",
  // },
];

export const CPU_UTILIZATION_1 = {
  showInLegend: "true",
  name: "System",
  yValueFormatString: "#,##0.##",
  color: "#11d011",
  xValueType: "dateTime",
  xValueFormatString: "DD MMM YY HH:mm",
  legendMarkerType: "square",
  // dataPoints: getDataPoints(originaldata, "syscpu"),
};

export const CPU_UTILIZATION_2 = {
  showInLegend: "true",
  name: "Interactive",
  yValueFormatString: "#,##0.##",
  color: "#085ca9",
  xValueType: "dateTime",
  xValueFormatString: "DD MMM YY HH:mm",
  legendMarkerType: "square",
};
export const CPU_UTILIZATION_3 = {
  showInLegend: "true",
  name: "Batch",
  yValueFormatString: "#,##0.##",
  color: "#f4c30f",
  xValueType: "dateTime",
  xValueFormatString: "DD MMM YY HH:mm",
  legendMarkerType: "square",
};

export const NO_OF_CORES = {
  showInLegend: "true",
  name: "Number of Cores",
  color: "#4a47c4",
  xValueType: "dateTime",
  xValueFormatString: "DD MMM YY HH:mm",
  yValueFormatString: "#.##",
  legendMarkerType: "square",
};
export const NO_OF_CORES_TRENDS = {
  showInLegend: "true",
  name: "Number of Cores with Trends",
  yValueFormatString: "#,##0.##",
  color: "#1976d2",
  xValueType: "dateTime",
  xValueFormatString: "DD MMM YY HH:mm",
  legendMarkerType: "square",
};

export const TRENDS = {
  name: "CPU Utilization",
  showInLegend: "true",
  yValueFormatString: "#,##0.##",
  color: "#1976d2",
  xValueType: "dateTime",
  xValueFormatString: "DD MMM YY HH:mm",
  legendMarkerType: "square",
};

export const DISK_UTILIZATION = {
  name: "CPU Utilization",
  showInLegend: "true",
  yValueFormatString: "#,##0.##",
  color: "#1976d2",
  xValueType: "dateTime",
  xValueFormatString: "DD MMM YY HH:mm",
  legendMarkerType: "square",
};

export const DISK_ARM_UTILIZATION = {
  name: "Disk Arm Utilization",
  showInLegend: "true",
  yValueFormatString: "#,##0.##",
  color: "#800040",
  xValueType: "dateTime",
  xValueFormatString: "DD MMM YY HH:mm",
  legendMarkerType: "square",
};

export const DISK_ARM_TRENDS = {
  name: "Disk Arm Utilization",
  showInLegend: "true",
  yValueFormatString: "#,##0.##",
  color: "#800040",
  xValueType: "dateTime",
  xValueFormatString: "DD MMM YY HH:mm",
  legendMarkerType: "square",
};

export const CPU_MS = {
  showInLegend: "true",
  name: "ms used",
  color: "#4a47c4",
  xValueType: "dateTime",
  xValueFormatString: "DD MMM YY HH:mm",
  yValueFormatString: "#.##",
  legendMarkerType: "square",
};
export const CPU_MS_TRENDS = {
  showInLegend: "true",
  name: "ms used",
  yValueFormatString: "#,##0.##",
  color: "#4a47c4",
  xValueType: "dateTime",
  xValueFormatString: "DD MMM YY HH:mm",
  legendMarkerType: "square",
};
