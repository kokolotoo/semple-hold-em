import React from 'react'
import Cards from '../Cards/Cards'
import './game.css'
import DataContext from '../../Context/DataContext'
import { useContext } from 'react'

const Game = () => {

    const { money, setMoney, bet, setBet, winCheckResult } = useContext(DataContext)

    return (
        <div className='game'>
            <div className='info-board'>
                <samp>haa</samp>
                <aside>Bet: <b style={{ color: 'white' }}>{bet}</b></aside>
                <span>Credit: <b style={{ color: 'white' }}>{money}</b></span>
            </div>

            <div className="game-info">
                <h2>{winCheckResult.combination}</h2>
                <h1>{winCheckResult.win}</h1>

            </div>
            <div className="card-board">
                <Cards />
            </div>
        </div>
    )
}

export default Game
