import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { Navigate } from 'react-router-dom';
import {
  registerUser,
  getRegisterStatus
} from '../../services/registerSlice/registerSlice';
import { Preloader } from '@ui';
import { setUser } from '../../services/userSlice/userSlice';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const isRegisterLoad = useSelector(getRegisterStatus);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (userName && email && password) {
      const newUser = { name: userName, email, password };
      dispatch(registerUser(newUser));
      dispatch(setUser(newUser));
    }
  };

  // useEffect setuser

  // testman testman@email.ru testMan_1
  // testman2 testman2@email.ru testMan_2
  // testman3 testman3@email.ru testMan_3
  // testman4 testman4@email.ru testMan_4
  // testman5 testman5@email.ru testMan_5
  // testman6 testman6@email.ru testMan_6
  // testman7 testman7@email.ru testMan_7
  // testman8 testman8@email.ru testMan_8

  if (isRegisterLoad) {
    return <Preloader />;
  }

  if (user) {
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
