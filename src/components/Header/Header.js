import React from 'react';
import "./Header.scss";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <header className='header'>
      <div className='header-content flex align-center justify-center flex-column text-center'>
        <h1 className='text-white header-title ls-2'>CulinaryCompanion</h1>
        <p className='text-uppercase text-white my-3 ls-1'><i>Cooking for everybody!</i></p>
        <button className='btn btn-primary' onClick={() => window.location.href = '/ingredients'}>Go to My Ingredients</button>
      </div>
    </header>
  )
}

export default Header;