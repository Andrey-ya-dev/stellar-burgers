import { v4 as uuidv4 } from 'uuid';

import { buns, burgerIngredients } from '../../../utils/testData';
import {
  addBun,
  addIngredient,
  burgerConstructorReducer,
  initialState as burgerInitSate,
  clearConstructor
} from './burgerConstructorSlice';

jest.mock('uuid');

describe('Тесты actions в burgerConstructorSlice', () => {
  (uuidv4 as jest.Mock).mockImplementation(() => 1);

  test('Тест добавления булки', () => {
    const oneBun = buns[0];
    const changedState = burgerConstructorReducer(
      burgerInitSate,
      addBun(oneBun)
    );

    const { bun } = changedState;
    expect(bun?._id).toEqual(oneBun._id);
  });

  test('Тест добавления другой булки', () => {
    const oneBun = buns[1];
    const changedState = burgerConstructorReducer(
      burgerInitSate,
      addBun(oneBun)
    );

    const { bun } = changedState;
    expect(bun?._id).not.toEqual(buns[0]._id);
  });

  test('Тест добавления ингредиента', () => {
    const item = burgerIngredients[1];
    const changedState = burgerConstructorReducer(
      burgerInitSate,
      addIngredient(item)
    );

    const { ingredients } = changedState;
    expect(ingredients[0]._id).toEqual(item._id);
  });

  test('Тест сброса конструктора', () => {
    const oneBun = buns[0];
    const item = burgerIngredients[1];
    const changedState = burgerConstructorReducer(
      burgerInitSate,
      addIngredient(item)
    );

    const { ingredients } = changedState;
    expect(ingredients[0]._id).toEqual(item._id);

    const clearState = burgerConstructorReducer(
      changedState,
      clearConstructor()
    );

    expect(clearState).toEqual(burgerInitSate);
  });
});
