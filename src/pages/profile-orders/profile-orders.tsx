import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getUsersHistoryOrders } from '../../services/OrderSlice/orderSlice';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора 
  const orders: TOrder[] = [];*/
  const userOrders = useSelector((state) => state.order.userOrders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsersHistoryOrders());
  }, []);

  return <ProfileOrdersUI orders={userOrders} />;
};
