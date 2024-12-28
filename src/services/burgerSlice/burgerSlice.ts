import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

type TInitialBurgerConstructor = {
  bun: TIngredient | null;
  ingredients: TIngredient[];
};

const initialBurgerConstructor: TInitialBurgerConstructor = {
  bun: null,
  ingredients: []
};

const burgerSlice = createSlice({
  name: 'burger',
  initialState: initialBurgerConstructor,
  reducers: {
    addBun(state, action: PayloadAction<TIngredient>) {
      state.bun = action.payload;
    },
    addIngredient(state, action: PayloadAction<TIngredient>) {
      state.ingredients = [...state.ingredients, action.payload];
    },
    removeIngredient(state, action: PayloadAction<number>) {
      state.ingredients = state.ingredients.filter(
        (_, idx) => idx !== action.payload
      );
    },
    clearConstructor(state) {
      state.bun = null;
      state.ingredients = [];
    }
  },
  selectors: {
    getBun(state) {
      return state.bun;
    },
    getIngredients(state) {
      return state.ingredients;
    }
  }
});

export const { addBun, addIngredient, removeIngredient, clearConstructor } =
  burgerSlice.actions;
export const { getBun, getIngredients } = burgerSlice.selectors;
export const burgerConstructorReducer = burgerSlice.reducer;
