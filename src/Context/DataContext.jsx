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
    const [bet, setBet] = useState(0)
    const [deckOfCards, setDeckOfCards] = useState(generateDeck())
    //const { data, fetchError, isLoading } = useAxiosFetch('https://deckofcardsapi.com/api/deck/new/draw/?count=52');
    //console.log(data.cards);




    return (
        <DataContext.Provider value={{
            money, setMoney, bet, setBet, deckOfCards
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;


//import { useContext } from "react";
//const { name of something } = useContext(DataContext);
