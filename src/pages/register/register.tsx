import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { registerUser } from '../../services/slices/user/actions';
import { Preloader } from '@ui';
import { Navigate } from 'react-router-dom';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const isRegisterLoading = useSelector(
    (state) => state.user.isRegisterLoading
  );
  const user = useSelector((state) => state.user.user);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (userName && email && password) {
      const newUser = { name: userName, email, password };
      dispatch(registerUser(newUser));
    }
  };

  if (isRegisterLoading) {
    return <Preloader />;
  }

  if (user) {
    return <Navigate to={'/'} />;
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
