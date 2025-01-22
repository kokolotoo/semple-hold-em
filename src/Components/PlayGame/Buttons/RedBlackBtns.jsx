import React from 'react';
import '../game.css'


const RedBlackBtns = ({checkForWin}) => {
  

    return (
        <section className='red-black section'>
            <button className='red button'
                onClick={() => checkForWin(['♥', '♦'])}
            >Red</button>

            <button className='black button'
                onClick={() => checkForWin(['♠', '♣'])}
            >Black</button>

        </section>
    );
}

export default RedBlackBtns;
