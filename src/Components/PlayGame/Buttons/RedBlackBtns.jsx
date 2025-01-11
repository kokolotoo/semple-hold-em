import React from 'react';
import '../game.css'
import { useContext } from "react";
import DataContext from '../../../Context/DataContext';

const RedBlackBtns = () => {

    const { setChoiceColorCard, doubleButtonKey } = useContext(DataContext);

    return (
        <section className='red-black section'>
            <button className='red button'
                onClick={() => setChoiceColorCard('Red')}
                disabled={doubleButtonKey ? false : true}
            >Red</button>

            <button className='black button'
                onClick={() => setChoiceColorCard('Black')}
                disabled={doubleButtonKey ? false : true}
            >Black</button>

        </section>
    );
}

export default RedBlackBtns;
