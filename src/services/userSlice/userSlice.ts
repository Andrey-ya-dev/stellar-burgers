import { forgotPasswordApi, getUserApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { getCookie } from '../../utils/cookie';

export const getUser = createAsyncThunk('user/getUser', async () => {
  const data = await getUserApi();
  return data;
});
export const restorePassword = createAsyncThunk(
  'user/restorePass',
  async (data: { email: string }) => forgotPasswordApi(data)
);
export const checkUserAuth = createAsyncThunk(
  'user/checkUser',
  (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      dispatch(getUser()).finally(() => {
        console.log('chek auth if');
        dispatch(authChecked());
      });
    } else {
      console.log('chek auth else');
      dispatch(authChecked());
    }
  }
);

type TUserType = {
  user: TUser | null;
  isUserLoading: boolean;
  isAuthChecked: boolean;
};

const initialUser: TUserType = {
  user: null,
  isUserLoading: false,
  isAuthChecked: false
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialUser,
  reducers: {
    setUser(state, action: PayloadAction<TUser>) {
      state.user = action.payload;
    },
    userLogout(state) {
      state.user = null;
    },
    authChecked(state) {
      state.isAuthChecked = true;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getUser.pending, (state) => {
        console.log('get user pend');
        state.isUserLoading = true;
        // state.isAuthChecked = false;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        console.log('user fulf');
        state.user = action.payload.user;
        state.isUserLoading = false;
        state.isAuthChecked = true;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isAuthChecked = true;
      });
  }
});

export const { setUser, userLogout, authChecked } = userSlice.actions;
export const userReducer = userSlice.reducer;
