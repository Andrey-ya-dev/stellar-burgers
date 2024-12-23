import { registerUserApi, TRegisterData } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';

export const registerUser = createAsyncThunk(
  'api/register',
  async (data: TRegisterData) => registerUserApi(data)
);

type TRegister = {
  refreshToken: string;
  accessToken: string;
  user: TUser | null;
  isRegisterLoading: boolean;
  errMsg: string;
};

const initialRegister: TRegister = {
  refreshToken: '',
  accessToken: '',
  user: null,
  isRegisterLoading: false,
  errMsg: ''
};

const registerSlice = createSlice({
  name: 'register',
  initialState: initialRegister,
  reducers: {},
  selectors: {
    getRefreshToken(state) {
      return state.refreshToken;
    },
    getAccessToken(state) {
      return state.accessToken;
    },
    getRegisterStatus(state) {
      return state.isRegisterLoading;
    },
    getUserFromStore(state) {
      return state.user;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isRegisterLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isRegisterLoading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.errMsg = action.error?.message || '';
      });
  }
});

export const {
  getAccessToken,
  getRefreshToken,
  getRegisterStatus,
  getUserFromStore
} = registerSlice.selectors;
export const registerReducer = registerSlice.reducer;
