import React, {useEffect, useState} from 'react';
import "./Meal.scss";
import Loader from '../Loader/Loader.js';

const Ingredients = ({userData, ingredients}) => {
  const ingredientDivision = Math.ceil(ingredients.length / 3);
  const sortedIngredients = ingredients.toSorted((a, b) => a.title.localeCompare(b.title));
  const [ userIngredientsLoaded, setUserIngredientsLoaded ] = useState(false);
  const [ userIngredients, setUserIngredients ] = useState();

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await fetch(`http://localhost:8008/ingredients/user/${userData.user.id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userData.user.id}` 
          }
        });
        const data = await response.json();
        setUserIngredients(new Set(data?.map(ingredient => ingredient.ingredientId)));
        setUserIngredientsLoaded(true);
        console.log(userIngredients);
      } catch (error) {
        console.error('Error fetching ingredients:', error);
      }
    };

    fetchIngredients();
  }, [userIngredientsLoaded]);

  const postIngredient = (ingredientId, checkState) => {

    console.log(ingredientId, checkState);
    if (checkState) {
      fetch(`http://localhost:8008/ingredient/user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userData.user.id}` 
        },
        body: JSON.stringify({
          userId: userData.user.id,
          ingredientId
        })
      });
    } else {
      fetch(`http://localhost:8008/ingredient/user/${userData.user.id}/${ingredientId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userData.user.id}` 
        }
      });
    }
  }

  const checkboxInsert = ({ id, title }, index) => (
    <label key={index} className='checkbox-label'>
      <input
        type='checkbox'
        value={id}
        onChange={(e) => postIngredient(id, e.target.checked)}
        checked={userIngredients?.has(id)}
      />
      &nbsp;{title}
    </label>
  );

  return (
    (!userIngredients || !userIngredientsLoaded ) ? <Loader /> :
    <>
    <div className='section-wrapper'>
      <div className='container'>

        <div className='sc-title'>Ingredients</div>
        <section className='sc-details bg-white'>
          <div className='details-head grid'>

            <div className='details-intro'>
              <h3 className='title text-orange ingredients-h3'>Your Ingredients</h3>
              <div className=''>
                <div className="flex flex-row">
                <div className='category flex flex-column'>
                  {sortedIngredients.slice(0, ingredientDivision).map(checkboxInsert)}
                </div>
                <div className='category flex flex-column'>
                  {sortedIngredients.slice(ingredientDivision, ingredientDivision * 2 + 1).map(checkboxInsert)}
                  </div>
                  <div className='category flex flex-column'>
                  {sortedIngredients.slice(ingredientDivision * 2 + 1).map(checkboxInsert)}
                </div>
                </div>
              </div>


              <div className='ingredients my-5 px-3 py-3'>
                <h6 className='fs-16 text-white'>Ingredients</h6>
              </div>
            </div>
          </div>

          <div className='details-body'>
            <div className='measures my-4'>
              <h6 className='fs-16'>MEASUREMENTS</h6>
            </div>

            <div className='instructions my-4'>
              <h6 className='fs-16'>INSTRUCTIONS</h6>
            </div>
          </div>
        </section>
      </div>
      </div>
      </>
  )
}

export default Ingredients