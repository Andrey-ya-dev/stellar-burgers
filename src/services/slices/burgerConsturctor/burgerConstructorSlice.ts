import { v4 as uuidv4 } from 'uuid';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

export type TBurgerConstructor = {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
};

export const initialState: TBurgerConstructor = {
  bun: null,
  ingredients: []
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addBun: (state, action: PayloadAction<TIngredient>) => {
      state.bun = action.payload;
    },
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        state.ingredients.push(action.payload);
      },
      prepare: (item: TIngredient) => {
        const keyId = uuidv4();

        return { payload: { ...item, id: keyId } };
      }
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload
      );
    },
    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    },
    moveUpIngredient: (state, action: PayloadAction<number>) => {
      const arr = state.ingredients;
      const idx = action.payload;
      arr.splice(idx - 1, 0, arr.splice(idx, 1)[0]);
    },
    moveDownIngredient: (state, action: PayloadAction<number>) => {
      const arr = state.ingredients;
      const idx = action.payload;
      arr.splice(idx + 1, 0, arr.splice(idx, 1)[0]);
    }
  },
  selectors: {
    getConstructorBun: (state) => state.bun,
    getConstructorIngredients: (state) => state.ingredients
  }
});

export const { getConstructorBun, getConstructorIngredients } =
  burgerConstructorSlice.selectors;
export const {
  addBun,
  addIngredient,
  removeIngredient,
  clearConstructor,
  moveDownIngredient,
  moveUpIngredient
} = burgerConstructorSlice.actions;
export const burgerConstructorReducer = burgerConstructorSlice.reducer;
