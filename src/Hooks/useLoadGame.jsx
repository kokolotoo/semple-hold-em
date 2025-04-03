import { db } from './firebase-config';
import { doc, getDoc } from 'firebase/firestore';
import DataContext from '../Context/DataContext';
import { useState, useEffect, useContext } from 'react';

const useLoadGame = () => {
    const { isLogin, user } = useContext(DataContext);
    const [loadedMoney, setLoadedMoney] = useState(100);

    useEffect(() => {
        const loadGame = async () => {
            if (user) {
                try {
                    const userMoneyRef = doc(db, 'Users-Money', user.id);
                    const userSnap = await getDoc(userMoneyRef);

                    if (userSnap.exists()) {
                        setLoadedMoney(parseFloat(userSnap.data().money));
                    } 
                } catch (err) {
                    console.error("Error loading user money:", err.message);
                }
            } 
        };

        loadGame();
    }, [isLogin]);

    return { loadedMoney };
};

export default useLoadGame;