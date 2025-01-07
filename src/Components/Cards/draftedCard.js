
const suitsSymbols = {
    C: '♣', // Clubs
    D: '♦', // Diamonds
    H: '♥', // Hearts
    S: '♠', // Spades
};

const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '0', 'J', 'Q', 'K', 'A'];

export const generateDeck = () => {
    const deck = [];
    for (const suit in suitsSymbols) {
        for (const rank of ranks) {
            let symbol = `${rank}${suitsSymbols[suit]}`; // Пример: 2♣
            if (rank === '0') {
                symbol = `10${suitsSymbols[suit]}`
            }

            deck.push({
                symbol,
                img: `https://deckofcardsapi.com/static/img/${rank}${suit}.png`
            });
        }
    }
    return deck;
};




export const draftedCard = () => {
    const carts = generateDeck()
    let picCards = []

    for (let i = 0; i < 5; i++) {

        const currentCard = carts[Math.floor(Math.random() * carts.length)]
        
        if (picCards.includes(currentCard)) {
            i--
        } else {
            picCards.push(currentCard)
        }

    }
    return picCards

}
