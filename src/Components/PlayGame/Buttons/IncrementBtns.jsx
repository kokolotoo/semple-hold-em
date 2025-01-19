import React from 'react';
import '../game.css'
import { useContext } from "react";
import DataContext from '../../../Context/DataContext';
import audioFile from '../../public/button-sound.mp3';


const IncrementBtns = () => {

    const { bet, setBet, money, firstRow } = useContext(DataContext);
    const audio = new Audio(audioFile);

    const increment = (number) => {
        if (firstRow) {
            if(bet >= 50){return}
            setBet(prev => prev + number)
            audio.play();
        }
    }

    return (
        <section className='betButtons'>

            <button className='bet+ button'
                disabled={money <= bet ? true : false}
                onClick={() => increment(1)}
            >Bet + 1</button>

            <button className='bet+ button'
                disabled={money <= bet ? true : false}
                onClick={() => increment(5)}
            >Bet + 5</button>

        </section>
    );
}

export default IncrementBtns;
