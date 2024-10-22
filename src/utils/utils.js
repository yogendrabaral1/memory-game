import { v4 as uuidv4 } from 'uuid';

export function createCards(num) {
  let cards = [];
  for (let i = 1; i <= num / 2; i++) {
    cards.push({
        id: uuidv4(),
        value: i,
        isFlipped: false,
        canFlip: true,
    });
    cards.push({
      id: uuidv4(),
      value: i,
      isFlipped: false,
      canFlip: true,
    });
  }
  cards = shuffleCards(cards);
  return cards;
}

export function shuffleCards(cards) {
    let newCards = [];
    let shuffledNum = [];
    while(shuffledNum.length < cards.length) {
        let j = Math.floor(Math.random() * cards.length);
        if (!shuffledNum.includes(j)) {
            shuffledNum.push(j);
            newCards.push(cards[j]);
        }
    }
    return newCards;
}