import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

type TInitialBurgerConstructor = {
  bun: TIngredient | { _id: string; price: number };
  ingredients: TIngredient[];
};

const initialBurgerConstructor: TInitialBurgerConstructor = {
  bun: { _id: '', price: 0 },
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

export const { addBun, addIngredient, removeIngredient } = burgerSlice.actions;
export const { getBun, getIngredients } = burgerSlice.selectors;
export const burgerConstructorReducer = burgerSlice.reducer;
