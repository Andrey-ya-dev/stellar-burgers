import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { registrateUser } from '../../services/authSlice/authSlice';
import { Navigate } from 'react-router-dom';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const refreshToken = useSelector((state) => state.auth.refreshToken);
  const accessToken = useSelector((state) => state.auth.accessToken);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (userName && email && password) {
      const newUser = { name: userName, email, password };
      dispatch(registrateUser(newUser));
    }
  };

  // testman testman@email.ru testMan_1

  if (refreshToken && accessToken) {
    return <Navigate replace to={'/'} />;
  }

  return (
    <RegisterUI
      errorText=''
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
