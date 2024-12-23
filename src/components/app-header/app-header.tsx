import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';

export const AppHeader: FC = () => {
  const { pathname } = useLocation();
  const user = useSelector((state) => state.user.user);
  const name = user?.name;

  return <AppHeaderUI userName={name ? name : ''} pathName={pathname} />;
};
