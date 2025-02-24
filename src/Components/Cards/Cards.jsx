import React from 'react';
import DataContext from '../../Context/DataContext';
import { useContext } from 'react';
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

    <div className='cards'>
      {currentCards.map((cart, i) =>
        <section key={i} className='single-cart'>
          <FlippedCards cart={cart} />
          <button
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


  );
}

export default Cards;
