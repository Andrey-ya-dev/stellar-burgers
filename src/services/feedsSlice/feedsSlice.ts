import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const getFeedsData = createAsyncThunk('feeds/feedsData', async () =>
  getFeedsApi()
);

type TInitialFeeds = {
  feeds: TOrder[];
  isFeddsLoading: boolean;
  errMsg: string;
  total: number;
  totalToday: number;
};

const initialFeeds: TInitialFeeds = {
  feeds: [],
  isFeddsLoading: false,
  errMsg: '',
  total: 0,
  totalToday: 0
};

const feedsSlice = createSlice({
  name: 'feeds',
  initialState: initialFeeds,
  reducers: {},
  selectors: {
    getFeedsFromStore(state) {
      return state.feeds;
    },
    getFeedsLoadStatus(state) {
      return state.isFeddsLoading;
    },
    getFeedsError(state) {
      return state.errMsg;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getFeedsData.pending, (state) => {
        state.errMsg = '';
        state.isFeddsLoading = true;
      })
      .addCase(getFeedsData.fulfilled, (state, action) => {
        state.isFeddsLoading = false;
        state.errMsg = '';
        state.feeds = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(getFeedsData.rejected, (state, action) => {
        state.isFeddsLoading = false;
        state.errMsg = action.error.message || 'error';
      });
  }
});

export const { getFeedsFromStore, getFeedsLoadStatus, getFeedsError } =
  feedsSlice.selectors;
export const feedsReducer = feedsSlice.reducer;
