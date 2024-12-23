import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { Preloader, ProfileMenuUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { logoutUser } from '../../services/authSlice/authSlice';
import { userLogout } from '../../services/userSlice/userSlice';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const isLogoutLoad = useSelector((state) => state.auth.isLogoutLoad);

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(userLogout());
  };

  if (isLogoutLoad) {
    console.log('pre prof-menu');
    return <Preloader />;
  }

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
