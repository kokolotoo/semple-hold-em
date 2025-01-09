import DataContext from '../../Context/DataContext';
import { useContext } from "react";




const usePlayGame = () => {
    const { setIsOpened, firstRow, setFirstRow, bet, setBet,
        currentCards, setCurrentCards, draftedCard, deckOfCards, money, setMoney
    } = useContext(DataContext);

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



    return { play }
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


export default usePlayGame