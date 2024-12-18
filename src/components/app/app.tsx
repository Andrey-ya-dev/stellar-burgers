import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ReactNode } from 'react';

type TProtectedRouter = {
  children: ReactNode;
};
const ProtectedRouter = ({ children }: TProtectedRouter) => {
  const onlyUnAuth = false;

  if (!onlyUnAuth) {
    return <Navigate replace to='/login' />;
  }

  return children;
};

const App = () => (
  <div className={styles.app}>
    <AppHeader />
    <Routes>
      <Route path='/' element={<ConstructorPage />} />
      <Route path='/feed' element={<Feed />} />
      <Route
        path='/login'
        element={
          <ProtectedRouter>
            <Login />
          </ProtectedRouter>
        }
      />
      <Route
        path='/register'
        element={
          <ProtectedRouter>
            <Register />
          </ProtectedRouter>
        }
      />
      <Route
        path='/forgot-password'
        element={
          <ProtectedRouter>
            <ForgotPassword />
          </ProtectedRouter>
        }
      />
      <Route
        path='/reset-password'
        element={
          <ProtectedRouter>
            <ResetPassword />
          </ProtectedRouter>
        }
      />
      <Route
        path='/profile'
        element={
          <ProtectedRouter>
            <Profile />
          </ProtectedRouter>
        }
      />
      <Route
        path='/profile/orders'
        element={
          <ProtectedRouter>
            <ProfileOrders />
          </ProtectedRouter>
        }
      />
      <Route path='*' element={<NotFound404 />} />

      {/* MODALKI */}
      <Route
        path='/feed/:number'
        element={
          <Modal title='' onClose={() => {}}>
            <OrderInfo />
          </Modal>
        }
      />
      <Route
        path='/ingredients/:id'
        element={
          <Modal title='' onClose={() => {}}>
            <IngredientDetails />
          </Modal>
        }
      />
      <Route
        path='/profile/orders/:number'
        element={
          <Modal title='' onClose={() => {}}>
            <ProtectedRouter>
              <OrderInfo />
            </ProtectedRouter>
          </Modal>
        }
      />
    </Routes>
  </div>
);

export default App;
