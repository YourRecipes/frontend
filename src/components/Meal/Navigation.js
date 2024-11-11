import React, { useState } from 'react';
import "./Navigation.scss";

const Navigation = ({ currPage, totalPages, setPage }) => {

  const url = new URL(window.location.href);

  const handleNextPage = () => {
    if (currPage < totalPages) {
      setPage(currPage + 1);
      url.searchParams.set('page', `${currPage + 1}`);
      console.log(currPage, url.toString());
      window.location.href = url.toString();
    }
  };

  const handlePreviousPage = () => {
    if (currPage > 1) {
      setPage(currPage - 1);
      url.searchParams.set('page', `${currPage - 1}`);
      window.location.href = url.toString();
    }
  };

  return (
    <div className='navigation'>
      <button onClick={handlePreviousPage} disabled={currPage === 1}>
        Previous Page
      </button>
      <span>Page {currPage} of {totalPages}</span>
      <button onClick={handleNextPage} disabled={currPage === totalPages}>
        Next Page
      </button>
    </div>
  );
};

export default Navigation;