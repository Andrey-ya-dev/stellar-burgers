import { combineSlices, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { ingredientsSlice } from './slices/ingredients/ingredientsSlice';
import { feedsSlice } from './slices/feeds/feedsSlice';
import { burgerConstructorSlice } from './slices/burgerConsturctor/burgerConstructorSlice';
import { orderSlice } from './slices/order/orderSlice';
import { userSlice } from './slices/user/userSlice';

export const rootReducer = combineSlices(
  userSlice,
  orderSlice,
  feedsSlice,
  ingredientsSlice,
  burgerConstructorSlice
);

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
