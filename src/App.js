import React, { useEffect, useState } from 'react';
import './App.css';
import { createCards } from './utils/utils';

function App() {
  const [numberOfCards, setNumberOfCards] = useState('');
  const [cards, setCards] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setNumberOfCards(e.target.value);
  };

  const handleStartGame = () => {
    let num = parseInt(numberOfCards);
    if ((num <= 2 && num >= 52) || num % 2 !== 0) {
        setError(true);
    }else {
      setLoading(true);
      setTimeout(() => {
        setError(false);
        setLoading(false);
        const cards = createCards(num);
        setCards(cards);
      }, 2000);
    }
  };

  const handleCardClick = (id) => {
    let flippedCards = cards.filter((card) => card.isFlipped && card.canFlip);
    let newCards = cards.map((card) => {
      if (card.id === id) {
        if(flippedCards.length > 0){
          if(card.value === flippedCards[0].value && card.id !== flippedCards[0].id){
            card.isFlipped = true;
            card.canFlip = false;
            flippedCards[0].canFlip = false;
          }else{
            card.isFlipped = true;
            setTimeout(() => {
              card.isFlipped = false;
              flippedCards[0].isFlipped = false;
            }, 1000);
          }
        }else {
          card.isFlipped = true;
        }
      }
      return card;
    });
    setCards(newCards);
  };

  return (
    <div className="App">
      <p className='appHeading'>Memory Game</p>
      <div className='container'>
        {
          cards.length === 0 ? (
            loading ?
            <p className='loadingText'>Creating cards...</p>
            :
            <>
            <div>
              <input
                type='number'
                placeholder='Enter number of cards'
                value={numberOfCards}
                onChange={(e) => handleInputChange(e)}
                className='inputField'
              />
              <button className='startButton' onClick={() => handleStartGame()}>Start Game</button>
            </div>
            {error && <p className='noteText'>Note: Number of cards should be 2 or more than 2 and 52 or less than 52 and should be even.</p>}
            <p style={{color: '#000'}} className='noteText'>Note: Higher number of cards is best</p>
            </>
          )
          :
          (
            <ul className='memoryGameCards'>
              {cards.map((card, index) => (
                <li
                  key={index}
                  className={`memoryCard ${(card.isFlipped || !card.canFlip) && 'flippedCard'} ${card.canFlip ? '' : 'disabled'}`}
                  onClick={() => handleCardClick(card.id)}
                >
                  <p className='flipCardContent'>{card.isFlipped ? card.value : 'X'}</p>
                </li>
              ))}
            </ul>
          )
        }
      </div>
    </div>
  );
}

export default App;
