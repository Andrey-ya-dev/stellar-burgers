import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { getUserOrders } from '../../services/slices/feeds/actions';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  const orders = useSelector((state) => state.feeds.userOrders);
  const dispatch = useDispatch();
  const isLogoutLoading = useSelector((state) => state.user.isLogoutUser);
  const isUserOrdersLoading = useSelector(
    (state) => state.feeds.isUserOrdersLoading
  );

  useEffect(() => {
    if (!orders.length) {
      dispatch(getUserOrders());
    }
  }, []);

  if (isLogoutLoading || isUserOrdersLoading) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={orders} />;
};
