import { getUserData } from './actions';
import { initialState as orderInitState, userReducer } from './userSlice';

describe('Тесты actions в userSlice', () => {
  describe('[getUserData] получение данных пользователя', () => {
    test('getUserData pending', () => {
      const newState = userReducer(
        orderInitState,
        getUserData.pending('pending')
      );

      expect(newState.isUserLoading).toBeTruthy();
      expect(newState.errMsg).toBeFalsy();
    });

    test('getUserData fulfilled', () => {
      const user = { name: 'one', email: 'two' };
      const newState = userReducer(
        orderInitState,
        getUserData.fulfilled({ success: true, user }, 'fulfilled')
      );

      expect(newState.isUserLoading).toBeFalsy();
      expect(newState.errMsg).toBeFalsy();
      expect(newState.user).toEqual(user);
    });

    test('getUserData rejected', () => {
      const error = { name: 'rejected', message: 'some error' };
      const newState = userReducer(
        orderInitState,
        getUserData.rejected(error, 'rejected')
      );

      expect(newState.isUserLoading).toBeFalsy();
      expect(newState.errMsg).toBe(error.message);
      expect(newState.user).toBeFalsy();
    });
  });
});
