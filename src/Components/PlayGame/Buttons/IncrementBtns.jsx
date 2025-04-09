import React from 'react';
import '../game.css'
import { useContext , useEffect} from "react";
import DataContext from '../../../Context/DataContext';
import audioFile from '../../public/button-sound.mp3';
import { message } from 'antd';

const IncrementBtns = () => {
 const [messageApi, contextHolder] = message.useMessage();
    const { bet, setBet, money, firstRow } = useContext(DataContext);
    const audio = new Audio(audioFile);

    const increment = (number) => {
        if (firstRow) {
            const newBet = bet + number
            setBet(newBet)
            audio.play();
            if (newBet >= 50) {
                setBet(50)
                messageApi.open({
                    type: 'error',
                    content: 'Maximum bet: 50',
                });
                return
            }
        }
    }

    return (
        <section className='betButtons'>
            {contextHolder}
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
