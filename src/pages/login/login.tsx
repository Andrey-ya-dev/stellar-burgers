import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { loginUser } from '../../services/authSlice/authSlice';
import { Navigate } from 'react-router-dom';
import { setUser } from '../../services/userSlice/userSlice';
import { Preloader } from '@ui';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const isAuthStatus = useSelector((state) => state.auth.isAuthLoading);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (email && password) {
      const newUser = { email, password };
      dispatch(loginUser(newUser));
    }
  };

  useEffect(() => {
    if (user) {
      dispatch(setUser(user));
    }
  }, [user]);

  if (user) {
    console.log('login redir');
    return <Navigate replace to={'/'} />;
  }

  if (isAuthStatus) {
    return <Preloader />;
  }

  return (
    <LoginUI
      errorText=''
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
