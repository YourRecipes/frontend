import './App.scss';
// react router dom
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import {useState, useEffect} from 'react';
// pages
import { Home, MealDetails, Error, Category } from "./pages/index";
// components
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import React from 'react';
import LoginPage from './components/LoginPage/LoginPage.js';
import Loader from './components/Loader/Loader.js';
import Navbar from './components/Header/Navbar.js';
import Ingredients from './components/Meal/Ingredients.js';

function App() {
  const [ userData, setUserData ] = useState(JSON.parse(localStorage.getItem('userData') || "{}"));
  const [ areIngredientsLoading, setAreIngredientsLoading ] = useState(true);
  const [ ingredients, setIngredients ] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8008/ingredients')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        const newData = {};

        for (const ingredient of data) {
          newData[ingredient.id] = ingredient;
        }
        setIngredients(newData);
        setAreIngredientsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching ingredients:', error);
        setAreIngredientsLoading(true);
      });
  }, [areIngredientsLoading]);

  return (<>
    {
      areIngredientsLoading
        ? <Loader />
        : 
        <BrowserRouter>
            <Navbar userData={userData} />
            <Routes>
              <Route path="/" element={<><Header /><Home /></>} />
              <Route path="/login" element={<LoginPage setUserData={setUserData} />} />
            <Route path="/ingredients" element={ <Ingredients userData={userData} ingredients={ingredients} />} />
              <Route path="/recipe/:id" element={<MealDetails ingredients={ingredients} />} />
            <Route path="/recipes" element={<Category userData={userData} />} />
              <Route path="*" element={<Error />} />
            </Routes>
          </BrowserRouter>
        }
  </>);
}

export default App;
