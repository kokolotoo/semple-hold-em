import React from 'react'
import ReactCardFlip from 'react-card-flip';
import { useState } from 'react';
import './carts.css'

const FlippedCards = ({cart}) => {
    
  return (
      <ReactCardFlip
          isFlipped={cart.flipped}
          flipDirection="horizontal"
          flipSpeedBackToFront={0.5}
          flipSpeedFrontToBack={0.5}
      >
          <section>
              <img src="https://deckofcardsapi.com/static/img/back.png" alt="" />
          </section>

          <section>
              <img src={cart.img} alt="" />
          </section>
      </ReactCardFlip>
  )
}

export default FlippedCards
