import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { getFeedsData } from '../../services/slices/feeds/actions';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.feeds.feed);
  const isFeedLoading = useSelector((state) => state.feeds.isFeedLoading);

  useEffect(() => {
    dispatch(getFeedsData());
  }, []);

  if (isFeedLoading) {
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
