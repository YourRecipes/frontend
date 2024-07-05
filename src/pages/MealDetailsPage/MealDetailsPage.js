import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import "./MealDetailsPage.scss";
import CategoryList from '../../components/Category/CategoryList';
import MealSingle from "../../components/Meal/MealSingle";
import { useMealContext } from '../../context/mealContext';
import { startFetchSingleMeal } from '../../actions/mealsActions';
import Loader from '../../components/Loader/Loader';

const MealDetailsPage = ({ingredients}) => {
  const { id } = useParams();
  const [ recipe, setRecipe ] = useState();
  const [ recipeDetails, setRecipeDetails ] = useState();
  const [ recipeIngredients, setRecipeIngredients ] = useState();
  const [ isMealLoading, setIsMealLoading ] = useState(true);

  const fetchRecipe = async () => {
    try {
      const response = await fetch(`http://localhost:8008/recipes/recipe/${id}`);
      const data = await response.json();
      setRecipe(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDetails = async () => {
    try {
      const response = await fetch(`http://localhost:8008/recipes/details/${id}`);
      const data = await response.json();
      setRecipeDetails(data);
    } catch (error) {
      console.error(error);
    }
  };
  
  const fetchIngredients = async () => {
    try {
      const response = await fetch(`http://localhost:8008/ingredients/recipe/${id}`);
      const data = await response.json();
      data.forEach(recipeIngredient => {
          recipeIngredient.ingredient = ingredients[ recipeIngredient.ingredientId - 1 ];
        });
      setRecipeIngredients(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    Promise.all([
      fetchRecipe(),
      fetchDetails(),
      fetchIngredients()
    ]).then(() => setIsMealLoading(false));
  }, [ isMealLoading ]);


  return (
    <main className='main-content bg-whitesmoke'>
      {(isMealLoading) ? <Loader /> : <MealSingle recipe={recipe} recipeDetails={recipeDetails} recipeIngredients={recipeIngredients} />}
    </main>
  );
};

export default MealDetailsPage
