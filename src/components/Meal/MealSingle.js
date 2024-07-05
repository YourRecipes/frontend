import React from 'react';
import "./Meal.scss";
import { FaUtensilSpoon } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { Link } from "react-router-dom";
import { BiChevronsRight } from "react-icons/bi";
import { AiOutlineCheckSquare } from 'react-icons/ai';

const MealSingle = ({recipe, recipeDetails, recipeIngredients}) => {
  console.log("recipe", recipe);
  console.log("ingredients",recipeIngredients);
  const instructions = recipeDetails?.instructions
    .split('.')
    .filter(instruction => instruction.length > 1)
    .map(instruction => instruction.trim());

  return (
    <div className='section-wrapper'>
      <div className='container'>
        <div className='breadcrumb bg-orange text-white'>
          <ul className='flex align-center my-2'>
            <li className='breadcrumb-item'>
              <Link to = "/" className='flex align-center'>
                <AiFillHome size = {22} />
              </Link>
            </li>
            <li className='flex align-center mx-1'>
              <BiChevronsRight size = {23} />
            </li>
            <li className='breadcrumb-item flex'>
              <span to = "" className='fs-15 fw-5 text-uppercase'>{recipe?.title}</span>
            </li>
          </ul>
        </div>

        <div className='sc-title'>Recipe Details</div>
        <section className='sc-details bg-white'>
          <div className='details-head grid'>
            <div className='details-img'>
              <img src = {`https://www.archanaskitchen.com/images/archanaskitchen/${recipe?.imagePath}`} alt = "" className='img-cover' />
            </div>

            <div className='details-intro'>
              <h3 className='title text-orange'>{recipe?.title}</h3>
              <div className=''>
                <div className='category flex align-center'>
                  {/* <span className='text-uppercase fw-8 ls-1 my-1'></span> */}
                  <span className='py-3'>{ recipeDetails?.description }</span>
                </div>

                {/* <div className='source flex align-center'>
                  <span className='fw-7'>Source: &nbsp;</span>
                  <a href = {recipe.source}>
                    {recipe.source ? (recipe?.source).substring(0, 40) + "..." : "Not found" }
                  </a>
                </div> */}
              </div>

              {/* <div className='tags flex align-start flex-wrap'>
                <h6 className='fs-16'>Tags:</h6>
                <ul className='flex align-center flex-wrap'>
                  {
                    tags?.map((tag, idx) => (<li key = {idx} className = "fs-14">{tag}</li>))
                  }
                </ul>
              </div> */}

              <div className='ingredients my-5 px-3 py-3'>
                <h6 className='fs-16 text-white'>Ingredients</h6>
                <ul className='grid'>
                  {
                    recipeIngredients?.map(({ingredient}, idx) => (
                      <li key = {idx} className = "flex align-center">
                        <span className='li-dot'>{idx + 1}</span>
                        <span className='text-capitalize text-white fs-15'>{ingredient.title}</span>
                      </li>
                    ))
                  }
                </ul>
              </div>
            </div>
          </div>

          <div className='details-body'>
            <div className='measures my-4'>
              <h6 className='fs-16'>MEASUREMENTS</h6>
              <ul className='grid'>
                {
                  recipeIngredients?.map(({ingredient, quantity, form}, idx) => (
                    <li key = {idx} className = "fs-14 flex align-end">
                      <span className='li-icon fs-12 text-orange'>
                        <FaUtensilSpoon />
                      </span>
                      <span className='li-text fs-15 fw-6 op-09'>{quantity}{ingredient.measurement ? ` ${ingredient.measurement}` : ""}{form ? `, ${form}`: ""}</span>
                    </li>
                  ))
                }
              </ul>
            </div>

            <div className='instructions my-4'>
              <h6 className='fs-16'>INSTRUCTIONS</h6>
              <ul className='grid'>
                {
                  instructions?.map((instruction, idx) => (
                    <li key = {idx} className = "fs-14">
                      <AiOutlineCheckSquare size = {18} className = "text-orange li-icon" />
                      <span className='li-text fs-16 fw-5 op-09'>{instruction}</span>
                    </li>
                  ))
                }
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default MealSingle