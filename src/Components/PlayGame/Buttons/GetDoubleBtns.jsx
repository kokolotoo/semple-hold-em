import React from 'react';
import '../game.css'
import { useContext } from "react";
import DataContext from '../../../Context/DataContext';

const GetDoubleBtns = () => {

    const { winCheckResult,
        setWinCheckResult, setDoubleButtonKey,
        currentCards, setCurrentCards, setMoney,
    } = useContext(DataContext);

    const getMoney = () => {
        if (winCheckResult) {
            setMoney(prev => prev + winCheckResult.win)
            setWinCheckResult('')
            setDoubleButtonKey(false)
            setCurrentCards(currentCards.map(item => {
                return { ...item, flipped: false }
            }));
        }
    }

    return (
        <section className='get-double section'>
            <button className='get button'
                title='Take a win'
                disabled={winCheckResult ? false : true}
                onClick={getMoney}
                style={{ backgroundColor: winCheckResult ? 'lightgreen' : 'lightgray' }}
            >Get</button>

            <button className='double button'
                title='Double the win'
                onClick={() => setDoubleButtonKey(true)}
                disabled={winCheckResult ? false : true}
                style={{ backgroundColor: winCheckResult ? 'lightgreen' : 'lightgray' }}
            >Double</button>
        </section>
    );
}

export default GetDoubleBtns;
