
import { generateDeck, draftedCard } from '../Components/Cards/draftedCard';
import { createContext, useState, useEffect } from 'react';


const DataContext = createContext({});

export const DataProvider = ({ children }) => {
    const [money, setMoney] = useState(200)
    const [bet, setBet] = useState(1)
    const deckOfCards = generateDeck()
    const [isOpened, setIsOpened] = useState(true)
    const [playGame, setPlayGame] = useState(false)
    const [firstRow, setFirstRow] = useState(true)
    const [currentCards, setCurrentCards] = useState([])
    const [winCheckResult, setWinCheckResult] = useState('')

  

    useEffect(() => {
        setCurrentCards(draftedCard())
    }, [])


    return (
        <DataContext.Provider value={{
            money, setMoney, bet, setBet, deckOfCards,
            isOpened, setIsOpened, playGame, setPlayGame,
            firstRow, setFirstRow, currentCards, setCurrentCards,
            draftedCard, winCheckResult, setWinCheckResult
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;


//import { useContext } from "react";
//const { name of something } = useContext(DataContext);
