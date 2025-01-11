import React from 'react'
import Cards from '../Cards/Cards'
import './game.css'
import DataContext from '../../Context/DataContext'
import { useContext } from 'react'
import Combination from './Combination'

const Game = () => {

    const { money, setMoney, bet, setBet, winCheckResult } = useContext(DataContext)
    

    return (
        <main className='game'>
            <header className='info-board'>
                <samp>Bet: <b>{bet}</b></samp>
                <samp> Current win: <b>{winCheckResult.win ? winCheckResult.win : 0}</b> </samp>
                <samp>Credit: <b>{money}</b></samp>
            </header>

            <fieldset className="game-info">
                <legend>Win combination</legend>
               <Combination />
            </fieldset>

            <section className="card-board">
                <Cards />
            </section>
        </main>
    )
}

export default Game
