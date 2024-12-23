import { loginUserApi, logoutApi, TLoginData, TRegisterData } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { deleteCookie, setCookie } from '../../utils/cookie';
import { userLogout } from '../userSlice/userSlice';

export const loginUser = createAsyncThunk(
  'api/login',
  async (data: TLoginData) => {
    const loginData = await loginUserApi(data);
    if (!loginData?.success) {
      return Promise.reject(data);
    }
    setCookie('accessToken', loginData.accessToken);
    localStorage.setItem('refreshToken', loginData.refreshToken);
    return loginData;
  }
);
export const logoutUser = createAsyncThunk('api/logOut', async () => {
  const logoutServerData = await logoutApi();

  return logoutServerData;
});

const authInitial: TRegisterData & {
  refreshToken: string;
  accessToken: string;
  user: TUser | null;
  errMsg: string;
  isAuthLoading: boolean;
  isLogoutLoad: boolean;
} = {
  email: '',
  name: '',
  password: '',
  user: null,
  refreshToken: '',
  accessToken: '',
  errMsg: '',
  isAuthLoading: false,
  isLogoutLoad: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState: authInitial,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isAuthLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log(action.payload, 'login data');
        state.isAuthLoading = false;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isAuthLoading = false;
        state.errMsg = action.error.message || '';
      })
      .addCase(logoutUser.pending, (state) => {
        console.log('slice logout pending');
        state.isLogoutLoad = true;
        state.user = null;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        console.log('log out fulled', action.payload);
        localStorage.clear();
        deleteCookie('accessToken');
        state.isLogoutLoad = false;
      });
  }
});

export const authReducer = authSlice.reducer;
