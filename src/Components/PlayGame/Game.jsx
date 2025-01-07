import React from 'react'
import Cards from '../Cards/Cards'
import './game.css'

const Game = () => {
    return (
        <div className='game'>
            <div className='info-board'>
                <samp>haa</samp>
                <aside>kiuh</aside>
                <span>Credit:</span>
            </div>

            <div className="game-info">

            </div>
            <div className="card-board">
                <Cards />
            </div>
        </div>
    )
}

export default Game
