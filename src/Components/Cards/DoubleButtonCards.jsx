import React from 'react';
import './carts.css'
import DataContext from '../../Context/DataContext';
import { useState, useEffect, useContext } from 'react';
import RedBlackBtns from '../PlayGame/Buttons/RedBlackBtns';
import FlippedCards from './FlippedCards';



const DoubleButtonCards = () => {
    const { deckOfCards } = useContext(DataContext);
    const [winMessage, setWinMessage] = useState('')
    const generateCard = () => {
        const card = deckOfCards[Math.floor(Math.random() * deckOfCards.length)];
        return card
    }

    const [playCards, setPlayCards] = useState([generateCard()])


    return (
        <div className='cards double'>
            {playCards.map((cart, i) =>

                <FlippedCards cart={cart} key={i} />

            )}
            <b style={{ fontSize: 'xx-large' }}>{winMessage}</b>
            <RedBlackBtns
                generateCard={generateCard}
                playCards={playCards}
                setPlayCards={setPlayCards}
                setWinMessage={setWinMessage}
            />
        </div>
    );
}

export default DoubleButtonCards;
