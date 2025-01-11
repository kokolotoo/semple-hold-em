import React from 'react';
import './carts.css'
import DataContext from '../../Context/DataContext';
import { useState, useEffect, useContext } from 'react';



const DoubleButtonCards = () => {
    const { deckOfCards, choiceColorCard, setMoney,
        setChoiceColorCard, setDoubleButtonKey, winCheckResult, setWinCheckResult
    } = useContext(DataContext);

    //const [currentWin, setCurrentWin] = useState(winCheckResult.win)

    const getWin = () => {



        setMoney(prev => prev + currentWin)
        setCurrentWin(0)
        setDoubleButtonKey(false)
    }

    return (
        <div>

            <button>Go back</button>
        </div>
    );
}

export default DoubleButtonCards;
