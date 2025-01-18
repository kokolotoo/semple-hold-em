import React, { useState, useContext } from 'react';
import './home.css'
import DataContext from '../../Context/DataContext';
import { useNavigate } from 'react-router';

const ForgotPage = () => {

    const {profiles} = useContext(DataContext)


  return (
    <main className='forgot-container'>
          <h2> In working progress</h2>
    </main>
  );
}

export default ForgotPage;
