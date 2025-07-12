import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseAPI from '../../../services/baseApi';

export const fetchAsyncResponse5250 = createAsyncThunk("other/fetchAsyncResponse5250", async(qd) => {
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseAPI.get(`api/5250data?${query}`);
    return response.data;
  }
);

export const fetchAsyncResponse5250WhatsChanged = createAsyncThunk("other/fetchAsyncResponse5250WhatsChanged", async (qd) => {
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseAPI.get(`api/5250data/whatschanged?${query}`);
    return response.data;
  }
);

export const fetchAsyncTotalTransaction = createAsyncThunk("other/fetchAsyncTotalTransaction", async(qd) => {
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseAPI.get(`api/totrdata?${query}`);
    return response.data;
});

export const fetchAsyncTotalTransactionWhatsChanged = createAsyncThunk("other/fetchAsyncTotalTransactionWhatsChanged", async (qd) => {
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseAPI.get(`api/totrdata/whatschanged?${query}`);
    return response.data;
  }
);

export const fetchAsyncEthernetUtilization = createAsyncThunk("other/fetchAsyncEthernetUtilization", async(qd) => {
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseAPI.get(`api/ethdata?${query}`);
    return response.data;
});

export const fetchAsyncEthernetUtilizationWhatsChanged = createAsyncThunk(
  "other/fetchAsyncEthernetUtilizationWhatsChanged",
  async (qd) => {
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseAPI.get(`api/ethdata/whatschanged?${query}`);
    return response.data;
  }
);

const initialState = {
  response5250: { loading: false, data: [], error: "" },
  totaltransaction: { loading: false, data: [], error: "" },
  ethernetline: { loading: false, data: [], error: "" },
  response5250WC: { loading: false, data: [], error: "" },
  totaltransactionWC: { loading: false, data: [], error: "" },
  ethernetlineWC: { loading: false, data: [], error: "" },
};

const otherSlice = createSlice({
    name: 'other',
  initialState,
  reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchAsyncResponse5250.pending, state => {
      state.response5250.loading = true;
    });
    builder.addCase(fetchAsyncResponse5250.fulfilled, (state, action) => {
      state.response5250.loading = false;
      state.response5250.data = action.payload;
          state.response5250.error = '';
    });
    builder.addCase(fetchAsyncResponse5250.rejected, (state, action) => {
      state.response5250.loading = false;
      state.response5250.data = [];
      state.response5250.error = action.error.message;
    });
    builder.addCase(fetchAsyncResponse5250WhatsChanged.pending, (state) => {
      state.response5250WC.loading = true;
    });
    builder.addCase(
      fetchAsyncResponse5250WhatsChanged.fulfilled,
      (state, action) => {
        state.response5250WC.loading = false;
        state.response5250WC.data = action.payload;
        state.response5250WC.error = "";
      }
    );
    builder.addCase(
      fetchAsyncResponse5250WhatsChanged.rejected,
      (state, action) => {
        state.response5250WC.loading = false;
        state.response5250WC.data = [];
        state.response5250WC.error = action.error.message;
      }
    );
	 	builder.addCase(fetchAsyncTotalTransaction.pending, state => {
      state.totaltransaction.loading = true;
    });
    builder.addCase(fetchAsyncTotalTransaction.fulfilled, (state, action) => {
      state.totaltransaction.loading = false;
      state.totaltransaction.data = action.payload;
            state.totaltransaction.error = '';
    });
    builder.addCase(fetchAsyncTotalTransaction.rejected, (state, action) => {
      state.totaltransaction.loading = false;
      state.totaltransaction.data = [];
      state.totaltransaction.error = action.error.message;
    });
    builder.addCase(fetchAsyncTotalTransactionWhatsChanged.pending, (state) => {
      state.totaltransactionWC.loading = true;
    });
    builder.addCase(
      fetchAsyncTotalTransactionWhatsChanged.fulfilled,
      (state, action) => {
        state.totaltransactionWC.loading = false;
        state.totaltransactionWC.data = action.payload;
        state.totaltransactionWC.error = "";
      }
    );
    builder.addCase(
      fetchAsyncTotalTransactionWhatsChanged.rejected,
      (state, action) => {
        state.totaltransactionWC.loading = false;
        state.totaltransactionWC.data = [];
        state.totaltransactionWC.error = action.error.message;
      }
    );
        builder.addCase(fetchAsyncEthernetUtilization.pending, state => {
      state.ethernetline.loading = true;
    });
        builder.addCase(fetchAsyncEthernetUtilization.fulfilled, (state, action) => {
        state.ethernetline.loading = false;
        state.ethernetline.data = action.payload;
            state.ethernetline.error = '';
        });
    builder.addCase(fetchAsyncEthernetUtilization.rejected, (state, action) => {
      state.ethernetline.loading = false;
      state.ethernetline.data = [];
      state.ethernetline.error = action.error.message;
    });
    builder.addCase(
          fetchAsyncEthernetUtilizationWhatsChanged.pending, state => {
        state.ethernetlineWC.loading = true;
      }
    );
    builder.addCase(
          fetchAsyncEthernetUtilizationWhatsChanged.fulfilled, (state, action) => {
        state.ethernetlineWC.loading = false;
        state.ethernetlineWC.data = action.payload;
        state.ethernetlineWC.error = "";
      }
    );
    builder.addCase(
          fetchAsyncEthernetUtilizationWhatsChanged.rejected, (state, action) => {
        state.ethernetlineWC.loading = false;
        state.ethernetlineWC.data = [];
        state.ethernetlineWC.error = action.error.message;
      }
    );
  },
});

export const getResponse5250Data = (state) => state.other.response5250;
export const getTotalTransactionsData = (state) => state.other.totaltransaction;
export const getEthernetLineData = (state) => state.other.ethernetline;
export const getResponse5250DataWC = (state) => state.other.response5250WC;
export const getTotalTransactionsDataWC = (state) => state.other.totaltransactionWC;
export const getEthernetLineDataWC = (state) => state.other.ethernetlineWC;

export default otherSlice.reducer;
