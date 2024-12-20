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
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams
} from 'react-router-dom';
import { ReactNode, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getCurrentUser } from '../../services/authSlice/authSlice';

type TProtectedRoute = {
  children: ReactNode;
  onlyUnAuth?: boolean;
};
const ProtectedRoute = ({ onlyUnAuth, children }: TProtectedRoute) => {
  const location = useLocation();
  const isUserLoading = useSelector((state) => state.auth.isUserLoading);
  const user = useSelector((state) => state.auth.user);

  if (isUserLoading) {
    console.log('preloader');
  }

  if (!onlyUnAuth && !user.name) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && user.name) {
    const from = location.state?.from || { pathname: '/' };

    return <Navigate replace to={from} />;
  }

  return children;
};

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state?.background;
  const orderNumber = location.state?.number;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser());
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route path='*' element={<NotFound404 />} />
      </Routes>
      {/* MODALKI */}
      {background && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal
                title={orderNumber ? `#0${orderNumber}` : ''}
                onClose={() => {
                  navigate(-1);
                }}
              >
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal
                title='Детали ингредиента'
                onClose={() => {
                  navigate(-1);
                }}
              >
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <Modal title='' onClose={() => {}}>
                <ProtectedRoute>
                  <OrderInfo />
                </ProtectedRoute>
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
