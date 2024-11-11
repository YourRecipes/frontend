import React, {useEffect, useState} from 'react';
import "./Meal.scss";
import Loader from '../Loader/Loader.js';

const Ingredients = ({userData, ingredients}) => {
  const sortedIngredients = Object.values(ingredients).toSorted((a, b) => a.title.localeCompare(b.title));
  const ingredientDivision = Math.ceil(sortedIngredients.length / 3);
  const [ userIngredientsLoaded, setUserIngredientsLoaded ] = useState(false);
  const [ userIngredients, setUserIngredients ] = useState();
  const [ checkboxToggle, setCheckboxToggle ] = useState(false);

  console.log("BEFORE SORT", ingredients);
  console.log("SORTED", sortedIngredients)

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
        const userIngredientsLoaded = new Set(data?.map(ingredient => ingredient.ingredientId));
        console.log(userIngredientsLoaded);
        setUserIngredients(userIngredientsLoaded);
        setUserIngredientsLoaded(true);
      } catch (error) {
        console.error('Error fetching ingredients:', error);
      }
    };

    fetchIngredients();
  }, [userIngredientsLoaded, checkboxToggle]);

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
      fetch(`http://localhost:8008/ingredient/${userData.user.id}/${ingredientId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userData.user.id}` 
        }
      });
    }
    setCheckboxToggle(!checkboxToggle);
    return checkState;
  }

  const checkboxInsert = ({ id, title }, index) => (
    <label key={index} className='checkbox-label'>
      <input
        type='checkbox'
        value={id}
        onChange={(e) => postIngredient(id, e.target.checked)}
        checked={userIngredients.has(id)}
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
            </div>
          </div>

        </section>
      </div>
      </div>
      </>
  )
}

export default Ingredients