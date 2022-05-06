import React from 'react';
import Head from 'next/head';
import CardContent from '../../components/card-detail/card-content';
import { getCardById, getFeaturedCards } from '../../helpers/api-util';
import CardSummary from '../../components/card-detail/card-summary';
import CardLogistics from '../../components/card-detail/card-logistics';
import ErrorAlert from '../../components/ui/error-alert';

export default function EventDetail({ selectedCard }) {
  const card = selectedCard;

  if (!card) {
    return (
      <>
        <div className="center">
          <p>Loading...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{card.title} | Casa Cards</title>
        <meta name="description" content={card.description} />
      </Head>
      <CardSummary title={card.title} />
      <CardLogistics
        startdate={card.startdate}
        enddate={card.enddate}
        image={card.image}
        description={card.description}
        imageAlt={card.title}
      />
      <CardContent>
        <p>Suit: {card.suit}</p>
        <p>Owner: {card.owner}</p>
      </CardContent>
    </>
  );
}

// Using gSP here because in the lessons event site, this individualy page should be crawlable.
// In CC refactor to use gSSP since this page will have more userspecific data that may change fairly often and
// doesn't need to be crawled
export async function getStaticProps(context) {
  const cardId = context.params.cardId;

  const card = await getCardById(cardId);

  return {
    props: {
      selectedCard: card,
    },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const cards = await getFeaturedCards();

  const paths = cards.map((card) => ({ params: { cardId: card.id } }));

  return {
    paths: paths,
    fallback: true,
  };
}
