import React from 'react'
import Cards from '../Cards/Cards'
import './game.css'
import DataContext from '../../Context/DataContext'
import { useContext } from 'react'

const Game = () => {

    const { money, setMoney, bet, setBet } = useContext(DataContext)

    return (
        <div className='game'>
            <div className='info-board'>
                <samp>haa</samp>
                <aside>Bet: <b>{bet}</b></aside>
                <span>Credit: <b>{money}</b></span>
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
