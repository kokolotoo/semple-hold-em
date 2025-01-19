import React from 'react';
import { useState, useEffect, useContext } from "react";
import DataContext from '../../Context/DataContext';
import { useLocation } from "react-router-dom"
import './game.css'
import usePlayGame from '../../Hooks/PlayGame';
import { GiPokerHand } from "react-icons/gi";
import GetDoubleBtns from './Buttons/GetDoubleBtns';
import IncrementBtns from './Buttons/IncrementBtns';
import DecrementBtns from './Buttons/DecrementBtns';

const PlayButtons = () => {
    const { winCheckResult, disablePlayButton } = useContext(DataContext);
    const location = useLocation();
    const [gameIsOpen, setGameIsOpen] = useState(false)
    const route = location.pathname.startsWith('/game')
    const { play } = usePlayGame()

    useEffect(() => {
        setGameIsOpen(route)
    }, [route])

    return (
        gameIsOpen ?
            (
                <div className="button-board" >
                    <DecrementBtns />
                    <IncrementBtns />
                    <GetDoubleBtns />

                    <button
                        disabled={
                            disablePlayButton ? true :
                                winCheckResult ? true : false
                        }
                        style={{ backgroundColor: (disablePlayButton || winCheckResult) ? 'gray' : 'darkgreen' }}
                        onClick={play}
                        className='playButton'
                    >Play</button>

                </div >
            )
            :
            (
                <h2 className='info-text'>
                    <GiPokerHand className='game-pic' /> Poker slot game
                </h2>
            )
    );
}

export default PlayButtons;