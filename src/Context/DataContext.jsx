//Това е провайдър. Улеснява цялото съдържание на компонентите 
//служи като родител на всички компоненти , като им предава всички ,
// състояние, функции , и тн. Всичко,което е обвито в него (като негови деца)
// наследява това,което съдържа провйдъра .

import { createContext, useState, useEffect } from 'react';


const DataContext = createContext({});

export const DataProvider = ({ children }) => {
    

    

   

    

    return (
        <DataContext.Provider value={{
           
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;