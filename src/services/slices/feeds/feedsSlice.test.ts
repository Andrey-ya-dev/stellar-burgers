import { TFeedsResponse } from '@api';
import { userOrders } from '../../../utils/testData';
import { getFeedsData, getUserOrders } from './actions';
import { feedsReducer, initialState } from './feedsSlice';

describe('Тесты actions в feedsSlice', () => {
  describe('[getFeedsData] получение ленты заказов', () => {
    test('getFeedsData pending', async () => {
      const newState = feedsReducer(
        initialState,
        getFeedsData.pending('pending')
      );

      expect(newState.isFeedLoading).toBeTruthy();
      expect(newState.errMsg).toBeFalsy();
    });

    test('getFeedsData fulfilled', async () => {
      const feeds: TFeedsResponse = {
        orders: userOrders,
        total: 10,
        totalToday: 20,
        success: true
      };
      const newState = feedsReducer(
        initialState,
        getFeedsData.fulfilled(feeds, 'fulfilled')
      );

      expect(newState.feed).toEqual(userOrders);
      expect(newState.isFeedLoading).toBeFalsy();
      expect(newState.errMsg).toBeFalsy();
    });

    test('getFeedsData rejected', async () => {
      const error = {
        name: 'rejected',
        message: 'some error'
      };
      const newState = feedsReducer(
        initialState,
        getFeedsData.rejected(error, 'rejected')
      );

      expect(newState.isFeedLoading).toBeFalsy();
      expect(newState.errMsg).toEqual(error.message);
    });
  });
});
