import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import {
  getFeedsData,
  getFeedsFromStore,
  getFeedsLoadStatus
} from '../../services/feedsSlice/feedsSlice';
import { useDispatch, useSelector } from '../../services/store';
import {
  getIngredients,
  getIngredientsData
} from '../../services/indgredientSlice/ingredientSlice';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора 
  const orders: TOrder[] = [];*/
  const orders = useSelector(getFeedsFromStore);
  const isFeedLoad = useSelector(getFeedsLoadStatus);
  const ingredients = useSelector(getIngredientsData);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('feed effect');
    if (!ingredients.length) {
      dispatch(getIngredients());
    }
    if (!orders.length) dispatch(getFeedsData());
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
