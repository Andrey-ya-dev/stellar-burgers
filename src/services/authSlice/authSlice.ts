import {
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';

export const registrateUser = createAsyncThunk(
  'api/registrate',
  async (data: TRegisterData) => registerUserApi(data)
);
export const loginUser = createAsyncThunk(
  'api/login',
  async (data: TLoginData) => loginUserApi(data)
);
export const logOutUser = createAsyncThunk('api/logOut', async () =>
  logoutApi()
);

const authInitial: TRegisterData & {
  isLoading: boolean;
  isUserLoading: boolean;
  refreshToken: string;
  accessToken: string;
  user: TUser;
  errMsg: string;
  orderRequest: boolean;
} = {
  email: '',
  name: '',
  password: '',
  isLoading: false,
  user: { name: '', email: '' },
  refreshToken: '',
  accessToken: '',
  errMsg: '',
  orderRequest: false,
  isUserLoading: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState: authInitial,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(registrateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registrateUser.fulfilled, (state, action) => {
        console.log(action.payload, 'register data');
        state.isLoading = false;
        state.user = action.payload.user;
        state.refreshToken = action.payload.refreshToken;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(registrateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.errMsg = action.error.message || '';
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.isUserLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log(action.payload, 'login data');
        state.isLoading = false;
        state.isUserLoading = false;
        state.user = action.payload.user;
        state.orderRequest = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isUserLoading = false;
        state.errMsg = action.error.message || '';
      })
      .addCase(logOutUser.fulfilled, (state, action) => {
        console.log('log out ', action.payload);
      });
  }
});

export const authReducer = authSlice.reducer;
