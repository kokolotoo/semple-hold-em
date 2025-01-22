import React from 'react';
import './carts.css'
import RedBlackBtns from '../PlayGame/Buttons/RedBlackBtns';
import FlippedCards from './FlippedCards';
import useRedOrBlackButtons from '../../Hooks/useRedBlackButtons';


const DoubleButtonCards = () => {

    const { playCards, winMessage, checkForWin } = useRedOrBlackButtons()

    return (
        <div className='cards double'>
            {playCards.map((cart, i) =>

                <FlippedCards cart={cart} key={i} />
            )}

            <b style={{ fontSize: 'xx-large' }}>{winMessage}</b>

            <RedBlackBtns checkForWin={checkForWin} />

        </div>
    );
}

export default DoubleButtonCards;
