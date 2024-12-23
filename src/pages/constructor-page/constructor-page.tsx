import { useSelector } from '../../services/store';

import styles from './constructor-page.module.css';

import { BurgerIngredients } from '../../components';
import { BurgerConstructor } from '../../components';
import { Preloader } from '../../components/ui';
import { FC } from 'react';
import {
  getIngredientsData,
  getIngredientsLoader
} from '../../services/indgredientSlice/ingredientSlice';

export const ConstructorPage: FC = () => {
  /** TODO: взять переменную из стора */
  // const isIngredientsLoading = false;
  const isIngredientsLoading = useSelector(getIngredientsLoader);
  const ingredients = useSelector(getIngredientsData);

  return (
    <>
      {isIngredientsLoading ? (
        <Preloader />
      ) : (
        <main className={styles.containerMain}>
          <h1
            className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
          >
            Соберите бургер {ingredients.length}
          </h1>
          <div className={`${styles.main} pl-5 pr-5`}>
            <BurgerIngredients />
            <BurgerConstructor />
          </div>
        </main>
      )}
    </>
  );
};
