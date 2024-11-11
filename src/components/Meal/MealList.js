import React from 'react';
import "./Meal.scss";
import { Link } from 'react-router-dom';
import { COURSES, CUISINES, DIET } from '../../constants.js';
import Navigation from './Navigation.js';

const MealList = ({ page, recipes, setPage }) => {
  console.log(recipes);
  return (
    <div className='section-wrapper'>
      <div className='container'>
        <div className='sc-title'>Recipes</div>
        <Navigation currPage={page || 1} setPage={setPage} totalPages={Math.ceil(recipes.pages / 10)} />
        <section className='sc-meal grid'>
          {
            recipes.recipes?.map(recipe => {
              const {id, title, imagePath, cuisine, course, diet, prep } = recipe;

              return (
                <Link to = {`/recipe/${id}`} className = "meal-itm align-center justify-center bg-white" key = {id}>
                  <div className='meal-itm-img'>
                    <img src = {`https://www.archanaskitchen.com/images/archanaskitchen/${imagePath}`} alt = {title} />
                    <div className='meal-itm-cat bg-orange text-orange fw-6'>{DIET[diet]}</div>
                  </div>

                  <div className='meal-itm-body'>
                    <div className='meal-itm-body-info flex flex-column'>
                      <div className='meal-itm-title fw-15 fw-6 op-09'>{title}</div>

                        <div className='meal-itm-body-info flex flex-row align-stretch'>
                          <div className='area fs-10 ls-1 fw-5 meal-itm-subtext text-start'>{COURSES[ course ]}</div>
                          <div className='area fs-10 ls-1 fw-5 meal-itm-subtext text-end'>{prep} min</div>
                        </div>
                    </div>
                  </div>
                </Link>
              )
            })
          }
        </section>
      </div>
    </div>
  )
}

export default MealList