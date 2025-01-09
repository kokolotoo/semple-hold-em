const winningCombinations = [
    { name: "Royal Flush", winMultiplier: 30 }, // Най-високата печалба
    { name: "Straight Flush", winMultiplier: 25 },
    { name: "Four of a Kind", winMultiplier: 20 },
    { name: "Full House", winMultiplier: 15 },
    { name: "Flush", winMultiplier: 10 },
    { name: "Straight", winMultiplier: 7 },
    { name: "Three of a Kind", winMultiplier: 5 },
    { name: "Two Pair", winMultiplier: 4 },
    { name: "One Pair", winMultiplier: 2 }, // Най-ниската печалба
];

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
        const win = bet * 5;
        return { combination: "Three of a Kind", win };
    }

    if (Object.values(rankCounts).filter((count) => count === 2).length === 2) {
        const win = bet * 4;
        return { combination: "Two Pair", win };
    }

    if (Object.values(rankCounts).includes(2)) {
        // Проверка дали чифтът съдържа J, Q, K или A
        const highPair = Object.keys(rankCounts).filter(
            (rank) => rankCounts[rank] === 2 && ["J", "Q", "K", "A"].includes(rank)
        );

        if (highPair.length > 0) {
            const win = bet * 2;
            return { combination: `One Pair (${highPair[0]})`, win };
        }
    }


    return false
};

// Примерно извикване на функцията
const currentCards = [
    { symbol: "8♠", img: "https://deckofcardsapi.com/static/img/8S.png", stopped: false, flipped: true },
    { symbol: "10♦", img: "https://deckofcardsapi.com/static/img/0D.png", stopped: false, flipped: true },
    { symbol: "Q♠", img: "https://deckofcardsapi.com/static/img/QS.png", stopped: false, flipped: true },
    { symbol: "Q♣", img: "https://deckofcardsapi.com/static/img/9C.png", stopped: false, flipped: true },
    { symbol: "Q♦", img: "https://deckofcardsapi.com/static/img/8D.png", stopped: false, flipped: true },
];

const row = [

    { symbol: '6♥', img: 'https://deckofcardsapi.com/static/img/JH.png', stopped: false, flipped: true },

    { symbol: '7♠', img: 'https://deckofcardsapi.com/static/img/7S.png', stopped: false, flipped: true },

    { symbol: '8♦', img: 'https://deckofcardsapi.com/static/img/QD.png', stopped: false, flipped: true },

    { symbol: '9♣', img: 'https://deckofcardsapi.com/static/img/2C.png', stopped: false, flipped: true },

    { symbol: '10♣', img: 'https://deckofcardsapi.com/static/img/JC.png', stopped: false, flipped: true }


]
const bet = 10; // Залог за текущия кръг
//checkWinningCombination(row, bet);


console.log(checkWinningCombination(currentCards, bet));
