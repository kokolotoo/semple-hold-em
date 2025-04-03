import React from 'react';
import './home.css'
import { Link } from 'react-router-dom';
import DataContext from '../../Context/DataContext';
import { useContext } from "react";
import useLoadGame from '../../Hooks/useLoadGame';

const HomePage = () => {
  const { loadedMoney } = useLoadGame();
  const { isLogin, user, setMoney } = useContext(DataContext)

  const playGame = () => {
    setMoney(loadedMoney)
  }

  return (
    <section className='home-page'>
      <h2>Welcome to sample Poker slot app</h2>

      {isLogin ?
        <main className='button-section'>
          <h3>Welcomme back <b>{user.name}</b></h3>
          <Link to='/game' onClick={playGame}>Play Game</Link>
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