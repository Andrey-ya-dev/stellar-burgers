import { FC, useMemo } from 'react';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { sendOrder } from '../../services/OrderSlice/orderSlice';

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

  const orderRequest = false;

  const orderModalData = null;

  const orderSendData = useMemo(() => {
    const data = [];
    data.push(constructorItems.bun._id);

    return data.concat(constructorItems.ingredients.map((item) => item._id));
  }, [constructorItems]);

  const onOrderClick = () => {
    // if (!constructorItems.bun || orderRequest) return;
    // if (!orderRequest) {
    //   return navigate('/login');
    // }
    // console.log(orderSendData);
    dispatch(sendOrder(orderSendData));
  };
  const closeOrderModal = () => {};

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
