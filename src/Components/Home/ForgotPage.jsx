import React, { useState, useContext } from 'react';
import './home.css'
import DataContext from '../../Context/DataContext';
import { Link } from 'react-router';

const ForgotPage = () => {
 
  const { profiles } = useContext(DataContext)
  const [searchEmail, setSearchEmail] = useState('')
  const [searchResult, setSearchResult] = useState(null)

  const checkForPassword = (e) => {
    e.preventDefault()
    const findMatch = profiles.filter(profile => profile.email === searchEmail)
    if (findMatch.length > 0) {
      setSearchResult(`Username: ${findMatch[0].username} / pass: ${findMatch[0].password}`)
    } else {
      setSearchResult(`Not profile with : ${searchEmail}`)
    }
    setSearchEmail('')
  }

  return (
    <main className='forgot-container'>

      {searchResult && <h3>{searchResult}</h3>}

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
