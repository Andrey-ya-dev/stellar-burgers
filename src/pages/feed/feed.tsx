import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import {
  getFeedsData,
  getFeedsFromStore,
  getFeedsLoadStatus
} from '../../services/feedsSlice/feedsSlice';
import { useDispatch, useSelector } from '../../services/store';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора 
  const orders: TOrder[] = [];*/
  const orders = useSelector(getFeedsFromStore);
  const isFeedLoad = useSelector(getFeedsLoadStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!orders.length) {
      dispatch(getFeedsData());
    }
  }, []);

  if (!orders.length || isFeedLoad) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(getFeedsData());
      }}
    />
  );
};
