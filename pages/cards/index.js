import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { getAllCards } from '../../helpers/api-util';
import CardList from '../../components/cards/card-list';
import CardsSearch from '../../components/cards/cards-search';

export default function AllCards({ allCards }) {
  const router = useRouter();
  const cards = allCards;

  function findCardsHandler(year, month) {
    const fullPath = `/cards/${year}/${month}`;

    router.push(fullPath);
  }

  return (
    <>
      <Head>
        <title>All Cards | Casa Cards</title>
        <meta name="description" content="Who's doing what?" />
      </Head>
      <CardsSearch onSearch={findCardsHandler} />
      <CardList items={cards} />
    </>
  );
}

export async function getStaticProps() {
  const cards = await getAllCards();

  return {
    props: {
      allCards: cards,
    },
    revalidate: 60,
  };
}
