import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './store';
import {
  burgerConstructorReducer,
  initialState as burgerInitState
} from './slices/burgerConsturctor/burgerConstructorSlice';
import {
  initialState as ingredientsInitState,
  ingredientsReducer
} from './slices/ingredients/ingredientsSlice';
import {
  initialState as feedsInitState,
  feedsReducer
} from './slices/feeds/feedsSlice';
import {
  initialState as userInitState,
  userReducer
} from './slices/user/userSlice';
import {
  initialState as orderInitState,
  orderReducer
} from './slices/order/orderSlice';

describe('Тесты проверки инициальизации rootReducer', () => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState: {
      burgerConstructor: burgerInitState,
      ingredients: ingredientsInitState,
      feeds: feedsInitState,
      user: userInitState,
      order: orderInitState
    }
  });

  test('Тесты burgerConstructor', () => {
    expect(store.getState().burgerConstructor).toEqual(
      burgerConstructorReducer(burgerInitState, {
        type: 'UNKNOWN_ACTION'
      })
    );

    const addIngredient = { type: 'addIngredient' };
    store.dispatch(addIngredient);
    expect(store.getState().burgerConstructor).toEqual(burgerInitState);

    const removeIngredient = { type: 'removeIngredient' };
    store.dispatch(removeIngredient);
    expect(store.getState().burgerConstructor).toEqual(burgerInitState);

    const clearConstructor = { type: 'clearConstructor' };
    store.dispatch(clearConstructor);
    expect(store.getState().burgerConstructor).toEqual(burgerInitState);
  });

  test('Тесты ingredients', () => {
    expect(store.getState().ingredients).toEqual(
      ingredientsReducer(ingredientsInitState, {
        type: 'UNKNOWN_ACTION'
      })
    );

    const getIngredientsData = { type: 'getIngredientsData' };
    store.dispatch(getIngredientsData);
    expect(store.getState().ingredients).toEqual(ingredientsInitState);
  });

  test('Тесты feeds', () => {
    expect(store.getState().feeds).toEqual(
      feedsReducer(undefined, { type: 'UNKNOWN_ACTION' })
    );

    const getFeedsData = { type: 'getFeedsData' };
    store.dispatch(getFeedsData);
    expect(store.getState().feeds).toEqual(feedsInitState);

    const getUserOrders = { type: 'getUserOrders' };
    store.dispatch(getUserOrders);
    expect(store.getState().feeds).toEqual(feedsInitState);
  });

  test('Тесты user', () => {
    expect(store.getState().user).toEqual(
      userReducer(undefined, { type: 'UNKNOWN_ACTION' })
    );

    const loginUser = { type: 'loginUser' };
    store.dispatch(loginUser);
    expect(store.getState().user).toEqual(userInitState);

    const logoutUser = { type: 'logoutUser' };
    store.dispatch(logoutUser);
    expect(store.getState().user).toEqual(userInitState);

    const updateUserData = { type: 'updateUserData' };
    store.dispatch(updateUserData);
    expect(store.getState().user).toEqual(userInitState);

    const getUserData = { type: 'getUserData' };
    store.dispatch(getUserData);
    expect(store.getState().user).toEqual(userInitState);
  });

  test('Тесты orders', () => {
    expect(store.getState().order).toEqual(
      orderReducer(undefined, { type: 'UNKNOWN_ACTION' })
    );

    const sendOrder = { type: 'sendOrder' };
    store.dispatch(sendOrder);
    expect(store.getState().order).toEqual(orderInitState);
  });
});
