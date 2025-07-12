import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseAPI from "../../../services/baseApi";

export const fetchAsyncBusyDays = createAsyncThunk(
  "capacityplanning/fetchAsyncBusyDays",
  async (qd) => {
    const response = await baseAPI.get(
      `api/cp/getmultisystemcpu/${qd.userid}/${qd.sys}/10`
    );
    return response.data;
  }
);

export const fetchAsyncCPWExSummary = createAsyncThunk(
  "capacityplanning/fetchAsyncCPWExSummary",
  async (qd) => {
    const response = await baseAPI.post(`/api/cp/exrptcpw`, qd);
    return response.data;
  }
);

export const fetchAsyncCPWGraph = createAsyncThunk(
  "capacityplanning/fetchAsyncCPWGraph",
  async (qd) => {
    const response = await baseAPI.post(`/api/cp/graphcpw`, qd);
    return response.data;
  }
);

export const fetchAsyncAutoProposedSys = createAsyncThunk(
  "capacityplanning/fetchAsyncAutoProposedSys",
  async (qd) => {
    const response = await baseAPI.post(`/api/cp/automaticps`, qd);
    return response.data;
  }
);

export const fetchAsyncCurrentSysAutoProposedSys = createAsyncThunk(
  "capacityplanning/fetchAsyncCurrentSysAutoProposedSys",
  async (qd) => {
    const response = await baseAPI.post(`api/cp/showmysystems`, qd);
    return response.data;
  }
);

const initialState = {
  current: {
    cores: 1,
    cpw: 1,
    max_cores: 1,
    max_cpw: 1,
  },
  proposed: {
    cores: 1,
    cpw: 1,
    max_cores: 1,
    max_cpw: 1,
  },
  sys_current: {},
  sys_proposed: {},
  sysOpt: "proposed",
  autoSys: false,
  busyday: "",
  proposedgrowth: 0,
  busydays: { loading: false, data: [], error: "" },
  capactiyExSumarry: { loading: false, data: [], error: "" },
  capacityGraph: { loading: false, data: [], error: "" },
  autoProposedSys: { loading: false, data: [], error: "" },
  currentAutoProposedSys: { loading: false, data: [], error: "" },
};

const capacityPlanningSlice = createSlice({
  name: "capacityplanning",
  initialState,
  reducers: {
    setNCoreCurrent: (state, { payload }) => {
      state.current.cores = payload;
    },
    setNCoreProposed: (state, { payload }) => {
      state.proposed.cores = payload;
    },
    setMaxCoresCurrent: (state, { payload }) => {
      state.current.max_cores = payload;
    },
    setMaxCoresProposed: (state, { payload }) => {
      state.proposed.max_cores = payload;
    },
    setCPWCurrent: (state, { payload }) => {
      state.current.cpw = payload;
    },
    setCPWProposed: (state, { payload }) => {
      state.proposed.cpw = payload;
    },
    setMaxCPWCurrent: (state, { payload }) => {
      state.current.max_cpw = payload;
    },
    setMaxCPWProposed: (state, { payload }) => {
      state.proposed.max_cpw = payload;
    },
    setBusyDay: (state, { payload }) => {
      state.busyday = payload;
    },
    setProposedGrowth: (state, { payload }) => {
      state.proposedgrowth = payload;
    },
    setSysOpt: (state, { payload }) => {
      state.sysOpt = payload;
    },
    setSysCurret: (state, { payload }) => {
      state.sys_current = payload;
    },
    setSysProposed: (state, { payload }) => {
      state.sys_proposed = payload;
    },
    setAutoSys: (state, { payload }) => {
      state.autoSys = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncBusyDays.pending, (state) => {
      state.busydays.loading = true;
    });
    builder.addCase(fetchAsyncBusyDays.fulfilled, (state, action) => {
      state.busydays.loading = false;
      state.busydays.data = action.payload;
      state.busydays.error = "";
    });
    builder.addCase(fetchAsyncBusyDays.rejected, (state, action) => {
      state.busydays.loading = false;
      state.busydays.data = [];
      state.busydays.error = action.error.message;
    });
    builder.addCase(fetchAsyncCPWExSummary.pending, (state) => {
      state.capactiyExSumarry.loading = true;
    });
    builder.addCase(fetchAsyncCPWExSummary.fulfilled, (state, action) => {
      state.capactiyExSumarry.loading = false;
      state.capactiyExSumarry.data = action.payload;
      state.capactiyExSumarry.error = "";
    });
    builder.addCase(fetchAsyncCPWExSummary.rejected, (state, action) => {
      state.capactiyExSumarry.loading = false;
      state.capactiyExSumarry.data = [];
      state.capactiyExSumarry.error = action.error.message;
    });
    builder.addCase(fetchAsyncCPWGraph.pending, (state) => {
      state.capacityGraph.loading = true;
    });
    builder.addCase(fetchAsyncCPWGraph.fulfilled, (state, action) => {
      state.capacityGraph.loading = false;
      state.capacityGraph.data = action.payload;
      state.capacityGraph.error = "";
    });
    builder.addCase(fetchAsyncCPWGraph.rejected, (state, action) => {
      state.capacityGraph.loading = false;
      state.capacityGraph.data = [];
      state.capacityGraph.error = action.error.message;
    });
    builder.addCase(fetchAsyncAutoProposedSys.pending, (state) => {
      state.autoProposedSys.loading = true;
    });
    builder.addCase(fetchAsyncAutoProposedSys.fulfilled, (state, action) => {
      state.autoProposedSys.loading = false;
      state.autoProposedSys.data = action.payload;
      state.autoProposedSys.error = "";
    });
    builder.addCase(fetchAsyncAutoProposedSys.rejected, (state, action) => {
      state.autoProposedSys.loading = false;
      state.autoProposedSys.data = [];
      state.autoProposedSys.error = action.error.message;
    });
    builder.addCase(fetchAsyncCurrentSysAutoProposedSys.pending, (state) => {
      state.currentAutoProposedSys.loading = true;
    });
    builder.addCase(fetchAsyncCurrentSysAutoProposedSys.fulfilled, (state, action) => {
      state.currentAutoProposedSys.loading = false;
      state.currentAutoProposedSys.data = action.payload;
      state.currentAutoProposedSys.error = "";
    });
    builder.addCase(fetchAsyncCurrentSysAutoProposedSys.rejected, (state, action) => {
      state.currentAutoProposedSys.loading = false;
      state.currentAutoProposedSys.data = [];
      state.currentAutoProposedSys.error = action.error.message;
    });
  },
});

export const getBusyDays = (state) => state.capacityplanning.busydays;
export const getCurrent = (state) => state.capacityplanning.current;
export const getProposed = (state) => state.capacityplanning.proposed;
export const getBusyDay = (state) => state.capacityplanning.busyday;
export const getProposedGrowth = (state) =>
  state.capacityplanning.proposedgrowth;
export const getCPWChartData = (state) => state.capacityplanning.capacityGraph;
export const getSysOpt = (state) => state.capacityplanning.sysOpt;
export const getCPWExSummary = (state) =>
  state.capacityplanning.capactiyExSumarry;
export const getAutoSys = (state) => state.capacityplanning.autoSys;
export const getAutoProposedSys = (state) =>
  state.capacityplanning.autoProposedSys;
export const getCurrentSysAutoProposedSys = (state) =>
  state.capacityplanning.currentAutoProposedSys;

export const {
  setBusyDay,
  setNCoreCurrent,
  setNCoreProposed,
  setMaxCoresCurrent,
  setMaxCoresProposed,
  setCPWCurrent,
  setCPWProposed,
  setMaxCPWCurrent,
  setMaxCPWProposed,
  setProposedGrowth,
  setSysOpt,
  setSysCurret,
  setSysProposed,
  setAutoSys,
} = capacityPlanningSlice.actions;
export default capacityPlanningSlice.reducer;
