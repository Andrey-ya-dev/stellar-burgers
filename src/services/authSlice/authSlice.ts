import { loginUserApi, logoutApi, TLoginData, TRegisterData } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { deleteCookie, setCookie } from '../../utils/cookie';
import { setUser, userLogout } from '../userSlice/userSlice';

export const loginUser = createAsyncThunk(
  'auth/login',
  async (data: TLoginData, { dispatch }) => {
    const loginData = await loginUserApi(data);
    if (!loginData?.success) {
      return Promise.reject(data);
    }
    setCookie('accessToken', loginData.accessToken);
    localStorage.setItem('refreshToken', loginData.refreshToken);
    dispatch(setUser(loginData.user));
    return loginData;
  }
);
export const logoutUser = createAsyncThunk('auth/logOut', async () => {
  const logoutServerData = await logoutApi();

  return logoutServerData;
});

const authInitial: TRegisterData & {
  errMsg: string;
  isAuthLoading: boolean;
  isLogoutLoad: boolean;
} = {
  email: '',
  name: '',
  password: '',
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
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isAuthLoading = false;
        state.errMsg = action.error.message || '';
      })
      .addCase(logoutUser.pending, (state) => {
        console.log('slice logout pending');
        state.isLogoutLoad = true;
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
