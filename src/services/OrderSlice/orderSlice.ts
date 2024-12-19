import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const getFeedsData = createAsyncThunk('api/feeds', async () =>
  getFeedsApi()
);

type TInitialOrder = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  feeds: TOrder[];
  isFeedsLoading: boolean;
  errorMsg: string | undefined;
};

const initialOrder: TInitialOrder = {
  orders: [],
  total: 0,
  totalToday: 0,
  feeds: [],
  isFeedsLoading: false,
  errorMsg: ''
};

const orderSlice = createSlice({
  name: 'order',
  initialState: initialOrder,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getFeedsData.pending, (state) => {
        state.isFeedsLoading = true;
      })
      .addCase(getFeedsData.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isFeedsLoading = false;
        state.feeds = action.payload.orders;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(getFeedsData.rejected, (state, action) => {
        state.errorMsg = action.error.message;
      });
  },
  selectors: {
    getFeedsStoreData(state) {
      return state.feeds;
    },
    getFeedLoaderStoreData(state) {
      return state.isFeedsLoading;
    }
  }
});

export const { getFeedLoaderStoreData, getFeedsStoreData } =
  orderSlice.selectors;
export const orderReducer = orderSlice.reducer;
