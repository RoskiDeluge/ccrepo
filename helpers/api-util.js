export async function getAllCards() {
  const response = await fetch(
    'https://casa-cards-eabd2-default-rtdb.firebaseio.com/cards.json'
  );
  const data = await response.json();

  const cards = [];

  for (const key in data) {
    cards.push({
      id: key,
      ...data[key],
    });
  }
  return cards;
}

export async function getFeaturedCards() {
  const allCards = await getAllCards();
  return allCards.filter((card) => card.isFeatured);
}

export async function getCardById(id) {
  const allCards = await getAllCards();
  return allCards.find((card) => card.id === id);
}

export async function getFilteredCards(dateFilter) {
  const { year, month } = dateFilter;

  const allCards = await getAllCards();

  let filteredCards = allCards.filter((card) => {
    const cardDate = new Date(card.startdate);
    return cardDate.getFullYear() === year && cardDate.getMonth() === month - 1;
  });

  return filteredCards;
}
