import React from 'react'
import ReactCardFlip from 'react-card-flip';
import { useState } from 'react';
import './carts.css'

const FlippedCards = ({cart}) => {
    const [flipped, setFlipped] = useState(false)
    const handleFlip = () => {
        setFlipped(true)
        setTimeout(() => {
            setFlipped(false)
        }, 1500)
    }
  return (
      <ReactCardFlip
          isFlipped={flipped}
          flipDirection="horizontal"
          flipSpeedBackToFront={0.5}
          flipSpeedFrontToBack={0.5}
      >
          <section>
              <img src="https://deckofcardsapi.com/static/img/back.png" alt="" />
              <br />
              <button onClick={handleFlip}>Click to flip</button>
          </section>

          <section>
              <img src={cart.img} alt="" />
             <br />
          </section>
      </ReactCardFlip>
  )
}

export default FlippedCards
