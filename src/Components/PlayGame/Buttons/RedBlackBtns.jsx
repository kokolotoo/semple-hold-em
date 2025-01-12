import React, { useState, useRef } from 'react';
import '../game.css'
import { useContext } from "react";
import DataContext from '../../../Context/DataContext';
import loseAudio from '../../../assets/no-win.mp3'
import winAudio from '../../../assets/lowwin.mp3'

const RedBlackBtns = ({ generateCard, playCards, setPlayCards, setWinMessage }) => {
    const soundLose = useRef(new Audio(loseAudio));
    const soundWin = useRef(new Audio(winAudio));
    // Помощна функция за закъснение
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    const { doubleButtonKey, setDoubleButtonKey, setMoney, winCheckResult, setWinCheckResult } = useContext(DataContext);
    const redSymbols = ['♥', '♦'];
    const blackSymbols = ['♠', '♣'];

    const checkForWin = async (choiceColor) => {

        setPlayCards(prev => prev.map(item => ({ ...item, flipped: true })))
        await delay(100);
        let currentSymbol = (playCards[playCards.length - 1].symbol).slice(-1)

        if (redSymbols.includes(currentSymbol)) {
            currentSymbol = redSymbols
        } else {
            currentSymbol = blackSymbols
        }

        if (checkForEquals(currentSymbol, choiceColor)) {
            setWinCheckResult(prev => ({ ...prev, win: prev.win * 2 }))
            await delay(100);
            soundWin.current.play()
            await delay(400);
            setPlayCards(t => [...t, generateCard()])

        } else {
            await soundLose.current.play()
            await delay(1000);
            setWinCheckResult('')
            setDoubleButtonKey(false);
            setWinMessage('')
            setPlayCards([])
        }


    }

    const checkForEquals = (array1, array2) => {
        if (array1.every((value, i) => value === array2[i])) {
            setWinMessage('You Win')
            return true
        } else {
            setWinMessage('You Lose')
            return false
        }
    }




    return (
        <section className='red-black section'>
            <button className='red button'
                onClick={() => checkForWin(['♥', '♦'])}
                disabled={doubleButtonKey ? false : true}
            >Red</button>

            <button className='black button'
                onClick={() => checkForWin(['♠', '♣'])}
                disabled={doubleButtonKey ? false : true}
            >Black</button>

        </section>
    );
}

export default RedBlackBtns;
