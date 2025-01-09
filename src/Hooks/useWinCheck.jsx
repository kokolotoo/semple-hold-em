

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

        // Проверка за Royal Flush и Straight Flush
        if (suits.every((suit) => suit === suits[0])) {
            if (["10", "J", "Q", "K", "A"].every((rank) => ranks.includes(rank))) {
                const win = bet * 30;
                return { combination: "Royal Flush", win };
            }
            if (isConsecutive(ranks)) {
                const win = bet * 25;
                return { combination: "Straight Flush", win };
            }
        }

        if (Object.values(rankCounts).includes(4)) {
            const win = bet * 20;
            return { combination: "Four of a Kind", win };
        }

        if (Object.values(rankCounts).includes(3) && Object.values(rankCounts).includes(2)) {
            const win = bet * 15;
            return { combination: "Full House", win };
        }

        if (suits.every((suit) => suit === suits[0])) {
            const win = bet * 10;
            return { combination: "Flush", win };
        }

        if (isConsecutive(ranks)) {
            const win = bet * 7;
            return { combination: "Straight", win };
        }

        if (Object.values(rankCounts).includes(3)) {
            const win = bet * 3;
            return { combination: "Three of a Kind", win };
        }

        if (Object.values(rankCounts).filter((count) => count === 2).length === 2) {
            const win = bet * 2;
            return { combination: "Two Pair", win };
        }

        if (Object.values(rankCounts).includes(2)) {
            // Проверка дали чифтът съдържа J, Q, K или A
            const highPair = Object.keys(rankCounts).filter(
                (rank) => rankCounts[rank] === 2 && ["J", "Q", "K", "A"].includes(rank)
            );

            if (highPair.length > 0) {
                const win = bet ;
                return { combination: "One Pair", win };
            }
        }


        return false
    };

    return { checkWinningCombination }

}

export default useWinCheck;
