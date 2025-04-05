import React, { useState, useContext } from 'react';
import './home.css'
import DataContext from '../../Context/DataContext';
import { Link } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { Modal } from 'antd';

const ForgotPage = () => {
  const [modal, contextHolder] = Modal.useModal();
  const [searchEmail, setSearchEmail] = useState('')

  const info = () => {
    Modal.info({
      title: '',
      content: 'If an account with this email exists, a reset link has been sent.',
      onOk() { },
    });
  };

  const checkForPassword = async (e) => {
    e.preventDefault()
    const auth = getAuth();
    try {
      await sendPasswordResetEmail(auth, searchEmail, { url: 'https://sample-hold-em.netlify.app/login' });
      info()
      setSearchEmail('')
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <main className='forgot-container'>

      {contextHolder}

      <form onSubmit={checkForPassword}>

        <label htmlFor="email">Enter email:</label>
        <input type="email"
          placeholder='email'
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
          required
        />

        <button>Submit</button>
      </form>

      <section className='navigation-container'>
        <Link to='/login'>Login</Link>
        <Link to='/register'>Registration</Link>
        <Link to='/game'>Demo Game</Link>
      </section>

    </main>
  );
}

export default ForgotPage;
