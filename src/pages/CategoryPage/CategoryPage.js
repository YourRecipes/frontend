import React, {useEffect, useState} from 'react';
import "./CategoryPage.scss";
import { useMealContext } from '../../context/mealContext';
import MealList from '../../components/Meal/MealList';
import { startFetchMealByCategory } from '../../actions/mealsActions';
import { useLocation } from 'react-router-dom';
import Loader from '../../components/Loader/Loader.js';

const CategoryPage = ({ userData }) => {
  const [ recipes, setRecipes ] = useState({});
  const [ areRecipesLoading, setAreRecipesLoading ] = useState(true);
  const location = useLocation();
  console.log("LOCATION", location);
  const [page, setPage] = useState(Number(new URLSearchParams(location.search).get('page')));
  const includingIngredients = new URLSearchParams(location.search).get('includingIngredients');
  const url = new URL('http://localhost:8008/recipes');
  url.searchParams.append('userId', `${userData.user ? userData.user.id : 0}`);
  url.searchParams.append('includingIngredients', `${userData.user ? includingIngredients ?? 0 : 0}`);
  url.searchParams.append('includingFavorites', `${userData.user ? 0 : 0}`);
  url.searchParams.append('page', `${page ? page : 1}`);
  console.log("URL:", url);
  
  const currentPage = Number(new URLSearchParams(location.search).get('page'));
  if (page != currentPage) {
    setPage(currentPage);
  }

  useEffect(() => {

    fetch(url, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
    })
      .then(response => response.json())
      .then(data => {
        console.log("RESPONSE DATA", data);
        setRecipes(data);
        setAreRecipesLoading(false);
        console.log(recipes);
      })
      .catch(error => {
        console.error('Error fetching recipes:', error);
      });
  }, [areRecipesLoading, includingIngredients]);
  return (
    <main className='main-content bg-whitesmoke'>
      {/* <div className='container'>
        <div className='cat-description px-4 py-4'>
          <h2 className='text-orange fw-8'>{name}</h2>
          <p className='fs-18 op-07'>{catDescription}</p>
        </div>
      </div> */}
      {
        (recipes && areRecipesLoading) ? <Loader /> : <MealList page={page ?? 1} setPage={setPage} recipes = { recipes } /> 
      }
    </main>
  )
}

export default CategoryPage
