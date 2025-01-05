const typeOfCards = ['2', '3', '4', '5', '6', '7', '8', '9', '0', 'J', 'Q', 'K', 'A']
const colors = ['C', 'D', 'H', 'S']


export const draftedCard = () => {
    let picCards = []
    for (let i = 0; i < 5; i++) {
        const type = typeOfCards[Math.floor(Math.random() * typeOfCards.length)]
        const color = colors[Math.floor(Math.random() * colors.length)]
        const currentCard = `${type}${color}`
        if (picCards.includes(currentCard)) {
            i--
        } else {
            picCards.push(currentCard)
        }
    }
    return picCards

}