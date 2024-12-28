import { getFeedsApi, getOrdersApi, orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const sendOrder = createAsyncThunk(
  'order/sendOrder',
  async (data: string[]) => orderBurgerApi(data)
);
export const getUsersHistoryOrders = createAsyncThunk(
  'order/usersOrders',
  async () => getOrdersApi()
);

type TInitialOrder = {
  orders: TOrder[];
  errorMsg: string | undefined;
  orderRequest: boolean;
  userOrders: TOrder[];
  orderModalData: TOrder | null;
  isUserOrdersLoaded: boolean;
};

const initialOrder: TInitialOrder = {
  orders: [],
  errorMsg: '',
  orderRequest: false,
  userOrders: [],
  orderModalData: null,
  isUserOrdersLoaded: false
};
// начать orderRequest
const orderSlice = createSlice({
  name: 'order',
  initialState: initialOrder,
  reducers: {
    setOrderRequest(state) {
      state.orderRequest = false;
    },
    resetModalData(state) {
      state.orderModalData = null;
    }
  },
  extraReducers(builder) {
    builder

      .addCase(sendOrder.pending, (state) => {
        console.log('pendig send');
        state.orderRequest = true;
      })
      .addCase(sendOrder.fulfilled, (state, action) => {
        console.log('fullfiled send', action);
        state.orderModalData = action.payload.order;
        state.orderRequest = false;
      })
      .addCase(sendOrder.rejected, (state, action) => {
        console.log('errr send', action);
        state.orderRequest = false;
      })
      .addCase(getUsersHistoryOrders.pending, (state) => {
        state.isUserOrdersLoaded = true;
      })
      .addCase(getUsersHistoryOrders.fulfilled, (state, action) => {
        state.isUserOrdersLoaded = false;
        state.userOrders = action.payload;
      });
  },
  selectors: {
    getOrderRequestFlag(state) {
      return state.orderRequest;
    }
  }
});

export const { getOrderRequestFlag } = orderSlice.selectors;
export const { setOrderRequest, resetModalData } = orderSlice.actions;
export const orderReducer = orderSlice.reducer;
