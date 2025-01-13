import React from 'react';
import '../game.css'
import { useContext } from "react";
import DataContext from '../../../Context/DataContext';
import audioFile from '../../../assets/button-sound.mp3';


const DecrementBtns = () => {

    const { bet, setBet, firstRow } = useContext(DataContext);

    const audio = new Audio(audioFile);

    const decrement = (number) => {
        if (firstRow) {
            setBet(prev => prev - number)
            audio.play();
        }
    }

    return (
        <section className='betButtons'>

            <button className='bet- button'
                disabled={bet <= 1 ? true : false}
                onClick={() => { decrement(1) }}
            >Bet - 1</button>

            <button className='bet- button'
                disabled={bet < 5 ? true : false}
                onClick={() => { decrement(5) }
                }
            >Bet - 5</button>

        </section>

    );
}

export default DecrementBtns;
