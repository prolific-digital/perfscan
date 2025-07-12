import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
  cpuGraphData: {},
  numCoresGraphData: {},
  response5250GraphData: {},
  totalTransactionGraphData: {},
  ethernetUtilGraphData: {},
  diskSpaceUtilGraphData: {},
  diskArmUtilGraphData: {},
  diskResponseTimeGraphData: {},
  diskOperationsGraphData: {},
  totalFaultingGraphData: {},
  topJobsData: {},
};

const enterpriseServerRTData = createSlice({
  name: "enterpriseserverdata",
  initialState,
  reducers: {
    systemsAndFramesData: (state, { payload }) => {
      state.data = payload;
    },
    cpuGraphDataHandler: (state, { payload }) => {
      state.cpuGraphData = payload;
    },
    numCoresGraphDataHandler: (state, { payload }) => {
      state.numCoresGraphData = payload;
    },
    response5250GraphDataHandler: (state, { payload }) => {
      state.response5250GraphData = payload;
    },
    totalTransactionGraphDataHandler: (state, { payload }) => {
      state.totalTransactionGraphData = payload;
    },
    ethernetUtilGraphDataHandler: (state, { payload }) => {
      state.ethernetUtilGraphData = payload;
    },
    diskSpaceUtilizationGraphDataHandler: (state, { payload }) => {
      state.diskSpaceUtilGraphData = payload;
    },
    diskArmUtilizationGraphDataHandler: (state, { payload }) => {
      state.diskArmUtilGraphData = payload;
    },
    diskResponseTimeGraphDataHandler: (state, { payload }) => {
      state.diskResponseTimeGraphData = payload;
    },
    diskOperationsGraphDataHandler: (state, { payload }) => {
      state.diskOperationsGraphData = payload;
    },
    totalFaultingChartGraphDataHandler: (state, { payload }) => {
      state.totalFaultingGraphData = payload;
    },
    topJobsTableDataHandler: (state, { payload }) => {
      state.topJobsData = payload;
    },
  },
});

export const {
  systemsAndFramesData,
  cpuGraphDataHandler,
  numCoresGraphDataHandler,
  response5250GraphDataHandler,
  totalTransactionGraphDataHandler,
  ethernetUtilGraphDataHandler,
  diskSpaceUtilizationGraphDataHandler,
  diskArmUtilizationGraphDataHandler,
  diskResponseTimeGraphDataHandler,
  diskOperationsGraphDataHandler,
  totalFaultingChartGraphDataHandler,
  topJobsTableDataHandler
} = enterpriseServerRTData.actions;

export const systemFrameData = (state) => state.enterpriseserverdata.data;
export const cpuGphData = (state) => state.enterpriseserverdata.cpuGraphData;
export const numCoresGphData = (state) =>
  state.enterpriseserverdata.numCoresGraphData;
export const response5250GphData = (state) =>
  state.enterpriseserverdata.response5250GraphData;
export const totalTransactionGphData = (state) =>
  state.enterpriseserverdata.totalTransactionGraphData;
export const ethernetUtilGphData = (state) =>
  state.enterpriseserverdata.ethernetUtilGraphData;
export const diskSpaceUtilsGphData = (state) =>
  state.enterpriseserverdata.diskSpaceUtilGraphData;
export const diskArmUtilGphData = (state) =>
  state.enterpriseserverdata.diskArmUtilGraphData;
export const diskResTimeGphData = (state) =>
  state.enterpriseserverdata.diskResponseTimeGraphData;
export const diskOperationsGphData = (state) =>
  state.enterpriseserverdata.diskOperationsGraphData;
export const totalFaultingGphData = (state) =>
  state.enterpriseserverdata.totalFaultingGraphData;
export const topJobsTableData = (state) =>
  state.enterpriseserverdata.topJobsData;


export default enterpriseServerRTData.reducer;
