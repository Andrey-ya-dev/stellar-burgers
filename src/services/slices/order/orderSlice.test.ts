import {
  orderReducer,
  resetModalData,
  TSendOrder,
  initialState as orderInitState
} from './orderSlice';
import { order } from '../../../utils/testData';
import { sendOrder } from './actions';

describe('Тесты actions в orderSlice', () => {
  describe('Сброс данных в модальном окне', () => {
    test('Очистка модалки', () => {
      const orderState: TSendOrder = {
        orderModalData: order,
        orderRequest: false,
        errMsg: ''
      };

      const newOrder = orderReducer(orderState, resetModalData());
      expect(newOrder).toEqual(orderInitState);
    });
  });
  describe('[sendOrder] отправка заказа', () => {
    test('sendOrder pending', () => {
      const newState = orderReducer(
        orderInitState,
        sendOrder.pending('pending', order.ingredients)
      );

      expect(newState.orderRequest).toBeTruthy();
      expect(newState.errMsg).toBe('');
    });

    test('sendOrder fulfilled', () => {
      const newState = orderReducer(
        orderInitState,
        sendOrder.fulfilled(
          {
            order: order,
            name: 'new order',
            success: true
          },
          'fulfilled',
          order.ingredients
        )
      );

      expect(newState.orderModalData).toEqual(order);
      expect(newState.orderRequest).toBeFalsy();
      expect(newState.errMsg).toBe('');
    });

    test('sendOrder rejected', async () => {
      const error = {
        name: 'rejected',
        message: 'some error'
      };
      const newState = orderReducer(
        orderInitState,
        sendOrder.rejected(error, 'rejected', order.ingredients)
      );

      expect(newState.orderRequest).toBeFalsy();
      expect(newState.errMsg).toEqual(error.message);
    });
  });
});
