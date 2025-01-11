import React from 'react';
import DataContext from '../../Context/DataContext'
import { useContext } from 'react'
import './game.css'
import { winningCombinations } from './winCombinations';

const Combination = () => {
    const { winCheckResult } = useContext(DataContext)
    const winResult = winCheckResult.combination

    return (
        <table>
            <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Profit</th>
                </tr>
            </thead>
            <tbody>
                {winningCombinations.map((row, i) =>
                    <tr key={i}
                        style={{
                            backgroundColor:
                                winResult === row.name ? 'lightgray' : 'transparent'
                        }}
                    >
                        <th scope="row">{row.name}</th>
                        <td>bet x {row.winMultiplier}</td>
                    </tr>
                )}
            </tbody>

        </table>
    );
}

export default Combination;
