import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { sendOrder } from '../../services/slices/order/actions';
import { clearConstructor } from '../../services/slices/burgerConsturctor/burgerConstructorSlice';
import {
  resetModalData,
  setOrderRequest
} from '../../services/slices/order/orderSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const constructorItems = useSelector((state) => state.burgerConstructor);
  const orderRequest = useSelector((state) => state.order.orderRequest);
  const orderModalData = useSelector((state) => state.order.orderModalData);

  const orderSendData = useMemo(() => {
    if (constructorItems.bun) {
      const data = [];
      data.push(constructorItems?.bun._id);

      return data.concat(constructorItems.ingredients.map((item) => item._id));
    }
    return [];
  }, [constructorItems]);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    if (!user) {
      return navigate('/login');
    }

    if (user) {
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
        (s: number, v: TConstructorIngredient) => s + v.price,
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
