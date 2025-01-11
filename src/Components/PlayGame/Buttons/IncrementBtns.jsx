import React from 'react';
import '../game.css'
import { useContext } from "react";
import DataContext from '../../../Context/DataContext';
import audioFile from '../../../assets/button-sound.mp3';


const IncrementBtns = () => {

    const { bet, setBet, money } = useContext(DataContext);
    const audio = new Audio(audioFile);

    return (
        <section className='betButtons'>

            <button className='bet+ button'
                disabled={money <= bet ? true : false}
                onClick={() => {
                    setBet(prev => prev + 1)
                    audio.play();
                }}
            >Bet + 1</button>

            <button className='bet+ button'
                disabled={money <= bet ? true : false}
                onClick={() => {
                    setBet(prev => prev + 5)
                    audio.play();
                }
                }
            >Bet + 5</button>

        </section>
    );
}

export default IncrementBtns;
