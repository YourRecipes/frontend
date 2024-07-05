import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import "./Header.scss";
import { MdFoodBank} from "react-icons/md";
import { IoMdMenu} from "react-icons/io";
import { useSidebarContext } from '../../context/sidebarContext';

const Navbar = ({ userData }) => {
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    const offset = window.scrollY;
    if(offset > 60){
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  })

  console.log(userData);

  return (
    <nav className={`navbar bg-orange flex align-center ${scrolled ? 'scrolled': ""}`}>
      <div className='container w-100'>
        <div className='navbar-content text-white'>
          <div className='brand-and-toggler flex align-center justify-between'>
            <Link to="/" className='navbar-brand fw-3 fs-22 flex align-center'>
              <MdFoodBank />
              <span className='navbar-brand-text fw-7'>CulinaryCompanion</span>
            </Link>
            <div className='navbar-links'>
              <Link to="/ingredients" className='navbar-link'>Ingredients</Link>
              <Link to="/recipes" className='navbar-link'>Recipes</Link>
              <Link to="/recipes?includingIngredients=1" className='navbar-link'>Recipes For Me</Link>
            </div>
            <div className='n</div>avbar-btns flex align-center'>
              <b>
              {userData.user ? (
                <Link to={`/user/${userData.user.id}`} className='navbar-user navbar-show-btn text-white'>{userData.user.name}</Link>
              ) : (
                <Link to="/login" className='navbar-login-btn navbar-show-btn text-white'>Login</Link>
                )}
                </b>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar