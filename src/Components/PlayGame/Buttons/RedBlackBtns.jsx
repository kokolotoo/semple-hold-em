import React from 'react';
import '../game.css'
import { useContext } from "react";
import DataContext from '../../../Context/DataContext';

const RedBlackBtns = ({ generatedCard, playCards, setPlayCards }) => {

    const { doubleButtonKey, setMoney, winCheckResult, setWinCheckResult } = useContext(DataContext);

    const checkForWin = async (color) => {
        setPlayCards(prev => prev.map(item => ({ ...item, flipped: color })))
      


        // Помощна функция за закъснение
        const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    }


    return (
        <section className='red-black section'>
            <button className='red button'
                onClick={() => checkForWin(true)}
                disabled={doubleButtonKey ? false : true}
            >Red</button>

            <button className='black button'
                onClick={() => checkForWin(false)}
                disabled={doubleButtonKey ? false : true}
            >Black</button>

        </section>
    );
}

export default RedBlackBtns;
