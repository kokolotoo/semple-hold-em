import React from 'react';
import './carts.css'
import DataContext from '../../Context/DataContext';
import { useState, useEffect, useContext } from 'react';



const DoubleButtonCards = () => {
    const { isOpened, currentCards,
        setCurrentCards, setDoubleButtonKey
    } = useContext(DataContext);

    return (
        <div>
            test
            <button 
            onClick={()=>setDoubleButtonKey(prev => !prev)}
            >Go back</button>
        </div>
    );
}

export default DoubleButtonCards;
