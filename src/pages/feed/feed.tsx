import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import {
  getFeedLoaderStoreData,
  getFeedsData,
  getFeedsStoreData
} from '../../services/OrderSlice/orderSlice';
import { useDispatch, useSelector } from '../../services/store';
import { getIngredients } from '../../services/indgredientSlice/ingredientSlice';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора 
  const orders: TOrder[] = [];*/
  const orders = useSelector(getFeedsStoreData);
  const isFeedLoad = useSelector(getFeedLoaderStoreData);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('feed effect');
    dispatch(getIngredients());
    dispatch(getFeedsData());
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
