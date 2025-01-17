import React from 'react';
import './home.css'
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <section className='home-page'>
      <header>Welcome to sample Poker slot app</header>
      <main className='button-section'>
        
        <button>Login</button>

        <button>Registration</button>

        <button><Link to='/game'>Demo Game</Link></button>

      </main>
      
    </section>
  );
}

export default HomePage;
<h1>Home Page</h1>