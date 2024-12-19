import { getFeedsApi, orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const getFeedsData = createAsyncThunk('api/feeds', async () =>
  getFeedsApi()
);
export const sendOrder = createAsyncThunk(
  'api/sendOrder',
  async (data: string[]) => orderBurgerApi(data)
);

type TInitialOrder = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  feeds: TOrder[];
  isFeedsLoading: boolean;
  errorMsg: string | undefined;
  orderRequest: boolean;
};

const initialOrder: TInitialOrder = {
  orders: [],
  total: 0,
  totalToday: 0,
  feeds: [],
  isFeedsLoading: false,
  errorMsg: '',
  orderRequest: false
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
      })
      .addCase(sendOrder.pending, (state) => {
        console.log('pendig send');
      })
      .addCase(sendOrder.fulfilled, (state, action) => {
        console.log('fullfiled send', action);
      })
      .addCase(sendOrder.rejected, (state, action) => {
        console.log('errr send', action);
        state.orderRequest = false;
      });
  },
  selectors: {
    getFeedsStoreData(state) {
      return state.feeds;
    },
    getFeedLoaderStoreData(state) {
      return state.isFeedsLoading;
    },
    getOrderRequestFlag(state) {
      return state.orderRequest;
    }
  }
});

export const {
  getFeedLoaderStoreData,
  getFeedsStoreData,
  getOrderRequestFlag
} = orderSlice.selectors;
export const orderReducer = orderSlice.reducer;
