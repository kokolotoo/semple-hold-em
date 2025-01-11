
import DataContext from "../Context/DataContext";
import { useContext } from "react";
import useWinCheck from "./useWinCheck";

const usePlayGame = () => {
    const {
        setIsOpened,
        firstRow,
        setFirstRow,
        bet,
        currentCards,
        setCurrentCards,
        draftedCard,
        deckOfCards,
        money,
        setMoney,
        setWinCheckResult,
        setDisablePlayButton
    } = useContext(DataContext);

    const { checkWinningCombination } = useWinCheck();

    const play = async () => {

        if (firstRow) {
            if (bet > money) {
                alert("Not enough money. Restart app");
                return;
            }

            if (bet === 0) {
                alert("Place your bet");
                return;
            }
            await handleFirstRow();
        } else {
            await handleSecondRow();
        }

        setFirstRow(prev => !prev);
    };


    const handleFirstRow = async () => {
        // Обръщане на текущите карти и обновяване на състоянието
        setDisablePlayButton(prev => !prev)
        setCurrentCards(prev => prev.map(item => ({ ...item, flipped: false })));
        setWinCheckResult('');
        setMoney(prev => prev - bet);
        const newCards = draftedCard();

        await delay(200);

        // Генериране на нови карти 
        setCurrentCards(newCards);

        // Обръщане на картите с анимация
        await delay(100);
        await flipCards(newCards);

        // Проверка за печалба
        await delay(100);
        const result = checkWinningCombination(newCards, bet);

        // Автоматично стопиране на карти
        if (result) {
            setCurrentCards(prev =>
                prev.map(card =>
                    result.cards.some(winningCard => winningCard.symbol === card.symbol)
                        ? { ...card, stopped: true }
                        : card
                )
            );
        }

        setIsOpened(prev => !prev);
        setDisablePlayButton(prev => !prev)
    };

    // Второ раздаване
    const handleSecondRow = async () => {
        setDisablePlayButton(prev => !prev)
        const flippedCards = currentCards.map(card =>
            !card.stopped ? { ...card, flipped: !card.flipped } : card
        );

        setCurrentCards(flippedCards);

        const newRowCards = generateNewRowCards(flippedCards);
        await delay(200);

        setCurrentCards(newRowCards);
        setIsOpened(prev => !prev);

        await delay(400);
        await flipCards(newRowCards);

        await delay(200);
        const result = checkWinningCombination(newRowCards, bet);
        setWinCheckResult(result);
        setDisablePlayButton(prev => !prev)
        console.log(result);
    };

    // Функция за обръщане на карти с анимация
    const flipCards = async (cards) => {
        for (let i = 0; i < cards.length; i++) {
            if (!cards[i].stopped) {
                setCurrentCards(prev =>
                    prev.map((card, index) => (index === i ? { ...card, flipped: !card.flipped } : card))
                );
                await delay(150);
            }
        }
    };

    // Генериране на нови карти
    const generateNewRowCards = (current) => {
        const currentSymbols = new Set(current.map(card => card.symbol));
        return current.map(card => {
            if (card.stopped) return card;

            let newCard;
            do {
                newCard = deckOfCards[Math.floor(Math.random() * deckOfCards.length)];
            } while (currentSymbols.has(newCard.symbol));

            currentSymbols.add(newCard.symbol);
            return newCard;
        });
    };

    // Помощна функция за закъснение
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    return { play };
};

export default usePlayGame;

