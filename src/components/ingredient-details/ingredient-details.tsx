import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from '../../services/store';
import { getIngredientsData } from '../../services/indgredientSlice/ingredientSlice';
import { useParams } from 'react-router-dom';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора 
  const ingredientData = null;*/
  const { id: ingredientId } = useParams();
  const ingredients = useSelector(getIngredientsData);
  const ingredientData = ingredients.find((item) => item._id === ingredientId);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
