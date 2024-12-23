import { configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { ingredientsReducer } from './indgredientSlice/ingredientSlice';
import { burgerConstructorReducer } from './burgerSlice/burgerSlice';
import { orderReducer } from './OrderSlice/orderSlice';
import { authReducer } from './authSlice/authSlice';
import { feedsReducer } from './feedsSlice/feedsSlice';
import { registerReducer } from './registerSlice/registerSlice';
import { userReducer } from './userSlice/userSlice';

const rootReducer = {
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  order: orderReducer,
  auth: authReducer,
  feeds: feedsReducer,
  register: registerReducer,
  user: userReducer
}; // Заменить на импорт настоящего редьюсера

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
