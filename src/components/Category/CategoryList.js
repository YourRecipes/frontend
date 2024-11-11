import React from 'react';
import "./Category.scss";

const CategoryList = ({categories}) => {
  return (
    <div className='section-wrapper bg-whitesmoke'>
        <div className='container'>
            <div style={{ display: 'flex', flexDirection: "row", flexWrap: "nowrap" }}>
          <div style={{ flex: 2 }}>
            <div className='sc-title'>Welcome to Culinary Companion!</div>
                    <div>Welcome to your favorite culinary platform, where cooking is made easy and exciting! With just a few ingredients from your kitchen, we help you discover delicious desi recipes that bring the rich flavors of Indian and Pakistani cuisine to life. Whether you're craving biryani, pakoras, or a spicy curry, we've got the perfect recipe for you. Let us guide you on a culinary journey, helping you create tasty meals with what you already have!</div>
                </div>
                <div style={{ flex: 1, marginLeft: '20px', width: "400px" }}>
                    <img 
                        src="https://nationalmadeeasy.com/wp-content/uploads/2022/12/food-table-1110x740-1.png" 
                        alt="Culinary Image" 
                        style={{ maxWidth: '400px' }} 
                    />
          </div>
          </div>
            </div>
            <br />
            <br />
            <br />
        </div>
  )
}

export default CategoryList