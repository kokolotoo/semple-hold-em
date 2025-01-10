
import { generateDeck, draftedCard } from '../Components/Cards/draftedCard';
import { createContext, useState, useEffect } from 'react';


const DataContext = createContext({});

export const DataProvider = ({ children }) => {
    const [money, setMoney] = useState(200) //налични пари 
    const [bet, setBet] = useState(1)       //текущ залог
    const deckOfCards = generateDeck()      //генерира тесте карти
    const [isOpened, setIsOpened] = useState(true) // за състояние и цвят на стоп бутони 
    const [firstRow, setFirstRow] = useState(true) // за първо и второ раздаване
    const [currentCards, setCurrentCards] = useState([]) // текущи карти
    const [winCheckResult, setWinCheckResult] = useState('') // резултата от проверка за победа. Използва се и за активност на бутони

  

    useEffect(() => {
        setCurrentCards(draftedCard())
    }, [])


    return (
        <DataContext.Provider value={{
            money, setMoney, bet, setBet, deckOfCards,
            isOpened, setIsOpened,
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
