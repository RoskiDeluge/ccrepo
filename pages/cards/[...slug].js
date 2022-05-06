/* Refactored to fetch via the client side using SWR, but to see how this 
filtering page was built using gSSP visit /sample_code/[...slug].js.
Using gSSP would make sense to access auth content though, 
since in that case we'd need to check for a header token on each request. */
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { getFilteredCards } from '../../helpers/api-util';
import CardList from '../../components/cards/card-list';
import ResultsTitle from '../../components/cards/results-title';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';

export default function FilteredCardsPage() {
  const [loadedCards, setLoadedCards] = useState();
  const router = useRouter();

  const filterData = router.query.slug;
  // console.log(filterData);

  /* NOTE: The filtering logic here is a cheat for the udemy course. For prod this should be 
  refactored to perform the filtering directly from firebase, by using their specified filtering
  parameters so the specific events are returned. */
  const fetcher = (url) => fetch(url).then((res) => res.json());

  const { data, error } = useSWR(
    'https://casa-cards-eabd2-default-rtdb.firebaseio.com/cards.json',
    fetcher
  );

  useEffect(() => {
    if (data) {
      const cards = [];

      for (const key in data) {
        cards.push({
          id: key,
          ...data[key],
        });
      }
      setLoadedCards(cards);
    }
  }, [data]);

  // console.log('loadedCards: ', loadedCards);
  let pageHeadData = (
    <Head>
      <title>Filtered Cards | Casa Cards</title>
      <meta name="description" content={'A list of filtered events.'} />
    </Head>
  );

  if (!loadedCards) {
    return (
      <>
        {pageHeadData}
        <p className="center">Loading...</p>;
      </>
    );
  }

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  pageHeadData = (
    <Head>
      <title>Filtered Cards | Casa Cards</title>
      <meta
        name="description"
        content={`All cards for ${numMonth}/${numYear}`}
      />
    </Head>
  );

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12 ||
    error
  ) {
    return (
      <>
        {pageHeadData}
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values.</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/cards">Show all cards</Button>
        </div>
      </>
    );
  }

  const filteredCards = loadedCards.filter((card) => {
    const cardDate = new Date(card.startdate);
    return (
      cardDate.getFullYear() === numYear && cardDate.getMonth() === numMonth - 1
    );
  });

  if (!filteredCards || filteredCards.length === 0) {
    return (
      <>
        {pageHeadData}
        <ErrorAlert>
          <p>No cards found for the chosen filter.</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/cards">Show all cards</Button>
        </div>
      </>
    );
  }

  const date = new Date(numYear, numMonth);

  return (
    <>
      {pageHeadData}
      <ResultsTitle date={date} />
      <CardList items={filteredCards} />
    </>
  );
}
