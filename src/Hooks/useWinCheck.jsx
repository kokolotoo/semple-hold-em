

const useWinCheck = () => {

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
                return { combination: "Royal Flush", win, cards: [...cards] };
            }
            if (isConsecutive(ranks)) {
                const win = bet * 25;
                return { combination: "Straight Flush", win, cards: [...cards] };
            }
        }

        if (Object.values(rankCounts).includes(4)) {
            const win = bet * 20;
            const fourCards = getCombinationCards((card) => rankCounts[card.symbol.slice(0, -1)] === 4);
            return { combination: "Four of a Kind", win, cards: fourCards };
        }

        if (Object.values(rankCounts).includes(3) && Object.values(rankCounts).includes(2)) {
            const win = bet * 15;
            const fullHouseCards = getCombinationCards((card) => rankCounts[card.symbol.slice(0, -1)] >= 2);
            return { combination: "Full House", win, cards: fullHouseCards };
        }

        if (suits.every((suit) => suit === suits[0])) {
            const win = bet * 10;
            return { combination: "Flush", win, cards: [...cards] };
        }

        if (isConsecutive(ranks)) {
            const win = bet * 7;
            return { combination: "Straight", win, cards: [...cards] };
        }

        if (Object.values(rankCounts).includes(3)) {
            const win = bet * 3;
            const threeCards = getCombinationCards((card) => rankCounts[card.symbol.slice(0, -1)] === 3);
            return { combination: "Three of a Kind", win, cards: threeCards };
        }

        if (Object.values(rankCounts).filter((count) => count === 2).length === 2) {
            const win = bet * 2;
            const twoPairCards = getCombinationCards((card) => rankCounts[card.symbol.slice(0, -1)] === 2);
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
