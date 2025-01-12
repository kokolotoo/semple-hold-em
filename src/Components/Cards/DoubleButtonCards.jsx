import React from 'react';
import './carts.css'
import DataContext from '../../Context/DataContext';
import { useState, useEffect, useContext } from 'react';
import RedBlackBtns from '../PlayGame/Buttons/RedBlackBtns';
import FlippedCards from './FlippedCards';



const DoubleButtonCards = () => {
    const { deckOfCards } = useContext(DataContext);

    const generateCard = () => {
        const card = deckOfCards[Math.floor(Math.random() * deckOfCards.length)];
        return card
    }

    const [playCards, setPlayCards] = useState([generateCard()])


    return (
        <div>
            {playCards.map((cart, i) =>
                <section key={i} className='draftedCard-section'>
                    <FlippedCards cart={cart}
                        className={i > 0 ? 'nex-cart' : null}
                    /><hr />
                </section>

            )}

            <RedBlackBtns
                generateCard={generateCard}
                playCards={setPlayCards}
                setPlayCards={setPlayCards}
            />
        </div>
    );
}

export default DoubleButtonCards;
