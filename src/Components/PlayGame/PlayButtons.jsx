import React from 'react';
import { useState, useEffect, useContext } from "react";
import DataContext from '../../Context/DataContext';
import { useLocation } from "react-router-dom"
import './game.css'
import usePlayGame from '../../Hooks/PlayGame';
const PlayButtons = () => {
    const { setIsOpened, firstRow, setFirstRow, bet, setBet, winCheckResult,
        setWinCheckResult,
        currentCards, setCurrentCards, draftedCard, deckOfCards, money, setMoney
    } = useContext(DataContext);

    const location = useLocation();
    const [gameIsOpen, setGameIsOpen] = useState(false)
    const route = location.pathname.startsWith('/game')
    const { play } = usePlayGame()

    useEffect(() => {
        setGameIsOpen(route)
    }, [route])

    const getMoney = () => {
        if (winCheckResult) {
            setMoney(prev => prev + winCheckResult.win)
            setWinCheckResult('')
            setCurrentCards(draftedCard())
        }
    }


    return (

        gameIsOpen ?
            (
                <div className="button-board" >
                    <section className='betButtons'>

                        <button className='bet- button'
                            disabled={bet === 1 ? true : false}
                            onClick={() => setBet(prev => prev - 1)}
                        >Bet - 1</button>

                        <button className='bet- button'
                            disabled={bet < 5 ? true : false}
                            onClick={() => setBet(prev => prev - 5)}
                        >Bet - 5</button>

                    </section>

                    <section className='betButtons'>

                        <button className='bet+ button'
                            disabled={money <= bet ? true : false}
                            onClick={() => setBet(prev => prev + 1)}
                        >Bet + 1</button>

                        <button className='bet+ button'
                            disabled={money <= bet ? true : false}
                            onClick={() => setBet(prev => prev + 5)}
                        >Bet + 5</button>

                    </section>

                    <button className='red button'>Red</button>
                    <button className='black button'>Black</button>
                    <button className='get button' onClick={getMoney}>Get</button>
                    <button className='double button'>Double</button>
                    <button
                        onClick={play}
                        className='playButton'
                    >Play</button>
                </div >
            )
            : null

    );
}

export default PlayButtons;