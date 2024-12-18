import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useLocation } from 'react-router-dom';

export const AppHeader: FC = () => {
  const { pathname } = useLocation();

  return <AppHeaderUI userName='' pathName={pathname} />;
};
