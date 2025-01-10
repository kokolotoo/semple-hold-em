/*
import audioFile from '../assets/win.wav'
import audioFile2 from '../assets/lowwin.mp3'
import { useContext } from "react";
import DataContext from '../Context/DataContext';

const useWinCheck = () => {
    const winSound = new Audio(audioFile);
    const winSound2 = new Audio(audioFile2);
    const { firstRow } = useContext(DataContext)

    const checkWinningCombination = (cards, bet) => {
        const ranks = cards.map((card) => card.symbol.slice(0, -1)); // Пример: ['8', '10', 'Q', '9', '8']
        const suits = cards.map((card) => card.symbol.slice(-1)); // Пример: ['♠', '♦', '♠', '♣', '♦']

        const rankCounts = ranks.reduce((acc, rank) => {
            acc[rank] = (acc[rank] || 0) + 1;
            return acc;
        }, {});

        const isConsecutive = (arr) => {
            const sorted = arr
                .map((rank) => (rank === "A" ? 14 : rank === "K" ? 13 : rank === "Q" ? 12 : rank === "J" ? 11 : parseInt(rank)))
                .sort((a, b) => a - b);
            return sorted.every((val, index) => index === 0 || val - sorted[index - 1] === 1);
        };

        const getCombinationCards = (condition) => cards.filter(condition);

        // Проверка за Royal Flush и Straight Flush
        if (suits.every((suit) => suit === suits[0])) {
            if (["10", "J", "Q", "K", "A"].every((rank) => ranks.includes(rank))) {
                const win = bet * 30;
                !firstRow && winSound.play()
                return { combination: "Royal Flush", win, cards: [...cards] };
            }
            if (isConsecutive(ranks)) {
                const win = bet * 25;
                !firstRow && winSound.play()
                return { combination: "Straight Flush", win, cards: [...cards] };
            }
        }

        if (Object.values(rankCounts).includes(4)) {
            const win = bet * 20;
            const fourCards = getCombinationCards((card) => rankCounts[card.symbol.slice(0, -1)] === 4);
            !firstRow && winSound.play()
            return { combination: "Four of a Kind", win, cards: fourCards };
        }

        if (Object.values(rankCounts).includes(3) && Object.values(rankCounts).includes(2)) {
            const win = bet * 15;
            const fullHouseCards = getCombinationCards((card) => rankCounts[card.symbol.slice(0, -1)] >= 2);
            !firstRow &&  winSound.play()
            return { combination: "Full House", win, cards: fullHouseCards };
        }

        if (suits.every((suit) => suit === suits[0])) {
            const win = bet * 10;
            !firstRow && winSound2.play()
            return { combination: "Flush", win, cards: [...cards] };
        }

        if (isConsecutive(ranks)) {
            const win = bet * 7;
            !firstRow && winSound2.play()
            return { combination: "Straight", win, cards: [...cards] };
        }

        if (Object.values(rankCounts).includes(3)) {
            const win = bet * 3;
            const threeCards = getCombinationCards((card) => rankCounts[card.symbol.slice(0, -1)] === 3);
            !firstRow && winSound2.play()
            return { combination: "Three of a Kind", win, cards: threeCards };
        }

        if (Object.values(rankCounts).filter((count) => count === 2).length === 2) {
            const win = bet * 2;
            const twoPairCards = getCombinationCards((card) => rankCounts[card.symbol.slice(0, -1)] === 2);
            !firstRow && winSound2.play()
            return { combination: "Two Pair", win, cards: twoPairCards };
        }
        if (Object.values(rankCounts).includes(2)) {
            // Проверка дали чифтът съдържа J, Q, K или A
            const highPair = Object.keys(rankCounts).filter(
                (rank) => rankCounts[rank] === 2 && ["J", "Q", "K", "A"].includes(rank)
            );

            if (highPair.length > 0) {
                const win = bet;
                const pairCards = getCombinationCards((card) => highPair.includes(card.symbol.slice(0, -1)));
                return { combination: "One Pair", win, cards: pairCards };
            }
        }

        return false;
    };


    return { checkWinningCombination }

}

export default useWinCheck;
*/

import { useRef, useContext, useCallback } from "react";
import audioFile from '../assets/win.wav';
import audioFile2 from '../assets/lowwin.mp3';
import DataContext from '../Context/DataContext';

const useWinCheck = () => {
    const winSound = useRef(new Audio(audioFile));
    const winSound2 = useRef(new Audio(audioFile2));
    const { firstRow } = useContext(DataContext);

    // Помощна функция за създаване на rankCounts
    const calculateRankCounts = (ranks) => {
        return ranks.reduce((acc, rank) => {
            acc[rank] = (acc[rank] || 0) + 1;
            return acc;
        }, {});
    };

    // Проверка за последователност
    const isConsecutive = (ranks) => {
        const sorted = ranks
            .map((rank) => (rank === "A" ? 14 : rank === "K" ? 13 : rank === "Q" ? 12 : rank === "J" ? 11 : parseInt(rank)))
            .sort((a, b) => a - b);
        return sorted.every((val, index) => index === 0 || val - sorted[index - 1] === 1);
    };

    // Основна логика за проверка
    const checkWinningCombination = useCallback((cards, bet) => {
        const ranks = cards.map((card) => card.symbol.slice(0, -1));
        const suits = cards.map((card) => card.symbol.slice(-1));
        const rankCounts = calculateRankCounts(ranks);

        const getCombinationCards = (condition) => cards.filter(condition);

        // Royal Flush и Straight Flush
        if (suits.every((suit) => suit === suits[0])) {
            if (["10", "J", "Q", "K", "A"].every((rank) => ranks.includes(rank))) {
                const win = bet * 30;
                if (!firstRow) winSound.current.play();
                return { combination: "Royal Flush", win, cards: [...cards] };
            }
            if (isConsecutive(ranks)) {
                const win = bet * 25;
                if (!firstRow) winSound.current.play();
                return { combination: "Straight Flush", win, cards: [...cards] };
            }
        }

        // Four of a Kind
        if (Object.values(rankCounts).includes(4)) {
            const win = bet * 20;
            const fourCards = getCombinationCards((card) => rankCounts[card.symbol.slice(0, -1)] === 4);
            if (!firstRow) winSound.current.play();
            return { combination: "Four of a Kind", win, cards: fourCards };
        }

        // Full House
        if (Object.values(rankCounts).includes(3) && Object.values(rankCounts).includes(2)) {
            const win = bet * 15;
            const fullHouseCards = getCombinationCards((card) => rankCounts[card.symbol.slice(0, -1)] >= 2);
            if (!firstRow) winSound.current.play();
            return { combination: "Full House", win, cards: fullHouseCards };
        }

        // Flush
        if (suits.every((suit) => suit === suits[0])) {
            const win = bet * 10;
            if (!firstRow) winSound2.current.play();
            return { combination: "Flush", win, cards: [...cards] };
        }

        // Straight
        if (isConsecutive(ranks)) {
            const win = bet * 7;
            if (!firstRow) winSound2.current.play();
            return { combination: "Straight", win, cards: [...cards] };
        }

        // Three of a Kind
        if (Object.values(rankCounts).includes(3)) {
            const win = bet * 3;
            const threeCards = getCombinationCards((card) => rankCounts[card.symbol.slice(0, -1)] === 3);
            if (!firstRow) winSound2.current.play();
            return { combination: "Three of a Kind", win, cards: threeCards };
        }

        // Two Pair
        if (Object.values(rankCounts).filter((count) => count === 2).length === 2) {
            const win = bet * 2;
            const twoPairCards = getCombinationCards((card) => rankCounts[card.symbol.slice(0, -1)] === 2);
            if (!firstRow) winSound2.current.play();
            return { combination: "Two Pair", win, cards: twoPairCards };
        }

        // One Pair
        if (Object.values(rankCounts).includes(2)) {
            const highPair = Object.keys(rankCounts).filter(
                (rank) => rankCounts[rank] === 2 && ["J", "Q", "K", "A"].includes(rank)
            );
            if (highPair.length > 0) {
                const win = bet;
                const pairCards = getCombinationCards((card) => highPair.includes(card.symbol.slice(0, -1)));
                return { combination: "One Pair", win, cards: pairCards };
            }
        }

        // Няма печалба
        return false;
    }, [firstRow]);

    return { checkWinningCombination };
};

export default useWinCheck;
