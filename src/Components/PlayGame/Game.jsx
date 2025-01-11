import React from 'react'
import Cards from '../Cards/Cards'
import './game.css'
import DataContext from '../../Context/DataContext'
import { useContext } from 'react'
import Combination from './Combination'
import DoubleButtonCards from '../Cards/DoubleButtonCards'

const Game = () => {

    const { money, bet, winCheckResult, doubleButtonKey } = useContext(DataContext)


    return (
        <main className='game'>
            <header className='info-board'>
                <samp>Bet: <b>{bet}</b></samp>
                <samp>Win: <b>{
                    winCheckResult.win ? winCheckResult.win : 0
                }</b></samp>
                <samp>Credit: <b>{money}</b></samp>
            </header>

            <fieldset className="game-info">
                <legend>Win combination</legend>
                {doubleButtonKey ? <DoubleButtonCards /> :<Combination />}
            </fieldset>

            <section className="card-board">
                {doubleButtonKey ?  null : <Cards />}
                
            </section>
        </main>
    )
}

export default Game
