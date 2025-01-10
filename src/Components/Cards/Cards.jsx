import React from 'react';
import DataContext from '../../Context/DataContext';
import { useState, useEffect, useContext } from 'react';
import { draftedCard } from './draftedCard';
import FlippedCards from './FlippedCards';
import './carts.css'


const Cards = () => {

  const { isOpened, currentCards, setCurrentCards } = useContext(DataContext);

  

  const stopCard = (current) => {
    const newCards = currentCards.map(item => {
      if (item.symbol === current) {
        return { ...item, stopped: !item.stopped }
      }
      return item
    })
 

    setCurrentCards(newCards)
  }

  return (
    <div>
      <div className='cards'>
        {currentCards.map((cart, i) =>
          <section key={i} className='single-cart'>
            <FlippedCards cart={cart} /><hr />
            <button
              className='play-buttons'
              onClick={() => stopCard(cart.symbol)}
              style={{
                backgroundColor: isOpened ? 'grey' : cart.stopped ? 'red' : "green",
              }}
              disabled={isOpened}
            ><b> {cart.stopped ? 'Kept' : "Keep"}</b>
            </button>
          </section>

        )}
      </div>

    </div>
  );
}

export default Cards;
