import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getUsersHistoryOrders } from '../../services/OrderSlice/orderSlice';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора 
  const orders: TOrder[] = [];*/
  const userOrders = useSelector((state) => state.order.userOrders);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userOrders.length) {
      dispatch(getUsersHistoryOrders());
    }
  }, []);

  return <ProfileOrdersUI orders={userOrders} />;
};
/*
Загрузка: 
  запрос юзера 
  запрос продуктов
  В сторе:
    сетим переменную изАуз
    сетим переменную ингр
неАуз:
  собираем бургер
  открываем модалки ингр
  кнопка оформить редир -> /login
ауз:
  запрос юзера/профиль
  изАуз -> true
  история заказов
юзер:
  редактировать имя,почта,пароль

  восстановление пароля

слайсы:
  ingredients
  регистрация
  логин/auth
  юзер
  бургер
  заказы
  ??:
  лента заказов/feed
  история заказов юзера
*/
