//Това е провайдър. Улеснява цялото съдържание на компонентите 
//служи като родител на всички компоненти , като им предава всички ,
// състояние, функции , и тн. Всичко,което е обвито в него (като негови деца)
// наследява това,което съдържа провйдъра .
import { generateDeck } from '../Components/Cards/draftedCard';
import { createContext, useState, useEffect } from 'react';
import useAxiosFetch from '../Hooks/useAxiosFetch';

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
    const [money, setMoney] = useState(0)
    const [bet, setBet] = useState(1)
    const deckOfCards = generateDeck()
    const [isOpened, setIsOpened] = useState(true)
    const [playGame, setPlayGame] = useState(false)
    const [firstRow, setFirstRow] = useState(true)

    //const { data, fetchError, isLoading } = useAxiosFetch('https://deckofcardsapi.com/api/deck/new/draw/?count=52');
    //console.log(data.cards);




    return (
        <DataContext.Provider value={{
            money, setMoney, bet, setBet, deckOfCards,
            isOpened, setIsOpened, playGame, setPlayGame,
            firstRow, setFirstRow
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;


//import { useContext } from "react";
//const { name of something } = useContext(DataContext);
