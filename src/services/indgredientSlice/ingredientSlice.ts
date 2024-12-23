import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

export const getIngredients = createAsyncThunk('api/ingredients', async () =>
  getIngredientsApi()
);

type TInitialIngredienstState = {
  isIngredientsLoading: boolean;
  ingredients: TIngredient[];
  errorMsg?: string;
};

const initialIngredienstState: TInitialIngredienstState = {
  isIngredientsLoading: false,
  ingredients: [],
  errorMsg: ''
};

const ingredienstSlice = createSlice({
  name: 'ingredients',
  initialState: initialIngredienstState,
  reducers: {},
  selectors: {
    getIngredientsLoader(state) {
      return state.isIngredientsLoading;
    },
    getIngredientsData(state) {
      return state.ingredients;
    },
    getIngredientsError(state) {
      return state.errorMsg;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.isIngredientsLoading = true;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.errorMsg = '';
        state.isIngredientsLoading = false;
        state.ingredients = action.payload;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.isIngredientsLoading = false;
        state.errorMsg = action.error.message;
      });
  }
});

export const ingredientsReducer = ingredienstSlice.reducer;
export const { getIngredientsData, getIngredientsLoader, getIngredientsError } =
  ingredienstSlice.selectors;
