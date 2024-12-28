import { registerUserApi, TRegisterData } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';

export const registerUser = createAsyncThunk(
  'register/registerUser',
  async (data: TRegisterData) => registerUserApi(data)
);

type TRegister = {
  user: TUser | null;
  isRegisterLoading: boolean;
  errMsg: string;
};

const initialRegister: TRegister = {
  user: null,
  isRegisterLoading: false,
  errMsg: ''
};

const registerSlice = createSlice({
  name: 'register',
  initialState: initialRegister,
  reducers: {},
  selectors: {
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
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.errMsg = action.error?.message || '';
      });
  }
});

export const { getRegisterStatus, getUserFromStore } = registerSlice.selectors;
export const registerReducer = registerSlice.reducer;
