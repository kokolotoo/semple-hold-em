import React from 'react';
import DataContext from '../../Context/DataContext';
import { useState, useEffect, useContext } from 'react';
import { draftedCard } from './draftedCard';
import './carts.css'


const Cards = () => {
  const [currentCards, setCurrentCards] = useState([])
  const { deckOfCards } = useContext(DataContext);

  useEffect(() => {
    const rowCards = draftedCard()
    setCurrentCards(rowCards)
    console.log(rowCards);
  }, [])



  return (
    <div>
      <div className='cards'>
        {currentCards.map((cart, i) =>
          <section key={i} className='single-cart'>
            <img src={cart.img} alt="" /><hr />
            <button className='play-buttons'>hold</button>
          </section>

        )}
      </div>

    </div>
  );
}

export default Cards;
