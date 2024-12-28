import { FC, useMemo } from 'react';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import {
  resetModalData,
  sendOrder,
  setOrderRequest
} from '../../services/OrderSlice/orderSlice';
import { clearConstructor } from '../../services/burgerSlice/burgerSlice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора 
  const constructorItems = {
    bun: {
      price: 0
    },
    ingredients: []
  };
*/
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const constructorItems = useSelector((state) => state.burgerConstructor);
  const user = useSelector((state) => state.user.user);

  const orderRequest = useSelector((state) => state.order.orderRequest);
  const orderModalData = useSelector((state) => state.order.orderModalData);

  // const orderRequest = false;
  // const orderModalData = null;

  const orderSendData = useMemo(() => {
    if (constructorItems.bun) {
      const data = [];
      data.push(constructorItems?.bun._id);

      return data.concat(constructorItems.ingredients.map((item) => item._id));
    }
    return [];
  }, [constructorItems]);

  const onOrderClick = () => {
    if (!user) {
      console.log('redirect order');

      return navigate('/login');
    }

    if (!constructorItems.bun || orderRequest) return;

    if (user) {
      console.log('send order');

      dispatch(sendOrder(orderSendData));
      dispatch(clearConstructor());
    }
  };

  const closeOrderModal = () => {
    dispatch(setOrderRequest());
    dispatch(resetModalData());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
