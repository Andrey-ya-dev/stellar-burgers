import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { getIngredientsData } from '../../services/indgredientSlice/ingredientSlice';
import {
  getFeedsData,
  getFeedsFromStore
} from '../../services/feedsSlice/feedsSlice';

export const OrderInfo: FC = () => {
  /** TODO: взять переменные orderData и ingredients из стора 
  const orderData = {
    createdAt: '',
    ingredients: [],
    _id: '',
    status: '',
    name: '',
    updatedAt: 'string',
    number: 0
  };*/
  const { number } = useParams();
  const dispatch = useDispatch();

  const orderData = useSelector(getFeedsFromStore).find(
    (item) => item.number === Number(number)
  );

  // console.log(orderData, ' order data');

  // const ingredients: TIngredient[] = [];
  const ingredients = useSelector(getIngredientsData);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  useEffect(() => {
    if (!orderData) {
      console.log('OREDER_INFO get feeds');
      dispatch(getFeedsData());
    }
  }, []);

  if (!orderInfo) {
    console.log('OREDER_INFO ', orderData);
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
