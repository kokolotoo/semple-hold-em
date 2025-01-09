import React from 'react';
import { useState, useEffect, useContext } from "react";
import DataContext from '../../Context/DataContext';
import { useLocation } from "react-router-dom"
import './game.css'


const PlayButtons = () => {
    const { setIsOpened, firstRow, setFirstRow, bet, setBet,
        currentCards, setCurrentCards, draftedCard, deckOfCards, money, setMoney
    } = useContext(DataContext);
    const location = useLocation();
    const [gameIsOpen, setGameIsOpen] = useState(false)
    const route = location.pathname.startsWith('/game')

    useEffect(() => {
        setGameIsOpen(route)
    }, [route])

    const play = () => {

        if (firstRow) {
            setCurrentCards(draftedCard())
            if (bet > money) {
                alert("Not money")
                return
            }

            setMoney(prev => prev - bet)
            setTimeout(() => {
                flipCards()
            }, 400)
            setTimeout(() => {
                setIsOpened(prev => !prev)
            }, 1500)

        } else {

            const newCards = currentCards.map(item => {
                if (!item.stopped) {
                    return { ...item, flipped: !item.flipped }
                }
                return item
            })
            setCurrentCards(newCards);//До тук картите се обръщат освен стопираните
            generateNewRowCards();
            setTimeout(() => {
                flipCards();
                setIsOpened(prev => !prev)
            }, 400)

        }
        setFirstRow(prev => !prev)
    }


    const flipCards = (index = 0) => {
        if (index >= currentCards.length) return; // Спри, когато всички карти са обработени

        setCurrentCards(prevCards => {
            return prevCards.map((item, i) => {
                if (i === index && !item.stopped) {
                    return { ...item, flipped: !item.flipped }
                }
                return item; // Остави останалите карти непроменени
            });
        });

        setTimeout(() => flipCards(index + 1), 150); // Обработи следващата карта след 200ms
    };

    const generateNewRowCards = () => {

        const newRowCards = currentCards.map((item) => {
            if (item.stopped) {
                return item;
            } else {
                let newCard;
                let isDuplicate;
                do {
                    newCard = deckOfCards[Math.floor(Math.random() * deckOfCards.length)];
                    isDuplicate = currentCards.some(card => card.symbol === newCard.symbol);
                } while (isDuplicate);

                return newCard
            }
        });

        setCurrentCards(newRowCards);
    }



    return (

        gameIsOpen ?
            (
                <div className="button-board" >
                    <button className='bet+ button'>Bet ➖</button>
                    <button className='bet- button'>Bet ➕</button>
                    <button className='red button'>Red</button>
                    <button className='black button'>Black</button>
                    <button className='get button'>Get</button>
                    <button className='double button'>Double</button>
                    <button
                        onClick={play}
                        className='playButton'
                    >Play</button>
                </div >
            )
            : null

    );
}

export default PlayButtons;