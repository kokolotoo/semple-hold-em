import React from 'react';
import './home.css'
import { Link } from 'react-router-dom';
import DataContext from '../../Context/DataContext';
import { useEffect, useState, useContext } from "react";

const HomePage = () => {

  const { isLogin } = useContext(DataContext)

  return (
    <section className='home-page'>
      <header>Welcome to sample Poker slot app</header>

      {isLogin ?
        <main className='button-section'>
          <button><Link to='/game'>Play Game</Link></button>
        </main>
        :
        <main className='button-section'>

          <Link to='/login'>Login</Link>

          <Link to='/register'>Registration</Link>

          <Link to='/game'>Demo Game</Link>

        </main>
      }

    </section>
  );
}

export default HomePage;
<h1>Home Page</h1>