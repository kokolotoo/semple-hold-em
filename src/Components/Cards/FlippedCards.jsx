import React from 'react'
import ReactCardFlip from 'react-card-flip';

const FlippedCards = (cart) => {
    const [flipped, setFlipped] = useState(false)
    const handleFlip = () => {
        setFlipped(true)
        setTimeout(() => {
            setFlipped(false)
        }, 1500)
    }
  return (
      <ReactCardFlip
          isFlipped={flipped}
          flipDirection="horizontal"
          flipSpeedBackToFront={1.5}
          flipSpeedFrontToBack={1.5}
      >
          <div className='cart'>
              This is the front of the card.
              <button onClick={handleFlip}>Click to flip</button>
          </div>

          <div className='cart back'>
              <img src={cart.img} alt="" /><hr />
              <button onClick={() => setFlipped(prev => !prev)}>Click to flip</button>
          </div>
      </ReactCardFlip>
  )
}

export default FlippedCards
