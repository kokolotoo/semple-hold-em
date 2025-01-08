import React from 'react';
import { useState, useEffect, useContext } from "react";
import DataContext from '../../Context/DataContext';
import { useLocation } from "react-router-dom"
import './game.css'


const PlayButtons = () => {
    const { setIsOpened, setFirstRow } = useContext(DataContext);
    const location = useLocation();
    const [gameIsOpen, setGameIsOpen] = useState(false)
    const route = location.pathname.startsWith('/game')
    useEffect(() => {
        setGameIsOpen(route)
    }, [route])

    const play = () => {
        
        setIsOpened(prev => !prev)
        setFirstRow(prev => !prev)
    }

    return (

        gameIsOpen ?
            (
                <div className="button-board" >
                    <button className='bet+ button'>Bet ➖</button>
                    <button className='bet- button'>Bet ➕</button>
                    <button className='red button'>Red</button>
                    <button className='black button'>Black</button>
                    <button className='get button'>Get</button>
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
