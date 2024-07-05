import React, { useState } from 'react';
import "./Navigation.scss";

const Navigation = ({ currPage, totalPages }) => {
  const [currentPage, setCurrentPage] = useState(currPage);

  const url = new URL(window.location.href);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      url.searchParams.set('page', `${currentPage + 1}`);
      console.log(currentPage, url.toString());
      window.location.href = url.toString();
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      url.searchParams.set('page', `${currentPage - 1}`);
      window.location.href = url.toString();
    }
  };

  return (
    <div className='navigation'>
      <button onClick={handlePreviousPage} disabled={currentPage === 1}>
        Previous Page
      </button>
      <span>Page {currentPage} of {totalPages}</span>
      <button onClick={handleNextPage} disabled={currentPage === totalPages}>
        Next Page
      </button>
    </div>
  );
};

export default Navigation;