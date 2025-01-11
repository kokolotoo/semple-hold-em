import React from 'react';
import '../game.css'
import { useContext } from "react";
import DataContext from '../../../Context/DataContext';
import audioFile from '../../../assets/button-sound.mp3';


const DecrementBtns = () => {

    const { bet, setBet } = useContext(DataContext);

    const audio = new Audio(audioFile);

    return (
        <section className='betButtons'>

            <button className='bet- button'
                disabled={bet <= 1 ? true : false}
                onClick={() => {
                    setBet(prev => prev - 1)
                    audio.play();
                }}
            >Bet - 1</button>

            <button className='bet- button'
                disabled={bet < 5 ? true : false}
                onClick={() => {
                    setBet(prev => prev - 5)
                    audio.play();
                }
                }
            >Bet - 5</button>

        </section>

    );
}

export default DecrementBtns;
