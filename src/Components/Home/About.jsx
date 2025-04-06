import React from 'react'
import './home.css'

const About = () => {
  return (
    <main className='about-info'>

      <b className='important-message'>
        We value your privacy. When you sign in to the game, your email address is used solely to identify your account.
      </b>
      <ul>
        <li> Your email is never shared with third parties.</li>
        <li> It is not used for marketing or promotional purposes.</li>
        <li> It is stored securely and used only to enable your access to the game.</li>
        <li> If you choose to delete your account, your email and any associated data will be permanently removed.</li>
        <li> Your email is also used to securely store your game results and progress. This allows you to access your data across devices and keep track of your achievements.</li>
      </ul>
      
      <p>
        It is not played with real money and potential winnings are not paid out.
      </p>
      <h3>Have fun 😎</h3>
      <footer>
        <p> Created by <b>Kokoloto&reg;</b></p>
      </footer>
    </main>
  )
}

export default About
