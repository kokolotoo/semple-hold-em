import React from 'react';
import DataContext from '../../Context/DataContext';
import { useState, useEffect, useContext } from 'react';
import { draftedCard } from './draftedCard';
import FlippedCards from './FlippedCards';
import './carts.css'


const Cards = () => {
  const [currentCards, setCurrentCards] = useState([])
  const { isOpened } = useContext(DataContext);


  useEffect(() => {
    const rowCards = draftedCard()
    setCurrentCards(rowCards)
  }, [])

  const stopCard = (current) => {
    const newCards = currentCards.map(item => {
      if (item.symbol === current) {
        return { ...item, stopped: !item.stopped }
      }
      return item
    })
    console.log(newCards);
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
                color: 'azure'
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
