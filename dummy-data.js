const DUMMY_CARDS = [
  {
    id: 'c1',
    title: 'Home Goods/Supplies',
    description:
      "Essentials don't run out, let grocery person know in advance.",
    suit: 'home',
    owner: 'alicia',
    startdate: '2021-04-12',
    enddate: '2022-05-12',
    image: 'images/img1.jpg',
    isFeatured: false,
  },
  {
    id: 'c2',
    title: 'Garbage',
    description: 'Goes out daily, recycling goes out when full',
    suit: 'home',
    owner: 'roberto',
    startdate: '2022-04-15',
    enddate: '2022-05-15',
    image: 'images/img2.jpg',
    isFeatured: true,
  },
  {
    id: 'c3',
    title: 'Cash and Bills',
    description: 'Bills paid on time; cash needed ',
    suit: 'out',
    owner: 'alicia',
    startdate: '2022-04-16',
    enddate: '2022-05-16',
    image: 'images/img3.jpg',
    isFeatured: true,
  },
];

export function getFeaturedCards() {
  return DUMMY_CARDS.filter((card) => card.isFeatured);
}

export function getAllCards() {
  return DUMMY_CARDS;
}

export function getFilteredCards(dateFilter) {
  const { year, month } = dateFilter;

  let filteredCards = DUMMY_CARDS.filter((card) => {
    const cardDate = new Date(card.startdate);
    return cardDate.getFullYear() === year && cardDate.getMonth() === month - 1;
  });

  return filteredCards;
}

export function getCardById(id) {
  return DUMMY_CARDS.find((card) => card.id === id);
}
