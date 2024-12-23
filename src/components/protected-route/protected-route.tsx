import { Preloader } from '@ui';
import { ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';

type TProtectedRoute = {
  children: ReactElement;
  onlyUnAuth?: boolean;
};

export const ProtectedRoute = ({ onlyUnAuth, children }: TProtectedRoute) => {
  const isAuthChecked = useSelector((state) => state.user.isAuthChecked);
  const user = useSelector((state) => state.user.user);
  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }
  //    falsy      false
  if (!user && !onlyUnAuth) {
    console.log('prtect redir to login', onlyUnAuth, user);
    return <Navigate replace to={'/login'} />;
  }
  // если мы попадаем на маршруты /login/registrate и
  // если данные есть в хранилеще
  // onlyUnAuth -> true указывает на то что пользователь не атроризован и ему доступны маршруты /login /regestrate
  //     true        trusy
  if (onlyUnAuth && user) {
    console.log('protected redir', user, onlyUnAuth);
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  return children;
};
