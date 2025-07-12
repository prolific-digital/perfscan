const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://api.staging.perfscan.com/"
    : "http://localhost:8080/";
export const API_URL = API_BASE_URL; //http://localhost:8080/
const APP_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://staging.perfscan.com/"
    : "http://localhost:3000/";
export const APP_URL = APP_BASE_URL;

export const API_GRAPHQL =  
    process.env.NODE_ENV === "production"
    ? "https://rtapi-ae.staging.perfscan.com/graphql"
    : "http://localhost:8082/graphql"

export const API_WEB_SOCKET =  
    process.env.NODE_ENV === "production"
    ? "wss://rtapi-ae.staging.perfscan.com/graphql"
    : "ws://localhost:8082/graphql"

export const client_name = process.env.REACT_APP_CLIENT;
export const allowedClients = ["fnts", "Perfscan", "AuctionEdge", "Mainline"];

export const CPU = [
  {
    id: 1,
    name: "CPU Utilization",
    key: "cpu_utilization",
  },
  {
    id: 2,
    name: "CPU ms",
    key: "cpu_ms",
  },
  {
    id: 3,
    name: "Number of Cores",
    key: "no_of_cores",
  },
  {
    id: 4,
    name: "CPW",
    key: "cpw",
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
  // {
  //   id: 6,
  //   name: "Cache Hit %",
  //   key: "cache_hit_perc",
  // },
  /*{
    id: 7,
    name: "Cache Hit Misses",
    key: "cache_hit_misses",
  },*/
];
export const Memory = [
  {
    id: 1,
    name: "Machine Pool Faulting",
    key: "machine_pool_faulting",
  },
  {
    id: 2,
    name: "Total Faulting Rate (Faults / sec)",
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
];
export const Other = [
  {
    id: 1,
    name: "5250 Response Time",
    key: "response_time_5250",
  },
  {
    id: 2,
    name: "Total Transactions",
    key: "total_transactions",
  },
  {
    id: 3,
    name: "Ethernet Line Utilization",
    key: "ethernet_line_utilization",
  },
  {
    id: 4,
    name: "Top Jobs Reporting",
    key: "top_jobs_utilisation",
  },
  {
    id: 5,
    name: "Executive Summary",
    key: "executing_summary",
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

export const CPU_UTILIZATION_SYS = {
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

export const CPU_UTILIZATION_INT = {
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

export const CPU_UTILIZATION_BATCH = {
  showInLegend: "true",
  name: "Batch",
  yValueFormatString: "#,##0.##",
  color: "#f4c30f",
  xValueType: "dateTime",
  xValueFormatString: "DD MMM YY HH:mm",
  legendMarkerType: "square",
};
export const CPU_UTILIZATION_4 = {
  showInLegend: "true",
  name: "Total",
  yValueFormatString: "#,##0.##",
  color: "#f4c30f",
  xValueType: "dateTime",
  xValueFormatString: "DD MMM YY HH:mm",
  legendMarkerType: "square",
};
export const NO_OF_CORES = {
  showInLegend: "true",
  name: "Number of Cores",
  color: "#214a66",
  xValueType: "dateTime",
  xValueFormatString: "DD MMM YY HH:mm",
  yValueFormatString: "#.##",
  legendMarkerType: "square",
};
export const NO_OF_CORES_TRENDS = {
  showInLegend: "true",
  name: "Number of Cores with Trends",
  yValueFormatString: "#,##0.##",
  color: "#214a66",
  xValueType: "dateTime",
  xValueFormatString: "DD MMM YY HH:mm",
  legendMarkerType: "square",
};

export const CPW_UTILIZATION_1 = {
  showInLegend: "true",
  name: "Interactive",
  yValueFormatString: "#,##0.##",
  color: "#002D89",
  xValueType: "dateTime",
  xValueFormatString: "DD MMM YY HH:mm",
  legendMarkerType: "square",
};

export const CPW_UTILIZATION_INT = {
  showInLegend: "true",
  name: "Interactive",
  yValueFormatString: "#,##0.##",
  color: "#002D89",
  xValueType: "dateTime",
  xValueFormatString: "DD MMM YY HH:mm",
  legendMarkerType: "square",
};

export const CPW_UTILIZATION_2 = {
  showInLegend: "true",
  name: "Batch",
  yValueFormatString: "#,##0.##",
  color: "#FFD276",
  xValueType: "dateTime",
  xValueFormatString: "DD MMM YY HH:mm",
  legendMarkerType: "square",
};

export const CPW_UTILIZATION_BATCH = {
  showInLegend: "true",
  name: "Batch",
  yValueFormatString: "#,##0.##",
  color: "#FFD276",
  xValueType: "dateTime",
  xValueFormatString: "DD MMM YY HH:mm",
  legendMarkerType: "square",
};

export const CPW_UTILIZATION_TOTAL = {
  showInLegend: "true",
  name: "Total",
  yValueFormatString: "#,##0.##",
  color: "#805500",
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

export const DISK_SPACE_UTILIZATION = {
  name: "Disk Space Utilization",
  showInLegend: "true",
  yValueFormatString: "#,##0.##",
  color: "#1976d2",
  xValueType: "dateTime",
  xValueFormatString: "DD MMM YY HH:mm",
  legendMarkerType: "square",
};

export const DISK_SPACE_TRENDS = {
  name: "Disk Space Utilizaion Trends",
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

export const READS = {
  showInLegend: "true",
  name: "Reads/Write ratio %",
  color: "#001933",
  xValueType: "dateTime",
  xValueFormatString: "DD MMM YY HH:mm",
  yValueFormatString: "#.## reads /sec",
  legendMarkerType: "square",
};

export const WRITES = {
  showInLegend: "true",
  name: "Writes",
  color: "#001933",
  xValueType: "dateTime",
  xValueFormatString: "DD MMM YY HH:mm",
  yValueFormatString: "#.## writes / sec",
  legendMarkerType: "square",
};

export const DISK_OPERATIONS = {
  name: "Reads",
  showInLegend: "true",
  yValueFormatString: "#,##0.##",
  color: "#3399ff",
  xValueType: "dateTime",
  xValueFormatString: "DD MMM YY HH:mm",
  legendMarkerType: "square",
};

export const DISK_OPERATIONS_TRENDS = {
  name: "Writes ",
  showInLegend: "true",
  yValueFormatString: "#,##0.##",
  color: "#3399ff",
  xValueType: "dateTime",
  xValueFormatString: "DD MMM YY HH:mm",
  legendMarkerType: "square",
};

export const DISK_RESPONSE = {
  name: "Disk Opearation",
  showInLegend: "true",
  yValueFormatString: "#,##0.##",
  color: "#3399ff",
  xValueType: "dateTime",
  xValueFormatString: "DD MMM YY HH:mm",
  legendMarkerType: "square",
};

export const DISK_RESPONSE_TRENDS = {
  name: "Disk Opearation ",
  showInLegend: "true",
  yValueFormatString: "#,##0.##",
  color: "#3399ff",
  xValueType: "dateTime",
  xValueFormatString: "DD MMM YY HH:mm",
  legendMarkerType: "square",
};

export const CACHE_HIT = {
  showInLegend: "true",
  yValueFormatString: "#,##0.##",
  color: "#3399ff",
  xValueType: "dateTime",
  xValueFormatString: "DD MMM YY HH:mm",
  legendMarkerType: "square",
};

export const CACHE_HIT_TRENDS = {
  showInLegend: "true",
  yValueFormatString: "#,##0.##",
  color: "#3399ff",
  xValueType: "dateTime",
  xValueFormatString: "DD MMM YY HH:mm",
  legendMarkerType: "square",
};

export const MACHINE_POOL = {
  name: "Machine Pool Utilization",
  showInLegend: "true",
  yValueFormatString: "#,##0.##",
  color: "#1976d2",
  xValueType: "dateTime",
  xValueFormatString: "DD MMM YY HH:mm",
  legendMarkerType: "square",
};

export const MACHINE_POOL_TRENDS = {
  name: "Machine Pool Trends",
  showInLegend: "true",
  yValueFormatString: "#,##0.##",
  color: "#1976d2",
  xValueType: "dateTime",
  xValueFormatString: "DD MMM YY HH:mm",
  legendMarkerType: "square",
};

export const sysKeys = {
  model: "Model",
  feature_code: "Feature Code",
  serial_number: "Serial Number",
  os: "Operating System (OS) Release",
  pgroup: "P Group",
  mhz: "MHz",
  total_frame_cores: "Total Processors",
  total_cpw_rating: "Total CPW Rating",
  frame_memory: "Total Frame Memory (GB)",
  lpar_cores: "Processing Units",
  virtuals: "Virtuals",
  mode: "Mode",
  cpw_rating: "CPW Rating",
  total_asps: "Total ASPs",
  total_arms: "Total Arms",
  lpar_dasd: "Total DASD Installed (GB)",
  disk_space_utilization: "Disk Space Utilization",
};

export const CAPACITY_FILTER = {
  busyday: "",
  sysid: 0,
  peak: 0,
  current: {
    cores: 1,
    cpw: 1,
    max_cores: 1,
    max_cpw: 1,
  }, //used for header
  proposed: {
    cores: 1,
    cpw: 1,
    max_cores: 1,
    max_cpw: 1,
  },
  sys_current: {
    entity_name: "",
    entity_description: "",
    serial_number: "",
    model: "",
    feature_code: "",
    model_config_id: -1,
  }, //used for header
  sys_proposed: {
    model_config_id: -1,
    model: "",
    feature_code: "",
    entity_name: "",
    entity_description: "",
    serial_number: "",
  }, //used for header
  sysOpt: "proposed",
  userId: 0,
  perc_growth: 0,
  rptType: "capacity_analysis",
  modelid: 2,
};


export const NEW_REPORT = {
  system: {
    id: 0,
    name: ''
  },
  user_id: 0,
  report_type: '',
  template: {},
  report_name: '',
  report_desc: '',
  report_metrix: {},
  report_schedule: {
    disabled: false, // always enabled
    _frequency: '',
    _hour: '00', //initial time hour
    _minute: '00', //initial time minute
    _days: [],
    _months: [],
    type: '',
    hour: 0,
    minute: '',
    day_of_week: '',
    day_of_month: '',
    day: '',
    frequencyObject: {},
  },
  email_template: '',
  report_period: '',
  pool: [],
  ethernet: '',
  recipients: []
};

export const EDIT_REPORT = {
  report_id: 0,
  cronicle_jobid: '',
  report_name: "",
  report_description: "",
  report_type: { name: 'Historical', code: 'historical' },
  report_schedule: {
    disabled: false, // always enabled
    frequency: '',
    days: [],
    months: [],
    day: "",
    hour: "00",
    type: "",
    minute: "00",
    day_of_week: "",
    day_of_month: '',
    day: '',
    frequencyObject: {},
  },
  report_metrix: {
    cpu_ms: false,
    no_of_cores: false,
    faulting_rate: false,
    cache_hit_perc: false,
    total_disk_ops: false,
    cpu_utilization: false,
    read_write_ratio: false,
    executing_summary: false,
    disk_response_time: false,
    pool_faulting_rate: false,
    response_time_5250: false,
    total_transactions: false,
    disk_arm_utilization: false,
    memory_size_faulting: false,
    top_jobs_utilisation: false,
    machine_pool_faulting: false,
    system_specifications: false,
    disk_space_utilization: false,
    top_pool_faulting_rate: false,
    ethernet_line_utilization: false
  },
  system: {
    id: 0,
    entity_name: "",
    entity_description: ""
  },
  template: {
    template_name: "",
    config_id: 0,
    sel_template: ""
  },
  report_period: {
    name: "",
    code: ""
  },
  pool: null,
  ethernet: null,
  recipients: []
}