import React from 'react';
import { useState, useEffect, useContext } from "react";
import DataContext from '../../Context/DataContext';
import { useLocation } from "react-router-dom"
import './game.css'
import usePlayGame from '../../Hooks/PlayGame';
import { GiPokerHand } from "react-icons/gi";
import audioFile from '../../assets/button-sound.mp3';

const PlayButtons = () => {
    const { setIsOpened, firstRow, setFirstRow, bet, setBet, winCheckResult,
        setWinCheckResult, disablePlayButton, setDoubleButtonKey,
        currentCards, setCurrentCards, draftedCard, deckOfCards, money, setMoney
    } = useContext(DataContext);

    const location = useLocation();
    const [gameIsOpen, setGameIsOpen] = useState(false)
    const route = location.pathname.startsWith('/game')
    const { play } = usePlayGame()
    const audio = new Audio(audioFile);

    useEffect(() => {
        setGameIsOpen(route)
    }, [route])

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

        gameIsOpen ?
            (
                <div className="button-board" >
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

                    <section className='red-black section'>
                        <button className='red button'>Red</button>
                        <button className='black button'>Black</button>

                    </section>

                    <section className='get-double section'>
                        <button className='get button'
                            disabled={winCheckResult ? false : true}
                            onClick={getMoney}
                            style={{ backgroundColor: winCheckResult ? 'lightgreen' : 'lightgray' }}
                        >Get</button>

                        <button className='double button'
                            onClick={() => setDoubleButtonKey(prev => !prev)}
                            disabled={winCheckResult ? false : true}
                            style={{ backgroundColor: winCheckResult ? 'lightgreen' : 'lightgray' }}
                        >Double</button>
                    </section>

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