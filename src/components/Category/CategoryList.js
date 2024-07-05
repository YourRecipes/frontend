import React from 'react';
import { Link } from 'react-router-dom';
import "./Category.scss";

const CategoryList = ({categories}) => {
  return (
    <div className='section-wrapper bg-whitesmoke'>
        <div className='container'>
        <div className='sc-title'>About Us</div>
        <div>Welcome to CulinaryCompanion! Your go-to website for browsing recipes made just for you. Lets
          make cooking accessible and convenient for everyone.</div>
        <br />
        <br />
        <br />
        </div>
    </div>
  )
}

export default CategoryList