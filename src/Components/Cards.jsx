import React from 'react';
import useAxiosFetch from '../Hooks/useAxiosFetch';
import { useState, useEffect } from 'react';
import { draftedCard } from './Cards/draftedCard';

const Cards = () => {

  const { data, fetchError, isLoading } = useAxiosFetch('https://deckofcardsapi.com/api/deck/new/shuffle/?cards=AS,2S,KS,AD,2D,KD,AC,2C,KC,AH,2H,KH');
 



  return (
    <div>
      <h1>Cards</h1>
      {
        /*
          <img src="https://deckofcardsapi.com/static/img/back.png" alt="" width={150}/>
          <img src="https://deckofcardsapi.com/static/img/3D.png" alt="" width={150} />
          <img src="https://deckofcardsapi.com/static/img/AH.png" alt="" width={150} />
          <img src="https://deckofcardsapi.com/static/img/AH.png" alt="" width={150} />
          <img src="https://deckofcardsapi.com/static/img/AH.png" alt="" width={150} />
        */
      }
      <section style={{display:"flex", justifyContent:'center'}}>
        {draftedCard().map((item, i) =>
          <img src={`https://deckofcardsapi.com/static/img/${item}.png`} alt="" width={150} key={i}  />
        )}
      </section>

    </div>
  );
}

export default Cards;
