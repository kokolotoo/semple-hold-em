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
            //първо раздаване
            //обръща текущите карти
            setCurrentCards(currentCards.map(item => {
                return { ...item, flipped: false }
            }));

            //проверява залог и налични пари
            if (bet > money) {
                alert("Not money")
                return
            }
            if (bet === 0) {
                alert("Not bet")
                return
            }

            //генерира нови карти
            const newCards = draftedCard()

            //Изчаква и нулира резултата за печалба
            //обновява картите, актуализира парите и обръща картите
            setTimeout(() => {
                setWinCheckResult('')
                setCurrentCards(newCards)
                setMoney(prev => prev - bet)
                flipCards()
            }, 400)

            //обновява бутоните за игра след като картите са раздадени
            //показва текуща проверка за потенциална печалба
            // автоматично стопира картите за потенциална печалба
            setTimeout(() => {
                setIsOpened(prev => !prev)
                console.log(checkWinningCombination(newCards, bet).cards);

                //тук ще е логиката за атоматично стопиране
            }, 1200)

        } else {
            //второ раздаване

            //обръща картите с изключение на стопираните и ги актуализира 
            const newCards = currentCards.map(item => {
                if (!item.stopped) {
                    return { ...item, flipped: !item.flipped }
                }
                return item
            })
            setCurrentCards(newCards);

            //оставя стопираните карти и генерира нови при тях
            const newRowCards = generateNewRowCards(newCards)

            //Актуализира текущите с новогенерираните и обновява бутоните
            setTimeout(() => {
                setCurrentCards(newRowCards);
                setIsOpened(prev => !prev)
            }, 200)

            //обръща картите
            setTimeout(() => {
                flipCards();
            }, 400)

            //актуализира резултата за печалба
            setTimeout(() => {
                setWinCheckResult(checkWinningCombination(newRowCards, bet));
                console.log(checkWinningCombination(newRowCards, bet));
            }, 1500)
        }
        setFirstRow(prev => !prev)
    }

    //функция за обръщане на картите
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

    //функция за генериране на нови карти като оставя стопираните на същите места стопираните
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

