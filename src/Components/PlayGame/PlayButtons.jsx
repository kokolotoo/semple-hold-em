import React from 'react';
import { useContext } from "react";
import DataContext from '../../Context/DataContext';


const PlayButtons = () => {
    const { setIsOpened } = useContext(DataContext);
    return (
        <div className="button-board">
            <button>Bet ➖</button>
            <button>Bet ➕</button>
            <button>Red</button>
            <button>Black</button>
            <button>Get</button>
            <button>Double</button>
            <button onClick={() => setIsOpened(prev => !prev)}>Play</button>
        </div>
    );
}

export default PlayButtons;
