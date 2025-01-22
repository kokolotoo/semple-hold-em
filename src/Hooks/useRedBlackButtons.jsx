import { useMemo, useContext, useState } from 'react';
import DataContext from "../Context/DataContext"
import loseAudio from '../Components/public/no-win.mp3'
import winAudio from '../Components/public/lowWin.mp3'

// Помощна функция за закъснение
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));



const useRedOrBlackButtons = () => {

    const { setDoubleButtonKey,
        currentCards,
        setCurrentCards,
        setWinCheckResult,
        deckOfCards
    } = useContext(DataContext);

    const generateCard = () => {
        const card = deckOfCards[Math.floor(Math.random() * deckOfCards.length)];
        return card
    }

    const [winMessage, setWinMessage] = useState('')
    const [playCards, setPlayCards] = useState([generateCard()])
    const soundLose = useMemo(() => new Audio(loseAudio), []);
    const soundWin = useMemo(() => new Audio(winAudio), []);
    const redSymbols = ['♥', '♦'];
    const blackSymbols = ['♠', '♣'];

    const checkForEquals = (array1, array2) => {
        if (array1.every((value, i) => value === array2[i])) {
            setWinMessage('You Win')
            return true
        } else {
            setWinMessage('You Lose')
            return false
        }
    }


    const nexCard = () => {
        let currentCard = null;
        if (playCards.length >= 52) {
            setWinMessage('End of Cards. Get your win.')
            return
        }
        while (currentCard === null) {
            const rowCard = generateCard();
            if (!playCards.some(card => card.symbol === rowCard.symbol)) {
                currentCard = rowCard;
            }
        }
        return currentCard;
    };


    const checkForWin = async (choiceColor) => {
        setPlayCards(prev => prev.map(item => ({ ...item, flipped: true })))

        await delay(100);
        let currentSymbol = (playCards[playCards.length - 1].symbol).slice(-1)

        if (redSymbols.includes(currentSymbol)) {
            currentSymbol = redSymbols
        } else {
            currentSymbol = blackSymbols
        }

        if (checkForEquals(currentSymbol, choiceColor)) {
            setWinCheckResult(prev => ({ ...prev, win: prev.win * 2 }))
            await delay(100);
            soundWin.play()
            await delay(400);

            setPlayCards(t => [...t, nexCard()])

        } else {
            await soundLose.play()
            setCurrentCards(currentCards.map(item => {
                return { ...item, flipped: false }
            }));
            setWinCheckResult('')

            await delay(1000);
            setDoubleButtonKey(false);
            setWinMessage('')
            setPlayCards([])
        }
    }

    return { checkForWin, playCards, winMessage }
}

export default useRedOrBlackButtons