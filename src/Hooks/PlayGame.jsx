
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
        setWinCheckResult
    } = useContext(DataContext);

    const { checkWinningCombination } = useWinCheck();

    const play = async () => {
        if (bet > money) {
            alert("Not enough money");
            return;
        }

        if (bet === 0) {
            alert("Place your bet");
            return;
        }

        if (firstRow) {
            await handleFirstRow();
        } else {
            await handleSecondRow();
        }

        setFirstRow(prev => !prev);
    };

    // Първо раздаване
    const handleFirstRow = async () => {
        // Обръщане на текущите карти
        setCurrentCards(prev => prev.map(item => ({ ...item, flipped: false })));

        // Генериране на нови карти и обновяване на състоянието
        const newCards = draftedCard();
        setTimeout(() => {
            setWinCheckResult('');
            setCurrentCards(newCards);
            setMoney(prev => prev - bet);
        }, 400);

        // Обръщане на картите с анимация
        await delay(400);
        await flipCards(newCards);

        // Проверка за печалба
        await delay(100);
        const result = checkWinningCombination(newCards, bet);
        console.log(result);

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
    };

    // Второ раздаване
    const handleSecondRow = async () => {
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

