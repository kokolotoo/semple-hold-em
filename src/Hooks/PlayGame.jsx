import DataContext from "../Context/DataContext";
import { useContext } from "react";
import useWinCheck from "./useWinCheck";


const usePlayGame = () => {
    const { setIsOpened, firstRow, setFirstRow, bet,
        currentCards, setCurrentCards, draftedCard, deckOfCards, money,
        setMoney, setWinCheckResult
    } = useContext(DataContext);

    const { checkWinningCombination } = useWinCheck()

    const play = () => {

        if (firstRow) {
           
            setWinCheckResult('')
            const newCards = draftedCard()
            setCurrentCards(newCards)

            if (bet > money) {
                alert("Not money")
                return
            }
            if (bet === 0) {
                alert("Not bet")
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

            setCurrentCards(newCards);

            const newRowCards = generateNewRowCards(newCards)

            setTimeout(() => {
                setCurrentCards(newRowCards);
            }, 200)

            setTimeout(() => {
                flipCards();
                setIsOpened(prev => !prev)
            }, 400)

            setTimeout(() => {
                setWinCheckResult(checkWinningCombination(newRowCards, bet));
                console.log(checkWinningCombination(newRowCards, bet));
            }, 1500)
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

    const generateNewRowCards = (current) => {

        const newRowCards = current.map((item) => {
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

        return newRowCards
    }


    return { play }
}



export default usePlayGame

