import { buns } from '../../../utils/testData';
import { getIngredientsData } from './actions';
import { ingredientsReducer, initialState } from './ingredientsSlice';

describe('Тесты actions в ingredientsSlice', () => {
  describe('[getIngredientsData] получение ингредиентов', () => {
    test('getIngredientsData pending', async () => {
      const newState = ingredientsReducer(
        initialState,
        getIngredientsData.pending('pending')
      );

      expect(newState.isIngredientsLoading).toBeTruthy();
      expect(newState.errMsg).toBeFalsy();
    });

    test('getIngredientsData fulfilled', async () => {
      const newState = ingredientsReducer(
        initialState,
        getIngredientsData.fulfilled(buns, 'fulfilled')
      );

      expect(newState.ingredients).toEqual(buns);
      expect(newState.isIngredientsLoading).toBeFalsy();
      expect(newState.errMsg).toBeFalsy();
    });

    test('fulfilled rejected', async () => {
      const error = {
        name: 'rejected',
        message: 'some error'
      };
      const newState = ingredientsReducer(
        initialState,
        getIngredientsData.rejected(error, 'rejected')
      );

      expect(newState.isIngredientsLoading).toBeFalsy();
      expect(newState.errMsg).toEqual(error.message);
    });
  });
});
