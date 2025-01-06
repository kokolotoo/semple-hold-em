import React from 'react';
import useAxiosFetch from '../../Hooks/useAxiosFetch';
import { useState, useEffect } from 'react';
import { draftedCard, generateDeck } from './draftedCard';
import './carts.css'


const Cards = () => {
  const [currentCards, setCurrentCards] = useState([])
  const { data, fetchError, isLoading } = useAxiosFetch('https://deckofcardsapi.com/api/deck/new/shuffle/?cards=AS,2S,KS,AD,2D,KD,AC,2C,KC,AH,2H,KH');

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
