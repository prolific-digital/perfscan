import { queryByAltText } from "@testing-library/react";
import axios from "axios";
import https from "https";
import { getCookie } from "../helpers/cookiesHelper";
import { API_URL } from "../typeCodes";

//  axio header setup
axios.defaults.baseURL = API_URL;

//should be set only for development
if (process.env.NODE_ENV === "development") {
  const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
  });
  axios.defaults.httpsAgent = httpsAgent;
  // eslint-disable-next-line no-console
  console.log(process.env.NODE_ENV, `RejectUnauthorized is disabled.`);
}

axios.defaults.headers.common["Accept"] = "application/json, text/plain, */*";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    const token = getCookie("token");
    if (token) {
      config.headers.Authorization = "Bearer " + token;
    }
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

// start commmon apis

export const getMKeys = (data) => {
  const userId = getCookie("userId");
  return axios.get(`api/mkeys/${userId}`);
};

export const getPoolsListSys = (sysID, metricID) => {
  return axios.get(`/api/sys/${sysID}/pool/${metricID}`);
};

export const getPoolsList = (metricID) => {
  return axios.get(`/api/global/${metricID}`);
};

// end commmon apis

// start auth apis
export const login = (data) => {
  return axios.post("api/auth/login", data);
};
export const register = (data) => {
  return axios.post("api/auth/login", data);
};
//resetPassword apis
export const getSecurityQuestion = () => {
  return axios.get("api/auth/getSecurityQuestions");
};
export const resetPassword = (data) => {
  return axios.post("api/auth/validate", data);
};

//update profile details
export const updateUserProfile = (data) => {
  return axios.post("api/auth/updateAnswer", data);
};

// end auth apis

//start timeline APIs
// api/whatchanged/timeline
export const getTimelineData = () => {
  return axios.get("api/whatchanged/timeline");
};
// end of API timelines
// start systems api
export const getAllSystems = () => {
  return axios.get("api/entity");
};

export const getPDF = (data) => {
  return axios.get("api/renderpdf",data);
};
export const getAllSchedulerSystems = () => {
  return axios.get("/api/entity/sys/data");
}

export const getAllFrames = () => {
  return axios.get("api/entity/frames/frame");
};

export const getProposedSystems = () => {
  return axios.get("api/cp/proposedsystem");
};

export const getSpecificSystem = (systemId) => {
  return axios.get(`api/entity/${systemId}`);
};
export const updateEntity = (id, body) => {
  return axios.put(`api/entity/${id}`, body);
};

export const updateFrame = (id, body) => {
  return axios.put(`api/entity/frames/${id}`, body);
};

export const deleteSystem = (id) => {
  return axios.delete(`api/entity/${id}`);
};
export const ekeys = (id) => {
  return axios.get(`api/ekeys/${id}`);
};
// end systems api

//start user management api
export const getAllUsers = () => {
  return axios.get("api/auth/getAllUsers");
};

export const getUserById = (userId) => {
  return axios.get(`api/auth/getUserDetails?userId=${userId}`);
};

export const addUser = (data) => {
  return axios.post("api/auth/register?", data);
};

export const editUser = (data) => {
  return axios.put(`api/auth/updateUser`, data);
};

export const deleteUser = (id) => {
  return axios.delete(`api/auth/deleteUser/${id}`);
};

//end user management api

//starts add system apis
export const getEtypes = () => {
  return axios.get(`api/etypes`);
};
export const getSpecificEtypes = (id) => {
  return axios.get(`api/etypes/${id}`);
};
export const addEntity = (data) => {
  return axios.post("api/entity", data);
};

export const addFrame = (data) => {
  return axios.post("api/entity/frame", data);
};

export const getManagedSystemMetrics = (rptId) => {
  return axios.get(`api/fetch/metrics?rptId=${rptId}`);
};

//end add system apis

//start metrics apis
export const getSystemMetrics = (systemID = 1, userID = 1) => {
  return axios.get(`api/metrics/user/${userID}/sys/${systemID}`);
};

export const getReportMetrics = (reportID = 1) => {
  return axios.get(`/api/scheduler/report/metrix/${reportID}`);
};

export const getGlobalMetrics = (userID = 1) => {
  return axios.get(`api/metrics/${userID}`);
};
export const updateSystemMetrics = (id, data) => {
  return axios.put(`api/metrics/${id}`, data);
};
export const updateGlobalMetrics = (id, data) => {
  return axios.put(`api/metrics/${id}`, data);
};
//end metrics apis

// perormance guid start
export const getGlobalPerformanceGuide = (userID) => {
  //const userId = getCookie("userId");
  return axios.get(`api/perf/${userID}`);
};
export const getSystemPerformanceGuide = (systemId, userID) => {
  return axios.get(`api/perf/sys/${systemId}/user/${userID}`);
};
export const updateGlobalPerformanceGuide = (metricsId, body) => {
  return axios.put(`api/perf/${metricsId}`, body);
};
export const updateSystemPerformanceGuide = (metricsId, body) => {
  return axios.put(`api/perf/${metricsId}`, body);
};

export const updateReportData = (data) => {
  return axios.post(`api/save/updateReport`, data);
};
// perormance guide end

// change events start
export const getAllEvents = (id) => {
  return axios.get(`api/event/sys/${id}`);
};
export const getEventsTypeList = () => {
  return axios.get(`api/etypes/evt/10`);
};
export const getEventsSubTypeList = (id) => {
  return axios.get(`api/etypes/evt/${id}`);
};
export const createAEvent = (data) => {
  return axios.post("api/event", data);
};

export const updateAEvent = (data, id, sysid) => {
  return axios.put(`api/event/${id}?sysid=${sysid}`, data);
};

export const deleteEvent = (id) => {
  return axios.delete(`api/event/${id}`);
};

export const deleteReport = (id) => {
  return axios.delete(`api/save/deleteReport?rptId=${id}`);
};

export const getSpecificEvent = (eventID) => {
  return axios.get(`api/event/${eventID}`);
};
// change events end

// start performance page
export const getTopJobs = (queryparams) => {
  const searchParams = new URLSearchParams(queryparams);
  let query = searchParams.toString();
  return axios.get(`api/topjobs?${query}`);
};
export const getTopJobsChart = (queryparams, jobType) => {
  const searchParams = new URLSearchParams(queryparams);
  let query = searchParams.toString();
  // return axios.get(`/api/topjobs/pie?${query}&jobtype=faults`);
  return axios.get(`/api/topjobs/pie?sysid=23&jobtype=${jobType}`);
};

//fetch what changed analysis data:

export const getChangesAnalysisData = (queryparams) => {
  const searchParams = new URLSearchParams(queryparams);
  let query = searchParams.toString();
  let tempEDate = `edate=${queryparams.edate} ${queryparams.etime}&sdate=${queryparams.sdate} ${queryparams.stime}`;
  return axios.get(`/api/whatchanged?${query}`);
};

//start executive report

export const getCPUExecutiveReport = (queryparams) => {
  const searchParams = new URLSearchParams(queryparams);
  let query = searchParams.toString();
  return axios.get(`api/exrpt/cpu?${query}`);
};
export const getDiskExecutiveReport = (queryparams) => {
  const searchParams = new URLSearchParams(queryparams);
  let query = searchParams.toString();
  return axios.get(`api/exrpt/disk?${query}`);
};
export const getMemoryExecutiveReport = (queryparams) => {
  const searchParams = new URLSearchParams(queryparams);
  let query = searchParams.toString();
  return axios.get(`api/exrpt/memory?${query}`);
};
export const getOtherExecutiveReport = (queryparams) => {
  const searchParams = new URLSearchParams(queryparams);
  let query = searchParams.toString();
  return axios.get(`api/exrpt/other?${query}`);
};

//end executive report

export const getCPUData = (queryparams) => {
  const searchParams = new URLSearchParams(queryparams);
  let query = searchParams.toString();
  return axios.get(`api/cpudata?${query}`);
};

export const getDiskSpaceUtilization = (queryparams) => {
  const searchParams = new URLSearchParams(queryparams);
  let query = searchParams.toString();
  return axios.get(`api/dsudata?${query}`);
};
export const getNumberOfCors = (queryparams) => {
  const searchParams = new URLSearchParams(queryparams);
  let query = searchParams.toString();
  return axios.get(`api/ncoresdata?${query}`);
};
export const getCPUMs = (queryparams) => {
  const searchParams = new URLSearchParams(queryparams);
  let query = searchParams.toString();
  return axios.get(`api/cpumsdata?${query}`);
};
export const getDiskArm = (queryparams) => {
  const searchParams = new URLSearchParams(queryparams);
  let query = searchParams.toString();
  return axios.get(`api/daudata?${query}`);
};
export const getReadWrite = (queryparams) => {
  const searchParams = new URLSearchParams(queryparams);
  let query = searchParams.toString();
  return axios.get(`api/rwrdata?${query}`);
};

export const getDiskOperations = (queryparams) => {
  const searchParams = new URLSearchParams(queryparams);
  let query = searchParams.toString();
  return axios.get(`api/tdodata?${query}`);
};
export const getDiskResponse = (queryparams) => {
  const searchParams = new URLSearchParams(queryparams);
  let query = searchParams.toString();
  return axios.get(`api/drtdata?${query}`);
};
export const getMachinePoolFaulting = (queryparams) => {
  const searchParams = new URLSearchParams(queryparams);
  let query = searchParams.toString();
  return axios.get(`api/mpfdata?${query}`);
};
export const getTotalFaultingRate = (queryparams) => {
  const searchParams = new URLSearchParams(queryparams);
  let query = searchParams.toString();
  return axios.get(`api/frdata?${query}`);
};
export const getTopPoolFaultingRate = (queryparams) => {
  const searchParams = new URLSearchParams(queryparams);
  let query = searchParams.toString();
  return axios.get(`api/tpfrdata?${query}`);
};
export const getMemorySizeVsFaulting = (queryparams) => {
  const searchParams = new URLSearchParams(queryparams);
  let query = searchParams.toString();
  return axios.get(`api/mvfdata?${query}`);
};
export const getSpecificPoolFaulting = (queryparams) => {
  const searchParams = new URLSearchParams(queryparams);
  let query = searchParams.toString();
  return axios.get(`api/spfdata?${query}`);
};
export const getResponseTime5250 = (queryparams) => {
  const searchParams = new URLSearchParams(queryparams);
  let query = searchParams.toString();
  return axios.get(`api/5250data?${query}`);
};
export const getTotalTransactions = (queryparams) => {
  const searchParams = new URLSearchParams(queryparams);
  let query = searchParams.toString();
  return axios.get(`api/totrdata?${query}`);
};
export const getCacheHitPercentage = (queryparams) => {
  const searchParams = new URLSearchParams(queryparams);
  let query = searchParams.toString();
  return axios.get(`api/chpdata?${query}`);
};
export const getEthernetUtilization = (queryparams) => {
  const searchParams = new URLSearchParams(queryparams);
  let query = searchParams.toString();
  return axios.get(`api/ethdata?${query}`);
};

//end performance page


//Scheduler APIS

export const deleteScheduledReport = (id, jobid) => {
if(jobid === "undefined" || jobid === 0 || jobid === null) {
  return axios.delete(`api/scheduler/report/${id}`);
}else{
  return axios.delete(`api/scheduler/report/${id}/${jobid}`);
}
}

export const deleteTemplate = (id) => {
  return axios.delete(`api/templates/${id}`);
}
//Thunked APIs
